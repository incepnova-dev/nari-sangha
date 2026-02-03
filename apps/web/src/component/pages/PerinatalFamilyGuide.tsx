import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PerinatalFamilyGuide.module.css';

interface SymptomData {
    icon: string;
    title: string;
    symptoms: string[];
}

const SYMPTOM_DATA: Record<string, SymptomData> = {
    emotional: {
        icon: '<i class="fas fa-sad-tear" style="color:#2196f3"></i>',
        title: 'Emotional Changes',
        symptoms: ['Persistent sadness/crying', 'Loss of joy (Anhedonia)', 'Overwhelming guilt', 'Feeling "numb" or empty']
    },
    behavioral: {
        icon: '<i class="fas fa-user-slash" style="color:#ff9800"></i>',
        title: 'Behavioral Changes',
        symptoms: ['Withdrawing from partner/family', 'Neglecting self-care (showers, eating)', 'Reduced interaction with baby']
    },
    cognitive: {
        icon: '<i class="fas fa-brain" style="color:#9c27b0"></i>',
        title: 'Cognitive Changes',
        symptoms: ['Brain fog / confusion', 'Scary intrusive thoughts', 'Decision paralysis', 'Memory lapses']
    },
    physical: {
        icon: '<i class="fas fa-heart-broken" style="color:#f44336"></i>',
        title: 'Physical Symptoms',
        symptoms: ['Extreme fatigue beyond newborn stage', 'Physical aches/headaches', 'Restlessness / Agitation', 'Racing heart']
    },
    social: {
        icon: '<i class="fas fa-users-slash" style="color:#4caf50"></i>',
        title: 'Social Withdrawal',
        symptoms: ['Canceling plans', 'Not returning calls', 'Refusing visitors', 'Isolation in bedroom']
    },
    sleep: {
        icon: '<i class="fas fa-bed" style="color:#d81b60"></i>',
        title: 'Sleep Disturbances',
        symptoms: ['Cannot sleep when baby sleeps (Insomnia)', 'Waking up at 3AM unable to return to sleep', 'Nightmares']
    }
};

const CHECKLIST_ITEMS = [
    "Save crisis hotline numbers in phone: PSI (1-800-944-4773), 988 Suicide Lifeline",
    "Research 3 perinatal mental health specialists in your area",
    "Review insurance coverage for mental health services",
    "Identify 2-3 trusted people who can provide backup support",
    "Set up meal delivery service or coordinate meal train",
    "Schedule weekly check-in conversations about her mental health",
    "Download Edinburgh Postnatal Depression Scale (EPDS) screening tool",
    "Join a partner support group or find your own therapist",
    "Create emergency contacts card for babysitters/caregivers",
    "Read this entire guide thoroughly and bookmark for future reference"
];

