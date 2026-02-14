import React from 'react';
import { journeySymptoms } from './constants';

interface SymptomCardsProps {
  flippedCards: number[];
  onToggleFlip: (index: number) => void;
}

const SymptomCards: React.FC<SymptomCardsProps> = ({ flippedCards, onToggleFlip }) => {
  return (
    <div className="journey-symptoms">
      <div className="journey-subhead">
        <h3>What might I notice?</h3>
        <p>Tap a tile. Front = simple. Back = details for your doctor visit.</p>
      </div>

      <div className="symptom-flip-grid">
        {journeySymptoms.map((symptom, idx) => (
          <button
            key={idx}
            className={`flip ${flippedCards.includes(idx) ? 'is-flipped' : ''}`}
            onClick={() => onToggleFlip(idx)}
          >
            <div className="flip-inner">
              <div className="flip-face flip-front">
                <div>
                  <div className="tiny">{symptom.tag}</div>
                  <strong>{symptom.frontTitle}</strong>
                  <p>{symptom.frontText}</p>
                </div>
                <div className="flip-action">Tap to learn more →</div>
              </div>
              <div className="flip-face flip-back">
                <div>
                  <div className="tiny">{symptom.backTitle}</div>
                  <p>{symptom.backText}</p>
                  <div className="ask">{symptom.ask}</div>
                </div>
                <div className="flip-action">Tap to go back ←</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SymptomCards;

