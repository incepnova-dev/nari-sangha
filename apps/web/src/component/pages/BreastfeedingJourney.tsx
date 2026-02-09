import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { themes, topics, bodyChanges } from './BreastfeedingData';
import { ROUTES } from '../routes/routeConstants';
import { useBreastfeedingLogic } from '../hooks/useBreastfeedingLogic';
import { BreastfeedingSimulator, LatchSimulator3D, LifestyleWheel } from '../canvas/BreastfeedingCanvas';
import styles from './BreastfeedingJourney.module.css';
import './legacy/breastfeeding.css';

const BreastfeedingJourney: React.FC = () => {
    const navigate = useNavigate();
    const {
        state,
        toggleSim,
        actNurse,
        actPump,
        actHydrate,
        actSleep,
        narrator,
        overlayText,
        pumpActive,
        babyActive,
        sleepActive,
        activeTheme,
        setActiveTheme
    } = useBreastfeedingLogic();

    const [week, setWeek] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTopic, setSelectedTopic] = useState<any>(null);
    const [exploredTopics, setExploredTopics] = useState<number[]>([]);

    const handleTopicClick = (topic: any) => {
        setSelectedTopic(topic);
        if (!exploredTopics.includes(topic.id)) {
            setExploredTopics(prev => [...prev, topic.id]);
        }
    };

    const progressPercent = Math.round((exploredTopics.length / 20) * 100);

    const getAttrName = (key: string) => {
        const map: any = {
            definition: "Definition", importance: "Importance", timing: "Timing",
            techniques: "Techniques", signs: "Success Signs", problems: "Common Problems",
            solutions: "Solutions", help: "When to Seek Help", duration: "Duration",
            resources: "Resources", partner: "Partner Role", cultural: "Cultural Notes"
        };
        return map[key] || key;
    };

    const getAttrIcon = (key: string) => {
        const map: any = {
            definition: 'info-circle', importance: 'star', timing: 'clock', techniques: 'wrench',
            signs: 'check-circle', problems: 'exclamation-triangle', solutions: 'lightbulb',
            help: 'user-md', duration: 'hourglass-half', resources: 'book',
            partner: 'hands-helping', cultural: 'globe'
        };
        return map[key] || 'circle';
    };

    // Body Changes Simulator Canvas Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = 400;

        const draw = (w: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const baseRadius = 80;
            const growthFactor = 1 + (w / 52) * 0.3;
            const radius = baseRadius * growthFactor;

            // Draw breasts
            const spacing = radius * 0.6;

            // Left breast
            ctx.beginPath();
            ctx.arc(cx - spacing, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(236,64,122,0.15)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(236,64,122,0.4)';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Right breast
            ctx.beginPath();
            ctx.arc(cx + spacing, cy, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Draw milk ducts
            const ductCount = Math.min(8, 4 + Math.floor(w / 8));
            for (let i = 0; i < ductCount; i++) {
                const angle = (Math.PI * 2 / ductCount) * i;

                // Left breast ducts
                ctx.beginPath();
                ctx.moveTo(cx - spacing, cy);
                ctx.lineTo(cx - spacing + Math.cos(angle) * radius * 0.7, cy + Math.sin(angle) * radius * 0.7);
                ctx.strokeStyle = `rgba(156,39,176,${0.3 + (w / 52) * 0.3})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Right breast ducts
                ctx.beginPath();
                ctx.moveTo(cx + spacing, cy);
                ctx.lineTo(cx + spacing + Math.cos(angle) * radius * 0.7, cy + Math.sin(angle) * radius * 0.7);
                ctx.stroke();
            }

            // Draw nipples
            ctx.beginPath();
            ctx.arc(cx - spacing, cy, 12, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(233,30,99,0.5)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx + spacing, cy, 12, 0, Math.PI * 2);
            ctx.fill();

            // Week indicator
            ctx.fillStyle = '#212121';
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`Week ${w}`, cx, 30);

            // Supply indicator
            const supplyLevel = Math.min(100, 20 + (w / 52) * 80);
            ctx.fillStyle = '#555';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText(`Milk Production: ${supplyLevel.toFixed(0)}%`, cx, canvas.height - 20);
        };

        draw(week);
    }, [week]);

    const currentWeekData = useMemo(() => {
        // @ts-ignore - keys are numbers
        const keys = Object.keys(bodyChanges).map(Number).sort((a, b) => a - b);
        for (let i = keys.length - 1; i >= 0; i--) {
            // @ts-ignore
            if (week >= keys[i]) return bodyChanges[keys[i]];
        }
        // @ts-ignore
        return bodyChanges[0];
    }, [week]);

    // @ts-ignore
    const activeThemeData = themes[activeTheme];
    const activeTopics = topics.filter(t => t.theme === activeTheme);

    const nutritionData = [
        { name: 'Protein', role: 'Tissue Repair', val: 85, color: '#ff6b6b', icon: '🍗', sources: ['Eggs', 'Lentils', 'Chicken'] },
        { name: 'Calcium', role: 'Bone Density', val: 75, color: '#4ecdc4', icon: '🥛', sources: ['Milk', 'Yogurt', 'Leafy Greens'] },
        { name: 'Iron', role: 'Energy Levels', val: 65, color: '#f39c12', icon: '🥬', sources: ['Spinach', 'Red Meat', 'Beans'] },
        { name: 'Water', role: 'Milk Volume', val: 95, color: '#3498db', icon: '💧', sources: ['Filtered Water', 'Coconut Water'] }
    ];

    return (
        <div className={styles.breastfeedingPageRoot}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <span className={styles.heroBadge}>Interactive Simulation</span>
                        <h1 className={styles.heroTitle}>Your <span className={styles.titleEmphasis}>Breastfeeding</span> Journey Starts Here</h1>
                        <p className={styles.heroDesc}>Explore 20 essential breastfeeding areas organized into 6 themes, with interactive body change simulations and detailed guidance for each stage.</p>

                        <div className={styles.badges}>
                            <span className={styles.heroBadge}><i className="fas fa-layer-group"></i> 6 Themed Sections</span>
                            <span className={styles.heroBadge}><i className="fas fa-book-open"></i> 20 Core Topics</span>
                            <span className={styles.heroBadge}><i className="fas fa-microscope"></i> Live Simulations</span>
                        </div>

                        <div className={styles.heroActions}>
                            <button className={styles.btnPrimary} onClick={() => document.getElementById('simulations')?.scrollIntoView({ behavior: 'smooth' })}>
                                <i className="fas fa-rocket"></i> Begin Your Journey
                            </button>
                            <button className={styles.btnPrimary} style={{ background: 'linear-gradient(135deg, #d81b60, #f06292)' }}>
                                <i className="fas fa-chart-line"></i> Milk Supply & Nutrition
                            </button>
                        </div>
                    </div>
                    <div className={styles.heroVisual}>
                        <svg viewBox="0 0 500 500" className={styles.journeySvg} xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="pathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#ec407a', stopOpacity: 0.2 }} />
                                    <stop offset="100%" style={{ stopColor: '#d81b60', stopOpacity: 1 }} />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <path id="journeyPath" d="M 50,400 Q 150,350 250,250 T 450,100"
                                fill="none" stroke="url(#pathGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10">
                                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                            </path>

                            <g transform="translate(50, 400)">
                                <circle r="15" fill="white" stroke="#ec407a" strokeWidth="2">
                                    <animate attributeName="r" values="15;18;15" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <text x="0" y="35" textAnchor="middle" fill="#d81b60" fontSize="12" fontWeight="bold">Start</text>
                                <path d="M 0,-8 Q 5,0 0,8 Q -5,0 0,-8" fill="#ec407a" />
                            </g>

                            <g transform="translate(250, 250)">
                                <circle r="25" fill="white" stroke="#ec407a" strokeWidth="2" filter="url(#glow)">
                                    <animate attributeName="r" values="25;28;25" dur="3s" begin="1s" repeatCount="indefinite" />
                                </circle>
                                <text x="0" y="45" textAnchor="middle" fill="#d81b60" fontSize="12" fontWeight="bold">Nurture</text>
                                <path d="M 0,-5 C -5,-15 -15,-5 -5,5 L 0,10 L 5,5 C 15,-5 5,-15 0,-5" fill="#ec407a" transform="scale(1.5)" />
                            </g>

                            <g transform="translate(450, 100)">
                                <circle r="20" fill="#d81b60" stroke="white" strokeWidth="3">
                                    <animate attributeName="r" values="20;24;20" dur="3s" begin="2s" repeatCount="indefinite" />
                                </circle>
                                <text x="0" y="40" textAnchor="middle" fill="#d81b60" fontSize="12" fontWeight="bold">Thrive</text>
                                <g stroke="white" strokeWidth="2">
                                    <line x1="0" y1="-10" x2="0" y2="10" />
                                    <line x1="-10" y1="0" x2="10" y2="0" />
                                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
                                </g>
                            </g>

                            <circle r="6" fill="#fce4ec" stroke="#ec407a" strokeWidth="1">
                                <animateMotion dur="4s" repeatCount="indefinite">
                                    <mpath href="#journeyPath" />
                                </animateMotion>
                                <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                            </circle>

                            <circle r="4" fill="#ec407a">
                                <animateMotion dur="4s" begin="2s" repeatCount="indefinite">
                                    <mpath href="#journeyPath" />
                                </animateMotion>
                                <animate attributeName="opacity" values="0;1;0" dur="4s" begin="2s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>
                </div>
            </section>

            <section className={styles.bondSection}>
                <div className={styles.bondContainer}>
                    <div className={styles.bondText}>
                        <span className={styles.bondLabel}>The Essence of Nurturing</span>
                        <h2>More Than Just Nutrition</h2>
                        <p>
                            Breastfeeding is a biological conversation. With every drop of milk, you pass on immunity, comfort, and love. It is a silent language of connection that builds a foundation for a lifetime of trust.
                        </p>
                        <div className={styles.bondQuote}>
                            "You are not just feeding a body; you are shaping a heart."
                        </div>
                    </div>

                    <div className={styles.bondVisual}>
                        <div className={styles.photoContainer}>
                            <img src="/mom_child.png" alt="Mother and child connecting" className={styles.realPhoto} />
                            <div className={styles.photoOverlay}></div>
                        </div>

                        <svg viewBox="0 0 400 400" className={styles.overlaySvg}>
                            <defs>
                                <filter id="connection-glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <linearGradient id="flow-grad-bond" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 0.8 }} />
                                    <stop offset="100%" style={{ stopColor: '#ec407a', stopOpacity: 0.8 }} />
                                </linearGradient>
                            </defs>

                            <circle cx="200" cy="200" r="80" fill="none" stroke="#fce4ec" strokeWidth="2" opacity="0.6">
                                <animate attributeName="r" values="80;100;80" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
                            </circle>

                            <path d="M 100,280 Q 150,150 280,180" fill="none" stroke="url(#flow-grad-bond)" strokeWidth="3" filter="url(#connection-glow)" strokeLinecap="round">
                                <animate attributeName="stroke-dasharray" from="0,300" to="300,0" dur="4s" repeatCount="indefinite" />
                            </path>

                            <circle r="4" fill="#ec407a">
                                <animateMotion dur="4s" repeatCount="indefinite" path="M 100,280 Q 150,150 280,180" />
                                <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                            </circle>
                            <circle r="3" fill="#fff">
                                <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M 100,280 Q 150,150 280,180" />
                                <animate attributeName="opacity" values="0;1;0" dur="4s" begin="2s" repeatCount="indefinite" />
                            </circle>

                            <g transform="translate(100, 280) scale(0.8)">
                                <path d="M 0 -10 C -10 -20 -25 -5 -10 5 L 0 15 L 10 5 C 25 -5 10 -20 0 -10" fill="#ec407a">
                                    <animateTransform attributeName="transform" type="scale" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                                </path>
                            </g>
                            <g transform="translate(280, 180) scale(0.6)">
                                <path d="M 0 -10 C -10 -20 -25 -5 -10 5 L 0 15 L 10 5 C 25 -5 10 -20 0 -10" fill="#fff">
                                    <animateTransform attributeName="transform" type="scale" values="0.6;0.8;0.6" dur="2s" begin="1s" repeatCount="indefinite" />
                                </path>
                            </g>
                        </svg>
                    </div>
                </div>
            </section>

            <section className={styles.simulationContainer} id="simulations">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Interactive Body Changes Simulator</h2>
                    <p className={styles.sectionSubtitle}>Visualize how your body changes throughout your breastfeeding journey</p>
                </div>
                <div className={styles.simulationGrid}>
                    <div className={styles.simPanel}>
                        <h3><i className="fas fa-female"></i> Body Changes Timeline</h3>
                        <div className={styles.weekSliderContainer}>
                            <div className={styles.weekDisplay} style={{ color: '#d81b60', fontSize: '1.4rem' }}>{currentWeekData.title}</div>
                            <input
                                type="range"
                                className={styles.weekSlider}
                                min="0"
                                max="52"
                                value={week}
                                onChange={(e) => setWeek(parseInt(e.target.value))}
                                step="1"
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#555', marginTop: '0.5rem' }}>
                                <span>Birth</span>
                                <span>26 Weeks</span>
                                <span>52 Weeks</span>
                            </div>
                        </div>
                        <canvas ref={canvasRef} id="bodyChangesCanvas" style={{ width: '100%', height: '400px', background: 'white', borderRadius: '12px' }}></canvas>
                    </div>

                    <div className={styles.simPanel}>
                        <h3><i className="fas fa-list-alt"></i> What's Happening</h3>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', minHeight: '200px' }}>
                            {currentWeekData.changes.map((change: any, idx: number) => (
                                <div key={idx} className="change-item" style={{ padding: '1rem', marginBottom: '0.75rem', background: 'rgba(236,64,122,0.05)', borderLeft: '4px solid #ec407a', borderRadius: '8px' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#d81b60' }}>{change.title}</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>{change.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Explore By Theme</h2>
                    <p className={styles.sectionSubtitle}>20 core breastfeeding topics organized by theme</p>
                </div>

                <div className={styles.themeNav}>
                    {Object.entries(themes).map(([key, data]) => (
                        <button
                            key={key}
                            // @ts-ignore
                            className={`${styles.themeBtn} ${activeTheme === key ? styles.active : ''} ${styles[key] || ''}`}
                            onClick={() => setActiveTheme(key)}
                            // @ts-ignore
                            style={activeTheme === key ? { background: data.color, color: 'white', borderColor: data.color } : { borderColor: data.color }}
                        >
                            <i className="fas fa-circle" style={{ marginRight: '8px' }}></i> {data.title}
                        </button>
                    ))}
                </div>

                <div className={styles.themeSection} style={{ marginBottom: '5rem', animation: 'fadeIn 0.5s ease' }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '3rem',
                        marginBottom: '2rem',
                        textAlign: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                    }}>
                        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>{activeThemeData.icon}</span>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>{activeThemeData.title}</h2>
                        <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '700px', margin: '0 auto' }}>{activeThemeData.description}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {activeTopics.map(topic => (
                            <div key={topic.id} style={{
                                background: 'white',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                transition: 'all 0.4s',
                                border: '2px solid transparent',
                                cursor: 'pointer'
                            }}
                                className="topic-card"
                                onClick={() => handleTopicClick(topic)}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                                }}
                            >
                                {exploredTopics.includes(topic.id) && (
                                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '30px', height: '30px', background: '#4caf50', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}><i className="fas fa-check"></i></div>
                                )}
                                <div style={{
                                    padding: '2rem',
                                    background: `linear-gradient(135deg, ${activeThemeData.color}0D, ${activeThemeData.color}26)`
                                }}>
                                    <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>{topic.icon}</span>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', color: '#212121' }}>{topic.title}</h3>
                                    <span style={{
                                        display: 'inline-block',
                                        fontSize: '0.75rem',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '999px',
                                        background: 'rgba(236,64,122,0.1)',
                                        color: '#c2185b',
                                        fontWeight: '600'
                                    }}>Topic {topic.id}</span>
                                </div>
                                <div style={{ padding: '1.5rem 2rem' }}>
                                    <p style={{ color: '#555', marginBottom: '1rem', fontSize: '0.95rem' }}>{topic.preview}</p>
                                    <button style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: '#ec407a',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <i className="fas fa-expand-alt"></i> Explore Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section id="bio-twin" className={`${styles.fadeInUp} bio-twin-section`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2><i className={`fa-solid fa-dna ${styles.heroAccent}`}></i> Bio-Twin Simulation Lab</h2>
                        <p>Interactive dashboard visualizing the biology of lactation.</p>
                    </div>

                    <div className={`narrator-bar ${narrator.type}`}>
                        <div className="narrator-text">
                            <h3>{narrator.main}</h3>
                            <p>{narrator.sub}</p>
                        </div>
                    </div>

                    <div className="bio-grid">
                        <div className="bio-card">
                            <div className="bio-card-header">
                                <span>Time: <span style={{ color: '#d81b60' }}>{state.clockTime}</span></span>
                                <button onClick={toggleSim} className="sim-toggle-btn">
                                    <i className={`fa-solid ${state.running ? 'fa-pause-circle' : 'fa-play-circle'}`}></i>
                                </button>
                            </div>

                            {[
                                { label: 'Hydration', val: state.hydration, icon: 'droplet', color: '#42a5f5' },
                                { label: 'Prolactin', val: state.hormones, icon: 'wand-magic-sparkles', color: '#ab47bc' },
                                { label: 'Energy', val: state.energy, icon: 'bolt', color: '#ffa726' }
                            ].map(metric => (
                                <div key={metric.label} className="bio-metric">
                                    <div className="bio-label">
                                        <span><i className={`fa-solid fa-${metric.icon}`} style={{ color: metric.color }}></i> {metric.label}</span>
                                        <span>{Math.floor(metric.val)}%</span>
                                    </div>
                                    <div className="bio-track"><div className="bio-fill" style={{ width: `${metric.val}%`, background: metric.color }}></div></div>
                                </div>
                            ))}

                            <div className="stash-box">
                                <div className="stash-label"><i className="fa-solid fa-snowflake"></i> Freezer Stash</div>
                                <div className="stash-val">{state.stash} <span className="stash-unit">oz</span></div>
                            </div>
                        </div>

                        <div className="bio-card">
                            <BreastfeedingSimulator
                                milk={state.milk}
                                babyActive={babyActive}
                                pumpActive={pumpActive}
                                sleepActive={sleepActive}
                                overlayText={overlayText}
                            />
                            <div className="hunger-status">
                                <strong>BABY HUNGER: {Math.floor(state.hunger)}%</strong>
                                <div className="bio-track"><div className="bio-fill" style={{ width: `${state.hunger}%`, background: '#ef5350' }}></div></div>
                            </div>
                        </div>

                        <div className="bio-card">
                            <div className="bio-card-header">Take Action</div>
                            <button className={`bio-btn ${state.isBusy ? 'disabled' : ''}`} onClick={actNurse}>
                                <div className="bio-icon"><i className="fa-solid fa-person-breastfeeding"></i></div>
                                <div><strong>Nurse Baby</strong><span>Direct feed. Hormonal boost.</span></div>
                            </button>
                            <button className={`bio-btn ${state.isBusy ? 'disabled' : ''}`} onClick={actPump}>
                                <div className="bio-icon"><i className="fa-solid fa-bottle-droplet"></i></div>
                                <div><strong>Pump Milk</strong><span>Build stash. Empty breasts.</span></div>
                            </button>
                            <button className={`bio-btn ${state.isBusy ? 'disabled' : ''}`} onClick={actHydrate}>
                                <div className="bio-icon"><i className="fa-solid fa-glass-water"></i></div>
                                <div><strong>Hydrate</strong><span>Increase flow rate.</span></div>
                            </button>
                            <button className={`bio-btn ${state.isBusy ? 'disabled' : ''}`} onClick={actSleep}>
                                <div className="bio-icon"><i className="fa-solid fa-bed"></i></div>
                                <div><strong>Rest / Nap</strong><span>Restore energy & sanity.</span></div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.fadeInUp} latch-section`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Master the Latch</h2>
                        <p className={styles.sectionSubtitle}>Proper positioning is key to pain-free breastfeeding.</p>
                    </div>
                    <LatchSimulator3D />
                </div>
            </section>

            <section className={`${styles.fadeInUp} nutrition-section`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Fuel Your Supply</h2>
                        <p className={styles.sectionSubtitle}>Optimizing your nutrition for successful lactation.</p>
                    </div>
                    <div className="nutrient-grid">
                        {nutritionData.map(n => (
                            <div key={n.name} className="nutrient-card" style={{ '--card-color': n.color } as any}>
                                <div className="nutrient-header">
                                    <div className="nutrient-icon" style={{ background: n.color }}>{n.icon}</div>
                                    <div>
                                        <div className="nutrient-name">{n.name}</div>
                                        <div className="nutrient-role">{n.role}</div>
                                    </div>
                                </div>
                                <div className="impact-meter">
                                    <div className="meter-label"><span>Impact</span><span>{n.val}%</span></div>
                                    <div className="meter-bar"><div className="meter-fill" style={{ width: `${n.val}%`, background: n.color }}></div></div>
                                </div>
                                <div className="food-sources">
                                    <div className="source-title">Top Sources:</div>
                                    <div className="food-tags">
                                        {n.sources.map(s => <span key={s} className="food-tag">{s}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <button
                            className={styles.btnPrimary}
                            style={{ padding: '16px 40px', borderRadius: '30px', fontSize: '16px', fontWeight: '800', border: 'none', cursor: 'pointer' }}
                            onClick={() => window.location.href = ROUTES.NUTRITION_GUIDE}
                        >
                            Open Comprehensive Nutrition Guide
                        </button>
                    </div>
                </div>
            </section>

            <section className={`${styles.fadeInUp} lifestyle-section`}>
                <div className="container">
                    <div className="lifestyle-wheel">
                        <div className="wheel-container">
                            <div className="wheel-visual">
                                <LifestyleWheel />
                            </div>
                            <div className="lifestyle-factors">
                                <div className="factor-item" style={{ '--factor-color': '#ec407a' } as any}>
                                    <div className="factor-header">
                                        <div className="factor-icon"><i className="fa-solid fa-utensils"></i></div>
                                        <h3 className="factor-title">Optimal Nutrition</h3>
                                    </div>
                                    <p className="factor-desc">A nutrient-dense diet supports the high metabolic cost of milk production.</p>
                                </div>
                                <div className="factor-item" style={{ '--factor-color': '#42a5f5' } as any}>
                                    <div className="factor-header">
                                        <div className="factor-icon"><i className="fa-solid fa-tint"></i></div>
                                        <h3 className="factor-title">Consistent Hydration</h3>
                                    </div>
                                    <p className="factor-desc">Since milk is 87% water, staying hydrated is critical for volume.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid #eee' }}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Beyond the First Months</h2>
                            <p className={styles.sectionSubtitle}>Planning for your long-term health and family goals.</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
                            <div style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧭</div>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Contraception Compass</h3>
                                <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>Navigate your family planning options while breastfeeding with our expert interactive guide.</p>
                                <button className={styles.btnPrimary} style={{ width: '100%', borderRadius: '20px' }} onClick={() => navigate(ROUTES.OTC_GUIDE)}>Open Compass</button>
                            </div>
                            <div style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧘</div>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Postpartum Wellness</h3>
                                <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>Restore your physical and emotional balance after the intense early nursing phase.</p>
                                <button className={styles.btnPrimary} style={{ width: '100%', borderRadius: '20px' }} onClick={() => navigate(ROUTES.POSTPARTUM)}>Recovery Guide</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            <div className={`${styles.modalBackdrop} ${selectedTopic ? styles.active : ''}`} onClick={() => setSelectedTopic(null)}></div>
            <div className={`${styles.modal} ${selectedTopic ? styles.active : ''}`}>
                {selectedTopic && (
                    <>
                        <div className={styles.modalHeader}>
                            <button className={styles.modalClose} onClick={() => setSelectedTopic(null)}>×</button>
                            <h2 className={styles.modalTitle} style={{ color: '#d81b60' }}>
                                <span style={{ marginRight: '1rem' }}>{selectedTopic.icon}</span>
                                {selectedTopic.title}
                            </h2>
                        </div>
                        <div className={styles.modalBody}>
                            {Object.entries(selectedTopic.attrs).map(([key, value]) => (
                                <div key={key} className={styles.attrSection}>
                                    <h3>
                                        <i className={`fas fa-${getAttrIcon(key)}`}></i>
                                        {getAttrName(key)}
                                    </h3>
                                    <p>{value as string}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Progress HUD */}
            <div className={styles.progressHud}>
                <div className={styles.hudTitle}>
                    <i className="fas fa-trophy" style={{ color: '#ec407a' }}></i>
                    Journey Progress
                </div>
                <div className={styles.progressBarBg}>
                    <div className={styles.progressBar} style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className={styles.hudStats}>
                    <span>{exploredTopics.length} / 20 Explored</span>
                    <span style={{ fontWeight: 'bold', color: '#ec407a' }}>{progressPercent}%</span>
                </div>
            </div>
        </div>
    );
};

export default BreastfeedingJourney;
