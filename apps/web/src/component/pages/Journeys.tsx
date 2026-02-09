import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../routes/routeConstants";
import styles from "./Journeys.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import JourneyHeroAnimation from "./JourneyHeroAnimation";
import JourneyFlow from "./JourneyFlow";
import ServicesSection from "../sections/ServicesSection";


// Assets
import pregnancyImg from "../../assets/journey_pregnancy.png";
import fertilityImg from "../../assets/journey_fertility.png";
import menopauseImg from "../../assets/journey_menopause.png";
import lossSupportImg from "../../assets/journey_loss_support.png";
import breastfeedingImg from "../../assets/journey_breastfeeding.png";
import postnatalImg from "../../assets/journey_postnatal.png";
import menstrualImg from "../../assets/journey_menstrual.png";
import mentalImg from "../../assets/journey_mental.png";
import adolescentImg from "../../assets/journey_adolescent.png";
import chronicImg from "../../assets/journey_chronic.png";
import perinatalFamilyImg from "../../assets/journey_perinatal_family.png";
import autoimmuneImg from "../../assets/journey_autoimmune.png";
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

    // Scroll to top on page load/refresh or handle hash
    React.useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const id = hash.replace('#', '');
            // Wait slightly for section to mount
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
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
            image: postnatalImg
        },
        {
            id: "perinatal",
            title: "Perinatal Wellness",
            focus: "Support for anxiety and postpartum depression with interactive guides.",
            includes: ["Body Map", "Self-assessments", "Counseling"],
            nextSteps: ["Interactive body exploration", "Hormonal crash timeline", "Connect with counselors"],
            icon: "🧬",
            path: ROUTES.PERINATAL_WELLNESS,
            image: mentalImg
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
            image: menopauseImg
        },
        {
            id: "loss-grief",
            title: "Loss & Grief Support",
            focus: "Compassionate support for difficult journeys and emotional recovery.",
            includes: ["Medical guidance", "Emotional support", "Community"],
            nextSteps: ["Sensitive care resources", "Grief counseling", "Join support group"],
            icon: "🎗️",
            path: ROUTES.LOSS_SUPPORT,
            image: lossSupportImg
        },
        {
            id: "breastfeeding",
            title: "Breastfeeding Journey",
            focus: "Master lactation with our Bio-Twin lab and nutrition guides.",
            includes: ["Simulation", "Latch Guide", "Nutrition"],
            nextSteps: ["Lactation simulation", "3D latch practice", "Meal planning"],
            icon: "🍼",
            path: ROUTES.BREASTFEEDING,
            image: breastfeedingImg
        },

        {
            id: "prevention",
            title: "Prevention Journey",
            focus: "Age-based screening plan with early detection and prevention steps.",
            includes: ["Early Detection", "Checklist", "Vaccines"],
            nextSteps: ["Screening schedule", "Vaccines plan", "High risk preparation"],
            icon: "🛡️",
            path: ROUTES.PREVENTIVE_HEALTH,
            image: symptomsImg
        },
        {
            id: "menstrual-health",
            title: "Menstrual Health",
            focus: "Understand your cycle and manage menstrual health effectively.",
            includes: ["Cycle Tracking", "Symptom Management", "Hormonal Balance"],
            nextSteps: ["Start tracking", "Expert advice", "Join community"],
            icon: "🩸",
            path: ROUTES.MENSTRUAL_HEALTH,
            image: menstrualImg
        },
        {
            id: "mental-wellness",
            title: "Mental Wellness",
            focus: "Holistic support for your emotional and mental wellbeing.",
            includes: ["Stress Relief", "Mindfulness", "Expert Support"],
            nextSteps: ["Self-assessment", "Daily practices", "Connect with counselor"],
            icon: "🧠",
            path: ROUTES.MENTAL_WELLNESS,
            image: mentalImg
        },
        {
            id: "adolescent-health",
            title: "Adolescent Health",
            focus: "Empowering young women with knowledge and guidance.",
            includes: ["Puberty Education", "Self-care", "Confidence Building"],
            nextSteps: ["Health basics", "Body positivity", "Ask an expert"],
            icon: "🌸",
            path: ROUTES.ADOLESCENT_HEALTH,
            image: adolescentImg
        },
        {
            id: "preeclampsia",
            title: "Preeclampsia Education",
            focus: "Understanding, prevention, and management of preeclampsia.",
            includes: ["Symptom Checker", "Risk Assessment", "Management Guide"],
            nextSteps: ["Check Symptoms", "Understand Risks", "Find Specialist"],
            icon: "🩺",
            path: ROUTES.PREECLAMPSIA_EDUCATION,
            image: pregnancyImg
        },
        {
            id: "chronic",
            title: "Chronic Conditions",
            focus: "Management and support for long-term health conditions.",
            includes: ["PCOS/Endometriosis", "Thyroid", "Diabetes"],
            nextSteps: ["Specialist directory", "Management tools", "Daily tracking"],
            icon: "🛡️",
            path: ROUTES.CHRONIC_CONDITIONS,
            image: chronicImg
        },
        {
            id: "perinatal-family",
            title: "Perinatal Family Guide",
            focus: "Empowering partners and families with knowledge to support maternal wellness.",
            includes: ["Partner Tips", "Family Support", "Communication"],
            nextSteps: ["Support checklist", "Bonding exercises", "Role-play scenarios"],
            icon: "👨‍👩‍👧",
            path: ROUTES.PERINATAL_FAMILY,
            image: perinatalFamilyImg
        },
        {
            id: "autoimmune",
            title: "Autoimmune Health",
            focus: "Understanding the 'Silent Storm' - why 80% of cases affect women.",
            includes: ["X-Chromosome", "Hormones", "Immune Map"],
            nextSteps: ["Immune system basics", "Trigger identification", "Check symptoms"],
            icon: "🧬",
            path: ROUTES.AUTOIMMUNE_HEALTH,
            image: autoimmuneImg
        },
        {
            id: "bone-health",
            title: "Bone & Joint Health",
            focus: "Protecting your skeletal foundation through every life stage.",
            includes: ["3D Simulation", "Hormone Map", "Risk Triage"],
            nextSteps: ["Interactive bone explorer", "Bone density screening", "Prevention checklist"],
            icon: "🦴",
            path: ROUTES.BONE_HEALTH,
            image: menopauseImg
        }

    ];

    const careTracks = [
        { title: "Preventive Care", desc: "Screening & vaccination", icon: "🛡️", color: "#10b981", path: ROUTES.PREVENTIVE_HEALTH },
        { title: "Personal Consult", desc: "Expert guidance for your needs", icon: "🩺", color: "#6366f1", path: ROUTES.APPOINTMENTS },
        { title: "Safe Support", desc: "Digital tools & safe community", icon: "🤝", color: "#be185d", path: ROUTES.COMMUNITY },
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
                        <div
                            key={idx}
                            className={styles.careTrackCard}
                            onClick={() => handleCardClick(track.path)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={styles.careTrackIcon} style={{ background: track.color }}>{track.icon}</div>
                            <h3 className={styles.careTrackTitle}>{track.title}</h3>
                            <p className={styles.careTrackDesc}>{track.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* START WITH JOURNEY */}
            <section id="catalog" className={styles.journeySection}>
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
                            <Link
                                key={journey.id}
                                to={journey.path || "#"}
                                className={styles.journeyCard}
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
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* JOURNEY FLOW MAP */}
            <JourneyFlow />

            {/* SPECIALIZED GUIDES */}
            <section id="guides" className={styles.journeySection} style={{ background: '#f8f9fa', paddingTop: '60px', paddingBottom: '80px' }}>
                <div className={styles.journeyIntro}>
                    <h2 className={styles.journeyIntroTitle}>Specialized Health Guides</h2>
                    <p className={styles.journeyIntroSubtitle}>
                        Deep-dive resources into specific medical procedures and essential healthcare logistics.
                    </p>
                </div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '0 20px' }}>
                    <div
                        className={styles.journeyCard}
                        style={{ display: 'flex', flexDirection: 'row', padding: '24px', gap: '24px', cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.COSMETIC_SURGERY)}
                    >
                        <div style={{ fontSize: '40px', background: '#E3F2FD', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨</div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Cosmetic Surgery Guide</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Understanding procedures, risks, and recovery protocols for women's beauty health.</p>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pink)' }}>Open Guide &rarr;</span>
                        </div>
                    </div>

                    <div
                        className={styles.journeyCard}
                        style={{ display: 'flex', flexDirection: 'row', padding: '24px', gap: '24px', cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.INSURANCE_GUIDE)}
                    >
                        <div style={{ fontSize: '40px', background: '#E8F5E9', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛡️</div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Insurance & Claims</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Navigate policy selection, claim processes, and maternity coverage effectively.</p>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pink)' }}>Open Guide &rarr;</span>
                        </div>
                    </div>

                    <div
                        className={styles.journeyCard}
                        style={{ display: 'flex', flexDirection: 'row', padding: '24px', gap: '24px', cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.OTC_GUIDE)}
                    >
                        <div style={{ fontSize: '40px', background: '#FFF3E0', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧭</div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Contraception Compass</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Interactive decision wizard for women's birth control and STI protection.</p>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pink)' }}>Open Guide &rarr;</span>
                        </div>
                    </div>

                    <div
                        className={styles.journeyCard}
                        style={{ display: 'flex', flexDirection: 'row', padding: '24px', gap: '24px', cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.NUTRITION_GUIDE)}
                    >
                        <div style={{ fontSize: '40px', background: '#F3E5F5', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🥦</div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Nutrition & Supply</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Optimizing diet, hydration, and lifestyle for lactation and recovery.</p>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pink)' }}>Open Guide &rarr;</span>
                        </div>
                    </div>

                    <div
                        className={styles.journeyCard}
                        style={{ display: 'flex', flexDirection: 'row', padding: '24px', gap: '24px', cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.GOVERNMENT_SCHEMES)}
                    >
                        <div style={{ fontSize: '40px', background: '#FFF1F0', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏛️</div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Government Schemes</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Discover public health programs, benefits, and financial assistance guides.</p>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pink)' }}>Open Guide &rarr;</span>
                        </div>
                    </div>

                    <div
                        className={styles.journeyCard}
                        style={{ display: 'flex', flexDirection: 'row', padding: '24px', gap: '24px', cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.VACCINATION)}
                    >
                        <div style={{ fontSize: '40px', background: '#FCE4EC', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💉</div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Vaccination Explorer</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Personalized immunization schedules for every life stage and pregnancy.</p>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pink)' }}>Open Guide &rarr;</span>
                        </div>
                    </div>

                    <div
                        className={styles.journeyCard}
                        style={{ display: 'flex', flexDirection: 'row', padding: '24px', gap: '24px', cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.SCREENING)}
                    >
                        <div style={{ fontSize: '40px', background: '#E0F2F1', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📋</div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Screening Roadmap</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Preventive health checkups, diagnostic guides, and life-stage roadmap.</p>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pink)' }}>Open Guide &rarr;</span>
                        </div>
                    </div>

                    <div
                        className={styles.journeyCard}
                        style={{ display: 'flex', flexDirection: 'row', padding: '24px', gap: '24px', cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.CANCER_VISUALIZATION)}
                    >
                        <div style={{ fontSize: '40px', background: '#FCE4EC', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧬</div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Cancer 3D Explorer</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Interactive 3D visualization of cancer progression stages and early detection.</p>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pink)' }}>Open Explorer &rarr;</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <div id="services">
                <ServicesSection />
            </div>
        </div>
    );
};

export default Journeys;


