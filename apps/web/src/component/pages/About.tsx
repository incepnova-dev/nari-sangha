import React from "react";
import styles from "../landing/landing.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

const About: React.FC = () => {
    const stats = [
        { label: "Women supported", value: "50K+", sub: "Across life stages" },
        { label: "Expert network", value: "120+", sub: "Doctors & mentors" },
        { label: "Support", value: "24×7", sub: "Journeys & tools" },
    ];

    const values = [
        { title: "Compassion first", desc: "Every journey is personal. We treat symptoms and stigma with empathy.", icon: "❤️" },
        { title: "Evidence-based care", desc: "All guidance is rooted in clinical guidelines and expert review.", icon: "🛡️" },
        { title: "Quality information", desc: "We prioritize clarity, accuracy, and Indian context over sensation.", icon: "⭐" },
        { title: "Community support", desc: "Women learn best from women. Shared experiences help you feel prepared.", icon: "👥" },
    ];

    const supportFeatures = [
        { title: "Guided Journeys", desc: "Step-by-step pathways aligned with local realities.", icon: "🛣️" },
        { title: "Symptom Education", desc: "Plain language explanations for better health literacy.", icon: "🩺" },
        { title: "Bridging Offline Care", desc: "Tools to prepare for and understand doctor visits.", icon: "🤝" },
    ];

    return (
        <div className="app-container">
            {/* Hero */}
            <InnerPageHero
                title="Reimagining guided health journeys for every woman"
                subtitle="Nari Sangha combines evidence-based guidance, culturally aware content, and digital tools so you can navigate life stages with confidence."
                badge="Our Story"
                illustration={
                    <div style={{ position: "relative" }}>
                        <img
                            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200"
                            alt="Doctor discussing with patients"
                            style={{ width: "100%", borderRadius: "24px", border: "10px solid white", boxShadow: "1px 1px 0px #ff8fa3, 2px 2px 0px #ff8fa3, 3px 3px 0px #ff8fa3, 4px 4px 0px #ff8fa3, 8px 8px 20px rgba(0,0,0,0.1)" }}
                        />
                    </div>
                }
            >
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🇮🇳 Made for India</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🗣️ Local Languages</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🛡️ Trusted Experts</span>
                </div>
            </InnerPageHero>

            <div style={{ background: 'var(--theme-bg-accent)', paddingTop: '80px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

                    {/* Mission & Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center', marginBottom: '100px' }}>
                        <div>
                            <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '24px' }}>Our Mission</h2>
                            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#555', marginBottom: '20px' }}>
                                Nari Sangha was created to close the gap between medical information and everyday decisions. We believe that trustworthy support should be accessible in every mother tongue across India.
                            </p>
                            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#555' }}>
                                From tier-1 cities to small towns, our aim is to make health support feel like a conversation with a friend, not a textbook.
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                            {stats.map(s => (
                                <div key={s.label} style={{ background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '24px' }}>
                                    <div style={{ fontSize: '40px', fontWeight: '900', color: 'var(--pink)' }}>{s.value}</div>
                                    <div>
                                        <div style={{ fontWeight: '800', color: '#333' }}>{s.label}</div>
                                        <div style={{ fontSize: '14px', color: '#777' }}>{s.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Values */}
                    <div style={{ marginBottom: '100px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px', textAlign: 'center' }}>What we stand for</h2>
                        <p style={{ color: '#666', textAlign: 'center', marginBottom: '50px' }}>Our platform blends clinical insight with lived experiences.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                            {values.map(v => (
                                <div key={v.title} className={styles.card} style={{ padding: '32px', background: 'white', borderRadius: '24px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '32px', marginBottom: '16px' }}>{v.icon}</div>
                                    <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>{v.title}</h3>
                                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How we support */}
                    <div style={{ background: 'white', padding: '80px 40px', borderRadius: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px', textAlign: 'center' }}>How we support your journey</h2>
                        <p style={{ color: '#666', textAlign: 'center', marginBottom: '50px' }}>Tools and services designed for real-life health management.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                            {supportFeatures.map(f => (
                                <div key={f.title}>
                                    <div style={{ fontSize: '36px', marginBottom: '20px' }}>{f.icon}</div>
                                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>{f.title}</h3>
                                    <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6' }}>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div style={{ marginTop: '100px', background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%)', padding: '80px 40px', borderRadius: '40px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '20px' }}>Ready to start your journey?</h2>
                        <p style={{ fontSize: '18px', color: '#555', maxWidth: '700px', margin: '0 auto 40px' }}>
                            Begin with a journey that matches your current life stage and join 50k+ women who trust Nari Sangha.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to={ROUTES.JOURNEYS} className={styles.primaryCta} style={{ padding: '16px 40px', fontSize: '18px' }}>Explore Journeys</Link>
                            <Link to={ROUTES.COMMUNITY} className={styles.secondaryCta} style={{ padding: '16px 40px', fontSize: '18px' }}>Meet the Community</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;
