import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './PreeclampsiaEducation.module.css';

// Organ data for modal
const organData: Record<string, {
  icon: string;
  name: string;
  normalDesc: string;
  affectedDesc: string;
  symptoms: string[];
  action: string;
}> = {
  brain: {
    icon: '🧠',
    name: 'Brain',
    normalDesc: 'Normal blood flow, no headaches or visual disturbances. Brain vessels functioning properly with optimal oxygen delivery.',
    affectedDesc: 'Constricted blood vessels cause severe headaches, vision changes, confusion, and increased risk of seizures (eclampsia). Cerebral edema may develop.',
    symptoms: [
      'Severe, persistent headache that doesn\'t respond to paracetamol',
      'Blurred vision or seeing spots/flashing lights',
      'Confusion or altered mental state',
      'Hyperreflexia (overactive reflexes)'
    ],
    action: 'Report severe headaches or vision changes to your doctor immediately. These can be signs of impending eclampsia.'
  },
  eyes: {
    icon: '👁️',
    name: 'Eyes',
    normalDesc: 'Clear vision, no visual disturbances. Retinal blood vessels healthy with normal pressure.',
    affectedDesc: 'Retinal blood vessel constriction causes blurred vision, spots, and flashing lights. Risk of retinal detachment in severe cases.',
    symptoms: [
      'Blurred vision or difficulty focusing',
      'Seeing spots or flashing lights',
      'Temporary vision loss',
      'Light sensitivity'
    ],
    action: 'Any vision changes during pregnancy require immediate medical evaluation. Do not wait.'
  },
  heart: {
    icon: '❤️',
    name: 'Heart & Cardiovascular',
    normalDesc: 'Normal blood pressure (120/80 mmHg), healthy heart rate, efficient blood circulation to all organs.',
    affectedDesc: 'High blood pressure damages blood vessels throughout the body. Heart works harder, increasing risk of cardiac complications.',
    symptoms: [
      'Elevated blood pressure (>140/90 mmHg)',
      'Rapid heartbeat or palpitations',
      'Chest discomfort',
      'Shortness of breath'
    ],
    action: 'Monitor BP daily. If BP exceeds 140/90, contact doctor. If >160/110, seek emergency care.'
  },
  liver: {
    icon: '🫀',
    name: 'Liver',
    normalDesc: 'Normal liver function, enzymes within healthy range. Proper blood flow and filtration.',
    affectedDesc: 'Impaired blood flow causes liver swelling, elevated enzymes (ALT/AST), and potential liver damage. Risk of HELLP syndrome.',
    symptoms: [
      'Upper right abdominal pain (below ribs)',
      'Nausea and vomiting',
      'Elevated liver enzymes on blood tests',
      'General malaise'
    ],
    action: 'Upper right abdominal pain with preeclampsia is an emergency. Seek immediate care.'
  },
  kidneys: {
    icon: '🫘',
    name: 'Kidneys',
    normalDesc: 'Normal kidney function, no protein in urine. Efficient waste filtration and fluid balance.',
    affectedDesc: 'Damaged kidney blood vessels allow protein to leak into urine. Reduced kidney function affects waste removal.',
    symptoms: [
      'Protein in urine (proteinuria)',
      'Decreased urine output',
      'Swelling in legs and face',
      'Blood in urine (severe cases)'
    ],
    action: 'Regular urine protein tests are essential. Report decreased urination to your doctor.'
  },
  placenta: {
    icon: '🤰',
    name: 'Placenta & Baby',
    normalDesc: 'Optimal blood flow to placenta ensures baby receives oxygen and nutrients. Normal fetal growth.',
    affectedDesc: 'Reduced blood flow affects baby\'s growth and oxygen supply. Risk of intrauterine growth restriction (IUGR) and preterm birth.',
    symptoms: [
      'Decreased fetal movement',
      'Baby measuring small for gestational age',
      'Abnormal Doppler readings',
      'Low amniotic fluid'
    ],
    action: 'Monitor baby\'s movements daily. Any decrease in movement requires immediate evaluation.'
  },
  hands: {
    icon: '✋',
    name: 'Hands & Swelling',
    normalDesc: 'Normal hand size, no swelling. Good circulation to extremities.',
    affectedDesc: 'Fluid retention causes swelling (edema) in hands, feet, and face. Rapid swelling indicates worsening condition.',
    symptoms: [
      'Swollen hands and fingers',
      'Rings feeling tight',
      'Pitting edema (indentation when pressed)',
      'Stiffness in joints'
    ],
    action: 'Sudden swelling, especially in face and hands, requires immediate medical attention.'
  },
  feet: {
    icon: '🦶',
    name: 'Feet & Legs',
    normalDesc: 'Normal leg and foot appearance, no excessive swelling. Healthy circulation.',
    affectedDesc: 'Severe edema in legs and feet. Risk of blood clots due to poor circulation.',
    symptoms: [
      'Swollen feet and ankles',
      'Shoes feeling tight',
      'Skin appearing shiny or stretched',
      'Difficulty walking due to swelling'
    ],
    action: 'Elevate legs when resting. Report sudden or severe swelling to your doctor.'
  }
};

// Educational tips
const eduTips = [
  'The placenta acts as baby\'s life support system. In preeclampsia, reduced blood flow to the placenta can affect baby\'s growth and oxygen supply.',
  'Preeclampsia can develop rapidly - sometimes going from mild to severe in just days or even hours. Regular monitoring is crucial.',
  'HELLP syndrome is a severe form of preeclampsia affecting the liver and blood clotting. It requires immediate medical attention.',
  'Eclampsia is when preeclampsia leads to seizures. This is a life-threatening emergency requiring immediate hospitalization.',
  'Even after delivery, preeclampsia can persist or develop for up to 6 weeks postpartum. Continue monitoring your BP after birth.',
  'Women who have had preeclampsia have a higher risk of cardiovascular disease later in life. Regular heart health checks are recommended.',
  'Low-dose aspirin may be recommended for high-risk women to help prevent preeclampsia. Always consult your doctor before taking any medication.',
  'Preeclampsia affects about 5-8% of all pregnancies worldwide, making it one of the most common pregnancy complications.'
];

