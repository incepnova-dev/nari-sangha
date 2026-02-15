import React from 'react';
import '../../../styles/pages/gestational-diabetes.css';

interface JourneySectionProps {
  showStageDetails?: (stage: string) => void;
}

const JourneySection: React.FC<JourneySectionProps> = ({ 
  showStageDetails = () => {} 
}) => {
  return (
    <section id="journey" className="journey-section">
     <div className="section-header">
        <div className="header-badge-prominent">
          <span className="badge-pulse"></span>
          <span className="badge-text">Your 40-Week Journey</span>
        </div>
        <h2 className="section-title-prominent">
          Navigate Your <span className="title-highlight">Pregnancy Timeline</span>
        </h2>
        <p className="section-subtitle-prominent">
          <span className="subtitle-sparkle">✨</span>
          From first screening to postpartum recovery — every week matters. 
          <strong>Tap any trimester</strong> to unlock personalized care guides, milestone trackers, and expert insights tailored to your journey.
          <span className="subtitle-sparkle">✨</span>
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-rail"></div>
        
        <div className="timeline-stage" data-stage="first" onClick={() => showStageDetails('first')}>
          <div className="stage-marker">
            <div className="marker-dot">1</div>
            <div className="marker-pulse"></div>
          </div>
          <div className="stage-content">
            <h3 className="stage-title">First Trimester</h3>
            <p className="stage-weeks">Weeks 1-12</p>
            <p className="stage-desc">Foundation & Early Screening for High-Risk Women</p>
            <div className="stage-icon">🌱</div>
          </div>
        </div>

        <div className="timeline-stage" data-stage="second" onClick={() => showStageDetails('second')}>
          <div className="stage-marker">
            <div className="marker-dot">2</div>
            <div className="marker-pulse"></div>
          </div>
          <div className="stage-content">
            <h3 className="stage-title">Second Trimester</h3>
            <p className="stage-weeks">Weeks 13-27</p>
            <p className="stage-desc">GDM Screening & Diagnosis (24-28 weeks)</p>
            <div className="stage-icon">🔬</div>
          </div>
        </div>

        <div className="timeline-stage" data-stage="third" onClick={() => showStageDetails('third')}>
          <div className="stage-marker">
            <div className="marker-dot">3</div>
            <div className="marker-pulse"></div>
          </div>
          <div className="stage-content">
            <h3 className="stage-title">Third Trimester</h3>
            <p className="stage-weeks">Weeks 28-40</p>
            <p className="stage-desc">Intensive Monitoring & Delivery Preparation</p>
            <div className="stage-icon">👶</div>
          </div>
        </div>

        <div className="timeline-stage" data-stage="postpartum" onClick={() => showStageDetails('postpartum')}>
          <div className="stage-marker">
            <div className="marker-dot">4</div>
            <div className="marker-pulse"></div>
          </div>
          <div className="stage-content">
            <h3 className="stage-title">Postpartum</h3>
            <p className="stage-weeks">After Delivery</p>
            <p className="stage-desc">Recovery & Long-term Health Management</p>
            <div className="stage-icon">🌸</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
