
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
    HERO_PILLS_DATA,
    AgeGroup
} from './BoneHealthJourneyData';

const BoneHealthJourney: React.FC = () => {
    // State
    const [activeAge, setActiveAge] = useState<AgeGroup>('20-39');
    const [chartVisible, setChartVisible] = useState({ estrogen: true, bone: true });
    const [viewedTopics, setViewedTopics] = useState<Set<number>>(new Set());
    const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
    const [simulationStage, setSimulationStage] = useState('healthy');
    const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
    const [vizData, setVizData] = useState<any>(null);

    // Refs for scrolling
    const timelineRef = useRef<HTMLElement>(null);
    const topicsRef = useRef<HTMLElement>(null);
    const simulationRef = useRef<HTMLDivElement>(null);

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
        if (!selectedBodyPart) {
            setVizData(null);
            return;
        }

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
        // Normalize data to always have 5 points for smooth 'd' transition
        // Fill missing points with the last known value
        const normalizedData = [...data];
        while (normalizedData.length < 5) {
            normalizedData.push(normalizedData[normalizedData.length - 1]);
        }

        const points = normalizedData.map((val, idx) => {
            const x = xCoords[idx];
            // SVG is 350 height. 0% is at y=300 (approx), 100% is at y=50 (approx). Range = 250px.
            const y = 300 - (val / 100 * 250);
            return `${idx === 0 ? 'M' : 'L'} ${x},${y}`;
        }).join(' ');
        return points;
    };

    const graphData = AGE_GRAPH_DATA[activeAge];
    const estrogenPath = getGraphPath(graphData.estrogen);
    const bonePath = getGraphPath(graphData.boneDensity);

    // Calculate dynamic clip width based on valid data points
    // [150, 360, 540, 720, 850]
    // 1 point -> reveal up to 150 + buffer? Or roughly 250?
    // Let's reveal up to the next point's start or just the current point.
    const xCoords = [150, 360, 540, 720, 850];
    const count = graphData.estrogen.length;
    // Add a small buffer (e.g. 50px) to ensure the point circle is fully visible if we had one,
    // but primarily to show the segment.
    // Actually, simply using the coordinate of the last point is sufficient for "reveal".
    const clipWidth = count === 1 ? 200 : xCoords[count - 1] + 20;

    // For fill paths, we need to close the shape down to the X-axis (y=300)
    // We strictly use the 5th point (850) because normalized data goes to the end.
    const lastX = 850;
    const startX = 150;

    const estrogenFill = `${estrogenPath} L ${lastX},300 L ${startX},300 Z`;
    const boneFill = `${bonePath} L ${lastX},300 L ${startX},300 Z`;

    return (
        <div className={styles.container}>




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
                            <svg viewBox="0 0 260 260">
                                <defs>
                                    <radialGradient id="boneGrad">
                                        <stop offset="0%" stopColor="#fff" />
                                        <stop offset="50%" stopColor="#f8bbd0" />
                                        <stop offset="100%" stopColor="#ec407a" />
                                    </radialGradient>
                                </defs>

                                <g transform="translate(130, 130)">
                                    <ellipse cx="0" cy="0" rx="32" ry="42" fill="url(#boneGrad)" stroke="#ec407a" strokeWidth="2.5">
                                        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                                    </ellipse>
                                    <rect x="-3" y="-45" width="6" height="40" rx="3" fill="#f8bbd0" stroke="#ec407a" strokeWidth="2" />

                                    {/* Orbiting particles */}
                                    <circle cx="55" cy="0" r="3.5" fill="#4caf50">
                                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="7s"
                                            repeatCount="indefinite" />
                                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="-55" cy="0" r="3.5" fill="#ff9800">
                                        <animateTransform attributeName="transform" type="rotate" from="180" to="540" dur="7s"
                                            repeatCount="indefinite" />
                                        <animate attributeName="r" values="3;5;3" dur="2.3s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="0" cy="55" r="3.5" fill="#9c27b0">
                                        <animateTransform attributeName="transform" type="rotate" from="90" to="450" dur="7s"
                                            repeatCount="indefinite" />
                                        <animate attributeName="r" values="3;5;3" dur="2.7s" repeatCount="indefinite" />
                                    </circle>
                                </g>

                                <circle cx="130" cy="130" r="65" fill="none" stroke="#ec407a" strokeWidth="1" opacity="0.25"
                                    strokeDasharray="4,4" />
                            </svg>
                        </div>

                        <div className={styles.heroPillStack}>
                            {HERO_PILLS_DATA.map((pill, index) => (
                                <div key={index} className={styles.heroPill} style={{ animationDelay: `${index * 0.2}s` }}>
                                    <i className={`fas fa-${pill.icon}`} style={{ color: pill.color }}></i>
                                    <span>{pill.label}: <strong>{pill.value}</strong></span>
                                </div>
                            ))}
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
                                        <clipPath id="chartRevealClip">
                                            <rect x="0" y="0" width={clipWidth} height="350" style={{ transition: 'width 0.8s ease-in-out' }} />
                                        </clipPath>
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
                                    <g style={{ opacity: chartVisible.estrogen ? 1 : 0.1, transition: 'opacity 0.5s' }} clipPath="url(#chartRevealClip)">
                                        <path d={estrogenPath} fill="none" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" style={{ transition: 'd 0.5s ease-in-out' }} />
                                        <path d={estrogenFill} fill="url(#estrogenGrad)" opacity="0.3" style={{ transition: 'd 0.5s ease-in-out' }} />
                                    </g>

                                    {/* Bone Line */}
                                    <g style={{ opacity: chartVisible.bone ? 1 : 0.1, transition: 'opacity 0.5s' }} clipPath="url(#chartRevealClip)">
                                        <path d={bonePath} fill="none" stroke="#ff9800" strokeWidth="4" strokeLinecap="round" style={{ transition: 'd 0.5s ease-in-out' }} />
                                        <path d={boneFill} fill="url(#boneGradChart)" opacity="0.3" style={{ transition: 'd 0.5s ease-in-out' }} />
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

                                <div className={styles.stageInsightPanel}>
                                    <div className={styles.stageBadge}>
                                        {currentPhaseData.name} • {currentPhaseData.age}
                                    </div>
                                    <div className={styles.stageInsightText}>{currentPhaseData.graphSummary}</div>
                                </div>


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

                    {/* Progress Bar (Simplified) */}
                    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1.25rem 2rem', background: '#fff', borderRadius: '12px', border: '1px solid #f0f0f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.8rem', color: '#999', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                                    YOUR LEARNING PROGRESS
                                </div>
                                <div style={{ background: '#f5f5f5', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${progressPercent}%`, height: '100%', background: '#ec407a', transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#bbb', marginTop: '0.5rem' }}>
                                    {viewedTopics.size} of 10 topics explored
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ec407a', lineHeight: 1 }}>{progressPercent}%</div>
                                <div style={{ fontSize: '0.65rem', color: '#999', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.2rem' }}>Complete</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.topicsGrid}>
                        {topicsData.map(topic => {
                            const cat = topicCategories[topic.id];
                            const isExpanded = expandedTopic === topic.id;
                            const isViewed = viewedTopics.has(topic.id);

                            return (
                                <div key={topic.id} className={`${styles.topicCard} ${isExpanded ? styles.expanded : ''} ${topic.critical ? styles.criticalTopic : ''}`}>
                                    <div className={styles.topicCardHeader} onClick={() => toggleTopic(topic.id)}>
                                        {/* Left: Number Anchor */}
                                        <div className={styles.topicNumber} style={isViewed ? { background: '#e8f5e9', color: '#4caf50', borderColor: '#4caf5020' } : {}}>
                                            {isViewed ? <i className="fas fa-check" style={{ fontSize: '0.9rem' }}></i> : topic.id}
                                        </div>

                                        {/* Center: Content Block */}
                                        <div className={styles.topicInfo}>
                                            <h3>{topic.title}</h3>
                                            <p className={styles.topicSummary}>{topic.summary}</p>
                                        </div>

                                        {/* Right: Meta Information */}
                                        <div className={styles.topicMetaGroup}>
                                            <div className={styles.topicCategoryBadge}
                                                style={{ background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}20` }}>
                                                {cat.category}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <span className={styles.readTime}>3 min</span>
                                                {topic.critical && (
                                                    <span className={styles.criticalBadge}>CRITICAL</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Expand Indicator */}
                                        <i className={`fas fa-chevron-down ${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}
                                            style={{ marginLeft: '1rem', opacity: isExpanded ? 1 : 0.2, fontSize: '0.9rem' }}></i>
                                    </div>

                                    <div className={`${styles.topicContent} ${isExpanded ? styles.active : ''}`}>
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
                            {vizData ? (
                                <div className={styles.vizContainer} style={{ width: '100%' }}>
                                    <div className={styles.vizHeader}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                            <h3>{vizData.title}</h3>
                                            <span className={`${styles.stageTag} ${styles[simulationStage] || ''}`}>
                                                {simulationStage.toUpperCase()}
                                            </span>
                                        </div>
                                        <button
                                            className={styles.backToBodyBtn}
                                            onClick={() => setSelectedBodyPart(null)}
                                            style={{
                                                padding: '0.4rem 0.9rem',
                                                background: 'white',
                                                border: '1px solid #ec407a',
                                                borderRadius: '8px',
                                                color: '#ec407a',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem'
                                            }}
                                        >
                                            <i className="fas fa-arrow-left"></i> Back to Body
                                        </button>
                                    </div>

                                    <div className={styles.detailLayout}>
                                        <div className={styles.vizSvgContainer} dangerouslySetInnerHTML={{ __html: vizData.svg }}></div>

                                        <div className={styles.detailPanel}>
                                            <div className={styles.vizDescription}>
                                                <h4>About this Stage</h4>
                                                <p>{vizData.description}</p>
                                            </div>

                                            <div className={styles.vizStats} style={{ marginTop: '1.5rem' }}>
                                                <div className={styles.vizStatRow} style={{ flexDirection: 'column', gap: '1rem' }}>
                                                    <div className={styles.vizStatCard} style={{ width: '100%' }}>
                                                        <span className={styles.vizStatLabel}>Bone Density</span>
                                                        <div className={`${styles.vizStatValue} ${vizData.stats.bmdClass}`}>{vizData.stats.bmd}</div>
                                                    </div>
                                                    <div className={styles.vizStatCard} style={{ width: '100%' }}>
                                                        <span className={styles.vizStatLabel}>Fracture Risk</span>
                                                        <div className={`${styles.vizStatValue} ${vizData.stats.riskClass}`}>{vizData.stats.risk}</div>
                                                    </div>
                                                    <div className={styles.vizStatCard} style={{ width: '100%' }}>
                                                        <span className={styles.vizStatLabel}>Cartilage Status</span>
                                                        <div className={`${styles.vizStatValue} ${vizData.stats.cartClass}`}>{vizData.stats.cartilage}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.bodyDiagramContainer}>
                                    <div className={styles.bodyDiagramHint}>
                                        <h4>Explore Your Bones & Joints</h4>
                                        <p>Tap the highlighted areas to see health insights</p>
                                    </div>
                                    <div className={styles.bodyDiagram}>
                                        <svg viewBox="0 0 300 600" className={styles.skeletonSvg} style={{ width: '100%', height: 'auto', maxHeight: '550px', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.03))' }}>
                                            <defs>
                                                <linearGradient id="skeletonStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#ec407a" />
                                                    <stop offset="100%" stopColor="#f48fb1" />
                                                </linearGradient>
                                                <filter id="skeletonGlow">
                                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                                    <feMerge>
                                                        <feMergeNode in="coloredBlur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>

                                            {/* Female Body Silhouette (Soft Background) */}
                                            <path
                                                d="M150,10 C175,10 195,40 195,70 C195,100 175,120 150,120 C125,120 105,100 105,70 C105,40 125,10 150,10 Z
                                                   M150,120 C155,130 165,135 180,140 C225,155 250,185 250,240 C250,290 220,300 210,320 
                                                   C200,340 250,370 250,440 C250,510 230,580 215,595 L85,595 
                                                   C70,580 50,510 50,440 C50,370 100,340 90,320 C80,300 50,290 50,240 
                                                   C50,185 75,155 120,140 C135,135 145,130 150,120 Z"
                                                fill="url(#skeletonStroke)"
                                                opacity="0.04"
                                            />

                                            {/* Refined Internal Skeleton */}
                                            {/* Skull */}
                                            <ellipse cx="150" cy="65" rx="22" ry="30" fill="#fff" stroke="url(#skeletonStroke)" strokeWidth="2.5" filter="url(#skeletonGlow)" />

                                            {/* Spine */}
                                            <path d="M150,100 Q152,150 150,200 Q148,250 150,320"
                                                filter="url(#skeletonGlow)" fill="none" stroke="url(#skeletonStroke)" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

                                            {/* Shoulders */}
                                            <path d="M90,145 Q150,135 210,145" filter="url(#skeletonGlow)" fill="none" stroke="url(#skeletonStroke)" strokeWidth="3" strokeLinecap="round" />

                                            {/* Ribcage Highlights */}
                                            <path d="M120,165 Q150,155 180,165" fill="none" stroke="url(#skeletonStroke)" strokeWidth="1.5" opacity="0.6" />
                                            <path d="M115,190 Q150,180 185,190" fill="none" stroke="url(#skeletonStroke)" strokeWidth="1.5" opacity="0.6" />
                                            <path d="M120,215 Q150,205 180,215" fill="none" stroke="url(#skeletonStroke)" strokeWidth="1.5" opacity="0.6" />

                                            {/* Pelvis (Refined Shape) */}
                                            <path d="M110,320 C100,340 100,370 150,370 C200,370 200,340 190,320 Q150,310 110,320"
                                                filter="url(#skeletonGlow)" fill="#fff" stroke="url(#skeletonStroke)" strokeWidth="3" />

                                            {/* Arms */}
                                            <line x1="90" y1="145" x2="70" y2="220" filter="url(#skeletonGlow)" stroke="url(#skeletonStroke)" strokeWidth="3" strokeLinecap="round" />
                                            <line x1="70" y1="220" x2="65" y2="290" filter="url(#skeletonGlow)" stroke="url(#skeletonStroke)" strokeWidth="3" strokeLinecap="round" />
                                            <circle cx="65" cy="300" r="8" fill="#fff" stroke="url(#skeletonStroke)" strokeWidth="2" filter="url(#skeletonGlow)" />

                                            <line x1="210" y1="145" x2="230" y2="220" filter="url(#skeletonGlow)" stroke="url(#skeletonStroke)" strokeWidth="3" strokeLinecap="round" />
                                            <line x1="230" y1="220" x2="235" y2="290" filter="url(#skeletonGlow)" stroke="url(#skeletonStroke)" strokeWidth="3" strokeLinecap="round" />
                                            <circle cx="235" cy="300" r="8" fill="#fff" stroke="url(#skeletonStroke)" strokeWidth="2" filter="url(#skeletonGlow)" />

                                            {/* Legs */}
                                            <path d="M125,365 Q120,440 120,460" filter="url(#skeletonGlow)" fill="none" stroke="url(#skeletonStroke)" strokeWidth="3.5" strokeLinecap="round" />
                                            <path d="M175,365 Q180,440 180,460" filter="url(#skeletonGlow)" fill="none" stroke="url(#skeletonStroke)" strokeWidth="3.5" strokeLinecap="round" />

                                            {/* Knees */}
                                            <circle cx="120" cy="465" r="9" fill="#fff" stroke="url(#skeletonStroke)" strokeWidth="2" filter="url(#skeletonGlow)" />
                                            <circle cx="180" cy="465" r="9" fill="#fff" stroke="url(#skeletonStroke)" strokeWidth="2" filter="url(#skeletonGlow)" />

                                            {/* Lower Legs */}
                                            <line x1="120" y1="475" x2="115" y2="560" filter="url(#skeletonGlow)" stroke="url(#skeletonStroke)" strokeWidth="3" strokeLinecap="round" />
                                            <line x1="180" y1="475" x2="185" y2="560" filter="url(#skeletonGlow)" stroke="url(#skeletonStroke)" strokeWidth="3" strokeLinecap="round" />

                                            {/* INTERACTIVE HOTSPOTS (Aligned to new skeleton) */}
                                            {/* Spine Hotspot */}
                                            <circle
                                                cx="150" cy="200" r="14"
                                                className={`${styles.hotspot} ${styles.hotspotPulse}`}
                                                onClick={() => setSelectedBodyPart('spine')}
                                            />

                                            {/* Hip Hotspot */}
                                            <circle
                                                cx="150" cy="345" r="16"
                                                className={`${styles.hotspot} ${styles.hotspotPulse}`}
                                                onClick={() => setSelectedBodyPart('hip')}
                                            />

                                            {/* Wrist Hotspot */}
                                            <circle
                                                cx="65" cy="300" r="12"
                                                className={`${styles.hotspot} ${styles.hotspotPulse}`}
                                                onClick={() => setSelectedBodyPart('wrist')}
                                            />
                                            <circle
                                                cx="235" cy="300" r="12"
                                                className={`${styles.hotspot} ${styles.hotspotPulse}`}
                                                onClick={() => setSelectedBodyPart('wrist')}
                                            />

                                            {/* Knee Hotspot */}
                                            <circle
                                                cx="120" cy="465" r="12"
                                                className={`${styles.hotspot} ${styles.hotspotPulse}`}
                                                onClick={() => setSelectedBodyPart('knee')}
                                            />
                                            <circle
                                                cx="180" cy="465" r="12"
                                                className={`${styles.hotspot} ${styles.hotspotPulse}`}
                                                onClick={() => setSelectedBodyPart('knee')}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >

            <footer className={styles.siteFooter}>
                <div className={styles.disclaimer}>
                    <h3><i className="fas fa-exclamation-circle"></i> Medical Disclaimer</h3>
                    <p>Educational content only. Not medical advice. Consult healthcare professionals. Early detection saves lives.</p>
                </div>
                <div className={styles.footerCredits}>© 2026 Nari Sangha - Women's Health Platform</div>
            </footer>
        </div >
    );
};

export default BoneHealthJourney;
