import React from 'react';
import styles from './auth.module.css';

const SocialLogin: React.FC = () => {
    const handleGoogleLogin = () => {
        // Logic for Google OAuth would go here
        console.log('Google login clicked');
    };

    const handleAppleLogin = () => {
        // Logic for Apple OAuth would go here
        console.log('Apple login clicked');
    };

    return (
        <div className={styles.socialRow}>
            <button
                className={styles.socialButton}
                onClick={handleGoogleLogin}
                aria-label="Continue with Google"
                type="button"
            >
                <svg viewBox="0 0 24 24">
                    <path
                        fill="#EA4335"
                        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"
                    />
                    <path
                        fill="#34A853"
                        d="M16.04 18.013c-1.09.693-2.43 1.078-3.84 1.078-2.927 0-5.418-1.791-6.44-4.305l-4.102 3.184C3.65 21.03 7.56 23.5 12 23.5c3.09 0 5.864-1.127 7.91-3.136l-3.87-3.35z"
                    />
                    <path
                        fill="#4285F4"
                        d="M19.91 12c0-.591-.055-1.173-.145-1.727H12v3.745h4.636c-.19 1.1-.818 2.045-1.727 2.745l3.87 3.35c2.264-2.09 3.564-5.173 3.564-8.113z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.266 14.786A7.045 7.045 0 0 1 4.909 12c0-.973.155-1.909.436-2.782L1.24 6.103C.455 7.827 0 9.864 0 12s.455 4.173 1.24 5.897l4.026-3.111z"
                    />
                </svg>
            </button>
            <button
                className={styles.socialButton}
                onClick={handleAppleLogin}
                aria-label="Continue with Apple"
                type="button"
            >
                <svg viewBox="0 0 24 24" fill="white">
                    <path d="M17.057 10.771c-.029-2.32 1.89-3.435 1.977-3.49-1.084-1.587-2.766-1.804-3.362-1.829-1.425-.144-2.784.845-3.506.845-.722 0-1.859-.828-3.058-.804-1.569.023-3.018.914-3.824 2.316-1.63 2.831-.417 7.005 1.157 9.278.773 1.111 1.69 2.361 2.893 2.316 1.158-.044 1.595-.746 2.996-.746 1.4 0 1.8 0 3.033.746.136.012 2.217.069 3.313-1.53.228-.314.475-.722.658-1.178-.458-.204-2.221-.861-2.249-3.447v-.004zm-1.879-6.315c.638-.775 1.069-1.851.951-2.924-.92.037-2.033.613-2.693 1.385-.591.681-1.109 1.778-.969 2.827.118.016 1.034.016 2.711-1.288z" />
                </svg>
            </button>
        </div>
    );
};

export default SocialLogin;
