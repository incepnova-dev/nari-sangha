import React, { useState, FormEvent, ChangeEvent } from 'react';
import styles from './auth.module.css';
import AuthLayout from './AuthLayout';
import SocialLogin from './SocialLogin';
import { useAuth } from '../../context/AuthContext';

interface SignUpProps {
    isOpen: boolean;
    onClose: () => void;
    onSignInClick: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ isOpen, onClose, onSignInClick }) => {
    const { signUp } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const success = await signUp({
                fullName: formData.name,
                email: formData.email.trim(),
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            if (success) {
                onClose();
            } else {
                setError("Sign up failed. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error("Sign up error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            onClose={onClose}
            title="Create Account"
            subtitle="Join our community for a healthier future"
        >
            <form className={styles.form} onSubmit={handleSubmit}>
                {error && (
                    <div style={{ color: '#D81B60', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={styles.input}
                        required
                        disabled={isLoading}
                    />
                </div>

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
                        placeholder="Create a password"
                        className={styles.input}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className={styles.input}
                        required
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className={styles.divider}>
                    <span>Or sign up with</span>
                </div>

                <SocialLogin />

                <div className={styles.footer}>
                    Already have an account?
                    <button
                        type="button"
                        className={styles.link}
                        onClick={onSignInClick}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default SignUp;
