import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../routes/routeConstants";
import styles from "./GynaecologyOB.module.css"; // Reuse styling for consistency
import InnerPageHero from "../shared/InnerPageHero";

const AutoimmuneHealthJourney: React.FC = () => {
    const navigate = useNavigate();

    const autoimmuneTypes = [
        { id: "lupus", name: "Lupus (SLE)", focus: "Affecting joints, skin, and kidneys.", icon: "🦋" },
        { id: "ra", name: "Rheumatoid Arthritis", focus: "Chronic inflammation of the joints.", icon: "🦴" },
        { id: "hashimoto", name: "Hashimoto's", focus: "Thyroid gland under attack.", icon: "🦋" },
        { id: "ms", name: "Multiple Sclerosis", focus: "Central nervous system communication.", icon: "🧠" }
    ];

    const whyWomen = [
        {
            title: "The X-Factor",
            text: "Women have two X chromosomes, which contain many immune-related genes. This 'double dose' can increase susceptibility.",
            icon: "🧬"
        },
        {
            title: "Hormonal Influence",
            text: "Estrogen and progesterone interact with the immune system, often modulating its response in complex ways.",
            icon: "⚖️"
        },
        {
            title: "Pregnancy Markers",
            text: "Microchimerism—the presence of fetal cells in a mother's body—can sometimes trigger immune confusion years later.",
            icon: "🤰"
        }
    ];

    return (
        <div className={styles.container}>
            <InnerPageHero
                title="Autoimmune Health: The Silent Storm"
                subtitle="Understanding why 80% of autoimmune cases affect women and how to navigate your immune journey with precision."
                badge="Immune Wellness"
                illustration={
                    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            style={{ width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)' }}
                        />
                        <div style={{ position: 'absolute', fontSize: '100px' }}>🧬</div>
                    </div>
                }
            >
                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                    <button className={styles.primaryCta} onClick={() => navigate(ROUTES.SYMPTOM_CHECKER)}>Check Your Symptoms</button>
                    <button className={styles.secondaryCta} onClick={() => navigate(ROUTES.FIND_DOCTORS)}>Find a Specialist</button>
                </div>
            </InnerPageHero>

            <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#2D3748', marginBottom: '20px' }}>The 'Silent Storm' in Women</h2>
                    <p style={{ fontSize: '18px', color: '#4A5568', maxWidth: '800px', margin: '0 auto' }}>
                        Autoimmune conditions are the leading cause of death and disability in women under 65.
                        Knowledge is your first line of defense.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {whyWomen.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}
                        >
                            <div style={{ fontSize: '40px', marginBottom: '20px' }}>{item.icon}</div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#2D3748', marginBottom: '15px' }}>{item.title}</h3>
                            <p style={{ color: '#718096', lineHeight: '1.7' }}>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section style={{ background: '#f7fafc', padding: '80px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#2D3748', marginBottom: '40px', textAlign: 'center' }}>Explore Common Conditions</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                        {autoimmuneTypes.map((type) => (
                            <div
                                key={type.id}
                                style={{ background: 'white', padding: '30px', borderRadius: '24px', cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{type.icon}</div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#2D3748', marginBottom: '8px' }}>{type.name}</h3>
                                <p style={{ fontSize: '14px', color: '#718096' }}>{type.focus}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <div style={{
                textAlign: 'center',
                padding: '100px 20px',
                background: 'linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%)',
                marginTop: '60px'
            }}>
                <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '20px', color: '#1a202c' }}>
                    Feeling Overwhelmed by Symptoms?
                </h3>
                <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                    Our specialists can help you distinguish between ordinary fatigue and autoimmune triggers.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        style={{ padding: '18px 36px', borderRadius: '50px', border: 'none', background: 'var(--pink)', color: 'white', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 30px rgba(233, 30, 99, 0.2)' }}
                    >
                        Book Consultation
                    </button>
                    <button
                        onClick={() => navigate(ROUTES.JOURNEYS)}
                        style={{ padding: '18px 36px', borderRadius: '50px', border: '2px solid #e2e8f0', background: 'white', color: '#4a5568', fontWeight: 700, cursor: 'pointer' }}
                    >
                        Back to Paths
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AutoimmuneHealthJourney;
