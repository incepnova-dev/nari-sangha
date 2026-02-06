import React, { useEffect } from 'react';
import '../../../nari-swasthya-complete/gestational_diabetes.css';

const GestationalDiabetes: React.FC = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/js/gestational_diabetes.js";
        script.async = true;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
    }, []);

    const topicCards = [
        { id: 'understanding', icon: '📚', num: '01', title: 'Understanding Gestational Diabetes', preview: 'What is GDM, why it happens, and how it affects 3-25% of pregnancies in India', tags: ['Basics', 'Definition'], time: '5 min read', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { id: 'risk-factors', icon: '⚠️', num: '02', title: 'Risk Factors for Indian Women', preview: 'Genetic predisposition, lifestyle factors, and high-risk categories specific to South Asian women', tags: ['Risk Assessment', 'Prevention'], time: '7 min read', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { id: 'screening', icon: '🔬', num: '03', title: 'Screening and Diagnosis', preview: 'OGTT testing, diagnostic criteria, and screening protocols (DIPSI/WHO guidelines)', tags: ['Testing', 'ICMR Guidelines'], time: '6 min read', bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { id: 'symptoms', icon: '🌡️', num: '04', title: 'Symptoms: Mild to Severe', preview: 'Recognizing symptoms from mild thirst to critical warning signs requiring immediate attention', tags: ['Warning Signs', 'Emergency'], time: '8 min read', bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { id: 'doctor-visit', icon: '👨‍⚕️', num: '05', title: 'When to See Your Doctor', preview: 'Immediate, urgent, and routine care timelines for optimal GDM management', tags: ['Medical Care', 'Emergency'], time: '5 min read', bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
        { id: 'mother-impact', icon: '🤰', num: '06', title: "Impact on Mother's Health", preview: "Short-term complications and long-term health implications including Type 2 diabetes risk", tags: ['Maternal Health', 'Long-term'], time: '9 min read', bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
        { id: 'baby-impact', icon: '👶', num: '07', title: "Impact on Baby's Health", preview: 'Understanding macrosomia, birth complications, and long-term health effects on your child', tags: ['Fetal Health', 'Neonatal'], time: '8 min read', bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
        { id: 'doctor-questions', icon: '❓', num: '08', title: 'Questions to Ask Your Doctor', preview: "Essential questions about diagnosis, treatment, baby's health, and delivery planning", tags: ['Communication', 'Empowerment'], time: '6 min read', bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
        { id: 'medical-management', icon: '💊', num: '09', title: 'Medical Management', preview: 'Dietary management, exercise, insulin therapy, and medication options', tags: ['Treatment', 'Medications'], time: '10 min read', bg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
        { id: 'monitoring', icon: '📊', num: '10', title: 'Blood Glucose Monitoring', preview: 'Home monitoring guidelines, target levels, and tracking tools (ACOG/ADA standards)', tags: ['Self-Care', 'Daily Tracking'], time: '7 min read', bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
        { id: 'diet', icon: '🥗', num: '11', title: 'Dietary Guidelines for Indian Women', preview: 'Indian meal planning, foods to include and avoid, and practical tips for managing GDM', tags: ['Nutrition', 'Indian Diet'], time: '12 min read', bg: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
        { id: 'exercise', icon: '💪', num: '12', title: 'Exercise and Physical Activity', preview: 'Safe exercises during pregnancy, guidelines, and benefits for glucose control', tags: ['Fitness', 'Safety'], time: '8 min read', bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { id: 'pregnancy-stages', icon: '📅', num: '13', title: 'Journey Through Pregnancy Stages', preview: 'Trimester-by-trimester guide to managing GDM from diagnosis to delivery', tags: ['Timeline', 'Care Plan'], time: '11 min read', bg: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' },
        { id: 'warning-signs', icon: '🚨', num: '14', title: 'Alarming Signs to Watch For', preview: 'Critical warning signs for both mother and baby requiring immediate medical attention', tags: ['Emergency', 'Safety'], time: '6 min read', bg: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' },
        { id: 'family-support', icon: '👨‍👩‍👧‍👦', num: '15', title: 'Family Support and Care', preview: 'How family members can support, create supportive environment, and emotional needs', tags: ['Support System', 'Family Care'], time: '9 min read', bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
        { id: 'prevention', icon: '🛡️', num: '16', title: 'Preventive Steps for Future', preview: 'Preventing GDM in next pregnancy and reducing Type 2 diabetes risk', tags: ['Prevention', 'Future Health'], time: '7 min read', bg: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)' },
        { id: 'postpartum', icon: '🌸', num: '17', title: 'Postpartum Care', preview: 'After delivery care, glucose monitoring, and long-term follow-up schedule', tags: ['Recovery', 'Follow-up'], time: '8 min read', bg: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' },
        { id: 'breastfeeding', icon: '🤱', num: '18', title: 'Breastfeeding with GDM History', preview: 'Benefits of breastfeeding for mother and baby, tips for successful nursing', tags: ['Breastfeeding', 'Benefits'], time: '6 min read', bg: 'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)' },
        { id: 'lifestyle', icon: '🏃‍♀️', num: '19', title: 'Lifestyle Modifications', preview: 'Long-term dietary changes, physical activity, and sustainable weight management', tags: ['Lifestyle', 'Sustainability'], time: '10 min read', bg: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' },
        { id: 'myths', icon: '🔍', num: '20', title: 'Traditional Practices & Myths', preview: 'Separating facts from fiction, safe traditional practices, and what to avoid', tags: ['Myths', 'Facts'], time: '8 min read', bg: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)' },
        { id: 'emotional-health', icon: '🧘‍♀️', num: '21', title: 'Emotional and Mental Health', preview: 'Managing anxiety, stress, guilt, and maintaining mental wellbeing during pregnancy', tags: ['Mental Health', 'Coping'], time: '9 min read', bg: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' },
        { id: 'work-life', icon: '💼', num: '22', title: 'Work and Daily Life Management', preview: 'Managing GDM at workplace, social situations, and daily routines', tags: ['Work-Life', 'Practical Tips'], time: '7 min read', bg: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)' },
        { id: 'financial', icon: '💰', num: '23', title: 'Financial Considerations', preview: 'Healthcare costs, government schemes, insurance coverage, and cost-saving strategies', tags: ['Finances', 'Resources'], time: '6 min read', bg: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)' },
        { id: 'technology', icon: '📱', num: '24', title: 'Technology and Resources', preview: 'Helpful apps, tracking tools, reliable sources (ICMR, WHO, ACOG, FOGSI)', tags: ['Technology', 'Tools'], time: '7 min read', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { id: 'delivery', icon: '🏥', num: '25', title: 'Labor and Delivery Preparation', preview: 'What to expect during labor, delivery planning, and immediate postpartum care', tags: ['Delivery', 'Planning'], time: '10 min read', bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    ];

    return (
        <div className="gestational-diabetes-page">
            <div className="page-shell">

                {/* HERO SECTION */}
                <section className="hero">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="badge-icon">🤰</span>
                            <span className="badge-text">Supporting 3-25% of Pregnancies in India</span>
                        </div>
                        <h1>Your Gestational Diabetes Journey</h1>
                        <p className="hero-subtitle">
                            Empowering expecting mothers with medically-accurate information about gestational diabetes.
                            Knowledge is your strongest ally for a healthy pregnancy.
                        </p>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">25 Topics</span>
                                <span className="stat-label">Comprehensive coverage</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">50-70%</span>
                                <span className="stat-label">Can prevent Type 2 with lifestyle</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">24-28 Weeks</span>
                                <span className="stat-label">Typical screening time</span>
                            </div>
                        </div>

                        <div className="hero-cta-row">
                            <button className="btn-primary" onClick={() => (window as any).scrollToJourney?.()}>Begin Your Journey</button>
                            <button className="btn-secondary" onClick={() => (window as any).openQuiz?.()}>Take Knowledge Quiz</button>
                        </div>
                    </div>

                    {/* ANIMATED PREGNANCY VISUALIZATION */}
                    <div className="hero-visual-3d">
                        <div className="pregnancy-3d-container">
                            <div className="pregnancy-core">
                                <div className="mother-silhouette">
                                    <svg viewBox="0 0 200 300" className="mother-icon">
                                        <defs>
                                            <linearGradient id="motherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#ff6b9d', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#c44569', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <ellipse cx="100" cy="80" rx="50" ry="60" fill="url(#motherGradient)" opacity="0.3" />
                                        <circle cx="100" cy="50" r="25" fill="url(#motherGradient)" opacity="0.4" />
                                        <ellipse cx="100" cy="140" rx="60" ry="70" fill="url(#motherGradient)" opacity="0.5" />
                                        <circle cx="100" cy="140" r="25" fill="#ffc3a0" opacity="0.6" />
                                    </svg>
                                </div>
                                <div className="pulse-ring ring-1"></div>
                                <div className="pulse-ring ring-2"></div>
                                <div className="pulse-ring ring-3"></div>
                            </div>

                            <div className="health-icon icon-1">
                                <div className="icon-inner">🩺</div>
                                <div className="icon-label">Monitoring</div>
                            </div>
                            <div className="health-icon icon-2">
                                <div className="icon-inner">🥗</div>
                                <div className="icon-label">Nutrition</div>
                            </div>
                            <div className="health-icon icon-3">
                                <div className="icon-inner">💪</div>
                                <div className="icon-label">Exercise</div>
                            </div>
                            <div className="health-icon icon-4">
                                <div className="icon-inner">💊</div>
                                <div className="icon-label">Treatment</div>
                            </div>
                            <div className="health-icon icon-5">
                                <div className="icon-inner">❤️</div>
                                <div className="icon-label">Baby Health</div>
                            </div>

                            <div className="glucose-meter">
                                <div className="meter-reading">
                                    <span className="reading-value" id="glucoseReading">95</span>
                                    <span className="reading-unit">mg/dL</span>
                                </div>
                                <div className="meter-status status-normal">Target Range</div>
                                <div className="meter-bar">
                                    <div className="meter-fill" id="meterFill"></div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-info-box">
                            <div className="info-badge">
                                <span className="badge-icon">✨</span>
                                <span className="badge-text">Interactive Learning</span>
                            </div>
                            <h3 className="info-title">Your Personalized Health Companion</h3>
                            <p className="info-text">
                                Navigate through 25 comprehensive topics with interactive visualizations,
                                real-time tracking tools, and evidence-based guidance from ICMR, WHO, and ACOG.
                            </p>
                        </div>
                    </div>
                </section>

                {/* JOURNEY TIMELINE */}
                <section id="journey" className="journey-section">
                    <div className="section-header">
                        <div className="header-badge">
                            <span className="badge-pulse"></span>
                            <span className="badge-text">Your 40-Week Journey</span>
                        </div>
                        <h2 className="section-title">Pregnancy Timeline with GDM</h2>
                        <p className="section-subtitle">
                            Track your journey from screening to postpartum care. Click on each trimester to explore detailed information.
                        </p>
                    </div>

                    <div className="timeline-container">
                        <div className="timeline-rail"></div>

                        <div className="timeline-stage" data-stage="first" onClick={() => (window as any).showStageDetails?.('first')}>
                            <div className="stage-marker">
                                <div className="marker-dot">1</div>
                                <div className="marker-pulse"></div>
                            </div>
                            <div className="stage-content">
                                <h3 className="stage-title">First Trimester</h3>
                                <p className="stage-weeks">Weeks 1-12</p>
                                <p className="stage-desc">Foundation &amp; Early Screening for High-Risk Women</p>
                                <div className="stage-icon">🌱</div>
                            </div>
                        </div>

                        <div className="timeline-stage" data-stage="second" onClick={() => (window as any).showStageDetails?.('second')}>
                            <div className="stage-marker">
                                <div className="marker-dot">2</div>
                                <div className="marker-pulse"></div>
                            </div>
                            <div className="stage-content">
                                <h3 className="stage-title">Second Trimester</h3>
                                <p className="stage-weeks">Weeks 13-27</p>
                                <p className="stage-desc">GDM Screening &amp; Diagnosis (24-28 weeks)</p>
                                <div className="stage-icon">🔬</div>
                            </div>
                        </div>

                        <div className="timeline-stage" data-stage="third" onClick={() => (window as any).showStageDetails?.('third')}>
                            <div className="stage-marker">
                                <div className="marker-dot">3</div>
                                <div className="marker-pulse"></div>
                            </div>
                            <div className="stage-content">
                                <h3 className="stage-title">Third Trimester</h3>
                                <p className="stage-weeks">Weeks 28-40</p>
                                <p className="stage-desc">Intensive Monitoring &amp; Delivery Preparation</p>
                                <div className="stage-icon">👶</div>
                            </div>
                        </div>

                        <div className="timeline-stage" data-stage="postpartum" onClick={() => (window as any).showStageDetails?.('postpartum')}>
                            <div className="stage-marker">
                                <div className="marker-dot">4</div>
                                <div className="marker-pulse"></div>
                            </div>
                            <div className="stage-content">
                                <h3 className="stage-title">Postpartum</h3>
                                <p className="stage-weeks">After Delivery</p>
                                <p className="stage-desc">Recovery &amp; Long-term Health Management</p>
                                <div className="stage-icon">🌸</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TOPICS EXPLORER */}
                <section id="learn" className="topics-explorer">
                    <div className="section-header">
                        <div className="header-badge">
                            <span className="badge-pulse"></span>
                            <span className="badge-text">25 Comprehensive Topics</span>
                        </div>
                        <h2 className="section-title">Complete GDM Knowledge Base</h2>
                        <p className="section-subtitle">
                            Click any topic card to explore in-depth, medically-accurate information with interactive elements.
                        </p>
                    </div>

                    <div className="topics-grid">
                        {topicCards.map((topic) => (
                            <div key={topic.id} className="topic-card" data-topic={topic.id} onClick={() => (window as any).openTopicPanel?.(topic.id)}>
                                <div className="topic-header" style={{ background: topic.bg }}>
                                    <div className="topic-icon">{topic.icon}</div>
                                    <div className="topic-number">{topic.num}</div>
                                </div>
                                <div className="topic-body">
                                    <h3 className="topic-title">{topic.title}</h3>
                                    <p className="topic-preview">{topic.preview}</p>
                                    <div className="topic-tags">
                                        {topic.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                                    </div>
                                </div>
                                <div className="topic-footer">
                                    <span className="read-time">⏱ {topic.time}</span>
                                    <span className="topic-arrow">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TRACKER SECTION */}
                <section id="tracker" className="tracker-section">
                    <div className="section-header">
                        <div className="header-badge">
                            <span className="badge-pulse"></span>
                            <span className="badge-text">Live Body Simulation</span>
                        </div>
                        <h2 className="section-title">Blood Glucose Tracker &amp; Body Simulation</h2>
                        <p className="section-subtitle">
                            Watch real-time simulation of what happens inside your body. See how glucose, insulin, and hormones interact during pregnancy with GDM.
                        </p>
                    </div>

                    <div className="simulation-controls">
                        <button className="sim-btn active" onClick={() => (window as any).setSimulationScenario?.('fasting')} id="btn-fasting">
                            <span className="sim-icon">🌅</span>
                            <span className="sim-label">Fasting State</span>
                        </button>
                        <button className="sim-btn" onClick={() => (window as any).setSimulationScenario?.('after-meal')} id="btn-after-meal">
                            <span className="sim-icon">🍽️</span>
                            <span className="sim-label">After Meal</span>
                        </button>
                        <button className="sim-btn" onClick={() => (window as any).setSimulationScenario?.('exercise')} id="btn-exercise">
                            <span className="sim-icon">💪</span>
                            <span className="sim-label">During Exercise</span>
                        </button>
                        <button className="sim-btn" onClick={() => (window as any).setSimulationScenario?.('insulin')} id="btn-insulin">
                            <span className="sim-icon">💉</span>
                            <span className="sim-label">After Insulin</span>
                        </button>
                    </div>

                    <div className="simulation-dashboard">
                        <div className="body-simulation-container">
                            <div className="sim-body-visual">
                                <canvas id="bodySimulationCanvas" width={400} height={600}></canvas>
                                <div className="particle-system" id="particleSystem">
                                    <div className="sim-particle glucose-particle" style={{ top: '20%', left: '30%' }}></div>
                                    <div className="sim-particle glucose-particle" style={{ top: '40%', left: '50%' }}></div>
                                    <div className="sim-particle glucose-particle" style={{ top: '60%', left: '35%' }}></div>
                                    <div className="sim-particle glucose-particle" style={{ top: '80%', left: '45%' }}></div>
                                    <div className="sim-particle insulin-particle" style={{ top: '25%', left: '60%' }}></div>
                                    <div className="sim-particle insulin-particle" style={{ top: '55%', left: '65%' }}></div>
                                    <div className="sim-particle insulin-particle" style={{ top: '75%', left: '55%' }}></div>
                                </div>
                                <div className="organ-labels">
                                    <div className="organ-label pancreas-label" style={{ top: '40%', left: '50%' }}>
                                        <div className="label-dot"></div>
                                        <div className="label-text">
                                            <strong>Pancreas</strong>
                                            <span className="label-status" id="pancreasStatus">Working Hard</span>
                                        </div>
                                    </div>
                                    <div className="organ-label liver-label" style={{ top: '35%', left: '55%' }}>
                                        <div className="label-dot"></div>
                                        <div className="label-text">
                                            <strong>Liver</strong>
                                            <span className="label-status" id="liverStatus">Storing Glucose</span>
                                        </div>
                                    </div>
                                    <div className="organ-label placenta-label" style={{ top: '55%', left: '48%' }}>
                                        <div className="label-dot"></div>
                                        <div className="label-text">
                                            <strong>Placenta</strong>
                                            <span className="label-status" id="placentaStatus">Producing Hormones</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="scenario-description">
                                <h4 id="scenarioTitle">Fasting State</h4>
                                <p id="scenarioDesc">Your body is using stored glucose for energy. Insulin levels are low, and the liver releases glucose to maintain blood sugar levels.</p>
                            </div>
                        </div>

                        <div className="metrics-dashboard">
                            <div className="metric-card glucose-graph-card">
                                <div className="card-header">
                                    <h3>Blood Glucose Level</h3>
                                    <div className="live-indicator">
                                        <span className="live-dot"></span>
                                        <span>LIVE</span>
                                    </div>
                                </div>
                                <div className="glucose-display">
                                    <div className="glucose-reading">
                                        <span className="reading-value" id="currentGlucose">95</span>
                                        <span className="reading-unit">mg/dL</span>
                                    </div>
                                    <div className="glucose-status" id="glucoseStatus">Target Range</div>
                                </div>
                                <canvas id="glucoseTrendChart" width={300} height={150}></canvas>
                            </div>

                            <div className="metric-card hormones-card">
                                <div className="card-header">
                                    <h3>Pregnancy Hormones</h3>
                                    <span className="info-icon" title="Hormones affecting insulin resistance">ℹ️</span>
                                </div>
                                <div className="hormone-meter">
                                    <div className="hormone-item">
                                        <div className="hormone-label">
                                            <span className="hormone-icon">🔴</span>
                                            <span className="hormone-name">Human Placental Lactogen (hPL)</span>
                                        </div>
                                        <div className="hormone-bar-container">
                                            <div className="hormone-bar" id="hplBar" style={{ width: '75%', background: 'linear-gradient(90deg, #ff6b9d, #c44569)' }}></div>
                                            <span className="hormone-value" id="hplValue">75%</span>
                                        </div>
                                    </div>
                                    <div className="hormone-item">
                                        <div className="hormone-label">
                                            <span className="hormone-icon">🟡</span>
                                            <span className="hormone-name">Cortisol</span>
                                        </div>
                                        <div className="hormone-bar-container">
                                            <div className="hormone-bar" id="cortisolBar" style={{ width: '60%', background: 'linear-gradient(90deg, #ffd93d, #f5a623)' }}></div>
                                            <span className="hormone-value" id="cortisolValue">60%</span>
                                        </div>
                                    </div>
                                    <div className="hormone-item">
                                        <div className="hormone-label">
                                            <span className="hormone-icon">🟠</span>
                                            <span className="hormone-name">Progesterone</span>
                                        </div>
                                        <div className="hormone-bar-container">
                                            <div className="hormone-bar" id="progesteroneBar" style={{ width: '80%', background: 'linear-gradient(90deg, #fa709a, #fee140)' }}></div>
                                            <span className="hormone-value" id="progesteroneValue">80%</span>
                                        </div>
                                    </div>
                                    <div className="hormone-item">
                                        <div className="hormone-label">
                                            <span className="hormone-icon">🔵</span>
                                            <span className="hormone-name">Insulin Production</span>
                                        </div>
                                        <div className="hormone-bar-container">
                                            <div className="hormone-bar" id="insulinBar" style={{ width: '45%', background: 'linear-gradient(90deg, #4facfe, #00f2fe)' }}></div>
                                            <span className="hormone-value" id="insulinValue">45%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="metric-card resistance-card">
                                <div className="card-header">
                                    <h3>Insulin Resistance</h3>
                                </div>
                                <div className="resistance-gauge">
                                    <canvas id="resistanceGauge" width={200} height={150}></canvas>
                                    <div className="gauge-value">
                                        <span id="resistancePercent">65</span>%
                                    </div>
                                    <div className="gauge-label" id="resistanceLabel">Moderate</div>
                                </div>
                            </div>
                        </div>

                        <div className="parameters-panel">
                            <div className="quick-stats">
                                <div className="stat-box">
                                    <div className="stat-icon">💧</div>
                                    <div className="stat-content">
                                        <div className="stat-label">Glucose in Bloodstream</div>
                                        <div className="stat-value" id="bloodGlucose">95 mg/dL</div>
                                    </div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-icon">🏭</div>
                                    <div className="stat-content">
                                        <div className="stat-label">Pancreas Activity</div>
                                        <div className="stat-value" id="pancreasActivity">High</div>
                                    </div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-icon">⚡</div>
                                    <div className="stat-content">
                                        <div className="stat-label">Energy Production</div>
                                        <div className="stat-value" id="energyProduction">Normal</div>
                                    </div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-icon">🍼</div>
                                    <div className="stat-content">
                                        <div className="stat-label">Baby's Glucose</div>
                                        <div className="stat-value" id="babyGlucose">Optimal</div>
                                    </div>
                                </div>
                            </div>

                            <div className="systems-status">
                                <h4>Body Systems Status</h4>
                                <div className="system-item">
                                    <div className="system-header">
                                        <span className="system-name">🫀 Cardiovascular</span>
                                        <span className="system-status status-good">Good</span>
                                    </div>
                                    <div className="system-bar">
                                        <div className="system-fill" style={{ width: '85%', background: '#10ac84' }}></div>
                                    </div>
                                </div>
                                <div className="system-item">
                                    <div className="system-header">
                                        <span className="system-name">🧠 Nervous System</span>
                                        <span className="system-status status-good">Good</span>
                                    </div>
                                    <div className="system-bar">
                                        <div className="system-fill" style={{ width: '90%', background: '#10ac84' }}></div>
                                    </div>
                                </div>
                                <div className="system-item">
                                    <div className="system-header">
                                        <span className="system-name">🔄 Metabolic</span>
                                        <span className="system-status status-warning" id="metabolicStatus">Compensating</span>
                                    </div>
                                    <div className="system-bar">
                                        <div className="system-fill" id="metabolicBar" style={{ width: '65%', background: '#f39c12' }}></div>
                                    </div>
                                </div>
                                <div className="system-item">
                                    <div className="system-header">
                                        <span className="system-name">👶 Fetal Development</span>
                                        <span className="system-status status-good">Healthy</span>
                                    </div>
                                    <div className="system-bar">
                                        <div className="system-fill" style={{ width: '95%', background: '#10ac84' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="time-tracker">
                                <h4>Timeline</h4>
                                <div className="time-display">
                                    <div className="time-icon">⏱️</div>
                                    <div className="time-info">
                                        <div className="time-elapsed" id="timeElapsed">0:00</div>
                                        <div className="time-label">Time Since Last Event</div>
                                    </div>
                                </div>
                                <div className="time-events">
                                    <div className="event-item">
                                        <span className="event-dot"></span>
                                        <span className="event-text" id="lastEvent">Fasting started</span>
                                    </div>
                                </div>
                            </div>

                            <div className="simulation-legend">
                                <h4>Legend</h4>
                                <div className="legend-items">
                                    <div className="legend-item">
                                        <div className="legend-color" style={{ background: '#ffd93d' }}></div>
                                        <span>Glucose Molecules</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-color" style={{ background: '#4facfe' }}></div>
                                        <span>Insulin Molecules</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-color" style={{ background: '#ff6b9d' }}></div>
                                        <span>Pregnancy Hormones</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-color" style={{ background: '#10ac84' }}></div>
                                        <span>Energy/ATP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tracker-tools-row">
                        <div className="tool-card">
                            <div className="tool-icon">📝</div>
                            <h3>Daily Log</h3>
                            <p>Track your glucose readings, meals, and activities in one place</p>
                            <button className="tool-btn">Start Logging</button>
                        </div>
                        <div className="tool-card">
                            <div className="tool-icon">📊</div>
                            <h3>Weekly Report</h3>
                            <p>View trends and patterns in your glucose management</p>
                            <button className="tool-btn">View Report</button>
                        </div>
                        <div className="tool-card">
                            <div className="tool-icon">🔔</div>
                            <h3>Reminders</h3>
                            <p>Set alerts for testing times, meals, and medications</p>
                            <button className="tool-btn">Set Reminders</button>
                        </div>
                        <div className="tool-card">
                            <div className="tool-icon">📈</div>
                            <h3>Target Ranges</h3>
                            <p>View and customize your glucose target ranges</p>
                            <button className="tool-btn">View Ranges</button>
                        </div>
                    </div>
                </section>

                {/* INTERACTIVE TRACKER TOOLS ROW */}
                <div className="tracker-tools-row">
                    <div className="tool-card interactive-tool" onClick={() => (window as any).openDailyLog?.()}>
                        <div className="tool-icon-animated">
                            <span className="icon-main">📝</span>
                            <span className="icon-badge">New</span>
                        </div>
                        <h3>Interactive Daily Log</h3>
                        <p>Smart tracking with instant feedback and insights</p>
                        <button className="tool-btn">Start Tracking Now →</button>
                        <div className="tool-preview">Last entry: 2 hours ago</div>
                    </div>

                    <div className="tool-card interactive-tool" onClick={() => (window as any).openWeeklyReport?.()}>
                        <div className="tool-icon-animated">
                            <span className="icon-main">📊</span>
                            <span className="icon-badge">Live</span>
                        </div>
                        <h3>AI-Powered Insights</h3>
                        <p>Personalized patterns and recommendations</p>
                        <button className="tool-btn">View My Report →</button>
                        <div className="tool-preview">85% readings in target 🎉</div>
                    </div>

                    <div className="tool-card interactive-tool" onClick={() => (window as any).openSmartReminders?.()}>
                        <div className="tool-icon-animated">
                            <span className="icon-main">🔔</span>
                            <span className="icon-badge">Smart</span>
                        </div>
                        <h3>Smart Reminders</h3>
                        <p>Adaptive alerts that learn your schedule</p>
                        <button className="tool-btn">Set Up Alerts →</button>
                        <div className="tool-preview">Next test in 45 min ⏱️</div>
                    </div>

                    <div className="tool-card interactive-tool" onClick={() => (window as any).openTargetZones?.()}>
                        <div className="tool-icon-animated">
                            <span className="icon-main">🎯</span>
                            <span className="icon-badge">Guide</span>
                        </div>
                        <h3>Target Zone Coach</h3>
                        <p>Personalized ranges with real-time guidance</p>
                        <button className="tool-btn">See My Zones →</button>
                        <div className="tool-preview">Fasting zone: ✓ Perfect</div>
                    </div>
                </div>

                {/* DAILY LOG MODAL */}
                <div className="feature-modal" id="dailyLogModal">
                    <div className="modal-content-large">
                        <button className="close-modal" onClick={() => (window as any).closeDailyLog?.()}>✕</button>
                        <div className="modal-header-gradient">
                            <div className="modal-icon">📝</div>
                            <h2>Your Daily Glucose Journey</h2>
                            <p>Track, learn, and thrive with intelligent logging</p>
                        </div>

                        <div className="modal-body">
                            <div className="log-entry-section">
                                <h3>Quick Entry</h3>
                                <div className="quick-entry-form">
                                    <div className="entry-row">
                                        <div className="entry-field">
                                            <label>Glucose Reading</label>
                                            <input type="number" placeholder="95" className="glucose-input" id="glucoseInput" />
                                            <span className="unit">mg/dL</span>
                                        </div>
                                        <div className="entry-field">
                                            <label>When</label>
                                            <select className="time-select">
                                                <option>Fasting</option>
                                                <option>After Breakfast</option>
                                                <option>After Lunch</option>
                                                <option>After Dinner</option>
                                                <option>Bedtime</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="instant-feedback" id="instantFeedback">
                                        <div className="feedback-icon">✓</div>
                                        <div className="feedback-text">
                                            <strong>Perfect!</strong> This reading is right in your target zone.
                                        </div>
                                    </div>

                                    <button className="save-entry-btn" onClick={() => (window as any).saveEntry?.()}>
                                        <span>Save Entry</span>
                                        <span className="btn-icon">→</span>
                                    </button>
                                </div>
                            </div>

                            <div className="smart-insights">
                                <h3>Today's Insights</h3>
                                <div className="insight-cards">
                                    <div className="insight-card green">
                                        <div className="insight-icon">🎯</div>
                                        <div className="insight-content">
                                            <h4>On Target</h4>
                                            <p>3 out of 4 readings in perfect range today</p>
                                        </div>
                                    </div>
                                    <div className="insight-card blue">
                                        <div className="insight-icon">💡</div>
                                        <div className="insight-content">
                                            <h4>Pattern Detected</h4>
                                            <p>Post-lunch readings slightly high after rice meals</p>
                                        </div>
                                    </div>
                                    <div className="insight-card orange">
                                        <div className="insight-icon">🍎</div>
                                        <div className="insight-content">
                                            <h4>Food Tip</h4>
                                            <p>Try brown rice or reduce portion by 25%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="what-to-track">
                                <h3>What to Track</h3>
                                <div className="track-checklist">
                                    <div className="track-item"><span className="track-icon">⏰</span><span className="track-label">Time & date of test</span></div>
                                    <div className="track-item"><span className="track-icon">💧</span><span className="track-label">Blood glucose reading</span></div>
                                    <div className="track-item"><span className="track-icon">🍽️</span><span className="track-label">Meals eaten (what & how much)</span></div>
                                    <div className="track-item"><span className="track-icon">💪</span><span className="track-label">Physical activity</span></div>
                                    <div className="track-item"><span className="track-icon">💊</span><span className="track-label">Medications/insulin doses</span></div>
                                    <div className="track-item"><span className="track-icon">😊</span><span className="track-label">How you feel</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* INTERACTIVE MEAL PLANNER */}
                <section className="meal-planner-section">
                    <div className="section-header">
                        <div className="header-badge">
                            <span className="badge-pulse"></span>
                            <span className="badge-text">Interactive Meal Builder</span>
                        </div>
                        <h2 className="section-title">GDM-Friendly Indian Meal Planner</h2>
                        <p className="section-subtitle">
                            Build your perfect plate and see instant glucose impact prediction. Drag foods to your plate!
                        </p>

                        {/* STREAK TRACKER */}
                        <div className="streak-tracker">
                            <div className="streak-flame">
                                <span className="flame-icon">🔥</span>
                                <div className="flame-glow"></div>
                            </div>
                            <div className="streak-info">
                                <div className="streak-count-wrapper">
                                    <span className="streak-count" id="streakCount">0</span>
                                    <span className="streak-unit">Day</span>
                                </div>
                                <span className="streak-label">Streak</span>
                            </div>
                            <div className="streak-message" id="streakMessage">Start building healthy habits!</div>
                            <div className="streak-progress">
                                <div className="streak-progress-bar" id="streakProgressBar">
                                    <div className="streak-progress-fill" id="streakProgressFill" style={{ width: '0%' }}></div>
                                </div>
                                <span className="streak-next-goal" id="streakNextGoal">Next: 3 days 🎯</span>
                            </div>
                        </div>
                    </div>

                    <div className="meal-planner-container">
                        {/* LEFT: Interactive Plate Builder */}
                        <div className="plate-builder-interactive">
                            <div className="meal-selector">
                                <button className="meal-time-btn active" onClick={() => (window as any).selectMealTime?.('breakfast')}>
                                    <span className="meal-icon">🌅</span>
                                    <span className="meal-name">Breakfast</span>
                                </button>
                                <button className="meal-time-btn" onClick={() => (window as any).selectMealTime?.('lunch')}>
                                    <span className="meal-icon">☀️</span>
                                    <span className="meal-name">Lunch</span>
                                </button>
                                <button className="meal-time-btn" onClick={() => (window as any).selectMealTime?.('dinner')}>
                                    <span className="meal-icon">🌙</span>
                                    <span className="meal-name">Dinner</span>
                                </button>
                                <button className="meal-time-btn" onClick={() => (window as any).selectMealTime?.('snack')}>
                                    <span className="meal-icon">🍎</span>
                                    <span className="meal-name">Snack</span>
                                </button>
                            </div>

                            {/* GUIDED MEAL WIZARD */}
                            <div className="meal-wizard" id="mealWizard">
                                <div className="wizard-toggle">
                                    <button className="wizard-toggle-btn" onClick={() => (window as any).toggleWizard?.()}>
                                        <span className="wizard-icon">🧙‍♀️</span>
                                        <span className="wizard-text">Guided Meal Builder</span>
                                        <span className="wizard-arrow">▼</span>
                                    </button>
                                </div>

                                <div className="wizard-content" id="wizardContent" style={{ display: 'none' }}>
                                    <div className="wizard-progress">
                                        <div className="wizard-step active" data-step="1">
                                            <div className="step-circle">
                                                <span className="step-number">1</span>
                                                <span className="step-check">✓</span>
                                            </div>
                                            <span className="step-label">Vegetables</span>
                                        </div>
                                        <div className="wizard-connector"></div>
                                        <div className="wizard-step" data-step="2">
                                            <div className="step-circle">
                                                <span className="step-number">2</span>
                                                <span className="step-check">✓</span>
                                            </div>
                                            <span className="step-label">Protein</span>
                                        </div>
                                        <div className="wizard-connector"></div>
                                        <div className="wizard-step" data-step="3">
                                            <div className="step-circle">
                                                <span className="step-number">3</span>
                                                <span className="step-check">✓</span>
                                            </div>
                                            <span className="step-label">Carbs</span>
                                        </div>
                                        <div className="wizard-connector"></div>
                                        <div className="wizard-step" data-step="4">
                                            <div className="step-circle">
                                                <span className="step-number">4</span>
                                                <span className="step-check">✓</span>
                                            </div>
                                            <span className="step-label">Review</span>
                                        </div>
                                    </div>

                                    <div className="wizard-body">
                                        <div className="wizard-instruction" id="wizardInstruction">
                                            <div className="instruction-icon">🥦</div>
                                            <h3 id="wizardTitle">Step 1: Fill Half Your Plate with Vegetables</h3>
                                            <p id="wizardDescription">
                                                Vegetables should make up 50% of your plate. They're rich in fiber,
                                                which slows glucose absorption and keeps you full longer.
                                            </p>
                                            <div className="wizard-goal" id="wizardGoal">
                                                <span className="goal-label">Goal:</span>
                                                <span className="goal-value">Add 2-3 vegetable items</span>
                                                <div className="goal-progress">
                                                    <div className="goal-progress-bar" id="goalProgress" style={{ width: '0%' }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="wizard-recommendations" id="wizardRecs">
                                            <h4>Recommended for You:</h4>
                                            <div className="wizard-food-suggestions">
                                                <div className="wizard-suggestion" onClick={() => (window as any).addFood?.('leafy-greens', 'vegetable', 'low', 'Leafy Greens', '🥬', 'medium')}>
                                                    <span className="suggestion-emoji">🥬</span>
                                                    <span className="suggestion-name">Leafy Greens</span>
                                                    <span className="suggestion-badge">Best Choice</span>
                                                </div>
                                                <div className="wizard-suggestion" onClick={() => (window as any).addFood?.('vegetables', 'vegetable', 'low', 'Mixed Veggies', '🥦', 'medium')}>
                                                    <span className="suggestion-emoji">🥦</span>
                                                    <span className="suggestion-name">Mixed Veggies</span>
                                                    <span className="suggestion-badge">Best Choice</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="wizard-tip" id="wizardTip">
                                            <div className="tip-icon">💡</div>
                                            <p><strong>Pro Tip:</strong> Eating vegetables first can reduce glucose spikes by up to 30%!</p>
                                        </div>
                                    </div>

                                    <div className="wizard-actions">
                                        <button className="wizard-btn skip" onClick={() => (window as any).skipWizard?.()}><span>Skip Guide</span></button>
                                        <button className="wizard-btn back" onClick={() => (window as any).previousWizardStep?.()} style={{ display: 'none' }}><span>← Back</span></button>
                                        <button className="wizard-btn next" onClick={() => (window as any).nextWizardStep?.()}><span>Next Step →</span></button>
                                        <button className="wizard-btn finish" onClick={() => (window as any).finishWizard?.()} style={{ display: 'none' }}><span>✓ Finish</span></button>
                                    </div>
                                </div>
                            </div>

                            <div className="virtual-plate-container">
                                <div className="virtual-plate" id="virtualPlate">
                                    <div className="plate-section vegetables" id="plateVeggies">
                                        <span className="section-label">Vegetables<br />50%</span>
                                        <div className="dropped-foods" id="veggiesDropped"></div>
                                    </div>
                                    <div className="plate-section protein" id="plateProtein">
                                        <span className="section-label">Protein<br />25%</span>
                                        <div className="dropped-foods" id="proteinDropped"></div>
                                    </div>
                                    <div className="plate-section carbs" id="plateCarbs">
                                        <span className="section-label">Carbs<br />25%</span>
                                        <div className="dropped-foods" id="carbsDropped"></div>
                                    </div>
                                </div>

                                <div className="plate-actions">
                                    <button className="plate-btn clear-btn" onClick={() => (window as any).clearPlate?.()}><span>Clear Plate</span></button>
                                    <button className="plate-btn save-btn" onClick={() => (window as any).saveMeal?.()}><span>Save Meal</span></button>
                                </div>
                            </div>

                            <button className="share-meal-btn" onClick={() => (window as any).shareMeal?.()}>
                                <span className="share-icon">📤</span> Share This Meal
                            </button>

                            {/* Glucose Predictor */}
                            <div className="glucose-predictor">
                                <h3>Predicted Glucose Impact</h3>
                                <div className="prediction-meter">
                                    <div className="meter-bar-container">
                                        <div className="meter-bar-fill" id="predictionBar" style={{ width: '0%' }}></div>
                                    </div>
                                    <div className="meter-labels">
                                        <span className="meter-label low">Low Impact</span>
                                        <span className="meter-label medium">Medium Impact</span>
                                        <span className="meter-label high">High Impact</span>
                                    </div>
                                </div>

                                <div className="macro-balance-chart">
                                    <h4>Plate Balance</h4>
                                    <canvas id="macroChart" width="200" height="200"></canvas>
                                    <div className="balance-indicators">
                                        <div className="balance-item"><span className="color-dot vegetables"></span><span className="label">Vegetables: <span id="vegPercent">0%</span></span></div>
                                        <div className="balance-item"><span className="color-dot protein"></span><span className="label">Protein: <span id="proteinPercent">0%</span></span></div>
                                        <div className="balance-item"><span className="color-dot carbs"></span><span className="label">Carbs: <span id="carbsPercent">0%</span></span></div>
                                    </div>
                                    <div className="balance-status" id="balanceStatus">🎯 Aim: 50% Veggies, 25% Protein, 25% Carbs</div>
                                </div>

                                <div className="prediction-details">
                                    <div className="prediction-stat">
                                        <span className="stat-icon">📊</span>
                                        <div className="stat-info">
                                            <span className="stat-label">Estimated Peak</span>
                                            <span className="stat-value" id="predictedPeak">115 mg/dL</span>
                                        </div>
                                    </div>
                                    <div className="prediction-stat">
                                        <span className="stat-icon">⏱️</span>
                                        <div className="stat-info">
                                            <span className="stat-label">Time to Peak</span>
                                            <span className="stat-value" id="timeToPeak">45-60 min</span>
                                        </div>
                                    </div>
                                    <div className="prediction-stat">
                                        <span className="stat-icon">✓</span>
                                        <div className="stat-info">
                                            <span className="stat-label">Status</span>
                                            <span className="stat-value status-good" id="mealStatus">Safe Choice</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="smart-suggestions" id="smartSuggestions">
                                    <h4>💡 Smart Suggestions</h4>
                                    <ul id="suggestionsList">
                                        <li>Great choice! This meal has perfect protein-carb balance</li>
                                        <li>Add more vegetables to fill you up and slow glucose absorption</li>
                                    </ul>
                                </div>

                                <div className="glucose-timeline">
                                    <h4>Predicted Glucose Response (2 hours)</h4>
                                    <canvas id="glucoseCurve" width="400" height="200"></canvas>
                                    <div className="timeline-markers">
                                        <span className="marker fasting">Fasting: 95</span>
                                        <span className="marker one-hour">1hr: 135</span>
                                        <span className="marker two-hour">2hr: 110</span>
                                    </div>
                                    <div className="timeline-zones">
                                        <div className="zone safe">✓ Safe Zone: &lt; 140 mg/dL</div>
                                        <div className="zone warning">⚠️ Caution: 140-160 mg/dL</div>
                                        <div className="zone danger">❌ Avoid: &gt; 160 mg/dL</div>
                                    </div>
                                </div>

                                {/* Meal Score Card */}
                                <div className="meal-score-card">
                                    <h3 className="score-card-title">Meal Score</h3>
                                    <div className="score-circle-container">
                                        <svg className="score-circle-svg" width="140" height="140" viewBox="0 0 140 140">
                                            <defs>
                                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#4caf50', stopOpacity: 1 }} />
                                                    <stop offset="100%" style={{ stopColor: '#45a049', stopOpacity: 1 }} />
                                                </linearGradient>
                                            </defs>
                                            <circle className="score-bg" cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12"></circle>
                                            <circle className="score-fill" cx="70" cy="70" r="60" fill="none" stroke="url(#scoreGradient)" strokeWidth="12" strokeLinecap="round" strokeDasharray="377" strokeDashoffset="377" transform="rotate(-90 70 70)" id="scoreCircle"></circle>
                                        </svg>
                                        <div className="score-text">
                                            <span className="score-value" id="mealScore">0</span>
                                            <span className="score-max">/100</span>
                                        </div>
                                        <div className="score-rating" id="scoreRating">Build Your Meal</div>
                                    </div>

                                    <div className="score-breakdown">
                                        <div className="score-item">
                                            <div className="score-item-header">
                                                <span className="score-icon">🥦</span>
                                                <span className="score-name">Vegetable Power</span>
                                            </div>
                                            <div className="score-bar"><div className="score-bar-fill" id="veggieBar" style={{ width: '0%' }}></div></div>
                                            <span className="score-points" id="veggiePoints">+0</span>
                                        </div>
                                        <div className="score-item">
                                            <div className="score-item-header">
                                                <span className="score-icon">⚖️</span>
                                                <span className="score-name">Plate Balance</span>
                                            </div>
                                            <div className="score-bar"><div className="score-bar-fill" id="balanceBar" style={{ width: '0%' }}></div></div>
                                            <span className="score-points" id="balancePoints">+0</span>
                                        </div>
                                        <div className="score-item">
                                            <div className="score-item-header">
                                                <span className="score-icon">📉</span>
                                                <span className="score-name">Low GI Selection</span>
                                            </div>
                                            <div className="score-bar"><div className="score-bar-fill" id="giBar" style={{ width: '0%' }}></div></div>
                                            <span className="score-points" id="giPoints">+0</span>
                                        </div>
                                    </div>

                                    <div className="achievements-section">
                                        <h4 className="achievements-title">🏆 Achievements Earned</h4>
                                        <div className="achievements-earned" id="achievements">
                                            <div className="achievement-placeholder">
                                                <span className="placeholder-icon">🎯</span>
                                                <p>Complete your first meal to earn achievements!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Food Selector */}
                        <div className="food-selector-interactive">
                            <div className="food-search">
                                <input type="text" placeholder="Search foods..." className="search-input" id="foodSearch" />
                                <span className="search-icon">🔍</span>
                            </div>

                            <div className="cuisine-selector">
                                <h4>Choose Your Cuisine Style</h4>
                                <select id="cuisineStyle" onChange={() => (window as any).updateFoodOptions?.()}>
                                    <option value="all">All Indian Foods</option>
                                    <option value="north">North Indian</option>
                                    <option value="south">South Indian</option>
                                    <option value="east">East Indian</option>
                                    <option value="west">West Indian</option>
                                    <option value="fusion">Modern Fusion</option>
                                </select>
                            </div>

                            <div className="dietary-filters">
                                <h4>Customize Your Options</h4>
                                <div className="filter-buttons">
                                    <button className="filter-btn" data-filter="vegetarian" onClick={() => (window as any).toggleFilter?.('vegetarian')}><span className="filter-icon">🥬</span> Vegetarian</button>
                                    <button className="filter-btn" data-filter="non-veg" onClick={() => (window as any).toggleFilter?.('non-veg')}><span className="filter-icon">🍗</span> Non-Veg</button>
                                    <button className="filter-btn" data-filter="vegan" onClick={() => (window as any).toggleFilter?.('vegan')}><span className="filter-icon">🌱</span> Vegan</button>
                                    <button className="filter-btn" data-filter="gluten-free" onClick={() => (window as any).toggleFilter?.('gluten-free')}><span className="filter-icon">🌾</span> Gluten-Free</button>
                                    <button className="filter-btn" data-filter="dairy-free" onClick={() => (window as any).toggleFilter?.('dairy-free')}><span className="filter-icon">🥛</span> Dairy-Free</button>
                                </div>
                            </div>

                            <div className="food-category">
                                <h4 className="category-title">✅ Excellent Choices (Low GI)</h4>
                                <div className="food-grid draggable">
                                    <div className="food-item good draggable-food" draggable data-type="vegetable" data-gi="low" data-food="leafy-greens">
                                        <span className="food-icon">🥬</span>
                                        <span className="food-name">Leafy Greens</span>
                                        <span className="gi-badge low">GI: 15</span>
                                    </div>
                                    <div className="food-item good draggable-food" draggable data-type="protein" data-gi="low" data-food="dal">
                                        <span className="food-icon">🫘</span>
                                        <span className="food-name">Dal/Legumes</span>
                                        <span className="gi-badge low">GI: 28</span>
                                    </div>
                                    <div className="food-item good draggable-food" draggable data-type="carbs" data-gi="low" data-food="brown-rice">
                                        <span className="food-icon">🍚</span>
                                        <span className="food-name">Brown Rice</span>
                                        <span className="gi-badge low">GI: 50</span>
                                    </div>
                                    <div className="food-item good draggable-food" draggable data-type="protein" data-gi="low" data-food="eggs">
                                        <span className="food-icon">🥚</span>
                                        <span className="food-name">Eggs</span>
                                        <span className="gi-badge low">GI: 0</span>
                                    </div>
                                    <div className="food-item good draggable-food" draggable data-type="protein" data-gi="low" data-food="curd">
                                        <span className="food-icon">🥛</span>
                                        <span className="food-name">Curd/Yogurt</span>
                                        <span className="gi-badge low">GI: 36</span>
                                    </div>
                                    <div className="food-item good draggable-food" draggable data-type="vegetable" data-gi="low" data-food="vegetables">
                                        <span className="food-icon">🥦</span>
                                        <span className="food-name">Mixed Veggies</span>
                                        <span className="gi-badge low">GI: 20</span>
                                    </div>
                                    <div className="food-item good draggable-food" draggable data-type="protein" data-gi="low" data-food="fish">
                                        <span className="food-icon">🐟</span>
                                        <span className="food-name">Fish</span>
                                        <span className="gi-badge low">GI: 0</span>
                                    </div>
                                    <div className="food-item good draggable-food" draggable data-type="carbs" data-gi="medium" data-food="roti">
                                        <span className="food-icon">🫓</span>
                                        <span className="food-name">Whole Wheat Roti</span>
                                        <span className="gi-badge medium">GI: 62</span>
                                    </div>
                                </div>
                            </div>

                            <div className="food-category">
                                <h4 className="category-title">⚠️ Use Sparingly (Medium GI)</h4>
                                <div className="food-grid draggable">
                                    <div className="food-item moderate draggable-food" draggable data-type="carbs" data-gi="medium" data-food="white-rice">
                                        <span className="food-icon">🍚</span>
                                        <span className="food-name">White Rice</span>
                                        <span className="gi-badge medium">GI: 73</span>
                                    </div>
                                    <div className="food-item moderate draggable-food" draggable data-type="carbs" data-gi="medium" data-food="potato">
                                        <span className="food-icon">🥔</span>
                                        <span className="food-name">Potato</span>
                                        <span className="gi-badge medium">GI: 78</span>
                                    </div>
                                    <div className="food-item moderate draggable-food" draggable data-type="carbs" data-gi="medium" data-food="banana">
                                        <span className="food-icon">🍌</span>
                                        <span className="food-name">Banana</span>
                                        <span className="gi-badge medium">GI: 51</span>
                                    </div>
                                </div>
                            </div>

                            <div className="food-category">
                                <h4 className="category-title">❌ Avoid (High GI)</h4>
                                <div className="food-grid draggable">
                                    <div className="food-item avoid" data-food="sweets">
                                        <span className="food-icon">🧁</span>
                                        <span className="food-name">Sweets</span>
                                        <span className="gi-badge high">GI: 90+</span>
                                    </div>
                                    <div className="food-item avoid" data-food="sugary-drinks">
                                        <span className="food-icon">🥤</span>
                                        <span className="food-name">Sugary Drinks</span>
                                        <span className="gi-badge high">GI: 95+</span>
                                    </div>
                                    <div className="food-item avoid" data-food="fried">
                                        <span className="food-icon">🍟</span>
                                        <span className="food-name">Fried Foods</span>
                                        <span className="gi-badge high">GI: 85+</span>
                                    </div>
                                    <div className="food-item avoid" data-food="white-bread">
                                        <span className="food-icon">🍞</span>
                                        <span className="food-name">White Bread</span>
                                        <span className="gi-badge high">GI: 75</span>
                                    </div>
                                </div>
                            </div>

                            <div className="gi-info-box">
                                <h4>Understanding Glycemic Index (GI)</h4>
                                <div className="gi-scale">
                                    <div className="gi-range low"><span className="gi-value">0-55</span><span className="gi-label">Low GI - Best Choice</span></div>
                                    <div className="gi-range medium"><span className="gi-value">56-69</span><span className="gi-label">Medium GI - Moderate</span></div>
                                    <div className="gi-range high"><span className="gi-value">70+</span><span className="gi-label">High GI - Limit/Avoid</span></div>
                                </div>
                            </div>

                            {/* Meal Suggestions */}
                            <div className="meal-suggestions">
                                <h3>Quick Meal Ideas</h3>
                                <div className="suggestion-cards">
                                    <div className="suggestion-card" onClick={() => (window as any).loadMealTemplate?.('breakfast1')}>
                                        <div className="suggestion-icon">🌅</div>
                                        <h4>Perfect Breakfast</h4>
                                        <p>Oats upma + boiled egg + buttermilk</p>
                                        <div className="suggestion-stats">
                                            <span className="stat">GI: Low</span>
                                            <span className="stat">Protein: High</span>
                                        </div>
                                    </div>
                                    <div className="suggestion-card" onClick={() => (window as any).loadMealTemplate?.('lunch1')}>
                                        <div className="suggestion-icon">☀️</div>
                                        <h4>Balanced Lunch</h4>
                                        <p>Brown rice + dal + mixed veggies + salad</p>
                                        <div className="suggestion-stats">
                                            <span className="stat">GI: Low</span>
                                            <span className="stat">Fiber: High</span>
                                        </div>
                                    </div>
                                    <div className="suggestion-card" onClick={() => (window as any).loadMealTemplate?.('dinner1')}>
                                        <div className="suggestion-icon">🌙</div>
                                        <h4>Light Dinner</h4>
                                        <p>Grilled fish + roti + vegetable curry</p>
                                        <div className="suggestion-stats">
                                            <span className="stat">GI: Low</span>
                                            <span className="stat">Omega-3: High</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SUPPORT COMMUNITY */}
                <section id="support" className="community-section">
                    <div className="section-header">
                        <div className="header-badge">
                            <span className="badge-pulse"></span>
                            <span className="badge-text">You're Not Alone - 2,500+ Mothers</span>
                        </div>
                        <h2 className="section-title">Join Our Thriving Community</h2>
                        <p className="section-subtitle">
                            Connect with thousands of mothers managing GDM. Share stories, get support, and learn from each other's experiences.
                        </p>
                    </div>

                    <div className="community-grid">
                        {/* WhatsApp Groups */}
                        <div className="community-card clickable" onClick={() => window.open('https://chat.whatsapp.com/invite-link', '_blank')}>
                            <div className="card-icon-animated">💬</div>
                            <div className="card-badge live">Live Chat</div>
                            <h3>WhatsApp Support Groups</h3>
                            <p>24/7 peer support from mothers experiencing GDM right now</p>
                            <div className="community-stats">
                                <span className="stat"><span className="stat-icon">👥</span><span className="stat-text">450+ Active Members</span></span>
                                <span className="stat"><span className="stat-icon">💬</span><span className="stat-text">100+ Daily Messages</span></span>
                            </div>
                            <div className="live-activity"><div className="activity-dot"></div><span>12 members active now</span></div>
                            <button className="community-btn"><span>Join WhatsApp Group</span><span className="btn-arrow">→</span></button>
                        </div>

                        {/* Facebook Groups */}
                        <div className="community-card clickable" onClick={() => window.open('https://www.facebook.com/groups/gestational-diabetes-india', '_blank')}>
                            <div className="card-icon-animated">👥</div>
                            <div className="card-badge popular">Most Popular</div>
                            <h3>Facebook Community</h3>
                            <p>Share experiences, meal ideas, and victories with mothers across India</p>
                            <div className="community-stats">
                                <span className="stat"><span className="stat-icon">👥</span><span className="stat-text">1,200+ Members</span></span>
                                <span className="stat"><span className="stat-icon">📝</span><span className="stat-text">Daily Posts</span></span>
                            </div>
                            <div className="recent-topics">
                                <h4>Recent Topics:</h4>
                                <ul>
                                    <li>"My glucose finally under control!"</li>
                                    <li>"Best low-GI Indian breakfast ideas"</li>
                                    <li>"Managing GDM at work"</li>
                                </ul>
                            </div>
                            <button className="community-btn"><span>Join Facebook Group</span><span className="btn-arrow">→</span></button>
                        </div>

                        {/* Telegram Channel */}
                        <div className="community-card clickable" onClick={() => window.open('https://t.me/gdm_support_india', '_blank')}>
                            <div className="card-icon-animated">📱</div>
                            <div className="card-badge expert">Expert Tips</div>
                            <h3>Telegram Channel</h3>
                            <p>Daily tips, meal ideas, and expert advice delivered to your phone</p>
                            <div className="community-stats">
                                <span className="stat"><span className="stat-icon">📢</span><span className="stat-text">800+ Subscribers</span></span>
                                <span className="stat"><span className="stat-icon">⭐</span><span className="stat-text">Expert Curated</span></span>
                            </div>
                            <div className="channel-preview">
                                <h4>Today's Tip:</h4>
                                <p>"Add 1 tbsp of cinnamon to your morning oats - may help regulate blood sugar!"</p>
                            </div>
                            <button className="community-btn"><span>Subscribe to Channel</span><span className="btn-arrow">→</span></button>
                        </div>

                        {/* Reddit Community */}
                        <div className="community-card clickable" onClick={() => window.open('https://www.reddit.com/r/GestationalDiabetes/', '_blank')}>
                            <div className="card-icon-animated">📖</div>
                            <div className="card-badge global">Global Community</div>
                            <h3>Reddit Discussions</h3>
                            <p>In-depth discussions, scientific articles, and global perspectives</p>
                            <div className="community-stats">
                                <span className="stat"><span className="stat-icon">🌍</span><span className="stat-text">15,000+ Members</span></span>
                                <span className="stat"><span className="stat-icon">💡</span><span className="stat-text">Evidence-Based</span></span>
                            </div>
                            <div className="reddit-highlights">
                                <h4>Top Discussions:</h4>
                                <ul>
                                    <li>"GDM success stories compilation"</li>
                                    <li>"Latest research on GDM management"</li>
                                    <li>"International meal ideas"</li>
                                </ul>
                            </div>
                            <button className="community-btn"><span>Join Reddit</span><span className="btn-arrow">→</span></button>
                        </div>

                        {/* Virtual Meetups */}
                        <div className="community-card clickable" onClick={() => window.open('https://meet.google.com/gdm-support', '_blank')}>
                            <div className="card-icon-animated">🎥</div>
                            <div className="card-badge">Weekly Sessions</div>
                            <h3>Virtual Support Meetups</h3>
                            <p>Weekly video calls with healthcare educators and peer support</p>
                            <div className="community-stats">
                                <span className="stat"><span className="stat-icon">📅</span><span className="stat-text">Every Saturday 5 PM</span></span>
                                <span className="stat"><span className="stat-icon">👨‍⚕️</span><span className="stat-text">Expert Led</span></span>
                            </div>
                            <div className="next-session">
                                <h4>Next Session:</h4>
                                <p><strong>Saturday, Feb 8 at 5:00 PM</strong></p>
                                <p>Topic: "Indian Meal Planning for GDM"</p>
                                <p>Speaker: Dr. Priya Sharma, Nutritionist</p>
                            </div>
                            <button className="community-btn"><span>Register for Meetup</span><span className="btn-arrow">→</span></button>
                        </div>

                        {/* Success Stories */}
                        <div className="community-card clickable" onClick={() => (window as any).openSuccessStories?.()}>
                            <div className="card-icon-animated">⭐</div>
                            <div className="card-badge inspiring">Inspiring</div>
                            <h3>Success Stories</h3>
                            <p>Read how other mothers managed GDM and had healthy babies</p>
                            <div className="community-stats">
                                <span className="stat"><span className="stat-icon">📖</span><span className="stat-text">500+ Stories</span></span>
                                <span className="stat"><span className="stat-icon">❤️</span><span className="stat-text">Hope & Inspiration</span></span>
                            </div>
                            <div className="story-preview">
                                <div className="story-quote">"I was terrified when diagnosed at 26 weeks. With diet changes and walking, I managed without insulin. My baby was born healthy at 3.2 kg!" - Priya, Mumbai</div>
                            </div>
                            <button className="community-btn"><span>Read Stories</span><span className="btn-arrow">→</span></button>
                        </div>

                        {/* Expert Q&A */}
                        <div className="community-card clickable" onClick={() => window.open('https://forms.gle/gdm-expert-qa', '_blank')}>
                            <div className="card-icon-animated">🩺</div>
                            <div className="card-badge">Free</div>
                            <h3>Ask the Experts</h3>
                            <p>Monthly Q&A with endocrinologists, nutritionists, and obstetricians</p>
                            <div className="community-stats">
                                <span className="stat"><span className="stat-icon">📅</span><span className="stat-text">Last Sunday/Month</span></span>
                                <span className="stat"><span className="stat-icon">🎓</span><span className="stat-text">Certified Experts</span></span>
                            </div>
                            <div className="expert-panel">
                                <h4>Expert Panel:</h4>
                                <ul>
                                    <li>Dr. Anjali Mehta - Endocrinologist</li>
                                    <li>Dr. Kavita Singh - Obstetrician</li>
                                    <li>Neha Gupta - Clinical Nutritionist</li>
                                </ul>
                            </div>
                            <button className="community-btn"><span>Submit Question</span><span className="btn-arrow">→</span></button>
                        </div>

                        {/* Local Support Groups */}
                        <div className="community-card clickable" onClick={() => (window as any).findLocalGroups?.()}>
                            <div className="card-icon-animated">📍</div>
                            <div className="card-badge">Near You</div>
                            <h3>Local Support Groups</h3>
                            <p>Find in-person support groups in your city</p>
                            <div className="community-stats">
                                <span className="stat"><span className="stat-icon">🏙️</span><span className="stat-text">25+ Cities</span></span>
                                <span className="stat"><span className="stat-icon">🤝</span><span className="stat-text">In-Person Meetups</span></span>
                            </div>
                            <div className="location-finder">
                                <input type="text" placeholder="Enter your city..." className="city-input" />
                                <button className="find-btn">Find Groups</button>
                            </div>
                            <button className="community-btn"><span>Browse All Cities</span><span className="btn-arrow">→</span></button>
                        </div>
                    </div>

                    {/* Community Guidelines */}
                    <div className="community-guidelines">
                        <h3>Community Guidelines</h3>
                        <div className="guidelines-grid">
                            <div className="guideline-item"><span className="guideline-icon">💝</span><h4>Be Kind & Supportive</h4><p>We're all on this journey together</p></div>
                            <div className="guideline-item"><span className="guideline-icon">🔒</span><h4>Privacy First</h4><p>What's shared here stays here</p></div>
                            <div className="guideline-item"><span className="guideline-icon">🩺</span><h4>Medical Advice Disclaimer</h4><p>Always consult your doctor</p></div>
                            <div className="guideline-item"><span className="guideline-icon">🌟</span><h4>Share Your Wins</h4><p>Celebrate every victory, big or small</p></div>
                        </div>
                    </div>
                </section>

                {/* TOPIC PANEL */}
                <div className="topic-panel" id="topicPanel">
                    <button className="close-panel" onClick={() => (window as any).closeTopicPanel?.()}>✕</button>
                    <div className="panel-scroll">
                        <div className="panel-header" id="panelHeader">
                            <div className="panel-icon" id="panelIcon"></div>
                            <div className="panel-title-block">
                                <h2 id="panelTitle"></h2>
                                <p id="panelSubtitle"></p>
                            </div>
                        </div>
                        <div className="panel-content" id="panelContent"></div>
                    </div>
                </div>

                {/* BACKDROP */}
                <div className="backdrop" id="backdrop" onClick={() => (window as any).closeTopicPanel?.()}></div>

                {/* QUIZ MODAL */}
                <div className="quiz-modal" id="quizModal">
                    <div className="quiz-container">
                        <button className="close-quiz" onClick={() => (window as any).closeQuiz?.()}>✕</button>
                        <h2>GDM Knowledge Quiz</h2>
                        <p className="quiz-intro">Test your understanding of gestational diabetes</p>
                        <div className="quiz-content" id="quizContent"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GestationalDiabetes;
