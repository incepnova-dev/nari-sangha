import React from 'react';

const OwnGardenExpert: React.FC = () => {
  return (
    <section className="garden-care-connection">
      <div className="connection-content">
        
        <div className="connection-left">
          <div className="connection-icon">🌸</div>
          <h2 className="connection-title">Ready to Become Your Own Garden Expert?</h2>
          <p className="connection-description">
            Move from "just surviving" to thriving. Work with a menopause-trained provider who speaks your language.
          </p>

          <div className="expertise-grid">
            <div className="expertise-item">
              <span className="expertise-icon">💊</span>
              <span className="expertise-text">MHT Decision Support</span>
            </div>
            <div className="expertise-item">
              <span className="expertise-icon">🧘‍♀️</span>
              <span className="expertise-text">CBT & Mindfulness</span>
            </div>
            <div className="expertise-item">
              <span className="expertise-icon">🏋️‍♀️</span>
              <span className="expertise-text">Exercise Prescriptions</span>
            </div>
            <div className="expertise-item">
              <span className="expertise-icon">🌸</span>
              <span className="expertise-text">Pelvic Health & GSM</span>
            </div>
          </div>
        </div>

        <div className="connection-right">
          <div className="connection-cta-card">
            <div className="cta-highlight">🌟 Personalized Care Plan</div>
            <button className="cta-btn-primary">
              <span className="btn-shine"></span>
              <span className="btn-text">Match with a Menopause Specialist</span>
              <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20">
                <path d="M5 10 L15 10 M15 10 L11 6 M15 10 L11 14" 
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="cta-btn-secondary">
              <span className="btn-icon">📤</span>
              <span className="btn-text">Share My Garden Report</span>
            </button>
            <div className="cta-reassurance">
              <span className="reassurance-icon">🔒</span>
              <span className="reassurance-text">Secure · Confidential · Evidence-Based</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OwnGardenExpert;

