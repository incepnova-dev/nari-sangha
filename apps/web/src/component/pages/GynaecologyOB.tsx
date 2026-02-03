import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../routes/routeConstants";
import styles from "./GynaecologyOB.module.css";
import LivingBodyAnimation from "./LivingBodyAnimation";

const GynaecologyOB: React.FC = () => {
    const navigate = useNavigate();
    const [activeRegion, setActiveRegion] = useState<"full" | "abdomen" | "lower-abdomen" | "pelvic" | null>(null);

    const coreServices = [
        {
            title: "Annual Wellness Exam",
            icon: "🩺",
            region: "full" as const,
            desc: "A routine preventive check-in focused on long-term reproductive and overall health.",
            supports: [
                "Menstrual cycle discussions",
                "Cervical and breast health awareness",
                "Preventive screening education",
                "Lifestyle and nutrition conversations",
                "Early risk awareness"
            ],
            note: "This does not replace clinical diagnosis."
        },
        {
            title: "Prenatal & Postnatal Care",
            icon: "🤰",
            region: "abdomen" as const,
            desc: "Support before, during, and after pregnancy to help navigate physical and emotional changes.",
            supports: [
                "Pregnancy stage education",
                "Body changes and comfort guidance",
                "Emotional well-being check-ins",
                "Postpartum recovery awareness",
                "Breastfeeding and bonding basics"
            ]
        },
        {
            title: "Contraceptive Counselling",
            icon: "💊",
            region: "lower-abdomen" as const,
            desc: "Education to help understand reproductive choices and family planning options.",
            supports: [
                "Hormonal vs non-hormonal options",
                "Short-term and long-term methods",
                "Fertility awareness basics",
                "Side-effect education",
                "Choice-based decision support"
            ]
        },
        {
            title: "PCOS & Endometriosis Management",
            icon: "🌸",
            region: "pelvic" as const,
            desc: "Educational and supportive guidance for conditions related to hormonal imbalance and chronic pelvic health.",
            supports: [
                "Symptom pattern awareness",
                "Hormonal health education",
                "Pain and fatigue understanding",
                "Cycle tracking concepts",
                "Knowing when to seek medical help"
            ],
            link: ROUTES.HORMONAL_HEALTH,
            linkText: "Explore Hormonal Health Journey"
        }
    ];

    const lifeStages = [
        { title: "Adolescence & First Cycles", icon: "🌸" },
        { title: "Reproductive Years", icon: "🌺" },
        { title: "Pregnancy & Motherhood", icon: "🤰" },
        { title: "Perimenopause & Menopause", icon: "🍂" }
    ];

    return (
        <div className={styles.page}>
            {/* HERO SECTION */}
            <header className={styles.hero}>
                <div className={styles.container}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.badge}
                    >
                        Trust & Guidance
                    </motion.span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center', textAlign: 'left' }}>
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={styles.title}
                            >
                                Gynaecology & Obstetrics
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className={styles.subtitle}
                            >
                                Comprehensive care for every stage of your reproductive life.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={styles.intro}
                            >
                                From adolescence to menopause, pregnancy to postnatal recovery — gynaecology and obstetric care focuses on supporting your physical, hormonal, and emotional well-being across life stages. Our approach centers on education, prevention, and informed decision-making.
                            </motion.p>
                        </div>
                        <div style={{ height: '500px' }}>
                            <LivingBodyAnimation activeRegion={activeRegion} />
                        </div>
                    </div>
                </div>
            </header>

            {/* WHAT WE SUPPORT */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>What This Care Covers</h2>
                    <ul className={styles.supportList}>
                        <li className={styles.supportItem}>Menstrual and hormonal health</li>
                        <li className={styles.supportItem}>Pregnancy and postpartum transitions</li>
                        <li className={styles.supportItem}>Reproductive planning and contraception</li>
                        <li className={styles.supportItem}>Chronic condition awareness</li>
                        <li className={styles.supportItem}>Preventive and routine care</li>
                    </ul>
                </div>
            </section>

            {/* CORE SERVICES BREAKDOWN */}
            <section className={styles.section} style={{ background: '#fafbfc' }}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Core Services Breakdown</h2>
                    <div className={styles.servicesGrid}>
                        {coreServices.map((service, idx) => (
                            <motion.div
                                key={idx}
                                className={styles.serviceCard}
                                onMouseEnter={() => setActiveRegion(service.region)}
                                onMouseLeave={() => setActiveRegion(null)}
                                whileHover={{ y: -5 }}
                            >
                                <div className={styles.serviceIcon}>{service.icon}</div>
                                <div className={styles.serviceInfo}>
                                    <h3>{service.title}</h3>
                                    <p>{service.desc}</p>
                                    <ul className={styles.subPoints}>
                                        {service.supports.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                    {service.link ? (
                                        <Link to={service.link} className={styles.linkBtn}>
                                            {service.linkText} →
                                        </Link>
                                    ) : null}
                                    {service.note && <p className={styles.note}>{service.note}</p>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LIFE STAGES */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Care Across Life Stages</h2>
                    <div className={styles.stagesGrid}>
                        {lifeStages.map((stage, idx) => (
                            <div key={idx} className={styles.stageCard}>
                                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{stage.icon}</div>
                                <h4>{stage.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHEN TO SEEK SUPPORT */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.guidanceBox}>
                        <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>When Should You Reach Out?</h2>
                        <ul className={styles.guidanceList}>
                            <li>Changes in cycle patterns</li>
                            <li>Persistent discomfort or pain</li>
                            <li>Planning pregnancy or contraception</li>
                            <li>Emotional changes around hormonal shifts</li>
                            <li>Postpartum concerns</li>
                        </ul>
                        <p className={styles.disclaimer}>
                            <strong>Note:</strong> This page does not provide medical diagnosis. Always consult with a healthcare professional for clinical concerns.
                        </p>
                    </div>
                </div>
            </section>

            {/* SUPPORT CTA */}
            <section className={styles.container} style={{ paddingBottom: '100px' }}>
                <div className={styles.ctaBlock}>
                    <h2>You don’t have to figure this out alone</h2>
                    <p>Support, information, and expert guidance are always available — at your pace.</p>
                    <div className={styles.btnRow}>
                        <button className={styles.btnPrimary} onClick={() => navigate(ROUTES.FIND_DOCTORS)}>Talk to an Expert</button>
                        <button className={styles.btnSecondary} onClick={() => navigate(ROUTES.JOURNEYS)}>Explore Health Journeys</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GynaecologyOB;
