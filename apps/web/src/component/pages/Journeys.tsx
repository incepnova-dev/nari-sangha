import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import styles from "./Journeys.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import JourneyHeroAnimation from "./JourneyHeroAnimation";
import {
    motion,
    useReducedMotion,
    useAnimation,
    useInView
} from "framer-motion";

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
    const shouldReduceMotion = useReducedMotion();

    // Animation Controls
    const controls = useAnimation();
    const sectionRef = React.useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    useEffect(() => {
        if (isInView && !shouldReduceMotion) {
            const sequence = async () => {
                // 1. YOU node appears
                await controls.start("youVisible");

                // 2. Path Step 1 -> YOU
                await controls.start("path1Flow");

                // 3. Step 1 activates
                await controls.start("step1Active");

                // 4. Path back to YOU
                await controls.start("path1Return");

                // 5. YOU breathes once
                await controls.start("youPulseOnce");

                // 6. Path YOU -> Step 2
                await controls.start("path2Flow");

                // 7. Step 2 activates
                await controls.start("step2Active");

                // 8. Path YOU -> Step 3
                await controls.start("path3Flow");

                // 9. Step 3 activates
                await controls.start("step3Active");

                // 10. System Heartbeat
                controls.start("heartbeat");
            };
            sequence();
        }
    }, [isInView, controls, shouldReduceMotion]);

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
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Start with a journey</h2>
                    <p className={styles.sectionSubtitleText}>
                        Each journey is mapped to your evolving needs – pregnancy, fertility, prevention, and community.
                    </p>
                </div>

                <div className={styles.cardGrid}>
                    {journeyCatalog.map((journey) => (
                        <div
                            key={journey.id}
                            className={styles.journeyCard}
                            onClick={() => journey.path && navigate(journey.path)}
                        >
                            <div className={styles.cardCover}>
                                <img src={journey.image} alt={journey.title} />
                                <div className={styles.cardIconBadge}>{journey.icon}</div>
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{journey.title}</h3>

                                <div className={styles.metaSection}>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>🎯 FOCUS</span>
                                        <span className={styles.metaValue}>{journey.focus}</span>
                                    </div>

                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>🏷️ INCLUDES</span>
                                        <div className={styles.chips}>
                                            {journey.includes.map((tag, idx) => (
                                                <span key={idx} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>➡️ NEXT</span>
                                        <ul className={styles.nextSteps}>
                                            {journey.nextSteps.map((step, idx) => (
                                                <li key={idx}>{step}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS DIAGRAM */}
            <section className={styles.howItWorks} ref={sectionRef}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className={styles.sectionTitle}>How it works</h2>
                    <p className={styles.sectionSubtitleText}>Navigate your health journey with clarity and confidence.</p>
                </motion.div>

                <div className={styles.diagramContainer}>
                    <div className={styles.diagramGrid}>
                        {/* Step 1: Select Service */}
                        <motion.div
                            className={`${styles.diagramStep} ${styles.step1}`}
                            animate={controls}
                            variants={{
                                step1Active: {
                                    opacity: 1,
                                    filter: "grayscale(0) brightness(1.02)",
                                    boxShadow: "0 20px 40px rgba(190, 24, 93, 0.08)"
                                }
                            }}
                        >
                            <svg className={styles.borderDrawSvg} width="100%" height="100%">
                                <motion.rect
                                    rx="24"
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                    stroke="var(--pink)"
                                    strokeWidth="2"
                                    animate={controls}
                                    variants={{
                                        step1Active: { pathLength: 1, opacity: 0.4 },
                                        initial: { pathLength: 0, opacity: 0 }
                                    }}
                                    initial="initial"
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                            </svg>
                            <div className={styles.stepHeader}>
                                <motion.span
                                    className={styles.stepNum}
                                    animate={controls}
                                    variants={{
                                        step1Active: { backgroundColor: "var(--pink)" }
                                    }}
                                >1</motion.span>
                                <h4>Select Service</h4>
                            </div>
                            <ul className={styles.stepList}>
                                {[
                                    { icon: "person-pregnant", text: "Pregnancy" },
                                    { icon: "seedling", text: "Fertility" },
                                    { icon: "stethoscope", text: "Symptoms" },
                                    { icon: "shield-heart", text: "Prevention" },
                                    { icon: "users", text: "Community" }
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        animate={controls}
                                        variants={{
                                            step1Active: {
                                                opacity: 1,
                                                x: 0,
                                                transition: { delay: 0.1 + i * 0.05 }
                                            }
                                        }}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileHover={{
                                            x: 4,
                                            color: "var(--pink)",
                                            backgroundColor: "rgba(190, 24, 93, 0.03)",
                                            borderColor: "rgba(190, 24, 93, 0.1)"
                                        }}
                                    >
                                        <motion.i
                                            className={`fas fa-${item.icon}`}
                                            animate={controls}
                                            variants={{
                                                step1Active: {
                                                    color: "var(--pink)",
                                                    scale: [1, 1.15, 1],
                                                    transition: { delay: 0.2 + i * 0.05 }
                                                }
                                            }}
                                        ></motion.i>
                                        {item.text}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Center: YOU */}
                        <div className={styles.diagramCenter}>
                            <div className={styles.youCircle}>
                                <motion.div
                                    className={styles.youCircleInner}
                                    animate={controls}
                                    variants={{
                                        youVisible: { opacity: 1, scale: 1 },
                                        youPulseOnce: {
                                            scale: [1, 1.08, 1],
                                            transition: { duration: 0.8, ease: "easeInOut" }
                                        },
                                        heartbeat: {
                                            scale: [1, 1.05, 1],
                                            transition: {
                                                duration: 5,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }
                                        }
                                    }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <i className="fas fa-user"></i>
                                    <span>YOU</span>
                                </motion.div>
                                <motion.div
                                    className={styles.youGlow}
                                    animate={controls}
                                    variants={{
                                        youVisible: { opacity: 1, scale: 1 },
                                        heartbeat: {
                                            opacity: [0.3, 0.5, 0.3],
                                            scale: [1, 1.15, 1],
                                            transition: {
                                                duration: 5,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className={styles.connections}>
                                <svg className={styles.connectorSvg} viewBox="0 0 400 100">
                                    {/* Path 1: FROM Step 1 (left) TO YOU (center) */}
                                    <motion.path
                                        d="M 0 50 L 160 50"
                                        stroke="var(--pink)"
                                        strokeWidth="2"
                                        strokeDasharray="4 8"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={controls}
                                        variants={{
                                            path1Flow: { pathLength: 1, opacity: 0.4 },
                                            path1Return: {
                                                pathLength: 1,
                                                opacity: 0.2,
                                                transition: { duration: 1 }
                                            }
                                        }}
                                        transition={{ duration: 0.8 }}
                                    />
                                    {/* Path 2: FROM YOU (center) TO Step 2 (right) */}
                                    <motion.path
                                        d="M 240 50 L 400 50"
                                        stroke="var(--pink)"
                                        strokeWidth="2"
                                        strokeDasharray="4 8"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={controls}
                                        variants={{
                                            path2Flow: { pathLength: 1, opacity: 0.4 }
                                        }}
                                        transition={{ duration: 0.8 }}
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Step 2: Activate Journey */}
                        <motion.div
                            className={`${styles.diagramStep} ${styles.step2}`}
                            animate={controls}
                            variants={{
                                step2Active: {
                                    opacity: 1,
                                    filter: "grayscale(0) brightness(1.02)",
                                    boxShadow: "0 20px 40px rgba(190, 24, 93, 0.08)"
                                }
                            }}
                        >
                            <svg className={styles.borderDrawSvg} width="100%" height="100%">
                                <motion.rect
                                    rx="24"
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                    stroke="var(--pink)"
                                    strokeWidth="2"
                                    animate={controls}
                                    variants={{
                                        step2Active: { pathLength: 1, opacity: 0.4 },
                                        initial: { pathLength: 0, opacity: 0 }
                                    }}
                                    initial="initial"
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                            </svg>
                            <div className={styles.stepHeader}>
                                <motion.span
                                    className={styles.stepNum}
                                    animate={controls}
                                    variants={{
                                        step2Active: { backgroundColor: "var(--pink)" }
                                    }}
                                >2</motion.span>
                                <h4>Activate Journey</h4>
                            </div>
                            <div className={styles.stepActionsGrid}>
                                {[
                                    { icon: "calendar-check", text: "Education" },
                                    { icon: "clock", text: "Reminders" },
                                    { icon: "list-ul", text: "Checklists" },
                                    { icon: "chart-line", text: "Track Progress" }
                                ].map((action, i) => (
                                    <motion.div
                                        key={i}
                                        className={styles.actionSmall}
                                        animate={controls}
                                        variants={{
                                            step2Active: {
                                                opacity: 1,
                                                scale: 1,
                                                transition: { delay: 0.1 + i * 0.05 }
                                            }
                                        }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileHover={{
                                            scale: 1.04,
                                            borderColor: "var(--pink)",
                                            backgroundColor: "rgba(190, 24, 93, 0.02)"
                                        }}
                                    >
                                        <motion.i
                                            className={`fas fa-${action.icon}`}
                                            animate={controls}
                                            variants={{
                                                step2Active: {
                                                    color: "var(--pink)",
                                                    scale: [1, 1.15, 1],
                                                    transition: { delay: 0.2 + i * 0.05 }
                                                }
                                            }}
                                        ></motion.i>
                                        <span>{action.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Step 3: Connect with Experts */}
                    <div className={styles.step3Wrapper}>
                        {/* Vertical Path from YOU to Step 3 */}
                        <div className={styles.verticalPath}>
                            <svg width="2" height="60" style={{ overflow: "visible" }}>
                                <motion.line
                                    x1="1" y1="0" x2="1" y2="60"
                                    stroke="var(--pink)"
                                    strokeWidth="2"
                                    strokeDasharray="4 8"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={controls}
                                    variants={{
                                        path3Flow: { pathLength: 1, opacity: 0.4 }
                                    }}
                                    transition={{ duration: 0.6 }}
                                />
                            </svg>
                        </div>
                        <motion.div
                            className={styles.expertHelpBox}
                            animate={controls}
                            variants={{
                                step3Active: {
                                    opacity: 1,
                                    filter: "grayscale(0)",
                                    boxShadow: "0 20px 60px rgba(190, 24, 93, 0.12)"
                                }
                            }}
                        >
                            <svg className={styles.borderDrawSvg} width="100%" height="100%">
                                <motion.rect
                                    rx="32"
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                    stroke="var(--pink)"
                                    strokeWidth="2"
                                    animate={controls}
                                    variants={{
                                        step3Active: { pathLength: 1, opacity: 0.4 },
                                        initial: { pathLength: 0, opacity: 0 }
                                    }}
                                    initial="initial"
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                            </svg>
                            <div className={styles.stepHeader}>
                                <span className={styles.stepNum}>3</span>
                                <h4>Connect with Experts</h4>
                            </div>
                            <motion.div
                                className={styles.expertLinks}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
                                }}
                            >
                                {[
                                    { icon: "user-doctor", title: "Find Specialists", desc: "Connect with vetted doctors." },
                                    { icon: "video", title: "Teleconsult", desc: "Video call with our team." },
                                    { icon: "comments", title: "Q&A Community", desc: "Expert-led forum support." }
                                ].map((link, i) => (
                                    <motion.div
                                        key={i}
                                        className={styles.expertLink}
                                        variants={{
                                            hidden: { opacity: 0, x: 10 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                        whileHover={{
                                            x: 6,
                                            backgroundColor: "rgba(190, 24, 93, 0.03)",
                                            borderRadius: "16px"
                                        }}
                                    >
                                        <motion.i
                                            className={`fas fa-${link.icon}`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        ></motion.i>
                                        <div>
                                            <h5>{link.title}</h5>
                                            <p>{link.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Journeys;
