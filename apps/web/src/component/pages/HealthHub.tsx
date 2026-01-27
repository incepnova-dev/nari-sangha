import styles from '../landing/landing.module.css';
import InnerPageHero from '../shared/InnerPageHero';

const HealthHub: React.FC = () => {
    return (
        <div className="app-container">
            <InnerPageHero
                title="Your Health Dashboard"
                subtitle="Expert-backed resources and personalized health tracking for your physical and mental well-being."
                badge="Health Hub"
            />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button className={styles.primaryCta}>Explore Hub</button>
                    <button className={styles.secondaryCta}>Read Articles</button>
                </div>
            </div>
        </div>
    );
};

export default HealthHub;
