import styles from '../landing/landing.module.css';
import InnerPageHero from '../shared/InnerPageHero';

const Safety: React.FC = () => {
    return (
        <div className="app-container">
            <InnerPageHero
                title="Your Safety First"
                subtitle="Your digital companion for physical and emotional safety, with quick-access tools and expert guidance."
                badge="Safety"
            />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button className={styles.primaryCta}>Safety Tools</button>
                    <button className={styles.secondaryCta}>Get Help</button>
                </div>
            </div>
        </div>
    );
};

export default Safety;
