import styles from '../landing/landing.module.css';
import InnerPageHero from '../shared/InnerPageHero';

const Stories: React.FC = () => {
    return (
        <div className="app-container">
            <InnerPageHero
                title="Voices of Wisdom"
                subtitle="Inspiring journeys of resilience, health, and community from women around the world."
                badge="Stories"
            />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button className={styles.primaryCta}>Read Stories</button>
                    <button className={styles.secondaryCta}>Share Your Story</button>
                </div>
            </div>
        </div>
    );
};

export default Stories;
