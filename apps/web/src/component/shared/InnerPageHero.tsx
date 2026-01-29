import React from "react";
import styles from "./InnerPageHero.module.css";
import { motion } from "framer-motion";

interface InnerPageHeroProps {
    title: string;
    subtitle: string;
    badge?: string;
    illustration?: React.ReactNode;
    backgroundImage?: string;
    children?: React.ReactNode;
    centered?: boolean;
}

const InnerPageHero: React.FC<InnerPageHeroProps> = ({ title, subtitle, badge, illustration, backgroundImage, children, centered }) => {
    return (
        <section className={styles.hero} style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
            <div className={`${illustration ? styles.containerGrid : styles.containerStack} ${centered ? styles.centered : ''} ${!centered && illustration ? '' : ''}`}>
                <motion.div
                    className={styles.heroInner}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {badge && <span className={styles.heroTag}>{badge}</span>}
                    <h1 className={styles.heroTitle}>{title}</h1>
                    <p className={styles.heroSubtitle}>{subtitle}</p>
                    {children}
                </motion.div>
                {illustration && (
                    <motion.div
                        className={styles.heroIllustration}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    >
                        {illustration}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default InnerPageHero;
