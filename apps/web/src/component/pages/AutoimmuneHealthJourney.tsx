import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AutoimmuneHealthJourney.module.css";
import "./body-map.css";

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

    const organData: Record<string, Record<string, { title: string; subtitle: string; desc: string; icon: string; facts: string[] }>> = {
        thyroid: {
            normal: {
                title: "Thyroid Gland",
                subtitle: "Metabolic Harmony",
                desc: "In a healthy state, the thyroid maintains metabolic balance, regulating energy and temperature with precision.",
                icon: "🦋",
                facts: ["Balanced T3/T4", "Active metabolism", "Stable heart rate", "Core temperature control", "Energy regulation"]
            },
            breakdown: {
                title: "Thyroid Gland",
                subtitle: "Loss of Tolerance",
                desc: "Molecular mimicry or stressful triggers cause the immune system to start misidentifying thyroid proteins as foreign.",
                icon: "🦋",
                facts: ["Antibody formation", "Gradual infiltration", "Hormonal fluctuations", "Initial fatigue signs", "Silent inflammation"]
            },
            attack: {
                title: "Thyroid Gland",
                subtitle: "Hashimoto's & Graves'",
                desc: "The immune system destroys follicular cells (Hashimoto's) or overstimulates receptors (Graves'), causing severe dysfunction.",
                icon: "🦋",
                facts: ["Tissue destruction", "Severe hypothyroidism", "Goiter formation", "Metabolic crash", "Chronic medication needs"]
            }
        },
        joints: {
            normal: {
                title: "Joints & Synovium",
                subtitle: "Fluid Mobility",
                desc: "Healthy joints have smooth synovial lining and cartilage, allowing for flexible, pain-free movement.",
                icon: "🦴",
                facts: ["Smooth movement", "Healthy cartilage", "Balanced lubrication", "No inflammation", "Full range of motion"]
            },
            breakdown: {
                title: "Joints & Synovium",
                subtitle: "Synovial Activation",
                desc: "Immune cells begin to infiltrate the synovial membrane, causing early congestion and slight stiffness.",
                icon: "🦴",
                facts: ["Early stiffness", "Congested synovium", "Intermittent pain", "Initial swelling", "Reduced flexibility"]
            },
            attack: {
                title: "Joints & Synovium",
                subtitle: "Rheumatoid Arthritis",
                desc: "Chronic inflammation causes the synovium to thicken and invade bone, leading to permanent joint damage.",
                icon: "🦴",
                facts: ["Bone erosion", "Cartilage loss", "Deformity risk", "Severe morning pain", "Systemic disability"]
            }
        },
        skin: {
            normal: {
                title: "Dermal Layers",
                subtitle: "Protective Barrier",
                desc: "Healthy skin acts as a resilient barrier against the environment, maintaining moisture and defense.",
                icon: "✨",
                facts: ["Strong barrier", "Rapid healing", "Consistent texture", "UV protection", "Moisture retention"]
            },
            breakdown: {
                title: "Dermal Layers",
                subtitle: "Sensitivity Spike",
                desc: "The skin's immune cells become hypersensitive to UV light or systemic cues, preparing for inflammation.",
                icon: "✨",
                facts: ["UV sensitivity", "Prickling sensation", "Mild flushing", "Barrier weakening", "Delayed healing"]
            },
            attack: {
                title: "Dermal Layers",
                subtitle: "Lupus & Psoriasis",
                desc: "Severe immune-led cell turnover or vasculitis leads to visible rashes, plaques, and painful lesions.",
                icon: "✨",
                facts: ["Butterfly rash", "Psoriatic plaques", "Discoid lesions", "Chronic itching", "Scarring potential"]
            }
        },
        kidneys: {
            normal: {
                title: "Renal System",
                subtitle: "Purification Center",
                desc: "Healthy kidneys filter waste and maintain fluid balance without any protein leakage.",
                icon: "🫘",
                facts: ["Pure filtration", "Fluid balance", "BP regulation", "No protein loss", "Active detox"]
            },
            breakdown: {
                title: "Renal System",
                subtitle: "Glomerular Stress",
                desc: "Immune complexes begin to deposit in the filtration units, causing stress and initial leaks.",
                icon: "🫘",
                facts: ["Complex deposits", "Early protein leak", "Micro-inflammation", "Fluctuating BP", "Silent damage"]
            },
            attack: {
                title: "Renal System",
                subtitle: "Lupus Nephritis",
                desc: "Widespread inflammation leads to kidney scarring (nephrosis) and potential failure if unchecked.",
                icon: "🫘",
                facts: ["Kidney scarring", "Severe proteinuria", "Urine changes", "Chronic hypertension", "Dialysis risk"]
            }
        },
        digestive: {
            normal: {
                title: "Digestive Tract",
                subtitle: "Nutrient Gateway",
                desc: "A healthy gut lining absorbs nutrients efficiently while keeping toxins out through a tight barrier.",
                icon: "🍽️",
                facts: ["Maximum absorption", "Tight junctions", "Diverse flora", "Smooth digestion", "Immune harmony"]
            },
            breakdown: {
                title: "Digestive Tract",
                subtitle: "Gastrointestinal Leak",
                desc: "The gut lining becomes 'leaky', allowing proteins to escape and trigger systemic immune warnings.",
                icon: "🍽️",
                facts: ["Leaky barrier", "Flora dysbiosis", "Food sensitivities", "Bloating/Gas", "Immune activation"]
            },
            attack: {
                title: "Digestive Tract",
                subtitle: "Celiac & IBD",
                desc: "The immune system destroys the villi or deep intestinal tissue, causing severe malnutrition and pain.",
                icon: "🍽️",
                facts: ["Villous atrophy", "Severe malabsorption", "Deep inflammation", "Chronic pain", "Weight loss"]
            }
        },
        systemic: {
            normal: {
                title: "Cardiopulmonary",
                subtitle: "Vital Circulation",
                desc: "The heart and lungs work in perfect sync to provide oxygenated blood across the whole body.",
                icon: "❤️",
                facts: ["Rhythmic heart", "Clear breathing", "Full oxygenation", "Healthy vessels", "Strong endurance"]
            },
            breakdown: {
                title: "Cardiopulmonary",
                subtitle: "Vascular Congestion",
                desc: "Early systemic inflammation starts to stiffen blood vessels and irritate the protective linings.",
                icon: "❤️",
                facts: ["Vessel stiffness", "Lining irritation", "Short breath", "Reduced stamina", "Silent tightness"]
            },
            attack: {
                title: "Cardiopulmonary",
                subtitle: "Organ Inflammation",
                desc: "Acute inflammation of the heart sac (pericarditis) or lung lining (pleuritis) causes severe pain.",
                icon: "❤️",
                facts: ["Pericarditis", "Severe chest pain", "Lung effusion", "Pulse irregularities", "Systemic crisis"]
            }
        },
        reproductive: {
            normal: {
                title: "Reproductive System",
                subtitle: "Hormonal Balance",
                desc: "Hormones like estrogen and progesterone fluctuate naturally to maintain reproductive and systemic health.",
                icon: "🌸",
                facts: ["Stable cycles", "Hormonal health", "Natural fertility", "Systemic support", "Bone density aid"]
            },
            breakdown: {
                title: "Reproductive System",
                subtitle: "Endocrine Shift",
                desc: "High systemic inflammation begins to interfere with regular hormonal cycles and signaling.",
                icon: "🌸",
                facts: ["Cycle disruption", "Hormone drops", "Inflammation link", "Reduced fertility", "Mood swings"]
            },
            attack: {
                title: "Reproductive System",
                subtitle: "Tissue Interference",
                desc: "Autoimmune attacks can target specialized tissues or lead to complications in pregnancy.",
                icon: "🌸",
                facts: ["Auto-attack signs", "Pregnancy risks", "Severe dysfunction", "Early menopause risk", "Chronic distress"]
            }
        },
        endocrine: {
            normal: {
                title: "Endocrine System",
                subtitle: "Command Center",
                desc: "The master glands in the brain (pituitary/hypothalamus) send clear signals to all other organs.",
                icon: "🧠",
                facts: ["Clear signaling", "Balanced cortisol", "Growth harmony", "Water balance", "Stress resilience"]
            },
            breakdown: {
                title: "Endocrine System",
                subtitle: "Signal Static",
                desc: "Chronic stress and early inflammation create 'noise' in the hormonal command chain.",
                icon: "🧠",
                facts: ["Muffled signals", "Cortisol spikes", "Signal fatigue", "Sleep disruption", "Anxiety focus"]
            },
            attack: {
                title: "Endocrine System",
                subtitle: "Total Disruption",
                desc: "The signaling hubs are damaged or blocked, causing cascades of failure throughout the body.",
                icon: "🧠",
                facts: ["Signal failure", "Adrenal crisis", "Growth stunting", "Total exhaustion", "Systemic collapse"]
            }
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
            subtitle: "Understanding your comprehensive treatment plan",
            icon: "💊",
            facts: [
                "<strong>First-Line:</strong> Hydroxychloroquine is essential for almost all lupus patients to prevent organ damage",
                "<strong>Flare Control:</strong> Corticosteroids like Prednisone are used at lowest possible doses for shortest durations",
                "<strong>Steroid-Sparing:</strong> Immunosuppressants (Methotrexate, CellCept) help reduce reliance on steroids",
                "<strong>Biologicals:</strong> Belimumab and Anifrolumab target specific immune pathways (B-cells/Interferon)",
                "<strong>Monitoring:</strong> Regular bloodwork for kidney and liver function is vital while on these medications",
                "<strong>Side Effects:</strong> Proactive management of bone density and eye health is required for long-term users"
            ]
        },
        5: {
            id: 5,
            title: "Pregnancy & Autoimmune Disease",
            subtitle: "Planning, managing, and thriving during pregnancy",
            icon: "🤰",
            facts: [
                "<strong>Pre-conception:</strong> Wait for at least 6 months of stable remission before trying to conceive",
                "<strong>Multidisciplinary:</strong> Care involves high-risk OB/GYN and rheumatologists working together",
                "<strong>Safe Meds:</strong> Many medications are safe during pregnancy, but others like Methotrexate must be stopped",
                "<strong>Neonatal Lupus:</strong> Rare risk (1-2%) associated with specific antibodies (Ro/La) requiring monitoring",
                "<strong>Post-partum:</strong> Increased monitoring needed as flares can occur shortly after delivery",
                "<strong>Success Rate:</strong> Most women with well-controlled disease have successful, healthy pregnancies"
            ]
        },
        6: {
            id: 6,
            title: "Rheumatoid Arthritis (RA)",
            subtitle: "Understanding joint inflammation and systemic treatment",
            icon: "🦴",
            facts: [
                "<strong>Early Window:</strong> Diagnosing and treating within first 6 months prevents permanent joint erosion",
                "<strong>Joint Targets:</strong> Typically starts in small joints of hands and feet before progressing larger",
                "<strong>Morning Stiffness:</strong> Hallmark symptom is stiff joints lasting more than 30-60 minutes daily",
                "<strong>Extra-articular:</strong> RA can also affect lungs, heart, and eyes through systemic inflammation",
                "<strong>Remission Goal:</strong> Modern 'Treat-to-Target' strategies aim for zero clinical inflammation",
                "<strong>Lifestyle:</strong> Low-impact exercise like swimming helps maintain mobility without joint stress"
            ]
        },
        7: {
            id: 7,
            title: "Thyroid Disorders",
            subtitle: "Hashimoto's thyroiditis and Graves' disease explained",
            icon: "🦋",
            facts: [
                "<strong>Hashimoto's:</strong> Leading cause of hypothyroidism; immune system slowly limits thyroid production",
                "<strong>Graves' Disease:</strong> Leads to hyperthyroidism; antibodies overstimulate the gland's receptors",
                "<strong>TPO Antibodies:</strong> High levels often confirm autoimmune thyroiditis even before TSH changes",
                "<strong>Selenium Role:</strong> Studies suggest certain nutrients may help reduce thyroid antibody levels",
                "<strong>Metabolic Link:</strong> Thyroid health directly impacts cholesterol, heart rate, and weight management",
                "<strong>Symptom Overlap:</strong> Thyroid fatigue often mimics other autoimmune flaring, requiring broad testing"
            ]
        },
        8: {
            id: 8,
            title: "Risk Factors & Prevention Strategies",
            subtitle: "Understanding and reducing your autoimmune risk markers",
            icon: "🌸",
            facts: [
                "<strong>Genetic Load:</strong> While genes set the stage, environmental 'hits' usually trigger the onset",
                "<strong>Epigenetics:</strong> Lifestyle choices can influence whether certain risk genes are 'turned on'",
                "<strong>Vitamin D:</strong> Maintaining optimal levels is linked to lower risk of MS and other conditions",
                "<strong>Gut Health:</strong> A diverse microbiome helps maintain the 'barrier' against systemic triggers",
                "<strong>Toxic Load:</strong> Minimizing exposure to heavy metals and pesticides reduces immune overstimulation",
                "<strong>Stress Response:</strong> Chronic cortisol elevation can eventually lead to immune dysregulation"
            ]
        },
        9: {
            id: 9,
            title: "Bone Health Essentials",
            subtitle: "Osteoporosis and osteoarthritis in autoimmune states",
            icon: "🦴",
            facts: [
                "<strong>Secondary Loss:</strong> Chronic inflammation directly increases bone-dissolving cell activity",
                "<strong>Steroid Risk:</strong> Even low doses of prednisone can significantly impact bone density over time",
                "<strong>DEXA Scanning:</strong> Regular bone density monitoring is recommended for all chronic steroid users",
                "<strong>Weight Bearing:</strong> Walking and strength training are vital for signaling bones to stay strong",
                "<strong>Calcium/D3:</strong> Essential building blocks that many autoimmune patients lack due to absorption issues",
                "<strong>Osteoarthritis:</strong> Wear-and-tear damage that can coexist with inflammatory types of arthritis"
            ]
        },
        10: {
            id: 10,
            title: "Wellness & Self-Care",
            subtitle: "Nutrition, exercise, warning signs, and proactive care",
            icon: "🥗",
            facts: [
                "<strong>Pacing:</strong> Learning to manage energy (the 'Spoon Theory') prevents the crash-and-burn cycle",
                "<strong>Anti-Inflammatory:</strong> Diets rich in Omega-3 (fish/flax) and colorful phytonutrients reduce oxidative stress",
                "<strong>Sleep Hygiene:</strong> 7-9 hours of quality sleep is the primary time for immune system reset",
                "<strong>Flare Journal:</strong> Tracking weather, stress, and food helps identify individual symptom triggers",
                "<strong>Mental Health:</strong> Autoimmune patients have a higher risk of anxiety; mindfulness helps lower inflammation",
                "<strong>Red Flags:</strong> Sudden vision changes, high fever, or severe abdominal pain require immediate care"
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

    const bodyMapRef = useRef<SVGSVGElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const svg = bodyMapRef.current;
        const tooltip = tooltipRef.current;
        if (!svg || !tooltip) return;

        const points = svg.querySelectorAll('.system-point');

        const handleMouseEnter = (e: MouseEvent) => {
            const point = e.currentTarget as SVGCircleElement;
            const name = point.querySelector('title')?.textContent || "";
            tooltip.textContent = name;
            tooltip.classList.add('show');
        };

        const handleMouseMove = (e: MouseEvent) => {
            tooltip.style.left = (e.pageX + 20) + 'px';
            tooltip.style.top = (e.pageY + 20) + 'px';
        };

        const handleMouseLeave = () => {
            tooltip.classList.remove('show');
        };

        const handleClick = (e: MouseEvent) => {
            const point = e.currentTarget as SVGCircleElement;
            points.forEach(p => p.classList.remove('active-point'));
            point.classList.add('active-point');

            const id = point.id;
            const mapping: Record<string, string> = {
                'endocrine': 'endocrine',
                'thyroid': 'thyroid',
                'cardiopulmonary': 'systemic',
                'digestive': 'digestive',
                'renal': 'kidneys',
                'musculoskeletal': 'joints',
                'reproductive': 'reproductive'
            };

            if (mapping[id]) {
                setSelectedOrgan(mapping[id]);
            }
        };

        points.forEach(point => {
            point.addEventListener('mouseenter', handleMouseEnter as any);
            point.addEventListener('mousemove', handleMouseMove as any);
            point.addEventListener('mouseleave', handleMouseLeave as any);
            point.addEventListener('click', handleClick as any);
        });

        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.system-point') && !target.closest(`.${styles.simInfoContainer}`)) {
                points.forEach(p => p.classList.remove('active-point'));
                // setSelectedOrgan(null);
            }
        };

        document.addEventListener('click', handleOutsideClick, true);

        return () => {
            points.forEach(point => {
                point.removeEventListener('mouseenter', handleMouseEnter as any);
                point.removeEventListener('mousemove', handleMouseMove as any);
                point.removeEventListener('mouseleave', handleMouseLeave as any);
                point.removeEventListener('click', handleClick as any);
            });
            document.removeEventListener('click', handleOutsideClick, true);
        };
    }, [currentSimTab]);

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

    // Scroll Lock for Modal
    useEffect(() => {
        if (selectedTheme) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedTheme]);

    const scrollToThemes = () => {
        const element = document.getElementById("themesSection");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageShell}>
                {/* HERO SECTION WITH EXACT PARITY */}
                <section className={styles.hero}>
                    <div className={styles['hero-content']}>
                        <h1>Your Autoimmune Health Journey Starts Here</h1>
                        <p className={styles['hero-subtitle']}>
                            Empowering women with medically-accurate information about autoimmune diseases.
                            Understanding your body is the first step toward wellness.
                        </p>

                        <div className={styles['hero-stats']}>
                            <div className={styles['stat-item']}>
                                <span className={styles['stat-number']}>80%</span>
                                <span className={styles['stat-label']}>of patients are women</span>
                            </div>
                            <div className={styles['stat-item']}>
                                <span className={styles['stat-number']}>1 in 12</span>
                                <span className={styles['stat-label']}>women affected worldwide</span>
                            </div>
                            <div className={styles['stat-item']}>
                                <span className={styles['stat-number']}>10</span>
                                <span className={styles['stat-label']}>comprehensive themes</span>
                            </div>
                        </div>

                        <div className={styles['hero-cta-row']}>
                            <button className={styles['btn-primary']} onClick={scrollToThemes}>Explore Health Themes</button>
                            <button className={styles['btn-secondary']}>Watch Introduction</button>
                        </div>
                    </div>

                    {/* STUNNING 3D IMMUNE SYSTEM VISUALIZATION */}
                    <div className={styles['hero-visual-3d']}>
                        <div className={styles['immune-3d-container']}>
                            {/* Main Pulsating Core */}
                            <div className={styles['immune-core']}>
                                <div className={`${styles['core-ring']} ${styles['ring-1']}`}></div>
                                <div className={`${styles['core-ring']} ${styles['ring-2']}`}></div>
                                <div className={`${styles['core-ring']} ${styles['ring-3']}`}></div>
                                <div className={styles['core-center']}>
                                    <svg viewBox="0 0 100 100" className={styles['core-icon']}>
                                        <circle cx="50" cy="50" r="45" fill="url(#coreGradient)" />
                                        <defs>
                                            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#ec407a', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#9c27b0', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            {/* Orbiting Cells */}
                            <div className={`${styles['orbiting-cell']} ${styles['cell-1']}`}>
                                <div className={styles['cell-inner']}>🦠</div>
                            </div>
                            <div className={`${styles['orbiting-cell']} ${styles['cell-2']}`}>
                                <div className={styles['cell-inner']}>💉</div>
                            </div>
                            <div className={`${styles['orbiting-cell']} ${styles['cell-3']}`}>
                                <div className={styles['cell-inner']}>🧬</div>
                            </div>
                            <div className={`${styles['orbiting-cell']} ${styles['cell-4']}`}>
                                <div className={styles['cell-inner']}>⚡</div>
                            </div>

                            {/* Floating Particles */}
                            <div className={`${styles.particle} ${styles['particle-1']}`}></div>
                            <div className={`${styles.particle} ${styles['particle-2']}`}></div>
                            <div className={`${styles.particle} ${styles['particle-3']}`}></div>
                            <div className={`${styles.particle} ${styles['particle-4']}`}></div>
                            <div className={`${styles.particle} ${styles['particle-5']}`}></div>
                            <div className={`${styles.particle} ${styles['particle-6']}`}></div>
                        </div>

                        {/* 3D Animation Description */}
                        <div className={styles['animation-description']}>
                            <div className={styles['desc-badge']}>
                                <span className={styles['badge-icon']}>✨</span>
                                <span className={styles['badge-text']}>Interactive Immune System</span>
                            </div>
                            <h3 className={styles['desc-title']}>Your Body's Defense Network</h3>
                            <p className={styles['desc-text']}>
                                Watch how immune cells communicate and protect your body. The pulsating core represents
                                your immune system's constant vigilance, while orbiting elements symbolize antibodies,
                                T-cells, and B-cells working in harmony.
                            </p>
                            <div className={styles['desc-legend']}>
                                <div className={styles['legend-item']}>
                                    <span className={styles['legend-dot']} style={{ background: 'linear-gradient(135deg, #ec407a, #9c27b0)' }}></span>
                                    <span className={styles['legend-label']}>Immune Core</span>
                                </div>
                                <div className={styles['legend-item']}>
                                    <span className={styles['legend-dot']} style={{ background: '#4fc3f7' }}></span>
                                    <span className={styles['legend-label']}>Active Cells</span>
                                </div>
                                <div className={styles['legend-item']}>
                                    <span className={styles['legend-dot']} style={{ background: 'rgba(236,64,122,0.3)' }}></span>
                                    <span className={styles['legend-label']}>Energy Flow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THEMES EXPLORATION */}
                <section id="themesSection" className={styles.themesSection}>
                    <div className={styles.sectionHeaderEnhanced}>
                        <div className={styles.headerTitleBlock}>
                            <h2 className={styles.sectionTitleGradient}>Discover Your Health Journey</h2>
                            <p className={styles.heroSubtitle}>
                                10 Essential themes designed for comprehensive understanding.
                                <br />Click any theme to unlock insights.
                            </p>
                        </div>
                        <div className={styles.progressTracker}>
                            <div className={styles.trackerVisual}>
                                <svg width="140" height="140" className={styles.progressCircleSvg}>
                                    <circle cx="70" cy="70" r="60" className={styles.progressBgCircle} />
                                    <circle cx="70" cy="70" r="60" className={styles.progressFillCircle}
                                        style={{ strokeDashoffset: 377 - (377 * progressPercent) / 100 }} />
                                    <defs>
                                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ec407a" />
                                            <stop offset="100%" stopColor="#9c27b0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className={styles.progressCenter}>
                                    <span className={styles.progressNumber}>{progressPercent}%</span>
                                    <span className={styles.progressLabel}>Explored</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.themeGridEnhanced}>
                        {Object.values(themeData).map(theme => (
                            <motion.div
                                key={theme.id}
                                className={`${styles.themeCard3d} ${exploredThemes.has(theme.id) ? styles.explored : ''}`}
                                onClick={() => handleThemeClick(theme.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className={styles.cardIconContainer}>
                                    <div className={styles.iconBg} />
                                    <div className={styles.cardIcon}>{theme.icon}</div>
                                </div>
                                <h3 className={styles.cardTitle}>{theme.title}</h3>
                                <p className={styles.cardDescription}>{theme.subtitle}</p>
                                <div className={styles.cardFooter}>
                                    <span className={styles.cardBadge}>{theme.facts.length} Insights</span>
                                    <div className={styles.cardArrow}>→</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* SYSTEM SIMULATOR SECTION */}
                <section className={styles.bodySimulatorSection}>
                    <div className={styles.simulatorHeader}>
                        <h2 className={styles.sectionTitleGradient}>Body System Simulator</h2>
                        <p className={styles.heroSubtitle}>Visualize how autoimmune conditions impact specific body regions.</p>
                    </div>

                    <div className={styles.simulatorTabs}>
                        <div
                            className={`${styles.simTab} ${currentSimTab === 'normal' ? styles.active : ''}`}
                            onClick={() => setCurrentSimTab('normal')}
                        >
                            <span className={styles.tabIcon}>✓</span>
                            <span>Normal Immunity</span>
                        </div>
                        <div
                            className={`${styles.simTab} ${currentSimTab === 'breakdown' ? styles.active : ''}`}
                            onClick={() => setCurrentSimTab('breakdown')}
                        >
                            <span className={styles.tabIcon}>⚡</span>
                            <span>Immune Breakdown</span>
                        </div>
                        <div
                            className={`${styles.simTab} ${currentSimTab === 'attack' ? styles.active : ''}`}
                            onClick={() => setCurrentSimTab('attack')}
                        >
                            <span className={styles.tabIcon}>🎯</span>
                            <span>Self-Attack</span>
                        </div>
                    </div>

                    <div className={styles.simulatorContent}>
                        {(currentSimTab === 'normal' || currentSimTab === 'attack' || currentSimTab === 'breakdown') && (
                            <div className={styles.simGrid}>
                                <div className={`${styles.bodyOutlineWrapper} ${styles[currentSimTab]}`}>
                                    <div className="body-map-container">
                                        <svg viewBox="0 0 400 850" xmlns="http://www.w3.org/2000/svg" id="body-map" ref={bodyMapRef}>
                                            <path className="body-outline"
                                                d="M200,40 c-20,0 -35,18 -35,45 s15,48 35,48 s35,-21 35,-48 s-15,-45 -35,-45 M188,133 q12,10 24,0 l4,15 h-32 z M160,148 q40,-15 80,0 q25,45 20,105 q-15,60 -25,100 h-70 q-10,-40 -25,-100 q-5,-60 20,-105 z M165,353 h70 q25,20 25,65 q0,40 -15,75 h-90 q-15,-35 -15,-75 q0,-45 25,-65 z M160,155 q-35,30 -60,130 q-5,25 -20,105 q5,15 15,10 q10,-40 25,-125 q15,-80 40,-120 z M240,155 q35,30 60,130 q5,25 20,105 q-5,15 -15,10 q-10,-40 -25,-125 q-15,-80 -40,-120 z M155,493 q-10,120 0,320 q15,5 35,0 q5,-150 10,-320 z M245,493 q10,120 0,320 q-15,5 -35,0 q-5,-150 -10,-320 z" />

                                            <g id="endocrine" className="system-point" cursor="pointer" aria-label="Endocrine System">
                                                <text x="200" y="75" fontSize="22" textAnchor="middle" dominantBaseline="central">🧠</text>
                                                <title>Endocrine System</title>
                                            </g>

                                            <g id="thyroid" className="system-point" cursor="pointer" aria-label="Thyroid Gland">
                                                <text x="200" y="130" fontSize="22" textAnchor="middle" dominantBaseline="central">🦋</text>
                                                <title>Thyroid Gland</title>
                                            </g>

                                            <g id="cardiopulmonary" className="system-point" cursor="pointer" aria-label="Cardiopulmonary System">
                                                <text x="200" y="210" fontSize="22" textAnchor="middle" dominantBaseline="central">❤️</text>
                                                <title>Cardiopulmonary System</title>
                                            </g>

                                            <g id="renal" className="system-point" cursor="pointer" aria-label="Renal System">
                                                <text x="225" y="330" fontSize="22" textAnchor="middle" dominantBaseline="central">🫘</text>
                                                <title>Renal System</title>
                                            </g>

                                            <g id="digestive" className="system-point" cursor="pointer" aria-label="Digestive System">
                                                <text x="200" y="290" fontSize="22" textAnchor="middle" dominantBaseline="central">🍽️</text>
                                                <title>Digestive System</title>
                                            </g>

                                            <g id="reproductive" className="system-point" cursor="pointer" aria-label="Reproductive System">
                                                <text x="200" y="410" fontSize="22" textAnchor="middle" dominantBaseline="central">🌸</text>
                                                <title>Reproductive System</title>
                                            </g>

                                            <g id="musculoskeletal" className="system-point" cursor="pointer" aria-label="Musculoskeletal System">
                                                <text x="165" y="630" fontSize="22" textAnchor="middle" dominantBaseline="central">🦴</text>
                                                <title>Musculoskeletal System</title>
                                            </g>
                                        </svg>
                                    </div>
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
                                                key={`${selectedOrgan}-${currentSimTab}`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className={styles.organInfoCard}
                                            >
                                                <div className={styles.organInfoHeader}>
                                                    <span className={styles.organIconLarge}>{organData[selectedOrgan][currentSimTab].icon}</span>
                                                    <div>
                                                        <h4>{organData[selectedOrgan][currentSimTab].title}</h4>
                                                        <span className={styles.organSubtitle}>{organData[selectedOrgan][currentSimTab].subtitle}</span>
                                                    </div>
                                                </div>
                                                <p className={styles.organDesc}>{organData[selectedOrgan][currentSimTab].desc}</p>
                                                <div className={styles.organFacts}>
                                                    {organData[selectedOrgan][currentSimTab].facts.map((fact: string, i: number) => (
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
                                                    <h4>
                                                        {currentSimTab === 'normal' ? '🛡️ Defense System' :
                                                            currentSimTab === 'breakdown' ? '⚡ Early Warnings' : '🎯 Targeted Attack'}
                                                    </h4>
                                                    <p>
                                                        {currentSimTab === 'normal'
                                                            ? 'Your immune system patrols your body 24/7, destroying foreign invaders like bacteria and viruses.'
                                                            : currentSimTab === 'breakdown'
                                                                ? 'Environmental triggers and genetic factors combined can lead to the first signs of immune confusion.'
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
                    </div>
                </section>

                {/* THEME DETAIL PANEL (CONTROLS MODAL) */}
                <AnimatePresence>
                    {selectedTheme && (
                        <div className={styles.modalOverlay}>
                            <motion.div
                                className={styles.backdrop}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedTheme(null)}
                            />
                            <motion.div
                                className={styles.modalContent}
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            >
                                <button className={styles.closeModal} onClick={() => setSelectedTheme(null)}>✕</button>
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
                        </div>
                    )}
                </AnimatePresence>
                <div id="body-map-tooltip" className="body-map-tooltip" ref={tooltipRef}></div>
            </div>
        </div>

    );
};

export default AutoimmuneHealthJourney;
