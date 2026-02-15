import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routeConstants';
import '../../styles/pages/services.css';

interface SymptomData {
  title: string;
  icon: string;
  desc: string;
  tip: string;
  link: string;
}

const symptomData: Record<string, SymptomData> = {
  'hot-flash': {
    title: 'Hot Flashes',
    icon: '🔥',
    desc: 'Sudden feelings of intense heat, sweating, and flushed skin. Affects 75% of women.',
    tip: 'Dress in layers, keep ice water nearby, and identify your personal triggers (like caffeine or spicy food).',
    link: ROUTES.MENOPAUSE
  },
  'brain-fog': {
    title: 'Brain Fog',
    icon: '🧠',
    desc: 'Forgetfulness, difficulty focusing, or feeling "fuzzy." Linked to estrogen drops affecting brain glucose.',
    tip: 'Prioritize sleep and try Mediterranean diet foods rich in Omega-3s.',
    link: ROUTES.MENOPAUSE
  },
  'joint-pain': {
    title: 'Joint Pain',
    icon: '🦴',
    desc: 'Aches and stiffness, often termed "menopause arthritis." Estrogen acts as a natural anti-inflammatory.',
    tip: 'Gentle yoga or swimming can keep joints lubricated without high impact.',
    link: ROUTES.BONE_HEALTH
  },
  'mood': {
    title: 'Mood Swings',
    icon: '⚡',
    desc: 'Irritability, sadness, or anxiety spikes. Hormonal fluctuations can disrupt serotonin levels.',
    tip: 'Daily mindfulness or walking in nature helps regulate emotional baselines.',
    link: ROUTES.MENTAL_WELLNESS
  },
  'sleep': {
    title: 'Insomnia',
    icon: '😴',
    desc: 'Difficulty falling or staying asleep. Often triggered by night sweats.',
    tip: 'Keep your bedroom cool (65°F/18°C) and avoid screens 1 hour before bed.',
    link: ROUTES.MENOPAUSE
  },
  'weight': {
    title: 'Weight Gain',
    icon: '⚖️',
    desc: 'Metabolism slows and fat distribution shifts to the abdomen due to lower estrogen.',
    tip: 'Focus on strength training to build muscle mass, which boosts metabolism.',
    link: ROUTES.NUTRITION_GUIDE
  },
  'anxiety': {
    title: 'Anxiety',
    icon: '😰',
    desc: 'Sudden feelings of panic or unease, even without a specific trigger.',
    tip: 'Practice "Box Breathing": Inhale 4s, Hold 4s, Exhale 4s, Hold 4s.',
    link: ROUTES.MENTAL_WELLNESS
  },
  'libido': {
    title: 'Low Libido',
    icon: '❤️‍🔥',
    desc: 'Decreased desire or physical dryness. Very common and treatable.',
    tip: 'Talk to a doctor about local estrogen therapy or lubricants. Intimacy takes many forms.',
    link: ROUTES.MENOPAUSE
  }
};

