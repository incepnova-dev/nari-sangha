import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routeConstants';
import { usePregnancyLogic, trimesterData, symptomsData, hospitalBagItems } from '../hooks/usePregnancyLogic';
import { ParticleBackground, PregnancySimulator } from '../canvas/PregnancyJourneyCanvas';
import './legacy/pregnancy-journey.css';

const PregnancyJourney: React.FC = () => {
    const navigate = useNavigate();
    const {
        currentWeek,
        setCurrentWeek,
        activeTrimester,
        setActiveTrimester,
        isHudCollapsed,
        setIsHudCollapsed,
        activeBagCategory,
        setActiveBagCategory,
        checkedBagItems,
        toggleBagItem,
        view,
        setView,
        layers,
        setLayers,
        currentTrimester,
        currentWeekData,
        getTrimesterPhrase,
        getUterusSize,
        animateGrowth,
        isAnimating,
        calculateNutrition
    } = usePregnancyLogic();

    const [preWeight, setPreWeight] = useState(60);
    const [activityLevel, setActivityLevel] = useState(1.55);
    const [nutritionWeek, setNutritionWeek] = useState(20);

    const nutritionResults = useMemo(() => calculateNutrition(preWeight, activityLevel, nutritionWeek), [calculateNutrition, preWeight, activityLevel, nutritionWeek]);

    const scrollToWeekTracker = () => {
        document.getElementById('weekTracker')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToSimulator = () => {
        document.getElementById('pregnancySimulator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const jumpToTrimester = (tri: number) => {
        const weekRanges: Record<number, number> = { 1: 6, 2: 20, 3: 32 };
        setCurrentWeek(weekRanges[tri]);
        scrollToWeekTracker();
    };

    const bagItemsByCategory = useMemo(() => {
        const currentCategoryItems = hospitalBagItems[activeBagCategory as keyof typeof hospitalBagItems];
        const categories: Record<string, typeof currentCategoryItems> = {};
        currentCategoryItems.forEach(item => {
            if (!categories[item.category]) categories[item.category] = [];
            categories[item.category].push(item);
        });
        return categories;
    }, [activeBagCategory]);

    const totalBagItems = useMemo(() => {
        return Object.values(hospitalBagItems).flat().length;
    }, []);

    const checkedCount = checkedBagItems.length;
    const percent = Math.round((checkedCount / totalBagItems) * 100);

    const getProgressNote = (pct: number) => {
        if (pct === 0) return "Start checking items to track your progress!";
        if (pct < 30) return "Good start! Keep packing...";
        if (pct < 60) return "You're making great progress!";
        if (pct < 90) return "Almost done! Just a few more items.";
        if (pct < 100) return "So close! You've got this!";
        return "🎉 All packed and ready for the big day!";
    };

    return (
        <div className="pregnancy-journey-page">
            {/* REVOLUTIONARY HERO: PREGNANCY CONSTELLATION */}
            <section className="hero-constellation">
                <div className="constellation-bg">
                    <ParticleBackground />
                    <div className="gradient-morph"></div>
                </div>

                <div className="hero-content-wrapper">
                    <div className="hero-left">
                        <div className="hero-eyebrow">
                            <span className="pulse-dot"></span>
                            YOUR PREGNANCY JOURNEY
                        </div>

                        <h1 className="hero-title-3d">
                            <span className="title-line">Experience Your</span>
                            <span className="title-line title-emphasis">40-Week Miracle</span>
                            <span className="title-line">Week by Week</span>
                        </h1>

                        <p className="hero-description">
                            An immersive, interactive guide through every trimester, every week, and every milestone
                            of your pregnancy journey with 3D visualizations, personalized nutrition plans, and expert guidance.
                        </p>

                        <div className="badge-constellation">
                            <div className="badge-orbit">
                                <div className="hero-badge-3d badge-1">
                                    <span className="badge-icon">👶</span>
                                    <span>40 Weeks Tracked</span>
                                </div>
                                <div className="hero-badge-3d badge-2">
                                    <span className="badge-icon">🧬</span>
                                    <span>3D Baby Simulator</span>
                                </div>
                                <div className="hero-badge-3d badge-3">
                                    <span className="badge-icon">📱</span>
                                    <span>Smart Reminders</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-cta-constellation">
                            <button className="btn-primary-3d" onClick={scrollToWeekTracker}>
                                <span className="btn-icon">🎯</span>
                                <span>Start Your Journey</span>
                                <span className="btn-arrow">↓</span>
                                <div className="btn-shine"></div>
                            </button>
                            <button className="btn-secondary-3d" onClick={scrollToSimulator}>
                                <span className="btn-icon">🤰</span>
                                <span>See Baby Grow</span>
                            </button>
                            <button className="btn-secondary-3d" onClick={() => navigate(ROUTES.JOURNEYS)} style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)' }}>
                                <span>← Back to Paths</span>
                            </button>
                        </div>
                    </div>

                    <div className="hero-right">
                        <div className="stage-constellation">
                            <div className="hormone-core">
                                <div className="core-pulse"></div>
                                <div className="core-pulse" style={{ animationDelay: '0.5s' }}></div>
                                <div className="core-label">YOUR<br />JOURNEY</div>
                            </div>

                            <div className="stage-orb orb-1" style={{ '--delay': '0.2s' } as any} onClick={() => jumpToTrimester(1)}>
                                <div className="orb-glow"></div>
                                <div className="orb-content">
                                    <span className="orb-number">01</span>
                                    <span className="orb-icon">🌱</span>
                                    <div className="orb-label">First<br />Trimester</div>
                                    <div className="orb-sublabel">Weeks 1-12</div>
                                </div>
                                <div className="orb-tooltip">
                                    <div className="tooltip-arrow"></div>
                                    <h4>First Trimester</h4>
                                    <p>Foundation phase where major organs begin forming. Morning sickness common but baby developing rapidly.</p>
                                </div>
                            </div>

                            <div className="stage-orb orb-2" style={{ '--delay': '0.4s' } as any} onClick={() => jumpToTrimester(2)}>
                                <div className="orb-glow"></div>
                                <div className="orb-content">
                                    <span className="orb-number">02</span>
                                    <span className="orb-icon">💗</span>
                                    <div className="orb-label">Second<br />Trimester</div>
                                    <div className="orb-sublabel">Weeks 13-26</div>
                                </div>
                                <div className="orb-tooltip">
                                    <div className="tooltip-arrow"></div>
                                    <h4>Second Trimester</h4>
                                    <p>The "golden period" - energy returns, baby movements felt, and bump becomes visible. Anatomy scan reveals details.</p>
                                </div>
                            </div>

                            <div className="stage-orb orb-3" style={{ '--delay': '0.6s' } as any} onClick={() => jumpToTrimester(3)}>
                                <div className="orb-glow"></div>
                                <div className="orb-content">
                                    <span className="orb-number">03</span>
                                    <span className="orb-icon">🎀</span>
                                    <div className="orb-label">Third<br />Trimester</div>
                                    <div className="orb-sublabel">Weeks 27-40</div>
                                </div>
                                <div className="orb-tooltip">
                                    <div className="tooltip-arrow"></div>
                                    <h4>Third Trimester</h4>
                                    <p>Final countdown! Baby gains weight, lungs mature, and you prepare for delivery. Nesting instinct kicks in.</p>
                                </div>
                            </div>

                            <svg className="connection-lines" viewBox="0 0 500 500">
                                <defs>
                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#ec407a', stopOpacity: 0.6 }} />
                                        <stop offset="100%" style={{ stopColor: '#d81b60', stopOpacity: 0.3 }} />
                                    </linearGradient>
                                </defs>

                                <path className="connection-path" d="M 50 150 Q 250 250 250 250" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="5,5">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                                </path>

                                <path className="connection-path" d="M 400 100 Q 250 250 250 250" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="5,5">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                                </path>

                                <path className="connection-path" d="M 250 450 L 250 250" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="5,5">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <div className="page-shell">
                {/* INTERACTIVE WEEK TRACKER */}
                <section className="section-block" id="weekTracker">
                    <div className="section-title-row">
                        <div>
                            <h2>📅 Your Week-by-Week Timeline</h2>
                            <p className="section-tagline">Select your current week to see personalized insights</p>
                        </div>
                    </div>

                    <div className="week-selector-wrapper">
                        <div className="week-input-control">
                            <label htmlFor="weekSlider">Current Week:</label>
                            <div className="slider-display">
                                <input
                                    type="range"
                                    id="weekSlider"
                                    min="1"
                                    max="40"
                                    value={currentWeek}
                                    onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                                />
                                <div className="week-display">
                                    <span className="week-number" id="weekNumber">{currentWeek}</span>
                                    <span className="week-label">weeks</span>
                                </div>
                            </div>
                        </div>

                        <div className="trimester-indicator" id="trimesterIndicator">
                            <span className="tri-badge">{currentTrimester}</span>
                        </div>
                    </div>

                    <div className="week-timeline">
                        <div className="timeline-track">
                            <div className="timeline-fill" id="timelineFill" style={{ width: `${(currentWeek / 40) * 100}%` }}></div>
                            <div className="timeline-milestones">
                                {[1, 12, 26, 40].map((w) => (
                                    <div key={w} className="milestone" style={{ left: `${(w / 40) * 100}%` }} data-week={w}>
                                        <div className="milestone-dot"></div>
                                        <div className="milestone-label">Week {w}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="week-details-card" id="weekDetailsCard">
                        <div className="week-card-header">
                            <div>
                                <h3 id="weekTitle">Week {currentWeek}: {getTrimesterPhrase(currentWeek)}</h3>
                                <p id="weekSubtitle">Your baby is the size of a {currentWeekData.size}</p>
                            </div>
                            <div className="week-emoji" id="weekEmoji">{currentWeekData.emoji}</div>
                        </div>

                        <div className="week-stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">📏</div>
                                <div className="stat-value" id="babyLength">{currentWeekData.length}</div>
                                <div className="stat-label">Baby Length</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">⚖️</div>
                                <div className="stat-value" id="babyWeight">{currentWeekData.weight}</div>
                                <div className="stat-label">Baby Weight</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">🫀</div>
                                <div className="stat-value" id="heartRate">{currentWeekData.heartRate}</div>
                                <div className="stat-label">Heart Rate</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">📅</div>
                                <div className="stat-value" id="daysLeft">{(40 - currentWeek) * 7} days</div>
                                <div className="stat-label">Days Until Due</div>
                            </div>
                        </div>

                        <div className="week-development" id="weekDevelopment">
                            <h4>🧬 This Week's Development</h4>
                            <ul id="developmentList">
                                {currentWeekData.development.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>

                        <div className="week-tips" id="weekTips">
                            <h4>💡 Tips for This Week</h4>
                            <div className="tip-chips">
                                {currentWeekData.tips.map((tip, i) => <span key={i} className="tip-chip">{tip}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3D PREGNANCY SIMULATOR */}
                <section className="section-block" id="pregnancySimulator">
                    <div className="section-title-row">
                        <div>
                            <h2>🤰 Interactive Pregnancy Simulator</h2>
                            <p className="section-tagline">Watch your body transform week by week</p>
                        </div>
                    </div>

                    <div className="simulator-dashboard">
                        <div className="simulator-controls">
                            <div className="control-panel">
                                <h3>Visualization Controls</h3>
                                <div className="control-group">
                                    <label>View Angle:</label>
                                    <div className="view-buttons">
                                        <button className={`view-btn ${view === 'front' ? 'active' : ''}`} onClick={() => setView('front')}>Front View</button>
                                        <button className={`view-btn ${view === 'side' ? 'active' : ''}`} onClick={() => setView('side')}>Side View</button>
                                        <button className={`view-btn ${view === 'xray' ? 'active' : ''}`} onClick={() => setView('xray')}>X-Ray View</button>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label>Show Layers:</label>
                                    <div className="layer-toggles">
                                        <label className="toggle-label">
                                            <input type="checkbox" checked={layers.baby} onChange={() => setLayers(prev => ({ ...prev, baby: !prev.baby }))} />
                                            <span>Baby Position</span>
                                        </label>
                                        <label className="toggle-label">
                                            <input type="checkbox" checked={layers.organs} onChange={() => setLayers(prev => ({ ...prev, organs: !prev.organs }))} />
                                            <span>Organs</span>
                                        </label>
                                        <label className="toggle-label">
                                            <input type="checkbox" checked={layers.measures} onChange={() => setLayers(prev => ({ ...prev, measures: !prev.measures }))} />
                                            <span>Measurements</span>
                                        </label>
                                    </div>
                                </div>
                                <button className="animate-btn" onClick={animateGrowth} disabled={isAnimating}>
                                    <i className={`fas ${isAnimating ? 'fa-spinner fa-spin' : 'fa-play'}`}></i> {isAnimating ? 'Animating...' : 'Animate Growth'}
                                </button>
                            </div>

                            <div className="simulator-stats">
                                <h4>Current Stats</h4>
                                <div className="stats-list">
                                    <div className="stat-row">
                                        <span className="stat-name">Uterus Size:</span>
                                        <span className="stat-value">{getUterusSize(currentWeek)}</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-name">Fundal Height:</span>
                                        <span className="stat-value">{Math.max(0, currentWeek - 20 + 20)} cm</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-name">Amniotic Fluid:</span>
                                        <span className="stat-value">{200 + currentWeek * 10} ml</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-name">Blood Volume:</span>
                                        <span className="stat-value">+{Math.min(50, currentWeek * 1.5)}%</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-name">Weight Gain:</span>
                                        <span className="stat-value">{Math.round(currentWeek * 0.5)} lbs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="simulator-visual">
                            <PregnancySimulator week={currentWeek} view={view} layers={layers} />
                            <div className="view-label" style={{ textTransform: 'capitalize' }}>{view === 'xray' ? 'X-Ray' : view} View</div>
                        </div>
                    </div>
                </section>

                {/* TRIMESTER-BY-TRIMESTER JOURNEY */}
                <section className="section-block">
                    <div className="section-title-row">
                        <div>
                            <h2>🌸 Your Trimester Journey</h2>
                            <p className="section-tagline">Explore each phase with detailed milestones</p>
                        </div>
                    </div>

                    <div className="journey">
                        <div className="journey-track">
                            <button className={`track-dot ${activeTrimester === 'tri1' ? 'active' : ''}`} onClick={() => setActiveTrimester('tri1')}>
                                <span>🌱</span> First Trimester
                            </button>
                            <button className={`track-dot ${activeTrimester === 'tri2' ? 'active' : ''}`} onClick={() => setActiveTrimester('tri2')}>
                                <span>💗</span> Second Trimester
                            </button>
                            <button className={`track-dot ${activeTrimester === 'tri3' ? 'active' : ''}`} onClick={() => setActiveTrimester('tri3')}>
                                <span>🎀</span> Third Trimester
                            </button>
                        </div>

                        <div id="journeyStageContent">
                            <div className="journey-stage-card">
                                <div className="stage-top">
                                    <div>
                                        <div className="stage-kicker">{trimesterData[activeTrimester as keyof typeof trimesterData].kicker}</div>
                                        <h3 className="stage-title">{trimesterData[activeTrimester as keyof typeof trimesterData].title}</h3>
                                        <p className="stage-one-liner">{trimesterData[activeTrimester as keyof typeof trimesterData].description}</p>
                                        <div className="stage-badges">
                                            {trimesterData[activeTrimester as keyof typeof trimesterData].badges.map((badge, i) => (
                                                <span key={i} className="stage-badge">{badge}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="stage-steps">
                                    {trimesterData[activeTrimester as keyof typeof trimesterData].phases.map((phase, index) => (
                                        <div key={index} className="step">
                                            <button onClick={(e) => {
                                                const target = e.currentTarget.parentElement;
                                                target?.classList.toggle('open');
                                            }}>
                                                {phase.title}
                                                <span className="chev">▼</span>
                                            </button>
                                            <div className="step-body">{phase.content}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ESSENTIAL PREGNANCY NUTRITION */}
                <section className="section-block">
                    <div className="section-title-row">
                        <div>
                            <h2>🥗 Essential Pregnancy Nutrition</h2>
                            <p className="section-tagline">Personalized daily requirements calculator</p>
                        </div>
                    </div>

                    <div className="nutrition-calculator">
                        <div className="calc-inputs">
                            <div className="input-group">
                                <label>Pre-Pregnancy Weight (kg):</label>
                                <input type="number" value={preWeight} onChange={(e) => setPreWeight(parseFloat(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label>Current Week:</label>
                                <input type="number" value={nutritionWeek} onChange={(e) => setNutritionWeek(parseInt(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label>Activity Level:</label>
                                <select value={activityLevel} onChange={(e) => setActivityLevel(parseFloat(e.target.value))}>
                                    <option value="1.2">Sedentary</option>
                                    <option value="1.375">Lightly Active</option>
                                    <option value="1.55">Moderately Active</option>
                                    <option value="1.725">Very Active</option>
                                </select>
                            </div>
                        </div>

                        <div className="nutrition-results">
                            <h4>Your Daily Nutritional Needs</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>Calories</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#d81b60' }}>{nutritionResults.tdee}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>kcal/day</div>
                                </div>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>Protein</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#d81b60' }}>{nutritionResults.protein}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>grams/day</div>
                                </div>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>Carbs</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#d81b60' }}>{nutritionResults.carbs}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>grams/day</div>
                                </div>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>Healthy Fats</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#d81b60' }}>{nutritionResults.fats}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>grams/day</div>
                                </div>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>Water</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#d81b60' }}>{nutritionResults.water}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>liters/day</div>
                                </div>
                            </div>
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
                                💡 These are general estimates. Consult your healthcare provider for personalized nutrition advice.
                            </p>
                        </div>
                    </div>
                </section>

                {/* PREGNANCY SYMPTOMS & CONCERNS */}
                <section className="section-block">
                    <div className="section-title-row">
                        <div>
                            <h2>🌡️ Common Pregnancy Concerns</h2>
                            <p className="section-tagline">Know what's normal and when to call your doctor</p>
                        </div>
                    </div>

                    <div className="journey-subhead">
                        <h3>Symptom Tracker</h3>
                        <p>Click on each symptom to learn management strategies</p>
                    </div>

                    <div className="symptom-flip-grid">
                        {symptomsData.map((symptom, i) => (
                            <button key={i} className="flip symptom-card" onClick={(e) => e.currentTarget.classList.toggle('is-flipped')}>
                                <div className="flip-inner">
                                    <div className="flip-face flip-front">
                                        <div>
                                            <div className="tiny">{symptom.trimester}</div>
                                            <strong>{symptom.title}</strong>
                                            <p>{symptom.desc}</p>
                                        </div>
                                        <div className="flip-action">Tap to learn more →</div>
                                    </div>
                                    <div className="flip-face flip-back">
                                        <strong>Management Tips:</strong>
                                        <ul style={{ textAlign: 'left', fontSize: '0.85rem', margin: '0.5rem 0' }}>
                                            {symptom.tips.map((tip, j) => <li key={j}>{tip}</li>)}
                                        </ul>
                                        <div className="ask">{symptom.ask}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* HOSPITAL BAG CHECKLIST */}
                <section className="section-block">
                    <div className="section-title-row">
                        <div>
                            <h2>🧳 Hospital Bag Checklist</h2>
                            <p className="section-tagline">Pack smart by week 36 - Interactive builder</p>
                        </div>
                    </div>

                    <div className="bag-builder">
                        <div className="bag-categories">
                            <button className={`bag-tab ${activeBagCategory === 'mom' ? 'active' : ''}`} onClick={() => setActiveBagCategory('mom')}>👩 For Mom</button>
                            <button className={`bag-tab ${activeBagCategory === 'baby' ? 'active' : ''}`} onClick={() => setActiveBagCategory('baby')}>👶 For Baby</button>
                            <button className={`bag-tab ${activeBagCategory === 'partner' ? 'active' : ''}`} onClick={() => setActiveBagCategory('partner')}>🤝 For Partner</button>
                            <button className={`bag-tab ${activeBagCategory === 'essentials' ? 'active' : ''}`} onClick={() => setActiveBagCategory('essentials')}>📋 Essentials</button>
                        </div>

                        <div className="bag-content">
                            <div className={`bag-section active`}>
                                <div className="bag-grid">
                                    {Object.entries(bagItemsByCategory).map(([category, items]) => (
                                        <div key={category} className="bag-item-card">
                                            <h4>{category}</h4>
                                            {items.map(item => (
                                                <label key={item.id} className="bag-check">
                                                    <input type="checkbox" checked={checkedBagItems.includes(item.id)} onChange={() => toggleBagItem(item.id)} />
                                                    <span>{item.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bag-progress">
                            <div className="progress-header">
                                <span>Packing Progress</span>
                                <span>{percent}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                            </div>
                            <p className="progress-note">{getProgressNote(percent)}</p>
                        </div>
                    </div>
                </section>

                {/* RELATED CARE & NEXT STEPS */}
                <section className="section-block" style={{ borderTop: '1px solid #eee', paddingTop: '60px' }}>
                    <div className="section-title-row">
                        <div>
                            <h2>🚀 Your Next Steps in Care</h2>
                            <p className="section-tagline">Continuity of care for you and your baby</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '30px' }}>
                        <div style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>💉</div>
                            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Vaccination Plan</h4>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Review mandatory vaccines for pregnancy and your baby's first year.</p>
                            <button className="btn-secondary-3d" style={{ width: '100%' }} onClick={() => navigate(ROUTES.VACCINATION)}>Open Vaccine Guide</button>
                        </div>

                        <div style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📋</div>
                            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Prenatal Screening</h4>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Understand key diagnostic tests, ultrasounds, and blood panels.</p>
                            <button className="btn-secondary-3d" style={{ width: '100%' }} onClick={() => navigate(ROUTES.SCREENING)}>Open Screening Guide</button>
                        </div>

                        <div style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🥦</div>
                            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Deep Nutrition</h4>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Optimizing your diet for fetal development and postpartum recovery.</p>
                            <button className="btn-secondary-3d" style={{ width: '100%' }} onClick={() => navigate(ROUTES.NUTRITION_GUIDE)}>Nutrition Guide</button>
                        </div>

                        <div style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🍼</div>
                            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Lactation Prep</h4>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Prepare for your breastfeeding journey with interactive latch simulations.</p>
                            <button className="btn-secondary-3d" style={{ width: '100%' }} onClick={() => navigate(ROUTES.BREASTFEEDING)}>Breastfeeding Journey</button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Floating HUD */}
            <div className={`floating-hud ${isHudCollapsed ? 'collapsed' : ''}`} id="floatingHud">
                <div className="hud-content">
                    <div className="hud-label">Your Week:</div>
                    <div className="hud-week">{currentWeek}</div>
                    <div className="hud-label">Baby Size:</div>
                    <div className="hud-size">{currentWeekData.emoji} {currentWeekData.size}</div>
                </div>
                <button className="hud-toggle" onClick={() => setIsHudCollapsed(!isHudCollapsed)}>
                    <i className="fas fa-chevron-up"></i>
                </button>
            </div>
        </div>
    );
};

export default PregnancyJourney;
