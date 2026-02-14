import React, { useEffect } from 'react';
import '../../styles/pages/gestational-diabetes.css';

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
      {/* Site Header */}
      <header className="site-header">
        <div className="nav-container">
          <div className="logo"><a href="/" aria-label="Nari Shakti Home">Nari Shakti</a></div>
          <nav className="main-nav">
            <a href="#journey">Your Journey</a>
            <a href="#learn">Learn</a>
            <a href="#tracker">Track Health</a>
            <a href="#support">Support</a>
          </nav>
          <div className="nav-actions">
            <a href="login.html" className="btn-nav primary">Sign In</a>
            <a href="contact.html" className="btn-nav outline">Contact Us</a>
          </div>
        </div>
      </header>

      <div className="page-shell">

        {/* Neural Network Particle Background */}
        <div className="hero-constellation-bg">
          <canvas id="particleCanvas"></canvas>
          <div className="gradient-morph"></div>
        </div>

        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🤰</span>
              <span className="badge-text">Supporting 3-25% of Pregnancies in India</span>
            </div>
            <h1 className="hero-title-3d">Your <span className="title-emphasis">Gestational Diabetes</span> Journey</h1>
            <p className="hero-subtitle">
              Empowering expecting mothers with medically-accurate information about gestational diabetes.
              Knowledge is your strongest ally for a healthy pregnancy.
            </p>
            <div className="hero-stats">
              <div className="stat-item"><span className="stat-number">25 Topics</span><span className="stat-label">Comprehensive coverage</span></div>
              <div className="stat-item"><span className="stat-number">50-70%</span><span className="stat-label">Can prevent Type 2 with lifestyle</span></div>
              <div className="stat-item"><span className="stat-number">24-28 Weeks</span><span className="stat-label">Typical screening time</span></div>
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
                <div className="center-glow"></div>
                <div className="pulse-ring ring-1"></div>
                <div className="pulse-ring ring-2"></div>
                <div className="pulse-ring ring-3"></div>
              </div>
              <div className="health-icon icon-1" onClick={() => (window as any).scrollToTopic?.('monitoring')}><div className="icon-inner">🩺</div><div className="icon-label">Monitoring</div></div>
              <div className="health-icon icon-2" onClick={() => (window as any).scrollToTopic?.('exercise')}><div className="icon-inner">💪</div><div className="icon-label">Exercise</div></div>
              <div className="health-icon icon-3" onClick={() => (window as any).scrollToTopic?.('nutrition')}><div className="icon-inner">🥗</div><div className="icon-label">Nutrition</div></div>
              <div className="health-icon icon-4" onClick={() => (window as any).scrollToTopic?.('treatment')}><div className="icon-inner">💊</div><div className="icon-label">Treatment</div></div>
              <div className="health-icon icon-5" onClick={() => (window as any).scrollToTopic?.('baby-health')}><div className="icon-inner">❤️</div><div className="icon-label">Baby Health</div></div>
              <div className="glucose-meter">
                <div className="meter-reading"><span className="reading-value" id="glucoseReading">95</span><span className="reading-unit">mg/dL</span></div>
                <div className="meter-status status-normal">Target Range</div>
                <div className="meter-bar"><div className="meter-fill" id="meterFill"></div></div>
              </div>
            </div>
            <div className="hero-info-box">
              <div className="info-badge"><span className="badge-icon">✨</span><span className="badge-text">Interactive Learning</span></div>
              <h3 className="info-title">Your Personalized Health Companion</h3>
              <p className="info-text">Navigate through 25 comprehensive topics with interactive visualizations, real-time tracking tools, and evidence-based guidance from ICMR, WHO, and ACOG.</p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE JOURNEY TIMELINE */}
        <section id="journey" className="journey-section">
          <div className="section-header">
            <div className="header-badge-prominent"><span className="badge-pulse"></span><span className="badge-text">Your 40-Week Journey</span></div>
            <h2 className="section-title-prominent">Navigate Your <span className="title-highlight">Pregnancy Timeline</span></h2>
            <p className="section-subtitle-prominent">
              <span className="subtitle-sparkle">✨</span>
              From first screening to postpartum recovery — every week matters. <strong>Tap any trimester</strong> to unlock personalized care guides, milestone trackers, and expert insights tailored to your journey.
              <span className="subtitle-sparkle">✨</span>
            </p>
          </div>
          <div className="timeline-container">
            <div className="timeline-rail"></div>
            {[
              { stage: 'first', num: '1', title: 'First Trimester', weeks: 'Weeks 1-12', desc: 'Foundation & Early Screening for High-Risk Women', icon: '🌱' },
              { stage: 'second', num: '2', title: 'Second Trimester', weeks: 'Weeks 13-27', desc: 'GDM Screening & Diagnosis (24-28 weeks)', icon: '🔬' },
              { stage: 'third', num: '3', title: 'Third Trimester', weeks: 'Weeks 28-40', desc: 'Intensive Monitoring & Delivery Preparation', icon: '👶' },
              { stage: 'postpartum', num: '4', title: 'Postpartum', weeks: 'After Delivery', desc: 'Recovery & Long-term Health Management', icon: '🌸' },
            ].map(s => (
              <div key={s.stage} className="timeline-stage" data-stage={s.stage} onClick={() => (window as any).showStageDetails?.(s.stage)}>
                <div className="stage-marker"><div className="marker-dot">{s.num}</div><div className="marker-pulse"></div></div>
                <div className="stage-content">
                  <h3 className="stage-title">{s.title}</h3>
                  <p className="stage-weeks">{s.weeks}</p>
                  <p className="stage-desc">{s.desc}</p>
                  <div className="stage-icon">{s.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOPICS EXPLORER */}
        <section id="learn" className="topics-explorer">
          <div className="section-header">
            <div className="header-badge-prominent"><span className="badge-pulse"></span><span className="badge-text">25 Comprehensive Topics</span></div>
            <h2 className="section-title-prominent">Your Complete <span className="title-highlight">GDM Knowledge Hub</span></h2>
            <p className="section-subtitle-prominent">
              <span className="subtitle-sparkle">💡</span>
              Medically-accurate, beautifully explained. Each topic card opens a world of interactive learning — <strong>click to explore</strong> blood sugar science, nutrition plans, monitoring techniques, and evidence-based care strategies.
              <span className="subtitle-sparkle">💡</span>
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
                  <div className="topic-tags">{topic.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}</div>
                </div>
                <div className="topic-footer">
                  <span className="read-time">⏱ {topic.time}</span>
                  <span className="topic-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE GLUCOSE TRACKER WITH ADVANCED SIMULATION */}
        <section id="tracker" className="tracker-section">
          <div className="section-header">
            <div className="header-badge-prominent"><span className="badge-pulse"></span><span className="badge-text">Live Body Simulation</span></div>
            <h2 className="section-title-prominent">Real-Time <span className="title-highlight">Glucose &amp; Body Dynamics</span></h2>
            <p className="section-subtitle-prominent">
              <span className="subtitle-sparkle">💡</span> Experience a live visualization of your body's internal processes — <strong>watch how glucose, insulin, and pregnancy hormones</strong> interact in real-time to shape your health. <span className="subtitle-sparkle">💡</span>
            </p>
          </div>

          <div className="simulation-controls">
            <button className="sim-btn active" onClick={() => (window as any).setSimulationScenario?.('fasting')} id="btn-fasting"><span className="sim-icon">🌅</span><span className="sim-label">Fasting State</span></button>
            <button className="sim-btn" onClick={() => (window as any).setSimulationScenario?.('after-meal')} id="btn-after-meal"><span className="sim-icon">🍽️</span><span className="sim-label">After Meal</span></button>
            <button className="sim-btn" onClick={() => (window as any).setSimulationScenario?.('exercise')} id="btn-exercise"><span className="sim-icon">💪</span><span className="sim-label">During Exercise</span></button>
            <button className="sim-btn" onClick={() => (window as any).setSimulationScenario?.('insulin')} id="btn-insulin"><span className="sim-icon">💉</span><span className="sim-label">After Insulin</span></button>
          </div>

          <div className="simulation-dashboard">
            {/* LEFT: BODY VISUALIZATION */}
            <div className="body-simulation-container">
              <div className="sim-body-visual">
                <svg id="bodySimulationSvg" viewBox="0 0 320 600" style={{ width: '100%', maxWidth: '400px', height: 'auto' }}>
                  <ellipse cx="160" cy="62" rx="42" ry="48" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                  <ellipse cx="160" cy="38" rx="44" ry="30" fill="#5c3d2e" />
                  <rect x="116" y="30" width="12" height="55" rx="6" fill="#5c3d2e" />
                  <rect x="192" y="30" width="12" height="55" rx="6" fill="#5c3d2e" />
                  <circle cx="143" cy="65" r="4" fill="#3a2520" />
                  <circle cx="177" cy="65" r="4" fill="#3a2520" />
                  <path d="M148 78 Q160 86 172 78" fill="none" stroke="#3a2520" strokeWidth="2" strokeLinecap="round" />
                  <rect x="148" y="106" width="24" height="28" rx="4" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                  <path d="M100 134 Q100 128 130 128 L190 128 Q220 128 220 134 L220 280 Q220 285 215 285 L105 285 Q100 285 100 280 Z" fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2" />
                  <ellipse cx="160" cy="300" rx="65" ry="75" fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2" />
                  <path d="M148 128 L148 148 Q160 156 172 148 L172 128" fill="none" stroke="#d47a9a" strokeWidth="1.5" />
                  <path d="M100 140 Q70 170 60 240 Q55 270 65 290 L82 290 Q85 270 90 240 Q100 175 118 145" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                  <path d="M220 140 Q250 170 260 240 Q265 270 255 290 L238 290 Q235 270 230 240 Q220 175 202 145" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                  <ellipse cx="74" cy="298" rx="14" ry="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                  <ellipse cx="246" cy="298" rx="14" ry="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                  <path d="M95 372 L88 480 Q88 490 100 490 L220 490 Q232 490 232 480 L225 372" fill="#c077a8" stroke="#a85d8a" strokeWidth="2" />
                  <rect x="118" y="488" width="34" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                  <rect x="168" y="488" width="34" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                  <ellipse cx="135" cy="586" rx="22" ry="10" fill="#8b5e83" />
                  <ellipse cx="185" cy="586" rx="22" ry="10" fill="#8b5e83" />
                  <circle id="sim-pancreas-glow" cx="160" cy="240" r="35" fill="rgba(255, 235, 59, 0.3)" opacity="0" className="sim-organ-glow" />
                  <circle id="sim-liver-glow" cx="195" cy="220" r="30" fill="rgba(255, 152, 0, 0.3)" opacity="0" className="sim-organ-glow" />
                  <ellipse id="sim-placenta-glow" cx="160" cy="310" rx="70" ry="80" fill="rgba(236, 64, 122, 0.3)" opacity="0" className="sim-organ-glow" />
                </svg>

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
                  <div className="organ-label pancreas-label" style={{ top: '40%', left: '50%' }}><div className="label-dot"></div><div className="label-text"><strong>Pancreas</strong><span className="label-status" id="pancreasStatus">Working Hard</span></div></div>
                  <div className="organ-label liver-label" style={{ top: '35%', left: '55%' }}><div className="label-dot"></div><div className="label-text"><strong>Liver</strong><span className="label-status" id="liverStatus">Storing Glucose</span></div></div>
                  <div className="organ-label placenta-label" style={{ top: '55%', left: '48%' }}><div className="label-dot"></div><div className="label-text"><strong>Placenta</strong><span className="label-status" id="placentaStatus">Producing Hormones</span></div></div>
                </div>
              </div>
              <div className="scenario-description">
                <h4 id="scenarioTitle">Fasting State</h4>
                <p id="scenarioDesc">Your body is using stored glucose for energy. Insulin levels are low, and the liver releases glucose to maintain blood sugar levels.</p>
              </div>
            </div>

            {/* CENTER: LIVE METRICS DASHBOARD */}
            <div className="metrics-dashboard">
              <div className="metric-card glucose-graph-card">
                <div className="card-header"><h3>Blood Glucose Level</h3><div className="live-indicator"><span className="live-dot"></span><span>LIVE</span></div></div>
                <div className="glucose-display">
                  <div className="glucose-reading"><span className="reading-value" id="currentGlucose">95</span><span className="reading-unit">mg/dL</span></div>
                  <div className="glucose-status" id="glucoseStatus">Target Range</div>
                </div>
                <canvas id="glucoseTrendChart" width={300} height={150}></canvas>
              </div>
              <div className="metric-card hormones-card">
                <div className="card-header"><h3>Pregnancy Hormones</h3><span className="info-icon" title="Hormones affecting insulin resistance">ℹ️</span></div>
                <div className="hormone-meter">
                  {[
                    { icon: '🔴', name: 'Human Placental Lactogen (hPL)', barId: 'hplBar', valId: 'hplValue', w: '75%', bg: 'linear-gradient(90deg, #ff6b9d, #c44569)', val: '75%' },
                    { icon: '🟡', name: 'Cortisol', barId: 'cortisolBar', valId: 'cortisolValue', w: '60%', bg: 'linear-gradient(90deg, #ffd93d, #f5a623)', val: '60%' },
                    { icon: '🟠', name: 'Progesterone', barId: 'progesteroneBar', valId: 'progesteroneValue', w: '80%', bg: 'linear-gradient(90deg, #fa709a, #fee140)', val: '80%' },
                    { icon: '🔵', name: 'Insulin Production', barId: 'insulinBar', valId: 'insulinValue', w: '45%', bg: 'linear-gradient(90deg, #4facfe, #00f2fe)', val: '45%' },
                  ].map(h => (
                    <div key={h.barId} className="hormone-item">
                      <div className="hormone-label"><span className="hormone-icon">{h.icon}</span><span className="hormone-name">{h.name}</span></div>
                      <div className="hormone-bar-container"><div className="hormone-bar" id={h.barId} style={{ width: h.w, background: h.bg }}></div><span className="hormone-value" id={h.valId}>{h.val}</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="metric-card resistance-card">
                <div className="card-header"><h3>Insulin Resistance</h3></div>
                <div className="resistance-gauge">
                  <canvas id="resistanceGauge" width={200} height={150}></canvas>
                  <div className="gauge-value"><span id="resistancePercent">65</span>%</div>
                  <div className="gauge-label" id="resistanceLabel">Moderate</div>
                </div>
              </div>
            </div>

            {/* RIGHT: KEY METRICS & PARAMETERS */}
            <div className="parameters-panel">
              <div className="quick-stats">
                {[
                  { icon: '💧', label: 'Glucose in Bloodstream', valId: 'bloodGlucose', val: '95 mg/dL' },
                  { icon: '🏭', label: 'Pancreas Activity', valId: 'pancreasActivity', val: 'High' },
                  { icon: '⚡', label: 'Energy Production', valId: 'energyProduction', val: 'Normal' },
                  { icon: '🍼', label: "Baby's Glucose", valId: 'babyGlucose', val: 'Optimal' },
                ].map(s => (
                  <div key={s.valId} className="stat-box">
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-content"><div className="stat-label">{s.label}</div><div className="stat-value" id={s.valId}>{s.val}</div></div>
                  </div>
                ))}
              </div>
              <div className="systems-status">
                <h4>Body Systems Status</h4>
                {[
                  { icon: '🫀', name: 'Cardiovascular', status: 'Good', statusClass: 'status-good', w: '85%', bg: '#10ac84' },
                  { icon: '🧠', name: 'Nervous System', status: 'Good', statusClass: 'status-good', w: '90%', bg: '#10ac84' },
                  { icon: '🔄', name: 'Metabolic', status: 'Compensating', statusClass: 'status-warning', w: '65%', bg: '#f39c12', statusId: 'metabolicStatus', barId: 'metabolicBar' },
                  { icon: '👶', name: 'Fetal Development', status: 'Healthy', statusClass: 'status-good', w: '95%', bg: '#10ac84' },
                ].map((sys, i) => (
                  <div key={i} className="system-item">
                    <div className="system-header">
                      <span className="system-name">{sys.icon} {sys.name}</span>
                      <span className={`system-status ${sys.statusClass}`} {...(sys.statusId ? { id: sys.statusId } : {})}>{sys.status}</span>
                    </div>
                    <div className="system-bar"><div className="system-fill" {...(sys.barId ? { id: sys.barId } : {})} style={{ width: sys.w, background: sys.bg }}></div></div>
                  </div>
                ))}
              </div>
              <div className="time-tracker">
                <h4>Timeline</h4>
                <div className="time-display"><div className="time-icon">⏱️</div><div className="time-info"><div className="time-elapsed" id="timeElapsed">0:00</div><div className="time-label">Time Since Last Event</div></div></div>
                <div className="time-events"><div className="event-item"><span className="event-dot"></span><span className="event-text" id="lastEvent">Fasting started</span></div></div>
              </div>
              <div className="simulation-legend">
                <h4>Legend</h4>
                <div className="legend-items">
                  {[{ c: '#ffd93d', l: 'Glucose Molecules' }, { c: '#4facfe', l: 'Insulin Molecules' }, { c: '#ff6b9d', l: 'Pregnancy Hormones' }, { c: '#10ac84', l: 'Energy/ATP' }].map((lg, i) => (
                    <div key={i} className="legend-item"><div className="legend-color" style={{ background: lg.c }}></div><span>{lg.l}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TRADITIONAL TRACKER TOOLS */}
          <div className="tracker-tools-row">
            <div className="tool-card"><div className="tool-icon">📝</div><h3>Daily Log</h3><p>Track your glucose readings, meals, and activities in one place</p><button className="tool-btn">Start Logging</button></div>
            <div className="tool-card"><div className="tool-icon">📊</div><h3>Weekly Report</h3><p>View trends and patterns in your glucose management</p><button className="tool-btn">View Report</button></div>
            <div className="tool-card"><div className="tool-icon">🔔</div><h3>Reminders</h3><p>Set alerts for testing times, meals, and medications</p><button className="tool-btn">Set Reminders</button></div>
            <div className="tool-card"><div className="tool-icon">📈</div><h3>Target Ranges</h3><p>View and customize your glucose target ranges</p><button className="tool-btn">View Ranges</button></div>
          </div>
        </section>

        {/* INTERACTIVE TRACKER TOOLS ROW */}
        <div className="tracker-tools-row">
          {[
            { fn: 'openDailyLog', iconMain: '📝', badge: 'New', title: 'Interactive Daily Log', desc: 'Smart tracking with instant feedback and insights', btn: 'Start Tracking Now →', preview: 'Last entry: 2 hours ago' },
            { fn: 'openWeeklyReport', iconMain: '📊', badge: 'Live', title: 'AI-Powered Insights', desc: 'Personalized patterns and recommendations', btn: 'View My Report →', preview: '85% readings in target 🎉' },
            { fn: 'openSmartReminders', iconMain: '🔔', badge: 'Smart', title: 'Smart Reminders', desc: 'Adaptive alerts that learn your schedule', btn: 'Set Up Alerts →', preview: 'Next test in 45 min ⏱️' },
            { fn: 'openTargetZones', iconMain: '🎯', badge: 'Guide', title: 'Target Zone Coach', desc: 'Personalized ranges with real-time guidance', btn: 'See My Zones →', preview: 'Fasting zone: ✓ Perfect' },
          ].map((t, i) => (
            <div key={i} className="tool-card interactive-tool" onClick={() => (window as any)[t.fn]?.()}>
              <div className="tool-icon-animated"><span className="icon-main">{t.iconMain}</span><span className="icon-badge">{t.badge}</span></div>
              <h3>{t.title}</h3><p>{t.desc}</p>
              <button className="tool-btn">{t.btn}</button>
              <div className="tool-preview">{t.preview}</div>
            </div>
          ))}
        </div>

        {/* DAILY LOG MODAL */}
        <div className="feature-modal" id="dailyLogModal">
          <div className="modal-content-large">
            <button className="close-modal" onClick={() => (window as any).closeDailyLog?.()}>✕</button>
            <div className="modal-header-gradient"><div className="modal-icon">📝</div><h2>Your Daily Glucose Journey</h2><p>Track, learn, and thrive with intelligent logging</p></div>
            <div className="modal-body">
              <div className="log-entry-section">
                <h3>Quick Entry</h3>
                <div className="quick-entry-form">
                  <div className="entry-row">
                    <div className="entry-field"><label>Glucose Reading</label><input type="number" placeholder="95" className="glucose-input" id="glucoseInput" /><span className="unit">mg/dL</span></div>
                    <div className="entry-field"><label>When</label><select className="time-select"><option>Fasting</option><option>After Breakfast</option><option>After Lunch</option><option>After Dinner</option><option>Bedtime</option></select></div>
                  </div>
                  <div className="instant-feedback" id="instantFeedback"><div className="feedback-icon">✓</div><div className="feedback-text"><strong>Perfect!</strong> This reading is right in your target zone.</div></div>
                  <button className="save-entry-btn" onClick={() => (window as any).saveEntry?.()}><span>Save Entry</span><span className="btn-icon">→</span></button>
                </div>
              </div>
              <div className="smart-insights">
                <h3>Today's Insights</h3>
                <div className="insight-cards">
                  <div className="insight-card green"><div className="insight-icon">🎯</div><div className="insight-content"><h4>On Target</h4><p>3 out of 4 readings in perfect range today</p></div></div>
                  <div className="insight-card blue"><div className="insight-icon">💡</div><div className="insight-content"><h4>Pattern Detected</h4><p>Post-lunch readings slightly high after rice meals</p></div></div>
                  <div className="insight-card orange"><div className="insight-icon">🍎</div><div className="insight-content"><h4>Food Tip</h4><p>Try brown rice or reduce portion by 25%</p></div></div>
                </div>
              </div>
              <div className="what-to-track">
                <h3>What to Track</h3>
                <div className="track-checklist">
                  {[{ i: '⏰', l: 'Time & date of test' }, { i: '💧', l: 'Blood glucose reading' }, { i: '🍽️', l: 'Meals eaten (what & how much)' }, { i: '💪', l: 'Physical activity' }, { i: '💊', l: 'Medications/insulin doses' }, { i: '😊', l: 'How you feel' }].map((t, idx) => (
                    <div key={idx} className="track-item"><span className="track-icon">{t.i}</span><span className="track-label">{t.l}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE MEAL PLANNER */}
        <section id="meal-planner" className="meal-planner-section">
          <div className="section-header">
            <div className="header-badge-prominent"><span className="badge-pulse"></span><span className="badge-text">Smart Indian Meal Builder</span></div>
            <h2 className="section-title-prominent">Build Your Perfect <span className="title-highlight">GDM-Friendly Plate</span></h2>
            <p className="section-subtitle-prominent">
              <span className="subtitle-sparkle">🍽️</span>
              Drag and drop Indian foods to build balanced meals — watch <strong>real-time glucose predictions</strong> and get instant nutritional feedback. Learn the art of plate balancing for optimal blood sugar control.
              <span className="subtitle-sparkle">🍽️</span>
            </p>
            <div className="streak-tracker" id="streakTracker"><span className="streak-icon">🔥</span><span className="streak-count" id="streakCount">0</span><span className="streak-label">day streak</span></div>
            <button className="track-levels-cta" onClick={() => (window as any).openSugarTracker?.()}><span className="cta-icon">📊</span><span className="cta-text">Track Your Glucose Levels</span><span className="cta-arrow">→</span></button>
          </div>

          <div className="meal-builder-layout">
            {/* LEFT: Plate Builder */}
            <div className="plate-builder-interactive">
              {/* Guided Meal Wizard */}
              <div className="guided-meal-wizard" id="mealWizard">
                <div className="wizard-header"><div className="wizard-step-indicator"><span className="wizard-step active" data-step="1">1</span><span className="step-line"></span><span className="wizard-step" data-step="2">2</span><span className="step-line"></span><span className="wizard-step" data-step="3">3</span></div><h3 className="wizard-title" id="wizardTitle">Step 1: Start with Vegetables</h3></div>
                <div className="wizard-content" id="wizardContent">
                  <p className="wizard-instruction">Fill half your plate with colorful vegetables first!</p>
                  <div className="wizard-goal"><div className="goal-icon">🎯</div><div className="goal-details"><span className="goal-label">Goal:</span><span className="goal-value">Add 2-3 vegetable items</span><div className="goal-progress"><div className="goal-progress-bar" id="goalProgress" style={{ width: '0%' }}></div></div></div></div>
                  <div className="wizard-recommendations" id="wizardRecs">
                    <h4>Recommended for You:</h4>
                    <div className="wizard-food-suggestions">
                      <div className="wizard-suggestion" onClick={() => (window as any).addFood?.('leafy-greens', 'vegetable', 'low', 'Leafy Greens', '🥬', 'medium')}><span className="suggestion-emoji">🥬</span><span className="suggestion-name">Leafy Greens</span><span className="suggestion-badge">Best Choice</span></div>
                      <div className="wizard-suggestion" onClick={() => (window as any).addFood?.('vegetables', 'vegetable', 'low', 'Mixed Veggies', '🥦', 'medium')}><span className="suggestion-emoji">🥦</span><span className="suggestion-name">Mixed Veggies</span><span className="suggestion-badge">Best Choice</span></div>
                    </div>
                  </div>
                  <div className="wizard-tip" id="wizardTip"><div className="tip-icon">💡</div><p><strong>Pro Tip:</strong> Eating vegetables first can reduce glucose spikes by up to 30%!</p></div>
                </div>
                <div className="wizard-actions">
                  <button className="wizard-btn skip" onClick={() => (window as any).skipWizard?.()}><span>Skip Guide</span></button>
                  <button className="wizard-btn back" onClick={() => (window as any).previousWizardStep?.()} style={{ display: 'none' }}><span>← Back</span></button>
                  <button className="wizard-btn next" onClick={() => (window as any).nextWizardStep?.()}><span>Next Step →</span></button>
                  <button className="wizard-btn finish" onClick={() => (window as any).finishWizard?.()} style={{ display: 'none' }}><span>✓ Finish</span></button>
                </div>
              </div>

              {/* Virtual Plate */}
              <div className="virtual-plate-container">
                <div className="virtual-plate" id="virtualPlate">
                  <div className="plate-section vegetables" id="plateVeggies"><span className="section-label">Vegetables<br />50%</span><div className="dropped-foods" id="veggiesDropped"></div></div>
                  <div className="plate-section protein" id="plateProtein"><span className="section-label">Protein<br />25%</span><div className="dropped-foods" id="proteinDropped"></div></div>
                  <div className="plate-section carbs" id="plateCarbs"><span className="section-label">Carbs<br />25%</span><div className="dropped-foods" id="carbsDropped"></div></div>
                </div>
                <div className="plate-actions">
                  <button className="plate-btn clear-btn" onClick={() => (window as any).clearPlate?.()}><span>Clear Plate</span></button>
                  <button className="plate-btn save-btn" onClick={() => (window as any).saveMeal?.()}><span>Save Meal</span></button>
                </div>
              </div>

              <button className="share-meal-btn" onClick={() => (window as any).shareMeal?.()}><span className="share-icon">📤</span> Share This Meal</button>

              {/* Share Modal */}
              <div className="share-modal" id="shareModal">
                <div className="share-modal-content">
                  <button className="close-share" onClick={() => (window as any).closeShareModal?.()}>✕</button>
                  <h3>Share Your Healthy Meal</h3>
                  <div className="share-options">
                    <button className="share-option" onClick={() => (window as any).shareVia?.('whatsapp')}><span>📱</span> WhatsApp</button>
                    <button className="share-option" onClick={() => (window as any).shareVia?.('email')}><span>📧</span> Email</button>
                    <button className="share-option" onClick={() => (window as any).shareVia?.('copy')}><span>📋</span> Copy Link</button>
                    <button className="share-option" onClick={() => (window as any).shareVia?.('image')}><span>🖼️</span> Save as Image</button>
                  </div>
                </div>
              </div>

              {/* Glucose Predictor */}
              <div className="glucose-predictor">
                <h3>Predicted Glucose Impact</h3>
                <div className="prediction-meter">
                  <div className="meter-bar-container"><div className="meter-bar-fill" id="predictionBar" style={{ width: '0%' }}></div></div>
                  <div className="meter-labels"><span className="meter-label low">Low Impact</span><span className="meter-label medium">Medium Impact</span><span className="meter-label high">High Impact</span></div>
                </div>
                <div className="macro-balance-chart">
                  <h4>Plate Balance</h4>
                  <canvas id="macroChart" width={200} height={200}></canvas>
                  <div className="balance-indicators">
                    <div className="balance-item"><span className="color-dot vegetables"></span><span className="label">Vegetables: <span id="vegPercent">0%</span></span></div>
                    <div className="balance-item"><span className="color-dot protein"></span><span className="label">Protein: <span id="proteinPercent">0%</span></span></div>
                    <div className="balance-item"><span className="color-dot carbs"></span><span className="label">Carbs: <span id="carbsPercent">0%</span></span></div>
                  </div>
                  <div className="balance-status" id="balanceStatus">🎯 Aim: 50% Veggies, 25% Protein, 25% Carbs</div>
                </div>
                <div className="prediction-details">
                  <div className="prediction-stat"><span className="stat-icon">📊</span><div className="stat-info"><span className="stat-label">Estimated Peak</span><span className="stat-value" id="predictedPeak">115 mg/dL</span></div></div>
                  <div className="prediction-stat"><span className="stat-icon">⏱️</span><div className="stat-info"><span className="stat-label">Time to Peak</span><span className="stat-value" id="timeToPeak">45-60 min</span></div></div>
                  <div className="prediction-stat"><span className="stat-icon">✓</span><div className="stat-info"><span className="stat-label">Status</span><span className="stat-value status-good" id="mealStatus">Safe Choice</span></div></div>
                </div>
                <div className="smart-suggestions" id="smartSuggestions"><h4>💡 Smart Suggestions</h4><ul id="suggestionsList"><li>Great choice! This meal has perfect protein-carb balance</li><li>Add more vegetables to fill you up and slow glucose absorption</li></ul></div>
                <div className="glucose-timeline"><h4>Predicted Glucose Response (2 hours)</h4><canvas id="glucoseCurve" width={400} height={200}></canvas><div className="timeline-markers"><span className="marker fasting">Fasting: 95</span><span className="marker one-hour">1hr: 135</span><span className="marker two-hour">2hr: 110</span></div><div className="timeline-zones"><div className="zone safe">✓ Safe Zone: &lt; 140 mg/dL</div><div className="zone warning">⚠️ Caution: 140-160 mg/dL</div><div className="zone danger">❌ Avoid: &gt; 160 mg/dL</div></div></div>

                {/* Meal Score Card */}
                <div className="meal-score-card">
                  <h3 className="score-card-title">Meal Score</h3>
                  <div className="score-circle-container">
                    <svg className="score-circle-svg" width="140" height="140" viewBox="0 0 140 140">
                      <defs><linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor: '#4caf50', stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: '#45a049', stopOpacity: 1 }} /></linearGradient></defs>
                      <circle className="score-bg" cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12"></circle>
                      <circle className="score-fill" cx="70" cy="70" r="60" fill="none" stroke="url(#scoreGradient)" strokeWidth="12" strokeLinecap="round" strokeDasharray="377" strokeDashoffset="377" transform="rotate(-90 70 70)" id="scoreCircle"></circle>
                    </svg>
                    <div className="score-text"><span className="score-value" id="mealScore">0</span><span className="score-max">/100</span></div>
                    <div className="score-rating" id="scoreRating">Build Your Meal</div>
                  </div>
                  <div className="score-breakdown">
                    {[{ icon: '🥦', name: 'Vegetable Power', barId: 'veggieBar', pointsId: 'veggiePoints' }, { icon: '⚖️', name: 'Plate Balance', barId: 'balanceBar', pointsId: 'balancePoints' }, { icon: '📉', name: 'Low GI Selection', barId: 'giBar', pointsId: 'giPoints' }].map(s => (
                      <div key={s.barId} className="score-item"><div className="score-item-header"><span className="score-icon">{s.icon}</span><span className="score-name">{s.name}</span></div><div className="score-bar"><div className="score-bar-fill" id={s.barId} style={{ width: '0%' }}></div></div><span className="score-points" id={s.pointsId}>+0</span></div>
                    ))}
                  </div>
                  <div className="achievements-section"><h4 className="achievements-title">🏆 Achievements Earned</h4><div className="achievements-earned" id="achievements"><div className="achievement-placeholder"><span className="placeholder-icon">🎯</span><p>Complete your first meal to earn achievements!</p></div></div></div>
                </div>
              </div>

              {/* Meal History */}
              <div className="meal-history-suggestions-container">
                <div className="meal-history-panel">
                  <h3>Your Meal History</h3>
                  <div className="history-filters">
                    <button onClick={() => (window as any).filterHistory?.('today')}>Today</button>
                    <button onClick={() => (window as any).filterHistory?.('week')}>This Week</button>
                    <button onClick={() => (window as any).filterHistory?.('favorites')}>⭐ Favorites</button>
                  </div>
                  <div className="history-list" id="mealHistory"></div>
                </div>
              </div>
            </div>

            {/* RIGHT: Food Selector */}
            <div className="food-selector-interactive">
              <div className="food-search"><input type="text" placeholder="Search foods..." className="search-input" id="foodSearch" /><span className="search-icon">🔍</span></div>

              <div className="food-comparison-tool"><button className="compare-btn" onClick={() => (window as any).openTrackerComparison?.()}>Compare Foods 🔍</button></div>

              {/* Comparison Overlay */}
              <div className="comparison-overlay" id="comparisonOverlay"></div>
              <div className="comparison-modal" id="comparisonModal">
                <div className="comparison-modal-content-new">
                  <button className="close-comparison" onClick={() => (window as any).closeComparison?.()}>✕</button>
                  <div className="modal-header-modern"><h2>⚖️ Compare Foods Side-by-Side</h2><p>Search and compare nutritional values for better glucose control</p></div>
                  <div className="compare-selection-area">
                    <div className="compare-slot">
                      <div className="slot-header">Food A</div>
                      <input type="text" className="compare-search-input" placeholder="Search food..." id="modalCompareA" onInput={() => (window as any).searchForModalCompare?.('A')} style={{ display: 'block', visibility: 'visible' as any, opacity: 1 }} />
                      <div className="compare-suggestions" id="modalSuggestionsA"></div>
                      <div className="selected-food-compare" id="modalSelectedA"><div className="slot-placeholder">Select a food to compare</div></div>
                    </div>
                    <div className="compare-vs"><div className="vs-circle">VS</div></div>
                    <div className="compare-slot">
                      <div className="slot-header">Food B</div>
                      <input type="text" className="compare-search-input" placeholder="Search food..." id="modalCompareB" onInput={() => (window as any).searchForModalCompare?.('B')} style={{ display: 'block', visibility: 'visible' as any, opacity: 1 }} />
                      <div className="compare-suggestions" id="modalSuggestionsB"></div>
                      <div className="selected-food-compare" id="modalSelectedB"><div className="slot-placeholder">Select a food to compare</div></div>
                    </div>
                  </div>
                  <div className="comparison-results" id="modalComparisonResults"><div className="comparison-placeholder"><div className="placeholder-icon-large">⚖️</div><p>Select two foods to see detailed comparison</p></div></div>
                </div>
              </div>
              <div className="comparison-backdrop" id="comparisonBackdrop" onClick={() => (window as any).closeComparison?.()}></div>

              {/* Cuisine Selector */}
              <div className="cuisine-selector"><h4>Choose Your Cuisine Style</h4><select id="cuisineStyle" onChange={() => (window as any).updateFoodOptions?.()}><option value="all">All Indian Foods</option><option value="north">North Indian</option><option value="south">South Indian</option><option value="east">East Indian</option><option value="west">West Indian</option><option value="fusion">Modern Fusion</option></select></div>

              {/* Dietary Filters */}
              <div className="dietary-filters"><h4>Customize Your Options</h4><div className="filter-buttons">
                {[{ f: 'vegetarian', i: '🥬', l: 'Vegetarian' }, { f: 'non-veg', i: '🍗', l: 'Non-Veg' }, { f: 'vegan', i: '🌱', l: 'Vegan' }, { f: 'gluten-free', i: '🌾', l: 'Gluten-Free' }, { f: 'dairy-free', i: '🥛', l: 'Dairy-Free' }].map(df => (
                  <button key={df.f} className="filter-btn" data-filter={df.f} onClick={() => (window as any).toggleFilter?.(df.f)}><span className="filter-icon">{df.i}</span> {df.l}</button>
                ))}
              </div></div>

              {/* Excellent Choices */}
              <div className="food-category">
                <h4 className="category-title">✅ Excellent Choices (Low GI)</h4>
                <div className="food-grid draggable">
                  <div className="food-item good draggable-food" draggable data-type="vegetable" data-gi="low" data-food="leafy-greens">
                    <div className="food-item" data-tooltip-id="leafy-greens"><span className="food-icon">🥬</span><span className="food-name">Leafy Greens</span><span className="gi-badge low">GI: 15</span><span className="info-icon" onClick={() => (window as any).showFoodInfo?.('leafy-greens')}>ℹ️</span></div>
                    <div className="food-info-tooltip" id="tooltip-leafy-greens">
                      <div className="tooltip-header"><h4>🥬 Leafy Greens</h4><button className="close-tooltip">×</button></div>
                      <div className="tooltip-body">
                        <div className="nutrient-info"><span className="label">GI:</span><span className="value">15 (Very Low)</span></div>
                        <div className="nutrient-info"><span className="label">Fiber:</span><span className="value">High - Slows glucose absorption</span></div>
                        <div className="nutrient-info"><span className="label">Benefits:</span><ul><li>Rich in folate (essential for baby's development)</li><li>High in iron (prevents anemia)</li><li>Minimal effect on blood sugar</li></ul></div>
                        <div className="portion-guide"><h5>Serving Guide:</h5><div className="portion-visual"><p>1 cup cooked = 1 serving</p></div></div>
                        <div className="recipe-links"><h5>Try These Recipes:</h5><a href="#recipe1">Palak Paneer (Low GI)</a><a href="#recipe2">Saag Dal</a></div>
                      </div>
                    </div>
                  </div>
                  {[
                    { food: 'dal', type: 'protein', gi: 'low', icon: '🫘', name: 'Dal/Legumes', giVal: '28', portions: true },
                    { food: 'brown-rice', type: 'carbs', gi: 'low', icon: '🍚', name: 'Brown Rice', giVal: '50', portions: true },
                    { food: 'eggs', type: 'protein', gi: 'low', icon: '🥚', name: 'Eggs', giVal: '0' },
                    { food: 'curd', type: 'protein', gi: 'low', icon: '🥛', name: 'Curd/Yogurt', giVal: '36' },
                    { food: 'vegetables', type: 'vegetable', gi: 'low', icon: '🥦', name: 'Mixed Veggies', giVal: '20' },
                    { food: 'fish', type: 'protein', gi: 'low', icon: '🐟', name: 'Fish', giVal: '0' },
                    { food: 'roti', type: 'carbs', gi: 'medium', icon: '🫓', name: 'Whole Wheat Roti', giVal: '62' },
                  ].map(f => (
                    <div key={f.food} className="food-item good draggable-food" draggable data-type={f.type} data-gi={f.gi} data-food={f.food}>
                      <span className="food-icon">{f.icon}</span><span className="food-name">{f.name}</span><span className={`gi-badge ${f.gi}`}>GI: {f.giVal}</span>
                      {f.portions && (
                        <div className="portion-controls">
                          {[{ s: 'small', i: '🥄', l: 'Small' }, { s: 'medium', i: '🍽️', l: 'Med' }, { s: 'large', i: '🍲', l: 'Large' }].map(p => (
                            <button key={p.s} className={`portion-btn ${p.s}`} onClick={() => (window as any).addFood?.(f.food, f.type, f.gi, f.name, f.icon, p.s)}><span className="portion-icon">{p.i}</span><span className="portion-label">{p.l}</span></button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Medium GI */}
              <div className="food-category">
                <h4 className="category-title">⚠️ Use Sparingly (Medium GI)</h4>
                <div className="food-grid draggable">
                  {[{ food: 'white-rice', icon: '🍚', name: 'White Rice', gi: '73' }, { food: 'potato', icon: '🥔', name: 'Potato', gi: '78' }, { food: 'banana', icon: '🍌', name: 'Banana', gi: '51' }].map(f => (
                    <div key={f.food} className="food-item moderate draggable-food" draggable data-type="carbs" data-gi="medium" data-food={f.food}><span className="food-icon">{f.icon}</span><span className="food-name">{f.name}</span><span className="gi-badge medium">GI: {f.gi}</span></div>
                  ))}
                </div>
              </div>

              {/* High GI */}
              <div className="food-category">
                <h4 className="category-title">❌ Avoid (High GI)</h4>
                <div className="food-grid draggable">
                  {[{ food: 'sweets', icon: '🧁', name: 'Sweets', gi: '90+' }, { food: 'sugary-drinks', icon: '🥤', name: 'Sugary Drinks', gi: '95+' }, { food: 'fried', icon: '🍟', name: 'Fried Foods', gi: '85+' }, { food: 'white-bread', icon: '🍞', name: 'White Bread', gi: '75' }].map(f => (
                    <div key={f.food} className="food-item avoid" data-food={f.food}><span className="food-icon">{f.icon}</span><span className="food-name">{f.name}</span><span className="gi-badge high">GI: {f.gi}</span></div>
                  ))}
                </div>
              </div>

              {/* GI Info */}
              <div className="gi-info-box"><h4>Understanding Glycemic Index (GI)</h4><div className="gi-scale"><div className="gi-range low"><span className="gi-value">0-55</span><span className="gi-label">Low GI - Best Choice</span></div><div className="gi-range medium"><span className="gi-value">56-69</span><span className="gi-label">Medium GI - Moderate</span></div><div className="gi-range high"><span className="gi-value">70+</span><span className="gi-label">High GI - Limit/Avoid</span></div></div></div>

              {/* Meal Suggestions */}
              <div className="meal-suggestions"><h3>Quick Meal Ideas</h3><div className="suggestion-cards">
                {[{ t: 'breakfast1', icon: '🌅', title: 'Perfect Breakfast', desc: 'Oats upma + boiled egg + buttermilk', s1: 'GI: Low', s2: 'Protein: High' }, { t: 'lunch1', icon: '☀️', title: 'Balanced Lunch', desc: 'Brown rice + dal + mixed veggies + salad', s1: 'GI: Low', s2: 'Fiber: High' }, { t: 'dinner1', icon: '🌙', title: 'Light Dinner', desc: 'Grilled fish + roti + vegetable curry', s1: 'GI: Low', s2: 'Omega-3: High' }].map(m => (
                  <div key={m.t} className="suggestion-card" onClick={() => (window as any).loadMealTemplate?.(m.t)}><div className="suggestion-icon">{m.icon}</div><h4>{m.title}</h4><p>{m.desc}</p><div className="suggestion-stats"><span className="stat">{m.s1}</span><span className="stat">{m.s2}</span></div></div>
                ))}
              </div></div>
            </div>
          </div>
        </section>

        {/* SUPPORT COMMUNITY */}
        <section id="support" className="community-section">
          <div className="section-header">
            <div className="header-badge"><span className="badge-pulse"></span><span className="badge-text">You're Not Alone - 2,500+ Mothers</span></div>
            <h2 className="section-title">Join Our Thriving Community</h2>
            <p className="section-subtitle">Connect with thousands of mothers managing GDM. Share stories, get support, and learn from each other's experiences.</p>
          </div>
          <div className="community-grid">
            {/* WhatsApp */}
            <div className="community-card clickable" onClick={() => window.open('https://chat.whatsapp.com/invite-link', '_blank')}><div className="card-icon-animated">💬</div><div className="card-badge live">Live Chat</div><h3>WhatsApp Support Groups</h3><p>24/7 peer support from mothers experiencing GDM right now</p><div className="community-stats"><span className="stat"><span className="stat-icon">👥</span><span className="stat-text">450+ Active Members</span></span><span className="stat"><span className="stat-icon">💬</span><span className="stat-text">100+ Daily Messages</span></span></div><div className="live-activity"><div className="activity-dot"></div><span>12 members active now</span></div><button className="community-btn"><span>Join WhatsApp Group</span><span className="btn-arrow">→</span></button></div>
            {/* Facebook */}
            <div className="community-card clickable" onClick={() => window.open('https://www.facebook.com/groups/gestational-diabetes-india', '_blank')}><div className="card-icon-animated">👥</div><div className="card-badge popular">Most Popular</div><h3>Facebook Community</h3><p>Share experiences, meal ideas, and victories with mothers across India</p><div className="community-stats"><span className="stat"><span className="stat-icon">👥</span><span className="stat-text">1,200+ Members</span></span><span className="stat"><span className="stat-icon">📝</span><span className="stat-text">Daily Posts</span></span></div><div className="recent-topics"><h4>Recent Topics:</h4><ul><li>"My glucose finally under control!"</li><li>"Best low-GI Indian breakfast ideas"</li><li>"Managing GDM at work"</li></ul></div><button className="community-btn"><span>Join Facebook Group</span><span className="btn-arrow">→</span></button></div>
            {/* Telegram */}
            <div className="community-card clickable" onClick={() => window.open('https://t.me/gdm_support_india', '_blank')}><div className="card-icon-animated">📱</div><div className="card-badge expert">Expert Tips</div><h3>Telegram Channel</h3><p>Daily tips, meal ideas, and expert advice delivered to your phone</p><div className="community-stats"><span className="stat"><span className="stat-icon">📢</span><span className="stat-text">800+ Subscribers</span></span><span className="stat"><span className="stat-icon">⭐</span><span className="stat-text">Expert Curated</span></span></div><div className="channel-preview"><h4>Today's Tip:</h4><p>"Add 1 tbsp of cinnamon to your morning oats - may help regulate blood sugar!"</p></div><button className="community-btn"><span>Subscribe to Channel</span><span className="btn-arrow">→</span></button></div>
            {/* Reddit */}
            <div className="community-card clickable" onClick={() => window.open('https://www.reddit.com/r/GestationalDiabetes/', '_blank')}><div className="card-icon-animated">📖</div><div className="card-badge global">Global Community</div><h3>Reddit Discussions</h3><p>In-depth discussions, scientific articles, and global perspectives</p><div className="community-stats"><span className="stat"><span className="stat-icon">🌍</span><span className="stat-text">15,000+ Members</span></span><span className="stat"><span className="stat-icon">💡</span><span className="stat-text">Evidence-Based</span></span></div><div className="reddit-highlights"><h4>Top Discussions:</h4><ul><li>"GDM success stories compilation"</li><li>"Latest research on GDM management"</li><li>"International meal ideas"</li></ul></div><button className="community-btn"><span>Join Reddit</span><span className="btn-arrow">→</span></button></div>
            {/* Virtual Meetups */}
            <div className="community-card clickable" onClick={() => window.open('https://meet.google.com/gdm-support', '_blank')}><div className="card-icon-animated">🎥</div><div className="card-badge">Weekly Sessions</div><h3>Virtual Support Meetups</h3><p>Weekly video calls with healthcare educators and peer support</p><div className="community-stats"><span className="stat"><span className="stat-icon">📅</span><span className="stat-text">Every Saturday 5 PM</span></span><span className="stat"><span className="stat-icon">👨‍⚕️</span><span className="stat-text">Expert Led</span></span></div><div className="next-session"><h4>Next Session:</h4><p><strong>Saturday, Feb 8 at 5:00 PM</strong></p><p>Topic: "Indian Meal Planning for GDM"</p><p>Speaker: Dr. Priya Sharma, Nutritionist</p></div><button className="community-btn"><span>Register for Meetup</span><span className="btn-arrow">→</span></button></div>
            {/* Success Stories */}
            <div className="community-card clickable" onClick={() => (window as any).openSuccessStories?.()}><div className="card-icon-animated">⭐</div><div className="card-badge inspiring">Inspiring</div><h3>Success Stories</h3><p>Read how other mothers managed GDM and had healthy babies</p><div className="community-stats"><span className="stat"><span className="stat-icon">📖</span><span className="stat-text">500+ Stories</span></span><span className="stat"><span className="stat-icon">❤️</span><span className="stat-text">Hope &amp; Inspiration</span></span></div><div className="story-preview"><div className="story-quote">"I was terrified when diagnosed at 26 weeks. With diet changes and walking, I managed without insulin. My baby was born healthy at 3.2 kg!" - Priya, Mumbai</div></div><button className="community-btn"><span>Read Stories</span><span className="btn-arrow">→</span></button></div>
            {/* Expert Q&A */}
            <div className="community-card clickable" onClick={() => window.open('https://forms.gle/gdm-expert-qa', '_blank')}><div className="card-icon-animated">🩺</div><div className="card-badge">Free</div><h3>Ask the Experts</h3><p>Monthly Q&amp;A with endocrinologists, nutritionists, and obstetricians</p><div className="community-stats"><span className="stat"><span className="stat-icon">📅</span><span className="stat-text">Last Sunday/Month</span></span><span className="stat"><span className="stat-icon">🎓</span><span className="stat-text">Certified Experts</span></span></div><div className="expert-panel"><h4>Expert Panel:</h4><ul><li>Dr. Anjali Mehta - Endocrinologist</li><li>Dr. Kavita Singh - Obstetrician</li><li>Neha Gupta - Clinical Nutritionist</li></ul></div><button className="community-btn"><span>Submit Question</span><span className="btn-arrow">→</span></button></div>
            {/* Local Support */}
            <div className="community-card clickable" onClick={() => (window as any).findLocalGroups?.()}><div className="card-icon-animated">📍</div><div className="card-badge">Near You</div><h3>Local Support Groups</h3><p>Find in-person support groups in your city</p><div className="community-stats"><span className="stat"><span className="stat-icon">🏙️</span><span className="stat-text">25+ Cities</span></span><span className="stat"><span className="stat-icon">🤝</span><span className="stat-text">In-Person Meetups</span></span></div><div className="location-finder"><input type="text" placeholder="Enter your city..." className="city-input" /><button className="find-btn">Find Groups</button></div><button className="community-btn"><span>Browse All Cities</span><span className="btn-arrow">→</span></button></div>
          </div>
          {/* Community Guidelines */}
          <div className="community-guidelines"><h3>Community Guidelines</h3><div className="guidelines-grid">
            {[{ i: '💝', t: 'Be Kind & Supportive', d: "We're all on this journey together" }, { i: '🔒', t: 'Privacy First', d: "What's shared here stays here" }, { i: '🩺', t: 'Medical Advice Disclaimer', d: 'Always consult your doctor' }, { i: '🌟', t: 'Share Your Wins', d: 'Celebrate every victory, big or small' }].map((g, idx) => (
              <div key={idx} className="guideline-item"><span className="guideline-icon">{g.i}</span><h4>{g.t}</h4><p>{g.d}</p></div>
            ))}
          </div></div>
        </section>

      </div>

      {/* TOPIC PANEL */}
      <div className="topic-panel" id="topicPanel"><button className="close-panel" onClick={() => (window as any).closeTopicPanel?.()}>✕</button><div className="panel-scroll"><div className="panel-header" id="panelHeader"><div className="panel-icon" id="panelIcon"></div><div className="panel-title-block"><h2 id="panelTitle" aria-label="Topic title"></h2><p id="panelSubtitle"></p></div></div><div className="panel-content" id="panelContent"></div></div></div>
      {/* BACKDROP */}
      <div className="backdrop" id="backdrop" onClick={() => (window as any).closeTopicPanel?.()}></div>
      {/* QUIZ MODAL */}
      <div className="quiz-modal" id="quizModal"><div className="quiz-container"><button className="close-quiz" onClick={() => (window as any).closeQuiz?.()}>✕</button><h2>GDM Knowledge Quiz</h2><p className="quiz-intro">Test your understanding of gestational diabetes</p><div className="quiz-content" id="quizContent"></div></div></div>

      {/* SUGAR TRACKER MODAL */}
      <div className="sugar-tracker-modal" id="sugarTrackerModal">
        <div className="tracker-container-new">
          <button className="close-tracker" onClick={() => (window as any).closeSugarTracker?.()}>✕</button>
          <div className="tracker-header-modern">
            <div className="header-glass-card">
              <div className="header-content-flex">
                <div className="header-icon-modern">🍽️</div>
                <div><h2 className="tracker-title-modern">Smart Meal &amp; Glucose Tracker</h2><p className="tracker-subtitle">Track meals • Monitor glucose • Stay healthy</p></div>
              </div>
              <div className="quick-stats-row">
                <div className="quick-stat-pill"><span className="stat-icon">📊</span><span id="todayReadingsCount">0</span> Today</div>
                <div className="quick-stat-pill success"><span className="stat-icon">✓</span><span id="inRangeToday">0</span> In Range</div>
                <div className="quick-stat-pill"><span className="stat-icon">📈</span><span id="avgToday">--</span> mg/dL Avg</div>
              </div>
            </div>
          </div>
          <div className="tracker-tabs">
            <button className="tab-btn active" data-tab="log" onClick={() => (window as any).switchTrackerTab?.('log')}><span className="tab-icon">📝</span> Log Meal</button>
            <button className="tab-btn" data-tab="search" onClick={() => (window as any).switchTrackerTab?.('search')}><span className="tab-icon">🔍</span> Search Foods</button>
            <button className="tab-btn" data-tab="compare" onClick={() => (window as any).switchTrackerTab?.('compare')}><span className="tab-icon">⚖️</span> Compare Foods</button>
            <button className="tab-btn" data-tab="history" onClick={() => (window as any).switchTrackerTab?.('history')}><span className="tab-icon">📋</span> History</button>
          </div>

          {/* TAB 1: LOG MEAL */}
          <div className="tab-content active" id="tab-log">
            <div className="log-meal-grid">
              <div className="meal-entry-card glass-card">
                <h3 className="card-title"><span className="title-icon">🍽️</span> Log Your Meal</h3>
                <div className="form-group-modern"><label className="form-label">📅 Date &amp; Time</label><div className="datetime-flex"><input type="datetime-local" id="mealDateTime" className="input-modern" /><button className="btn-now" onClick={() => (window as any).setNow?.()}>Now</button></div></div>
                <div className="form-group-modern">
                  <label className="form-label">⏰ Meal Type</label>
                  <div className="meal-type-carousel">
                    {[{ t: 'fasting', i: '🌅', n: 'Fasting', target: '<95' }, { t: 'breakfast', i: '🍳', n: 'Breakfast', target: '<140' }, { t: 'lunch', i: '🍽️', n: 'Lunch', target: '<140' }, { t: 'snack', i: '🥗', n: 'Snack', target: '<120' }, { t: 'dinner', i: '🌙', n: 'Dinner', target: '<140' }].map(mt => (
                      <button key={mt.t} className="meal-type-card" data-type={mt.t} onClick={() => (window as any).selectMealType?.(mt.t)}><div className="meal-icon">{mt.i}</div><div className="meal-name">{mt.n}</div><div className="meal-target">{mt.target}</div></button>
                    ))}
                  </div>
                </div>
                <div className="form-group-modern">
                  <label className="form-label">🩸 Glucose Reading</label>
                  <div className="glucose-input-wrapper"><input type="number" id="glucoseReading" className="glucose-input-large" placeholder="--" min={40} max={400} /><span className="glucose-unit">mg/dL</span><div className="glucose-status" id="glucoseStatus"></div></div>
                  <div className="quick-glucose-btns">
                    {[85, 95, 110, 125, 140].map(v => <button key={v} className="quick-glucose" onClick={() => (window as any).setGlucose?.(v)}>{v}</button>)}
                  </div>
                </div>
                <div className="form-group-modern">
                  <label className="form-label">🍴 What did you eat?</label>
                  <div className="food-search-wrapper"><input type="text" id="foodSearchInput" className="input-modern" placeholder="Type to search foods..." onInput={() => (window as any).searchFoodsInline?.()} /><div className="food-suggestions" id="foodSuggestions"></div></div>
                  <div className="selected-foods" id="selectedFoods"></div>
                </div>
                <div className="form-group-modern"><label className="form-label">💭 Notes (Optional)</label><textarea id="mealNotes" className="textarea-modern" rows={3} placeholder="How are you feeling? Any symptoms?"></textarea></div>
                <div className="action-btns-row">
                  <button className="btn-secondary-modern" onClick={() => (window as any).clearMealForm?.()}><span>🔄</span> Clear</button>
                  <button className="btn-primary-modern" onClick={() => (window as any).saveMealEntry?.()}><span>💾</span> Save Entry</button>
                </div>
              </div>
              <div className="preview-column">
                <div className="glass-card preview-card"><h3 className="card-title"><span className="title-icon">👁️</span> Live Preview</h3><div className="entry-preview" id="entryPreview"><div className="preview-placeholder"><div className="placeholder-icon">📝</div><p>Start filling the form to see preview</p></div></div></div>
                <div className="glass-card insights-quick"><h3 className="card-title"><span className="title-icon">💡</span> Quick Tips</h3><div className="tips-list">
                  {[{ i: '⏱️', t: 'Measure 1-2 hours after eating' }, { i: '🚶', t: 'Walk 10-15 min after meals' }, { i: '💧', t: 'Stay well hydrated' }].map((tip, idx) => (
                    <div key={idx} className="tip-item"><span className="tip-icon">{tip.i}</span><span>{tip.t}</span></div>
                  ))}
                </div></div>
              </div>
            </div>
          </div>

          {/* TAB 2: SEARCH FOODS */}
          <div className="tab-content" id="tab-search">
            <div className="search-foods-container">
              <div className="search-header-card glass-card">
                <h3 className="card-title"><span className="title-icon">🔍</span> Search Food Database</h3>
                <p className="search-subtitle">Find glycemic index, carbs, and impact on blood sugar</p>
                <div className="search-bar-modern"><span className="search-icon">🔍</span><input type="text" id="foodSearchMain" className="search-input-large" placeholder="Search for rice, roti, fruits, vegetables..." onInput={() => (window as any).performFoodSearch?.()} /><button className="search-btn-modern" onClick={() => (window as any).performFoodSearch?.()}>Search</button></div>
                <div className="search-filters">
                  {['all', 'grains', 'fruits', 'vegetables', 'protein', 'dairy'].map(f => (
                    <button key={f} className={`filter-chip${f === 'all' ? ' active' : ''}`} data-filter={f} onClick={() => (window as any).filterFoodCategory?.(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div className="search-results-grid" id="searchResultsGrid"><div className="search-placeholder"><div className="placeholder-icon-large">🔍</div><h4>Search for foods to see detailed information</h4><p>Get glycemic index, carb content, and blood sugar impact</p></div></div>
            </div>
          </div>

          {/* TAB 3: COMPARE FOODS */}
          <div className="tab-content" id="tab-compare">
            <div className="compare-container">
              <div className="compare-header-card glass-card"><h3 className="card-title"><span className="title-icon">⚖️</span> Compare Foods Side-by-Side</h3><p className="search-subtitle">Choose healthier alternatives for better glucose control</p></div>
              <div className="compare-selection-area">
                <div className="compare-slot"><div className="slot-header">Food A</div><input type="text" className="compare-search-input" placeholder="Search food..." id="compareA" onInput={() => (window as any).searchForCompare?.('A')} style={{ display: 'block', visibility: 'visible' as any, opacity: 1 }} /><div className="compare-suggestions" id="suggestionsA"></div><div className="selected-food-compare" id="selectedA"><div className="slot-placeholder">Select a food to compare</div></div></div>
                <div className="compare-vs"><div className="vs-circle">VS</div></div>
                <div className="compare-slot"><div className="slot-header">Food B</div><input type="text" className="compare-search-input" placeholder="Search food..." id="compareB" onInput={() => (window as any).searchForCompare?.('B')} style={{ display: 'block', visibility: 'visible' as any, opacity: 1 }} /><div className="compare-suggestions" id="suggestionsB"></div><div className="selected-food-compare" id="selectedB"><div className="slot-placeholder">Select a food to compare</div></div></div>
              </div>
              <div className="comparison-results" id="comparisonResults"><div className="comparison-placeholder"><div className="placeholder-icon-large">⚖️</div><p>Select two foods to see detailed comparison</p></div></div>
            </div>
          </div>

          {/* TAB 4: HISTORY */}
          <div className="tab-content" id="tab-history">
            <div className="history-modern-container">
              <div className="history-controls glass-card">
                <div className="controls-flex">
                  <div className="search-history"><span className="search-icon">🔍</span><input type="text" id="historySearch" className="search-input-small" placeholder="Search history..." onInput={() => (window as any).filterHistory?.()} /></div>
                  <div className="history-actions">
                    <button className="btn-icon-modern" onClick={() => (window as any).exportHistory?.()} title="Export Data"><span>📤</span></button>
                    <button className="btn-icon-modern danger" onClick={() => (window as any).clearAllHistory?.()} title="Clear All"><span>🗑️</span></button>
                  </div>
                </div>
                <div className="date-range-filter"><label>Date Range:</label><select id="dateRangeFilter" className="select-modern" onChange={() => (window as any).filterHistoryByDate?.()}><option value="all">All Time</option><option value="today">Today</option><option value="week">This Week</option><option value="month">This Month</option></select></div>
              </div>
              <div className="history-stats-row">
                {[{ icon: '📊', valId: 'totalEntries', val: '0', label: 'Total Entries' }, { icon: '✓', valId: 'inRangePercent', val: '0%', label: 'In Target Range', cls: 'success' }, { icon: '📈', valId: 'avgGlucoseAll', val: '--', label: 'Average Glucose' }].map(s => (
                  <div key={s.valId} className="stat-card-modern"><div className={`stat-icon-modern${s.cls ? ' ' + s.cls : ''}`}>{s.icon}</div><div className="stat-content"><div className="stat-value-modern" id={s.valId}>{s.val}</div><div className="stat-label-modern">{s.label}</div></div></div>
                ))}
              </div>
              <div className="timeline-view" id="historyTimeline"><div className="search-placeholder"><div className="placeholder-icon-large">📋</div><h4>No entries yet</h4><p>Start logging your meals to see your history here</p></div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="tracker-backdrop" id="trackerBackdrop" onClick={() => (window as any).closeSugarTracker?.()}></div>

    </div>
  );
};

export default GestationalDiabetes;
