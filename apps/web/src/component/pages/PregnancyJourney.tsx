import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import intStyles from "../../styles/common/StaticIntegration.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const PregnancyJourney: React.FC = () => {
    const navigate = useNavigate();

    const trimesters = [
        {
            title: "First Trimester",
            weeks: "Weeks 1-12",
            icon: "🌱",
            details: [
                { label: "Week 1-4", info: "Fertilization and implantation" },
                { label: "Week 5-8", info: "Major organs begin forming" },
                { label: "Week 9-12", info: "Baby's heartbeat detectable" }
            ],
            symptoms: "Morning sickness, fatigue, breast tenderness",
            actions: "Prenatal vitamins, first ultrasound, blood tests",
            color: "var(--accent-light-blue)"
        },
        {
            title: "Second Trimester",
            weeks: "Weeks 13-26",
            icon: "👶",
            details: [
                { label: "Week 13-16", info: "Baby can hear sounds" },
                { label: "Week 17-20", info: "Feel baby's movements (quickening)" },
                { label: "Week 21-26", info: "Rapid brain development" }
            ],
            symptoms: "Reduced nausea, energy boost, growing belly",
            actions: "Anatomy scan, glucose screening, childbirth classes",
            color: "var(--accent-lavender)"
        },
        {
            title: "Third Trimester",
            weeks: "Weeks 27-40",
            icon: "💗",
            details: [
                { label: "Week 27-32", info: "Eyes open, baby gains weight" },
                { label: "Week 33-36", info: "Bones harden, lungs mature" },
                { label: "Week 37-40", info: "Full term, ready for birth!" }
            ],
            symptoms: "Back pain, frequent urination, Braxton Hicks",
            actions: "Hospital bag, birth plan, Group B strep test",
            color: "var(--pink-soft)"
        }
    ];

    const nutrition = [
        { name: "Folic Acid", icon: "💊", dosage: "400-800 mcg daily", source: "Spinach, Lentils, Fortified cereals", benefit: "Prevents neural tube defects. Start before conception." },
        { name: "Calcium", icon: "🦴", dosage: "1000 mg daily", source: "Milk, Yogurt, Leafy greens", benefit: "Builds baby's bones and teeth." },
        { name: "Iron", icon: "💧", dosage: "27 mg daily", source: "Red meat, Beans, Fortified cereals", benefit: "Prevents anemia, supports blood supply." },
        { name: "DHA (Omega-3)", icon: "🐟", dosage: "200-300 mg daily", source: "Fish, Walnuts, Supplements", benefit: "Essential for brain development." },
        { name: "Vitamin D", icon: "☀️", dosage: "600 IU daily", source: "Sunlight, Fortified milk", benefit: "Helps calcium absorption." },
        { name: "Protein", icon: "🥩", dosage: "71g daily", source: "Eggs, Paneer, Lean meat, Legumes", benefit: "Supports tissue growth." }
    ];

    const prenatalSchedule = [
        { week: "6-8 weeks", title: "First Visit", tests: "Complete health history, blood tests, urine tests, Rh factor, confirm pregnancy, estimate due date" },
        { week: "Weeks 8-28", title: "Monthly Visits", tests: "Weight, blood pressure, urine protein/glucose, fetal heartbeat, fundal height" },
        { week: "Weeks 28-36", title: "Bi-weekly Visits", tests: "Increased monitoring, glucose screening, ultrasounds, discuss birth plan" },
        { week: "Weeks 36-40", title: "Weekly Visits", tests: "Cervical checks, baby position, Group B strep test, final preparations" }
    ];

    const wellnessTips = [
        { icon: "🚶‍♀️", title: "Stay Active", tip: "30 minutes of moderate exercise most days. Walking, swimming, prenatal yoga are excellent choices." },
        { icon: "😴", title: "Rest Well", tip: "7-9 hours of sleep. Use pregnancy pillows, sleep on your left side for better circulation." },
        { icon: "💧", title: "Hydrate", tip: "8-10 glasses of water daily. Prevents constipation, reduces swelling, maintains amniotic fluid." },
        { icon: "🧘", title: "Manage Stress", tip: "Meditation, prenatal massage, breathing exercises. Join support groups for emotional wellness." },
        { icon: "🚭", title: "Avoid Toxins", tip: "No smoking, alcohol, or recreational drugs. Limit caffeine to 200mg per day." },
        { icon: "📚", title: "Educate Yourself", tip: "Take childbirth classes, read about labor and delivery, prepare a birth plan." }
    ];

    const hospitalBag = {
        forMom: [
            "Insurance cards & ID",
            "Birth plan copies",
            "Comfortable nightgown",
            "Nursing bras",
            "Toiletries",
            "Going-home outfit",
            "Phone charger"
        ],
        forBaby: [
            "Car seat (installed!)",
            "Going-home outfit",
            "Receiving blankets",
            "Diapers & wipes",
            "Onesies (newborn & 0-3 months)",
            "Burp cloths",
            "Pacifiers (if using)"
        ]
    };

    const urgentSymptoms = [
        "Heavy vaginal bleeding",
        "Severe abdominal pain or cramping",
        "Sudden decrease in baby's movements",
        "Signs of preterm labor (contractions before 37 weeks)",
        "Severe headache with vision changes",
        "Fluid leaking from vagina",
        "High fever above 101°F (38.3°C)"
    ];

    const normalSymptoms = [
        "Mild cramping and spotting (early pregnancy)",
        "Morning sickness and food aversions",
        "Fatigue and mood swings",
        "Breast tenderness and growth",
        "Frequent urination",
        "Mild swelling in feet and ankles"
    ];

    return (
        <div className="app-container theme-pink">
            <InnerPageHero
                title="Your Pregnancy Journey"
                subtitle="Expert guidance for every step of the way, from bump to baby with personalized care."
                badge="Pregnancy Care"
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

                {/* Trimester Guide */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>Pregnancy Trimester Guide</h2>
                    <p className={intStyles.sectionSubtitle}>Understanding what to expect during each stage of your pregnancy journey.</p>
                </section>

                <div className={intStyles.methodsGrid} style={{ marginBottom: '60px' }}>
                    {trimesters.map((t, idx) => (
                        <div key={idx} className={intStyles.methodCard} style={{ background: t.color }}>
                            <div className={intStyles.methodIcon}>{t.icon}</div>
                            <h3>{t.title}</h3>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '16px', display: 'block' }}>{t.weeks}</span>

                            <div style={{ marginBottom: '16px' }}>
                                {t.details.map((d, i) => (
                                    <div key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>
                                        <strong style={{ color: 'var(--pink-primary)' }}>{d.label}:</strong> {d.info}
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginBottom: '12px' }}>
                                <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Common Symptoms</strong>
                                <p style={{ margin: 0, fontSize: '14px' }}>{t.symptoms}</p>
                            </div>

                            <div>
                                <strong style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Key Actions</strong>
                                <p style={{ margin: 0, fontWeight: '600', color: 'var(--pink-primary)', fontSize: '14px' }}>{t.actions}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Essential Nutrition */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>Essential Pregnancy Nutrition</h2>
                    <p className={intStyles.sectionSubtitle}>Nourishing yourself and your baby with the right nutrients.</p>
                </section>

                <div className={intStyles.methodsGrid} style={{ marginBottom: '60px' }}>
                    {nutrition.map((n, idx) => (
                        <div key={idx} className={intStyles.methodCard}>
                            <div className={intStyles.methodIcon}>{n.icon}</div>
                            <h3>{n.name}</h3>
                            <span className={intStyles.methodBadge} style={{ marginBottom: '12px' }}>{n.dosage}</span>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                <strong>Sources:</strong> {n.source}
                            </p>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{n.benefit}</p>
                        </div>
                    ))}
                </div>

                {/* Prenatal Care Schedule */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>Prenatal Care Schedule</h2>
                    <p className={intStyles.sectionSubtitle}>Regular checkups ensure healthy development and early detection of concerns.</p>
                </section>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                    marginBottom: '60px'
                }}>
                    {prenatalSchedule.map((item, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '24px',
                            border: '2px solid var(--pink-soft)',
                            borderLeft: '4px solid var(--pink-primary)',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{
                                display: 'inline-block',
                                background: 'var(--pink-soft)',
                                color: 'var(--pink-primary)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '700',
                                marginBottom: '12px'
                            }}>
                                {item.week}
                            </div>
                            <h4 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)' }}>{item.title}</h4>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>{item.tests}</p>
                        </div>
                    ))}
                </div>

                {/* Wellness Tips */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>Pregnancy Wellness Tips</h2>
                    <p className={intStyles.sectionSubtitle}>Self-care practices for a healthy pregnancy.</p>
                </section>

                <div className={intStyles.methodsGrid} style={{ marginBottom: '60px' }}>
                    {wellnessTips.map((w, idx) => (
                        <div key={idx} className={intStyles.methodCard}>
                            <div className={intStyles.methodIcon}>{w.icon}</div>
                            <h3>{w.title}</h3>
                            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{w.tip}</p>
                        </div>
                    ))}
                </div>

                {/* When to Seek Help - Two Column */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '60px'
                }}>
                    {/* Urgent Symptoms */}
                    <div style={{
                        padding: '30px',
                        background: '#FFEBEE',
                        borderRadius: '20px',
                        border: '2px solid #FFCDD2'
                    }}>
                        <h3 style={{ color: '#C62828', marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>🚨</span> Call Immediately If:
                        </h3>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {urgentSymptoms.map((s, idx) => (
                                <li key={idx} style={{
                                    marginBottom: '12px',
                                    color: '#C62828',
                                    fontWeight: '500',
                                    lineHeight: '1.5'
                                }}>{s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Normal Symptoms */}
                    <div style={{
                        padding: '30px',
                        background: 'var(--accent-light-blue)',
                        borderRadius: '20px',
                        border: '2px solid #BBDEFB'
                    }}>
                        <h3 style={{ color: '#1565C0', marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>ℹ️</span> Normal Pregnancy Symptoms:
                        </h3>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {normalSymptoms.map((s, idx) => (
                                <li key={idx} style={{
                                    marginBottom: '12px',
                                    color: '#1565C0',
                                    fontWeight: '500',
                                    lineHeight: '1.5'
                                }}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Hospital Bag Checklist */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>Hospital Bag Checklist</h2>
                    <p className={intStyles.sectionSubtitle}>Pack these essentials by week 36.</p>
                </section>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '60px'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                    }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>👩</span> For You
                        </h3>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                            {hospitalBag.forMom.map((item, idx) => (
                                <li key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 0',
                                    borderBottom: idx < hospitalBag.forMom.length - 1 ? '1px solid #eee' : 'none'
                                }}>
                                    <span style={{ color: 'var(--pink-primary)', fontSize: '18px' }}>☑️</span>
                                    <span style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                    }}>
                        <h3 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>👶</span> For Baby
                        </h3>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                            {hospitalBag.forBaby.map((item, idx) => (
                                <li key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 0',
                                    borderBottom: idx < hospitalBag.forBaby.length - 1 ? '1px solid #eee' : 'none'
                                }}>
                                    <span style={{ color: 'var(--accent-green)', fontSize: '18px' }}>☑️</span>
                                    <span style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Support CTA */}
                <div className={intStyles.ctaSection}>
                    <h3>Have questions about your pregnancy?</h3>
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

export default PregnancyJourney;
