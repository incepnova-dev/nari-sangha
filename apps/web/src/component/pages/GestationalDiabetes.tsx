import React, { useEffect, useRef } from 'react';
import {
  HeroSection,
  JourneySection,
  TopicsExplorer,
  TrackerSection,
  MealPlannerSection,
  CommunitySection,
} from './gestational-diabetes';
import '../../styles/pages/gestational-diabetes.css';

const GestationalDiabetes: React.FC = () => {
  // State management (for future use with modals and interactions)
  // const [activeTopic, setActiveTopic] = useState<string | null>(null);
  // const [quizOpen, setQuizOpen] = useState(false);
  // const [trackerOpen, setTrackerOpen] = useState(false);
  // const [glucoseReading, setGlucoseReading] = useState(95);
  
  // Refs
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Event handlers
  const scrollToJourney = () => {
    const element = document.getElementById('journey');
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const openQuiz = () => {
    // TODO: Implement quiz modal
    // setQuizOpen(true);
    console.log('Open quiz');
  };
  
  // const closeQuiz = () => {
  //   setQuizOpen(false);
  // };
  
  const openSugarTracker = () => {
    // TODO: Implement sugar tracker modal
    // setTrackerOpen(true);
    console.log('Open sugar tracker');
  };
  
  // const closeSugarTracker = () => {
  //   setTrackerOpen(false);
  // };
  
  const scrollToTopic = (topic: string) => {
    // TODO: Set active topic when modals are implemented
    // setActiveTopic(topic);
    console.log('Scroll to topic:', topic);
    const element = document.getElementById('learn');
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const openTopicPanel = (topic: string) => {
    // TODO: Implement topic panel modal
    console.log('Open topic panel:', topic);
  };
  
  const showStageDetails = (stage: string) => {
    // Handle stage details display
    console.log('Show stage details:', stage);
  };
  
  const setSimulationScenario = (scenario: string) => {
    // Handle simulation scenario change
    console.log('Set simulation scenario:', scenario);
  };
  
  // Particle animation effect
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
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="gestational-diabetes-page">
      {/* Main Page Container */}
      <div className="page-shell">
        {/* Neural Network Particle Background */}
        <div className="hero-constellation-bg">
          <canvas ref={particleCanvasRef} id="particleCanvas"></canvas>
          <div className="gradient-morph"></div>
        </div>

        <HeroSection 
          scrollToJourney={scrollToJourney}
          openQuiz={openQuiz}
          scrollToTopic={scrollToTopic}
        />
        <JourneySection showStageDetails={showStageDetails} />
        <TopicsExplorer openTopicPanel={openTopicPanel} />
        <TrackerSection setSimulationScenario={setSimulationScenario} />
        <MealPlannerSection openSugarTracker={openSugarTracker} />
        <CommunitySection />
      </div>
    </div>
  );
};

export default GestationalDiabetes;