const Services: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [symptomPopup, setSymptomPopup] = useState<{ isOpen: boolean; data: SymptomData | null }>({
    isOpen: false,
    data: null
  });
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const trackingParticleCanvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Particle animation
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      radius: number = 1;

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId: number;
    const animateParticles = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Tracking section particle animation
  useEffect(() => {
    const canvas = trackingParticleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class TrackingParticle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      radius: number = 1;

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2.5 + 1;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(236, 64, 122, 0.6)';
        ctx.fill();
      }
    }

    const particles: TrackingParticle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new TrackingParticle());
    }

    const connectParticles = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(236, 64, 122, ${0.25 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId: number;
    const animateParticles = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scroll animations for severity cards
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const severityCards = document.querySelectorAll('.severity-card');
    severityCards.forEach(card => {
      const cardEl = card as HTMLElement;
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'translateY(30px)';
      cardEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });

    return () => {
      severityCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const handleFilter = (category: string) => {
    setActiveFilter(category);
  };

  const handleAccordionToggle = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const showSymptomInfo = (id: string) => {
    const data = symptomData[id];
    if (!data) return;
    setSymptomPopup({ isOpen: true, data });
  };

  const closeSymptomInfo = () => {
    setSymptomPopup({ isOpen: false, data: null });
  };

  const shouldShowCard = (category: string) => {
    return activeFilter === 'all' || activeFilter === category;
  };

  return (
    <div className="services-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <canvas id="heroParticleCanvas" ref={particleCanvasRef}></canvas>
        <div className="gradient-morph"></div>
        <h1>Your Complete <span className="title-emphasis">Health Journey</span></h1>
        <p>From planning to parenthood, menopause to wellness—we're with you every step of the way.</p>
      </section>

      <div style={{ background: 'var(--bg)', padding: '2rem 0' }}>
        {/* Filter Buttons */}
        <div className="stage-filter-container">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
          >
            All Services
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'planning' ? 'active' : ''}`}
            onClick={() => handleFilter('planning')}
          >
            Planning
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'pregnancy' ? 'active' : ''}`}
            onClick={() => handleFilter('pregnancy')}
          >
            Pregnancy
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'postpartum' ? 'active' : ''}`}
            onClick={() => handleFilter('postpartum')}
          >
            Postpartum
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'menopause' ? 'active' : ''}`}
            onClick={() => handleFilter('menopause')}
          >
            Menopause
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'wellness' ? 'active' : ''}`}
            onClick={() => handleFilter('wellness')}
          >
            Wellness
          </button>
        </div>

        {/* Planning Section */}
        <section className="section services-section" id="planning">
          <h2>
            <span className="section-icon">🌸</span>
            <span>Planning Your <span className="gradient-text">Future</span></span>
          </h2>
          
          <div className="services-grid">
            <Link 
              to={ROUTES.FERTILITY} 
              className={`service-card ${shouldShowCard('planning') ? '' : 'hidden'}`}
              data-category="planning"
            >
              <div className="service-icon">🌺</div>
              <h3>Fertility Awareness</h3>
              <p>Understand your fertile window, track ovulation, and optimize your chances of conception with science-backed guidance.</p>
              <span className="service-badge">Conception Support</span>
            </Link>

            <Link 
              to={ROUTES.CONCEPTION_GUIDE} 
              className={`service-card ${shouldShowCard('planning') ? '' : 'hidden'}`}
              data-category="planning"
            >
              <div className="service-icon">💝</div>
              <h3>Conceiving Guide</h3>
              <p>Complete roadmap from trying to conceive to early pregnancy detection. Personalized tips for your journey.</p>
              <span className="service-badge">Planning Tools</span>
            </Link>

            <Link 
              to={ROUTES.SCREENING} 
              className={`service-card ${shouldShowCard('planning') ? '' : 'hidden'}`}
              data-category="planning"
            >
              <div className="service-icon">🔬</div>
              <h3>Preconception Screening</h3>
              <p>Essential health checks, genetic counseling, and lifestyle optimization before you conceive.</p>
              <span className="service-badge">Health Assessment</span>
            </Link>
          </div>
        </section>

        {/* Pregnancy Journey Timeline */}
        <section className="section" id="pregnancy">
          <h2>
            <span className="section-icon">🤰</span>
            <span>Your <span className="gradient-text">Pregnancy</span> Journey</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-soft)', marginBottom: '2rem' }}>
            Navigate each trimester with confidence—from first kicks to labor preparation.
          </p>

          <div className="journey-timeline">
            <div className="timeline-track">
              <div className="timeline-item">
                <div className="timeline-icon">📋</div>
                <div className="timeline-content">
                  <h4>Comprehensive Care Plan</h4>
                  <p>Your personalized 9-month roadmap covering all appointments, tests, and milestones.</p>
                  <div className="timeline-links">
                    <Link to={ROUTES.PREGNANCY} className="timeline-link">
                      <span>🗺️</span> Full Journey Map
                    </Link>
                    <Link to={ROUTES.PERINATAL} className="timeline-link">
                      <span>📅</span> Antenatal Visits
                    </Link>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-icon">🩺</div>
                <div className="timeline-content">
                  <h4>High-Risk Condition Management</h4>
                  <p>Specialized support for gestational diabetes, preeclampsia, and other complications.</p>
                  <div className="timeline-links">
                    <Link to={ROUTES.GESTATIONAL_DIABETES} className="timeline-link">
                      <span>📈</span> GDM Guide
                    </Link>
                    <Link to={ROUTES.PREECLAMPSIA_EDUCATION} className="timeline-link">
                      <span>❤️</span> Preeclampsia Ed
                    </Link>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-icon">💉</div>
                <div className="timeline-content">
                  <h4>Vaccination & Prevention</h4>
                  <p>Know which vaccines are safe, essential, and recommended during pregnancy and postpartum.</p>
                  <div className="timeline-links">
                    <Link to={ROUTES.VACCINATION} className="timeline-link">
                      <span>💉</span> Vaccine Schedule
                    </Link>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-icon">👨‍👩‍👧</div>
                <div className="timeline-content">
                  <h4>Family Preparation Hub</h4>
                  <p>Preparing your partner, older kids, and extended family for baby's arrival.</p>
                  <div className="timeline-links">
                    <Link to={ROUTES.PERINATAL_FAMILY} className="timeline-link">
                      <span>👨‍👩‍👧</span> Family Guide
                    </Link>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-icon">🎓</div>
                <div className="timeline-content">
                  <h4>Interactive Learning</h4>
                  <p>Experience labor simulations, understand fetal development stages, and practice breathing techniques.</p>
                  <div className="timeline-links">
                    <Link to={ROUTES.AESTHETIC_SIMULATOR} className="timeline-link">
                      <span>🎮</span> Try Simulations
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Postpartum Wellness Carousel */}
        <section className="section" id="postpartum">
          <h2>
            <span className="section-icon">🌼</span>
            <span><span className="gradient-text">Postpartum</span> Wellness</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-soft)', marginBottom: '2rem' }}>
            From breastfeeding to mental health—support that understands the fourth trimester.
          </p>

          <div className="wellness-carousel">
            <div className="carousel-container">
              <Link 
                to={ROUTES.BREASTFEEDING} 
                className={`carousel-card ${shouldShowCard('postpartum') ? '' : 'hidden'}`}
                data-category="postpartum"
              >
                <div className="carousel-image">🤱</div>
                <div className="carousel-content">
                  <h4>Breastfeeding Journey</h4>
                  <p>Latch techniques, positioning guides, troubleshooting common issues, and pumping schedules.</p>
                  <span className="carousel-tag">Feeding Support</span>
                </div>
              </Link>

              <Link 
                to={ROUTES.MILK_SUPPLY_GUIDE} 
                className={`carousel-card ${shouldShowCard('postpartum') ? '' : 'hidden'}`}
                data-category="postpartum"
              >
                <div className="carousel-image">🥛</div>
                <div className="carousel-content">
                  <h4>Milk Supply & Nutrition</h4>
                  <p>Boost your supply naturally with lactation-friendly recipes and hydration trackers.</p>
                  <span className="carousel-tag">Nutrition Science</span>
                </div>
              </Link>

              <Link 
                to={ROUTES.MENTAL_WELLNESS} 
                className={`carousel-card ${shouldShowCard('postpartum') ? '' : 'hidden'}`}
                data-category="postpartum"
              >
                <div className="carousel-image">💙</div>
                <div className="carousel-content">
                  <h4>Perinatal Mental Health</h4>
                  <p>Recognize baby blues vs. postpartum depression. Access therapy and peer support instantly.</p>
                  <span className="carousel-tag">Mental Wellness</span>
                </div>
              </Link>

              <Link 
                to={ROUTES.OTC_GUIDE} 
                className={`carousel-card ${shouldShowCard('postpartum') ? '' : 'hidden'}`}
                data-category="postpartum"
              >
                <div className="carousel-image">💊</div>
                <div className="carousel-content">
                  <h4>Safe OTC Medications</h4>
                  <p>Which pain relievers, cold meds, and supplements are safe while breastfeeding.</p>
                  <span className="carousel-tag">Med Safety</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Menopause Section */}
        <section 
          className="section" 
          id="menopause" 
          style={{ 
            background: 'linear-gradient(to bottom, #fff 0%, #ffeef7 100%)', 
            padding: '3rem 2rem', 
            borderRadius: '20px', 
            margin: '4rem auto' 
          }}
        >
          <h2>
            <span className="section-icon">🔥</span>
            <span><span className="gradient-text">Menopause</span> Reimagined</span>
          </h2>

          <p style={{ textAlign: 'center', color: 'var(--text-soft)', maxWidth: '700px', margin: '0 auto 3rem' }}>
            This isn't "the end" — it's freedom from periods, clarity on your health, and a community that gets it.
          </p>

          <div className="symptom-wheel-container">
            <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Click a symptom to learn more:</h3>
            <div className="symptom-wheel">
              {Object.keys(symptomData).map((key) => (
                <button
                  key={key}
                  className="symptom-bubble"
                  onClick={() => showSymptomInfo(key)}
                >
                  <span className="bubble-icon">{symptomData[key].icon}</span>
                  <span className="bubble-label">{symptomData[key].title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Symptom Popup */}
          {symptomPopup.isOpen && symptomPopup.data && (
            <>
              <div 
                className={`symptom-popup-overlay ${symptomPopup.isOpen ? 'active' : ''}`}
                onClick={closeSymptomInfo}
              ></div>
              <div className={`symptom-popup ${symptomPopup.isOpen ? 'active' : ''}`}>
                <button className="close-btn" onClick={closeSymptomInfo}>×</button>
                <div className="popup-header">
                  <div className="popup-icon">{symptomPopup.data.icon}</div>
                  <h3>{symptomPopup.data.title}</h3>
                </div>
                <div className="popup-body">
                  <p>{symptomPopup.data.desc}</p>
                  <div className="popup-tip-box">
                    <strong>✨ Quick Tip:</strong>
                    <span>{symptomPopup.data.tip}</span>
                  </div>
                  <Link to={symptomPopup.data.link} className="popup-action">
                    View Treatment Options →
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Menopause Resource Links */}
          <div className="pillars-grid" style={{ marginTop: '3rem' }}>
            <Link to={ROUTES.MENOPAUSE} className="pillar-card">
              <div className="pillar-number">01</div>
              <h4>Complete Menopause Guide</h4>
              <p>Perimenopause to post-menopause: stages, hormones, and what to expect.</p>
            </Link>
            <Link to={ROUTES.BONE_HEALTH} className="pillar-card">
              <div className="pillar-number">02</div>
              <h4>Bone Health</h4>
              <p>Prevent osteoporosis with calcium guides, exercise plans, and DEXA scan info.</p>
            </Link>
            <Link to={ROUTES.SCREENING} className="pillar-card">
              <div className="pillar-number">03</div>
              <h4>Screenings & Tests</h4>
              <p>Hormone panels, cholesterol checks, and mammograms you need now.</p>
            </Link>
          </div>
        </section>

        {/* Wellness Accordion */}
        <section className="section" id="wellness">
          <h2>
            <span className="section-icon">💪</span>
            <span>Ongoing <span className="gradient-text">Wellness</span> & Support</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-soft)', marginBottom: '2rem' }}>
            Health resources that grow with you—covering chronic conditions, mental health, and daily care.
          </p>

          <div className="accordion">
            <div className={`accordion-item ${activeAccordion === 'chronic' ? 'active' : ''}`}>
              <div 
                className="accordion-header" 
                onClick={() => handleAccordionToggle('chronic')}
              >
                <span className="accordion-icon">🩺</span>
                <span className="accordion-title">Managing Chronic Conditions</span>
                <span className="accordion-toggle">▼</span>
              </div>
              <div className="accordion-content">
                <div className="accordion-body">
                  <p>Living with autoimmune disorders, PCOS, endometriosis, or thyroid issues? Get personalized care plans.</p>
                  <div className="accordion-links">
                    <Link to={ROUTES.AUTOIMMUNE_HEALTH} className="accordion-link">
                      <span>🛡️</span> Autoimmune Journey
                    </Link>
                    <Link to={ROUTES.SCREENING} className="accordion-link">
                      <span>🔬</span> Regular Screenings
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={`accordion-item ${activeAccordion === 'mental' ? 'active' : ''}`}>
              <div 
                className="accordion-header" 
                onClick={() => handleAccordionToggle('mental')}
              >
                <span className="accordion-icon">🧘‍♀️</span>
                <span className="accordion-title">Mental Health & Emotional Wellbeing</span>
                <span className="accordion-toggle">▼</span>
              </div>
              <div className="accordion-content">
                <div className="accordion-body">
                  <p>Anxiety, depression, grief, or stress—access therapy, meditation, and peer communities.</p>
                  <div className="accordion-links">
                    <Link to={ROUTES.MENTAL_WELLNESS} className="accordion-link">
                      <span>🧠</span> Mental Health Hub
                    </Link>
                    <Link to={ROUTES.LOSS_SUPPORT} className="accordion-link">
                      <span>💔</span> Grief Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={`accordion-item ${activeAccordion === 'hygiene' ? 'active' : ''}`}>
              <div 
                className="accordion-header" 
                onClick={() => handleAccordionToggle('hygiene')}
              >
                <span className="accordion-icon">🌸</span>
                <span className="accordion-title">Period & Hygiene Essentials</span>
                <span className="accordion-toggle">▼</span>
              </div>
              <div className="accordion-content">
                <div className="accordion-body">
                  <p>Sustainable products, menstrual cup guides, and hygiene best practices for every life stage.</p>
                  <div className="accordion-links">
                    <Link to={ROUTES.MENSTRUAL_HEALTH} className="accordion-link">
                      <span>💧</span> Menstrual Care
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simulation Preview */}
        <section className="section">
          <div className="simulation-preview">
            <div className="simulation-content">
              <h3>🎮 Try Our Interactive Health Simulations</h3>
              <p>
                Experience labor contractions, understand fetal positioning, practice pelvic floor exercises, and visualize hormone changes—all through immersive 3D experiences.
              </p>
              <Link to={ROUTES.AESTHETIC_SIMULATOR} className="simulation-btn">
                Launch Simulations
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Government Schemes Banner */}
        <section className="section">
          <div className="schemes-banner">
            <h3>💰 Unlock Government Benefits & Financial Support</h3>
            <p>
              From Janani Suraksha Yojana to maternity leave claims—find every scheme you're eligible for in one place.
            </p>
            <Link to={ROUTES.GOVERNMENT_SCHEMES} className="schemes-btn">
              Explore All Schemes
              <span>↗</span>
            </Link>
          </div>
        </section>

        {/* Loss Support Section */}
        <section className="section healing-garden-section" id="loss">
          <div className="garden-header">
            <h2>
              <span className="section-icon">🕊️</span>
              <span>Miscarriage & <span className="gradient-text">Loss</span> Support</span>
            </h2>
            <p className="sub">When a pregnancy is lost, we hold both your medical and emotional care in one safe space.</p>
          </div>

          <div className="garden-landscape">
            <div className="sanctuary-space">
              <img src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=800&q=80" alt="Comfort" />
              <div className="sanctuary-quote">
                <p>"A gentle, judgment-free space to process what happened and decide your next steps at your own pace."</p>
              </div>
            </div>

            <div className="growth-path">
              <div className="growth-step">
                <div className="step-visual">
                  <div className="growth-icon">🩺</div>
                  <div className="step-connector"></div>
                </div>
                <div className="step-content">
                  <h4>Medical Follow-Up</h4>
                  <div className="step-petals">
                    <div className="petal"><span>✓</span> Symptom Checker</div>
                    <div className="petal"><span>📹</span> OBGYN Consult</div>
                  </div>
                </div>
              </div>

              <div className="growth-step">
                <div className="step-visual">
                  <div className="growth-icon">💔</div>
                  <div className="step-connector"></div>
                </div>
                <div className="step-content">
                  <h4>Emotional Support</h4>
                  <div className="step-petals">
                    <Link to={ROUTES.LOSS_SUPPORT} className="petal"><span>💬</span> Grief Support Page</Link>
                    <div className="petal"><span>👥</span> Community Circle</div>
                  </div>
                </div>
              </div>

              <div className="growth-step">
                <div className="step-visual">
                  <div className="growth-icon">🌱</div>
                </div>
                <div className="step-content">
                  <h4>Future Planning</h4>
                  <div className="step-petals">
                    <Link to={ROUTES.FERTILITY} className="petal"><span>👩‍⚕️</span> Fertility Expert</Link>
                    <Link to={ROUTES.CONCEPTION_GUIDE} className="petal"><span>❤️</span> Try Again Guide</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works-section">
          <div className="container">
            <h2>
              <span className="section-icon">💝</span>
              <span>How <span className="gradient-text">Nari Shakti</span> Works With You</span>
            </h2>
            <p style={{ color: 'var(--text-soft)' }}>Your data stays private, your choices stay yours.</p>
            <div className="how-grid">
              <div className="flow-card">
                <div className="flow-num">1</div>
                <h3>Tell us your stage</h3>
                <p>Choose planning, prenatal, postnatal, menopause or loss.</p>
              </div>
              <div className="flow-card">
                <div className="flow-num">2</div>
                <h3>AI organizes the plan</h3>
                <p>We turn guidelines into checklists & reminders.</p>
              </div>
              <div className="flow-card">
                <div className="flow-num">3</div>
                <h3>Humans step in</h3>
                <p>Experts & community step in when you need them.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Symptom Detection CTA Section */}
      <section className="symptom-cta-section">
        <div className="symptom-cta-container">
          <div className="symptom-cta-eyebrow">
            <span className="pulse-dot"></span>
            Early Detection Saves Lives
          </div>
          
          <h2 className="symptom-cta-title">
            <span>Why <span className="gradient-text">Symptom Detection</span> Matters</span>
          </h2>
          
          <p className="symptom-cta-description">
            Women's health conditions often present with subtle, easily dismissed symptoms. 
            From hormonal imbalances to reproductive health issues, early identification can 
            mean the difference between simple management and complex treatment. Our intelligent 
            symptom checker helps you understand what your body is telling you.
          </p>
          
          {/* Severity Level Cards */}
          <div className="severity-grid">
            <div className="severity-card mild">
              <span className="severity-icon">🌱</span>
              <h3 className="severity-label">Mild</h3>
              <p className="severity-description">
                Early warning signs that can be managed with lifestyle changes
              </p>
              <div className="severity-examples">
                e.g., Irregular periods, mild mood changes, fatigue
              </div>
            </div>
            
            <div className="severity-card moderate">
              <span className="severity-icon">⚠️</span>
              <h3 className="severity-label">Moderate</h3>
              <p className="severity-description">
                Persistent symptoms requiring medical consultation
              </p>
              <div className="severity-examples">
                e.g., Heavy bleeding, chronic pelvic pain, hot flashes
              </div>
            </div>
            
            <div className="severity-card severe">
              <span className="severity-icon">🚨</span>
              <h3 className="severity-label">Severe</h3>
              <p className="severity-description">
                Urgent symptoms needing prompt medical attention
              </p>
              <div className="severity-examples">
                e.g., Sudden severe pain, excessive bleeding, high fever
              </div>
            </div>
            
            <div className="severity-card critical">
              <span className="severity-icon">🆘</span>
              <h3 className="severity-label">Critical</h3>
              <p className="severity-description">
                Emergency conditions requiring immediate care
              </p>
              <div className="severity-examples">
                e.g., Hemorrhage, loss of consciousness, severe chest pain
              </div>
            </div>
          </div>
          
          {/* Main CTA Button */}
          <div className="cta-button-container">
            <Link to={ROUTES.SYMPTOM_CHECKER} className="btn-symptom-checker">
              <span className="icon">🔍</span>
              <span>Check Your Symptoms Now</span>
              <span className="icon">→</span>
            </Link>
            
            <p className="cta-subtext">
              <strong>Free, Private, and Evidence-Based</strong> — Get personalized insights in under 3 minutes
            </p>
          </div>
          
          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span className="trust-label">Medically Reviewed</span>
              <span className="trust-value">By OBGYN Specialists</span>
            </div>
            
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span className="trust-label">100% Private</span>
              <span className="trust-value">No Data Stored</span>
            </div>
            
            <div className="trust-item">
              <span className="trust-icon">📊</span>
              <span className="trust-label">Evidence-Based</span>
              <span className="trust-value">Latest Research</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Hub Section */}
      <section className="tracking-hub-section">
        <canvas id="trackingParticleCanvas" className="tracking-particle-bg" ref={trackingParticleCanvasRef}></canvas>
        
        <div className="container">
          <div className="section-header-stellar">
            <div className="cosmic-badge">
              <span className="badge-orbit"></span>
              <span className="badge-orbit"></span>
              <span className="badge-orbit"></span>
              <span className="badge-text-stellar">✨ Your Personal Command Center</span>
            </div>
            <h2 className="title-holographic">
              Track Your Health Journey
              <span className="title-gradient-flow">Like Never Before</span>
            </h2>
            <p className="subtitle-glow">
              Experience the future of health tracking with our revolutionary dashboard that adapts to your unique journey
            </p>
          </div>

          <div className="tracking-main-card">
            {/* 3D Rotating Preview */}
            <div className="dashboard-preview-3d">
              <div className="preview-frame">
                <div className="frame-glow"></div>
                <div className="preview-screen">
                  <div className="screen-header">
                    <span className="screen-dot"></span>
                    <span className="screen-dot"></span>
                    <span className="screen-dot"></span>
                    <span className="screen-title">Your Dashboard Preview</span>
                  </div>
                  <div className="screen-content">
                    <div className="preview-stat-row">
                      <div className="preview-stat pulse-stat">
                        <span className="stat-icon-preview">🎯</span>
                        <span className="stat-value-preview">85%</span>
                        <span className="stat-label-preview">Goals</span>
                      </div>
                      <div className="preview-stat pulse-stat" style={{ animationDelay: '0.2s' }}>
                        <span className="stat-icon-preview">📊</span>
                        <span className="stat-value-preview">12</span>
                        <span className="stat-label-preview">Metrics</span>
                      </div>
                      <div className="preview-stat pulse-stat" style={{ animationDelay: '0.4s' }}>
                        <span className="stat-icon-preview">🔔</span>
                        <span className="stat-value-preview">3</span>
                        <span className="stat-label-preview">Alerts</span>
                      </div>
                    </div>
                    <div className="preview-chart">
                      <div className="chart-bar" style={{ height: '60%', animationDelay: '0.1s' }}></div>
                      <div className="chart-bar" style={{ height: '80%', animationDelay: '0.2s' }}></div>
                      <div className="chart-bar" style={{ height: '45%', animationDelay: '0.3s' }}></div>
                      <div className="chart-bar" style={{ height: '90%', animationDelay: '0.4s' }}></div>
                      <div className="chart-bar" style={{ height: '70%', animationDelay: '0.5s' }}></div>
                    </div>
                    <div className="preview-journey">
                      <div className="journey-icon-mini">🤰</div>
                      <div className="journey-info-mini">
                        <div className="journey-name-mini">Active Journey</div>
                        <div className="journey-progress-mini">
                          <div className="journey-bar-fill" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards Floating Around */}
            <div className="tracking-features-orbit">
              <div className="feature-orb orb-1">
                <div className="orb-icon">📅</div>
                <div className="orb-label">Smart Reminders</div>
              </div>
              <div className="feature-orb orb-2">
                <div className="orb-icon">💊</div>
                <div className="orb-label">Medication Tracking</div>
              </div>
              <div className="feature-orb orb-3">
                <div className="orb-icon">📊</div>
                <div className="orb-label">Health Metrics</div>
              </div>
              <div className="feature-orb orb-4">
                <div className="orb-icon">🎯</div>
                <div className="orb-label">Goal Progress</div>
              </div>
              <div className="feature-orb orb-5">
                <div className="orb-icon">🔬</div>
                <div className="orb-label">Lab Results</div>
              </div>
              <div className="feature-orb orb-6">
                <div className="orb-icon">🗺️</div>
                <div className="orb-label">Journey Maps</div>
              </div>
            </div>

            {/* Central CTA with Holographic Effect */}
            <div className="tracking-cta-center">
              <Link to={ROUTES.DASHBOARD} className="btn-holographic">
                <span className="btn-shine"></span>
                <span className="btn-text-holo">Launch Your Dashboard</span>
                <span className="btn-arrow-holo">→</span>
              </Link>
              <p className="cta-subtext-glow">Start tracking your health journey with AI-powered insights</p>
            </div>
          </div>

          {/* Feature Grid with Glass Morphism */}
          <div className="tracking-benefits-grid">
            <div className="benefit-glass-card">
              <div className="benefit-icon-float">🎯</div>
              <h4>Personalized Insights</h4>
              <p>AI analyzes your patterns and provides actionable recommendations</p>
            </div>
            <div className="benefit-glass-card">
              <div className="benefit-icon-float">🔔</div>
              <h4>Never Miss a Beat</h4>
              <p>Smart reminders for medications, appointments, and health checks</p>
            </div>
            <div className="benefit-glass-card">
              <div className="benefit-icon-float">📈</div>
              <h4>Track Progress</h4>
              <p>Visualize your health journey with beautiful, intuitive charts</p>
            </div>
            <div className="benefit-glass-card">
              <div className="benefit-icon-float">🔐</div>
              <h4>Secure & Private</h4>
              <p>Your health data is encrypted and protected with bank-level security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Portal Section */}
      <section className="community-portal-section">
        <div className="wave-background">
          <svg className="wave-svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path className="wave-path wave-1" d="M0,60 C300,100 900,20 1200,60 L1200,0 L0,0 Z"></path>
            <path className="wave-path wave-2" d="M0,70 C300,110 900,30 1200,70 L1200,0 L0,0 Z"></path>
            <path className="wave-path wave-3" d="M0,80 C300,120 900,40 1200,80 L1200,0 L0,0 Z"></path>
          </svg>
        </div>

        <div className="container">
          <div className="section-header-stellar">
            <div className="cosmic-badge community-badge">
              <span className="badge-orbit"></span>
              <span className="badge-orbit"></span>
              <span className="badge-orbit"></span>
              <span className="badge-text-stellar">💕 You're Not Alone</span>
            </div>
            <h2 className="title-holographic">
              Join Our Thriving
              <span className="title-gradient-flow">Community</span>
            </h2>
            <p className="subtitle-glow">
              Connect with thousands of women who understand your journey, share experiences, and support each other
            </p>
          </div>

          {/* Interactive Community Hub */}
          <div className="community-hub-interactive">
            {/* Center Pulse */}
            <div className="community-center-pulse">
              <div className="pulse-ring-community ring-1"></div>
              <div className="pulse-ring-community ring-2"></div>
              <div className="pulse-ring-community ring-3"></div>
              <div className="pulse-ring-community ring-4"></div>
              <div className="community-heart-icon">
                <span style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>❤️</span>
                <span className="member-count">12,456</span>
                <span className="member-label">Active Members</span>
              </div>
            </div>

            {/* Floating Community Cards */}
            <div className="community-cards-float">
              <div className="community-float-card card-1" onClick={() => navigate(ROUTES.COMMUNITY)}>
                <div className="card-header-mini">
                  <span className="card-icon-mini">🤰</span>
                  <span className="card-badge-mini live">Live Now</span>
                </div>
                <h4>Pregnancy Journey</h4>
                <p className="card-stat">5,678 members</p>
              </div>

              <div className="community-float-card card-2" onClick={() => navigate(ROUTES.COMMUNITY)}>
                <div className="card-header-mini">
                  <span className="card-icon-mini">🌸</span>
                  <span className="card-badge-mini popular">Popular</span>
                </div>
                <h4>Menopause Support</h4>
                <p className="card-stat">4,123 members</p>
              </div>

              <div className="community-float-card card-3" onClick={() => navigate(ROUTES.COMMUNITY)}>
                <div className="card-header-mini">
                  <span className="card-icon-mini">💗</span>
                  <span className="card-badge-mini active">Active</span>
                </div>
                <h4>Mental Wellness</h4>
                <p className="card-stat">3,890 members</p>
              </div>

              <div className="community-float-card card-4" onClick={() => navigate(ROUTES.COMMUNITY)}>
                <div className="card-header-mini">
                  <span className="card-icon-mini">🎗️</span>
                  <span className="card-badge-mini">Support</span>
                </div>
                <h4>Chronic Conditions</h4>
                <p className="card-stat">2,456 members</p>
              </div>

              <div className="community-float-card card-5" onClick={() => navigate(ROUTES.COMMUNITY)}>
                <div className="card-header-mini">
                  <span className="card-icon-mini">🥗</span>
                  <span className="card-badge-mini">Trending</span>
                </div>
                <h4>Nutrition & Fitness</h4>
                <p className="card-stat">4,567 members</p>
              </div>

              <div className="community-float-card card-6" onClick={() => navigate(ROUTES.COMMUNITY)}>
                <div className="card-header-mini">
                  <span className="card-icon-mini">👶</span>
                  <span className="card-badge-mini">New</span>
                </div>
                <h4>New Moms Circle</h4>
                <p className="card-stat">3,234 members</p>
              </div>
            </div>

            {/* Central CTA Button */}
            <Link to={ROUTES.COMMUNITY} className="btn-community-portal">
              <span className="btn-glow-ring"></span>
              <span className="btn-text-portal">Join the Community</span>
              <span className="btn-icon-portal">💕</span>
            </Link>
          </div>

          {/* Community Features with Neon Glow */}
          <div className="community-features-neon">
            <div className="neon-feature-card">
              <div className="neon-icon">💬</div>
              <h4>Live Discussions</h4>
              <p>Real-time conversations with women who understand your journey</p>
              <div className="neon-glow neon-pink"></div>
            </div>

            <div className="neon-feature-card">
              <div className="neon-icon">📅</div>
              <h4>Expert Events</h4>
              <p>Weekly Q&A sessions with doctors, nutritionists, and wellness coaches</p>
              <div className="neon-glow neon-purple"></div>
            </div>

            <div className="neon-feature-card">
              <div className="neon-icon">⭐</div>
              <h4>Success Stories</h4>
              <p>Get inspired by real stories from thousands of women like you</p>
              <div className="neon-glow neon-blue"></div>
            </div>

            <div className="neon-feature-card">
              <div className="neon-icon">🛡️</div>
              <h4>Safe Space</h4>
              <p>Moderated, private, and judgment-free environment for open sharing</p>
              <div className="neon-glow neon-green"></div>
            </div>
          </div>

          {/* Social Proof Ticker */}
          <div className="social-proof-ticker">
            <div className="ticker-content">
              <span className="ticker-item">✨ "This community changed my life!" - Priya M.</span>
              <span className="ticker-item">💕 "Found my support system here" - Anjali K.</span>
              <span className="ticker-item">🌟 "Finally, people who understand" - Lakshmi S.</span>
              <span className="ticker-item">💖 "Best decision I made" - Meera R.</span>
              <span className="ticker-item">✨ "This community changed my life!" - Priya M.</span>
              <span className="ticker-item">💕 "Found my support system here" - Anjali K.</span>
              <span className="ticker-item">🌟 "Finally, people who understand" - Lakshmi S.</span>
              <span className="ticker-item">💖 "Best decision I made" - Meera R.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
