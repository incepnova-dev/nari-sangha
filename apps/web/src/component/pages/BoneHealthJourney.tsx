import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../routes/routeConstants";
import styles from "./GynaecologyOB.module.css";
import InnerPageHero from "../shared/InnerPageHero";

const BoneHealthJourney: React.FC = () => {
    const navigate = useNavigate();
    const [selectedAge, setSelectedAge] = useState<number>(30);

    const boneDensityInfo = [
        { age: 20, text: "Peak Bone Mass Building: Focus on calcium and weight-bearing exercise.", density: 1.0 },
        { age: 35, text: "Maintenance Phase: Bone breakdown starts to match bone formation.", density: 0.95 },
        { age: 50, text: "Menopausal Transition: Rapid bone loss can occur due to estrogen drop.", density: 0.8 },
        { age: 70, text: "Sustained Protection: Prioritizing fall prevention and bone strength.", density: 0.65 }
    ];

    const currentInfo = boneDensityInfo.find(info => selectedAge <= info.age) || boneDensityInfo[3];

    return (
        <div className={styles.container}>
            <InnerPageHero
                title="Bone & Joint: The Quiet Support"
                subtitle="Protecting your skeletal foundation through every life stage. From building density in youth to maintaining strength in maturity."
                badge="Skeletal Health"
                illustration={
                    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            style={{ position: 'absolute', width: 200, height: 200, border: '2px dashed rgba(233, 30, 99, 0.2)', borderRadius: '50%' }}
                        />
                        <div style={{ fontSize: '100px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}>🦴</div>
                    </div>
                }
            >
                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                    <button className={styles.primaryCta} onClick={() => navigate(ROUTES.SYMPTOM_CHECKER)}>Skeletal Triage</button>
                    <button className={styles.secondaryCta} onClick={() => navigate(ROUTES.SCREENING)}>Book Bone Scan</button>
                </div>
            </InnerPageHero>

            <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ background: 'white', padding: '50px', borderRadius: '40px', boxShadow: '0 15px 50px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '30px' }}>Interactive Bone Density Explorer</h2>

                    <div style={{ marginBottom: '40px' }}>
                        <input
                            type="range"
                            min="15"
                            max="80"
                            value={selectedAge}
                            onChange={(e) => setSelectedAge(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--pink)' }}
                        />
                        <div style={{ marginTop: '15px', fontSize: '24px', fontWeight: 800, color: 'var(--pink)' }}>Age: {selectedAge}</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                        <div style={{
                            width: '100px',
                            height: '200px',
                            background: '#f7fafc',
                            borderRadius: '15px',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid #edf2f7'
                        }}>
                            <motion.div
                                animate={{ height: `${currentInfo.density * 100}%` }}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    background: 'linear-gradient(to top, var(--pink), #ffbed1)',
                                    opacity: 0.8
                                }}
                            />
                        </div>
                    </div>

                    <p style={{ fontSize: '18px', color: '#4a5568', lineHeight: '1.6' }}>
                        {currentInfo.text}
                    </p>
                </div>
            </section>

            <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 800, marginBottom: '50px' }}>Why Bone Health is a Women's Health Issue</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    <div style={{ background: '#fff9fa', padding: '30px', borderRadius: '24px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Estrogen's Role</h3>
                        <p style={{ color: '#666' }}>Estrogen protects bones. When levels drop during menopause, bone loss can accelerate rapidly.</p>
                    </div>
                    <div style={{ background: '#f9f9ff', padding: '30px', borderRadius: '24px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>The Silent Thief</h3>
                        <p style={{ color: '#666' }}>Osteoporosis is often asymptomatic until a fracture occurs. One in three women will experience a fracture.</p>
                    </div>
                    <div style={{ background: '#f5fff8', padding: '30px', borderRadius: '24px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Calcium Synergy</h3>
                        <p style={{ color: '#666' }}>Women absorb calcium differently across their lifespan, requiring strategic supplementation and sunlight.</p>
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <div style={{
                textAlign: 'center',
                padding: '100px 20px',
                background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                marginTop: '60px'
            }}>
                <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '20px', color: '#1a202c' }}>
                    Worried about Osteoporosis?
                </h3>
                <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                    Get a personalized risk assessment and learn about our advanced DEXA screening partnerships.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        style={{ padding: '18px 36px', borderRadius: '50px', border: 'none', background: 'var(--pink)', color: 'white', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 30px rgba(233, 30, 99, 0.2)' }}
                    >
                        Schedule Risk Audit
                    </button>
                    <button
                        onClick={() => navigate(ROUTES.JOURNEYS)}
                        style={{ padding: '18px 36px', borderRadius: '50px', border: '2px solid #e2e8f0', background: 'white', color: '#4a5568', fontWeight: 700, cursor: 'pointer' }}
                    >
                        Explore Other Journeys
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoneHealthJourney;
