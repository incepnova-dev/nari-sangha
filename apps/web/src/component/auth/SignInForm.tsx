import React, { useState, FormEvent, ChangeEvent } from 'react';
import styles from './auth.module.css';
import SocialLogin from './SocialLogin';
import { useAuth } from '../../context/AuthContext';

interface SignInFormProps {
    onSignUpClick: () => void;
    onSignInSuccess: (userData: any) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignUpClick, onSignInSuccess }) => {
    const { signIn } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const success = await signIn({
                email: formData.email.trim(),
                password: formData.password
            });

            if (success) {
                onSignInSuccess({});
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error("Sign in error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <h2>Welcome Back</h2>
                <p>Sign in to your account to continue</p>
            </div>

            {error && (
                <div style={{ color: '#D81B60', fontSize: '13px', marginBottom: '10px', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={styles.input}
                    required
                    disabled={isLoading}
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={styles.input}
                    required
                    disabled={isLoading}
                />
            </div>

            <button type="button" className={styles.forgotPassword}>
                Forgot Password?
            </button>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
            >
                {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className={styles.divider}>
                <span>Or sign in with</span>
            </div>

            <SocialLogin />

            <div className={styles.footer}>
                Don't have an account?
                <button
                    type="button"
                    className={styles.link}
                    onClick={onSignUpClick}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                    Create an account
                </button>
            </div>
        </form>
    );
};

export default SignInForm;
