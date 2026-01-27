import styles from '../landing/landing.module.css';
import InnerPageHero from '../shared/InnerPageHero';

const Support: React.FC = () => {
    return (
        <div className="app-container">
            <InnerPageHero
                title="Support System"
                subtitle="Empathetic support systems designed to help you navigate life's challenges with confidence."
                badge="Support"
            />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button className={styles.primaryCta}>Find Support</button>
                    <button className={styles.secondaryCta}>Contact Us</button>
                </div>
            </div>
        </div>
    );
};

export default Support;
