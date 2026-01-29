import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import styles from "./PregnancyJourney.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import Timeline from "../shared/Timeline";
import ChecklistSection from "../shared/ChecklistSection";

const PregnancyJourney: React.FC = () => {
    const trimesterData = [
        {
            title: "First Trimester (1-12 weeks)",
            icon: "🌱",
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            milestones: [
                "Week 1-4: Fertilization and implantation",
                "Week 5-8: Major organs begin forming",
                "Week 9-12: Baby's heartbeat detectable"
            ],
            symptoms: "Morning sickness, fatigue, breast tenderness",
            actions: "Prenatal vitamins, first ultrasound, blood tests"
        },
        {
            title: "Second Trimester (13-26 weeks)",
            icon: "👶",
            color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            milestones: [
                "Week 13-16: Baby can hear sounds",
                "Week 17-20: Feel baby's movements",
                "Week 21-26: Rapid brain development"
            ],
            symptoms: "Reduced nausea, energy boost, growing belly",
            actions: "Anatomy scan, glucose screening, childbirth classes"
        },
        {
            title: "Third Trimester (27-40 weeks)",
            icon: "❤️",
            color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            milestones: [
                "Week 27-32: Eyes open, baby gains weight",
                "Week 33-36: Bones harden, lungs mature",
                "Week 37-40: Full term, ready for birth"
            ],
            symptoms: "Back pain, frequent urination, Braxton Hicks",
            actions: "Hospital bag, birth plan, Group B strep test"
        }
    ];

    const nutritionData = [
        { title: "Folic Acid", desc: "400-800 mcg daily prevents neural tube defects. Start before conception.", icon: "💊" },
        { title: "Calcium", desc: "1000 mg daily for baby's bones and teeth. Found in dairy, leafy greens.", icon: "🦴" },
        { title: "Iron", desc: "27 mg daily prevents anemia. Red meat, beans, fortified cereals.", icon: "🩸" },
        { title: "DHA (Omega-3)", desc: "200-300 mg daily for brain development. Fish, walnuts.", icon: "🐟" },
        { title: "Vitamin D", desc: "600 IU daily for calcium absorption. Sunlight, fortified milk.", icon: "☀️" },
        { title: "Protein", desc: "71g daily for tissue growth. Lean meat, eggs, legumes.", icon: "🥚" }
    ];

    const prenatalSchedule = [
        { id: 1, title: "First Visit (6-8 weeks)", description: "Complete health history, blood tests, confirm pregnancy, estimate due date." },
        { id: 2, title: "Monthly Visits (Weeks 8-28)", description: "Weight, blood pressure, urine tests, fetal heartbeat, fundal height." },
        { id: 3, title: "Bi-weekly (Weeks 28-36)", description: "Increased monitoring, glucose screening, ultrasounds, birth plan." },
        { id: 4, title: "Weekly (Weeks 36-40)", description: "Cervical checks, baby position, Group B strep test, final prep." }
    ];

    const hospitalBagForYou = [
        { id: 1, text: "Insurance cards & ID" },
        { id: 2, text: "Birth plan copies" },
        { id: 3, text: "Comfortable nightgown & nursing bras" },
        { id: 4, text: "Toiletries & Going-home outfit" },
        { id: 5, text: "Phone charger" }
    ];

    const hospitalBagForBaby = [
        { id: 1, text: "Car seat (installed)" },
        { id: 2, text: "Going-home outfit & blankets" },
        { id: 3, text: "Diapers & wipes" },
        { id: 4, text: "Onesies & Burp cloths" },
        { id: 5, text: "Pacifiers (if using)" }
    ];

    return (
        <div className={styles.pregnancyPage}>
            <InnerPageHero
                title="Pregnancy Care Journey"
                subtitle="Track your pregnancy week-by-week with personalized guidance, nutrition plans, and expert resources."
                badge="Expectant Mother's Guide"
            />

            {/* TRIMESTER GUIDE */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Pregnancy Trimester Guide</h2>
                    <p className={styles.sectionSubtitle}>Understanding what to expect during each stage of your journey.</p>
                    <div className={styles.grid}>
                        {trimesterData.map((tri, idx) => (
                            <div key={idx} className={styles.card}>
                                <div className={styles.icon} style={{ background: tri.color }}>{tri.icon}</div>
                                <h3 className={styles.cardTitle}>{tri.title}</h3>
                                <ul className={styles.cardList}>
                                    {tri.milestones.map((m, i) => <li key={i}><strong>{m.split(':')[0]}:</strong>{m.split(':')[1]}</li>)}
                                </ul>
                                <div className={styles.cardMeta}>
                                    <p><strong>Common symptoms:</strong> {tri.symptoms}</p>
                                    <p><strong>Key actions:</strong> {tri.actions}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NUTRITION */}
            <section className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Essential Pregnancy Nutrition</h2>
                    <p className={styles.sectionSubtitle}>Nourishing yourself and your baby with the right nutrients.</p>
                    <div className={styles.grid}>
                        {nutritionData.map((nutri, idx) => (
                            <div key={idx} className={styles.card}>
                                <div className={styles.icon} style={{ background: '#f0f0f0', color: '#e30b5d' }}>{nutri.icon}</div>
                                <h3 className={styles.cardTitle}>{nutri.title}</h3>
                                <p>{nutri.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRENATAL SCHEDULE */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Prenatal Care Schedule</h2>
                    <p className={styles.sectionSubtitle}>Regular checkups ensure healthy development and early detection.</p>
                    <Timeline items={prenatalSchedule} />
                </div>
            </section>

            {/* COMMON CONCERNS */}
            <section className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Common Pregnancy Concerns</h2>
                    <p className={styles.sectionSubtitle}>When to call your healthcare provider.</p>
                    <div className={styles.alertGrid}>
                        <div className={`${styles.alertCard} ${styles.warning}`}>
                            <div className={styles.alertIcon}>⚠️</div>
                            <div className={styles.alertContent}>
                                <h3>Call Immediately If You Experience:</h3>
                                <ul>
                                    <li>Heavy vaginal bleeding</li>
                                    <li>Severe abdominal pain or cramping</li>
                                    <li>Sudden decrease in baby's movements</li>
                                    <li>Signs of preterm labor</li>
                                    <li>Severe headache with vision changes</li>
                                </ul>
                            </div>
                        </div>
                        <div className={`${styles.alertCard} ${styles.info}`}>
                            <div className={styles.alertIcon}>ℹ️</div>
                            <div className={styles.alertContent}>
                                <h3>Normal Pregnancy Symptoms:</h3>
                                <ul>
                                    <li>Mild cramping and spotting (early)</li>
                                    <li>Morning sickness & food aversions</li>
                                    <li>Fatigue and mood swings</li>
                                    <li>Breast tenderness and growth</li>
                                    <li>Frequent urination</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOSPITAL BAG */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Hospital Bag Checklist</h2>
                    <p className={styles.sectionSubtitle}>Pack these essentials by week 36.</p>
                    <div className={styles.checklistGrid}>
                        <ChecklistSection title="For You" items={hospitalBagForYou} icon="👤" />
                        <ChecklistSection title="For Baby" items={hospitalBagForBaby} icon="👶" />
                    </div>
                </div>
            </section>

            {/* NEXT STEPS */}
            <section className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container} style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle}>Next Best Steps</h2>
                    <p className={styles.sectionSubtitle}>Continue your journey with proactive health management.</p>
                    <div className={styles.nextSteps}>
                        <Link to={ROUTES.FERTILITY} className={styles.outlineBtn}>← Previous: Fertility</Link>
                        <Link to={ROUTES.APPOINTMENTS} className={styles.primaryBtn}>Find OB/GYN →</Link>
                        <Link to={ROUTES.SYMPTOM_CHECKER} className={styles.ghostBtn}>Symptom Checker</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PregnancyJourney;