const PreeclampsiaEducation: React.FC = () => {
  // State for simulator
  const [viewMode, setViewMode] = useState<'3d' | 'comparison' | 'journey'>('3d');
  const [severity, setSeverity] = useState(0);
  const [week, setWeek] = useState(20);
  const [isJourneyPlaying, setIsJourneyPlaying] = useState(false);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [journeyTime, setJourneyTime] = useState('0:00 / 1:00');
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // Layer visibility state
  const [layers, setLayers] = useState({
    cardiovascular: true,
    nervous: true,
    renal: true,
    hepatic: true,
    placental: true,
    respiratory: true
  });

  // Vital signs state
  const [vitals, setVitals] = useState({
    systolic: 120,
    diastolic: 80,
    heartRate: 80,
    oxygen: 98,
    protein: 'None',
    platelets: 250,
    alt: 25,
    ast: 22
  });

  // Refs for intervals and canvas
  const journeyIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const bpCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate vital signs based on severity
  const updateVitalSigns = useCallback((severityValue: number) => {
    const percentage = severityValue;
    setVitals({
      systolic: Math.round(120 + (percentage * 0.5)),
      diastolic: Math.round(80 + (percentage * 0.3)),
      heartRate: Math.round(80 + (percentage * 0.45)),
      oxygen: Math.round(98 - (percentage * 0.06)),
      protein: percentage < 25 ? 'None' : percentage < 50 ? 'Trace' : percentage < 75 ? '2+' : '4+ High',
      platelets: Math.round(250 - (percentage * 1.0)),
      alt: Math.round(25 + (percentage * 0.75)),
      ast: Math.round(22 + (percentage * 0.78))
    });
  }, []);

  // Get severity label
  const getSeverityLabel = (value: number): string => {
    if (value < 25) return 'Normal';
    if (value < 50) return 'Mild';
    if (value < 75) return 'Moderate';
    return 'Severe';
  };

  // Get status badge info
  const getStatusBadge = (value: number) => {
    if (value < 25) return { icon: '✅', text: 'Normal Pregnancy', color: '#66bb6a' };
    if (value < 50) return { icon: '🟢', text: 'Mild Preeclampsia', color: '#ffa726' };
    if (value < 75) return { icon: '🟡', text: 'Moderate Preeclampsia', color: '#ff9800' };
    return { icon: '🔴', text: 'Severe Preeclampsia', color: '#ef4444' };
  };

  // Handle severity change
  const handleSeverityChange = (value: number) => {
    setSeverity(value);
    updateVitalSigns(value);
  };

  // Handle week change
  const handleWeekChange = (value: number) => {
    setWeek(value);
  };

  // Handle view mode switch
  const handleViewModeChange = (mode: '3d' | 'comparison' | 'journey') => {
    setViewMode(mode);
    if (mode === 'journey') {
      resetJourney();
    }
  };

  // Play journey
  const playJourney = () => {
    setIsJourneyPlaying(true);
    const duration = 60000; // 60 seconds
    const startTime = Date.now();
    const startSeverity = severity;

    journeyIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      setJourneyProgress(progress);
      setJourneyTime(`0:${Math.floor(elapsed / 1000).toString().padStart(2, '0')} / 1:00`);
      
      const newSeverity = Math.min(startSeverity + progress, 100);
      setSeverity(newSeverity);
      updateVitalSigns(newSeverity);
      
      // Update week from 20 to 40
      const newWeek = Math.min(20 + Math.floor((progress / 100) * 20), 40);
      setWeek(newWeek);

      if (progress >= 100) {
        pauseJourney();
      }
    }, 100);
  };

  // Pause journey
  const pauseJourney = () => {
    setIsJourneyPlaying(false);
    if (journeyIntervalRef.current) {
      clearInterval(journeyIntervalRef.current);
      journeyIntervalRef.current = null;
    }
  };

  // Reset journey
  const resetJourney = () => {
    pauseJourney();
    setJourneyProgress(0);
    setJourneyTime('0:00 / 1:00');
    setSeverity(0);
    setWeek(20);
    updateVitalSigns(0);
  };

  // Toggle layer
  const toggleLayer = (layerName: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  // Apply preset
  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'all':
        setLayers({
          cardiovascular: true,
          nervous: true,
          renal: true,
          hepatic: true,
          placental: true,
          respiratory: true
        });
        break;
      case 'critical':
        setLayers({
          cardiovascular: true,
          nervous: true,
          renal: true,
          hepatic: false,
          placental: false,
          respiratory: false
        });
        break;
      case 'affected':
        setLayers({
          cardiovascular: true,
          nervous: true,
          renal: true,
          hepatic: true,
          placental: true,
          respiratory: false
        });
        break;
    }
  };

  // Open organ modal
  const openOrganModal = (organName: string) => {
    setSelectedOrgan(organName);
  };

  // Close organ modal
  const closeOrganModal = () => {
    setSelectedOrgan(null);
  };

  // Show next tip
  const showNextTip = () => {
    setCurrentTipIndex(prev => (prev + 1) % eduTips.length);
  };

  // Toggle audio
  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };

  // Get glow opacity based on severity
  const getGlowOpacity = (organSeverity: number): number => {
    if (severity < organSeverity) return 0;
    return Math.min((severity - organSeverity) / 25, 0.8);
  };

  // Draw waveforms on canvas with realistic ECG-like patterns
  useEffect(() => {
    let animationId: number;
    let startTime = Date.now();
    
    const drawWaveform = (canvas: HTMLCanvasElement | null, type: 'bp' | 'hr') => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = type === 'bp' ? '#ec4899' : '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Use actual time for stable rhythm - beats per second
      const now = Date.now();
      const elapsed = (now - startTime) / 1000; // seconds
      const beatsPerSecond = vitals.heartRate / 60;

      // Create more stable, realistic patterns
      const points: { x: number; y: number }[] = [];
      
      for (let x = 0; x < width; x++) {
        let y = centerY;
        
        if (type === 'hr') {
          // Realistic ECG pattern with proper P-QRS-T complex
          // Use time-based calculation for stable rhythm
          const pixelsPerBeat = width / 2.5; // Show ~2.5 beats on screen
          const pixelOffset = (elapsed * beatsPerSecond * pixelsPerBeat) % pixelsPerBeat;
          const positionInCycle = (x - pixelOffset + pixelsPerBeat) % pixelsPerBeat;
          const cycleProgress = positionInCycle / pixelsPerBeat;
          
          // Baseline with minimal noise
          y = centerY + (Math.random() - 0.5) * 1.5;
          
          // P wave (atrial depolarization) - small rounded bump
          if (cycleProgress > 0.15 && cycleProgress < 0.25) {
            const pProgress = (cycleProgress - 0.15) / 0.1;
            y -= Math.sin(pProgress * Math.PI) * 6;
          }
          // PR segment (flat)
          else if (cycleProgress >= 0.25 && cycleProgress < 0.35) {
            y = centerY + (Math.random() - 0.5) * 1;
          }
          // Q wave (small downward deflection)
          else if (cycleProgress >= 0.35 && cycleProgress < 0.38) {
            y += 4;
          }
          // R wave (tall upward spike) - main QRS complex
          else if (cycleProgress >= 0.38 && cycleProgress < 0.45) {
            const rProgress = (cycleProgress - 0.38) / 0.07;
            if (rProgress < 0.3) {
              // Up stroke
              y -= rProgress / 0.3 * (25 + severity * 0.15);
            } else if (rProgress < 0.5) {
              // Peak
              y -= (25 + severity * 0.15);
            } else {
              // Down stroke
              y -= (1 - (rProgress - 0.5) / 0.5) * (25 + severity * 0.15);
            }
          }
          // S wave (downward deflection after R)
          else if (cycleProgress >= 0.45 && cycleProgress < 0.52) {
            const sProgress = (cycleProgress - 0.45) / 0.07;
            y += Math.sin(sProgress * Math.PI) * 10;
          }
          // ST segment (flat, elevated in some conditions)
          else if (cycleProgress >= 0.52 && cycleProgress < 0.65) {
            const stElevation = severity > 50 ? 3 : 0;
            y = centerY - stElevation + (Math.random() - 0.5) * 1;
          }
          // T wave (ventricular repolarization) - rounded, wider than P
          else if (cycleProgress >= 0.65 && cycleProgress < 0.85) {
            const tProgress = (cycleProgress - 0.65) / 0.2;
            y -= Math.sin(tProgress * Math.PI) * 10;
          }
          // TP segment (flat baseline)
          else {
            y = centerY + (Math.random() - 0.5) * 1;
          }
        } else {
          // Blood pressure waveform - arterial pressure pattern
          // Use time-based calculation for stable rhythm
          const pixelsPerBeat = width / 2.5; // Show ~2.5 beats on screen
          const pixelOffset = (elapsed * beatsPerSecond * pixelsPerBeat) % pixelsPerBeat;
          const positionInCycle = (x - pixelOffset + pixelsPerBeat) % pixelsPerBeat;
          const cycleProgress = positionInCycle / pixelsPerBeat;
          
          // Baseline with very subtle variation
          y = centerY + (Math.random() - 0.5) * 0.8;
          
          // Systolic peak (sharp rise and fall)
          if (cycleProgress < 0.15) {
            const spikeProgress = cycleProgress / 0.15;
            if (spikeProgress < 0.4) {
              // Rapid upstroke
              y -= spikeProgress / 0.4 * 18;
            } else {
              // Gradual downstroke
              y -= (1 - (spikeProgress - 0.4) / 0.6) * 18;
            }
          }
          // Dicrotic notch (small bump after systolic)
          else if (cycleProgress >= 0.18 && cycleProgress < 0.25) {
            const notchProgress = (cycleProgress - 0.18) / 0.07;
            y -= Math.sin(notchProgress * Math.PI) * 4;
          }
          // Diastolic decay (gradual decline)
          else if (cycleProgress >= 0.25 && cycleProgress < 0.7) {
            const decayProgress = (cycleProgress - 0.25) / 0.45;
            y -= 5 * (1 - decayProgress) + 2;
          }
          // Flat diastolic phase
          else {
            y += 2;
          }
        }
        
        points.push({ x, y });
      }
      
      // Draw smooth curve through points
      if (points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        // Use quadratic curves for smoother lines
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        
        // Connect last point
        if (points.length > 1) {
          ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        }
        
        ctx.stroke();
      }

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
    };

    const animate = () => {
      drawWaveform(bpCanvasRef.current, 'bp');
      drawWaveform(hrCanvasRef.current, 'hr');
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [vitals.heartRate, severity]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (journeyIntervalRef.current) {
        clearInterval(journeyIntervalRef.current);
      }
    };
  }, []);

  const statusBadge = getStatusBadge(severity);
  const showEmergencyAlert = severity >= 75;

  // Theme data
  const themes = [
    { id: 1, icon: '🔬', title: 'Understanding Preeclampsia', subtitle: 'Definition & Overview', color: 'linear-gradient(135deg, #e91e63, #c2185b)', stats: [{icon: '📊', text: '5-8% prevalence'}, {icon: '⚠️', text: 'After 20 weeks'}], description: 'Learn what preeclampsia is, how it develops, and why early detection is critical for maternal and fetal health.' },
    { id: 2, icon: '🧬', title: 'Root Causes & Pathophysiology', subtitle: 'Why It Happens', color: 'linear-gradient(135deg, #ff6b9d, #c2185b)', stats: [{icon: '🔍', text: 'Placental issues'}, {icon: '💉', text: 'Blood vessels'}], description: 'Understand the biological mechanisms behind preeclampsia, from placental development to vascular dysfunction.' },
    { id: 3, icon: '👥', title: 'High-Risk Population Groups', subtitle: 'Who Is Most Vulnerable', color: 'linear-gradient(135deg, #f06292, #e91e63)', stats: [{icon: '👶', text: 'First pregnancy'}, {icon: '🎂', text: 'Age 35+'}], description: 'Identify risk factors including age, medical history, family genetics, and lifestyle that increase preeclampsia likelihood.' },
    { id: 4, icon: '🟢', title: 'Mild Preeclampsia Symptoms', subtitle: 'Early Warning Signs', color: 'linear-gradient(135deg, #66bb6a, #43a047)', stats: [{icon: '📈', text: 'BP 140-159/90-109'}, {icon: '🔬', text: 'Mild proteinuria'}], description: 'Recognize early symptoms like mild blood pressure elevation, slight swelling, and subtle changes requiring monitoring.' },
    { id: 5, icon: '🟡', title: 'Moderate Preeclampsia Indicators', subtitle: 'Progressive Warnings', color: 'linear-gradient(135deg, #ffa726, #f57c00)', stats: [{icon: '⬆️', text: 'BP 150-160/100-110'}, {icon: '🤕', text: 'Persistent headaches'}], description: 'Identify worsening symptoms including increased blood pressure, persistent headaches, and early organ involvement.' },
    { id: 6, icon: '🔴', title: 'Severe Preeclampsia Manifestations', subtitle: 'Critical Features', color: 'linear-gradient(135deg, #ef5350, #c62828)', stats: [{icon: '🚨', text: 'BP ≥160/110'}, {icon: '👁️', text: 'Vision changes'}], description: 'Recognize emergency symptoms requiring immediate medical attention to prevent life-threatening complications.' },
    { id: 7, icon: '⚡', title: 'Eclampsia: Critical Stage', subtitle: 'Life-Threatening Emergency', color: 'linear-gradient(135deg, #ab47bc, #7b1fa2)', stats: [{icon: '💥', text: 'Seizures'}, {icon: '🏥', text: 'Immediate care'}], description: 'Understand eclampsia—when preeclampsia progresses to seizures—a medical emergency requiring urgent intervention.' },
    { id: 8, icon: '🩸', title: 'HELLP Syndrome Complications', subtitle: 'Severe Variant', color: 'linear-gradient(135deg, #ec407a, #ad1457)', stats: [{icon: '🔬', text: 'Blood disorder'}, {icon: '🧪', text: 'Liver damage'}], description: 'Learn about HELLP syndrome: Hemolysis, Elevated Liver enzymes, Low Platelets—a dangerous preeclampsia complication.' },
    { id: 9, icon: '🚑', title: 'When to See Doctor Immediately', subtitle: 'Emergency Triggers', color: 'linear-gradient(135deg, #ff7043, #d84315)', stats: [{icon: '⏰', text: 'Time critical'}, {icon: '📞', text: 'Call 108/102'}], description: 'Know the exact symptoms that require emergency medical care—delays can be fatal for mother and baby.' },
    { id: 10, icon: '📅', title: 'Regular Monitoring Schedule', subtitle: 'Follow-Up Frequency', color: 'linear-gradient(135deg, #42a5f5, #1565c0)', stats: [{icon: '🩺', text: 'Weekly checks'}, {icon: '🧬', text: 'Lab tests'}], description: 'Understand recommended monitoring frequency based on severity—from weekly visits to hospitalization.' },
    { id: 11, icon: '❓', title: 'Essential Questions for Doctor', subtitle: 'Information to Gather', color: 'linear-gradient(135deg, #26a69a, #00695c)', stats: [{icon: '💬', text: '12 key questions'}, {icon: '📋', text: 'Be prepared'}], description: 'Critical questions to ask your healthcare provider about diagnosis, treatment, risks, and delivery planning.' },
    { id: 12, icon: '🛡️', title: 'Prevention: Before Pregnancy', subtitle: 'Primary Strategies', color: 'linear-gradient(135deg, #66bb6a, #2e7d32)', stats: [{icon: '⚖️', text: 'Healthy weight'}, {icon: '💊', text: 'Control BP'}], description: 'Pre-pregnancy steps to reduce risk: weight management, blood pressure control, and chronic disease optimization.' },
    { id: 13, icon: '💊', title: 'Prevention: During Pregnancy', subtitle: 'Evidence-Based Steps', color: 'linear-gradient(135deg, #5c6bc0, #283593)', stats: [{icon: '💉', text: 'Low-dose aspirin'}, {icon: '🥛', text: 'Calcium'}], description: 'WHO and ACOG recommended interventions during pregnancy: aspirin therapy, calcium supplementation, regular monitoring.' },
    { id: 14, icon: '🥗', title: 'Nutritional Management', subtitle: 'Diet Recommendations', color: 'linear-gradient(135deg, #8bc34a, #558b2f)', stats: [{icon: '🥛', text: '60-70g protein'}, {icon: '💧', text: '8-10 glasses water'}], description: 'Dietary guidelines for managing preeclampsia: protein, salt, hydration, and foods to include or avoid.' },
    { id: 15, icon: '🚶‍♀️', title: 'Physical Activity Guidelines', subtitle: 'Safe Exercise', color: 'linear-gradient(135deg, #ff8a65, #d84315)', stats: [{icon: '⏱️', text: '20-30 min walks'}, {icon: '🧘‍♀️', text: 'Prenatal yoga'}], description: 'Safe exercise recommendations for women with preeclampsia, including activities to avoid and warning signs.' },
    { id: 16, icon: '🩺', title: 'Home Blood Pressure Monitoring', subtitle: 'Self-Monitoring Protocol', color: 'linear-gradient(135deg, #4dd0e1, #00838f)', stats: [{icon: '⏰', text: '2x daily'}, {icon: '📊', text: 'Track readings'}], description: 'Learn proper home blood pressure monitoring technique, timing, recording, and when to alert your doctor.' },
    { id: 17, icon: '💊', title: 'Medication Management', subtitle: 'Common Treatments', color: 'linear-gradient(135deg, #7e57c2, #4527a0)', stats: [{icon: '🧪', text: 'Antihypertensives'}, {icon: '⚡', text: 'Magnesium sulfate'}], description: 'Understanding medications used in preeclampsia: blood pressure drugs, seizure prevention, fetal lung maturation.' },
    { id: 18, icon: '👶', title: 'Delivery Planning & Timing', subtitle: 'When Delivery is Necessary', color: 'linear-gradient(135deg, #f48fb1, #c2185b)', stats: [{icon: '📅', text: '37 weeks (mild)'}, {icon: '🚨', text: '34 weeks (severe)'}], description: 'Delivery timing based on severity, preparation steps, vaginal vs cesarean delivery decisions, and continuous monitoring.' },
    { id: 19, icon: '🍼', title: 'Postpartum Care Requirements', subtitle: 'After Delivery Monitoring', color: 'linear-gradient(135deg, #81c784, #388e3c)', stats: [{icon: '⏰', text: '72-hour watch'}, {icon: '🤱', text: 'Safe breastfeeding'}], description: 'Critical postpartum period: preeclampsia can worsen after delivery, monitoring needs, medication safety, breastfeeding.' },
    { id: 20, icon: '❤️', title: 'Long-Term Health Implications', subtitle: 'Future Cardiovascular Risk', color: 'linear-gradient(135deg, #e57373, #c62828)', stats: [{icon: '💔', text: '2-4x CVD risk'}, {icon: '📅', text: 'Annual screening'}], description: 'Women with preeclampsia face increased lifetime cardiovascular risk requiring ongoing monitoring and prevention.' },
    { id: 21, icon: '👨‍👩‍👧‍👦', title: 'Family Support & Caregiving', subtitle: 'How Families Can Help', color: 'linear-gradient(135deg, #ffb74d, #f57c00)', stats: [{icon: '🤝', text: 'Emotional support'}, {icon: '🏠', text: 'Practical help'}], description: 'Essential role of family members in monitoring, medication reminders, emergency response, and emotional support.' },
    { id: 22, icon: '🧠', title: 'Emotional & Mental Health', subtitle: 'Psychological Support', color: 'linear-gradient(135deg, #ba68c8, #7b1fa2)', stats: [{icon: '😰', text: 'Anxiety normal'}, {icon: '💚', text: 'Seek counseling'}], description: 'Managing anxiety, fear, and depression associated with high-risk pregnancy and preeclampsia complications.' },
    { id: 23, icon: '👶', title: 'Fetal Complications & Monitoring', subtitle: 'Impact on Baby', color: 'linear-gradient(135deg, #4fc3f7, #0277bd)', stats: [{icon: '📉', text: 'Growth restriction'}, {icon: '🔬', text: 'Regular ultrasound'}], description: 'Understanding risks to baby including growth restriction, preterm birth, and need for NICU care.' },
    { id: 24, icon: '🇮🇳', title: 'Cultural Considerations in India', subtitle: 'Addressing Local Beliefs', color: 'linear-gradient(135deg, #ff8a80, #d32f2f)', stats: [{icon: '🙏', text: 'Family involvement'}, {icon: '🏥', text: 'Hospital care critical'}], description: 'Navigating traditional beliefs, involving family decision-makers, and accessing appropriate medical care in India.' },
    { id: 25, icon: '🏥', title: 'Healthcare System Navigation', subtitle: 'Accessing Care in India', color: 'linear-gradient(135deg, #4db6ac, #00695c)', stats: [{icon: '📞', text: '108/102 ambulance'}, {icon: '💰', text: 'JSY benefits'}], description: 'Government schemes, emergency services, finding high-risk pregnancy clinics, insurance, and transport support.' },
  ];

  // Theme detail content
  const themeDetails: Record<number, { section: string; items: { title: string; content: string }[] }> = {
    1: {
      section: 'Understanding Preeclampsia',
      items: [
        { title: 'What is Preeclampsia?', content: 'Preeclampsia is a serious pregnancy complication characterized by high blood pressure and signs of damage to other organ systems, most often the liver and kidneys. It typically occurs after 20 weeks of pregnancy in women whose blood pressure had been normal.' },
        { title: 'Global Impact', content: 'Preeclampsia affects 5-8% of all pregnancies worldwide. In India, it is a leading cause of maternal and neonatal mortality, contributing to approximately 10-15% of maternal deaths.' },
        { title: 'Critical Window', content: 'The condition most commonly develops after 20 weeks of gestation, with the highest risk period being between weeks 32-36. Early detection during this window is crucial for preventing severe complications.' },
        { title: 'Why Early Detection Matters', content: 'Early detection allows for proper monitoring, lifestyle modifications, and medical interventions that can significantly reduce the risk of progression to severe preeclampsia or eclampsia, potentially saving both mother and baby.' }
      ]
    },
    2: {
      section: 'Primary Mechanisms',
      items: [
        { title: 'Placental Problems', content: 'Abnormal placental development and implantation leading to reduced blood flow. The placenta fails to properly invade the maternal blood vessels, resulting in poor oxygen and nutrient exchange between mother and baby.' },
        { title: 'Vascular Dysfunction', content: 'Maternal blood vessel damage causing systemic inflammation. The endothelial cells lining blood vessels become dysfunctional, leading to increased blood pressure and reduced blood flow to vital organs.' },
        { title: 'Immune Response', content: 'Maladaptation of immune system to pregnancy. The maternal immune system may inappropriately respond to fetal/placental antigens, triggering an inflammatory cascade that damages blood vessels.' },
        { title: 'Oxidative Stress', content: 'Imbalance between free radicals and antioxidants. Poor placental perfusion leads to oxidative stress, releasing factors into maternal circulation that cause widespread endothelial dysfunction.' }
      ]
    },
    3: {
      section: 'Risk Factors',
      items: [
        { title: 'First Pregnancy', content: 'First-time mothers have 3-4 times higher risk. The maternal immune system has not previously been exposed to paternal antigens, increasing the risk of abnormal immune response.' },
        { title: 'Advanced Maternal Age', content: 'Women aged 35+ have increased risk due to age-related vascular changes and higher likelihood of pre-existing conditions like hypertension or diabetes.' },
        { title: 'Family History', content: 'Having a mother or sister who had preeclampsia increases your risk by 2-3 times. Genetic factors play a significant role in susceptibility.' },
        { title: 'Multiple Pregnancy', content: 'Carrying twins, triplets, or more increases the risk due to larger placental mass and increased demands on the maternal cardiovascular system.' },
        { title: 'Pre-existing Conditions', content: 'Chronic hypertension, diabetes, kidney disease, and autoimmune disorders significantly increase preeclampsia risk.' }
      ]
    },
    4: {
      section: 'Early Warning Signs',
      items: [
        { title: 'Blood Pressure Changes', content: 'Blood pressure readings of 140-159/90-109 mmHg on two occasions at least 4 hours apart. This is the primary diagnostic criterion for mild preeclampsia.' },
        { title: 'Mild Proteinuria', content: 'Protein in urine (≥300mg in 24 hours or 1+ on dipstick). This indicates kidney involvement and is a key diagnostic marker.' },
        { title: 'Mild Swelling', content: 'Slight swelling in ankles, feet, or fingers that is gradual and improves with rest. Different from sudden severe edema.' },
        { title: 'Mild Headaches', content: 'Occasional headaches that respond to paracetamol. Not the severe, persistent headaches seen in severe preeclampsia.' },
        { title: 'Monitoring Requirements', content: 'Weekly doctor visits, home BP monitoring, and regular urine tests are essential for tracking progression.' }
      ]
    },
    5: {
      section: 'Progressive Symptoms',
      items: [
        { title: 'Elevated Blood Pressure', content: 'Blood pressure of 150-160/100-110 mmHg indicates worsening condition requiring closer monitoring and possible medication.' },
        { title: 'Persistent Headaches', content: 'Headaches that don\'t respond to over-the-counter pain relievers and persist for hours may indicate neurological involvement.' },
        { title: 'Visual Disturbances', content: 'Blurred vision, seeing spots, or flashing lights suggest retinal blood vessel changes and require immediate attention.' },
        { title: 'Upper Abdominal Pain', content: 'Pain under the ribs on the right side may indicate liver involvement and is a warning sign of progression.' },
        { title: 'Reduced Urination', content: 'Decreased urine output indicates worsening kidney function and fluid retention.' }
      ]
    },
    6: {
      section: 'Critical Features',
      items: [
        { title: 'Severe Hypertension', content: 'Blood pressure ≥160/110 mmHg on two occasions. This is a medical emergency requiring immediate hospitalization.' },
        { title: 'Severe Proteinuria', content: 'Protein in urine ≥5g in 24 hours or 3-4+ on dipstick indicates significant kidney damage.' },
        { title: 'Severe Headaches', content: 'Intense, persistent headaches that don\'t respond to medication may precede seizures.' },
        { title: 'Vision Problems', content: 'Blurred vision, double vision, temporary blindness, or flashing lights indicate severe retinal involvement.' },
        { title: 'Impaired Liver Function', content: 'Elevated liver enzymes, nausea, vomiting, and severe upper abdominal pain indicate HELLP syndrome risk.' },
        { title: 'Thrombocytopenia', content: 'Low platelet count (<100,000) increases bleeding risk and indicates severe disease progression.' }
      ]
    },
    7: {
      section: 'Eclampsia Emergency',
      items: [
        { title: 'What is Eclampsia?', content: 'Eclampsia is the onset of seizures in a woman with preeclampsia. It is a life-threatening emergency that can occur before, during, or after delivery.' },
        { title: 'Warning Signs', content: 'Severe headaches, visual disturbances, hyperreflexia (overactive reflexes), and altered mental status often precede seizures.' },
        { title: 'Seizure Characteristics', content: 'Tonic-clonic seizures lasting 1-2 minutes, potentially causing brain damage, aspiration, or death if not controlled.' },
        { title: 'Immediate Action', content: 'Call emergency services (108/102) immediately. Protect airway, turn patient on side, and do not restrain during seizure.' },
        { title: 'Prevention', content: 'Magnesium sulfate is the gold standard for preventing seizures in women with severe preeclampsia.' }
      ]
    },
    8: {
      section: 'HELLP Syndrome',
      items: [
        { title: 'What is HELLP?', content: 'HELLP stands for Hemolysis (destruction of red blood cells), Elevated Liver enzymes, and Low Platelet count. It is a severe variant of preeclampsia.' },
        { title: 'Hemolysis', content: 'Breakdown of red blood cells leads to anemia, jaundice, and release of harmful substances into the bloodstream.' },
        { title: 'Liver Damage', content: 'Elevated liver enzymes indicate liver cell death. Severe cases can cause liver rupture or failure.' },
        { title: 'Low Platelets', content: 'Platelet count below 100,000 increases bleeding risk and can lead to disseminated intravascular coagulation (DIC).' },
        { title: 'Treatment', content: 'Immediate delivery is often required. Blood transfusions, platelet transfusions, and intensive care monitoring may be necessary.' }
      ]
    },
    9: {
      section: 'Emergency Triggers',
      items: [
        { title: 'Call Doctor Immediately', content: 'Blood pressure ≥140/90 with symptoms, severe headache, vision changes, severe abdominal pain, or decreased fetal movement.' },
        { title: 'Call Emergency Services (108/102)', content: 'Blood pressure ≥160/110, seizures, severe shortness of breath, chest pain, or heavy bleeding.' },
        { title: 'After Hours', content: 'Most hospitals have 24/7 obstetric emergency services. Do not wait for regular business hours with severe symptoms.' },
        { title: 'Transport', content: 'Do not drive yourself. Use ambulance services or have someone else drive you to the hospital.' },
        { title: 'Information to Provide', content: 'Current blood pressure readings, symptoms, pregnancy week, and any medications you are taking.' }
      ]
    },
    10: {
      section: 'Monitoring Schedule',
      items: [
        { title: 'Normal Pregnancy', content: 'Monthly visits until 28 weeks, then biweekly until 36 weeks, then weekly until delivery.' },
        { title: 'Mild Preeclampsia', content: 'Weekly visits with BP monitoring, urine protein tests, and fetal monitoring. Home BP monitoring twice daily.' },
        { title: 'Moderate Preeclampsia', content: 'Twice-weekly visits with blood work (CBC, liver function, kidney function) and fetal biophysical profiles.' },
        { title: 'Severe Preeclampsia', content: 'Hospitalization for continuous monitoring, daily blood tests, and fetal surveillance until delivery.' },
        { title: 'Lab Tests', content: 'Complete blood count, liver function tests, kidney function tests, urine protein, and coagulation studies.' }
      ]
    },
    11: {
      section: 'Questions for Doctor',
      items: [
        { title: 'Diagnosis Questions', content: 'What is my current blood pressure? Is there protein in my urine? What do my lab results show?' },
        { title: 'Treatment Questions', content: 'What medications do I need? Are there side effects? What is the delivery plan?' },
        { title: 'Risk Questions', content: 'What are the risks to me? What are the risks to my baby? What are the chances of progression?' },
        { title: 'Monitoring Questions', content: 'How often should I check my BP at home? What symptoms should I watch for? When should I call you?' },
        { title: 'Delivery Questions', content: 'When should I deliver? Can I have a vaginal delivery? Will I need a C-section?' }
      ]
    },
    12: {
      section: 'Pre-Pregnancy Prevention',
      items: [
        { title: 'Weight Management', content: 'Achieve healthy BMI (18.5-24.9) before conception. Obesity increases preeclampsia risk 2-3 fold.' },
        { title: 'Blood Pressure Control', content: 'Optimize chronic hypertension before pregnancy. Target BP <140/90 with lifestyle changes and medications.' },
        { title: 'Diabetes Management', content: 'Achieve HbA1c <6.5% before conception. Good glucose control reduces vascular complications.' },
        { title: 'Preconception Counseling', content: 'Consult with a maternal-fetal medicine specialist if you have risk factors. Discuss aspirin prophylaxis.' },
        { title: 'Lifestyle Changes', content: 'Stop smoking, limit alcohol, start folic acid 400mcg daily, and establish regular exercise routine.' }
      ]
    },
    13: {
      section: 'During Pregnancy Prevention',
      items: [
        { title: 'Low-Dose Aspirin', content: '75-150mg daily starting at 12-16 weeks for high-risk women. Reduces risk by 10-20%.' },
        { title: 'Calcium Supplementation', content: '1-2g daily for women with low calcium intake. Especially important in Indian population.' },
        { title: 'Regular Monitoring', content: 'Attend all prenatal appointments. Home BP monitoring helps detect changes early.' },
        { title: 'Healthy Diet', content: 'Adequate protein (60-70g/day), moderate salt intake, plenty of fruits and vegetables.' },
        { title: 'Physical Activity', content: '150 minutes of moderate exercise per week (walking, swimming, prenatal yoga) with doctor approval.' }
      ]
    },
    14: {
      section: 'Nutritional Guidelines',
      items: [
        { title: 'Protein Requirements', content: '60-70g daily from sources like milk, eggs, legumes, and lean meats. Protein helps maintain blood volume.' },
        { title: 'Salt Intake', content: 'Moderate salt intake (5-6g/day). WHO does NOT recommend salt restriction for preeclampsia prevention.' },
        { title: 'Hydration', content: '8-10 glasses of water daily. Adequate hydration supports kidney function and blood volume.' },
        { title: 'Calcium Sources', content: 'Milk, yogurt, cheese, leafy greens, and fortified foods. Target 1000-1200mg calcium daily.' },
        { title: 'Foods to Include', content: 'Whole grains, colorful vegetables, berries, nuts, and omega-3 rich foods like walnuts and flaxseeds.' },
        { title: 'Foods to Limit', content: 'Processed foods, excessive caffeine (<200mg/day), and high-sodium snacks.' }
      ]
    },
    15: {
      section: 'Exercise Guidelines',
      items: [
        { title: 'Safe Activities', content: 'Walking (20-30 min daily), swimming, stationary cycling, and prenatal yoga are generally safe.' },
        { title: 'Exercise Benefits', content: 'Improves circulation, reduces stress, helps maintain healthy weight, and may reduce preeclampsia risk.' },
        { title: 'Warning Signs to Stop', content: 'Dizziness, chest pain, severe shortness of breath, vaginal bleeding, or decreased fetal movement.' },
        { title: 'Activities to Avoid', content: 'Contact sports, high-risk activities with fall risk, scuba diving, and exercising in hot/humid conditions.' },
        { title: 'Exercise Intensity', content: 'Moderate intensity - you should be able to maintain a conversation during exercise.' }
      ]
    },
    16: {
      section: 'Home BP Monitoring',
      items: [
        { title: 'Equipment', content: 'Use a validated automatic upper-arm cuff monitor. Wrist monitors are less accurate.' },
        { title: 'Proper Technique', content: 'Sit with back supported, feet flat, arm at heart level. Rest 5 minutes before measuring.' },
        { title: 'Timing', content: 'Measure twice daily - morning (before food/meds) and evening. Take 2 readings 1 minute apart.' },
        { title: 'Recording', content: 'Keep a log with date, time, BP readings, and any symptoms. Bring to every doctor visit.' },
        { title: 'When to Alert Doctor', content: 'BP ≥140/90 on two occasions, sudden increase >20/10 from baseline, or any severe symptoms.' }
      ]
    },
    17: {
      section: 'Medications',
      items: [
        { title: 'Antihypertensives', content: 'Labetalol, Nifedipine, and Methyldopa are commonly used. Goal is to prevent severe hypertension while maintaining placental perfusion.' },
        { title: 'Magnesium Sulfate', content: 'Given to prevent seizures in severe preeclampsia. Administered in hospital with close monitoring.' },
        { title: 'Corticosteroids', content: 'Betamethasone or Dexamethasone to accelerate fetal lung maturity if early delivery is anticipated.' },
        { title: 'Medications to Avoid', content: 'ACE inhibitors and ARBs are contraindicated in pregnancy. NSAIDs should be used with caution.' },
        { title: 'Fetal Monitoring', content: 'All medications are chosen to balance maternal benefit with fetal safety.' }
      ]
    },
    18: {
      section: 'Delivery Planning',
      items: [
        { title: 'Delivery Timing', content: 'Mild preeclampsia: 37 weeks. Severe preeclampsia: 34 weeks or earlier if maternal/fetal condition deteriorates.' },
        { title: 'Vaginal vs Cesarean', content: 'Vaginal delivery preferred if possible. C-section for obstetric indications or severe fetal compromise.' },
        { title: 'Induction Methods', content: 'Cervical ripening with balloon or prostaglandins, followed by oxytocin if needed.' },
        { title: 'Intrapartum Monitoring', content: 'Continuous fetal heart rate monitoring, frequent BP checks, and magnesium sulfate for severe cases.' },
        { title: 'Anesthesia Considerations', content: 'Epidural is generally safe. General anesthesia may be preferred in severe thrombocytopenia.' }
      ]
    },
    19: {
      section: 'Postpartum Care',
      items: [
        { title: 'Critical 72 Hours', content: 'Highest risk period for complications. BP may worsen initially. Close monitoring essential.' },
        { title: 'Extended Risk Period', content: 'Preeclampsia can develop up to 6 weeks postpartum. Continue monitoring BP at home.' },
        { title: 'Breastfeeding', content: 'Generally safe with most medications. Discuss specific medications with your doctor.' },
        { title: 'Medication Safety', content: 'ACE inhibitors can be used postpartum. Continue antihypertensives as prescribed.' },
        { title: 'Follow-up Schedule', content: 'BP check at 3-7 days and 2 weeks postpartum. Earlier if symptoms develop.' }
      ]
    },
    20: {
      section: 'Long-term Health',
      items: [
        { title: 'Cardiovascular Risk', content: '2-4x increased lifetime risk of heart disease, stroke, and hypertension. Risk remains elevated for decades.' },
        { title: 'Annual Screening', content: 'Yearly BP checks, lipid profile, and diabetes screening recommended lifelong.' },
        { title: 'Lifestyle Modifications', content: 'Maintain healthy weight, regular exercise, balanced diet, and avoid smoking to reduce future risk.' },
        { title: 'Future Pregnancies', content: '15-25% recurrence risk. Preconception counseling and aspirin prophylaxis recommended.' },
        { title: 'Cardioprotective Measures', content: 'Consider cardiology consultation. Early intervention for any cardiovascular risk factors.' }
      ]
    },
    21: {
      section: 'Family Support',
      items: [
        { title: 'Emotional Support', content: 'Provide reassurance, listen to concerns, and help manage anxiety about pregnancy complications.' },
        { title: 'Practical Help', content: 'Assist with household chores, childcare, meal preparation, and transportation to appointments.' },
        { title: 'Medication Reminders', content: 'Help ensure medications are taken on time. Set alarms or use pill organizers.' },
        { title: 'Emergency Response', content: 'Know warning signs and emergency numbers. Be prepared to act quickly if symptoms develop.' },
        { title: 'Advocacy', content: 'Accompany to appointments, take notes, ask questions, and ensure concerns are addressed.' }
      ]
    },
    22: {
      section: 'Mental Health',
      items: [
        { title: 'Anxiety is Normal', content: 'Feeling anxious about high-risk pregnancy is completely normal. Acknowledge these feelings and seek support.' },
        { title: 'Signs of Depression', content: 'Persistent sadness, loss of interest, sleep changes, or thoughts of self-harm require immediate help.' },
        { title: 'Coping Strategies', content: 'Mindfulness, deep breathing, gentle yoga, journaling, and connecting with support groups can help.' },
        { title: 'Professional Support', content: 'Consider counseling or therapy. Many hospitals offer mental health services for high-risk pregnancies.' },
        { title: 'Support Groups', content: 'Connect with other women experiencing preeclampsia. Online and in-person groups available.' }
      ]
    },
    23: {
      section: 'Fetal Risks',
      items: [
        { title: 'Growth Restriction', content: 'Reduced placental blood flow can limit baby\'s growth. Regular ultrasounds monitor growth velocity.' },
        { title: 'Preterm Birth', content: 'Early delivery may be necessary for maternal or fetal safety. Corticosteroids help mature fetal lungs.' },
        { title: 'Oligohydramnios', content: 'Low amniotic fluid indicates placental dysfunction and may require early delivery.' },
        { title: 'Fetal Monitoring', content: 'Non-stress tests, biophysical profiles, and Doppler studies assess fetal well-being.' },
        { title: 'NICU Preparation', content: 'If early delivery is anticipated, discuss NICU capabilities and prepare emotionally and practically.' }
      ]
    },
    24: {
      section: 'Cultural Considerations',
      items: [
        { title: 'Family Involvement', content: 'In Indian culture, family plays a central role in healthcare decisions. Include key family members in discussions.' },
        { title: 'Traditional Beliefs', content: 'Some traditional practices may conflict with medical advice. Address respectfully while emphasizing medical necessity.' },
        { title: 'Dietary Practices', content: 'Respect vegetarian preferences while ensuring adequate protein intake. Address fasting concerns during pregnancy.' },
        { title: 'Gender of Healthcare Provider', content: 'Some women may prefer female doctors. Accommodate when possible while ensuring timely care.' },
        { title: 'Hospital vs Home Birth', content: 'Emphasize that preeclampsia requires hospital delivery with emergency capabilities.' }
      ]
    },
    25: {
      section: 'Healthcare Navigation',
      items: [
        { title: 'Emergency Numbers', content: '108/102 for ambulance. Save hospital emergency and labor ward numbers in phone.' },
        { title: 'Janani Suraksha Yojana (JSY)', content: 'Government scheme providing cash assistance for institutional deliveries. Check eligibility and enrollment.' },
        { title: 'Pradhan Mantri Matru Vandana Yojana', content: 'Financial support for pregnant women. Rs. 5,000 in three installments for first live birth.' },
        { title: 'High-Risk Pregnancy Clinics', content: 'Government hospitals, medical colleges, and district hospitals have specialized services.' },
        { title: 'Transportation', content: 'Plan transport to hospital in advance. Keep emergency fund available for ambulance or private transport.' }
      ]
    }
  };

  // Myths data
  const myths = [
    { id: 1, myth: 'Preeclampsia only happens to first-time mothers', truth: 'While first pregnancies have higher risk, preeclampsia can occur in ANY pregnancy, including 2nd, 3rd, or later. Previous preeclampsia increases recurrence risk to 15-25%.', stat: '15-25%', statLabel: 'Recurrence rate' },
    { id: 2, myth: 'Swelling (edema) during pregnancy always means preeclampsia', truth: '80% of pregnant women experience normal swelling. Preeclampsia swelling is SUDDEN, affects face/hands, and occurs WITH high blood pressure and protein in urine. Normal pregnancy swelling is gradual and mostly in ankles.', stat: '80%', statLabel: 'Normal pregnancy swelling' },
    { id: 3, myth: 'You should reduce salt intake to prevent preeclampsia', truth: 'WHO and ACOG do NOT recommend salt restriction for preeclampsia prevention. Moderate salt intake is safe. Severe restriction can be harmful. Focus on overall healthy diet instead.', stat: 'WHO', statLabel: 'No salt restriction' },
    { id: 4, myth: 'Preeclampsia only happens during pregnancy', truth: 'Postpartum preeclampsia can develop UP TO 6 WEEKS after delivery. In fact, symptoms can WORSEN in the first 48-72 hours after birth. Never ignore symptoms after delivery.', stat: '6 weeks', statLabel: 'Risk period after birth' },
    { id: 5, myth: 'Bed rest prevents or treats preeclampsia', truth: 'There is NO evidence that bed rest prevents preeclampsia or improves outcomes. It may even increase risks of blood clots. Light activity with adequate rest is recommended instead.', stat: '0%', statLabel: 'Proven benefit' },
    { id: 6, myth: 'Natural remedies and home treatments can cure preeclampsia', truth: 'Preeclampsia requires MEDICAL management. No herbal remedy, diet change, or alternative therapy has been proven to cure or effectively treat preeclampsia. Delaying medical care is dangerous.', stat: '0', statLabel: 'Alternative cures proven' },
    { id: 7, myth: 'If you feel fine, you don\'t have preeclampsia', truth: 'Preeclampsia is often SILENT. Many women have NO symptoms until it becomes severe. Regular prenatal checks with blood pressure and urine tests are the only way to detect it early.', stat: 'Silent', statLabel: 'Often no symptoms' },
    { id: 8, myth: 'Preeclampsia always starts with high blood pressure', truth: 'Some women develop proteinuria (protein in urine) BEFORE blood pressure rises. Others may have HELLP syndrome with normal blood pressure. Multiple markers must be monitored.', stat: 'Multiple', statLabel: 'Diagnostic markers' },
  ];

  const [bpDisplay] = useState({ systolic: 120, diastolic: 80, status: 'NORMAL' });
  const [exploredThemes, setExploredThemes] = useState<number[]>([]);
  const [activeMyth, setActiveMyth] = useState<number | null>(null);
  
  // BP Tracker modal state
  const [showBPTracker, setShowBPTracker] = useState(false);
  const [bpReading, setBpReading] = useState({ systolic: '', diastolic: '', week: '20', time: '' });
  const [bpHistory, setBpHistory] = useState<Array<{ id: number; systolic: number; diastolic: number; week: string; time: string; date: string; status: string }>>([]);
  const [bpChartData, setBpChartData] = useState<number[]>([]);
  
  // Theme detail modal state
  const [selectedTheme, setSelectedTheme] = useState<typeof themes[0] | null>(null);

  const scrollToSection = (id: string) => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const exploreTheme = (id: number) => {
    if (!exploredThemes.includes(id)) {
      setExploredThemes([...exploredThemes, id]);
    }
    const theme = themes.find(t => t.id === id);
    if (theme) {
      setSelectedTheme(theme);
    }
  };

  const closeThemeModal = () => {
    setSelectedTheme(null);
  };

  const progressPercent = Math.round((exploredThemes.length / themes.length) * 100);

  // BP Tracker functions
  const openBPTracker = () => {
    setShowBPTracker(true);
    // Set default time to current time
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    setBpReading(prev => ({ ...prev, time: timeString }));
  };

  const closeBPTracker = () => {
    setShowBPTracker(false);
  };

  const getBPStatus = (systolic: number, diastolic: number): string => {
    if (systolic >= 180 || diastolic >= 120) return 'Crisis';
    if (systolic >= 140 || diastolic >= 90) return 'Severe';
    if (systolic >= 130 || diastolic >= 80) return 'High';
    if (systolic >= 120 && diastolic < 80) return 'Elevated';
    return 'Normal';
  };

  const saveBPReading = () => {
    const systolic = parseInt(bpReading.systolic);
    const diastolic = parseInt(bpReading.diastolic);
    
    if (!systolic || !diastolic) return;
    
    const status = getBPStatus(systolic, diastolic);
    const newReading = {
      id: Date.now(),
      systolic,
      diastolic,
      week: bpReading.week,
      time: bpReading.time,
      date: new Date().toLocaleDateString(),
      status
    };
    
    setBpHistory([newReading, ...bpHistory]);
    setBpChartData([...bpChartData, systolic]);
    
    // Reset form
    setBpReading({ systolic: '', diastolic: '', week: bpReading.week, time: '' });
  };

  const clearBPHistory = () => {
    setBpHistory([]);
    setBpChartData([]);
  };

  const downloadCSV = () => {
    const csvContent = [
      ['Date', 'Time', 'Week', 'Systolic', 'Diastolic', 'Status'],
      ...bpHistory.map(r => [r.date, r.time, r.week, r.systolic, r.diastolic, r.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bp-readings.csv';
    a.click();
  };

  return (
    <div className={styles.pageContainer}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        {/* Floating Particles Background */}
        <div className={styles.particlesContainer}>
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${Math.random() * 100}%`,
                width: `${3 + Math.random() * 10}px`,
                height: `${3 + Math.random() * 10}px`,
                background: Math.random() > 0.5 ? '#ec4899' : '#a855f7',
                opacity: 0.2 + Math.random() * 0.3,
                animationDuration: `${8 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.emergencyBadge}>
            <span className={styles.pulseDot}></span>
            <span>Critical Pregnancy Condition</span>
          </div>
          <h1>Understanding Preeclampsia</h1>
          <p className={styles.heroSubtitle}>
            A life-threatening pregnancy complication affecting Indian women. 
            <strong>Early detection saves lives.</strong> Learn the warning signs, 
            understand the risks, and protect yourself and your baby.
          </p>
          
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5-8%</span>
              <span className={styles.statLabel}>of pregnancies affected</span>
            </div>
            <div className={`${styles.statItem} ${styles.critical}`}>
              <span className={styles.statNumber}>140/90</span>
              <span className={styles.statLabel}>mmHg alert threshold</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>25</span>
              <span className={styles.statLabel}>essential themes</span>
            </div>
          </div>

          <div className={styles.heroCtaRow}>
            <button className={styles.btnPrimary} onClick={() => scrollToSection('themesSection')}>Start Learning Now</button>
            <button className={styles.btnSecondary} onClick={() => scrollToSection('simulator')}>Quick Symptom Check</button>
          </div>

          {/* Blood Pressure Monitor */}
          <div className={styles.bpMonitorWidget}>
            <div className={styles.monitorDisplay}>
              <div className={styles.bpReading}>
                <span className={styles.systolic}>{bpDisplay.systolic}</span>
                <span className={styles.separator}>/</span>
                <span className={styles.diastolic}>{bpDisplay.diastolic}</span>
              </div>
              <div className={styles.bpLabel}>mmHg</div>
              <div className={`${styles.bpStatus} ${bpDisplay.status === 'CRITICAL' ? styles.critical : ''}`}>{bpDisplay.status}</div>
            </div>
            <div className={styles.monitorInfo}>
              <p>Interactive BP Monitor</p>
              <p className={styles.small}>Watch how BP changes with preeclampsia</p>
            </div>
          </div>
        </div>

        {/* Hero Visual - Pregnancy Monitor */}
        <div className={styles.heroVisual3d}>
          <div className={styles.pregnancyMonitor}>
            <div className={styles.monitorHeader}>
              <span className={styles.monitorIcon}>🤰</span>
              <span className={styles.monitorTitle}>Live Pregnancy Monitor</span>
            </div>
            <div className={styles.monitorBody}>
              <div className={styles.vitalSigns}>
                <div className={styles.vitalItem}>
                  <span className={styles.vitalIcon}>⚠️</span>
                  <span className={styles.vitalLabel}>High BP</span>
                </div>
                <div className={styles.vitalItem}>
                  <span className={styles.vitalIcon}>🧪</span>
                  <span className={styles.vitalLabel}>Protein</span>
                </div>
                <div className={styles.vitalItem}>
                  <span className={styles.vitalIcon}>💔</span>
                  <span className={styles.vitalLabel}>Poor Flow</span>
                </div>
              </div>
              <div className={styles.monitorMessage}>
                <p>Watch Preeclampsia Impact</p>
                <p className={styles.monitorSubtext}>See how preeclampsia affects blood flow to the placenta. The pulsating vessels represent blood supply. Warning indicators show the three key signs: high blood pressure, protein in urine, and reduced placental flow.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THEMES SECTION */}
      <section id="themesSection" className={styles.themesSection}>
        <div className={styles.sectionHeaderEnhanced}>
          <div className={styles.headerContent}>
            <div className={styles.headerBadge}>
              <span className={styles.badgePulse}></span>
              <span className={styles.badgeText}>25 Essential Themes</span>
            </div>
            <h2 className={styles.sectionTitleGradient}>Your Complete Preeclampsia Guide</h2>
            <p className={styles.sectionSubtitle}>
              Explore a revolutionary 3D medical simulator. <strong>Rotate, zoom, click organs,</strong> 
              and watch disease progression in real-time across different severity levels and pregnancy weeks.
            </p>
            
            <div className={styles.trackerCtaRow}>
              <button className={styles.btnBpTracker} onClick={openBPTracker}>
                <span className={styles.btnIcon}>📊</span>
                <span className={styles.btnText}>Track Blood Pressure</span>
                <span className={styles.btnBadge}>Throughout Pregnancy</span>
              </button>
            </div>
          </div>
          
          {/* Progress Tracker */}
          <div className={styles.progressTracker}>
            <div className={styles.trackerVisual}>
              <svg width="140" height="140" className={styles.progressCircleSvg}>
                <circle cx="70" cy="70" r="60" className={styles.progressBgCircle}/>
                <circle cx="70" cy="70" r="60" className={styles.progressFillCircle} 
                  style={{ strokeDasharray: 377, strokeDashoffset: 377 - (377 * progressPercent / 100) }}/>
              </svg>
              <div className={styles.progressCenter}>
                <div className={styles.progressNumber}>{progressPercent}%</div>
                <div className={styles.progressLabel}>Learned</div>
              </div>
            </div>
            <div className={styles.trackerText}>
              <div className={styles.trackerCount}>{exploredThemes.length} of {themes.length} themes explored</div>
              <div className={styles.trackerEncourage}>Knowledge saves lives!</div>
            </div>
          </div>
        </div>

        {/* Theme Grid */}
        <div className={styles.themeGridEnhanced}>
          {themes.map((theme) => (
            <div key={theme.id} className={`${styles.themeCard3d} ${exploredThemes.includes(theme.id) ? styles.explored : ''}`}>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardHeader} style={{ background: theme.color }}>
                <div className={styles.iconCircle}>{theme.icon}</div>
                <h3>{theme.title}</h3>
                <p className={styles.cardSubtitle}>{theme.subtitle}</p>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.previewStats}>
                  {theme.stats.map((stat, idx) => (
                    <div key={idx} className={styles.previewStat}>
                      <span className={styles.statIconSmall}>{stat.icon}</span>
                      <span className={styles.statTextSmall}>{stat.text}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.cardDescription}>{theme.description}</p>
                <button className={styles.learnMoreBtn} onClick={() => exploreTheme(theme.id)}>
                  <span>Explore Now</span>
                  <span className={styles.btnArrow}>→</span>
                </button>
              </div>
              <div className={styles.cardProgressBar} style={{ width: exploredThemes.includes(theme.id) ? '100%' : '0%' }}></div>
            </div>
          ))}
        </div>
      </section>

      {/* SEVERITY COMPARISON SECTION */}
      <section id="severity" className={styles.severityComparisonSection}>
        <div className={styles.sectionHeaderEnhanced}>
          <div className={styles.headerContent}>
            <h2 className={styles.sectionTitleGradient}>Interactive Severity Guide</h2>
            <p className={styles.sectionSubtitle}>Compare symptoms, blood pressure ranges, and required actions across all severity levels</p>
          </div>
        </div>
        
        <div className={styles.severityCardsContainer}>
          <div className={`${styles.severityCard} ${styles.normal}`}>
            <div className={styles.severityHeader}>
              <span className={styles.severityIcon}>✅</span>
              <h3>Normal Pregnancy</h3>
            </div>
            <div className={styles.severityContent}>
              <div className={styles.bpRange}>BP Range: &lt;120/80 mmHg</div>
              <ul>
                <li>No proteinuria</li>
                <li>No swelling beyond normal</li>
                <li>No headaches or vision changes</li>
                <li>Normal organ function</li>
              </ul>
              <div className={styles.actionBox}>
                <strong>Action:</strong> Continue routine prenatal care
              </div>
            </div>
          </div>

          <div className={`${styles.severityCard} ${styles.mild}`}>
            <div className={styles.severityHeader}>
              <span className={styles.severityIcon}>🟢</span>
              <h3>Mild Preeclampsia</h3>
            </div>
            <div className={styles.severityContent}>
              <div className={styles.bpRange}>BP Range: 140-159/90-109 mmHg</div>
              <ul>
                <li>Mild protein in urine (≥300mg/24hr)</li>
                <li>Slight ankle/finger swelling</li>
                <li>Mild persistent headaches</li>
                <li>Monitor closely</li>
              </ul>
              <div className={styles.actionBox}>
                <strong>Action:</strong> Doctor visit within 24-48 hours, weekly monitoring
              </div>
            </div>
          </div>

          <div className={`${styles.severityCard} ${styles.moderate}`}>
            <div className={styles.severityHeader}>
              <span className={styles.severityIcon}>🟡</span>
              <h3>Moderate Preeclampsia</h3>
            </div>
            <div className={styles.severityContent}>
              <div className={styles.bpRange}>BP Range: 150-160/100-110 mmHg</div>
              <ul>
                <li>Moderate proteinuria (2+ dipstick)</li>
                <li>Noticeable face/hand swelling</li>
                <li>Persistent headaches</li>
                <li>Reduced urination</li>
              </ul>
              <div className={styles.actionBox}>
                <strong>Action:</strong> Same-day consultation, possible hospitalization
              </div>
            </div>
          </div>

          <div className={`${styles.severityCard} ${styles.severe}`}>
            <div className={styles.severityHeader}>
              <span className={styles.severityIcon}>🔴</span>
              <h3>Severe Preeclampsia</h3>
            </div>
            <div className={styles.severityContent}>
              <div className={styles.bpRange}>BP Range: ≥160/110 mmHg</div>
              <ul>
                <li>Severe proteinuria (3-4+ dipstick)</li>
                <li>Vision problems (blurred, spots)</li>
                <li>Severe headache won&apos;t go away</li>
                <li>Upper abdominal pain</li>
                <li>Difficulty breathing</li>
              </ul>
              <div className={`${styles.actionBox} ${styles.emergency}`}>
                <strong>Action:</strong> EMERGENCY - Call 108/102 immediately
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREVENTION SECTION */}
      <section id="prevention" className={styles.preventionSection}>
        <div className={styles.sectionHeaderEnhanced}>
          <div className={styles.headerContent}>
            <h2 className={styles.sectionTitleGradient}>Evidence-Based Prevention</h2>
            <p className={styles.sectionSubtitle}>Science-backed strategies to reduce your risk before and during pregnancy</p>
          </div>
        </div>

        <div className={styles.preventionGrid}>
          <div className={styles.preventionCard}>
            <div className={styles.preventionIcon}>💊</div>
            <h3>Low-Dose Aspirin</h3>
            <p className={styles.preventionSubtitle}>For high-risk women, starting at 12-16 weeks</p>
            <ul>
              <li><strong>Dose:</strong> 75-150mg daily</li>
              <li><strong>Timing:</strong> Before bedtime</li>
              <li><strong>Duration:</strong> Until 36 weeks or delivery</li>
              <li><strong>Effect:</strong> Reduces risk by 10-20%</li>
            </ul>
          </div>

          <div className={styles.preventionCard}>
            <div className={styles.preventionIcon}>🥛</div>
            <h3>Calcium Supplementation</h3>
            <p className={styles.preventionSubtitle}>Especially for women with low dietary calcium</p>
            <ul>
              <li><strong>Dose:</strong> 1-2g daily</li>
              <li><strong>Source:</strong> Supplements or diet</li>
              <li><strong>Foods:</strong> Milk, yogurt, leafy greens</li>
              <li><strong>Effect:</strong> Reduces risk in calcium-deficient women</li>
            </ul>
          </div>

          <div className={styles.preventionCard}>
            <div className={styles.preventionIcon}>⚖️</div>
            <h3>Weight Management</h3>
            <p className={styles.preventionSubtitle}>Achieve healthy BMI before conception</p>
            <ul>
              <li><strong>Target BMI:</strong> 18.5-24.9 kg/m²</li>
              <li><strong>Pregnancy gain:</strong> 11-16 kg (normal BMI)</li>
              <li><strong>Obesity risk:</strong> BMI ≥30 increases risk 2-3x</li>
              <li><strong>Strategy:</strong> Gradual, sustainable changes</li>
            </ul>
          </div>

          <div className={styles.preventionCard}>
            <div className={styles.preventionIcon}>🩺</div>
            <h3>Control Pre-existing Conditions</h3>
            <p className={styles.preventionSubtitle}>Optimize chronic diseases before pregnancy</p>
            <ul>
              <li><strong>Hypertension:</strong> Well-controlled BP &lt;140/90</li>
              <li><strong>Diabetes:</strong> HbA1c &lt;6.5% before conception</li>
              <li><strong>Kidney disease:</strong> Stable function</li>
              <li><strong>Consultation:</strong> Pre-pregnancy planning essential</li>
            </ul>
          </div>

          <div className={styles.preventionCard}>
            <div className={styles.preventionIcon}>🚶‍♀️</div>
            <h3>Regular Physical Activity</h3>
            <p className={styles.preventionSubtitle}>Moderate exercise reduces risk</p>
            <ul>
              <li><strong>Frequency:</strong> 150 min/week moderate activity</li>
              <li><strong>Activities:</strong> Walking, swimming, prenatal yoga</li>
              <li><strong>Benefits:</strong> Better BP control, weight management</li>
              <li><strong>Caution:</strong> Avoid overexertion, stay hydrated</li>
            </ul>
          </div>

          <div className={styles.preventionCard}>
            <div className={styles.preventionIcon}>🍎</div>
            <h3>Healthy Diet</h3>
            <p className={styles.preventionSubtitle}>Nutrition rich in vegetables, fruits, whole grains</p>
            <ul>
              <li><strong>Protein:</strong> 60-70g daily</li>
              <li><strong>Salt:</strong> Moderate, not restricted</li>
              <li><strong>Fruits/Veg:</strong> 5+ servings daily</li>
              <li><strong>Avoid:</strong> Excessive processed foods, caffeine</li>
            </ul>
          </div>
        </div>
      </section>

      {/* MYTHS SECTION */}
      <section id="myths" className={styles.mythsSection}>
        <div className={styles.sectionHeaderEnhanced}>
          <div className={styles.headerContent}>
            <h2 className={styles.sectionTitleGradient}>Truth vs Misconception</h2>
            <p className={styles.sectionSubtitle}>Debunking dangerous misconceptions with scientific facts</p>
          </div>
        </div>

        <div className={styles.mythsContainer}>
          <div className={styles.mythsStats}>
            <div className={styles.mythsStat}>
              <span className={styles.mythsStatIcon}>🧠</span>
              <span>Quiz Mode: OFF</span>
            </div>
            <div className={styles.mythsStat}>
              <span>Myths Busted: {activeMyth ? 1 : 0}/{myths.length}</span>
            </div>
            <div className={styles.mythsStat}>
              <span className={styles.trophy}>🏆</span>
            </div>
          </div>

          <button className={styles.shuffleBtn}>🔀 Shuffle Cards</button>

          <div className={styles.mythsGrid}>
            {myths.map((myth) => (
              <div key={myth.id} className={`${styles.mythCard} ${activeMyth === myth.id ? styles.revealed : ''}`}>
                <div className={styles.dangerLevel}>Danger Level</div>
                <div className={styles.mythContent}>
                  <span className={styles.mythIcon}>❌</span>
                  <p className={styles.mythText}>&quot;{myth.myth}&quot;</p>
                </div>
                {activeMyth !== myth.id ? (
                  <button className={styles.revealBtn} onClick={() => setActiveMyth(myth.id)}>
                    Reveal Truth
                  </button>
                ) : (
                  <div className={styles.truthContent}>
                    <div className={styles.truthActions}>
                      <button className={styles.actionBtn}>🔄</button>
                      <button className={styles.actionBtn}>📤</button>
                      <button className={styles.actionBtn}>🔊</button>
                    </div>
                    <div className={styles.truthBox}>
                      <span className={styles.truthIcon}>✅</span>
                      <h4>THE TRUTH</h4>
                      <p>{myth.truth}</p>
                      <div className={styles.truthStat}>
                        <span className={styles.statValue}>{myth.stat}</span>
                        <span className={styles.statName}>{myth.statLabel}</span>
                      </div>
                    </div>
                    <button className={styles.backBtn} onClick={() => setActiveMyth(null)}>← Back to Myth</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BP TRACKER MODAL */}
      {showBPTracker && (
        <div className={styles.bpTrackerOverlay} onClick={closeBPTracker}>
          <div className={styles.bpTrackerModal} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={styles.bpTrackerHeader}>
              <h2>Blood Pressure Tracker</h2>
              <p>Monitor your BP throughout your pregnancy journey</p>
              <button className={styles.bpTrackerClose} onClick={closeBPTracker}>✕</button>
            </div>

            {/* Content */}
            <div className={styles.bpTrackerContent}>
              {/* BP Categories */}
              <div className={styles.bpCategories}>
                <div className={`${styles.bpCategory} ${styles.normal}`}>
                  <span className={styles.categoryLabel}>Normal</span>
                  <span className={styles.categoryValue}>&lt; 120/80</span>
                </div>
                <div className={`${styles.bpCategory} ${styles.elevated}`}>
                  <span className={styles.categoryLabel}>Elevated</span>
                  <span className={styles.categoryValue}>120-129 / &lt;80</span>
                </div>
                <div className={`${styles.bpCategory} ${styles.high1}`}>
                  <span className={styles.categoryLabel}>High (Stage 1)</span>
                  <span className={styles.categoryValue}>130-139 / 80-89</span>
                </div>
                <div className={`${styles.bpCategory} ${styles.high2}`}>
                  <span className={styles.categoryLabel}>Severe (Stage 2)</span>
                  <span className={styles.categoryValue}>≥ 140 / ≥ 90</span>
                </div>
                <div className={`${styles.bpCategory} ${styles.crisis}`}>
                  <span className={styles.categoryLabel}>Crisis!</span>
                  <span className={styles.categoryValue}>≥ 180 / ≥ 120</span>
                </div>
              </div>

              {/* Emergency Alert */}
              <div className={styles.bpEmergencyAlert}>
                <span>🚨</span>
                <p>If your reading is ≥ 140/90 or you have symptoms, contact your doctor immediately. If ≥ 180/120, call emergency services (108/102) now!</p>
              </div>

              {/* Pregnancy Week Input */}
              <div className={styles.bpWeekInput}>
                <div className={styles.weekLabel}>
                  <span>🗓️</span>
                  <span>Current Pregnancy Week:</span>
                </div>
                <input
                  type="number"
                  value={bpReading.week}
                  onChange={(e) => setBpReading({ ...bpReading, week: e.target.value })}
                  min="1"
                  max="42"
                  className={styles.weekInput}
                />
              </div>

              {/* BP Input Form */}
              <div className={styles.bpInputSection}>
                <h3>📝 Log Today&apos;s Reading</h3>
                <div className={styles.bpInputs}>
                  <div className={styles.bpInputGroup}>
                    <label>
                      <span>❤️</span> Systolic (Top Number)
                    </label>
                    <input
                      type="number"
                      placeholder="120"
                      value={bpReading.systolic}
                      onChange={(e) => setBpReading({ ...bpReading, systolic: e.target.value })}
                      className={styles.bpInput}
                    />
                    <span className={styles.inputUnit}>mmHg</span>
                  </div>
                  <div className={styles.bpInputGroup}>
                    <label>
                      <span>💗</span> Diastolic (Bottom Number)
                    </label>
                    <input
                      type="number"
                      placeholder="80"
                      value={bpReading.diastolic}
                      onChange={(e) => setBpReading({ ...bpReading, diastolic: e.target.value })}
                      className={styles.bpInput}
                    />
                    <span className={styles.inputUnit}>mmHg</span>
                  </div>
                </div>
                <div className={styles.bpTimeInput}>
                  <label>
                    <span>🕐</span> Time of Reading
                  </label>
                  <input
                    type="time"
                    value={bpReading.time}
                    onChange={(e) => setBpReading({ ...bpReading, time: e.target.value })}
                    className={styles.timeInput}
                  />
                </div>
                <button className={styles.saveReadingBtn} onClick={saveBPReading}>
                  <span>💾</span> Save Reading
                </button>
              </div>

              {/* BP History */}
              <div className={styles.bpHistorySection}>
                <div className={styles.bpHistoryHeader}>
                  <h3>📈 Your BP History</h3>
                  {bpHistory.length > 0 && (
                    <button className={styles.clearAllBtn} onClick={clearBPHistory}>
                      🗑️ Clear All
                    </button>
                  )}
                </div>
                
                {bpHistory.length === 0 ? (
                  <div className={styles.noDataMessage}>
                    <p>No data to display</p>
                  </div>
                ) : (
                  <div className={styles.bpHistoryList}>
                    {bpHistory.map((reading) => (
                      <div key={reading.id} className={`${styles.bpHistoryItem} ${styles[reading.status.toLowerCase()]}`}>
                        <div className={styles.historyDate}>
                          <span>{reading.date}</span>
                          <span>{reading.time}</span>
                        </div>
                        <div className={styles.historyReading}>
                          <span className={styles.historyBP}>{reading.systolic}/{reading.diastolic}</span>
                          <span className={styles.historyUnit}>mmHg</span>
                        </div>
                        <div className={styles.historyStatus}>{reading.status}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Export Section */}
              <div className={styles.bpExportSection}>
                <h3>📥 Export Your Data:</h3>
                <div className={styles.exportButtons}>
                  <button className={styles.exportBtn} onClick={downloadCSV}>
                    <span>📊</span> Download CSV
                  </button>
                  <button className={styles.exportBtn} onClick={() => window.print()}>
                    <span>📄</span> Download PDF
                  </button>
                  <button className={styles.exportBtn} onClick={() => window.print()}>
                    <span>🖨️</span> Print Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THEME DETAIL MODAL */}
      {selectedTheme && (
        <div className={styles.themeDetailOverlay} onClick={closeThemeModal}>
          <div className={styles.themeDetailModal} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={styles.themeDetailHeader} style={{ background: selectedTheme.color }}>
              <div className={styles.themeDetailIcon}>{selectedTheme.icon}</div>
              <h2>{selectedTheme.title}</h2>
              <p>{selectedTheme.subtitle}</p>
              <button className={styles.themeDetailClose} onClick={closeThemeModal}>✕</button>
            </div>

            {/* Content */}
            <div className={styles.themeDetailContent}>
              {themeDetails[selectedTheme.id] && (
                <>
                  <h3 className={styles.themeDetailSectionTitle}>
                    {themeDetails[selectedTheme.id].section}
                  </h3>
                  <div className={styles.themeDetailItems}>
                    {themeDetails[selectedTheme.id].items.map((item, index) => (
                      <div key={index} className={styles.themeDetailItem}>
                        <h4>{item.title}</h4>
                        <p>{item.content}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <button 
                className={styles.themeDetailActionBtn} 
                onClick={() => {
                  closeThemeModal();
                  scrollToSection('simulator');
                }}
              >
                <span>🔬</span> Explore in 3D Simulator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATOR SECTION */}
      <section className={styles.simulatorSection3d} id="simulator">
      {/* Section Header */}
      <div className={styles.sectionHeaderEnhanced}>
        <div className={styles.headerContent}>
          <div className={styles.headerBadge}>
            <span className={styles.badgePulse}></span>
            <span className={styles.badgeText}>Interactive 3D Medical Simulation</span>
          </div>
          <h2 className={styles.sectionTitleGradient}>See How Preeclampsia Affects Your Body</h2>
          <p className={styles.sectionSubtitle}>
            Explore a revolutionary 3D medical simulator. <strong>Rotate, zoom, click organs,</strong>{' '}
            and watch disease progression in real-time across different severity levels and pregnancy weeks.
          </p>
        </div>
      </div>

      <div className={styles.simulatorContainer3d}>
        {/* Control Panel */}
        <div className={styles.simulatorControlsPanel}>
          {/* View Mode Selector */}
          <div className={styles.viewModeSelector}>
            <button 
              className={`${styles.viewModeBtn} ${viewMode === '3d' ? styles.active : ''}`}
              onClick={() => handleViewModeChange('3d')}
            >
              <span className={styles.modeIcon}>🌐</span>
              <span className={styles.modeLabel}>3D Interactive</span>
            </button>
            <button 
              className={`${styles.viewModeBtn} ${viewMode === 'comparison' ? styles.active : ''}`}
              onClick={() => handleViewModeChange('comparison')}
            >
              <span className={styles.modeIcon}>⚖️</span>
              <span className={styles.modeLabel}>Compare Normal vs PE</span>
            </button>
            <button 
              className={`${styles.viewModeBtn} ${viewMode === 'journey' ? styles.active : ''}`}
              onClick={() => handleViewModeChange('journey')}
            >
              <span className={styles.modeIcon}>🎬</span>
              <span className={styles.modeLabel}>Auto Journey</span>
            </button>
          </div>

          {/* Severity Slider */}
          <div className={styles.controlRow}>
            <label className={styles.controlLabel}>
              <span className={styles.labelIcon}>📊</span>
              <span className={styles.labelText}>Disease Severity:</span>
              <span className={styles.severityValue}>{getSeverityLabel(severity)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={severity}
              className={styles.customSlider}
              onChange={(e) => handleSeverityChange(Number(e.target.value))}
            />
            <div className={styles.sliderMarkers}>
              <span className={styles.marker} style={{ left: '0%' }}>Normal</span>
              <span className={styles.marker} style={{ left: '33%' }}>Mild</span>
              <span className={styles.marker} style={{ left: '66%' }}>Moderate</span>
              <span className={styles.marker} style={{ left: '100%' }}>Severe</span>
            </div>
          </div>

          {/* Timeline Slider */}
          <div className={styles.controlRow}>
            <label className={styles.controlLabel}>
              <span className={styles.labelIcon}>📅</span>
              <span className={styles.labelText}>Pregnancy Week:</span>
              <span className={styles.weekValue}>Week {week}</span>
            </label>
            <input
              type="range"
              min="20"
              max="40"
              step="2"
              value={week}
              className={styles.customSlider}
              onChange={(e) => handleWeekChange(Number(e.target.value))}
            />
            <div className={styles.sliderMarkers}>
              <span className={styles.marker}>20w</span>
              <span className={styles.marker}>24w</span>
              <span className={styles.marker}>28w</span>
              <span className={styles.marker}>32w</span>
              <span className={styles.marker}>36w</span>
              <span className={styles.marker}>40w</span>
            </div>
          </div>

          {/* Journey Controls */}
          {viewMode === 'journey' && (
            <div className={styles.journeyControls}>
              {!isJourneyPlaying ? (
                <button className={`${styles.journeyBtn} ${styles.playBtn}`} onClick={playJourney}>
                  <span>▶️ Play Disease Journey (60s)</span>
                </button>
              ) : (
                <button className={`${styles.journeyBtn} ${styles.pauseBtn}`} onClick={pauseJourney}>
                  <span>⏸️ Pause</span>
                </button>
              )}
              <button className={`${styles.journeyBtn} ${styles.resetBtn}`} onClick={resetJourney}>
                <span>🔄 Reset</span>
              </button>
              <div className={styles.journeyProgressBar}>
                <div 
                  className={styles.journeyProgressFill} 
                  style={{ width: `${journeyProgress}%` }}
                ></div>
              </div>
              <div className={styles.journeyTime}>{journeyTime}</div>
            </div>
          )}
        </div>

        {/* Main Visualization Grid */}
        <div 
          className={styles.mainVisualizationGrid}
          style={{ display: viewMode === '3d' ? 'grid' : 'none' }}
        >
          {/* Left Sidebar: Layer Controls */}
          <div className={styles.layerControlSidebar}>
            <div className={styles.sidebarHeader}>
              <span className={styles.headerIcon}>🧬</span>
              <h3>Organ Systems</h3>
            </div>

            <div className={styles.layerToggles}>
              <label className={styles.layerToggle}>
                <input 
                  type="checkbox" 
                  checked={layers.cardiovascular}
                  onChange={() => toggleLayer('cardiovascular')}
                />
                <span className={styles.toggleSwitch}></span>
                <span className={styles.layerIcon}>❤️</span>
                <span className={styles.layerName}>Cardiovascular</span>
              </label>

              <label className={styles.layerToggle}>
                <input 
                  type="checkbox" 
                  checked={layers.nervous}
                  onChange={() => toggleLayer('nervous')}
                />
                <span className={styles.toggleSwitch}></span>
                <span className={styles.layerIcon}>🧠</span>
                <span className={styles.layerName}>Nervous System</span>
              </label>

              <label className={styles.layerToggle}>
                <input 
                  type="checkbox" 
                  checked={layers.renal}
                  onChange={() => toggleLayer('renal')}
                />
                <span className={styles.toggleSwitch}></span>
                <span className={styles.layerIcon}>🫘</span>
                <span className={styles.layerName}>Kidneys (Renal)</span>
              </label>

              <label className={styles.layerToggle}>
                <input 
                  type="checkbox" 
                  checked={layers.hepatic}
                  onChange={() => toggleLayer('hepatic')}
                />
                <span className={styles.toggleSwitch}></span>
                <span className={styles.layerIcon}>🫀</span>
                <span className={styles.layerName}>Liver (Hepatic)</span>
              </label>

              <label className={styles.layerToggle}>
                <input 
                  type="checkbox" 
                  checked={layers.placental}
                  onChange={() => toggleLayer('placental')}
                />
                <span className={styles.toggleSwitch}></span>
                <span className={styles.layerIcon}>🤰</span>
                <span className={styles.layerName}>Placenta & Baby</span>
              </label>

              <label className={styles.layerToggle}>
                <input 
                  type="checkbox" 
                  checked={layers.respiratory}
                  onChange={() => toggleLayer('respiratory')}
                />
                <span className={styles.toggleSwitch}></span>
                <span className={styles.layerIcon}>🫁</span>
                <span className={styles.layerName}>Respiratory</span>
              </label>
            </div>

            <div className={styles.quickPresets}>
              <h4>Quick Views</h4>
              <button className={styles.presetBtn} onClick={() => applyPreset('all')}>
                <span>👁️ All Systems</span>
              </button>
              <button className={styles.presetBtn} onClick={() => applyPreset('critical')}>
                <span>⚠️ Critical Only</span>
              </button>
              <button className={styles.presetBtn} onClick={() => applyPreset('affected')}>
                <span>🔴 Affected Areas</span>
              </button>
            </div>

            <div className={styles.audioControl}>
              <button 
                className={styles.audioToggleBtn} 
                onClick={toggleAudio}
              >
                <span className={styles.audioIcon}>🔊</span>
                <span className={styles.audioText}>Audio Symptoms</span>
                <span className={`${styles.audioStatus} ${audioEnabled ? styles.on : ''}`}>
                  {audioEnabled ? 'ON' : 'OFF'}
                </span>
              </button>
              <p className={styles.audioHint}>🎧 Hear what symptoms feel like</p>
            </div>
          </div>

          {/* Center: Body Visualization */}
          <div className={styles.body3dViewer}>
            <div className={styles.bodySilhouetteContainer}>
              <svg className={styles.bodySvgPreeclampsia} viewBox="0 0 320 600">
                {/* Head */}
                <ellipse cx="160" cy="62" rx="42" ry="48" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                {/* Hair */}
                <ellipse cx="160" cy="38" rx="44" ry="30" fill="#5c3d2e" />
                <rect x="116" y="30" width="12" height="55" rx="6" fill="#5c3d2e" />
                <rect x="192" y="30" width="12" height="55" rx="6" fill="#5c3d2e" />
                {/* Eyes - change color based on severity */}
                <circle cx="143" cy="65" r="4" fill={severity >= 50 ? '#ef4444' : '#3a2520'} />
                <circle cx="177" cy="65" r="4" fill={severity >= 50 ? '#ef4444' : '#3a2520'} />
                {/* Smile/Frown based on severity */}
                {severity < 50 ? (
                  <path d="M148 78 Q160 86 172 78" fill="none" stroke="#3a2520" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M148 82 Q160 78 172 82" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                )}
                {/* Neck */}
                <rect x="148" y="106" width="24" height="28" rx="4" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                {/* Torso */}
                <path d="M100 134 Q100 128 130 128 L190 128 Q220 128 220 134 L220 280 Q220 285 215 285 L105 285 Q100 285 100 280 Z" 
                      fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2" />
                {/* Belly */}
                <ellipse cx="160" cy="300" rx="65" ry="75" fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2" />
                {/* Arms */}
                <path d="M100 140 Q70 170 60 240 Q55 270 65 290 L82 290 Q85 270 90 240 Q100 175 118 145" 
                      fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <path d="M220 140 Q250 170 260 240 Q265 270 255 290 L238 290 Q235 270 230 240 Q220 175 202 145" 
                      fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                {/* Hands - swollen appearance based on severity */}
                <ellipse cx="74" cy="298" rx={severity >= 50 ? 18 : 14} ry={severity >= 50 ? 12 : 10} 
                         fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                <ellipse cx="246" cy="298" rx={severity >= 50 ? 18 : 14} ry={severity >= 50 ? 12 : 10} 
                         fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                {/* Skirt */}
                <path d="M95 372 L88 480 Q88 490 100 490 L220 490 Q232 490 232 480 L225 372" 
                      fill="#c077a8" stroke="#a85d8a" strokeWidth="2" />
                {/* Legs - swollen appearance based on severity */}
                <rect x={severity >= 50 ? 114 : 118} y="488" width={severity >= 50 ? 42 : 34} height="90" rx="10" 
                      fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <rect x={severity >= 50 ? 164 : 168} y="488" width={severity >= 50 ? 42 : 34} height="90" rx="10" 
                      fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                {/* Feet - swollen appearance based on severity */}
                <ellipse cx="135" cy="586" rx={severity >= 50 ? 28 : 22} ry={severity >= 50 ? 14 : 10} 
                         fill="#8b5e83" />
                <ellipse cx="185" cy="586" rx={severity >= 50 ? 28 : 22} ry={severity >= 50 ? 14 : 10} 
                         fill="#8b5e83" />

                {/* GLOW ZONES - appear based on severity with animations */}
                {layers.nervous && (
                  <circle 
                    className={`${styles.glowZone} ${severity >= 25 ? styles.pulsingGlow : ''} ${severity >= 75 ? styles.pulsingGlowFast : ''}`} 
                    cx="160" cy="62" r="50" 
                    fill="url(#glowBrain)" 
                    opacity={getGlowOpacity(25)} 
                  />
                )}
                {layers.cardiovascular && (
                  <circle 
                    className={`${styles.glowZone} ${severity >= 30 ? styles.pulsingGlow : ''} ${severity >= 75 ? styles.pulsingGlowFast : ''}`} 
                    cx="160" cy="190" r="45" 
                    fill="url(#glowHeart)" 
                    opacity={getGlowOpacity(30)} 
                  />
                )}
                {layers.hepatic && (
                  <circle 
                    className={`${styles.glowZone} ${severity >= 35 ? styles.pulsingGlow : ''} ${severity >= 75 ? styles.pulsingGlowFast : ''}`} 
                    cx="195" cy="220" r="35" 
                    fill="url(#glowLiver)" 
                    opacity={getGlowOpacity(35)} 
                  />
                )}
                {layers.renal && (
                  <>
                    <circle 
                      className={`${styles.glowZone} ${severity >= 20 ? styles.pulsingGlow : ''} ${severity >= 75 ? styles.pulsingGlowFast : ''}`} 
                      cx="125" cy="250" r="30" 
                      fill="url(#glowKidney)" 
                      opacity={getGlowOpacity(20)} 
                    />
                    <circle 
                      className={`${styles.glowZone} ${severity >= 20 ? styles.pulsingGlow : ''} ${severity >= 75 ? styles.pulsingGlowFast : ''}`} 
                      cx="195" cy="250" r="30" 
                      fill="url(#glowKidney)" 
                      opacity={getGlowOpacity(20)} 
                    />
                  </>
                )}
                {layers.placental && (
                  <ellipse 
                    className={`${styles.glowZone} ${severity >= 15 ? styles.pulsingGlow : ''} ${severity >= 75 ? styles.pulsingGlowFast : ''}`} 
                    cx="160" cy="310" rx="70" ry="80" 
                    fill="url(#glowPlacenta)" 
                    opacity={getGlowOpacity(15)} 
                  />
                )}

                {/* ORGAN ICONS */}
                {layers.nervous && (
                  <g className={styles.organIcon} onClick={() => openOrganModal('brain')}>
                    <circle cx="160" cy="30" r="18" fill="rgba(59, 130, 246, 0.15)" 
                            stroke={severity >= 50 ? '#ef4444' : 'rgba(59, 130, 246, 0.6)'} strokeWidth="2" />
                    <text x="160" y="36" textAnchor="middle" fontSize="16">🧠</text>
                  </g>
                )}
                {layers.cardiovascular && (
                  <g 
                    className={`${styles.organIcon} ${severity >= 50 ? styles.heartBeat : ''}`} 
                    onClick={() => openOrganModal('heart')}
                  >
                    <circle cx="160" cy="185" r="18" fill="rgba(239, 68, 68, 0.15)" 
                            stroke={severity >= 50 ? '#ef4444' : 'rgba(239, 68, 68, 0.6)'} strokeWidth="2" />
                    <text x="160" y="191" textAnchor="middle" fontSize="16">❤️</text>
                  </g>
                )}
                {layers.hepatic && (
                  <g className={styles.organIcon} onClick={() => openOrganModal('liver')}>
                    <circle cx="200" cy="220" r="16" fill="rgba(146, 64, 14, 0.15)" 
                            stroke={severity >= 50 ? '#ef4444' : 'rgba(146, 64, 14, 0.6)'} strokeWidth="2" />
                    <text x="200" y="226" textAnchor="middle" fontSize="14">🫀</text>
                  </g>
                )}
                {layers.renal && (
                  <g className={styles.organIcon} onClick={() => openOrganModal('kidneys')}>
                    <circle cx="120" cy="250" r="16" fill="rgba(124, 45, 18, 0.15)" 
                            stroke={severity >= 50 ? '#ef4444' : 'rgba(124, 45, 18, 0.6)'} strokeWidth="2" />
                    <text x="120" y="256" textAnchor="middle" fontSize="14">🫘</text>
                  </g>
                )}
                {layers.placental && (
                  <g className={styles.organIcon} onClick={() => openOrganModal('placenta')}>
                    <circle cx="160" cy="320" r="20" fill="rgba(236, 72, 153, 0.15)" 
                            stroke={severity >= 50 ? '#ef4444' : 'rgba(236, 72, 153, 0.6)'} strokeWidth="2" />
                    <text x="160" y="327" textAnchor="middle" fontSize="18">🤰</text>
                  </g>
                )}

                {/* INVISIBLE CLICKABLE HOTSPOTS */}
                <circle className={styles.hotspotClick} cx="160" cy="62" r="48" opacity="0" 
                        onClick={() => openOrganModal('brain')} />
                <circle className={styles.hotspotClick} cx="160" cy="190" r="42" opacity="0" 
                        onClick={() => openOrganModal('heart')} />
                <circle className={styles.hotspotClick} cx="200" cy="220" r="32" opacity="0" 
                        onClick={() => openOrganModal('liver')} />
                <circle className={styles.hotspotClick} cx="125" cy="250" r="28" opacity="0" 
                        onClick={() => openOrganModal('kidneys')} />
                <circle className={styles.hotspotClick} cx="195" cy="250" r="28" opacity="0" 
                        onClick={() => openOrganModal('kidneys')} />
                <ellipse className={styles.hotspotClick} cx="160" cy="310" rx="65" ry="75" opacity="0" 
                         onClick={() => openOrganModal('placenta')} />

                {/* GRADIENT DEFINITIONS */}
                <defs>
                  <radialGradient id="glowBrain">
                    <stop offset="0%" stopColor={severity >= 50 ? '#ef4444' : '#4ade80'} stopOpacity="0.5"/>
                    <stop offset="100%" stopColor={severity >= 50 ? '#ef4444' : '#4ade80'} stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="glowHeart">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="glowLiver">
                    <stop offset="0%" stopColor={severity >= 50 ? '#ef4444' : '#92400e'} stopOpacity="0.5"/>
                    <stop offset="100%" stopColor={severity >= 50 ? '#ef4444' : '#92400e'} stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="glowKidney">
                    <stop offset="0%" stopColor={severity >= 50 ? '#ef4444' : '#7c2d12'} stopOpacity="0.5"/>
                    <stop offset="100%" stopColor={severity >= 50 ? '#ef4444' : '#7c2d12'} stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="glowPlacenta">
                    <stop offset="0%" stopColor={severity >= 50 ? '#ef4444' : '#ec4899'} stopOpacity="0.4"/>
                    <stop offset="100%" stopColor={severity >= 50 ? '#ef4444' : '#ec4899'} stopOpacity="0"/>
                  </radialGradient>
                </defs>
              </svg>

              {/* Interaction Hint */}
              <div className={styles.bodyHint}>
                <span className={styles.hintIcon}>👆</span>
                <span>Click organs to see effects</span>
              </div>
            </div>

            {/* Viewer Controls */}
            <div className={styles.viewerControls}>
              <button className={styles.controlBtn} title="Zoom In">🔍+</button>
              <button className={styles.controlBtn} title="Zoom Out">🔍-</button>
              <button className={styles.controlBtn} title="Reset View">🎯</button>
              <button className={styles.controlBtn} title="Auto Rotate">🔄</button>
            </div>

            {/* Interaction Hint */}
            <div className={styles.interactionHint}>
              <span className={styles.hintIcon}>👆</span>
              <span>Drag to rotate • Scroll to zoom • Click organs for details</span>
            </div>

            {/* Current Status Badge */}
            <div className={styles.statusBadge} style={{ borderColor: statusBadge.color }}>
              <span className={styles.badgeIcon}>{statusBadge.icon}</span>
              <span>{statusBadge.text}</span>
            </div>
          </div>

          {/* Right Sidebar: Live Vital Signs */}
          <div className={styles.vitalSignsSidebar}>
            <div className={styles.sidebarHeader}>
              <span className={styles.headerIcon}>📊</span>
              <h3>Live Vitals</h3>
            </div>

            {/* Blood Pressure */}
            <div className={styles.vitalCard}>
              <div className={styles.vitalTitle}>
                <span className={styles.vitalIcon}>💉</span>
                <span>Blood Pressure</span>
              </div>
              <div className={styles.vitalReading}>
                <span className={styles.bpSystolic}>{vitals.systolic}</span>
                <span className={styles.bpSep}>/</span>
                <span className={styles.bpDiastolic}>{vitals.diastolic}</span>
                <span className={styles.bpUnit}>mmHg</span>
              </div>
              <canvas ref={bpCanvasRef} className={styles.vitalWaveform} width="240" height="50" />
              <div className={`${styles.vitalStatus} ${severity < 25 ? styles.statusNormal : severity < 75 ? styles.statusWarning : styles.statusDanger}`}>
                {severity < 25 ? 'Normal Range' : severity < 50 ? 'Elevated' : severity < 75 ? 'High Stage 1' : 'High Stage 2'}
              </div>
            </div>

            {/* Heart Rate */}
            <div className={styles.vitalCard}>
              <div className={styles.vitalTitle}>
                <span className={styles.vitalIcon}>❤️</span>
                <span>Heart Rate</span>
              </div>
              <div className={styles.vitalReading}>
                <span className={styles.heartBeatIcon}>💓</span>
                <span className={styles.hrValue}>{vitals.heartRate}</span>
                <span className={styles.hrUnit}>BPM</span>
              </div>
              <canvas ref={hrCanvasRef} className={styles.vitalWaveform} width="240" height="50" />
              <div className={`${styles.vitalStatus} ${vitals.heartRate < 100 ? styles.statusNormal : vitals.heartRate < 120 ? styles.statusWarning : styles.statusDanger}`}>
                {vitals.heartRate < 100 ? 'Normal' : vitals.heartRate < 120 ? 'Elevated' : 'Tachycardia'}
              </div>
            </div>

            {/* Oxygen Saturation */}
            <div className={styles.vitalCard}>
              <div className={styles.vitalTitle}>
                <span className={styles.vitalIcon}>🫁</span>
                <span>Oxygen (SpO2)</span>
              </div>
              <div className={styles.vitalReading}>
                <span className={styles.o2Value}>{vitals.oxygen}</span>
                <span className={styles.o2Unit}>%</span>
              </div>
              <div className={styles.o2BarContainer}>
                <div className={styles.o2BarFill} style={{ width: `${vitals.oxygen}%` }}></div>
              </div>
              <div className={`${styles.vitalStatus} ${vitals.oxygen >= 95 ? styles.statusNormal : vitals.oxygen >= 90 ? styles.statusWarning : styles.statusDanger}`}>
                {vitals.oxygen >= 95 ? 'Optimal' : vitals.oxygen >= 90 ? 'Mild Hypoxia' : 'Hypoxia'}
              </div>
            </div>

            {/* Urine Protein */}
            <div className={styles.vitalCard}>
              <div className={styles.vitalTitle}>
                <span className={styles.vitalIcon}>🧪</span>
                <span>Urine Protein</span>
              </div>
              <div className={styles.vitalReading}>
                <div className={styles.proteinCup}>
                  <div className={styles.proteinFluid} style={{ height: `${severity}%` }}></div>
                </div>
                <span className={styles.proteinValue}>{vitals.protein}</span>
              </div>
              <div className={`${styles.vitalStatus} ${severity < 25 ? styles.statusNormal : styles.statusDanger}`}>
                {severity < 25 ? 'Negative' : 'Positive'}
              </div>
            </div>

            {/* Platelets */}
            <div className={styles.vitalCard}>
              <div className={styles.vitalTitle}>
                <span className={styles.vitalIcon}>🩸</span>
                <span>Platelets</span>
              </div>
              <div className={styles.vitalReading}>
                <span className={styles.plateletValue}>{vitals.platelets}</span>
                <span className={styles.plateletUnit}>k/μL</span>
              </div>
              <div className={styles.plateletCells}>
                {Array.from({ length: Math.min(Math.floor(vitals.platelets / 20), 12) }).map((_, i) => (
                  <div key={i} className={styles.plateletCell} style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
              <div className={`${styles.vitalStatus} ${vitals.platelets >= 150 ? styles.statusNormal : vitals.platelets >= 100 ? styles.statusWarning : styles.statusDanger}`}>
                {vitals.platelets >= 150 ? 'Normal' : vitals.platelets >= 100 ? 'Thrombocytopenia' : 'Severe'}
              </div>
            </div>

            {/* Emergency Alert */}
            {showEmergencyAlert && (
              <div className={styles.emergencyAlertBox}>
                <div className={styles.alertIconShake}>🚨</div>
                <div className={styles.alertContent}>
                  <strong>CRITICAL VALUES!</strong>
                  <p>Immediate medical attention required</p>
                </div>
                <button className={styles.callEmergencyBtn} onClick={() => window.open('tel:108')}>
                  📞 Call 108 NOW
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comparison View */}
        <div 
          key={`comparison-${viewMode}`}
          className={`${styles.comparisonViewGrid} ${viewMode === 'comparison' ? styles.active : ''}`}
        >
          {/* Normal Pregnancy Panel */}
          <div className={`${styles.comparisonPanel} ${styles.normalPanel}`}>
            <div className={styles.panelHeaderComparison}>
              <div className={`${styles.statusBadgeComparison} ${styles.statusBadgeNormal}`}>
                <span className={styles.badgeIcon}>✅</span>
                <span>NORMAL PREGNANCY</span>
              </div>
              <p className={styles.panelSubtitle}>Healthy organ function • BP: 120/80 mmHg</p>
            </div>
            
            <div className={`${styles.bodyComparisonContainer} ${styles.bodyFixedSize}`}>
              <svg className={styles.bodySvgComparison} viewBox="0 0 320 600">
                <ellipse cx="160" cy="62" rx="42" ry="48" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <ellipse cx="160" cy="38" rx="44" ry="30" fill="#5c3d2e" />
                <rect x="116" y="30" width="12" height="55" rx="6" fill="#5c3d2e" />
                <rect x="192" y="30" width="12" height="55" rx="6" fill="#5c3d2e" />
                <circle cx="143" cy="65" r="4" fill="#3a2520" />
                <circle cx="177" cy="65" r="4" fill="#3a2520" />
                <path d="M148 78 Q160 86 172 78" fill="none" stroke="#3a2520" strokeWidth="2" strokeLinecap="round" />
                <rect x="148" y="106" width="24" height="28" rx="4" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                <path d="M100 134 Q100 128 130 128 L190 128 Q220 128 220 134 L220 280 Q220 285 215 285 L105 285 Q100 285 100 280 Z" 
                      fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2" />
                <ellipse cx="160" cy="300" rx="65" ry="75" fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2" />
                <path d="M100 140 Q70 170 60 240 Q55 270 65 290 L82 290 Q85 270 90 240 Q100 175 118 145" 
                      fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <path d="M220 140 Q250 170 260 240 Q265 270 255 290 L238 290 Q235 270 230 240 Q220 175 202 145" 
                      fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <ellipse cx="74" cy="298" rx="14" ry="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                <ellipse cx="246" cy="298" rx="14" ry="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                <path d="M95 372 L88 480 Q88 490 100 490 L220 490 Q232 490 232 480 L225 372" 
                      fill="#c077a8" stroke="#a85d8a" strokeWidth="2" />
                <rect x="118" y="488" width="34" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <rect x="168" y="488" width="34" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <ellipse cx="135" cy="586" rx="22" ry="10" fill="#8b5e83" />
                <ellipse cx="185" cy="586" rx="22" ry="10" fill="#8b5e83" />
                
                {/* Healthy glow indicators */}
                <circle cx="160" cy="62" r="50" fill="url(#healthyGlow)" opacity="0.6" />
                <circle cx="160" cy="190" r="45" fill="url(#healthyGlow)" opacity="0.6" />
                <ellipse cx="160" cy="310" rx="70" ry="80" fill="url(#healthyGlow)" opacity="0.6" />
                
                <defs>
                  <radialGradient id="healthyGlow">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#4ade80" stopOpacity="0"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>
            
            <div className={styles.comparisonStatsGrid}>
              <div className={`${styles.statCard} ${styles.statGood}`}>
                <div className={styles.statIcon}>💚</div>
                <div className={styles.statInfo}>
                  <div className={styles.statLabel}>Blood Pressure</div>
                  <div className={styles.statValue}>120/80</div>
                </div>
              </div>
              <div className={`${styles.statCard} ${styles.statGood}`}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statInfo}>
                  <div className={styles.statLabel}>Protein</div>
                  <div className={styles.statValue}>None</div>
                </div>
              </div>
              <div className={`${styles.statCard} ${styles.statGood}`}>
                <div className={styles.statIcon}>🫘</div>
                <div className={styles.statInfo}>
                  <div className={styles.statLabel}>Kidneys</div>
                  <div className={styles.statValue}>Normal</div>
                </div>
              </div>
              <div className={`${styles.statCard} ${styles.statGood}`}>
                <div className={styles.statIcon}>🤰</div>
                <div className={styles.statInfo}>
                  <div className={styles.statLabel}>Baby</div>
                  <div className={styles.statValue}>Healthy</div>
                </div>
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className={styles.comparisonDividerVertical}>
            <div className={styles.dividerLineVertical}></div>
            <div className={styles.vsBadgeLarge}>
              <span className={styles.vsText}>VS</span>
            </div>
            <div className={styles.dividerLineVertical}></div>
          </div>

          {/* Preeclampsia Panel */}
          <div className={`${styles.comparisonPanel} ${styles.pePanel}`}>
            <div className={styles.panelHeaderComparison}>
              <div className={`${styles.statusBadgeComparison} ${styles.statusBadgeWarning}`}>
                <span className={styles.badgeIcon}>⚠️</span>
                <span>PREECLAMPSIA</span>
              </div>
              <p className={styles.panelSubtitle}>Multiple organs affected • BP: {vitals.systolic}/{vitals.diastolic} mmHg</p>
            </div>
            
            <div className={`${styles.bodyComparisonContainer} ${styles.bodyFixedSize}`}>
              <svg className={styles.bodySvgComparison} viewBox="0 0 320 600">
                <ellipse cx="160" cy="62" rx="42" ry="48" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <ellipse cx="160" cy="38" rx="44" ry="30" fill="#5c3d2e" />
                <rect x="116" y="30" width="12" height="55" rx="6" fill="#5c3d2e" />
                <rect x="192" y="30" width="12" height="55" rx="6" fill="#5c3d2e" />
                <circle cx="143" cy="65" r="4" fill="#ef4444" />
                <circle cx="177" cy="65" r="4" fill="#ef4444" />
                <ellipse cx="143" cy="65" rx="8" ry="5" fill="rgba(239, 68, 68, 0.2)" />
                <ellipse cx="177" cy="65" rx="8" ry="5" fill="rgba(239, 68, 68, 0.2)" />
                <path d="M148 82 Q160 78 172 82" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <rect x="148" y="106" width="24" height="28" rx="4" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                <path d="M100 134 Q100 128 130 128 L190 128 Q220 128 220 134 L220 280 Q220 285 215 285 L105 285 Q100 285 100 280 Z" 
                      fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2" />
                <ellipse cx="160" cy="300" rx="65" ry="75" fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2" />
                <path d="M100 140 Q70 170 60 240 Q55 270 65 290 L82 290 Q85 270 90 240 Q100 175 118 145" 
                      fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <path d="M220 140 Q250 170 260 240 Q265 270 255 290 L238 290 Q235 270 230 240 Q220 175 202 145" 
                      fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <ellipse cx="74" cy="298" rx="18" ry="12" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                <ellipse cx="246" cy="298" rx="18" ry="12" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5" />
                <circle cx="74" cy="298" r="18" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />
                <circle cx="246" cy="298" r="18" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />
                <path d="M95 372 L88 480 Q88 490 100 490 L220 490 Q232 490 232 480 L225 372" 
                      fill="#c077a8" stroke="#a85d8a" strokeWidth="2" />
                <rect x="114" y="488" width="42" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <rect x="164" y="488" width="42" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2" />
                <rect x="114" y="488" width="42" height="90" rx="10" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
                <rect x="164" y="488" width="42" height="90" rx="10" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
                <ellipse cx="135" cy="586" rx="28" ry="14" fill="#8b5e83" />
                <ellipse cx="185" cy="586" rx="28" ry="14" fill="#8b5e83" />
                <ellipse cx="135" cy="586" rx="28" ry="14" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />
                <ellipse cx="185" cy="586" rx="28" ry="14" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />
                
                {/* Danger glow indicators */}
                <circle cx="160" cy="62" r="50" fill="url(#dangerGlow)" opacity="0.8" className={styles.pulsingGlow} />
                <circle cx="160" cy="190" r="45" fill="url(#dangerGlow)" opacity="0.8" className={styles.pulsingGlow} />
                <ellipse cx="160" cy="310" rx="70" ry="80" fill="url(#dangerGlow)" opacity="0.8" className={styles.pulsingGlow} />
                
                <defs>
                  <radialGradient id="dangerGlow">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>
            
            <div className={styles.comparisonStatsGrid}>
              <div className={`${styles.statCard} ${styles.statDanger}`}>
                <div className={styles.statIcon}>🔴</div>
                <div className={styles.statInfo}>
                  <div className={styles.statLabel}>Blood Pressure</div>
                  <div className={styles.statValue}>{vitals.systolic}/{vitals.diastolic}</div>
                </div>
              </div>
              <div className={`${styles.statCard} ${styles.statDanger}`}>
                <div className={styles.statIcon}>⚠️</div>
                <div className={styles.statInfo}>
                  <div className={styles.statLabel}>Protein</div>
                  <div className={styles.statValue}>{vitals.protein}</div>
                </div>
              </div>
              <div className={`${styles.statCard} ${styles.statDanger}`}>
                <div className={styles.statIcon}>🫘</div>
                <div className={styles.statInfo}>
                  <div className={styles.statLabel}>Kidneys</div>
                  <div className={styles.statValue}>Impaired</div>
                </div>
              </div>
              <div className={`${styles.statCard} ${styles.statWarning}`}>
                <div className={styles.statIcon}>👶</div>
                <div className={styles.statInfo}>
                  <div className={styles.statLabel}>Baby</div>
                  <div className={styles.statValue}>At Risk</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className={styles.comparisonLegend}>
            <h4>🔍 Visual Differences to Notice:</h4>
            <div className={styles.legendGrid}>
              <div className={styles.legendItem}>
                <span className={styles.legendIndicator}>↔️</span>
                <span className={styles.legendText}><strong>Swelling:</strong> Hands, feet, and legs visibly larger</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendIndicator}>👁️</span>
                <span className={styles.legendText}><strong>Eyes:</strong> Redness and strain (vision problems)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendIndicator}>😟</span>
                <span className={styles.legendText}><strong>Expression:</strong> Distress vs. relaxed smile</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendIndicator}>✨</span>
                <span className={styles.legendText}><strong>Organ Glow:</strong> Green (healthy) vs. Red (affected)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendIndicator}>🎨</span>
                <span className={styles.legendText}><strong>Skin Tone:</strong> Pink flush on swollen areas</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendIndicator}>💓</span>
                <span className={styles.legendText}><strong>Pulsing:</strong> Affected organs animate to show stress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Organ Modal - Rendered at document body level to avoid layout issues */}
        {selectedOrgan && (
          <div 
            className={`${styles.organModalOverlay} ${styles.active}`}
            onClick={closeOrganModal}
          >
            <div className={styles.organModalContainer} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={closeOrganModal}>✕</button>
            
            {selectedOrgan && organData[selectedOrgan] && (
              <>
                <div className={styles.organModalHeader}>
                  <div className={styles.organIconLarge}>{organData[selectedOrgan].icon}</div>
                  <h2>{organData[selectedOrgan].name}</h2>
                </div>

                <div className={styles.organModalContent}>
                  <div className={styles.organComparisonRow}>
                    <div className={`${styles.organState} ${styles.normalState}`}>
                      <h4>✅ Normal State</h4>
                      <div className={styles.organVisualBox}>
                        <span style={{ fontSize: '3rem' }}>{organData[selectedOrgan].icon}</span>
                      </div>
                      <p>{organData[selectedOrgan].normalDesc}</p>
                    </div>

                    <div className={`${styles.organState} ${styles.affectedState}`}>
                      <h4>⚠️ With Preeclampsia</h4>
                      <div className={`${styles.organVisualBox} ${styles.affected}`}>
                        <span style={{ fontSize: '3rem' }}>{organData[selectedOrgan].icon}</span>
                      </div>
                      <p>{organData[selectedOrgan].affectedDesc}</p>
                    </div>
                  </div>

                  <div className={styles.organSymptomsSection}>
                    <h4>⚠️ Symptoms from this organ:</h4>
                    <ul className={styles.symptomsList}>
                      {organData[selectedOrgan].symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.organActionSection}>
                    <h4>📋 What to watch for:</h4>
                    <p>{organData[selectedOrgan].action}</p>
                  </div>

                  <button className={styles.microscopicBtn}>
                    <span>🔬</span>
                    <span>View at Cellular Level</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        )}

        {/* Simulation Info Panel */}
        <div className={styles.simulationInfoPanel}>
          <div className={styles.infoRow}>
            <div className={styles.infoBlock}>
              <h3>{statusBadge.text} - Week {week}</h3>
              <p>
                {severity < 25 
                  ? 'All organ systems functioning optimally with healthy blood pressure and proper blood flow to placenta and baby.'
                  : severity < 50
                  ? 'Early signs of preeclampsia may be present. Blood pressure slightly elevated. Close monitoring recommended.'
                  : severity < 75
                  ? 'Moderate preeclampsia affecting multiple organ systems. Medical intervention may be necessary.'
                  : 'Severe preeclampsia with critical organ involvement. Immediate medical attention required.'}
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h4>Key Changes at Current Level:</h4>
              <ul className={styles.keyChangesList}>
                <li>{severity < 25 ? '✅' : severity < 50 ? '⚠️' : '🔴'} Blood pressure {severity < 25 ? 'within normal range' : 'elevated'} ({vitals.systolic}/{vitals.diastolic} mmHg)</li>
                <li>{severity < 25 ? '✅' : '🔴'} Protein in urine: {vitals.protein}</li>
                <li>{severity < 50 ? '✅' : '⚠️'} Organ function {severity < 50 ? 'normal' : 'showing signs of stress'}</li>
                <li>{severity < 75 ? '✅' : '🔴'} Placental blood flow {severity < 75 ? 'optimal' : 'compromised'}</li>
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <h4>Recommended Actions:</h4>
              <div className={styles.actionRecommendation}>
                <span className={styles.actionIcon}>{severity < 25 ? '✅' : severity < 50 ? '⚠️' : '🚨'}</span>
                <p>
                  {severity < 25 
                    ? 'Continue regular prenatal checkups. Monitor blood pressure weekly at home if available.'
                    : severity < 50
                    ? 'Increase monitoring frequency. Contact your healthcare provider if symptoms worsen.'
                    : severity < 75
                    ? 'Schedule immediate appointment with your doctor. Rest and avoid stress.'
                    : 'Seek emergency medical care immediately. Do not wait for symptoms to improve.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Tip */}
        <div className={styles.eduTipFloating}>
          <div>
            <div className={styles.tipHeader}>
              <span className={styles.tipBulb}>💡</span>
              <h4>Did You Know?</h4>
            </div>
            <p className={styles.tipMessage}>{eduTips[currentTipIndex]}</p>
          </div>
          <button className={styles.nextTipBtn} onClick={showNextTip}>
            Next Tip →
          </button>
        </div>
      </div>
    </section>
    </div>
  );
};

export default PreeclampsiaEducation;