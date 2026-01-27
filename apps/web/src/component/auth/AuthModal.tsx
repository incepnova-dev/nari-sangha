import React, { useState, useEffect } from 'react';
import styles from './auth.module.css';
import loginImage from '../../assets/login.png';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'signin' | 'signup';
    onSignInSuccess: (userData: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
    isOpen,
    onClose,
    initialMode = 'signin',
    onSignInSuccess
}) => {
    const [isRegisterMode, setIsRegisterMode] = useState(initialMode === 'signup');

    useEffect(() => {
        setIsRegisterMode(initialMode === 'signup');
    }, [initialMode, isOpen]);

    if (!isOpen) return null;

    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <button className={styles.stationaryCloseButton} onClick={onClose} aria-label="Close">
                ✕
            </button>

            <div
                className={`${styles.authContainer} ${isRegisterMode ? styles.flipped : ''}`}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Front Face: Login */}
                <div className={`${styles.authCardFace} ${styles.frontFace}`}>
                    <div className={styles.imagePanel}>
                        <img src={loginImage} alt="Women's Health Support" />
                        <div className={styles.imageOverlay} />
                    </div>
                    <div className={styles.formPanel}>
                        <SignInForm
                            onSignUpClick={toggleMode}
                            onSignInSuccess={onSignInSuccess}
                        />
                    </div>
                </div>

                {/* Back Face: Sign Up */}
                <div className={`${styles.authCardFace} ${styles.backFace}`}>
                    <div className={styles.imagePanel}>
                        <img src={loginImage} alt="Women's Health Support" />
                        <div className={styles.imageOverlay} />
                    </div>
                    <div className={styles.formPanel}>
                        <SignUpForm
                            onSignInClick={toggleMode}
                            onSuccess={onClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
