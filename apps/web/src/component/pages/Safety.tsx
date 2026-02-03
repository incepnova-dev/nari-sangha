import styles from '../landing/landing.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/Routes';
import InnerPageHero from '../shared/InnerPageHero';


const Safety: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="app-container">
            <InnerPageHero
                title="Your Safety First"
                subtitle="Your digital companion for physical and emotional safety, with quick-access tools and expert guidance."
                badge="Safety"
            />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                    <div style={{ background: '#FFF5F5', padding: '32px', borderRadius: '24px', border: '1px solid #FFEBEB', textAlign: 'left' }}>
                        <div style={{ fontSize: '32px', marginBottom: '16px' }}>🚨</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: '#C62828' }}>Emergency Helpline</h3>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px' }}>Immediate assistance for women in distress or facing violence.</p>
                        <a href="tel:181" style={{ fontSize: '24px', fontWeight: '900', color: '#C62828', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>📞 181</a>
                        <span style={{ fontSize: '13px', color: '#888' }}>Available 24/7 across India</span>
                    </div>

                    <div style={{ background: '#F0F4FF', padding: '32px', borderRadius: '24px', border: '1px solid #E1E8FF', textAlign: 'left' }}>
                        <div style={{ fontSize: '32px', marginBottom: '16px' }}>🛡️</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: '#1A237E' }}>Sakhi Centers</h3>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px' }}>One-stop support centers providing medical, legal, and shelter aid.</p>
                        <button
                            onClick={() => navigate(ROUTES.GOVERNMENT_SCHEMES)}
                            style={{ background: '#1A237E', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
                        >
                            Find Near You
                        </button>
                    </div>

                    <div style={{ background: '#F3E5F5', padding: '32px', borderRadius: '24px', border: '1px solid #E1BEE7', textAlign: 'left' }}>
                        <div style={{ fontSize: '32px', marginBottom: '16px' }}>💜</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: '#4A148C' }}>Safe Community</h3>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px' }}>Moderated safe spaces to share experiences and get peer support.</p>
                        <button
                            onClick={() => navigate(ROUTES.COMMUNITY)}
                            style={{ background: '#4A148C', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
                        >
                            Join Support Groups
                        </button>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '24px' }}>Digital Safety Checklist</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {[
                            "Use Incognito/Private mode for sensitive searches",
                            "Enable Two-Factor Authentication (2FA) on all accounts",
                            "Use a strong, unique password for your health portal",
                            "Be cautious about sharing location data in apps",
                            "Periodic check of app permissions on your phone",
                            "Know how to quickly reach emergency contacts"
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '15px', color: '#555' }}>
                                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✓</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '60px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    {/* <button className={styles.secondaryCta} onClick={() => navigate(ROUTES.STORIES)}>Read Survivor Stories</button> */}
                    <button className={styles.primaryCta} onClick={() => navigate(ROUTES.APPOINTMENTS)}>Talk to a Counselor</button>
                </div>
            </div>
        </div>
    );
};

export default Safety;
