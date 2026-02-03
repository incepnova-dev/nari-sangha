import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AutoimmuneHealthJourney.module.css";

interface Fact {
    badge: string;
    content: string;
}

interface Theme {
    id: number;
    title: string;
    subtitle: string;
    icon: string;
    facts: string[];
}

const AutoimmuneHealthJourney: React.FC = () => {
    const [exploredThemes, setExploredThemes] = useState<Set<number>>(new Set());
    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
    const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
    const [currentSimTab, setCurrentSimTab] = useState<'normal' | 'breakdown' | 'attack'>('normal');

    const organData: Record<string, { title: string; subtitle: string; desc: string; icon: string; facts: string[] }> = {
        thyroid: {
            title: "Thyroid Gland",
            subtitle: "Hashimoto's & Graves'",
            desc: "The immune system attacks the butterfly-shaped gland in the neck, causing it to produce too much or too little hormone.",
            icon: "🦋",
            facts: ["Affects metabolism", "Energy levels", "Temperature control"]
        },
        joints: {
            title: "Joints & Synovium",
            subtitle: "Rheumatoid Arthritis",
            desc: "The immune system targets the lining of the joints, leading to painful swelling and eventual bone erosion.",
            icon: "🦴",
            facts: ["Morning stiffness", "Symmetrical pain", "Reduced mobility"]
        },
        skin: {
            title: "Dermal Layers",
            subtitle: "Lupus Rash & Psoriasis",
            desc: "Immune cells attack skin cells, causing butterfly rashes, discoid lesions, or rapid skin cell turnover.",
            icon: "✨",
            facts: ["Butterfly rash", "Sun sensitivity", "Inflammation"]
        },
        kidneys: {
            title: "Renal System",
            subtitle: "Lupus Nephritis",
            desc: "Inflammation of the kidneys can lead to scarring and decreased function if not managed early.",
            icon: "💧",
            facts: ["Protein filtration", "Blood pressure", "Fluid balance"]
        },
        digestive: {
            title: "Digestive Tract",
            subtitle: "Celiac & IBD",
            desc: "The immune system reacts to gluten or internal flora, damaging the intestinal lining.",
            icon: "🥦",
            facts: ["Nutrient absorption", "Gut barrier", "Microbiome balance"]
        },
        systemic: {
            title: "Cardiopulmonary",
            subtitle: "Systemic Inflammation",
            desc: "Autoimmune flares can cause inflammation of the heart lining (pericarditis) or lung pleura, leading to chest pain.",
            icon: "🫀",
            facts: ["Heart lining", "Lung protection", "Oxygen intake"]
        }
    };

    const themeData: Record<number, Theme> = {
        1: {
            id: 1,
            title: "Understanding Autoimmune Diseases in Women",
            subtitle: "Why women are more susceptible and what happens in the body",
            icon: "🔬",
            facts: [
                "<strong>Gender Disparity:</strong> Women are 2-3 times more likely to develop autoimmune diseases than men due to hormonal, genetic, and immune system differences",
                "<strong>Prevalence:</strong> Approximately 80% of all autoimmune disease patients are women, affecting about 1 in 12 women worldwide",
                "<strong>Hormonal Influence:</strong> Estrogen can enhance immune responses, making women more susceptible to autoimmune conditions",
                "<strong>Genetic Factor:</strong> The X chromosome carries many immune-related genes; women have two X chromosomes, increasing autoimmune risk",
                "<strong>Basic Mechanism:</strong> Autoimmune diseases occur when the immune system mistakenly attacks healthy body tissues",
                "<strong>Disease Variety:</strong> Over 80 different autoimmune diseases exist, with lupus, rheumatoid arthritis, and thyroid diseases being most common in women",
                "<strong>Family History:</strong> Autoimmune conditions often run in families, indicating genetic predisposition",
                "<strong>Environmental Triggers:</strong> Include infections, stress, toxins, and certain medications",
                "<strong>Diagnostic Challenge:</strong> Many autoimmune diseases share overlapping symptoms, making diagnosis challenging",
                "<strong>Age of Onset:</strong> Women of childbearing age (15-44 years) are at highest risk for developing autoimmune conditions"
            ]
        },
        2: {
            id: 2,
            title: "Systemic Lupus Erythematosus (SLE)",
            subtitle: "Complete overview of lupus causes, symptoms, and management",
            icon: "🦋",
            facts: [
                "<strong>Definition:</strong> Lupus is a chronic autoimmune disease where the immune system attacks multiple organs and tissues",
                "<strong>Gender Impact:</strong> Women are 9 times more likely to develop lupus than men, typically between ages 15-45",
                "<strong>Prevalence:</strong> Lupus affects approximately 1 in 1,000 women, with higher rates in African American, Hispanic, and Asian women",
                "<strong>Butterfly Rash:</strong> The hallmark 'butterfly rash' across the cheeks and nose occurs in about 50% of lupus patients",
                "<strong>Multi-System:</strong> Lupus can affect skin, joints, kidneys, heart, lungs, blood vessels, brain, and blood cells"
            ]
        },
        3: {
            id: 3,
            title: "Lupus Symptoms by Severity Stages",
            subtitle: "From mild to critical - recognizing progression",
            icon: "📊",
            facts: [
                "<strong>Mild - Fatigue:</strong> Fatigue interfering with daily activities but not preventing them",
                "<strong>Mild - Joint Pain:</strong> Mild joint pain and morning stiffness lasting less than 30 minutes",
                "<strong>Moderate - Rash:</strong> Widespread skin rashes including the classic butterfly rash",
                "<strong>Severe - Nephritis:</strong> Kidney disease (lupus nephritis) with declining function",
                "<strong>Critical - Brain:</strong> Lupus cerebritis causing seizures, psychosis, or stroke"
            ]
        },
        4: {
            id: 4,
            title: "Lupus Medications & Treatment Options",
            subtitle: "Understanding your treatment plan",
            icon: "💊",
            facts: [
                "<strong>Antimalarials:</strong> Hydroxychloroquine (Plaquenil) is cornerstone therapy for most lupus patients",
                "<strong>Corticosteroids:</strong> Prednisone rapidly controls inflammation during flares",
                "<strong>Immunosuppressants:</strong> Methotrexate, azathioprine (Imuran), mycophenolate (CellCept) for moderate-severe disease",
                "<strong>Biologics:</strong> Belimumab (Benlysta) is FDA-approved biologic for lupus"
            ]
        },
        5: {
            id: 5,
            title: "Pregnancy & Autoimmune Disease",
            subtitle: "Planning, managing, and thriving during pregnancy",
            icon: "🤰",
            facts: [
                "<strong>Pre-Conception:</strong> Plan pregnancy when disease is well-controlled for at least 6 months",
                "<strong>Safe Medications:</strong> Hydroxychloroquine, azathioprine, low-dose prednisone are safe during pregnancy",
                "<strong>Lupus Risks:</strong> Increased risk of preeclampsia, preterm birth, growth restriction"
            ]
        },
        6: {
            id: 6,
            title: "Rheumatoid Arthritis (RA)",
            subtitle: "Understanding joint inflammation and treatment",
            icon: "🦴",
            facts: [
                "<strong>Definition:</strong> RA is chronic autoimmune disease causing joint inflammation, pain, and damage",
                "<strong>Gender Ratio:</strong> Women are 3 times more likely to develop RA than men",
                "<strong>Symmetrical Pattern:</strong> Typically affects same joints on both sides of body",
                "<strong>Morning Stiffness:</strong> Characteristic stiffness lasting more than 30 minutes, often hours"
            ]
        },
        7: {
            id: 7,
            title: "Thyroid Disorders",
            subtitle: "Hashimoto's thyroiditis and Graves' disease explained",
            icon: "🦋",
            facts: [
                "<strong>Hashimoto's:</strong> Most common cause of hypothyroidism in US; autoimmune attack on thyroid",
                "<strong>Hypothyroid Symptoms:</strong> Fatigue, weight gain, cold intolerance, constipation, dry skin, hair loss",
                "<strong>Graves' Disease:</strong> Autoimmune hyperthyroidism; antibodies stimulate overactive thyroid"
            ]
        },
        8: {
            id: 8,
            title: "Risk Factors & Prevention Strategies",
            subtitle: "Understanding and reducing your autoimmune risk",
            icon: "🌸",
            facts: [
                "<strong>Genetic Risk:</strong> First-degree relatives with autoimmune diseases increase risk 5-10 fold",
                "<strong>Smoking:</strong> Strongest modifiable risk factor for RA and worsens lupus outcomes",
                "<strong>Healthy Weight:</strong> Maintain through balanced diet and regular exercise"
            ]
        },
        9: {
            id: 9,
            title: "Bone Health Essentials",
            subtitle: "Osteoporosis and osteoarthritis explained",
            icon: "🦴",
            facts: [
                "<strong>Osteoporosis:</strong> Bones become weak, brittle, and prone to fractures",
                "<strong>Menopause Impact:</strong> Women lose bone density rapidly in first 5-10 years after menopause",
                "<strong>Autoimmune Link:</strong> Chronic inflammation and medications like steroids increase osteoporosis risk"
            ]
        },
        10: {
            id: 10,
            title: "Wellness & Self-Care",
            subtitle: "Nutrition, exercise, warning signs, and medical care",
            icon: "🥗",
            facts: [
                "<strong>Anti-Inflammatory Diet:</strong> Pattern beneficial for autoimmune conditions (Omega-3s, Antioxidants)",
                "<strong>Exercise:</strong> Aim for 150 minutes of moderate activity weekly",
                "<strong>Warning Signs:</strong> Persistent joint pain, swelling, or unexplained fatigue lasting >2 weeks"
            ]
        }
    };

    const handleThemeClick = (id: number) => {
        const theme = themeData[id];
        setSelectedTheme(theme);
        if (!exploredThemes.has(id)) {
            setExploredThemes(new Set(Array.from(exploredThemes).concat(id)));
        }
    };

    const progressPercent = Math.round((exploredThemes.size / 10) * 100);

    const parseFact = (fact: string): Fact => {
        const match = fact.match(/<strong>(.*?):<\/strong>(.*)/);
        if (match) {
            return {
                badge: match[1],
                content: match[2].trim()
            };
        }
        return {
            badge: "Fact",
            content: fact.replace(/<\/?strong>/g, "")
        };
    };

    const scrollToThemes = () => {
        const element = document.getElementById("themesSection");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageShell}>
                {/* HERO SECTION */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1>Your Autoimmune Health Journey Starts Here</h1>
                        <p className={styles.heroSubtitle}>
                            Empowering women with medically-accurate information about autoimmune diseases.
                            Understanding your body is the first step toward wellness.
                        </p>

                        <div className={styles.heroStats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>80%</span>
                                <span className={styles.statLabel}>of patients are women</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>1 in 12</span>
                                <span className={styles.statLabel}>women affected</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>10</span>
                                <span className={styles.statLabel}>Health Themes</span>
                            </div>
                        </div>

                        <div className={styles.heroCtaRow}>
                            <button className={styles.btnPrimary} onClick={scrollToThemes}>Explore Health Themes</button>
                            <button className={styles.btnSecondary}>Watch Introduction</button>
                        </div>
                    </div>

                    <div className={styles.heroVisual3d}>
                        <div className={styles.immune3dContainer}>
                            <div className={styles.immuneCore}>
                                <div className={`${styles.coreRing} ${styles.ring1}`}></div>
                                <div className={`${styles.coreRing} ${styles.ring2}`}></div>
                                <div className={`${styles.coreRing} ${styles.ring3}`}></div>
                                <div className={styles.coreCenter}>
                                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                                        <defs>
                                            <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#ec407a" />
                                                <stop offset="100%" stopColor="#9c27b0" />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="50" cy="50" r="45" fill="url(#coreGrad)" />
                                    </svg>
                                </div>
                            </div>

                            <div className={`${styles.orbitingCell} ${styles.cell1}`}><div className={styles.cellInner}>🦠</div></div>
                            <div className={`${styles.orbitingCell} ${styles.cell2}`}><div className={styles.cellInner}>💉</div></div>
                            <div className={`${styles.orbitingCell} ${styles.cell3}`}><div className={styles.cellInner}>🧬</div></div>
                            <div className={`${styles.orbitingCell} ${styles.cell4}`}><div className={styles.cellInner}>⚡</div></div>
                        </div>

                        <div className={styles.animationDescription}>
                            <div className={styles.descBadge}>✨ Interactive Immune System</div>
                            <h3 className={styles.descTitle}>Your Body's Defense Network</h3>
                            <p className={styles.descText}>
                                The pulsating core represents your immune system's constant vigilance,
                                while orbiting cells symbolize antibodies and T-cells working in harmony.
                            </p>
                        </div>
                    </div>
                </section>

                {/* THEME EXPLORER */}
                <section id="themesSection" className={styles.themesSection}>
                    <div className={styles.sectionHeaderEnhanced}>
                        <div className={styles.headerContent}>
                            <h2 className={styles.sectionTitleGradient}>Discover Your Health Journey</h2>
                            <p className={styles.sectionSubtitle}>
                                10 Essential themes designed for comprehensive understanding.
                                <strong>Click any theme</strong> to unlock insights.
                            </p>
                        </div>

                        <div className={styles.progressTracker}>
                            <div className={styles.trackerVisual}>
                                <svg width="140" height="140" className={styles.progressCircleSvg}>
                                    <circle cx="70" cy="70" r="60" className={styles.progressBgCircle} />
                                    <circle
                                        cx="70" cy="70" r="60"
                                        className={styles.progressFillCircle}
                                        style={{ strokeDashoffset: 377 - (377 * progressPercent) / 100 }}
                                    />
                                    <defs>
                                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ec407a" />
                                            <stop offset="100%" stopColor="#9c27b0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className={styles.progressCenter}>
                                    <div className={styles.progressNumber}>{progressPercent}%</div>
                                    <div className={styles.progressLabel}>Explored</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.themeGridEnhanced}>
                        {Array.from(Object.values(themeData)).map(theme => (
                            <div
                                key={theme.id}
                                className={`${styles.themeCard3d} ${exploredThemes.has(theme.id) ? styles.explored : ""}`}
                                onClick={() => handleThemeClick(theme.id)}
                            >
                                <div className={styles.cardIconContainer}>
                                    <div className={styles.iconBg}></div>
                                    <span className={styles.cardIcon}>{theme.icon}</span>
                                </div>
                                <h3 className={styles.cardTitle}>{theme.title}</h3>
                                <p className={styles.cardDescription}>{theme.subtitle}</p>
                                <div className={styles.cardFooter}>
                                    <span className={styles.cardBadge}>{theme.facts.length} Insights</span>
                                    <div className={styles.cardArrow}>→</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* BODY SIMULATOR */}
                <section className={styles.bodySimulatorSection}>
                    <div className={styles.simulatorHeader}>
                        <h2 className={styles.sectionTitleGradient}>Autoimmune Disease: What Happens Inside</h2>
                    </div>

                    <div className={styles.simulatorTabs}>
                        <button className={`${styles.simTab} ${currentSimTab === 'normal' ? styles.active : ''}`} onClick={() => setCurrentSimTab('normal')}>
                            <span className={styles.tabIcon}>✓</span>
                            <span className={styles.tabLabel}>Normal Immunity</span>
                        </button>
                        <button className={`${styles.simTab} ${currentSimTab === 'breakdown' ? styles.active : ''}`} onClick={() => setCurrentSimTab('breakdown')}>
                            <span className={styles.tabIcon}>⚡</span>
                            <span className={styles.tabLabel}>Immune Breakdown</span>
                        </button>
                        <button className={`${styles.simTab} ${currentSimTab === 'attack' ? styles.active : ''}`} onClick={() => setCurrentSimTab('attack')}>
                            <span className={styles.tabIcon}>🎯</span>
                            <span className={styles.tabLabel}>Self-Attack</span>
                        </button>
                    </div>

                    <div className={styles.simulatorContent}>
                        {(currentSimTab === 'normal' || currentSimTab === 'attack') && (
                            <div className={styles.simGrid}>
                                <div className={`${styles.bodyOutlineWrapper} ${styles[currentSimTab]}`}>
                                    <svg viewBox="0 0 200 500" className={styles.bodySvg}>
                                        <g className={styles.bodyBreathing}>
                                            <defs>
                                                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="rgba(236, 64, 122, 0.12)" />
                                                    <stop offset="100%" stopColor="rgba(236, 64, 122, 0.02)" />
                                                </linearGradient>
                                                <filter id="glow">
                                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                                    <feMerge>
                                                        <feMergeNode in="coloredBlur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>

                                            {/* Refined Slim Silhouette */}
                                            <path
                                                d="M100,25 C85,25 75,35 75,50 C75,65 82,75 82,90 C82,100 78,110 65,125 C45,145 40,175 40,215 C40,265 50,300 65,330 C75,350 82,370 82,410 L82,485 L118,485 L118,410 C118,370 125,350 135,330 C150,300 160,265 160,215 C160,175 155,145 135,125 C122,110 118,100 118,90 C118,75 125,65 125,50 C125,35 115,25 100,25 Z"
                                                className={styles.premiumBodyPath}
                                            />

                                            {/* Ambient Particles */}
                                            {[[90, 400, 1], [110, 350, 0], [95, 300, 2], [105, 250, 1], [85, 200, 3], [115, 150, 0.5]].map(([x, y, d], i) => (
                                                <circle key={i} cx={x} cy={y} r="1.2" className={styles.particle} style={{ animationDelay: `${d}s` }} />
                                            ))}

                                            {/* Hotspots */}
                                            {/* Thyroid */}
                                            <g
                                                className={`${styles.hotspot} ${selectedOrgan === 'thyroid' ? styles.activeHotspot : ''}`}
                                                onClick={() => setSelectedOrgan('thyroid')}
                                            >
                                                <circle cx="100" cy="75" r="12" className={styles.hotspotPulse} />
                                                <path d="M92,72 C90,68 100,68 100,75 C100,68 110,68 108,72 C112,75 100,82 100,75 C100,82 88,75 92,72 Z"
                                                    fill="#4fc3f7" className={styles.organIcon} />
                                            </g>

                                            {/* Systemic (Heart) */}
                                            <g
                                                className={`${styles.hotspot} ${selectedOrgan === 'systemic' ? styles.activeHotspot : ''}`}
                                                onClick={() => setSelectedOrgan('systemic')}
                                            >
                                                <circle cx="100" cy="165" r="14" className={styles.hotspotPulse} />
                                                <path d="M100,168 L96,164 A3,3 0 0,1 100,160 A3,3 0 0,1 104,164 Z"
                                                    fill="#ef5350" className={styles.organIcon} />
                                            </g>

                                            {/* Joints */}
                                            <g
                                                className={`${styles.hotspot} ${selectedOrgan === 'joints' ? styles.activeHotspot : ''}`}
                                                onClick={() => setSelectedOrgan('joints')}
                                            >
                                                {[[80, 135], [120, 135], [88, 285], [112, 285]].map(([x, y], i) => (
                                                    <circle key={i} cx={x} cy={y} r="5" fill="#f06292" opacity="0.6" className={styles.jointPoint} />
                                                ))}
                                            </g>

                                            {/* Skin */}
                                            <g
                                                className={`${styles.hotspot} ${selectedOrgan === 'skin' ? styles.activeHotspot : ''}`}
                                                onClick={() => setSelectedOrgan('skin')}
                                            >
                                                <circle cx="100" cy="45" r="15" className={styles.hotspotPulse} />
                                                <circle cx="100" cy="45" r="8" fill="rgba(66, 165, 245, 0.15)" className={styles.organIcon} />
                                            </g>

                                            {/* Kidneys */}
                                            <g
                                                className={`${styles.hotspot} ${selectedOrgan === 'kidneys' ? styles.activeHotspot : ''}`}
                                                onClick={() => setSelectedOrgan('kidneys')}
                                            >
                                                <path d="M90,230 Q93,235 90,242 M110,230 Q107,235 110,242"
                                                    fill="none" stroke="#64b5f6" strokeWidth="3" strokeLinecap="round" opacity="0.8" className={styles.organIcon} />
                                            </g>

                                            {/* Digestive */}
                                            <g
                                                className={`${styles.hotspot} ${selectedOrgan === 'digestive' ? styles.activeHotspot : ''}`}
                                                onClick={() => setSelectedOrgan('digestive')}
                                            >
                                                <circle cx="100" cy="315" r="18" className={styles.hotspotPulse} />
                                                <path d="M90,305 Q100,335 110,305" fill="none" stroke="#66bb6a" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" className={styles.organIcon} />
                                            </g>
                                        </g>
                                    </svg>
                                    {!selectedOrgan && (
                                        <div className={styles.mapPrompt}>
                                            <p>Click on any region to explore interaction</p>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.simInfoContainer}>
                                    <AnimatePresence mode="wait">
                                        {selectedOrgan ? (
                                            <motion.div
                                                key={selectedOrgan}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className={styles.organInfoCard}
                                            >
                                                <div className={styles.organInfoHeader}>
                                                    <span className={styles.organIconLarge}>{organData[selectedOrgan].icon}</span>
                                                    <div>
                                                        <h4>{organData[selectedOrgan].title}</h4>
                                                        <span className={styles.organSubtitle}>{organData[selectedOrgan].subtitle}</span>
                                                    </div>
                                                </div>
                                                <p className={styles.organDesc}>{organData[selectedOrgan].desc}</p>
                                                <div className={styles.organFacts}>
                                                    {organData[selectedOrgan].facts.map((fact, i) => (
                                                        <span key={i} className={styles.organFactTag}>{fact}</span>
                                                    ))}
                                                </div>
                                                <button className={styles.resetMap} onClick={() => setSelectedOrgan(null)}>Back to Overview</button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={styles.defaultInfo}
                                            >
                                                <div className={styles.infoCard}>
                                                    <h4>{currentSimTab === 'normal' ? '🛡️ Defense System' : '🎯 Targeted Attack'}</h4>
                                                    <p>
                                                        {currentSimTab === 'normal'
                                                            ? 'Your immune system patrols your body 24/7, destroying foreign invaders like bacteria and viruses.'
                                                            : 'In autoimmune states, the body misidentifies its own healthy cells as threats and launches attacks.'}
                                                    </p>
                                                </div>
                                                <div className={styles.infoCard}>
                                                    <h4>🔍 Interactive Map</h4>
                                                    <p>Click on the body regions to see how specific organs are impacted by autoimmune conditions.</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}

                        {currentSimTab === 'breakdown' && (
                            <div className={styles.simGrid}>
                                <div className={`${styles.bodyOutlineWrapper} ${styles.breakdown}`}>
                                    <svg viewBox="0 0 200 500" className={styles.bodySvg}>
                                        <g className={styles.bodyBreathingSlower}>
                                            <path d="M100,20 C80,20 70,35 70,55 C70,75 80,90 80,105 C80,115 75,125 60,140 C40,160 35,190 35,230 C35,270 45,300 65,330 C75,345 80,365 80,400 L80,480 L120,480 L120,400 C120,365 125,345 135,330 C155,300 165,270 165,230 C165,190 160,160 140,140 C125,125 120,115 120,105 C120,90 130,75 130,55 C130,35 120,20 100,20 Z"
                                                className={styles.bodyPathBreakdown} />

                                            <motion.circle
                                                cx="100" cy="180" r="30"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    fill: ["#66bb6a", "#ffa726", "#ef5350"],
                                                    opacity: [0.1, 0.3, 0.1]
                                                }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                            />
                                        </g>
                                    </svg>
                                </div>
                                <div className={styles.simInfoContainer}>
                                    <div className={styles.infoCard}>
                                        <h4>🧬 Genetic Factors</h4>
                                        <p>Hormones (Estrogen) and X-chromosomes increase immune gene expression in women.</p>
                                    </div>
                                    <div className={styles.infoCard}>
                                        <h4>🌍 Environmental Triggers</h4>
                                        <p>Stress, infections, and toxins can confuse the immune system.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* THEME DETAIL PANEL */}
                <AnimatePresence>
                    {selectedTheme && (
                        <>
                            <motion.div
                                className={styles.backdrop}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedTheme(null)}
                            />
                            <motion.div
                                className={`${styles.infoPanel} ${styles.active}`}
                                initial={{ right: "-100%" }}
                                animate={{ right: 0 }}
                                exit={{ right: "-100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            >
                                <button className={styles.closePanel} onClick={() => setSelectedTheme(null)}>✕</button>
                                <div className={styles.panelHeader}>
                                    <div className={styles.panelIcon}>{selectedTheme.icon}</div>
                                    <div className={styles.panelTitleBlock}>
                                        <h2>{selectedTheme.title}</h2>
                                        <p>{selectedTheme.subtitle}</p>
                                    </div>
                                </div>
                                <div className={styles.panelContent}>
                                    {selectedTheme.facts.map((fact, i) => {
                                        const parsed = parseFact(fact);
                                        return (
                                            <div key={i} className={styles.factCard}>
                                                <div className={styles.factBadge}>{parsed.badge}</div>
                                                <div className={styles.factContent}>{parsed.content}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AutoimmuneHealthJourney;
