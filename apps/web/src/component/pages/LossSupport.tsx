import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routeConstants';
import { useLossSupportLogic } from '../hooks/useLossSupportLogic';
import { HealingParticleBackground } from '../canvas/LossSupportCanvas';
import './legacy/loss-support.css';

const LossSupport: React.FC = () => {
    const navigate = useNavigate();
    const {
        activeJournalTab,
        setActiveJournalTab,
        activeOrbitCategory,
        setActiveOrbitCategory,
        activeReadinessType,
        setActiveReadinessType,
        activeScenario,
        setActiveScenario,
        activeRitual,
        setActiveRitual,
        flippedStars,
        toggleStar,
        openAccordions,
        toggleAccordion,
        scrollToSection
    } = useLossSupportLogic();

    return (
        <div className="loss-support-page">
            <header className="site-header">
                <div className="nav-container">
                    <div className="logo">
                        <a href="/"><i className="fas fa-heart-broken"></i> Nari Sangha</a>
                    </div>
                    <nav className="main-nav">
                        <a href="/products">Product</a>
                        <a href="/about">About Us</a>
                        <a href="/services">Services</a>
                        {/* Stories Link Removed */}
                    </nav>
                    <div className="nav-actions">
                        <a href="#crisis-support" className="btn-support" style={{ background: 'var(--crisis-red)', borderColor: 'var(--crisis-red)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 600 }}>24/7 Crisis Support</a>
                        <a href="/login" className="btn-secondary-3d" style={{ padding: '0.5rem 1.2rem', minHeight: 'auto' }}>Sign In</a>
                    </div>
                </div>
            </header>

            <section className="hero-constellation">
                <div className="constellation-bg">
                    <HealingParticleBackground />
                    <div className="gradient-morph"></div>
                </div>

                <div className="hero-content">
                    <div className="hero-badge-3d">
                        <i className="fas fa-dove"></i> You Are Not Alone
                    </div>

                    <div className="grief-acknowledged">
                        <h1 className="hero-title-3d">
                            Healing After <br />
                            <span className="title-emphasis">Pregnancy Loss</span>
                        </h1>
                        <p className="hero-desc">
                            Whether you're experiencing a miscarriage, stillbirth, or processing a past loss,
                            this is a safe space for your grief, questions, and healing journey.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                        <button className="btn-primary-3d" onClick={() => scrollToSection('understanding')}>
                            <i className="fas fa-book-medical"></i> Understanding Loss
                        </button>
                        <button className="btn-secondary-3d" onClick={() => scrollToSection('emotions')}>
                            <i className="fas fa-heart-pulse"></i> Emotional Support
                        </button>
                        <button className="btn-secondary-3d" onClick={() => navigate(ROUTES.JOURNEYS)} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                            <i className="fas fa-arrow-left"></i> Back to Paths
                        </button>
                    </div>

                    <div className="warning-grid" id="crisis-support" style={{ marginTop: '3rem' }}>
                        <div className="warning-icon">🆘</div>
                        <div className="warning-content" style={{ textAlign: 'left' }}>
                            <h3>In Crisis?</h3>
                            <p>National Suicide Prevention Lifeline: <strong>988</strong> | Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong></p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="page-shell">
                <section className="section-block">
                    <div className="card-base intro-card">
                        <h2>🕊️ A Message to You</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-soft)' }}>
                            Pregnancy loss is deeply personal, and there is no "right" way to grieve. Whether your loss
                            happened this week or years ago, at 6 weeks or 40 weeks, your pain is real and your baby's
                            life mattered. This resource is here to support you with medical information, emotional guidance,
                            and a path toward healing—at your own pace.
                        </p>
                        <div style={{ marginTop: '1.5rem', borderLeft: '4px solid var(--primary-pink)', paddingLeft: '1rem', fontStyle: 'italic', color: 'var(--text-main)', textAlign: 'left' }}>
                            <p>"We acknowledge your baby. We honor your grief. We stand with you in your healing."</p>
                        </div>
                    </div>
                </section>

                <div className="healing-ribbon-wrapper">
                    <section className="section-block" id="understanding">
                        <div className="section-header">
                            <h2>Understanding Your Loss</h2>
                            <p>Medical facts presented with compassion</p>
                        </div>

                        <div className="journal-container">
                            <div className="journal-sidebar">
                                <button className={`journal-tab ${activeJournalTab === 'early-miscarriage' ? 'active' : ''}`} onClick={() => setActiveJournalTab('early-miscarriage')}>
                                    <div className="tab-icon">🌸</div>
                                    <div className="tab-text">
                                        <span className="tab-title">Early Miscarriage</span>
                                        <span className="tab-sub">First 12 Weeks</span>
                                    </div>
                                    <i className="fas fa-chevron-right tab-arrow"></i>
                                </button>

                                <button className={`journal-tab ${activeJournalTab === 'late-miscarriage' ? 'active' : ''}`} onClick={() => setActiveJournalTab('late-miscarriage')}>
                                    <div className="tab-icon">🌺</div>
                                    <div className="tab-text">
                                        <span className="tab-title">Late Miscarriage</span>
                                        <span className="tab-sub">12-20 Weeks</span>
                                    </div>
                                    <i className="fas fa-chevron-right tab-arrow"></i>
                                </button>

                                <button className={`journal-tab ${activeJournalTab === 'stillbirth' ? 'active' : ''}`} onClick={() => setActiveJournalTab('stillbirth')}>
                                    <div className="tab-icon">🦋</div>
                                    <div className="tab-text">
                                        <span className="tab-title">Stillbirth</span>
                                        <span className="tab-sub">After 20 Weeks</span>
                                    </div>
                                    <i className="fas fa-chevron-right tab-arrow"></i>
                                </button>
                            </div>

                            <div className="journal-content">
                                {activeJournalTab === 'early-miscarriage' && (
                                    <div className="journal-page active">
                                        <div className="page-header">
                                            <h3>Early Miscarriage</h3>
                                            <span className="stat-badge">10-20% of pregnancies</span>
                                        </div>
                                        <div className="page-body">
                                            <div className="insight-box">
                                                <div className="insight-icon">🧬</div>
                                                <div className="insight-text">
                                                    <strong>The "Why":</strong> Most often (50-70%) caused by chromosomal abnormalities. It is a biological event, not a result of your actions.
                                                </div>
                                            </div>
                                            <div className="treatment-accordion">
                                                <h4>Treatment Paths</h4>
                                                {[
                                                    { id: 'early-expectant', title: '⏳ Expectant (Natural)', content: 'Allows natural completion (2-6 weeks). Success rate ~80%.' },
                                                    { id: 'early-medical', title: '💊 Medical (Pills)', content: 'Medication (Misoprostol) accelerates the process at home. Success rate 70-90%.' },
                                                    { id: 'early-surgical', title: '🏥 Surgical (D&C)', content: 'Quick outpatient procedure under anesthesia. Success rate 99%.' }
                                                ].map(item => (
                                                    <div key={item.id} className={`accordion-item ${openAccordions.includes(item.id) ? 'open' : ''}`} onClick={() => toggleAccordion(item.id)}>
                                                        <div className="acc-head"><span>{item.title}</span> <i className="fas fa-plus"></i></div>
                                                        <div className="acc-body">{item.content}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="alert-mini">
                                                <i className="fas fa-exclamation-circle"></i>
                                                <span><strong>Call Doctor if:</strong> Soaking 2 pads/hr or fever &gt; 100.4°F.</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeJournalTab === 'late-miscarriage' && (
                                    <div className="journal-page active">
                                        <div className="page-header">
                                            <h3>Late Miscarriage</h3>
                                            <span className="stat-badge">1-2% of pregnancies</span>
                                        </div>
                                        <div className="page-body">
                                            <div className="insight-box blue-theme">
                                                <div className="insight-icon">💧</div>
                                                <div className="insight-text">
                                                    <strong>Context:</strong> Often related to cervical insufficiency or infection. Because you may have felt movement, the silence can feel deafening.
                                                </div>
                                            </div>
                                            <p style={{ marginTop: '1rem', color: 'var(--text-soft)' }}>Physical recovery involves labor-like cramping. Lactation may occur, which can be emotionally triggering.</p>
                                        </div>
                                    </div>
                                )}

                                {activeJournalTab === 'stillbirth' && (
                                    <div className="journal-page active">
                                        <div className="page-header">
                                            <h3>Stillbirth</h3>
                                            <span className="stat-badge">After 20 weeks</span>
                                        </div>
                                        <div className="page-body">
                                            <p style={{ marginBottom: '1.5rem' }}>Labor and delivery will occur. This is a moment of profound meeting and parting.</p>
                                            <div className="memory-grid">
                                                <div className="mem-item">📸 Photos</div>
                                                <div className="mem-item">👣 Footprints</div>
                                                <div className="mem-item">🧸 Holding</div>
                                                <div className="mem-item">✂️ Hair Lock</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <div className="ribbon-connector">
                        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                    </div>

                    <section className="section-block emotions-section" id="emotions">
                        <div className="section-header">
                            <h2>The Waves of Grief</h2>
                            <p>Feelings are not facts—they are energy moving through you</p>
                        </div>

                        <div className="constellation-grid">
                            {[
                                { id: 'star-fog', icon: '🌫️', title: 'The Fog', sub: 'Shock & Denial', text: "Numbness is nature's way of managing pain too great to feel all at once. Take it slow." },
                                { id: 'star-fire', icon: '🔥', title: 'The Fire', sub: 'Anger & Rage', text: "Anger is pain's bodyguard. Scream into a pillow, run, write. Let the fire burn out safely.", staggered: true },
                                { id: 'star-spiral', icon: '🌪️', title: 'The Spiral', sub: 'Guilt & Blame', text: "It was not your fault. Biology is imperfect. You did everything you could with what you knew." },
                                { id: 'star-light', icon: '✨', title: 'The Light', sub: 'Integration', text: "You don't 'move on,' you move forward with them. Joy will return, different but real.", staggered: true }
                            ].map(star => (
                                <div key={star.id} className={`star-card ${star.staggered ? 'staggered' : ''} ${flippedStars.includes(star.id) ? 'flipped' : ''}`} onClick={() => toggleStar(star.id)}>
                                    <div className="star-face star-front">
                                        <div className="star-icon">{star.icon}</div>
                                        <h4>{star.title}</h4>
                                        <span>{star.sub}</span>
                                    </div>
                                    <div className="star-face star-back">
                                        <p>{star.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="ptsd-note">
                            <div className="ptsd-icon">🧠</div>
                            <div>
                                <strong>Trauma & PTSD:</strong> If flashbacks or nightmares persist &gt;1 month, therapies like EMDR can help heal the trauma loop.
                            </div>
                        </div>
                    </section>

                    <section className="section-block" id="resources">
                        <div className="section-header">
                            <h2>🤝 The Circle of Support</h2>
                            <p>You are the center of this journey, but you are never alone.</p>
                        </div>

                        <div className="orbit-system-container">
                            <div className="orbit-nav-area">
                                <div className="orbit-rings">
                                    <div className="ring-1"></div>
                                    <div className="ring-2"></div>
                                    <div className="ring-3"></div>
                                </div>
                                <div className="orbit-center">
                                    <i className="fas fa-user-heart"></i>
                                    <span>YOU</span>
                                </div>
                                {[
                                    { id: 'crisis', icon: 'fa-phone-volume', label: 'Crisis', angle: '0deg' },
                                    { id: 'therapy', icon: 'fa-user-md', label: 'Therapy', angle: '90deg' },
                                    { id: 'groups', icon: 'fa-users', label: 'Groups', angle: '180deg' },
                                    { id: 'online', icon: 'fa-laptop', label: 'Online', angle: '270deg' }
                                ].map(planet => (
                                    <button key={planet.id} className={`orbit-planet ${activeOrbitCategory === planet.id ? 'active' : ''}`} onClick={() => setActiveOrbitCategory(planet.id)} style={{ '--angle': planet.angle } as any}>
                                        <div className="planet-icon"><i className={`fas ${planet.icon}`}></i></div>
                                        <span className="planet-label">{planet.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="orbit-display-area">
                                {activeOrbitCategory === 'crisis' && (
                                    <div className="orbit-content active">
                                        <div className="content-header-strip crisis-theme">
                                            <h3>🚨 Immediate Crisis Support</h3>
                                            <p>Available 24/7. Confidential. Free.</p>
                                        </div>
                                        <div className="resource-cards-list">
                                            <div className="res-card featured">
                                                <div className="rc-icon">📞</div>
                                                <div className="rc-info">
                                                    <h4>988 Lifeline</h4>
                                                    <p>National Suicide Prevention</p>
                                                    <a href="tel:988" className="rc-btn">Call 988</a>
                                                </div>
                                            </div>
                                            <div className="res-card featured">
                                                <div className="rc-icon">💬</div>
                                                <div className="rc-info">
                                                    <h4>Crisis Text Line</h4>
                                                    <p>Text 'HOME' to 741741</p>
                                                    <a href="sms:741741&body=HOME" className="rc-btn">Text Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Add other orbit categories following the same pattern */}
                                {activeOrbitCategory === 'therapy' && (
                                    <div className="orbit-content active">
                                        <div className="content-header-strip therapy-theme">
                                            <h3>🧠 Professional Guidance</h3>
                                            <p>Therapists specialized in grief and trauma.</p>
                                        </div>
                                        <div className="resource-cards-list">
                                            <div className="res-card">
                                                <div className="rc-icon">🔎</div>
                                                <div className="rc-info">
                                                    <h4>Psychology Today</h4>
                                                    <p>Find a Grief Specialist</p>
                                                    <a href="https://www.psychologytoday.com" target="_blank" rel="noreferrer" className="rc-btn outline">Search</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeOrbitCategory === 'groups' && (
                                    <div className="orbit-content active">
                                        <div className="content-header-strip groups-theme">
                                            <h3>👥 Community Circles</h3>
                                            <p>Find others who truly understand your loss.</p>
                                        </div>
                                        <div className="resource-cards-list">
                                            <div className="res-card">
                                                <div className="rc-icon">👶</div>
                                                <div className="rc-info">
                                                    <h4>Share Support</h4>
                                                    <p>Pregnancy & Infant Loss</p>
                                                    <a href="https://nationalshare.org" target="_blank" rel="noreferrer" className="rc-btn outline">Find Group</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeOrbitCategory === 'online' && (
                                    <div className="orbit-content active">
                                        <div className="content-header-strip online-theme">
                                            <h3>💻 Digital Resources</h3>
                                            <p>Books, forums, and medical knowledge.</p>
                                        </div>
                                        <div className="resource-cards-list">
                                            <div className="res-card">
                                                <div className="rc-icon">📖</div>
                                                <div className="rc-info">
                                                    <h4>Recommended Books</h4>
                                                    <ul className="mini-list">
                                                        <li>"Empty Cradle, Broken Heart"</li>
                                                        <li>"Loved Baby"</li>
                                                        <li>"I Had a Miscarriage"</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="section-block" id="future">
                        <div className="section-header">
                            <h2>🌈 The Path Forward</h2>
                            <p>Navigating future pregnancies when the time feels right</p>
                        </div>

                        <div className="future-compass-container">
                            <div className="compass-card">
                                <h3>Am I Ready?</h3>
                                <p className="compass-subtitle">Explore the two sides of readiness</p>
                                <div className="toggle-switch-container">
                                    <button className={`toggle-btn ${activeReadinessType === 'physical' ? 'active' : ''}`} onClick={() => setActiveReadinessType('physical')}>Physical Body</button>
                                    <button className={`toggle-btn ${activeReadinessType === 'emotional' ? 'active' : ''}`} onClick={() => setActiveReadinessType('emotional')}>Emotional Heart</button>
                                </div>

                                <div className={`readiness-content ${activeReadinessType === 'physical' ? 'active' : ''}`}>
                                    <div className="check-item">
                                        <div className="check-icon">🩸</div>
                                        <div><strong>Cycle Return:</strong> Usually 4-6 weeks after loss.</div>
                                    </div>
                                    <div className="check-item">
                                        <div className="check-icon">🩺</div>
                                        <div><strong>Doctor's OK:</strong> Often recommended to wait 1 normal cycle.</div>
                                    </div>
                                </div>

                                <div className={`readiness-content ${activeReadinessType === 'emotional' ? 'active' : ''}`}>
                                    <div className="check-item">
                                        <div className="check-icon">❤️‍🩹</div>
                                        <div><strong>Grief Space:</strong> Have you processed the initial shock?</div>
                                    </div>
                                    <div className="check-item">
                                        <div className="check-icon">😰</div>
                                        <div><strong>Anxiety Check:</strong> Are you prepared for pregnancy anxiety?</div>
                                    </div>
                                </div>
                            </div>

                            <div className="medical-toolkit">
                                <div className="toolkit-header">
                                    <h3>🩺 When to Seek Help</h3>
                                    <p>Click a scenario to see medical guidance</p>
                                </div>
                                <div className="scenario-buttons">
                                    <button className={`scen-btn ${activeScenario === 1 ? 'active' : ''}`} onClick={() => setActiveScenario(1)}>1st Loss</button>
                                    <button className={`scen-btn ${activeScenario === 2 ? 'active' : ''}`} onClick={() => setActiveScenario(2)}>2nd Loss</button>
                                    <button className={`scen-btn ${activeScenario === 3 ? 'active' : ''}`} onClick={() => setActiveScenario(3)}>Recurrent (3+)</button>
                                </div>
                                <div className="scenario-display">
                                    {activeScenario === 1 && (
                                        <div className="scen-content active">
                                            <h4>After First Loss</h4>
                                            <p><strong>Standard Care:</strong> Usually no testing is needed. 10-20% of pregnancies end in miscarriage due to random genetic errors.</p>
                                            <div className="action-badge">Focus on Healing</div>
                                        </div>
                                    )}
                                    {activeScenario === 2 && (
                                        <div className="scen-content active">
                                            <h4>After Second Loss</h4>
                                            <p><strong>Standard Care:</strong> Some doctors begin basic testing (thyroid, clotting). Others wait for a third loss.</p>
                                            <div className="action-badge">Discuss with OBGYN</div>
                                        </div>
                                    )}
                                    {activeScenario === 3 && (
                                        <div className="scen-content active">
                                            <h4>Recurrent Loss (3+)</h4>
                                            <p><strong>Comprehensive Workup:</strong> Genetic karyotyping, anatomical scans (hysteroscopy), and autoimmune panels are strongly recommended.</p>
                                            <div className="action-badge warning">See Specialist (RE)</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section-block" id="memorial">
                        <div className="section-header">
                            <h2>💝 Your Memory Garden</h2>
                            <p>Click the icons to discover ways to honor your baby</p>
                        </div>

                        <div className="garden-interactive">
                            <div className="garden-scene">
                                {[
                                    { id: 'candle', icon: '🕯️', label: 'Light' },
                                    { id: 'tree', icon: '🌱', label: 'Grow' },
                                    { id: 'letter', icon: '✍️', label: 'Write' },
                                    { id: 'box', icon: '📦', label: 'Keep' },
                                    { id: 'jewelry', icon: '💎', label: 'Wear' }
                                ].map(item => (
                                    <button key={item.id} className={`garden-item item-${item.id}`} onClick={() => setActiveRitual(item.id)} aria-label={`${item.label} a Ritual`}>
                                        {item.icon}
                                        <span className="item-label">{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="ritual-display-card">
                                {activeRitual === 'candle' && (
                                    <div className="ritual-content active">
                                        <div className="ritual-icon-lg">🕯️</div>
                                        <h3>Wave of Light</h3>
                                        <p>Every October 15th at 7pm, participate in the global "Wave of Light" by lighting a candle for one hour to honor all babies gone too soon.</p>
                                    </div>
                                )}
                                {activeRitual === 'tree' && (
                                    <div className="ritual-content active">
                                        <div className="ritual-icon-lg">🌱</div>
                                        <h3>Living Tribute</h3>
                                        <p>Plant a tree, rosebush, or indoor plant. Watching it grow can provide a comforting, living connection to your baby's memory.</p>
                                    </div>
                                )}
                                {activeRitual === 'letter' && (
                                    <div className="ritual-content active">
                                        <div className="ritual-icon-lg">✍️</div>
                                        <h3>Unsent Letters</h3>
                                        <p>Write a letter to your baby telling them about your love, your hopes, and your grief. Keep it in a journal or burn it to release the words.</p>
                                    </div>
                                )}
                                {activeRitual === 'box' && (
                                    <div className="ritual-content active">
                                        <div className="ritual-icon-lg">📦</div>
                                        <h3>Memory Box</h3>
                                        <p>Create a special box for ultrasound photos, hospital bracelets, or pregnancy tests. It gives you a tangible place to visit your baby.</p>
                                    </div>
                                )}
                                {activeRitual === 'jewelry' && (
                                    <div className="ritual-content active">
                                        <div className="ritual-icon-lg">💎</div>
                                        <h3>Wearable Love</h3>
                                        <p>Wear a birthstone ring, an initial necklace, or a simple heart. It allows you to carry them with you into the world silently.</p>
                                    </div>
                                )}
                                <p className="garden-instruction">Select an item in the garden above to see details.</p>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="section-block" style={{ marginTop: '4rem' }}>
                    <div className="card-base" style={{ textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--deep-pink)' }}>You Will Survive This</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-soft)' }}>
                            Right now, the pain may feel unbearable. But countless women have walked this path before you,
                            and they've found ways not just to survive, but eventually to live fully again.
                            <br /><br />
                            <strong>Your baby mattered. Your grief matters. You matter.</strong>
                        </p>
                    </div>
                </section>
            </div>

            <footer className="site-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Nari Sangha</h4>
                        <p>Supporting women through every stage of life.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <a href="#understanding">Understanding Loss</a>
                        <a href="#emotions">Emotional Support</a>
                        <a href="#crisis-support">Crisis Help</a>
                    </div>
                    <div className="footer-section">
                        <h4>Emergency</h4>
                        <p><strong>Crisis:</strong> 988</p>
                        <p><strong>PSI Help:</strong> 1-800-944-4773</p>
                    </div>
                </div>
                <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p>&copy; 2026 Nari Sangha. Educational purposes only.</p>
                    <p><em>In loving memory of all babies gone too soon. 🕊️</em></p>
                </div>
            </footer>
        </div>
    );
};

export default LossSupport;
