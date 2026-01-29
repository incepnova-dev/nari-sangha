import React, { useState, useEffect, useRef } from 'react';
import styles from './PerinatalJourney.module.css';

interface SystemPhaseData {
    description: string;
    symptoms: string[];
}

interface SystemData {
    name: string;
    subtitle: string;
    icon: string;
    color: string;
    prenatal: SystemPhaseData;
    postnatal: SystemPhaseData;
}

const bodySystemsData: Record<string, SystemData> = {
    brain: {
        name: "Brain Structure & Chemistry",
        subtitle: "Neurological & Hormonal Impact",
        icon: "fa-brain",
        color: "#5c6bc0",
        prenatal: {
            description: "Pregnancy triggers profound neurological changes. Hormones cause 'synaptic pruning' in the prefrontal cortex and hippocampus—areas controlling memory and executive function—resulting in the well-documented 'pregnancy brain' or cognitive fog. However, this restructuring isn't deterioration; it's adaptive remodeling that enhances maternal circuitry in regions like the medial prefrontal cortex, which governs empathy and threat detection.",
            symptoms: ["Brain Fog", "Memory Loss", "Fatigue", "Anxiety", "Emotional Lability", "Executive Dysfunction", "Nesting Instinct"]
        },
        postnatal: {
            description: "The postpartum period represents one of the most dramatic neuroendocrine transitions in human physiology. Estrogen and progesterone plummet to near-zero within 24 hours of birth—a hormonal crash more severe than any natural process except menopause. This sudden withdrawal strips away the neuroprotective effects these hormones provided during pregnancy.",
            symptoms: ["Hyper-vigilance", "Severe Insomnia", "Intrusive Thoughts", "Weepiness", "Emotional Numbness", "Anhedonia", "Rage Episodes", "Suicidal Ideation", "Bonding Difficulty", "Memory Impairment"]
        }
    },
    heart: {
        name: "Cardiovascular System",
        subtitle: "Circulatory System Under Load",
        icon: "fa-heart-pulse",
        color: "#ef5350",
        prenatal: {
            description: "Pregnancy demands extraordinary cardiovascular adaptation. Blood volume increases by 40-50% to perfuse the placenta and meet fetal oxygen demands. Cardiac output rises by 30-50%, meaning the heart pumps significantly more blood per minute. These changes create physical sensations identical to anxiety: racing heart, chest tightness, breathlessness, and dizziness.",
            symptoms: ["Palpitations", "Tachycardia", "Dizziness", "Shortness of Breath", "Chest Tightness", "Orthostatic Hypotension", "Panic-like Symptoms"]
        },
        postnatal: {
            description: "The cardiovascular system undergoes rapid, dramatic reversal postpartum. The body must shed the extra 1.5 liters of blood volume, primarily through massive fluid shifts manifesting as night sweats. This diuresis begins within hours of birth and peaks around day 3-5. The physical sensations of these shifts are virtually indistinguishable from panic attacks.",
            symptoms: ["Profuse Night Sweats", "Panic Sensations", "Edema Shifts", "Blood Pressure Instability", "Palpitations", "Breathlessness", "Chest Pain", "Shakiness"]
        }
    },
    stomach: {
        name: "Gut-Brain Axis",
        subtitle: "Digestive & Metabolic Disruption",
        icon: "fa-utensils",
        color: "#ffa726",
        prenatal: {
            description: "The gut-brain connection becomes profoundly disrupted during pregnancy. Rising hCG triggers nausea and vomiting. Progesterone relaxes smooth muscle, slowing gut motility to maximize nutrient absorption, but causing constipation and bloating. The gut produces 90% of the body's serotonin, but this production becomes dysregulated.",
            symptoms: ["Nausea", "Vomiting", "Heartburn/GERD", "Constipation", "Bloating", "Food Aversions", "Metallic Taste", "Gut Dysbiosis"]
        },
        postnatal: {
            description: "Postpartum digestive and metabolic changes significantly impact mental health. Stress hormones can completely shut down appetite—a phenomenon called stress-induced anorexia. The gut microbiome undergoes further disruption postpartum, especially with antibiotics or stress response, directly impacting mood and anxiety.",
            symptoms: ["Appetite Loss", "Stress-Induced Anorexia", "Comfort Eating", "Gut Inflammation", "Microbiome Disruption", "Blood Sugar Swings", "Severe Constipation", "Dehydration", "Nutritional Deficiency"]
        }
    },
    uterus: {
        name: "Reproductive System",
        subtitle: "Uterine & Pelvic Floor Transformation",
        icon: "fa-baby",
        color: "#ec407a",
        prenatal: {
            description: "The uterus expands approximately 500 times its original size. This expansion stretches abdominal muscles, ligaments, and skin. The growing uterus presses on the bladder, causing frequent urination and nocturia, disrupting sleep 3-5+ times per night. Pelvic pressure increases throughout pregnancy as the baby descends.",
            symptoms: ["Pelvic Pain", "Round Ligament Pain", "Frequent Urination", "Nocturia", "Mobility Loss", "Diastasis Recti", "Pubic Symphysis Dysfunction", "Body Image Distress"]
        },
        postnatal: {
            description: "The postpartum uterus undergoes involution—shrinking back to pear-size over 6-8 weeks through powerful contractions called 'afterpains.' For vaginal births, perineal trauma is nearly universal. C-section mothers contend with major abdominal surgery recovery. Both birth types can result in urinary incontinence.",
            symptoms: ["Afterpains", "Cramping", "Lochia (Heavy Bleeding)", "Perineal Tears", "C-section Pain", "Urinary Incontinence", "Pelvic Floor Dysfunction", "Feeling 'Broken'", "Painful Intercourse"]
        }
    },
    hormones: {
        name: "Endocrine System",
        subtitle: "Hormonal Orchestration & Collapse",
        icon: "fa-vial",
        color: "#ab47bc",
        prenatal: {
            description: "Pregnancy is an endocrine symphony. Estrogen increases 100-fold, progesterone 10-15 fold. HPA axis becomes less reactive. Thyroid requirements increase 30-50%. These hormones coordinate fetal development but profoundly affect maternal brain chemistry and mood stability.",
            symptoms: ["Estrogen Surge", "Progesterone Elevation", "Cortisol Dysregulation", "Thyroid Dysfunction", "Insulin Resistance", "Hormone Sensitivity", "Mood Swings"]
        },
        postnatal: {
            description: "The postpartum hormonal crash is unparalleled. Within 24 hours of placenta delivery, estrogen and progesterone plummet to near-menopausal levels—a hormonal freefall 100 times faster than menopause. Prolactin surges to support lactation. The HPA axis rebounds, potentially spiking cortisol to levels seen in PTSD.",
            symptoms: ["Estrogen Crash", "Progesterone Withdrawal", "Prolactin Surge", "Cortisol Spikes", "Oxytocin Dysregulation", "Thyroid Dysfunction", "Postpartum Thyroiditis", "Hormone Withdrawal"]
        }
    },
    immune: {
        name: "Immune System",
        subtitle: "Inflammatory Response & Infection Risk",
        icon: "fa-shield-virus",
        color: "#26a69a",
        prenatal: {
            description: "Pregnancy requires a delicate immune balance to tolerate the fetus. This anti-inflammatory shift has psychological consequences. Inflammatory cytokines can cross the blood-brain barrier and reduce serotonin, increasing vulnerability to depression and anxiety.",
            symptoms: ["Immune Suppression", "Inflammatory Cytokines", "Infection Susceptibility", "Autoimmune Flares", "Chronic Inflammation", "Cytokine-Induced Depression"]
        },
        postnatal: {
            description: "Postpartum immune system undergoes rapid rebound activation, sometimes triggering autoimmune phenomena. Birth itself triggers an acute inflammatory response. Infections are common (mastitis, endometritis), each triggering cascades that worsen mood symptoms. Sleep deprivation itself is pro-inflammatory.",
            symptoms: ["Immune Rebound", "Autoimmune Activation", "Mastitis", "Endometritis", "Wound Infections", "Inflammatory Cytokines", "Infection-Triggered Depression", "Chronic Inflammation"]
        }
    },
    sleep: {
        name: "Sleep Architecture",
        subtitle: "Circadian Rhythm & Rest Disruption",
        icon: "fa-bed",
        color: "#42a5f5",
        prenatal: {
            description: "Sleep quality decreases steadily. First trimester fatigue is intense, yet early insomnia is common. By the third trimester, physical discomfort, fetal movement, and frequent urination make restful sleep nearly impossible. Poor sleep during pregnancy is a strong predictor of postpartum depression.",
            symptoms: ["Insomnia Despite Fatigue", "Frequent Nighttime Urination", "Physical Discomfort", "Fetal Movement Disruption", "Leg Cramps", "Sleep Apnea", "REM Sleep Reduction", "Anxiety-Related Insomnia"]
        },
        postnatal: {
            description: "Postpartum sleep deprivation is catastrophic for mental health. Chronic sleep fragmentation prevents progression through deep, restorative cycles. This impairs emotional regulation, increases threat reactivity in the amygdala, and causes microsleeps and memory impairment.",
            symptoms: ["Severe Sleep Deprivation", "Sleep Fragmentation", "REM Deprivation", "Circadian Dysregulation", "Chronic Sleep Debt", "Conditioned Hyperarousal", "Memory Impairment", "Emotional Dysregulation", "Microsleeps"]
        }
    },
    musculoskeletal: {
        name: "Musculoskeletal System",
        subtitle: "Structural Changes & Pain",
        icon: "fa-bone",
        color: "#8d6e63",
        prenatal: {
            description: "Relaxin softens ligaments, causing joint instability and pain. The center of gravity shifts forward, creating lumbar lordosis and lower back pain (50-70% of women). Pelvic girdle pain and symphysis pubis dysfunction cause sharp pain and mobility limits, directly affecting mood.",
            symptoms: ["Lower Back Pain", "Pelvic Girdle Pain", "Sciatica", "Joint Instability", "Carpal Tunnel Syndrome", "Round Ligament Pain", "Reduced Mobility", "Chronic Pain"]
        },
        postnatal: {
            description: "Postpartum challenges include recovering from birth injuries (tailbone fractures, tearing) while adapting to new physical demands. Repetitive lifting and feeding in awkward positions strain the already-weakened core. Diastasis recti persists in 60% of women at 6 weeks.",
            symptoms: ["Diastasis Recti", "Chronic Back Pain", "Pelvic Instability", "Coccyx Injury", "Repetitive Strain", "Neck/Shoulder Pain", "Core Weakness", "Chronic Pelvic Pain", "Pain-Depression Cycle"]
        }
    },
    skin: {
        name: "Integumentary System",
        subtitle: "Skin & Hair Changes",
        icon: "fa-hand-sparkles",
        color: "#ffb74d",
        prenatal: {
            description: "Hormones affect skin pigmentation (melasma, linea nigra) and hair thickness. Stretch marks develop in 50-90% of pregnancies. While often dismissed as 'cosmetic,' these changes significantly impact body image and self-esteem during a vulnerable transition.",
            symptoms: ["Melasma", "Stretch Marks", "Acne", "Hyperpigmentation", "Skin Sensitivity", "PUPPP Rash", "Varicose Veins", "Body Image Distress"]
        },
        postnatal: {
            description: "Postpartum skin changes can be psychologically devastating. 'Telogen effluvium' causes alarming hair loss around 3-4 months. Stretch marks fade but remain. The abdominal skin often feels 'deflated.' Cumulative changes can lead to body dysmorphia and an identity crisis.",
            symptoms: ["Postpartum Hair Loss", "Loose Abdominal Skin", "Permanent Stretch Marks", "C-section Scarring", "Melasma Persistence", "Breast Changes", "Nipple Trauma", "Body Dysmorphia", "Identity Crisis"]
        }
    }
};

