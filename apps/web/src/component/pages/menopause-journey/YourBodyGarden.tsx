import React, { useState, useEffect, useRef } from 'react';

const YourBodyGarden: React.FC = () => {
  const [activePlant, setActivePlant] = useState<string | null>(null);
  const gardenBackdropRef = useRef<HTMLDivElement>(null);
  const particleGardenRef = useRef<HTMLCanvasElement>(null);

  // Initialize particle garden canvas
  useEffect(() => {
    const canvas = particleGardenRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const handlePlantClick = (plant: string, e: React.MouseEvent) => {
    // Don't open panel if clicking on nutrient drops
    if ((e.target as HTMLElement).closest('.nutrient-drop')) {
      return;
    }

    if (activePlant === plant) {
      // Close if clicking the same plant
      setActivePlant(null);
      if (gardenBackdropRef.current) {
        gardenBackdropRef.current.classList.remove('active');
      }
    } else {
      // Open new plant
      setActivePlant(plant);
      if (gardenBackdropRef.current) {
        gardenBackdropRef.current.classList.add('active');
      }
    }
  };

  const closePlantInfo = () => {
    setActivePlant(null);
    if (gardenBackdropRef.current) {
      gardenBackdropRef.current.classList.remove('active');
    }
  };

  return (
    <section className="body-garden-section">
      {/* Garden Introduction */}
      <div className="garden-header">
        <div className="garden-title-wrapper">
          <h2 className="garden-title">
            <span className="title-icon">🌱</span>
            Your Body Garden
            <span className="title-flourish">Nurture what matters most</span>
          </h2>
          <p className="garden-subtitle">
            Three vital systems that thrive with early care. Tap each plant to discover how to help it flourish.
          </p>
        </div>
        
        {/* Garden Health Meter */}
        <div className="health-meter">
          <div className="meter-label">Garden Vitality</div>
          <div className="meter-bar">
            <div className="meter-fill" id="gardenHealth" style={{ width: '75%' }}>
              <span className="meter-sparkle">✨</span>
            </div>
          </div>
          <div className="meter-hint">Explore each plant to increase vitality</div>
        </div>
      </div>

      {/* The Interactive 3D Garden */}
      <div className="garden-canvas" id="gardenCanvas">
        
        {/* Ambient Background */}
        <div className="garden-atmosphere">
          <canvas ref={particleGardenRef} id="particleGarden"></canvas>
          <div className="garden-gradient"></div>
          <div className="sun-cycle" id="sunCycle"></div>
        </div>

        {/* Soil Base */}
        <div className="garden-soil">
          <svg viewBox="0 0 1200 100" className="soil-texture">
            <path d="M0,30 Q300,50 600,30 T1200,30 L1200,100 L0,100 Z" 
                  fill="url(#soilGradient)"/>
            <defs>
              <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8d6e63" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#5d4037" stopOpacity="0.95"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Plant 1: Heart Tree */}
        <div 
          className={`garden-plant plant-heart ${activePlant === 'heart' ? 'active' : ''}`}
          data-plant="heart"
          onClick={(e) => handlePlantClick('heart', e)}
        >
          
          {/* Plant Container */}
          <div className="plant-pot">
            <div className="pot-shine"></div>
            <div className="pot-label">❤️ Heart & Metabolism</div>
          </div>

          {/* Interactive Plant Visual */}
          <div className="plant-growth">
            <svg viewBox="0 0 200 300" className="plant-svg">
              {/* Stem */}
              <path className="plant-stem" d="M100,300 Q95,200 100,100" 
                    stroke="#4caf50" strokeWidth="8" fill="none" strokeLinecap="round"/>
              
              {/* Branches */}
              <path className="plant-branch branch-1" d="M100,200 Q70,180 50,160" 
                    stroke="#66bb6a" strokeWidth="4" fill="none"/>
              <path className="plant-branch branch-2" d="M100,180 Q130,160 150,140" 
                    stroke="#66bb6a" strokeWidth="4" fill="none"/>
              <path className="plant-branch branch-3" d="M100,150 Q80,130 60,110" 
                    stroke="#66bb6a" strokeWidth="4" fill="none"/>
              
              {/* Leaves */}
              <g className="leaf-cluster cluster-1" data-metric="cholesterol">
                <ellipse cx="50" cy="160" rx="15" ry="25" fill="#81c784" opacity="0.9">
                  <animate attributeName="ry" values="25;28;25" dur="3s" repeatCount="indefinite"/>
                </ellipse>
                <text x="50" y="165" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">LDL</text>
              </g>
              
              <g className="leaf-cluster cluster-2" data-metric="fat">
                <ellipse cx="150" cy="140" rx="15" ry="25" fill="#66bb6a" opacity="0.85">
                  <animate attributeName="ry" values="25;28;25" dur="3.5s" repeatCount="indefinite"/>
                </ellipse>
                <text x="150" y="145" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Fat</text>
              </g>
              
              <g className="leaf-cluster cluster-3" data-metric="bp">
                <ellipse cx="60" cy="110" rx="15" ry="25" fill="#4caf50" opacity="0.9">
                  <animate attributeName="ry" values="25;28;25" dur="4s" repeatCount="indefinite"/>
                </ellipse>
                <text x="60" y="115" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">BP</text>
              </g>

              {/* Flower */}
              <g className="plant-flower" transform="translate(100, 80)">
                <circle cx="0" cy="0" r="5" fill="#ffd54f">
                  <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
                </circle>
                <g className="petals">
                  <ellipse cx="0" cy="-12" rx="8" ry="12" fill="#ef5350" opacity="0.9" transform="rotate(0)"/>
                  <ellipse cx="0" cy="-12" rx="8" ry="12" fill="#ec407a" opacity="0.9" transform="rotate(72)"/>
                  <ellipse cx="0" cy="-12" rx="8" ry="12" fill="#e91e63" opacity="0.9" transform="rotate(144)"/>
                  <ellipse cx="0" cy="-12" rx="8" ry="12" fill="#d81b60" opacity="0.9" transform="rotate(216)"/>
                  <ellipse cx="0" cy="-12" rx="8" ry="12" fill="#c2185b" opacity="0.9" transform="rotate(288)"/>
                </g>
                <animateTransform attributeName="transform" 
                                type="rotate" 
                                from="0 100 80" 
                                to="360 100 80" 
                                dur="20s" 
                                repeatCount="indefinite"/>
              </g>
            </svg>

            {/* Nutrient Droplets */}
            <div className="nutrient-system">
              <div className="nutrient-drop drop-1" data-nutrient="exercise">
                <span className="drop-icon">🏃‍♀️</span>
                <span className="drop-tooltip">Cardio Exercise</span>
              </div>
              <div className="nutrient-drop drop-2" data-nutrient="diet">
                <span className="drop-icon">🥗</span>
                <span className="drop-tooltip">Heart-Healthy Diet</span>
              </div>
              <div className="nutrient-drop drop-3" data-nutrient="monitor">
                <span className="drop-icon">📊</span>
                <span className="drop-tooltip">Regular Monitoring</span>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="plant-info-panel">
            <div className="info-header">
              <h3>❤️ Heart & Metabolism Garden</h3>
              <button className="close-info" onClick={closePlantInfo}>✕</button>
            </div>
            <div className="info-content">
              <div className="info-badges">
                <span className="info-badge badge-warning">Cholesterol shift</span>
                <span className="info-badge badge-alert">Visceral fat</span>
                <span className="info-badge badge-caution">Blood pressure</span>
              </div>
              <div className="info-story">
                <div className="story-item">
                  <span className="story-icon">📈</span>
                  <p>LDL and triglycerides often rise; HDL may fall</p>
                </div>
                <div className="story-item">
                  <span className="story-icon">🔄</span>
                  <p>Weight may move from hips to tummy (more "inside" fat)</p>
                </div>
                <div className="story-item">
                  <span className="story-icon">🌡️</span>
                  <p>Hot flashes + poor sleep can worsen blood pressure and sugar control</p>
                </div>
              </div>
              <div className="care-prescription">
                <div className="prescription-title">💚 How to Nourish This Garden</div>
                <div className="prescription-actions">
                  <button className="action-btn">🏃‍♀️ 30min cardio daily</button>
                  <button className="action-btn">🥗 Mediterranean diet</button>
                  <button className="action-btn">📊 Track BP & lipids</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plant 2: Bone & Muscle Bamboo */}
        <div 
          className={`garden-plant plant-bone ${activePlant === 'bone' ? 'active' : ''}`}
          data-plant="bone"
          onClick={(e) => handlePlantClick('bone', e)}
        >
          
          <div className="plant-pot">
            <div className="pot-shine"></div>
            <div className="pot-label">🦴 Bone & Muscle</div>
          </div>

          <div className="plant-growth">
            <svg viewBox="0 0 200 300" className="plant-svg">
              {/* Bamboo Stalks */}
              <g className="bamboo-grove">
                <rect className="bamboo-stalk stalk-1" x="70" y="100" width="15" height="200" 
                      rx="7" fill="url(#bambooGrad)"/>
                <line x1="70" y1="180" x2="85" y2="180" stroke="#81c784" strokeWidth="2"/>
                <line x1="70" y1="240" x2="85" y2="240" stroke="#81c784" strokeWidth="2"/>
                
                <rect className="bamboo-stalk stalk-2" x="95" y="80" width="15" height="220" 
                      rx="7" fill="url(#bambooGrad)"/>
                <line x1="95" y1="160" x2="110" y2="160" stroke="#81c784" strokeWidth="2"/>
                <line x1="95" y1="220" x2="110" y2="220" stroke="#81c784" strokeWidth="2"/>
                
                <rect className="bamboo-stalk stalk-3" x="120" y="110" width="15" height="190" 
                      rx="7" fill="url(#bambooGrad)"/>
                <line x1="120" y1="190" x2="135" y2="190" stroke="#81c784" strokeWidth="2"/>
                <line x1="120" y1="250" x2="135" y2="250" stroke="#81c784" strokeWidth="2"/>
              </g>

              {/* Leaves */}
              <g className="bamboo-leaves">
                <path d="M85,150 Q90,140 95,150 Q90,160 85,150" fill="#4caf50" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" 
                                  values="0 90 150; 5 90 150; 0 90 150" 
                                  dur="2s" repeatCount="indefinite"/>
                </path>
                <path d="M110,130 Q115,120 120,130 Q115,140 110,130" fill="#66bb6a" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" 
                                  values="0 115 130; -5 115 130; 0 115 130" 
                                  dur="2.5s" repeatCount="indefinite"/>
                </path>
                <path d="M135,160 Q140,150 145,160 Q140,170 135,160" fill="#81c784" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" 
                                  values="0 140 160; 5 140 160; 0 140 160" 
                                  dur="3s" repeatCount="indefinite"/>
                </path>
              </g>

              <defs>
                <linearGradient id="bambooGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a5d6a7"/>
                  <stop offset="100%" stopColor="#66bb6a"/>
                </linearGradient>
              </defs>
            </svg>

            <div className="nutrient-system">
              <div className="nutrient-drop drop-1" data-nutrient="strength">
                <span className="drop-icon">🏋️‍♀️</span>
                <span className="drop-tooltip">Strength Training</span>
              </div>
              <div className="nutrient-drop drop-2" data-nutrient="calcium">
                <span className="drop-icon">🥛</span>
                <span className="drop-tooltip">Calcium + Vit D</span>
              </div>
              <div className="nutrient-drop drop-3" data-nutrient="protein">
                <span className="drop-icon">🍗</span>
                <span className="drop-tooltip">Protein Intake</span>
              </div>
            </div>
          </div>

          <div className="plant-info-panel">
            <div className="info-header">
              <h3>🦴 Bone & Muscle Fortress</h3>
              <button className="close-info" onClick={closePlantInfo}>✕</button>
            </div>
            <div className="info-content">
              <div className="info-badges">
                <span className="info-badge badge-critical">Rapid bone loss</span>
                <span className="info-badge badge-warning">Sarcopenia</span>
                <span className="info-badge badge-power">LIFTMOR training</span>
              </div>
              <div className="info-story">
                <div className="story-item">
                  <span className="story-icon">📉</span>
                  <p>Up to 10% bone loss in the 3 years around the final period</p>
                </div>
                <div className="story-item">
                  <span className="story-icon">💪</span>
                  <p>Muscle shrinks faster, making it easier to gain fat and harder to stay strong</p>
                </div>
                <div className="story-item">
                  <span className="story-icon">🏋️‍♀️</span>
                  <p>Heavy but safe strength training can rebuild bone and muscle</p>
                </div>
              </div>
              <div className="care-prescription">
                <div className="prescription-title">💚 How to Fortify This Garden</div>
                <div className="prescription-actions">
                  <button className="action-btn">🏋️‍♀️ LIFTMOR protocol</button>
                  <button className="action-btn">🥛 1200mg calcium daily</button>
                  <button className="action-btn">🍗 30g protein/meal</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plant 3: Gut Garden */}
        <div 
          className={`garden-plant plant-gut ${activePlant === 'gut' ? 'active' : ''}`}
          data-plant="gut"
          onClick={(e) => handlePlantClick('gut', e)}
        >
          
          <div className="plant-pot">
            <div className="pot-shine"></div>
            <div className="pot-label">🦠 Gut Microbiome</div>
          </div>

          <div className="plant-growth">
            <svg viewBox="0 0 200 300" className="plant-svg">
              {/* Root System */}
              <g className="root-system" opacity="0.6">
                <path className="root root-1" d="M100,250 Q80,270 60,285" 
                      stroke="#8d6e63" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path className="root root-2" d="M100,250 Q120,270 140,285" 
                      stroke="#8d6e63" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path className="root root-3" d="M100,260 Q90,280 75,295" 
                      stroke="#a1887f" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path className="root root-4" d="M100,260 Q110,280 125,295" 
                      stroke="#a1887f" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </g>

              {/* Main Plant */}
              <circle cx="100" cy="240" r="20" fill="#7e57c2" opacity="0.3">
                <animate attributeName="r" values="20;25;20" dur="4s" repeatCount="indefinite"/>
              </circle>

              <path className="plant-stem" d="M100,240 Q98,170 100,100" 
                    stroke="#9575cd" strokeWidth="6" fill="none"/>

              {/* Flower Heads */}
              <g className="microbiome-flowers">
                <g transform="translate(70, 120)">
                  <circle cx="0" cy="0" r="12" fill="#ce93d8"/>
                  <circle cx="0" cy="0" r="5" fill="#f9a825"/>
                  <text x="0" y="3" textAnchor="middle" fontSize="8" fill="#fff">🦠</text>
                </g>
                
                <g transform="translate(100, 100)">
                  <circle cx="0" cy="0" r="15" fill="#ba68c8"/>
                  <circle cx="0" cy="0" r="6" fill="#fdd835"/>
                  <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#fff">🦠</text>
                </g>
                
                <g transform="translate(130, 130)">
                  <circle cx="0" cy="0" r="11" fill="#ab47bc"/>
                  <circle cx="0" cy="0" r="4" fill="#ffeb3b"/>
                  <text x="0" y="3" textAnchor="middle" fontSize="7" fill="#fff">🦠</text>
                </g>
              </g>

              {/* Diversity Particles */}
              <g className="diversity-particles">
                <circle className="particle p1" cx="60" cy="180" r="2" fill="#7e57c2" opacity="0.7">
                  <animate attributeName="cy" values="180;160;180" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle className="particle p2" cx="140" cy="190" r="2" fill="#9575cd" opacity="0.7">
                  <animate attributeName="cy" values="190;170;190" dur="3.5s" repeatCount="indefinite"/>
                </circle>
                <circle className="particle p3" cx="100" cy="200" r="2" fill="#ba68c8" opacity="0.7">
                  <animate attributeName="cy" values="200;180;200" dur="4s" repeatCount="indefinite"/>
                </circle>
              </g>
            </svg>

            <div className="nutrient-system">
              <div className="nutrient-drop drop-1" data-nutrient="fiber">
                <span className="drop-icon">🌾</span>
                <span className="drop-tooltip">High Fiber</span>
              </div>
              <div className="nutrient-drop drop-2" data-nutrient="fermented">
                <span className="drop-icon">🥬</span>
                <span className="drop-tooltip">Fermented Foods</span>
              </div>
              <div className="nutrient-drop drop-3" data-nutrient="probiotic">
                <span className="drop-icon">💊</span>
                <span className="drop-tooltip">Targeted Probiotics</span>
              </div>
            </div>
          </div>

          <div className="plant-info-panel">
            <div className="info-header">
              <h3>🦠 Gut Garden & Estrobolome</h3>
              <button className="close-info" onClick={closePlantInfo}>✕</button>
            </div>
            <div className="info-content">
              <div className="info-badges">
                <span className="info-badge badge-bio">Gut–hormone loop</span>
                <span className="info-badge badge-food">Fiber & fermented</span>
                <span className="info-badge badge-science">Estrobolome</span>
              </div>
              <div className="info-story">
                <div className="story-item">
                  <span className="story-icon">🔄</span>
                  <p>Your gut bacteria help recycle and balance estrogen</p>
                </div>
                <div className="story-item">
                  <span className="story-icon">📉</span>
                  <p>Diversity often falls after menopause, nudging metabolism in the wrong direction</p>
                </div>
                <div className="story-item">
                  <span className="story-icon">🌱</span>
                  <p>Fiber + targeted probiotics may support VMS, mood and weight management</p>
                </div>
              </div>
              <div className="care-prescription">
                <div className="prescription-title">💚 How to Cultivate This Garden</div>
                <div className="prescription-actions">
                  <button className="action-btn">🌾 30g fiber daily</button>
                  <button className="action-btn">🥬 Kimchi/kefir</button>
                  <button className="action-btn">💊 Multi-strain probiotic</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Garden Weather Station */}
        <div className="weather-station">
          <div className="weather-icon" id="weatherIcon">🌤️</div>
          <div className="weather-label">Your Climate</div>
          <div className="weather-status" id="weatherStatus">Tap to check season</div>
        </div>

      </div>

      {/* Garden Care Dashboard */}
      <div className="garden-dashboard">
        <div className="dashboard-header">
          <h3>🌿 Your Personalized Garden Plan</h3>
          <p>Track which systems need extra care this season</p>
        </div>

        <div className="care-tracker">
          <div className="care-item">
            <div className="care-icon">❤️</div>
            <div className="care-progress">
              <div className="progress-label">Heart & Metabolism</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%', background: '#ef5350' }}></div>
              </div>
              <div className="progress-hint">Needs daily watering</div>
            </div>
          </div>

          <div className="care-item">
            <div className="care-icon">🦴</div>
            <div className="care-progress">
              <div className="progress-label">Bone & Muscle</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%', background: '#66bb6a' }}></div>
              </div>
              <div className="progress-hint">Start strength training</div>
            </div>
          </div>

          <div className="care-item">
            <div className="care-icon">🦠</div>
            <div className="care-progress">
              <div className="progress-label">Gut Microbiome</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '70%', background: '#ab47bc' }}></div>
              </div>
              <div className="progress-hint">Add fermented foods</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourBodyGarden;

