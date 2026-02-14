import React from 'react';
import { journeyStages, StageKey } from './constants';

interface StageCardProps {
  stage: StageKey;
  openSteps: number[];
  onToggleStep: (index: number) => void;
}

const StageCard: React.FC<StageCardProps> = ({ stage, openSteps, onToggleStep }) => {
  const currentStage = journeyStages[stage];

  if (!currentStage) return null;

  return (
    <div className="journey-stage-card">
      <div className="stage-enter">
        <div className="stage-top">
          <div>
            <div className="stage-kicker">{currentStage.kicker}</div>
            <h3 className="stage-title" style={{ color: '#000000' }}>{currentStage.title}</h3>
            <p className="stage-one-liner">{currentStage.oneLiner}</p>
          </div>
          <div className="stage-badges">
            {currentStage.badges.map((badge, idx) => (
              <span key={idx} className="stage-badge">{badge}</span>
            ))}
          </div>
        </div>

        <div className="stage-steps">
          {currentStage.steps.map((step, idx) => (
            <div key={idx} className={`step ${openSteps.includes(idx) ? 'open' : ''}`}>
              <button type="button" onClick={() => onToggleStep(idx)}>
                {step.q}
                <span className="chev">▾</span>
              </button>
              <div className="step-body">{step.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StageCard;

