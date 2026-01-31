import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import styles from "./Journeys.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import JourneyHeroAnimation from "./JourneyHeroAnimation";
import JourneyFlow from "./JourneyFlow";

// Assets
import pregnancyImg from "../../assets/journey_pregnancy.png";
import fertilityImg from "../../assets/journey_fertility.png";
import symptomsImg from "../../assets/journey_symptoms.png";

interface Journey {
    id: string;
    title: string;
    focus: string;
    includes: string[];
    nextSteps: string[];
    icon: string;
    path: string | null;
    image: string;
}

const Journeys: React.FC = () => {
    const navigate = useNavigate();

    // Scroll to top on page load/refresh
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle card click with scroll to top
    const handleCardClick = (path: string | null) => {
        if (path) {
            window.scrollTo(0, 0);
            navigate(path);
        }
    };

    const journeyCatalog: Journey[] = [
        {
            id: "pregnancy",
            title: "Pregnancy Care Journey",
            focus: "Weekly guidance from conception to birth with prenatal schedule.",
            includes: ["Week-by-week", "Prenatal", "Checklists"],
            nextSteps: ["Trimester plan + red flags", "Vaccines during pregnancy", "Find OB/GYN & teleconsult"],
            icon: "🤰",
            path: ROUTES.PREGNANCY,
            image: pregnancyImg
        },
        {
            id: "postnatal",
            title: "Postnatal & Bonding",
            focus: "Care for you and baby in the fourth trimester with recovery tracking.",
            includes: ["Recovery", "Bonding", "Expert Q&A"],
            nextSteps: ["Recovery monitoring", "Bonding support", "Pediatrician consult"],
            icon: "👶",
            path: ROUTES.POSTPARTUM,
            image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "perinatal",
            title: "Perinatal Wellness",
            focus: "Support for anxiety and postpartum depression with interactive guides.",
            includes: ["Body Map", "Self-assessments", "Counseling"],
            nextSteps: ["Interactive body exploration", "Hormonal crash timeline", "Connect with counselors"],
            icon: "🧬",
            path: ROUTES.PERINATAL,
            image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "fertility",
            title: "Pregnancy Planning",
            focus: "Optimize your health before you conceive with fertility tracking.",
            includes: ["Tracking", "Lifestyle", "Pre-conception"],
            nextSteps: ["Cycle tracking & ovulation", "Lifestyle optimization", "Fertility community"],
            icon: "🌱",
            path: ROUTES.FERTILITY,
            image: fertilityImg
        },
        {
            id: "menopause",
            title: "Menopause Counseling",
            focus: "Navigate the transition with expert advice on symptom management.",
            includes: ["HRT education", "Holistic tips", "Symptoms"],
            nextSteps: ["Symptom management guide", "Hormone education", "Holistic wellness plan"],
            icon: "🔥",
            path: ROUTES.MENOPAUSE,
            image: "https://images.unsplash.com/photo-1571391605332-62dc2513f592?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "loss-grief",
            title: "Loss & Grief Support",
            focus: "Compassionate support for difficult journeys and emotional recovery.",
            includes: ["Medical guidance", "Emotional support", "Community"],
            nextSteps: ["Sensitive care resources", "Grief counseling", "Join support group"],
            icon: "🎗️",
            path: ROUTES.CHRONIC_CONDITIONS,
            image: "https://images.unsplash.com/photo-1528659091430-80410e7e174b?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "symptom-care",
            title: "Symptom → Care Journey",
            focus: "Start with symptoms and reach the right next action for your health.",
            includes: ["Triage", "Care steps", "Education"],
            nextSteps: ["Quick triage and education", "Find doctors or teleconsult", "Prevention plan"],
            icon: "🩺",
            path: ROUTES.SYMPTOM_CHECKER,
            image: symptomsImg
        },
        {
            id: "prevention",
            title: "Prevention Journey",
            focus: "Age-based screening plan with early detection and prevention steps.",
            includes: ["Early Detection", "Checklist", "Vaccines"],
            nextSteps: ["Screening schedule", "Vaccines plan", "High risk preparation"],
            icon: "🛡️",
            path: ROUTES.PREVENTIVE_HEALTH,
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "community",
            title: "Community & Stories",
            focus: "Support-first pathways, groups, and safe spaces for shared experiences.",
            includes: ["Support", "Events", "Safe Q&A"],
            nextSteps: ["Join support groups", "Browse stories", "Expert-led forums"],
            icon: "🤝",
            path: ROUTES.COMMUNITY,
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
        }
    ];

    const careTracks = [
        { title: "Preventive Care", desc: "Screening & vaccination", icon: "🛡️", color: "#10b981" },
        { title: "Personal Consult", desc: "Expert guidance for your needs", icon: "🩺", color: "#6366f1" },
        { title: "Safe Support", desc: "Digital tools & safe community", icon: "🤝", color: "#be185d" },
    ];

    return (
        <div className={styles.journeysPage}>
            {/* HERO SECTION */}
            <InnerPageHero
                title="Complete Women's Health Companion"
                subtitle="Your complete women's health companion. Personalized journeys, preventive guides, teleconsultation, community support."
                badge="Complete Guide"
                illustration={<JourneyHeroAnimation />}
            >
                <div className={styles.heroActions}>
                    <button className={styles.primaryCta} onClick={() => navigate(ROUTES.SYMPTOM_CHECKER)}>Explore All Guides</button>
                    <button className={styles.secondaryCta} onClick={() => navigate(ROUTES.FIND_DOCTORS)}>Consult Experts</button>
                </div>
            </InnerPageHero>

            {/* YOUR CARE JOURNEY */}
            <section className={styles.careJourneySection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Your Care Journey</h2>
                    <p className={styles.sectionSubtitleText}>Dedicated support pathways for every stage of your life.</p>
                </div>
                <div className={styles.careTrackGrid}>
                    {careTracks.map((track, idx) => (
                        <div key={idx} className={styles.careTrackCard}>
                            <div className={styles.careTrackIcon} style={{ background: track.color }}>{track.icon}</div>
                            <h3 className={styles.careTrackTitle}>{track.title}</h3>
                            <p className={styles.careTrackDesc}>{track.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* START WITH JOURNEY */}
            <section className={styles.journeySection}>
                <div className={styles.journeyIntro}>
                    <h2 className={styles.journeyIntroTitle}>Start with a Journey</h2>
                    <p className={styles.journeyIntroSubtitle}>
                        Choose the path that matches where you are right now. From pregnancy planning to prevention,
                        each journey offers personalized guidance, trusted resources, and community support.
                    </p>
                </div>

                <div className={styles.journeyGridContainer}>
                    <div className={styles.cardGrid}>
                        {journeyCatalog.map((journey) => (
                            <div
                                key={journey.id}
                                className={styles.journeyCard}
                                onClick={() => handleCardClick(journey.path)}
                            >
                                <div className={styles.cardCover}>
                                    <img src={journey.image} alt={journey.title} />
                                    <div className={styles.cardIconBadge}>{journey.icon}</div>
                                </div>

                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{journey.title}</h3>

                                    <div className={styles.metaSection}>
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaLabel}>FOCUS</span>
                                            <p className={styles.metaValue}>{journey.focus}</p>
                                        </div>

                                        <div className={styles.metaRow}>
                                            <span className={styles.metaLabel}>INCLUDES</span>
                                            <div className={styles.chips}>
                                                {journey.includes.map((tag, idx) => (
                                                    <span key={idx} className={styles.tag}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={styles.metaRow}>
                                            <span className={styles.metaLabel}>NEXT STEPS</span>
                                            <ul className={styles.nextSteps}>
                                                {journey.nextSteps.map((step, idx) => (
                                                    <li key={idx}>{step}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={styles.cardFooter}>
                                        <span className={styles.learnMore}>Explore Journey <i className="fas fa-arrow-right"></i></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* JOURNEY FLOW MAP */}
            <JourneyFlow />
        </div>
    );
};

export default Journeys;
