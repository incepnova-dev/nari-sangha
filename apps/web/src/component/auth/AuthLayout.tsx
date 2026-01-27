import React, { ReactNode } from 'react';
import styles from './auth.module.css';
import loginImage from '../../assets/login.png';

interface AuthLayoutProps {
    children: ReactNode;
    onClose: () => void;
    title: string;
    subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onClose, title, subtitle }) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.authContainer} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                    ✕
                </button>

                <div className={styles.imagePanel}>
                    <img src={loginImage} alt="Women's Health Support" />
                    <div className={styles.imageOverlay} />
                </div>

                <div className={styles.formPanel}>
                    <div className={styles.header}>
                        <h2>{title}</h2>
                        <p>{subtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
