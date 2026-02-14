import React, { useEffect, useRef, useState } from 'react';
import { scannerData, ScannerPhase } from './constants';

interface ScannerDashboardProps {
  scannerPhase: ScannerPhase;
  onPhaseChange: (phase: ScannerPhase) => void;
  onOrganClick: (organ: string) => void;
}

interface OrganContent {
  title: string;
  description: string;
}

const organContent: Record<ScannerPhase, Record<string, OrganContent>> = {
  repro: {
    brain: {
      title: 'The Brain: Protected & Calm',
      description: 'Estrogen supports serotonin (mood) and glucose metabolism in the brain. The hypothalamus (your thermostat) is stable.'
    },
    heart: {
      title: 'The Heart: Flexible Vessels',
      description: 'High estrogen helps keep blood vessels flexible and maintains healthy cholesterol levels (High HDL, Low LDL).'
    },
    bone: {
      title: 'The Skeleton: Peak Density',
      description: 'Bone breakdown and rebuilding are balanced. Your skeleton is at its strongest.'
    },
    repro: {
      title: 'Reproductive: Active Cycles',
      description: 'Regular ovulation. The uterus lining builds and sheds monthly. Metabolism is generally directed towards subcutaneous fat (hips/thighs).'
    },
    skin: {
      title: 'The Skin: Collagen Rich',
      description: 'High estrogen levels stimulate fibroblasts to produce abundant collagen and elastin. Skin is thicker, holds moisture well, and \'bounces back\'.'
    }
  },
  peri: {
    brain: {
      title: 'The Brain: The "Thermostat" Glitch',
      description: 'Fluctuating estrogen confuses the hypothalamus, triggering Hot Flashes. You may also experience "Brain Fog" as neurons adjust to new fuel sources.'
    },
    heart: {
      title: 'The Heart: Palpitations',
      description: 'Erratic hormones can cause benign but scary heart palpitations. Blood vessels begin to lose some elasticity.'
    },
    bone: {
      title: 'The Skeleton: Silent Loss',
      description: 'Bone breakdown (resorption) begins to outpace building. This is the start of the "danger zone" for density loss.'
    },
    repro: {
      title: 'Reproductive: The Storm',
      description: 'Cycles shorten or skip. Heavy bleeding is common due to progesterone dropping faster than estrogen (dominance).'
    },
    skin: {
      title: 'The Skin: Sensitivity',
      description: 'As hormones fluctuate, you may notice drier skin, new sensitivity to products, or adult acne. Collagen production begins to slow down.'
    }
  },
  post: {
    brain: {
      title: 'The Brain: The New Normal',
      description: 'Hot flashes usually subside. The brain rewires to function on lower estrogen. Risk of Alzheimer\'s increases slightly without estrogen protection.'
    },
    heart: {
      title: 'The Heart: Metabolic Shift',
      description: 'Without estrogen, LDL (bad cholesterol) often rises. Plaque can build up faster. Monitoring BP and lipids is critical now.'
    },
    bone: {
      title: 'The Skeleton: Osteopenia/Osteoporosis',
      description: 'Rapid density loss occurs in the first 5 years post-menopause. Trabecular bone becomes thinner and more brittle.'
    },
    repro: {
      title: 'The "Menopause Belly"',
      description: 'Fat storage shifts from hips to the abdomen (Visceral Fat). This is not just cosmetic; visceral fat is inflammatory.'
    },
    skin: {
      title: 'The Skin: Structural Change',
      description: 'Collagen levels can drop by 30% in the first 5 years. Skin becomes thinner and more prone to bruising or tearing. Hydration is key now.'
    }
  }
};

