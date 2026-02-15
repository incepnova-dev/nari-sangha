import React from 'react';
import '../../../styles/pages/gestational-diabetes.css';

interface HeroSectionProps {
  scrollToJourney?: () => void;
  openQuiz?: () => void;
  scrollToTopic?: (topic: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  scrollToJourney = () => {},
  openQuiz = () => {},
  scrollToTopic = () => {}
}) => {
  return (
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
          <button className="btn-primary" onClick={scrollToJourney}>Begin Your Journey</button>
          <button className="btn-secondary" onClick={openQuiz}>Take Knowledge Quiz</button>
        </div>
      </div>

      <div className="hero-visual-3d">
        <div className="pregnancy-3d-container">
          <div className="pregnancy-core">
            <div className="center-glow"></div>
            
            <div className="pulse-ring ring-1"></div>
            <div className="pulse-ring ring-2"></div>
            <div className="pulse-ring ring-3"></div>
          </div>

          <div className="health-icon icon-1" onClick={() => scrollToTopic('monitoring')}>
            <div className="icon-inner">🩺</div>
            <div className="icon-label">Monitoring</div>
          </div>
          <div className="health-icon icon-2" onClick={() => scrollToTopic('exercise')}>
            <div className="icon-inner">💪</div>
            <div className="icon-label">Exercise</div>
          </div>
          <div className="health-icon icon-3" onClick={() => scrollToTopic('nutrition')}>
            <div className="icon-inner">🥗</div>
            <div className="icon-label">Nutrition</div>
          </div>
          <div className="health-icon icon-4" onClick={() => scrollToTopic('treatment')}>
            <div className="icon-inner">💊</div>
            <div className="icon-label">Treatment</div>
          </div>
          <div className="health-icon icon-5" onClick={() => scrollToTopic('baby-health')}>
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
  );
};

export default HeroSection;
