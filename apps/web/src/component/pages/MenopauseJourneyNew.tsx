import React, { useState, useRef } from 'react';
import './menopause-journey.css';
import HeroSection from './menopause-journey/HeroSection';
import JourneySection from './menopause-journey/JourneySection';
import ScannerDashboard from './menopause-journey/ScannerDashboard';
import YourBodyGarden from './menopause-journey/YourBodyGarden';
import SeasonalChecker from './menopause-journey/SeasonalChecker';
import OwnGardenExpert from './menopause-journey/OwnGardenExpert';
import { StageKey, ScannerPhase } from './menopause-journey/constants';

const MenopauseJourneyNew: React.FC = () => {
  // State management
  const [activeStage, setActiveStage] = useState<StageKey>('lateRepro');
  const [scannerPhase, setScannerPhase] = useState<ScannerPhase>('repro');
  const gardenBackdropRef = useRef<HTMLDivElement>(null);

  // Close plant info
  const closePlantInfo = () => {
    if (gardenBackdropRef.current) {
      gardenBackdropRef.current.classList.remove('active');
    }
  };

  const handleOrganClick = (_organ: string) => {
    // Handle organ click if needed in the future
  };

  return (
    <div className="menopause-journey-page">
      <div className="garden-backdrop" ref={gardenBackdropRef} onClick={closePlantInfo}></div>
      
      <HeroSection 
        onStageChange={setActiveStage}
      />

      <div className="page-shell">
        <JourneySection 
          activeStage={activeStage}
          onStageChange={setActiveStage}
        />

        <ScannerDashboard 
          scannerPhase={scannerPhase}
          onPhaseChange={setScannerPhase}
          onOrganClick={handleOrganClick}
        />

        <YourBodyGarden />

        <SeasonalChecker />

        <OwnGardenExpert />
      </div>
    </div>
  );
};

export default MenopauseJourneyNew;
