import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const MenopauseJourney: React.FC = () => {
    const navigate = useNavigate();
    const [currentStage, setCurrentStage] = useState("Perimenopause");

    const stages = [
        {
            name: "Perimenopause",
            icon: "🌓",
            desc: "The transition phase where hormone levels start to fluctuate.",
            stats: ["Age: 40-50", "Duration: 4-10 yrs"],
            symptoms: [
                { title: "Hot Flashes", desc: "Sudden waves of heat and sweating.", tip: "Layered clothing & fans help." },
                { title: "Irregular Cycles", desc: "Changes in flow and frequency.", tip: "Track cycles closely." },
                { title: "Mood Swings", desc: "Increased irritability or anxiety.", tip: "Mindfulness and sleep." },
                { title: "Sleep Issues", desc: "Difficulty falling or staying asleep.", tip: "Cool room & dark curtains." }
            ]
        },
        {
            name: "Menopause",
            icon: "🌕",
            desc: "The point when you haven't had a period for 12 consecutive months.",
            stats: ["Average Age: 51", "Marker: 12 months"],
            symptoms: [
                { title: "Vaginal Dryness", desc: "Lower estrogen affects lubrication.", tip: "Water-based moisturizers." },
                { title: "Joint Pain", desc: "Aches due to inflammation changes.", tip: "Low-impact exercise." },
                { title: "Brain Fog", desc: "Difficulty concentrating or memory lapses.", tip: "Puzzles & routine help." },
                { title: "Heart Palpitations", desc: "Sudden fluttering in the chest.", tip: "Reduce caffeine & stress." }
            ]
        },
        {
            name: "Postmenopause",
            icon: "🌑",
            desc: "The years after menopause has occurred.",
            stats: ["Duration: Lifetime", "Focus: Bone & Heart"],
            symptoms: [
                { title: "Bone Density", desc: "Increased risk of osteoporosis.", tip: "Calcium & Vitamin D." },
                { title: "Heart Health", desc: "Changes in cholesterol and vessel health.", tip: "Regular cardio checks." },
                { title: "Skin Changes", desc: "Reduced collagen leads to thinning.", tip: "Hydration & sun protection." },
                { title: "Urinary Changes", desc: "Changes in pelvic floor strength.", tip: "Kegel exercises daily." }
            ]
        }
    ];

    const activeStageData = stages.find(s => s.name === currentStage) || stages[0];

    return (
        <div className="app-container">
            <InnerPageHero
                title="Menopause Journey"
                subtitle="Navigate the change with confidence. Our interactive guide helps you understand your body's transition and manage symptoms effectively."
                badge="The Change"
            >
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🧪 Hormone Tracking</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🦴 Bone Health</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🧘 Mental Wellbeing</span>
                </div>
            </InnerPageHero>

            {/* Back Button */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 20px 0' }}>
                <button
                    onClick={() => navigate(ROUTES.JOURNEYS)}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 16px",
                        background: "white",
                        border: "1px solid #eee",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#666",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                    }}
                >
                    <span style={{ fontSize: "16px" }}>←</span>
                    Back to all journeys
                </button>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Journey Track */}
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '30px' }}>Select Your Stage</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', background: 'rgba(0,0,0,0.02)', padding: '10px', borderRadius: '40px', width: 'fit-content', margin: '0 auto' }}>
                        {stages.map(s => (
                            <button
                                key={s.name}
                                onClick={() => setCurrentStage(s.name)}
                                style={{
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '30px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    background: currentStage === s.name ? 'var(--pink)' : 'transparent',
                                    color: currentStage === s.name ? 'white' : '#666',
                                    boxShadow: currentStage === s.name ? '0 8px 16px rgba(236, 64, 122, 0.2)' : 'none'
                                }}
                            >
                                {s.icon} {s.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stage Detail Card */}
                <div style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '32px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                    marginBottom: '60px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px',
                    alignItems: 'center'
                }}>
                    <div>
                        <span style={{ color: 'var(--pink)', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', display: 'block' }}>Active Stage Insight</span>
                        <h3 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '16px' }}>{activeStageData.name}</h3>
                        <p style={{ fontSize: '17px', color: '#555', lineHeight: '1.7', marginBottom: '24px' }}>{activeStageData.desc}</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {activeStageData.stats.map(stat => (
                                <div key={stat} style={{ background: '#F8F9FA', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: '#666' }}>{stat}</div>
                            ))}
                        </div>
                    </div>
                    <div style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)', height: '300px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
                        {activeStageData.icon}
                    </div>
                </div>

                {/* Symptoms Grid */}
                <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '30px', textAlign: 'center' }}>Navigating Symptoms</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '80px' }}>
                    {activeStageData.symptoms.map(sym => (
                        <div key={sym.title} className={styles.card} style={{ padding: '24px', background: 'white', borderRadius: '20px' }}>
                            <h4 style={{ color: 'var(--pink)', marginBottom: '8px', fontWeight: '800' }}>{sym.title}</h4>
                            <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>{sym.desc}</p>
                            <div style={{ background: '#FFF8E1', padding: '10px', borderRadius: '10px', fontSize: '12px' }}>
                                <strong style={{ color: '#F57C00' }}>💡 Pro Tip:</strong> {sym.tip}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Whole Body Scanner Info */}
                <div style={{ background: '#1A237E', color: 'white', padding: '60px 40px', borderRadius: '40px', marginBottom: '80px' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '20px' }}>The Whole Body Impact</h2>
                        <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: '1.6', marginBottom: '40px' }}>
                            Menopause isn't just about hot flashes. Estrogen receptors are located throughout your body, affecting your brain, heart, bones, and skin.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                            {[
                                { area: "Brain", effect: "Memory & Mood" },
                                { area: "Heart", effect: "Artery Health" },
                                { area: "Bones", effect: "Density Support" },
                                { area: "Skin", effect: "Collagen Levels" }
                            ].map(a => (
                                <div key={a.area} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h4 style={{ fontWeight: '800', marginBottom: '4px' }}>{a.area}</h4>
                                    <p style={{ fontSize: '12px', opacity: 0.7 }}>{a.effect}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div style={{ textAlign: 'center', background: 'white', padding: '60px', borderRadius: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '16px' }}>Ready for a personalized plan?</h3>
                    <p style={{ color: '#666', marginBottom: '32px' }}>Connect with our menopause specialists for HRT guidance, lifestyle adjustments, and holistic support.</p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        style={{ background: 'var(--pink)', color: 'white', border: 'none', padding: '16px 40px', borderRadius: '30px', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}
                    >
                        Speak to a Specialist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenopauseJourney;