const PerinatalJourney: React.FC = () => {
    const [phase, setPhase] = useState<'prenatal' | 'postnatal'>('prenatal');
    const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Flow Canvas Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles: any[] = [];
        const particleCount = 80;

        class FlowParticle {
            x: number = 0;
            y: number = 0;
            size: number = 0;
            speedX: number = 0;
            speedY: number = 0;
            opacity: number = 0;

            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas!.width || this.y < 0 || this.y > canvas!.height) {
                    this.reset();
                }
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fillStyle = `rgba(236, 64, 122, ${this.opacity})`;
                ctx!.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new FlowParticle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Connect particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(236, 64, 122, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const renderSystemDetails = () => {
        if (!selectedSystem) {
            return (
                <div className={styles.welcomeState}>
                    <div className={styles.welcomeIcon}><i className="fas fa-hand-pointer"></i></div>
                    <h3>Select a Body System</h3>
                    <p>Click on any highlighted area on the body map to learn how that system changes during pregnancy and postpartum.</p>
                </div>
            );
        }

        const system = bodySystemsData[selectedSystem];
        const phaseData = phase === 'prenatal' ? system.prenatal : system.postnatal;

        return (
            <div className={styles.systemDetailCard}>
                <div className={styles.systemHeader}>
                    <div className={styles.systemIconLarge} style={{ background: system.color }}>
                        <i className={`fas ${system.icon}`}></i>
                    </div>
                    <div className={styles.systemTitleGroup}>
                        <h3>{system.name}</h3>
                        <p>{system.subtitle}</p>
                    </div>
                </div>

                <div className={styles.phaseTabs}>
                    <button className={`${styles.phaseTab} ${phase === 'prenatal' ? styles.active : ''}`} onClick={() => setPhase('prenatal')}>
                        <i className="fas fa-baby"></i> Prenatal
                    </button>
                    <button className={`${styles.phaseTab} ${phase === 'postnatal' ? styles.active : ''}`} onClick={() => setPhase('postnatal')}>
                        <i className="fas fa-child-reaching"></i> Postnatal
                    </button>
                </div>

                <div className={styles.phaseContent}>
                    <p className={styles.phaseDescriptionText}>{phaseData.description}</p>
                    <h4 className={styles.symptomsHeader}>
                        <i className="fas fa-notes-medical" style={{ color: system.color }}></i> Common Symptoms
                    </h4>
                    <div className={styles.symptomTags}>
                        {phaseData.symptoms.map((s, i) => (
                            <span key={i} className={styles.symptomTag}>
                                <i className="fas fa-check-circle"></i> {s}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.perinatalPage}>
            {/* HERO */}
            <section className={styles.heroImmersive}>
                <div className={styles.heroBackground}>
                    <canvas ref={canvasRef} id="flowCanvas"></canvas>
                    <div className={`${styles.orb} ${styles.orb1}`}></div>
                    <div className={`${styles.orb} ${styles.orb2}`}></div>
                    <div className={`${styles.orb} ${styles.orb3}`}></div>
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <span className={styles.badgePulse}></span>
                        <span>Evidence-Based Education</span>
                    </div>
                    <h1 className={styles.heroTitle}>
                        Understanding the <span className={styles.titleGradient}>Perinatal Journey</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Your guide to navigating the deep physiological and neurological changes from pregnancy to postpartum.
                    </p>

                    <div className={styles.heroStats}>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}><i className="fas fa-users"></i></div>
                            <div className={styles.statContent}>
                                <span className={styles.statNumber}>1 in 5</span>
                                <span className={styles.statLabel}>Experience Depression</span>
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}><i className="fas fa-brain"></i></div>
                            <div className={styles.statContent}>
                                <span className={styles.statNumber}>9 Systems</span>
                                <span className={styles.statLabel}>Affected in Your Body</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.heroCta}>
                        <button className={styles.btnPrimary} onClick={() => scrollToSection('body-map')}>
                            Explore Your Body <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* PHASE SWITCHER STICKY */}
            <div className={styles.phaseSwitcherSticky}>
                <div className={styles.phaseSwitcherContainer}>
                    <span className={styles.phaseLabel}>View Phase:</span>
                    <div className={styles.phaseToggleGroup}>
                        <button className={`${styles.phaseToggle} ${phase === 'prenatal' ? styles.active : ''}`} onClick={() => setPhase('prenatal')}>
                            <i className="fas fa-baby"></i> Prenatal
                        </button>
                        <button className={`${styles.phaseToggle} ${phase === 'postnatal' ? styles.active : ''}`} onClick={() => setPhase('postnatal')}>
                            <i className="fas fa-child-reaching"></i> Postnatal
                        </button>
                    </div>
                    <span className={styles.phaseDescription}>
                        {phase === 'prenatal' ? 'During pregnancy: hormones surge, body adapts' : 'After birth: hormonal crash, recovery begins'}
                    </span>
                </div>
            </div>

            {/* BODY MAP */}
            <section id="body-map" className={styles.bodyMapSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Interactive Body Systems Map</h2>
                    <p className={styles.sectionSubtitle}>Click on any system to understand how it changes during pregnancy and postpartum.</p>
                </div>

                <div className={styles.bodyMapContainer}>
                    <div className={styles.bodyIllustrationPanel}>
                        <div className={styles.bodySilhouette}>
                            <svg viewBox="0 0 300 600" className={styles.bodySvg}>
                                {/* Map parts from component data */}
                                <g className={`${styles.bodyPart} ${selectedSystem === 'brain' ? styles.active : ''}`} onClick={() => setSelectedSystem('brain')} transform="translate(150, 50)">
                                    <circle cx="0" cy="0" r="35" className={`${styles.partShape} ${styles.brainShape}`} />
                                    <circle cx="0" cy="0" r="28" className={styles.partPulse} />
                                    <foreignObject x="-12" y="-12" width="24" height="24">
                                        <div className={styles.partIcon}><i className="fas fa-brain"></i></div>
                                    </foreignObject>
                                </g>
                                <g className={`${styles.bodyPart} ${selectedSystem === 'heart' ? styles.active : ''}`} onClick={() => setSelectedSystem('heart')} transform="translate(150, 130)">
                                    <circle cx="0" cy="0" r="30" className={`${styles.partShape} ${styles.heartShape}`} />
                                    <circle cx="0" cy="0" r="23" className={styles.partPulse} />
                                    <foreignObject x="-12" y="-12" width="24" height="24">
                                        <div className={styles.partIcon}><i className="fas fa-heart-pulse"></i></div>
                                    </foreignObject>
                                </g>
                                <g className={`${styles.bodyPart} ${selectedSystem === 'stomach' ? styles.active : ''}`} onClick={() => setSelectedSystem('stomach')} transform="translate(150, 220)">
                                    <ellipse cx="0" cy="0" rx="35" ry="40" className={`${styles.partShape} ${styles.stomachShape}`} />
                                    <ellipse cx="0" cy="0" rx="28" ry="33" className={styles.partPulse} />
                                    <foreignObject x="-12" y="-12" width="24" height="24">
                                        <div className={styles.partIcon}><i className="fas fa-utensils"></i></div>
                                    </foreignObject>
                                </g>
                                <g className={`${styles.bodyPart} ${selectedSystem === 'uterus' ? styles.active : ''}`} onClick={() => setSelectedSystem('uterus')} transform="translate(150, 320)">
                                    <ellipse cx="0" cy="0" rx="40" ry="45" className={`${styles.partShape} ${styles.uterusShape}`} />
                                    <ellipse cx="0" cy="0" rx="33" ry="38" className={styles.partPulse} />
                                    <foreignObject x="-12" y="-12" width="24" height="24">
                                        <div className={styles.partIcon}><i className="fas fa-baby"></i></div>
                                    </foreignObject>
                                </g>
                                <g className={`${styles.bodyPart} ${selectedSystem === 'hormones' ? styles.active : ''}`} onClick={() => setSelectedSystem('hormones')} transform="translate(70, 180)">
                                    <circle cx="0" cy="0" r="25" className={`${styles.partShape} ${styles.hormonesShape}`} />
                                    <circle cx="0" cy="0" r="18" className={styles.partPulse} />
                                    <foreignObject x="-12" y="-12" width="24" height="24">
                                        <div className={styles.partIcon}><i className="fas fa-vial"></i></div>
                                    </foreignObject>
                                </g>
                                <g className={`${styles.bodyPart} ${selectedSystem === 'immune' ? styles.active : ''}`} onClick={() => setSelectedSystem('immune')} transform="translate(230, 180)">
                                    <circle cx="0" cy="0" r="25" className={`${styles.partShape} ${styles.immuneShape}`} />
                                    <circle cx="0" cy="0" r="18" className={styles.partPulse} />
                                    <foreignObject x="-12" y="-12" width="24" height="24">
                                        <div className={styles.partIcon}><i className="fas fa-shield-virus"></i></div>
                                    </foreignObject>
                                </g>
                                <g className={`${styles.bodyPart} ${selectedSystem === 'sleep' ? styles.active : ''}`} onClick={() => setSelectedSystem('sleep')} transform="translate(200, 30)">
                                    <ellipse cx="0" cy="0" rx="28" ry="20" className={`${styles.partShape} ${styles.sleepShape}`} />
                                    <ellipse cx="0" cy="0" rx="21" ry="13" className={styles.partPulse} />
                                    <foreignObject x="-12" y="-12" width="24" height="24">
                                        <div className={styles.partIcon}><i className="fas fa-bed"></i></div>
                                    </foreignObject>
                                </g>
                                <g className={`${styles.bodyPart} ${selectedSystem === 'musculoskeletal' ? styles.active : ''}`} onClick={() => setSelectedSystem('musculoskeletal')} transform="translate(150, 450)">
                                    <rect x="-30" y="-35" width="60" height="70" rx="8" className={`${styles.partShape} ${styles.musculoShape}`} />
                                    <rect x="-23" y="-28" width="46" height="56" rx="5" className={styles.partPulse} />
                                    <foreignObject x="-12" y="-12" width="24" height="24">
                                        <div className={styles.partIcon}><i className="fas fa-bone"></i></div>
                                    </foreignObject>
                                </g>
                                <g className={`${styles.bodyPart} ${selectedSystem === 'skin' ? styles.active : ''}`} onClick={() => setSelectedSystem('skin')} transform="translate(100, 280)">
                                    <circle cx="0" cy="0" r="22" className={`${styles.partShape} ${styles.skinShape}`} />
                                    <circle cx="0" cy="0" r="15" className={styles.partPulse} />
                                    <foreignObject x="-12" y="-12" width="24" height="24">
                                        <div className={styles.partIcon}><i className="fas fa-hand-sparkles"></i></div>
                                    </foreignObject>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.systemDetailsPanel}>
                        {renderSystemDetails()}
                    </div>
                </div>
            </section>

            {/* TIMELINE */}
            <section id="timeline" className={styles.timelineSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>The Transformation Timeline</h2>
                    <p className={styles.sectionSubtitle}>From pregnancy peak to postpartum crash.</p>
                </div>
                <div className={styles.timelineContainer}>
                    <div className={styles.timelinePhase}>
                        <div className={styles.phaseHeader}><h3><i className="fas fa-baby"></i> Pregnancy</h3></div>
                        <div className={styles.timelineEvent}>
                            <div className={styles.eventCard}>
                                <h4>Trimester 1-3</h4>
                                <ul className={styles.eventChanges}>
                                    <li>Hormones escalate slowly</li>
                                    <li>Body adapts to carrying 500x growth</li>
                                    <li>Sleep architecture degrades</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.birthMarker}><div className={styles.birthIcon}><i className="fas fa-star"></i></div><h4>BIRTH</h4></div>
                    <div className={styles.timelinePhase}>
                        <div className={styles.phaseHeader}><h3><i className="fas fa-child-reaching"></i> Postpartum</h3></div>
                        <div className={styles.timelineEvent}>
                            <div className={`${styles.eventCard} ${styles.critical}`}>
                                <h4>The Crash (First 2 weeks)</h4>
                                <ul className={styles.eventChanges}>
                                    <li>Hormones plummet 100x vs menopause</li>
                                    <li>Massive fluid shifts & sweats</li>
                                    <li>Severe sleep deprivation begins</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESOURCES */}
            <section id="resources" className={styles.resourcesSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Support & Recovery</h2>
                </div>
                <div className={styles.resourcesGrid}>
                    <div className={`${styles.resourceCard} ${styles.emergency}`}>
                        <i className="fas fa-phone-volume"></i>
                        <h3>Crisis Support</h3>
                        <p>Call 988 (US) or your local emergency line if in immediate distress.</p>
                    </div>
                    <div className={styles.resourceCard}>
                        <i className="fas fa-hand-holding-heart"></i>
                        <h3>Treatment Options</h3>
                        <p>From therapy to medication, understand the evidence-based paths to healing.</p>
                    </div>
                </div>
            </section>

            {/* RECOVERY IS POSSIBLE */}
            <section className={styles.recoverySection}>
                <div className={styles.recoveryCard}>
                    <div className={styles.recoveryIcon}><i className="fas fa-sun"></i></div>
                    <h2>Recovery is Possible</h2>
                    <p>
                        The challenges of the perinatal period are real and physically rooted, but they are treatable.
                        With the right support, resources, and time, you will feel like yourself again.
                        You are resilient, and you are not alone.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PerinatalJourney;
