import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routeConstants';
import { useBreastfeedingLogic } from '../hooks/useBreastfeedingLogic';
import { BreastfeedingSimulator, LatchSimulator3D, LifestyleWheel } from '../canvas/BreastfeedingCanvas';
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
        sleepActive
    } = useBreastfeedingLogic();

    // const [modalTopic, setModalTopic] = useState<any>(null);


    const nutritionData = [
        { name: 'Protein', role: 'Tissue Repair', val: 85, color: '#ff6b6b', icon: '🍗', sources: ['Eggs', 'Lentils', 'Chicken'] },
        { name: 'Calcium', role: 'Bone Density', val: 75, color: '#4ecdc4', icon: '🥛', sources: ['Milk', 'Yogurt', 'Leafy Greens'] },
        { name: 'Iron', role: 'Energy Levels', val: 65, color: '#f39c12', icon: '🥬', sources: ['Spinach', 'Red Meat', 'Beans'] },
        { name: 'Water', role: 'Milk Volume', val: 95, color: '#3498db', icon: '💧', sources: ['Filtered Water', 'Coconut Water'] }
    ];

    return (
        <div className="breastfeeding-page">
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="badge">Interactive Simulation</span>
                        <h1 className="hero-title">Master Your <span className="title-em">Breastfeeding Journey</span></h1>
                        <p className="hero-desc">Experience the biological wonder of lactation through our Bio-Twin simulation lab and interactive guides.</p>
                        <div className="hero-actions">
                            <a href="#bio-twin" className="btn-primary">Begin Simulation</a>
                            <button className="btn-primary" style={{ background: 'transparent', border: '2px solid var(--pink)', color: 'var(--pink)' }} onClick={() => navigate(ROUTES.JOURNEYS)}>← Back to Paths</button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="bio-twin" className="bio-twin-section">
                <div className="bio-wrapper">
                    <div className="bio-header">
                        <h2><i className="fa-solid fa-dna"></i> Bio-Twin Simulation Lab</h2>
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

            <section className="latch-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Master the Latch</h2>
                        <p className="section-subtitle">Proper positioning is key to pain-free breastfeeding.</p>
                    </div>
                    <LatchSimulator3D />
                </div>
            </section>

            <section className="nutrition-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Fuel Your Supply</h2>
                        <p className="section-subtitle">Optimizing your nutrition for successful lactation.</p>
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
                            className="btn-primary"
                            style={{ padding: '16px 40px', borderRadius: '30px', fontSize: '16px', fontWeight: '800', border: 'none', cursor: 'pointer' }}
                            onClick={() => window.location.href = ROUTES.NUTRITION_GUIDE}
                        >
                            Open Comprehensive Nutrition Guide
                        </button>
                    </div>
                </div>
            </section>

            <section className="lifestyle-section">
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
                        <div className="section-header">
                            <h2 className="section-title">Beyond the First Months</h2>
                            <p className="section-subtitle">Planning for your long-term health and family goals.</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
                            <div style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧭</div>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Contraception Compass</h3>
                                <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>Navigate your family planning options while breastfeeding with our expert interactive guide.</p>
                                <button className="btn-primary" style={{ width: '100%', borderRadius: '20px' }} onClick={() => navigate(ROUTES.OTC_GUIDE)}>Open Compass</button>
                            </div>
                            <div style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧘</div>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Postpartum Wellness</h3>
                                <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>Restore your physical and emotional balance after the intense early nursing phase.</p>
                                <button className="btn-primary" style={{ width: '100%', borderRadius: '20px' }} onClick={() => navigate(ROUTES.POSTPARTUM)}>Recovery Guide</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BreastfeedingJourney;
