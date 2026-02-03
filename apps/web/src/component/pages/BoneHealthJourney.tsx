
import React, { useState, useEffect, useRef } from 'react';
import styles from './BoneHealthJourney.module.css';
import {
    phaseData,
    topicsData,
    topicCategories,
    bodyParts,
    generateSpine3D,
    generateHip3D,
    generateKnee3D,
    generateWrist3D,
    AGE_GRAPH_DATA,
    AGE_TO_PHASE_MAP,
    AgeGroup
} from './BoneHealthJourneyData';

const BoneHealthJourney: React.FC = () => {
    // State
    const [activeAge, setActiveAge] = useState<AgeGroup>('20-39');
    const [chartVisible, setChartVisible] = useState({ estrogen: true, bone: true });
    const [viewedTopics, setViewedTopics] = useState<Set<number>>(new Set());
    const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
    const [simulationStage, setSimulationStage] = useState('healthy');
    const [selectedBodyPart, setSelectedBodyPart] = useState<string>('spine');
    const [vizData, setVizData] = useState<any>(null);

    // Refs for scrolling
    const timelineRef = useRef<HTMLElement>(null);
    const topicsRef = useRef<HTMLElement>(null);
    const simulationRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // Scroll Spy & Header Shrink
    useEffect(() => {
        const handleScroll = () => {
            // Optional: Add logic here if we had a sticky sub-nav inside the component
            // For now just basic scroll listening if needed in future

            if (headerRef.current) {
                if (window.scrollY > 50) {
                    headerRef.current.classList.add(styles.scrolled);
                } else {
                    headerRef.current.classList.remove(styles.scrolled);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const headerOffset = 140;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const toggleTopic = (id: number) => {
        if (expandedTopic === id) {
            setExpandedTopic(null);
        } else {
            setExpandedTopic(id);
            if (!viewedTopics.has(id)) {
                setViewedTopics(prev => new Set(prev).add(id));
            }
        }
    };

    const toggleChart = (type: 'estrogen' | 'bone') => {
        setChartVisible(prev => ({ ...prev, [type]: !prev[type] }));
    };

    // Update Visualization when stage or body part changes
    useEffect(() => {
        let data;
        switch (selectedBodyPart) {
            case 'spine':
                data = generateSpine3D(simulationStage, styles);
                break;
            case 'hip':
                data = generateHip3D(simulationStage, styles);
                break;
            case 'knee':
                data = generateKnee3D(simulationStage, styles);
                break;
            case 'wrist':
                data = generateWrist3D(simulationStage, styles);
                break;
            default:
                data = generateSpine3D(simulationStage, styles);
        }
        setVizData(data);
    }, [simulationStage, selectedBodyPart]);

    const currentPhase = AGE_TO_PHASE_MAP[activeAge];
    const currentPhaseData = phaseData[currentPhase];
    const progressPercent = Math.round((viewedTopics.size / topicsData.length) * 100);

    const getGraphPath = (data: number[]) => {
        const xCoords = [150, 360, 540, 720, 850];
        const points = data.map((val, idx) => {
            const x = xCoords[idx];
            // SVG is 350 height. 0% is at y=300 (approx), 100% is at y=50 (approx). Range = 250px.
            // Value 100% -> y=50. Value 0% -> y=300.
            const y = 300 - (val / 100 * 250);
            return `${idx === 0 ? 'M' : 'L'} ${x},${y}`;
        }).join(' ');
        return points;
    };

    const graphData = AGE_GRAPH_DATA[activeAge];
    const estrogenPath = getGraphPath(graphData.estrogen);
    const bonePath = getGraphPath(graphData.boneDensity);

    // For fill paths, we need to close the shape down to the X-axis (y=300)
    // The last point x is xCoords[data.length - 1]
    const xCoords = [150, 360, 540, 720, 850];
    const lastX = xCoords[graphData.estrogen.length - 1];
    const startX = 150;

    const estrogenFill = `${estrogenPath} L ${lastX},300 L ${startX},300 Z`;
    const boneFill = `${bonePath} L ${lastX},300 L ${startX},300 Z`;

    return (
        <div className={styles.container}>


            <div className={styles.pageNav} ref={headerRef}>
                <div className={styles.pageNavContainer}>
                    <a onClick={() => scrollToSection('timelineSection')} className={styles.pageNavLink}>
                        <i className="fas fa-chart-line"></i> <span>Hormone Journey</span>
                    </a>
                    <a onClick={() => scrollToSection('topicsSection')} className={styles.pageNavLink}>
                        <i className="fas fa-book-medical"></i> <span>Key Topics</span>
                    </a>
                    <a onClick={() => scrollToSection('simulationSection')} className={styles.pageNavLink}>
                        <i className="fas fa-cube"></i> <span>3D Explorer</span>
                    </a>
                </div>
            </div>

            <div className={styles.pageShell}>
                {/* HERO SECTION */}
                <section className={styles.hero}>
                    <div className={styles.heroLeft}>
                        <div className={styles.heroSubtitle}>Women's Skeletal Health After Menopause</div>
                        <h1>Your Body's Story,<br />Written in <span className={styles.gradientText}>Bone & Cartilage</span></h1>
                        <p>From puberty through menopause and beyond—discover how hormones shape your skeletal health. Every decade tells a chapter. Learn to read yours.</p>

                        <div className={styles.heroBadges}>
                            <span className={styles.heroBadge}><i className="fas fa-check-circle"></i> Estrogen Impact</span>
                            <span className={styles.heroBadge}><i className="fas fa-check-circle"></i> Bone Density</span>
                            <span className={styles.heroBadge}><i className="fas fa-check-circle"></i> Joint Health</span>
                        </div>

                        <div className={styles.heroCtaRow}>
                            <button className={styles.btnPrimary} onClick={() => scrollToSection('timelineSection')}>
                                <i className="fas fa-play-circle"></i> Start Journey
                            </button>
                            <button className={styles.btnSecondary} onClick={() => scrollToSection('simulationSection')}>
                                <i className="fas fa-cube"></i> 3D Explorer
                            </button>
                        </div>
                    </div>
                    <div className={styles.heroVisual}>
                        <div className={styles.cycleOrbit}>
                            <svg viewBox="0 0 200 200" className="rotating-orbit">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="#ec407a" strokeWidth="1" opacity="0.2" strokeDasharray="5,5" />
                                <circle cx="100" cy="100" r="70" fill="none" stroke="#ec407a" strokeWidth="1" opacity="0.3" />
                                <circle cx="100" cy="100" r="50" fill="none" stroke="#ec407a" strokeWidth="2" opacity="0.1" />
                            </svg>
                        </div>
                        {/* Static SVG representation for hero visual */}
                        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <svg width="240" height="240" viewBox="0 0 240 240">
                                <defs>
                                    <radialGradient id="heroBoneGrad" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#fce4ec" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#f8bbd0" stopOpacity="0" />
                                    </radialGradient>
                                </defs>
                                <circle cx="120" cy="120" r="100" fill="url(#heroBoneGrad)" />
                                <path d="M120,40 L120,200 M60,80 L180,80 M80,160 L160,160" stroke="#ec407a" strokeWidth="2" opacity="0.2" />
                                <text x="120" y="125" textAnchor="middle" fontSize="60" fill="#ec407a" opacity="0.1"><i className="fas fa-bone"></i></text>
                            </svg>
                        </div>

                        <div className={styles.heroPillStack}>
                            <div className={styles.heroPill}><i className="fas fa-arrow-up" style={{ color: '#4caf50' }}></i> Peak Density Age 30</div>
                            <div className={styles.heroPill}><i className="fas fa-exclamation" style={{ color: '#ff9800' }}></i> Menopause Drop</div>
                            <div className={styles.heroPill}><i className="fas fa-shield-alt" style={{ color: '#2196f3' }}></i> Prevention Works</div>
                        </div>
                    </div>
                </section>

                {/* TIMELINE SECTION */}
                <section id="timelineSection" className={styles.timelineSection} ref={timelineRef}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionBadge}><i className="fas fa-clock"></i> THE LIFELINE</div>
                        <h2 className={styles.sectionTitle}>Hormone Journey</h2>
                        <p className={styles.sectionSubtitle}>
                            See how estrogen levels directly correlate with bone density and joint health throughout your life stages.
                        </p>
                    </div>

                    <div className={styles.timelineContainer}>
                        <div className={styles.phaseSelector}>
                            {Object.keys(AGE_GRAPH_DATA).map((ageKey) => {
                                const mapKey = ageKey as AgeGroup;
                                const phaseKey = AGE_TO_PHASE_MAP[mapKey];
                                const data = phaseData[phaseKey];
                                return (
                                    <button
                                        key={ageKey}
                                        className={`${styles.phaseBtn} ${activeAge === ageKey ? styles.active : ''} ${phaseKey === 'menopause' || phaseKey === 'postmeno' ? styles.critical : ''}`}
                                        onClick={() => setActiveAge(mapKey)}
                                    >
                                        <div className={styles.phaseAge}>{data.age}</div>
                                        <div className={styles.phaseName}>{data.name}</div>
                                        <i className={`fas ${data.icon} ${styles.phaseIcon}`}></i>
                                    </button>
                                );
                            })}
                        </div>

                        <div className={styles.hormoneVisualPanel}>
                            <div className={styles.chartArea}>
                                <div className={styles.chartTitleBar}>
                                    <h3>Estrogen vs. Bone Density</h3>
                                    <div className={styles.chartControls}>
                                        <button
                                            className={`${styles.chartBtn} ${chartVisible.estrogen ? styles.active : ''}`}
                                            onClick={() => toggleChart('estrogen')}
                                        >
                                            <i className="fas fa-venus" style={{ color: chartVisible.estrogen ? 'white' : '#ec407a' }}></i> Estrogen
                                        </button>
                                        <button
                                            className={`${styles.chartBtn} ${chartVisible.bone ? styles.active : ''}`}
                                            onClick={() => toggleChart('bone')}
                                        >
                                            <i className="fas fa-bone" style={{ color: chartVisible.bone ? 'white' : '#ec407a' }}></i> Bone
                                        </button>
                                    </div>
                                </div>

                                <svg viewBox="0 0 900 350" className={styles.hormoneChart}>
                                    <defs>
                                        <linearGradient id="estrogenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#4caf50" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#4caf50" stopOpacity="0.1" />
                                        </linearGradient>
                                        <linearGradient id="boneGradChart" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#ff9800" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#ff9800" stopOpacity="0.1" />
                                        </linearGradient>
                                    </defs>

                                    {/* Grid */}
                                    <g opacity="0.2">
                                        {[50, 100, 150, 200, 250, 300].map(y => (
                                            <line key={y} x1="50" y1={y} x2="850" y2={y} stroke="#ccc" strokeWidth="1" />
                                        ))}
                                    </g>

                                    {/* Y-axis labels */}
                                    <text x="35" y="55" textAnchor="end" fill="#666" fontSize="12">100%</text>
                                    <text x="35" y="155" textAnchor="end" fill="#666" fontSize="12">50%</text>
                                    <text x="35" y="305" textAnchor="end" fill="#666" fontSize="12">0%</text>

                                    {/* Estrogen Line */}
                                    <g style={{ opacity: chartVisible.estrogen ? 1 : 0.1, transition: 'opacity 0.5s' }}>
                                        <path d={estrogenPath} fill="none" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" style={{ transition: 'd 0.5s ease' }} />
                                        <path d={estrogenFill} fill="url(#estrogenGrad)" opacity="0.3" style={{ transition: 'd 0.5s ease' }} />
                                    </g>

                                    {/* Bone Line */}
                                    <g style={{ opacity: chartVisible.bone ? 1 : 0.1, transition: 'opacity 0.5s' }}>
                                        <path d={bonePath} fill="none" stroke="#ff9800" strokeWidth="4" strokeLinecap="round" style={{ transition: 'd 0.5s ease' }} />
                                        <path d={boneFill} fill="url(#boneGradChart)" opacity="0.3" style={{ transition: 'd 0.5s ease' }} />
                                    </g>

                                    {/* Axis Labels */}
                                    <text x="150" y="330" textAnchor="middle" fill="#666" fontSize="14" fontWeight="600">TEENS</text>
                                    <text x="360" y="330" textAnchor="middle" fill="#666" fontSize="14" fontWeight="600">20-39</text>
                                    <text x="540" y="330" textAnchor="middle" fill="#666" fontSize="14" fontWeight="600">40-50</text>
                                    <text x="720" y="330" textAnchor="middle" fill="#666" fontSize="14" fontWeight="600">50-60</text>

                                    {/* Danger Zone */}
                                    <rect x="630" y="40" width="200" height="270" fill="#ffebee" opacity="0.3" rx="8" />
                                    <text x="730" y="25" textAnchor="middle" fill="#f44336" fontSize="12" fontWeight="700">DANGER ZONE</text>
                                </svg>

                                <div className={styles.chartLegend}>
                                    <div className={styles.legendItem}>
                                        <div className={`${styles.legendLine} ${styles.estrogen}`}></div>
                                        <span>Estrogen Level</span>
                                    </div>
                                    <div className={styles.legendItem}>
                                        <div className={`${styles.legendLine} ${styles.bone}`}></div>
                                        <span>Bone Mineral Density</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.metricsPanel}>
                                <div className={styles.phaseHeader}>
                                    <div className={styles.phaseIconLarge}>
                                        <i className={`fas ${currentPhaseData.icon}`}></i>
                                    </div>
                                    <div className={styles.phaseTitleBlock}>
                                        <h3>{currentPhaseData.name}</h3>
                                        <p>{currentPhaseData.age}</p>
                                    </div>
                                </div>

                                <div className={styles.gaugesGrid}>
                                    {/* Estrogen Gauge */}
                                    <div className={styles.gaugeCard}>
                                        <div className={styles.gaugeHeader} style={{ color: '#4caf50' }}>
                                            <i className="fas fa-venus"></i> Estrogen
                                        </div>
                                        <div className={styles.gaugeVisual}>
                                            <svg viewBox="0 0 100 60" className={styles.circularGauge}>
                                                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#eee" strokeWidth="8" strokeLinecap="round" />
                                                <path
                                                    d="M 10 50 A 40 40 0 0 1 90 50"
                                                    fill="none"
                                                    stroke="#4caf50"
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray="126"
                                                    strokeDashoffset={126 - (126 * currentPhaseData.estrogen.percent / 100)}
                                                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                                                />
                                                <text x="50" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#444">{currentPhaseData.estrogen.percent}%</text>
                                            </svg>
                                        </div>
                                        <div className={styles.gaugeLabel}>{currentPhaseData.estrogen.label}</div>
                                    </div>

                                    {/* Bone Gauge */}
                                    <div className={styles.gaugeCard}>
                                        <div className={styles.gaugeHeader} style={{ color: '#ff9800' }}>
                                            <i className="fas fa-bone"></i> Density
                                        </div>
                                        <div className={styles.gaugeVisual}>
                                            <svg viewBox="0 0 100 60" className={styles.circularGauge}>
                                                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#eee" strokeWidth="8" strokeLinecap="round" />
                                                <path
                                                    d="M 10 50 A 40 40 0 0 1 90 50"
                                                    fill="none"
                                                    stroke="#ff9800"
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray="126"
                                                    strokeDashoffset={126 - (126 * currentPhaseData.bone.percent / 100)}
                                                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                                                />
                                                <text x="50" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#444">{currentPhaseData.bone.percent}%</text>
                                            </svg>
                                        </div>
                                        <div className={styles.gaugeLabel}>{currentPhaseData.bone.label}</div>
                                    </div>

                                    {/* Joint Gauge */}
                                    <div className={styles.gaugeCard}>
                                        <div className={styles.gaugeHeader} style={{ color: '#9c27b0' }}>
                                            <i className="fas fa-walking"></i> Joints
                                        </div>
                                        <div className={styles.gaugeVisual}>
                                            <svg viewBox="0 0 100 60" className={styles.circularGauge}>
                                                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#eee" strokeWidth="8" strokeLinecap="round" />
                                                <path
                                                    d="M 10 50 A 40 40 0 0 1 90 50"
                                                    fill="none"
                                                    stroke="#9c27b0"
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray="126"
                                                    strokeDashoffset={126 - (126 * currentPhaseData.joint.percent / 100)}
                                                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                                                />
                                                <text x="50" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#444">{currentPhaseData.joint.percent}%</text>
                                            </svg>
                                        </div>
                                        <div className={styles.gaugeLabel}>{currentPhaseData.joint.label}</div>
                                    </div>
                                </div>

                                <div className={styles.insightsBox}>
                                    <h4><i className="fas fa-lightbulb"></i> Key Insights</h4>
                                    <ul>
                                        {currentPhaseData.insights.map((insight: string, idx: number) => (
                                            <li key={idx}>{insight}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={`${styles.riskAlert} ${currentPhase === 'teens' || currentPhase === 'twenties' ? styles.low : currentPhase === 'postmeno' || currentPhase === 'menopause' ? styles.high : styles.moderate}`}>
                                    <div className={styles.alertIcon}>
                                        <i className="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <div className={styles.alertContent}>
                                        <div className={styles.alertTitle}>Osteoporosis Risk: {currentPhaseData.risk.toUpperCase()}</div>
                                        <div className={styles.alertMessage}>
                                            {currentPhaseData.risk === 'low' ? 'Keep building your bone bank for the future.' : currentPhaseData.risk === 'high' ? 'High alert! Fractures can happen easily.' : 'Monitor changes closely.'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TOPICS SECTION */}
                <section id="topicsSection" className={styles.sectionBlock} ref={topicsRef}>
                    <div className={styles.sectionTitleRow}>
                        <div className={styles.sectionBadge}><i className="fas fa-university"></i> KNOWLEDGE BASE</div>
                        <h2 className={styles.sectionTitle}>Everything You Need to Know</h2>
                        <p className={styles.sectionTagline}>Master these 10 topics to take control of your skeletal destiny.</p>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1.5rem', background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(236,64,122,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <div style={{ fontSize: '0.85rem', color: '#880e4f', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    <i className="fas fa-check-circle"></i> YOUR LEARNING PROGRESS
                                </div>
                                <div style={{ background: 'white', height: '12px', borderRadius: '20px', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>
                                    <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)', transition: 'width 0.6s ease', borderRadius: '20px' }}></div>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                                    <span>{viewedTopics.size} of 10 topics explored</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '0.75rem 1.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ec407a' }}>{progressPercent}%</div>
                                <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Complete</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.topicsGrid}>
                        {topicsData.map(topic => {
                            const cat = topicCategories[topic.id];
                            return (
                                <div key={topic.id} className={`${styles.topicCard} ${expandedTopic === topic.id ? styles.expanded : ''} ${topic.critical ? styles.criticalTopic : ''}`}>
                                    {viewedTopics.has(topic.id) && (
                                        <div className={styles.topicViewedIndicator}><i className="fas fa-check"></i> Read</div>
                                    )}
                                    <div className={styles.topicCardHeader}>
                                        <div className={styles.topicNumber} style={{ background: cat.color }}>
                                            <span>{topic.id}</span>
                                            <span className={styles.topicNumText}>TOPIC</span>
                                        </div>
                                        <div className={styles.topicCategoryBadge} style={{ background: `${cat.color}20`, color: cat.color }}>
                                            {cat.emoji} {cat.category}
                                        </div>
                                        {topic.critical && (
                                            <div className={styles.criticalBadge}><i className="fas fa-bell"></i> CRITICAL</div>
                                        )}
                                    </div>

                                    <div className={styles.topicHeader} onClick={() => toggleTopic(topic.id)}>
                                        <div className={`${styles.topicIconNew} ${topic.critical ? styles.criticalIcon : ''}`}
                                            style={!topic.critical ? { background: `${cat.color}15`, color: cat.color } : {}}>
                                            <i className={`fas fa-${topic.icon}`}></i>
                                        </div>
                                        <div className={styles.topicInfo}>
                                            <h3>{topic.title}</h3>
                                            <p className={styles.topicSummary}>{topic.summary}</p>
                                        </div>
                                        <div className={styles.topicActionArea}>
                                            <div className={styles.readTime}><i className="far fa-clock"></i> 3 min</div>
                                            <i className={`fas fa-chevron-down ${styles.expandIcon} ${expandedTopic === topic.id ? styles.expanded : ''}`}></i>
                                        </div>
                                    </div>

                                    <div className={`${styles.topicContent} ${expandedTopic === topic.id ? styles.active : ''}`}>
                                        <div className={styles.contentSection} dangerouslySetInnerHTML={{ __html: topic.content }}></div>
                                        <div className={styles.topicFooterActions} style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', marginBottom: '1.5rem' }}>
                                            <button className={styles.topicActionBtn} onClick={(e) => { e.stopPropagation(); toggleTopic(topic.id); }}>
                                                <i className="fas fa-check"></i> I've read this
                                            </button>
                                            <button className={`${styles.topicActionBtn} ${styles.secondary}`}>
                                                <i className="fas fa-share-alt"></i> Share
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <div className={styles.sectionBlock}>
                    <div style={{ background: '#e3f2fd', border: '2px solid #2196f3', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '0 0 100px', fontSize: '3rem', color: '#2196f3', textAlign: 'center' }}>
                            <i className="fas fa-user-md"></i>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 0.5rem', color: '#0d47a1' }}>Pro Tip from Dr. Sharma</h3>
                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#444' }}>
                                "A DEXA scan is the only way to know your bone health BEFORE a fracture. If you're over 65, or 50 with risk factors, ask your doctor for one today. It's painless, takes 10 minutes, and could save your life."
                            </p>
                        </div>
                        <button className={styles.btnPrimary} style={{ background: '#2196f3' }}>
                            Find Screening Center
                        </button>
                    </div>
                </div>

                {/* SIMULATION SECTION */}
                <div id="simulationSection" className={styles.sectionBlock} ref={simulationRef}>
                    <div className={styles.sectionTitleRow}>
                        <div className={styles.sectionBadge} style={{ background: '#e8f5e9', color: '#2e7d32' }}><i className="fas fa-microscope"></i> INTERACTIVE LAB</div>
                        <h2 className={styles.sectionTitle}>Bone & Joint Explorer</h2>
                        <p className={styles.sectionTagline}>Select a body part and disease stage to see the hidden changes inside.</p>
                    </div>

                    <div className={styles.simulationGrid}>
                        <div className={`${styles.simControls} ${styles.card}`}>
                            <h4>Select Stage</h4>
                            <div className={styles.stageBtns}>
                                {['healthy', 'early', 'advanced', 'treatment'].map(stage => (
                                    <button
                                        key={stage}
                                        className={`${styles.stageBtn} ${simulationStage === stage ? styles.active : ''} ${stage === 'treatment' ? styles.treatmentBtn : ''}`}
                                        onClick={() => setSimulationStage(stage)}
                                    >
                                        <i className={`fas fa-${stage === 'healthy' ? 'smile' : stage === 'early' ? 'meh' : stage === 'advanced' ? 'frown' : 'magic'}`}></i>
                                        {stage.charAt(0).toUpperCase() + stage.slice(1)} {stage === 'early' ? '(Osteopenia)' : stage === 'advanced' ? '(Osteoporosis)' : ''}
                                    </button>
                                ))}
                            </div>

                            <h4 style={{ marginTop: '1.5rem' }}>Body Parts</h4>
                            <div>
                                {bodyParts.map(part => (
                                    <button
                                        key={part.id}
                                        className={`${styles.bodyPartBtn} ${selectedBodyPart === part.id ? styles.active : ''}`}
                                        onClick={() => setSelectedBodyPart(part.id)}
                                    >
                                        <i className={`fas fa-${part.icon}`}></i> {part.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={`${styles.simDisplay} ${styles.card}`}>
                            {vizData && (
                                <div className={styles.vizContainer} style={{ width: '100%' }}>
                                    <div className={styles.vizHeader}>
                                        <h3>{vizData.title}</h3>
                                        <span className={`${styles.stageTag} ${styles[simulationStage] || ''}`}>
                                            {simulationStage.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className={styles.vizSvgContainer} dangerouslySetInnerHTML={{ __html: vizData.svg }}></div>

                                    <div className={styles.vizDescription}>
                                        <h4>About this Stage</h4>
                                        <p>{vizData.description}</p>
                                    </div>

                                    <div className={styles.vizStats}>
                                        {/* We can re-use the infoType for conditional rendering of patient info boxes if we wanted, 
                                                but for now following the generators return which embeds patient info in SVG or separate logic */}
                                        {/* Note: The JS generators returned an HTML string 'patientInfo'. 
                                                I refactored in Data file to return simple/riskInfo/attributes. 
                                                I need to render them here properly if not in SVG */}

                                        {/* Rendering the stats table */}
                                        <div className={styles.vizStatRow}>
                                            <div className={styles.vizStatCard}>
                                                <span className={styles.vizStatLabel}>Bone Density</span>
                                                <div className={`${styles.vizStatValue} ${vizData.stats.bmdClass}`}>{vizData.stats.bmd}</div>
                                            </div>
                                            <div className={styles.vizStatCard}>
                                                <span className={styles.vizStatLabel}>Fracture Risk</span>
                                                <div className={`${styles.vizStatValue} ${vizData.stats.riskClass}`}>{vizData.stats.risk}</div>
                                            </div>
                                            <div className={styles.vizStatCard}>
                                                <span className={styles.vizStatLabel}>Cartilage Status</span>
                                                <div className={`${styles.vizStatValue} ${vizData.stats.cartClass}`}>{vizData.stats.cartilage}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <footer className={styles.siteFooter}>
                <div className={styles.disclaimer}>
                    <h3><i className="fas fa-exclamation-circle"></i> Medical Disclaimer</h3>
                    <p>Educational content only. Not medical advice. Consult healthcare professionals. Early detection saves lives.</p>
                </div>
                <div className={styles.footerCredits}>© 2026 Nari Sangha - Women's Health Platform</div>
            </footer>
        </div>
    );
};

export default BoneHealthJourney;
