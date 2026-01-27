import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import styles from "./Journeys.module.css";
import InnerPageHero from "../shared/InnerPageHero";

interface Journey {
    id: string;
    title: string;
    subtitle: string;
    forWho: string;
    includes: string[];
    icon: string;
    path: string | null;
    color: string;
}

const Journeys: React.FC = () => {
    const navigate = useNavigate();

    const journeyCatalog: Journey[] = [
        {
            id: "pregnancy",
            title: "Pregnancy Care",
            subtitle: "Week-by-week guidance from bump to baby.",
            forWho: "Expecting mothers at any stage",
            includes: ["Trimester milestones", "Nutrition guidance", "Kick counters", "When to seek help"],
            icon: "🤰",
            path: ROUTES.PREGNANCY,
            color: "#FCE4EC"
        },
        {
            id: "fertility",
            title: "Fertility & TTC",
            subtitle: "Understand your cycle and plan ahead.",
            forWho: "Women trying to conceive",
            includes: ["Cycle tracking", "Ovulation prediction", "Lifestyle tips", "When to consult"],
            icon: "🌱",
            path: ROUTES.FERTILITY,
            color: "#E8F5E9"
        },
        {
            id: "symptom-care",
            title: "Symptom → Care",
            subtitle: "From concern to clarity in minutes.",
            forWho: "Anyone experiencing symptoms",
            includes: ["AI symptom checker", "Severity assessment", "Doctor recommendations", "Follow-up tracking"],
            icon: "🩺",
            path: ROUTES.SYMPTOM_CHECKER,
            color: "#E3F2FD"
        },
        {
            id: "prevention",
            title: "Preventive Health",
            subtitle: "Stay ahead with age-based screenings.",
            forWho: "Women prioritizing prevention",
            includes: ["Screening schedules", "Vaccine reminders", "Health checklists", "Risk assessments"],
            icon: "🛡️",
            path: ROUTES.PREVENTIVE_HEALTH,
            color: "#FFF8E1"
        },
        {
            id: "menstrual",
            title: "Menstrual Health",
            subtitle: "Understand and manage your cycle.",
            forWho: "Women with period concerns",
            includes: ["Period tracking", "Symptom logging", "Hormone education", "Treatment options"],
            icon: "🌸",
            path: ROUTES.MENSTRUAL_HEALTH,
            color: "#FCE4EC"
        },
        {
            id: "chronic",
            title: "Chronic Conditions",
            subtitle: "PCOS, Thyroid, Endo — managed with care.",
            forWho: "Women with diagnosed conditions",
            includes: ["Condition education", "Medication tracking", "Lifestyle management", "Specialist connections"],
            icon: "💜",
            path: ROUTES.CHRONIC_CONDITIONS,
            color: "#EDE7F6"
        },
        {
            id: "mental",
            title: "Mental Wellness",
            subtitle: "Your mental health matters.",
            forWho: "Women seeking emotional support",
            includes: ["Mood tracking", "Breathing exercises", "Therapy resources", "Community support"],
            icon: "🧘",
            path: ROUTES.MENTAL_WELLNESS,
            color: "#E0F7FA"
        },
        {
            id: "postpartum",
            title: "Postpartum Care",
            subtitle: "Recovery, bonding, and your new normal.",
            forWho: "New mothers (0-12 months)",
            includes: ["Recovery timeline", "Breastfeeding support", "Mental health check-ins", "Baby milestones"],
            icon: "👶",
            path: ROUTES.POSTPARTUM,
            color: "#E8F5E9"
        },
        {
            id: "adolescent",
            title: "Adolescent & Young Women's Health",
            subtitle: "Navigate puberty, periods, and growing up.",
            forWho: "Ages 9-19 and their caregivers",
            includes: ["Puberty education", "First period guidance", "Nutrition & fitness", "Mental wellbeing"],
            icon: "🌺",
            path: ROUTES.ADOLESCENT_HEALTH,
            color: "#F3E5F5"
        }
    ];

    const steps = [
        { num: 1, title: "Choose Your Journey", desc: "Select based on your life stage or health goal." },
        { num: 2, title: "Follow Guided Steps", desc: "Get daily tasks, reminders, and education." },
        { num: 3, title: "Get Expert Support", desc: "Connect with specialists when you need them." },
        { num: 4, title: "Track Your Progress", desc: "Celebrate milestones and stay on track." }
    ];

    return (
        <div className={styles.journeysPage}>

            {/* HERO SECTION */}
            <InnerPageHero
                title="Your Health Journey Starts Here"
                subtitle="Choose a journey tailored to your needs. We guide you step-by-step with expert support, reminders, and personalized care."
                badge="Guided Health Journeys"
            />

            {/* JOURNEY CARDS SECTION */}
            <section className={styles.journeySection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Choose Your Journey</h2>
                    <p className={styles.sectionSubtitle}>
                        Select the path that matches your health goals and life stage.
                    </p>
                </div>

                {/* 3-COLUMN CARD GRID */}
                <div className={styles.cardGrid}>
                    {journeyCatalog.map((journey) => (
                        <div
                            key={journey.id}
                            className={`${styles.journeyCard} ${journey.path ? styles.active : styles.inactive}`}
                            onClick={() => journey.path && navigate(journey.path)}
                        >
                            <div className={styles.cardIcon} style={{ background: journey.color }}>
                                {journey.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{journey.title}</h3>
                            <p className={styles.cardDesc}>{journey.subtitle}</p>
                            <div className={styles.cardForWho}>
                                <span>👤</span>
                                <span>{journey.forWho}</span>
                            </div>
                            <ul className={styles.featuresList}>
                                {journey.includes.map((item, idx) => (
                                    <li key={idx} className={styles.featureItem}>
                                        <span className={styles.featureBullet}>●</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            {journey.path ? (
                                <button className={styles.cardCta}>
                                    Start Journey <span>→</span>
                                </button>
                            ) : (
                                <span className={styles.comingSoon}>Coming soon</span>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className={styles.howItWorks}>
                <div className={styles.howItWorksInner}>
                    <h2 className={styles.sectionTitle}>How It Works</h2>
                    <p className={styles.sectionSubtitle} style={{ marginBottom: '48px' }}>
                        Navigate your health with clarity and confidence.
                    </p>
                    <div className={styles.stepsGrid}>
                        {steps.map((step) => (
                            <div key={step.num}>
                                <div className={styles.stepNumber}>{step.num}</div>
                                <h4 className={styles.stepTitle}>{step.title}</h4>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SUPPORT CTA */}
            <section className={styles.supportSection}>
                <div className={styles.supportCard}>
                    <h3 className={styles.supportTitle}>Not sure which journey is right for you?</h3>
                    <p className={styles.supportDesc}>That's okay. Talk to someone who can help you decide.</p>
                    <div className={styles.supportButtons}>
                        <button className={styles.primaryBtn} onClick={() => navigate(ROUTES.APPOINTMENTS)}>
                            Talk to an Expert
                        </button>
                        <button className={styles.secondaryBtn} onClick={() => navigate(ROUTES.COMMUNITY)}>
                            Ask the Community
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Journeys;