const PerinatalFamilyGuide: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
    const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());
    const [revealedMyths, setRevealedMyths] = useState<Set<number>>(new Set());
    const [showCelebration, setShowCelebration] = useState(false);

    const heroRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Hero Particle effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * (canvas?.width || 0);
                this.y = Math.random() * (canvas?.height || 0);
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > (canvas?.width || 0)) this.speedX *= -1;
                if (this.y < 0 || this.y > (canvas?.height || 0)) this.speedY *= -1;
            }
            draw() {
                if (!ctx) return;
                ctx.fillStyle = 'rgba(236, 64, 122, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particleCount = 80;
        const particles = Array.from({ length: particleCount }, () => new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // 3D Tilt effect
    useEffect(() => {
        const container = heroRef.current;
        const card = cardRef.current;
        if (!container || !card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Scroll Animations (Intersection Observer)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        (entry.target as HTMLElement).style.opacity = '1';
                        (entry.target as HTMLElement).style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // Loading Screen
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const toggleAccordion = (index: number) => {
        setOpenAccordions(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    const toggleMyth = (index: number) => {
        setRevealedMyths(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    const toggleChecklistItem = (index: number) => {
        setCompletedItems(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }

            // Update progress logic
            if (next.size === CHECKLIST_ITEMS.length) {
                setTimeout(() => setShowCelebration(true), 500);
            }

            return next;
        });
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const progressPercentage = Math.round((completedItems.size / CHECKLIST_ITEMS.length) * 100);

    return (
        <div className={styles.perinatalFamilyPage}>
            {/* Loading Overlay */}
            <div className={`${styles.loadingOverlay} ${!loading ? styles.hidden : ''}`}>
                <div className={styles.loadingSpinner}></div>
            </div>

            {/* Hero Section */}
            <section className={styles.hero3dContainer} ref={heroRef} id="heroSection">
                <canvas className={styles.particleField} ref={canvasRef}></canvas>
                <div className={styles.hero3dCard} ref={cardRef}>
                    <div className={styles.heroBadge}>
                        <i className="fas fa-heart-pulse"></i> Partner & Family Guide
                    </div>
                    <h1 className={styles.heroTitle}>
                        Support Her Through <br />
                        <span className={styles.titleEmphasis}>Perinatal Depression</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        You are not just an observer. You are the most critical part of her recovery team.
                        Learn to recognize the signs, respond with empathy, and act when it matters most.
                    </p>
                    <div className={styles.heroCtaGroup}>
                        <button className={`${styles.heroBtn} ${styles.heroBtnPrimary}`} onClick={() => scrollToSection('symptomWheel')}>
                            <i className="fas fa-play"></i> Start Journey
                        </button>
                        <button className={`${styles.heroBtn} ${styles.heroBtnPrimary}`} onClick={() => scrollToSection('emergencySection')}>
                            <i className="fas fa-exclamation-triangle"></i> Emergency Help
                        </button>
                        <button className={`${styles.heroBtn} ${styles.heroBtnPrimary}`} onClick={() => navigate('/journeys')}>
                            <i className="fas fa-arrow-left"></i> Back to Paths
                        </button>
                    </div>
                </div>
                <div className={styles.scrollIndicator} onClick={() => scrollToSection('symptomWheel')}>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </section>

            {/* Symptom Wheel Section */}
            <section className={styles.symptomWheelSection} id="symptomWheel">
                <div className={styles.sectionHeaderCenter}>
                    <h2 className={styles.sectionTitleLight}>Warning Signs to Recognize</h2>
                    <p className={styles.sectionSubtitleLight}>
                        Click each orbit to explore symptoms in detail. Early recognition can be life-saving.
                    </p>
                </div>

                <div className={styles.symptomWheelContainer}>
                    <div className={styles.wheelCenter}>
                        <div className={styles.wheelCenterIcon}>
                            <i className="fas fa-eye"></i>
                        </div>
                        <div className={styles.wheelCenterText}>Watch For<br />These Signs</div>
                    </div>

                    <div className={`${styles.symptomSegment} ${styles.emotional}`} onClick={() => setActiveModal('emotional')} style={{ top: '10%', left: '50%', transform: 'translateX(-50%)' }}>
                        <div className={styles.symptomIcon}>😢</div>
                        <div className={styles.symptomTitle}>Emotional</div>
                        <div className={styles.symptomCount}>5 Signs</div>
                    </div>

                    <div className={`${styles.symptomSegment} ${styles.behavioral}`} onClick={() => setActiveModal('behavioral')} style={{ top: '30%', right: '5%' }}>
                        <div className={styles.symptomIcon}>👤</div>
                        <div className={styles.symptomTitle}>Behavioral</div>
                        <div className={styles.symptomCount}>5 Signs</div>
                    </div>

                    <div className={`${styles.symptomSegment} ${styles.cognitive}`} onClick={() => setActiveModal('cognitive')} style={{ bottom: '20%', right: '15%' }}>
                        <div className={styles.symptomIcon}>🧠</div>
                        <div className={styles.symptomTitle}>Cognitive</div>
                        <div className={styles.symptomCount}>5 Signs</div>
                    </div>

                    <div className={`${styles.symptomSegment} ${styles.physical}`} onClick={() => setActiveModal('physical')} style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}>
                        <div className={styles.symptomIcon}>💓</div>
                        <div className={styles.symptomTitle}>Physical</div>
                        <div className={styles.symptomCount}>5 Signs</div>
                    </div>

                    <div className={`${styles.symptomSegment} ${styles.social}`} onClick={() => setActiveModal('social')} style={{ bottom: '20%', left: '15%' }}>
                        <div className={styles.symptomIcon}>👥</div>
                        <div className={styles.symptomTitle}>Social</div>
                        <div className={styles.symptomCount}>4 Signs</div>
                    </div>

                    <div className={`${styles.symptomSegment} ${styles.sleep}`} onClick={() => setActiveModal('sleep')} style={{ top: '30%', left: '5%' }}>
                        <div className={styles.symptomIcon}>😴</div>
                        <div className={styles.symptomTitle}>Sleep</div>
                        <div className={styles.symptomCount}>4 Signs</div>
                    </div>
                </div>
            </section>

            {/* Subhero Partner Section */}
            <section className={styles.subheroPartner}>
                <div className={styles.subheroCard3d}>
                    <h1 className={styles.subheroTitle}>Transform from Observer to Advocate</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-soft)', marginBottom: '2rem' }}>
                        Your essential toolkit for supporting women through perinatal depression.
                        Validation, practical help, and patience are your strongest tools.
                    </p>
                    <div className={styles.subheroStats}>
                        <div className={styles.substatBubble}>1 in 7 Mothers Affected</div>
                        <div className={styles.substatBubble}>Treatment Works</div>
                        <div className={styles.substatBubble}>Your Role is Vital</div>
                    </div>
                </div>
            </section>

            {/* Journey Map Section */}
            <section className={styles.journeySection}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Your Advocacy Journey</h2>
                <div className={styles.journeyMap}>
                    <article className={styles.journeyCard}>
                        <div className={styles.journeyNumber}>1</div>
                        <h3>🔍 Recognition</h3>
                        <p style={{ margin: '1rem 0', color: 'var(--text-soft)' }}>
                            Learn to identify warning signs early. Distinguish "baby blues" from clinical depression.
                        </p>
                        <div>
                            <span className={styles.actionChip}>Emotional Signs</span>
                            <span className={styles.actionChip}>Behavioral Changes</span>
                        </div>
                    </article>
                    <article className={styles.journeyCard}>
                        <div className={styles.journeyNumber}>2</div>
                        <h3>💬 Response</h3>
                        <p style={{ margin: '1rem 0', color: 'var(--text-soft)' }}>
                            Master effective communication. Provide non-judgmental support and create a safe space.
                        </p>
                        <div>
                            <span className={styles.actionChip}>Active Listening</span>
                            <span className={styles.actionChip}>Validation</span>
                        </div>
                    </article>
                    <article className={styles.journeyCard}>
                        <div className={styles.journeyNumber}>3</div>
                        <h3>🛠️ Resources</h3>
                        <p style={{ margin: '1rem 0', color: 'var(--text-soft)' }}>
                            Connect to professional help networks. Navigate treatment options and crisis tools.
                        </p>
                        <div>
                            <span className={styles.actionChip}>Therapy</span>
                            <span className={styles.actionChip}>Medication</span>
                        </div>
                    </article>
                </div>
            </section>

            {/* Wellness Section */}
            <section className={styles.wellnessWrapper}>
                <h2 style={{ textAlign: 'center' }}>Evidence-Based Nutrition & Wellness</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    Targeted nutritional support and lifestyle interventions that directly impact brain chemistry and mood regulation.
                </p>

                <div className={styles.wellnessGrid}>
                    <div className={styles.wellnessCard}>
                        <div className={styles.wellnessIconHeader}>
                            <div className={styles.wellnessIcon}><i className="fas fa-pills"></i></div>
                            <h3>Critical Nutrients</h3>
                        </div>
                        <ul className={styles.wellnessList}>
                            <li><i className={`fas fa-check ${styles.checkIcon}`}></i> Omega-3 (EPA &gt;1000mg): Improves neurotransmitter function</li>
                            <li><i className={`fas fa-check ${styles.checkIcon}`}></i> Vitamin D3: Target serum levels 40-60 ng/mL</li>
                            <li><i className={`fas fa-check ${styles.checkIcon}`}></i> Magnesium: Reduces anxiety and aids sleep</li>
                        </ul>
                    </div>
                    <div className={styles.wellnessCard}>
                        <div className={styles.wellnessIconHeader}>
                            <div className={styles.wellnessIcon}><i className="fas fa-apple-alt"></i></div>
                            <h3>Daily Support</h3>
                        </div>
                        <ul className={styles.wellnessList}>
                            <li><i className={`fas fa-check ${styles.checkIcon}`}></i> Protein + Complex Carbs: Stabilizes blood sugar</li>
                            <li><i className={`fas fa-check ${styles.checkIcon}`}></i> Hydration: Combats fatigue and headaches</li>
                            <li><i className={`fas fa-check ${styles.checkIcon}`}></i> Regular Snacks: Prevents "hangry" mood dips</li>
                        </ul>
                    </div>
                    <div className={styles.wellnessCard}>
                        <div className={styles.wellnessIconHeader}>
                            <div className={styles.wellnessIcon}><i className="fas fa-moon"></i></div>
                            <h3>Sleep Hygiene</h3>
                        </div>
                        <ul className={styles.wellnessList}>
                            <li><i className={`fas fa-check ${styles.checkIcon}`}></i> Protect a 4-hour sleep block (Partners: take this shift!)</li>
                            <li><i className={`fas fa-check ${styles.checkIcon}`}></i> Reduce evening blue light exposure</li>
                            <li><i className={`fas fa-check ${styles.checkIcon}`}></i> Sleep when baby sleeps (actually do it)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className={styles.timelineSection}>
                <h2 style={{ textAlign: 'center' }}>Disease Trajectory</h2>
                <p style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    Understanding the natural progression helps identify intervention points and predict outcomes.
                </p>

                <div className={styles.timelineContainer}>
                    <div className={styles.timelineLine}></div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <div style={{ color: 'var(--mild)', fontWeight: 700, fontSize: '0.9rem' }}>DAYS 3-10 POSTPARTUM</div>
                            <h4>Baby Blues</h4>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-soft)' }}>
                                Affects 50-80% of mothers. Tearfulness, mood swings, anxiety. Usually self-limiting.
                            </p>
                        </div>
                        <div className={styles.timelineMarker} style={{ background: 'var(--mild)' }}></div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <div style={{ color: 'var(--moderate)', fontWeight: 700, fontSize: '0.9rem' }}>2+ WEEKS POSTPARTUM</div>
                            <h4>Perinatal Depression Onset</h4>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-soft)' }}>
                                Symptoms persist beyond the "blues" window. Interferes with daily functioning and bonding.
                            </p>
                        </div>
                        <div className={styles.timelineMarker} style={{ background: 'var(--moderate)' }}></div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <div style={{ color: 'var(--critical)', fontWeight: 700, fontSize: '0.9rem' }}>URGENT / EMERGENCY</div>
                            <h4>Severe Symptoms / Psychosis</h4>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-soft)' }}>
                                Intrusive thoughts, detachment from reality, or risk of harm requires immediate ER visit.
                            </p>
                        </div>
                        <div className={styles.timelineMarker} style={{ background: 'var(--critical)' }}></div>
                    </div>
                </div>
            </section>

            {/* Accordion Section */}
            <section className={styles.accordionSection}>
                <h2 style={{ textAlign: 'center' }}>When to Consult a Provider</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Clear guidelines on urgency levels help ensure timely intervention.</p>

                <div className={`${styles.accordionItem} ${openAccordions.has(0) ? styles.accordionItemActive : ''}`}>
                    <div className={styles.accordionHeader} onClick={() => toggleAccordion(0)}>
                        <div className={styles.accordionTitle}>
                            <div className={styles.accordionIconBox} style={{ background: 'var(--critical)' }}>
                                <i className="fas fa-exclamation"></i>
                            </div>
                            IMMEDIATE (Within 24 Hours)
                        </div>
                        <i className={`fas fa-chevron-down ${openAccordions.has(0) ? 'fa-rotate-180' : ''}`}></i>
                    </div>
                    <div className={styles.accordionContent}>
                        <div className={styles.accordionInner}>
                            <ul className={styles.wellnessList}>
                                <li><i className="fas fa-circle" style={{ color: 'var(--critical)', fontSize: '0.6rem' }}></i> Suicidal thoughts or plan</li>
                                <li><i className="fas fa-circle" style={{ color: 'var(--critical)', fontSize: '0.6rem' }}></i> Thoughts of harming the baby</li>
                                <li><i className="fas fa-circle" style={{ color: 'var(--critical)', fontSize: '0.6rem' }}></i> Hallucinations or delusions</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={`${styles.accordionItem} ${openAccordions.has(1) ? styles.accordionItemActive : ''}`}>
                    <div className={styles.accordionHeader} onClick={() => toggleAccordion(1)}>
                        <div className={styles.accordionTitle}>
                            <div className={styles.accordionIconBox} style={{ background: 'var(--moderate)' }}>
                                <i className="fas fa-clock"></i>
                            </div>
                            URGENT (Within 48-72 Hours)
                        </div>
                        <i className={`fas fa-chevron-down ${openAccordions.has(1) ? 'fa-rotate-180' : ''}`}></i>
                    </div>
                    <div className={styles.accordionContent}>
                        <div className={styles.accordionInner}>
                            <ul className={styles.wellnessList}>
                                <li><i className="fas fa-circle" style={{ color: 'var(--moderate)', fontSize: '0.6rem' }}></i> Worsening symptoms affecting daily tasks</li>
                                <li><i className="fas fa-circle" style={{ color: 'var(--moderate)', fontSize: '0.6rem' }}></i> Severe insomnia not related to baby</li>
                                <li><i className="fas fa-circle" style={{ color: 'var(--moderate)', fontSize: '0.6rem' }}></i> Panic attacks</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={`${styles.accordionItem} ${openAccordions.has(2) ? styles.accordionItemActive : ''}`}>
                    <div className={styles.accordionHeader} onClick={() => toggleAccordion(2)}>
                        <div className={styles.accordionTitle}>
                            <div className={styles.accordionIconBox} style={{ background: 'var(--neuron-blue)' }}>
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            ROUTINE (Book Appointment)
                        </div>
                        <i className={`fas fa-chevron-down ${openAccordions.has(2) ? 'fa-rotate-180' : ''}`}></i>
                    </div>
                    <div className={styles.accordionContent}>
                        <div className={styles.accordionInner}>
                            <ul className={styles.wellnessList}>
                                <li><i className="fas fa-circle" style={{ color: 'var(--neuron-blue)', fontSize: '0.6rem' }}></i> Persistent low mood &gt; 2 weeks</li>
                                <li><i className="fas fa-circle" style={{ color: 'var(--neuron-blue)', fontSize: '0.6rem' }}></i> Difficulty bonding</li>
                                <li><i className="fas fa-circle" style={{ color: 'var(--neuron-blue)', fontSize: '0.6rem' }}></i> Feeling overwhelmed constantly</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Section */}
            <section className={styles.emergencySection} id="emergencySection">
                <i className="fas fa-ambulance" style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
                <h2 className={styles.emergencyTitle}>IMMEDIATE ACTION REQUIRED</h2>
                <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
                    If you notice suicidal thoughts, psychosis, or thoughts of harm, do not wait.
                </p>

                <div className={styles.emergencyContacts}>
                    <div className={styles.emergencyBtn} onClick={() => window.location.href = 'tel:988'}>
                        <i className="fas fa-phone"></i> 988 (Suicide & Crisis)
                    </div>
                    <div className={styles.emergencyBtn} onClick={() => window.location.href = 'tel:1-800-944-4773'}>
                        <i className="fas fa-heart"></i> 1-800-944-4773 (PSI)
                    </div>
                </div>
            </section>

            {/* Strategies Section */}
            <section className={styles.strategiesSection} id="strategiesSection">
                <div className={styles.sectionHeaderCenter}>
                    <h2 className={styles.sectionTitleLight}>6 Powerful Support Strategies</h2>
                    <p className={styles.sectionSubtitleLight}>
                        Hover over each card to flip and discover actionable ways to help
                    </p>
                </div>

                <div className={styles.strategiesGrid}>
                    {[
                        {
                            id: 1, icon: 'fa-ear-listen', title: 'Listen Without Judgment',
                            do: ["I'm here for you. You're not alone.", "This is a medical condition, not your fault.", "You're a good mother going through a hard time.", "What do you need right now?"],
                            dont: ["Just snap out of it", "Other moms have it worse", "You should be grateful", "It's just hormones"]
                        },
                        {
                            id: 2, icon: 'fa-hand-holding-heart', title: 'Provide Practical Help',
                            content: ["Take the 2 AM feeding shift", "Prepare meals and keep water nearby", "Do laundry, dishes, cleaning", "Handle diaper changes and bathing", "Watch baby so she can nap", "Manage bills and paperwork"],
                            note: "Depression makes decisions overwhelming. Just act."
                        },
                        {
                            id: 3, icon: 'fa-user-doctor', title: 'Facilitate Treatment',
                            content: ["Research specialists", "Schedule appointments", "Provide transportation", "Attend if invited", "Support medication", "Handle paperwork"],
                            note: "Options: CBT, IPT, Medication, Groups"
                        },
                        {
                            id: 4, icon: 'fa-shield-heart', title: 'Protect Recovery Time',
                            content: ["Manage visitors", "Encourage self-care", "Treat therapy as non-negotiable", "Buffer from judgment", "Celebrate small wins", "Quiet environment"]
                        },
                        {
                            id: 5, icon: 'fa-chart-line', title: 'Monitor & Advocate',
                            content: ["Keep symptom log", "Use EPDS scale", "Report worsening immediately", "Be patient (6+ months)", "Trust your instincts", "Communicate with team"],
                            note: "Meds take 4-6 weeks to work."
                        },
                        {
                            id: 6, icon: 'fa-heart', title: 'Take Care of Yourself',
                            content: ["Find support group", "Keep routine", "Accept help", "Consider therapy", "Take breaks", "Watch for burnout"],
                            note: "⚠️ Seek help if resentful or exhausted."
                        }
                    ].map(strat => (
                        <div className={styles.flipCard} key={strat.id}>
                            <div className={styles.flipCardInner}>
                                <div className={styles.flipCardFront}>
                                    <div className={styles.strategyNumberBadge}>{strat.id}</div>
                                    <div className={styles.strategyIcon}>
                                        <i className={`fas ${strat.icon}`}></i>
                                    </div>
                                    <h3 className={styles.strategyTitleFront}>{strat.title}</h3>
                                    <p className={styles.strategyHint}>Hover to see actions</p>
                                </div>
                                <div className={styles.flipCardBack}>
                                    <h4 className={styles.strategyTitleBack}>{strat.do ? 'What to Say & Not Say' : strat.title}</h4>
                                    <div className={styles.strategyContentBack}>
                                        {strat.do && (
                                            <>
                                                <div className={styles.doSectionBack}>
                                                    <h4>✅ DO SAY:</h4>
                                                    <ul>{strat.do.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                                </div>
                                                <div className={styles.dontSectionBack}>
                                                    <h4>❌ DON'T SAY:</h4>
                                                    <ul>{strat.dont?.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                                </div>
                                            </>
                                        )}
                                        {strat.content && (
                                            <ul>{strat.content.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                        )}
                                        {strat.note && <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>{strat.note}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Myths Section */}
            <section className={styles.mythsSection} id="mythsSection">
                <div className={styles.sectionHeaderCenter}>
                    <h2 className={styles.sectionTitleLight} style={{ color: '#333' }}>Myth vs. Reality</h2>
                    <p className={styles.sectionSubtitleLight} style={{ color: '#666' }}>
                        Understanding the truth about perinatal mental health is the first step toward effective support.
                    </p>
                </div>

                <div className={styles.mythBusterContainer}>
                    {[
                        {
                            myth: "\"It's just the 'Baby Blues', everyone gets it.\"",
                            reality: "Baby blues last 10 days. If it persists longer, it's a medical condition. 1 in 7 women develop clinical PPD."
                        },
                        {
                            myth: "\"Postpartum depression is a choice or a sign of weakness.\"",
                            reality: "It's a serious medical condition caused by biological, environmental, and chemical changes. It is NOT a personal failing."
                        },
                        {
                            myth: "\"If a mother is depressed, she doesn't love her baby.\"",
                            reality: "PPD can affect bonding and make caregiving feel overwhelming, but it has nothing to do with the mother's love for her child."
                        }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className={`${styles.mythSlot} ${revealedMyths.has(idx) ? styles.mythSlotRevealed : ''}`}
                            onClick={() => toggleMyth(idx)}
                        >
                            <div className={styles.mythLabelSlot}><i className="fas fa-times-circle"></i> Myth</div>
                            <div className={styles.mythTextSlot}>{item.myth}</div>
                            <div className={styles.realityReveal}>
                                <div className={styles.realityLabelSlot}><i className="fas fa-check-circle"></i> Reality</div>
                                <div className={styles.realityTextSlot}>{item.reality}</div>
                            </div>
                            {!revealedMyths.has(idx) && (
                                <button className={styles.revealBtn}>
                                    <i className="fas fa-eye"></i> Reveal Reality
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Resources Section */}
            <section className={styles.resourcesSection}>
                <h2 style={{ textAlign: 'center' }}>🌐 Essential Resources & Support Networks</h2>
                <div className={styles.resourcesGrid}>
                    <article className={styles.resourceCard}>
                        <div className={styles.resourceIcon}>📞</div>
                        <h3 className={styles.resourceCategory}>Crisis Hotlines</h3>
                        <ul className={styles.resourceItems}>
                            <li>988 - Suicide & Crisis Lifeline (24/7)</li>
                            <li>1-800-944-4773 - PSI</li>
                            <li>1-800-662-4357 - SAMHSA</li>
                            <li>Text "HELLO" to 741741</li>
                        </ul>
                    </article>
                    <article className={styles.resourceCard}>
                        <div className={styles.resourceIcon}>💻</div>
                        <h3 className={styles.resourceCategory}>Websites</h3>
                        <ul className={styles.resourceItems}>
                            <li>postpartum.net - PSI</li>
                            <li>mghcpdonline.org - MGH</li>
                            <li>2020mom.org - Postpartum Progress</li>
                            <li>womensmentalhealth.org</li>
                        </ul>
                    </article>
                    <article className={styles.resourceCard}>
                        <div className={styles.resourceIcon}>👥</div>
                        <h3 className={styles.resourceCategory}>Support Groups</h3>
                        <ul className={styles.resourceItems}>
                            <li>PSI Online Groups</li>
                            <li>Hospital Programs</li>
                            <li>Peer Support Groups</li>
                            <li>Partner Groups</li>
                        </ul>
                    </article>
                    <article className={styles.resourceCard}>
                        <div className={styles.resourceIcon}>📋</div>
                        <h3 className={styles.resourceCategory}>Screening Tools</h3>
                        <ul className={styles.resourceItems}>
                            <li>Edinburgh Scale (EPDS)</li>
                            <li>PHQ-9 Questionnaire</li>
                            <li>PDSS Screening</li>
                            <li>Professional Screening</li>
                        </ul>
                    </article>
                </div>
            </section>

            {/* Checklist Section */}
            <section className={styles.checklistSection} id="checklistSection">
                <div className={styles.sectionHeaderCenter}>
                    <h2 className={styles.sectionTitleLight} style={{ color: '#333' }}>Your Action Plan</h2>
                    <p className={styles.sectionSubtitleLight} style={{ color: '#666' }}>
                        Complete these steps to be fully prepared. Track your progress!
                    </p>
                </div>

                <div className={styles.checklistContainer}>
                    <div className={styles.progressTracker}>
                        <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>Progress</div>
                        <div className={styles.progressPercentage}>{progressPercentage}%</div>
                    </div>
                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBarFill} style={{ width: `${progressPercentage}%` }}></div>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        {CHECKLIST_ITEMS.map((item, idx) => (
                            <div
                                key={idx}
                                className={`${styles.checklistItemEnhanced} ${completedItems.has(idx) ? styles.checklistItemCompleted : ''}`}
                                onClick={() => toggleChecklistItem(idx)}
                            >
                                <div className={styles.customCheckbox}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div className={styles.checklistTextEnhanced}>{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Message Section */}
            <section className={styles.finalMessageSection} id="finalMessage">
                <div className={styles.hopeParticles}>
                    {/* Static decoration or animated particles */}
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={i}
                            className={styles.hopeParticle}
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                opacity: Math.random() * 0.5 + 0.2
                            }}
                        ></div>
                    ))}
                </div>

                <div className={styles.finalMessageContent}>
                    <div className={styles.finalIconMega}>
                        <i className="fas fa-hands-holding-heart"></i>
                    </div>
                    <h2 className={styles.finalTitleMega}>Your Support Saves Lives</h2>
                    <p style={{ fontSize: '1.3rem', lineHeight: 2, marginBottom: '2rem' }}>
                        Recovery from perinatal depression takes time—typically 6 months to a year with treatment.
                        There will be good days and difficult days. Your patience, understanding, and active support
                        are <strong>essential to her recovery</strong>.
                    </p>
                    <div className={styles.finalQuoteBox}>
                        "She is not weak. She is not a bad mother. She is ill. And with proper treatment and support,
                        she WILL recover. Your love and advocacy make an immeasurable difference."
                    </div>
                    <div className={styles.finalCtaButtons}>
                        <button className={`${styles.finalBtn} ${styles.finalBtnPrimary}`} onClick={() => scrollToSection('heroSection')}>
                            <i className="fas fa-rotate-left"></i> Review Guide
                        </button>
                        <button className={`${styles.finalBtn} ${styles.finalBtnPrimary}`} onClick={() => window.print()}>
                            <i className="fas fa-print"></i> Print Guide
                        </button>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <h3 style={{ color: 'var(--deep-pink)', marginBottom: '1rem' }}>Recovery is Possible</h3>
                <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-soft)' }}>
                    Perinatal depression is a medical condition, not a personal failing. With appropriate treatment and your support, she can heal and thrive.
                </p>
                <div>
                    <span className={styles.footerBadge}><i className="fas fa-heart"></i> Evidence-Based</span>
                    <span className={styles.footerBadge}><i className="fas fa-shield-alt"></i> Confidential</span>
                    <span className={styles.footerBadge}><i className="fas fa-brain"></i> Validated</span>
                </div>
            </footer>

            {/* Modals */}
            {activeModal && (
                <div className={`${styles.symptomModal} ${styles.active}`} onClick={() => setActiveModal(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.modalClose} onClick={() => setActiveModal(null)}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalIcon} dangerouslySetInnerHTML={{ __html: SYMPTOM_DATA[activeModal].icon }}></div>
                            <h3 className={styles.modalTitle}>{SYMPTOM_DATA[activeModal].title}</h3>
                        </div>
                        <ul className={styles.symptomListModal}>
                            {SYMPTOM_DATA[activeModal].symptoms.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>
            )}

            {showCelebration && (
                <div className={`${styles.completionCelebration} ${styles.completionCelebrationActive}`} onClick={() => setShowCelebration(false)}>
                    <div className={styles.celebrationContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.celebrationIcon}>🎉</div>
                        <h2 className={styles.celebrationTitle}>Amazing!</h2>
                        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                            You've completed all action items. You're now equipped to provide life-saving support!
                        </p>
                        <button className={styles.celebrationCloseBtn} onClick={() => setShowCelebration(false)}>
                            Continue Journey
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerinatalFamilyGuide;
