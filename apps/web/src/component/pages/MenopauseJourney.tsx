import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import intStyles from "../../styles/common/StaticIntegration.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

interface Stage {
    id: string;
    title: string;
    sublabel: string;
    icon: string;
    ageRange: string;
    description: string;
    duration: string;
    symptoms: string[];
    hormoneNote: string;
}

interface BodySystem {
    name: string;
    icon: string;
    effects: string[];
    earlyStage: string;
    lateStage: string;
}

const MenopauseJourney: React.FC = () => {
    const navigate = useNavigate();
    const [activeStage, setActiveStage] = useState<string>("perimenopause");

    const stages: Stage[] = [
        {
            id: "reproductive",
            title: "Reproductive",
            sublabel: "Regular Cycles",
            icon: "🌸",
            ageRange: "Puberty - ~40s",
            duration: "Most of reproductive life",
            description: "Regular menstrual cycles, stable hormone levels, and peak fertility years.",
            symptoms: ["Regular periods", "Predictable ovulation", "Stable mood", "Good bone density"],
            hormoneNote: "Estrogen and progesterone fluctuate in regular monthly patterns."
        },
        {
            id: "perimenopause",
            title: "Perimenopause",
            sublabel: "Transition Phase",
            icon: "🌅",
            ageRange: "40s - early 50s",
            duration: "4-8 years typically",
            description: "The transition period when hormones begin to fluctuate unpredictably. Fertility declines but pregnancy still possible.",
            symptoms: [
                "Irregular periods (shorter or longer)",
                "Hot flashes and night sweats",
                "Sleep disturbances",
                "Mood changes",
                "Vaginal dryness",
                "Weight changes",
                "Brain fog and memory issues"
            ],
            hormoneNote: "Estrogen levels fluctuate wildly - can be higher than normal some months, then drop suddenly."
        },
        {
            id: "postmenopause",
            title: "Post-Menopause",
            sublabel: "New Chapter",
            icon: "✨",
            ageRange: "After 12 months without period",
            duration: "Rest of life",
            description: "Begins 12 months after your final period. Many symptoms ease, but long-term health considerations become important.",
            symptoms: [
                "Hot flashes may continue (or stop)",
                "Vaginal/urinary changes",
                "Bone density loss accelerates",
                "Heart health becomes key focus",
                "Skin and hair changes",
                "Stable but lowered energy"
            ],
            hormoneNote: "Estrogen levels remain consistently low. Body adapts to new hormonal baseline."
        }
    ];

    const bodySystems: BodySystem[] = [
        {
            name: "Cardiovascular",
            icon: "❤️",
            effects: ["Heart palpitations", "Blood pressure changes", "Cholesterol shifts"],
            earlyStage: "Occasional palpitations during hot flashes",
            lateStage: "Increased cardiovascular disease risk requires lifestyle attention"
        },
        {
            name: "Skeletal",
            icon: "🦴",
            effects: ["Bone density loss", "Joint stiffness", "Muscle mass changes"],
            earlyStage: "Bone loss begins accelerating",
            lateStage: "Osteoporosis risk increases significantly"
        },
        {
            name: "Neurological",
            icon: "🧠",
            effects: ["Brain fog", "Memory changes", "Mood fluctuations"],
            earlyStage: "Cognitive changes often most noticeable",
            lateStage: "Brain adapts, symptoms often improve"
        },
        {
            name: "Skin & Hair",
            icon: "💆",
            effects: ["Dryness", "Elasticity loss", "Hair thinning"],
            earlyStage: "Collagen production slows",
            lateStage: "Ongoing care helps maintain skin health"
        },
        {
            name: "Urogenital",
            icon: "💧",
            effects: ["Vaginal dryness", "Urinary changes", "Bladder sensitivity"],
            earlyStage: "Tissue changes begin",
            lateStage: "Atrophy can worsen without treatment"
        },
        {
            name: "Metabolic",
            icon: "⚡",
            effects: ["Weight distribution", "Blood sugar", "Energy levels"],
            earlyStage: "Metabolism slowing begins",
            lateStage: "Higher risk of metabolic syndrome"
        }
    ];

    const managementStrategies = [
        {
            category: "Lifestyle",
            icon: "🏃‍♀️",
            items: [
                "Regular weight-bearing exercise (30 min, 5x/week)",
                "Balanced diet rich in calcium and vitamin D",
                "Limit caffeine and alcohol",
                "Stress-reduction techniques (yoga, meditation)",
                "Dress in layers for hot flash management",
                "Keep bedroom cool for better sleep"
            ]
        },
        {
            category: "Nutrition",
            icon: "🥗",
            items: [
                "Calcium: 1200mg daily (food + supplements)",
                "Vitamin D: 600-800 IU daily",
                "Omega-3 fatty acids for heart health",
                "Phytoestrogens (soy, flaxseed) may help",
                "Adequate protein for muscle maintenance",
                "Stay well-hydrated"
            ]
        },
        {
            category: "Medical Options",
            icon: "💊",
            items: [
                "Hormone Replacement Therapy (HRT) - discuss with doctor",
                "Low-dose vaginal estrogen for urogenital symptoms",
                "Non-hormonal medications for hot flashes",
                "Bone density screening (DEXA scan)",
                "Regular cardiovascular screening",
                "Annual well-woman visits"
            ]
        },
        {
            category: "Mental Health",
            icon: "🧘",
            items: [
                "Cognitive behavioral therapy for mood changes",
                "Support groups (online or in-person)",
                "Mindfulness and relaxation practices",
                "Adequate sleep hygiene",
                "Stay socially connected",
                "Consider counseling if needed"
            ]
        }
    ];

    const activeStageData = stages.find(s => s.id === activeStage) || stages[1];

    return (
        <div className="app-container theme-lavender">
            <InnerPageHero
                title="Menopause Journey"
                subtitle="Understanding the stages, symptoms, and strategies for thriving through hormonal transition."
                badge="Hormonal Health"
            />

            {/* Back Navigation */}
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
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f9f9f9";
                        e.currentTarget.style.color = "var(--pink-primary)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.color = "#666";
                    }}
                >
                    <span style={{ fontSize: "16px" }}>←</span>
                    Back to all journeys
                </button>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Stage Selection */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>Understanding the Stages</h2>
                    <p className={intStyles.sectionSubtitle}>Menopause is a journey through three distinct phases. Click to explore each stage.</p>
                </section>

                {/* Stage Toggle Buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginBottom: '40px'
                }}>
                    {stages.map((stage) => (
                        <button
                            key={stage.id}
                            onClick={() => setActiveStage(stage.id)}
                            className={intStyles.factorBtn}
                            style={{
                                padding: '16px 24px',
                                background: activeStage === stage.id
                                    ? 'linear-gradient(135deg, var(--pink-primary), #ad1457)'
                                    : 'white',
                                color: activeStage === stage.id ? 'white' : 'var(--text-primary)',
                                borderColor: activeStage === stage.id ? 'var(--pink-primary)' : 'var(--border-medium)',
                                boxShadow: activeStage === stage.id
                                    ? '0 8px 25px rgba(216, 27, 96, 0.3)'
                                    : '0 4px 15px rgba(0,0,0,0.05)'
                            }}
                        >
                            <span style={{ fontSize: '24px' }}>{stage.icon}</span>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: '700' }}>{stage.title}</div>
                                <div style={{ fontSize: '12px', opacity: 0.8 }}>{stage.sublabel}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Active Stage Details */}
                <div className={intStyles.bodySimulatorSection} style={{ marginBottom: '60px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        <div>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{activeStageData.icon}</div>
                            <h3 style={{ fontSize: '28px', marginBottom: '8px', color: 'var(--text-primary)' }}>{activeStageData.title}</h3>
                            <div style={{
                                display: 'inline-block',
                                background: 'var(--pink-soft)',
                                color: 'var(--pink-primary)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '600',
                                marginBottom: '16px'
                            }}>
                                {activeStageData.ageRange}
                            </div>
                            <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                {activeStageData.description}
                            </p>
                            <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-secondary)', background: 'var(--accent-lavender)', padding: '12px 16px', borderRadius: '12px' }}>
                                <strong>Hormone Note:</strong> {activeStageData.hormoneNote}
                            </p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-primary)' }}>Common Symptoms & Changes</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                {activeStageData.symptoms.map((symptom, idx) => (
                                    <li key={idx} style={{
                                        marginBottom: '12px',
                                        fontSize: '14px',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        {symptom}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ marginTop: '20px', padding: '12px', background: 'white', borderRadius: '12px', border: '2px solid var(--pink-soft)' }}>
                                <strong style={{ color: 'var(--pink-primary)', fontSize: '13px' }}>Duration:</strong>
                                <span style={{ fontSize: '14px', marginLeft: '8px', color: 'var(--text-secondary)' }}>{activeStageData.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body Systems Affected */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>How Your Body Changes</h2>
                    <p className={intStyles.sectionSubtitle}>Menopause affects multiple body systems. Understanding these changes helps you manage them effectively.</p>
                </section>

                <div className={intStyles.methodsGrid} style={{ marginBottom: '60px' }}>
                    {bodySystems.map((system, idx) => (
                        <div key={idx} className={intStyles.methodCard}>
                            <div className={intStyles.methodIcon}>{system.icon}</div>
                            <h3>{system.name}</h3>
                            <div style={{ marginBottom: '12px' }}>
                                {system.effects.map((effect, i) => (
                                    <span key={i} style={{
                                        display: 'inline-block',
                                        background: 'var(--pink-soft)',
                                        color: 'var(--pink-primary)',
                                        padding: '3px 10px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        marginRight: '6px',
                                        marginBottom: '6px'
                                    }}>
                                        {effect}
                                    </span>
                                ))}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <strong>Perimenopause:</strong> {system.earlyStage}
                                </div>
                                <div>
                                    <strong>Post-menopause:</strong> {system.lateStage}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Management Strategies */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>Management Strategies</h2>
                    <p className={intStyles.sectionSubtitle}>Evidence-based approaches to managing symptoms and maintaining long-term health.</p>
                </section>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                    marginBottom: '60px'
                }}>
                    {managementStrategies.map((strategy, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '24px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            borderTop: '4px solid var(--pink-primary)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '32px' }}>{strategy.icon}</span>
                                <h4 style={{ fontSize: '18px', margin: 0, color: 'var(--text-primary)' }}>{strategy.category}</h4>
                            </div>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                {strategy.items.map((item, i) => (
                                    <li key={i} style={{
                                        marginBottom: '10px',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* When to See a Doctor */}
                <div style={{
                    padding: '30px',
                    background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
                    borderRadius: '20px',
                    border: '2px solid #FFB74D',
                    marginBottom: '60px'
                }}>
                    <h3 style={{ color: '#E65100', marginBottom: '20px', fontSize: '22px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>⚠️</span> When to See Your Healthcare Provider
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                        {[
                            "Heavy or prolonged bleeding",
                            "Bleeding after 12 months without periods",
                            "Severe mood changes affecting daily life",
                            "Symptoms significantly impacting quality of life",
                            "Questions about hormone therapy",
                            "Concerns about bone health"
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '18px' }}>•</span>
                                <span style={{ fontWeight: '500', color: '#BF360C', fontSize: '14px' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support CTA */}
                <div className={intStyles.ctaSection}>
                    <h3>Ready to discuss your menopause journey?</h3>
                    <p>Connect with our specialists for personalized guidance and support.</p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{ padding: '14px 28px', fontSize: '15px' }}
                    >
                        Book a Consultation
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MenopauseJourney;