const ScannerDashboard: React.FC<ScannerDashboardProps> = ({ 
  scannerPhase, 
  onPhaseChange,
  onOrganClick 
}) => {
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const particleLayerRef = useRef<SVGGElement>(null);
  const thermalOverlayRef = useRef<SVGRectElement>(null);
  const vizPanelRef = useRef<HTMLDivElement>(null);
  const currentScanner = scannerData[scannerPhase];

  // Initialize particles
  useEffect(() => {
    if (!particleLayerRef.current) return;

    const layer = particleLayerRef.current;
    layer.innerHTML = '';

    const particleCount = scannerPhase === 'repro' ? 40 : scannerPhase === 'peri' ? 20 : 8;
    const particleSpeed = scannerPhase === 'repro' ? '2s' : scannerPhase === 'peri' ? '1.5s' : '6s';

    for (let i = 0; i < particleCount; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', String(Math.random() * 3 + 1));
      circle.setAttribute('cx', String(Math.random() * 200 + 50));
      circle.setAttribute('cy', '600');
      circle.classList.add('hormone-particle');
      circle.style.animationDelay = Math.random() * 5 + 's';
      circle.style.animationDuration = particleSpeed;
      circle.setAttribute('fill', '#d81b60');
      circle.setAttribute('opacity', '0.6');
      layer.appendChild(circle);
    }
  }, [scannerPhase]);

  // Handle hot flash simulation for peri phase
  useEffect(() => {
    if (!thermalOverlayRef.current) return;

    const overlay = thermalOverlayRef.current;
    
    if (scannerPhase === 'peri') {
      overlay.style.opacity = '0.6';
      const animation = overlay.animate([
        { opacity: 0.2 },
        { opacity: 0.6 },
        { opacity: 0.2 }
      ], {
        duration: 3000,
        iterations: Infinity
      });
      
      return () => {
        animation.cancel();
      };
    } else {
      overlay.style.opacity = '0';
      overlay.getAnimations().forEach(anim => anim.cancel());
      return undefined;
    }
  }, [scannerPhase]);

  // Update viz panel class
  useEffect(() => {
    if (vizPanelRef.current) {
      vizPanelRef.current.className = `viz-panel state-${scannerPhase}`;
    }
  }, [scannerPhase]);

  const handleOrganClick = (organ: string) => {
    setSelectedOrgan(organ);
    onOrganClick(organ);
  };

  const resetDetailBox = () => {
    setSelectedOrgan(null);
  };

  const getOrganContent = (): OrganContent | null => {
    if (!selectedOrgan) {
      return null;
    }
    const phaseContent = organContent[scannerPhase];
    if (!phaseContent || !phaseContent[selectedOrgan]) {
      return null;
    }
    return phaseContent[selectedOrgan];
  };

  const organContentData = getOrganContent();

  return (
    <section className="section-block scanner-dashboard">
      <div className="timeline-bar">
        <div className="timeline-title">
          <h3>Whole-Body Digital Twin</h3>
          <p>Select a phase to see real-time particle simulations of hormone flow, brain fog, and vascular health.</p>
        </div>
        <div className="phase-toggles">
          <button 
            className={`toggle-btn ${scannerPhase === 'repro' ? 'active' : ''}`}
            onClick={() => {
              onPhaseChange('repro');
              resetDetailBox();
            }}
          >
            Reproductive
          </button>
          <button 
            className={`toggle-btn ${scannerPhase === 'peri' ? 'active' : ''}`}
            onClick={() => {
              onPhaseChange('peri');
              resetDetailBox();
            }}
          >
            Perimenopause
          </button>
          <button 
            className={`toggle-btn ${scannerPhase === 'post' ? 'active' : ''}`}
            onClick={() => {
              onPhaseChange('post');
              resetDetailBox();
            }}
          >
            Postmenopause
          </button>
        </div>
      </div>
    
      <div className="scanner-body">
        <div className="viz-panel" ref={vizPanelRef} id="vizPanel">
          <svg className="body-map-svg" viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="fogFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
              </filter>
              
              <radialGradient id="thermalGrad" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#ff5722" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#ff5722" stopOpacity="0"/>
              </radialGradient>
              
              <clipPath id="boneZoomClip">
                <circle cx="220" cy="450" r="40" />
              </clipPath>
            </defs>
    
            <g ref={particleLayerRef} id="particleLayer"></g>
    
            <path d="M 150 50 Q 180 50, 180 80 Q 180 110, 165 120 Q 200 130, 210 160 Q 220 250, 210 280 Q 225 320, 210 380 L 200 550 L 180 550 L 190 400 L 150 350 L 110 400 L 120 550 L 100 550 L 90 380 Q 75 320, 90 280 Q 80 250, 90 160 Q 100 130, 135 120 Q 120 110, 120 80 Q 120 50, 150 50" 
                  fill="#f5f5f5" stroke="#cfd8dc" strokeWidth="2"/>
    
            {/* Brain */}
            <g 
              id="organBrain" 
              className={`organ-group ${selectedOrgan === 'brain' ? 'active' : ''}`}
              onClick={() => handleOrganClick('brain')}
            >
              <g className="organ-visual">
                <path className="dendrite" d="M 150 80 L 140 70 M 150 80 L 160 70 M 150 80 L 150 60 M 150 80 L 130 80 M 150 80 L 170 80" 
                      stroke="#5e35b1" strokeWidth="1.5"/>
                <path className="dendrite" d="M 140 70 L 135 60 M 160 70 L 165 60" 
                      stroke="#5e35b1" strokeWidth="1.5"/>
                <path d="M 140 70 Q 150 60, 160 70 Q 170 80, 160 90 Q 150 100, 140 90 Q 130 80, 140 70" 
                      fill="none" stroke="#5e35b1" strokeWidth="2" opacity="0.6"/>
              </g>
              <circle className="organ-hitbox" cx="150" cy="80" r="30" fill="transparent" style={{ cursor: 'pointer' }} />
              
              {scannerPhase === 'peri' && (
                <>
                  <text x="180" y="70" className="sim-label label-peri">Thermostat Resetting</text>
                  <line x1="160" y1="80" x2="175" y2="75" className="label-line label-peri" stroke="#5e35b1" strokeWidth="1"/>
                </>
              )}
            </g>
    
            {/* Heart */}
            <g 
              id="organHeart" 
              className={`organ-group ${selectedOrgan === 'heart' ? 'active' : ''}`}
              onClick={() => handleOrganClick('heart')}
            >
              <g className="heart-beat organ-visual">
                <path d="M 150 160 Q 165 145, 175 160 Q 180 170, 150 190 Q 120 170, 125 160 Q 135 145, 150 160" 
                      fill="#ef9a9a" stroke="#e53935" strokeWidth="2" />
                <path className="artery-wall" d="M 150 160 L 150 180" strokeWidth="3" stroke="#d32f2f"/> 
                <path className="artery-wall" d="M 150 165 L 165 175" strokeWidth="2" stroke="#d32f2f"/>
                {scannerPhase === 'post' && (
                  <path className="plaque-buildup" d="M 150 160 L 150 180" stroke="#c62828" strokeWidth="2" strokeDasharray="2,2"/>
                )}
              </g>
              <circle className="organ-hitbox" cx="150" cy="170" r="30" fill="transparent" style={{ cursor: 'pointer' }} />
    
              {scannerPhase === 'post' && (
                <>
                  <text x="185" y="170" className="sim-label label-post">Arterial Stiffening</text>
                  <line x1="165" y1="170" x2="180" y2="170" className="label-line label-post" stroke="#e53935" strokeWidth="1"/>
                </>
              )}
            </g>
    
            {/* Reproductive */}
            <g 
              id="organRepro" 
              className={`organ-group ${selectedOrgan === 'repro' ? 'active' : ''}`}
              onClick={() => handleOrganClick('repro')}
            >
              {scannerPhase === 'post' && (
                <>
                  <circle className="fat-pulse" cx="150" cy="300" r="30" fill="#ec407a" opacity="0.3">
                    <animate attributeName="r" values="30;40;30" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle className="fat-pulse" cx="150" cy="300" r="40" fill="#ec407a" opacity="0.2" style={{ animationDelay: '0.5s' }}>
                    <animate attributeName="r" values="40;50;40" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </>
              )}
              
              <g className="organ-visual">
                <path d="M 135 300 Q 150 320, 165 300 L 165 290 Q 150 280, 135 290 Z" fill="#ec407a" />
                <circle cx="125" cy="290" r="5" fill="#f48fb1" />
                <circle cx="175" cy="290" r="5" fill="#f48fb1" />
              </g>
              <rect className="organ-hitbox" x="110" y="270" width="80" height="60" fill="transparent" style={{ cursor: 'pointer' }} />
    
              {scannerPhase === 'post' && (
                <>
                  <text x="10" y="300" className="sim-label label-post">Inflammatory Fat</text>
                  <line x1="100" y1="295" x2="120" y2="300" className="label-line label-post" stroke="#ec407a" strokeWidth="1"/>
                </>
              )}
            </g>
    
            {/* Bone */}
            <g 
              id="organBone" 
              className={`organ-group ${selectedOrgan === 'bone' ? 'active' : ''}`}
              onClick={() => handleOrganClick('bone')}
            >
              <rect x="190" y="400" width="12" height="120" rx="6" fill="#cfd8dc" className="organ-visual" />
              <rect className="organ-hitbox" x="180" y="400" width="30" height="120" fill="transparent" style={{ cursor: 'pointer' }} />
              
              {scannerPhase === 'post' && (
                <g className="magnifier-group">
                  <circle cx="220" cy="450" r="45" fill="#fff" stroke="#607d8b" strokeWidth="3" />
                  <g clipPath="url(#boneZoomClip)">
                    <path className="bone-lattice" d="M 180 420 l 80 60 M 180 430 l 80 60 M 180 440 l 80 60 M 260 420 l -80 60 M 260 430 l -80 60" 
                          stroke="#90a4ae" strokeWidth="1.5" opacity="0.6"/>
                  </g>
                  <text x="260" y="440" className="sim-label label-post" style={{ opacity: 1, fontSize: '10px' }}>Micro-structure</text>
                </g>
              )}
            </g>

            {/* Skin */}
            <g 
              id="organSkin" 
              className={`organ-group ${selectedOrgan === 'skin' ? 'active' : ''}`}
              onClick={() => handleOrganClick('skin')}
            >
              <rect className="organ-hitbox" x="80" y="130" width="40" height="80" transform="rotate(-10 100 170)" fill="transparent" style={{ cursor: 'pointer' }} />
              
              <g className="organ-visual">
                <circle cx="80" cy="160" r="35" fill="#fff" stroke="#ffca28" strokeWidth="2" />
                
                <g clipPath="circle(35 at 80 160)">
                  <path className="collagen-strand" d="M 50 150 Q 65 140, 80 150 T 110 150" 
                        stroke="#ffca28" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path className="collagen-strand" d="M 50 160 Q 65 150, 80 160 T 110 160" 
                        stroke="#ffca28" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path className="collagen-strand" d="M 50 170 Q 65 160, 80 170 T 110 170" 
                        stroke="#ffca28" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  
                  <path className="collagen-strand" d="M 65 140 L 65 180" 
                        stroke="#ffca28" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transitionDelay: '0.2s' }} />
                  <path className="collagen-strand" d="M 95 140 L 95 180" 
                        stroke="#ffca28" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transitionDelay: '0.4s' }} />
                </g>
              </g>

              {scannerPhase === 'post' && (
                <>
                  <text x="20" y="120" className="sim-label label-post">Collagen Loss</text>
                  <line x1="50" y1="125" x2="70" y2="140" className="label-line label-post" stroke="#ffca28" strokeWidth="1"/>
                </>
              )}
            </g>
            
            <rect 
              ref={thermalOverlayRef}
              id="thermalOverlay" 
              x="0" 
              y="0" 
              width="300" 
              height="600" 
              fill="url(#thermalGrad)" 
              style={{ mixBlendMode: 'multiply', opacity: 0, transition: 'opacity 1s', pointerEvents: 'none' }} 
            />
    
          </svg>
          
          <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '0.75rem', color: '#999', background: 'rgba(255,255,255,0.8)', padding: '5px 10px', borderRadius: '15px' }}>
            Tap any organ to scan
          </div>
        </div>
    
        <div className="info-panel">
          <div>
            <h3 id="panelTitle" style={{ margin: 0, fontSize: '1.4rem', color: '#000000' }}>System Status</h3>
            <span id="phaseBadge" style={{ background: '#e3f2fd', color: '#1565c0', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {currentScanner.label}
            </span>
          </div>
    
          <div className="status-card">
            <div className="metric-row">
              <strong>Estrogen Baseline</strong>
              <div className="metric-bar-bg">
                <div id="barEst" className="metric-bar-fill" style={{ width: currentScanner.est }}></div>
              </div>
            </div>
            <div className="metric-row">
              <strong>Progesterone</strong>
              <div className="metric-bar-bg">
                <div id="barProg" className="metric-bar-fill" style={{ width: currentScanner.prog }}></div>
              </div>
            </div>
            <div className="metric-row">
              <strong>Bone Density</strong>
              <div className="metric-bar-bg">
                <div 
                  id="barBone" 
                  className="metric-bar-fill" 
                  style={{ 
                    width: currentScanner.bone, 
                    background: scannerPhase === 'post' ? '#e53935' : '#81c784' 
                  }}
                ></div>
              </div>
            </div>
          </div>
    
          <div id="detailBox" className="deep-dive-box" style={{
            background: organContentData ? '#fff' : '#e3f2fd',
            borderStyle: organContentData ? 'solid' : 'dashed'
          }}>
            {organContentData ? (
              <>
                <strong>{organContentData.title}</strong>
                <p style={{ marginTop: '0.5rem' }}>{organContentData.description}</p>
              </>
            ) : (
              <>
                <strong>👆 Select a system on the body map</strong>
                <p>{currentScanner.desc}</p>
              </>
            )}
          </div>
    
        </div>
      </div>
    </section>
  );
};

export default ScannerDashboard;
