import React from "react";
import styles from "./InnerPageHero.module.css";

interface InnerPageHeroProps {
    title: string;
    subtitle: string;
    badge?: string;
}

const InnerPageHero: React.FC<InnerPageHeroProps> = ({ title, subtitle, badge }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroInner}>
                {badge && <span className={styles.heroTag}>{badge}</span>}
                <h1 className={styles.heroTitle}>{title}</h1>
                <p className={styles.heroSubtitle}>{subtitle}</p>
            </div>
        </section>
    );
};

export default InnerPageHero;
