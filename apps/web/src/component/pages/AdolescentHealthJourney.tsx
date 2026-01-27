import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const AdolescentHealthJourney: React.FC = () => {
    const navigate = useNavigate();

    const keyTopics = [
        {
            title: "Puberty & Body Changes",
            topics: ["Breast development", "First period (menarche)", "Growth spurts", "Body hair", "Skin changes (acne)"],
            icon: "🌸",
            color: "#FCE4EC"
        },
        {
            title: "Menstrual Health",
            topics: ["Period basics", "Hygiene products", "Tracking cycles", "Managing cramps", "When to talk to a doctor"],
            icon: "📅",
            color: "#F3E5F5"
        },
        {
            title: "Nutrition & Fitness",
            topics: ["Balanced eating", "Hydration", "Physical activity", "Body image", "Healthy habits"],
            icon: "🥗",
            color: "#E8F5E9"
        },
        {
            title: "Mental Wellbeing",
            topics: ["Mood changes", "School stress", "Friendships", "Self-esteem", "Getting help"],
            icon: "💜",
            color: "#E3F2FD"
        }
    ];

    const periodBasics = [
        { question: "What is a period?", answer: "Monthly shedding of uterine lining, usually lasting 3-7 days" },
        { question: "When does it start?", answer: "Average age 12, but anywhere from 9-16 is normal" },
        { question: "How often?", answer: "Every 21-35 days, cycles may be irregular at first" },
        { question: "What products to use?", answer: "Pads, tampons, menstrual cups—try what feels comfortable" }
    ];

    const healthyHabits = [
        "Eat a variety of colorful fruits and vegetables",
        "Stay active with sports, dance, or activities you enjoy",
        "Get 8-10 hours of sleep each night",
        "Drink plenty of water throughout the day",
        "Practice good hygiene during periods",
        "Talk to trusted adults about changes in your body",
        "Be kind to yourself—everyone develops at their own pace"
    ];

    const whenToTalk = [
        "Haven't started period by age 15",
        "Severe period pain that affects daily activities",
        "Very heavy bleeding (changing products every hour)",
        "Irregular periods after 2-3 years of menstruating",
        "Concerning changes in mood or mental health",
        "Questions about body changes or development"
    ];

    return (
        <div className="app-container">
            <InnerPageHero
                title="Adolescent & Young Women's Health"
                subtitle="Navigate puberty, periods, and growing up with accurate information, support, and reassurance."
                badge="Teen Health"
            />

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
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f9f9f9";
                        e.currentTarget.style.color = "var(--pink)";
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

                {/* Who This Is For */}
                <div style={{ marginBottom: '60px' }}>
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '20px' }}>
                        Who This Journey Is For
                    </h2>
                    <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#555' }}>
                        This journey is for adolescent girls and young women (ages 9-19) navigating puberty, first periods,
                        body changes, and all the questions that come with growing up. It's also a helpful resource for parents
                        and caregivers supporting young women through this important transition.
                    </p>
                </div>

                {/* Key Topics */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    What We Cover
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {keyTopics.map((topic, idx) => (
                        <div key={idx} style={{
                            background: topic.color,
                            padding: '28px',
                            borderRadius: '20px',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{topic.icon}</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>{topic.title}</h3>
                            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
                                {topic.topics.map((item, tidx) => (
                                    <li key={tidx} style={{ marginBottom: '4px' }}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Period Basics Q&A */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Period Basics: Common Questions
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {periodBasics.map((item, idx) => (
                        <div key={idx} className={styles.productCard} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                            <h4 style={{ fontSize: '15px', color: 'var(--pink)', marginBottom: '8px', fontWeight: '700' }}>
                                {item.question}
                            </h4>
                            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{item.answer}</p>
                        </div>
                    ))}
                </div>

                {/* Building Healthy Habits */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Building Healthy Habits
                </h2>
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    marginBottom: '60px'
                }}>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
                        The habits you build now will support your health for years to come. Focus on small, positive changes:
                    </p>
                    <ul style={{ paddingLeft: '24px', fontSize: '15px', color: '#555', lineHeight: '2' }}>
                        {healthyHabits.map((habit, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>
                                <span style={{ color: 'var(--pink)', fontWeight: '700', marginRight: '8px' }}>✓</span>
                                {habit}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Reassurance Section */}
                <div style={{
                    padding: '32px',
                    background: '#F3E5F5',
                    borderRadius: '20px',
                    marginBottom: '60px',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '20px', color: '#6A1B9A' }}>
                        💜 You're Not Alone
                    </h2>
                    <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.7' }}>
                        Growing up comes with lots of changes, and it's totally normal to have questions or feel confused sometimes.
                        Every girl goes through puberty at her own pace—there's no "right" timeline. Your body is doing exactly what
                        it's supposed to do. If you ever feel worried or have questions, talk to a trusted adult, school nurse, or doctor.
                        They're there to help you!
                    </p>
                </div>

                {/* When to Talk to a Doctor */}
                <div style={{
                    padding: '30px',
                    background: '#FFF8E1',
                    borderRadius: '20px',
                    border: '1px solid #FFE082',
                    marginBottom: '60px'
                }}>
                    <h2 style={{ color: '#F57C00', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
                        👩‍⚕️ When to Talk to a Healthcare Provider
                    </h2>
                    <ul style={{ paddingLeft: '20px', color: '#666', fontSize: '15px', lineHeight: '1.8' }}>
                        {whenToTalk.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
                        ))}
                    </ul>
                    <p style={{ marginTop: '16px', fontSize: '14px', color: '#777', fontStyle: 'italic' }}>
                        Remember: No question is too small or embarrassing. Healthcare providers are here to help you stay healthy!
                    </p>
                </div>

                {/* Support CTA */}
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    background: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)',
                    borderRadius: '24px'
                }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#2A2A2A' }}>
                        Have Questions or Concerns?
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>
                        Connect with healthcare providers who specialize in adolescent health and can answer all your questions.
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{ padding: '14px 28px', fontSize: '15px' }}
                    >
                        Talk to a Specialist
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AdolescentHealthJourney;
