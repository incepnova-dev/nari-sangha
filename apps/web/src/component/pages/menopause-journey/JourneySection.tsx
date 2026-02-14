import React, { useState } from 'react';
import { StageKey } from './constants';
import StageCard from './StageCard';
import SymptomCards from './SymptomCards';

interface JourneySectionProps {
  activeStage: StageKey;
  onStageChange: (stage: StageKey) => void;
}

const JourneySection: React.FC<JourneySectionProps> = ({ activeStage, onStageChange }) => {
  const [openSteps, setOpenSteps] = useState<number[]>([0]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setOpenSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleFlip = (index: number) => {
    setFlippedCards(prev =>
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <section className="section-block journey" id="journey">
      <div className="journey-content-wrapper">
        <div className="section-title-row">
          <h2 className="section-title" style={{ color: '#000000' }}>Where am I right now?</h2>
          <p className="section-tagline">A calm, step-by-step guide you can tap through (STRAW+10 based)</p>
        </div>

        <div className="journey-track">
          <button 
            className={`track-dot ${activeStage === 'lateRepro' ? 'active' : ''}`}
            onClick={() => onStageChange('lateRepro')}
          >
            <span>Late Repro</span>
          </button>
          <button 
            className={`track-dot ${activeStage === 'peri' ? 'active' : ''}`}
            onClick={() => onStageChange('peri')}
          >
            <span>Perimenopause</span>
          </button>
          <button 
            className={`track-dot ${activeStage === 'earlyPost' ? 'active' : ''}`}
            onClick={() => onStageChange('earlyPost')}
          >
            <span>Early Post</span>
          </button>
          <button 
            className={`track-dot ${activeStage === 'latePost' ? 'active' : ''}`}
            onClick={() => onStageChange('latePost')}
          >
            <span>Late Post</span>
          </button>
        </div>

        <StageCard 
          stage={activeStage} 
          openSteps={openSteps}
          onToggleStep={toggleStep}
        />

        <SymptomCards 
          flippedCards={flippedCards}
          onToggleFlip={toggleFlip}
        />
      </div>
    </section>
  );
};

export default JourneySection;

