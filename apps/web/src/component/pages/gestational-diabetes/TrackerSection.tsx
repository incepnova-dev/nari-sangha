import React from 'react';
import '../../../styles/pages/gestational-diabetes.css';

interface TrackerSectionProps {
  setSimulationScenario?: (scenario: string) => void;
}

const TrackerSection: React.FC<TrackerSectionProps> = ({ 
  setSimulationScenario = () => {} 
}) => {
  return (
    <section id="tracker" className="tracker-section">
   <div className="section-header">
      <div className="header-badge-prominent">
        <span className="badge-pulse"></span>
        <span className="badge-text">Live Body Simulation</span>
      </div>
      <h2 className="section-title-prominent">
        Real-Time <span className="title-highlight">Glucose & Body Dynamics</span>
      </h2>
      <p className="section-subtitle-prominent">
        <span className="subtitle-sparkle">💡</span> Experience a live visualization of your body’s internal processes — <strong>watch how glucose, insulin, and pregnancy hormones</strong> interact in real-time to shape your health. <span className="subtitle-sparkle">💡</span>
      </p>
    </div>


      <div className="simulation-controls">
        <button className="sim-btn active" onClick={() => setSimulationScenario('fasting')} id="btn-fasting">
          <span className="sim-icon">🌅</span>
          <span className="sim-label">Fasting State</span>
        </button>
        <button className="sim-btn" onClick={() => setSimulationScenario('after-meal')} id="btn-after-meal">
          <span className="sim-icon">🍽️</span>
          <span className="sim-label">After Meal</span>
        </button>
        <button className="sim-btn" onClick={() => setSimulationScenario('exercise')} id="btn-exercise">
          <span className="sim-icon">💪</span>
          <span className="sim-label">During Exercise</span>
        </button>
        <button className="sim-btn" onClick={() => setSimulationScenario('insulin')} id="btn-insulin">
          <span className="sim-icon">💉</span>
          <span className="sim-label">After Insulin</span>
        </button>
      </div>

      <div className="simulation-dashboard">
        <div className="body-simulation-container">
          <div className="sim-body-visual">
            <svg id="bodySimulationSvg" viewBox="0 0 320 600" style={{ width: '100%', maxWidth: '400px', height: 'auto' }}>
              <ellipse cx="160" cy="62" rx="42" ry="48" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2"/>
              <ellipse cx="160" cy="38" rx="44" ry="30" fill="#5c3d2e"/>
              <rect x="116" y="30" width="12" height="55" rx="6" fill="#5c3d2e"/>
              <rect x="192" y="30" width="12" height="55" rx="6" fill="#5c3d2e"/>
              <circle cx="143" cy="65" r="4" fill="#3a2520"/>
              <circle cx="177" cy="65" r="4" fill="#3a2520"/>
              
              <path d="M148 78 Q160 86 172 78" fill="none" stroke="#3a2520" strokeWidth="2" strokeLinecap="round"/>
              
              <rect x="148" y="106" width="24" height="28" rx="4" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5"/>
              <path d="M100 134 Q100 128 130 128 L190 128 Q220 128 220 134 L220 280 Q220 285 215 285 L105 285 Q100 285 100 280 Z" 
                    fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2"/>
              <ellipse cx="160" cy="300" rx="65" ry="75" fill="#e8a0b8" stroke="#d47a9a" strokeWidth="2"/>
              <path d="M148 128 L148 148 Q160 156 172 148 L172 128" fill="none" stroke="#d47a9a" strokeWidth="1.5"/>
              <path d="M100 140 Q70 170 60 240 Q55 270 65 290 L82 290 Q85 270 90 240 Q100 175 118 145" 
                    fill="#f5c6a0" stroke="#e0a882" strokeWidth="2"/>
              <path d="M220 140 Q250 170 260 240 Q265 270 255 290 L238 290 Q235 270 230 240 Q220 175 202 145" 
                    fill="#f5c6a0" stroke="#e0a882" strokeWidth="2"/>
              <ellipse cx="74" cy="298" rx="14" ry="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5"/>
              <ellipse cx="246" cy="298" rx="14" ry="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="1.5"/>
              <path d="M95 372 L88 480 Q88 490 100 490 L220 490 Q232 490 232 480 L225 372" 
                    fill="#c077a8" stroke="#a85d8a" strokeWidth="2"/>
              <rect x="118" y="488" width="34" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2"/>
              <rect x="168" y="488" width="34" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" strokeWidth="2"/>
              <ellipse cx="135" cy="586" rx="22" ry="10" fill="#8b5e83"/>
              <ellipse cx="185" cy="586" rx="22" ry="10" fill="#8b5e83"/>

              <circle id="sim-pancreas-glow" cx="160" cy="240" r="35" fill="rgba(255, 235, 59, 0.3)" opacity="0" className="sim-organ-glow"/>
              <circle id="sim-liver-glow" cx="195" cy="220" r="30" fill="rgba(255, 152, 0, 0.3)" opacity="0" className="sim-organ-glow"/>
              <ellipse id="sim-placenta-glow" cx="160" cy="310" rx="70" ry="80" fill="rgba(236, 64, 122, 0.3)" opacity="0" className="sim-organ-glow"/>
            </svg>

            <div className="particle-system" id="particleSystem">
              <div className="sim-particle glucose-particle" style={{ top: '20%', left: '30%' }}></div>
              <div className="sim-particle glucose-particle" style={{ top: '40%', left: '50%' }}></div>
              <div className="sim-particle glucose-particle" style={{ top: '60%', left: '35%' }}></div>
              <div className="sim-particle glucose-particle" style={{ top: '80%', left: '45%' }}></div>
              <div className="sim-particle insulin-particle" style={{ top: '25%', left: '60%' }}></div>
              <div className="sim-particle insulin-particle" style={{ top: '55%', left: '65%' }}></div>
              <div className="sim-particle insulin-particle" style={{ top: '75%', left: '55%' }}></div>
            </div>

            <div className="organ-labels">
              <div className="organ-label pancreas-label" style={{ top: '40%', left: '50%' }}>
                <div className="label-dot"></div>
                <div className="label-text">
                  <strong>Pancreas</strong>
                  <span className="label-status" id="pancreasStatus">Working Hard</span>
                </div>
              </div>
              <div className="organ-label liver-label" style={{ top: '35%', left: '55%' }}>
                <div className="label-dot"></div>
                <div className="label-text">
                  <strong>Liver</strong>
                  <span className="label-status" id="liverStatus">Storing Glucose</span>
                </div>
              </div>
              <div className="organ-label placenta-label" style={{ top: '55%', left: '48%' }}>
                <div className="label-dot"></div>
                <div className="label-text">
                  <strong>Placenta</strong>
                  <span className="label-status" id="placentaStatus">Producing Hormones</span>
                </div>
              </div>
            </div>
          </div>

          <div className="scenario-description">
            <h4 id="scenarioTitle">Fasting State</h4>
            <p id="scenarioDesc">Your body is using stored glucose for energy. Insulin levels are low, and the liver releases glucose to maintain blood sugar levels.</p>
          </div>
        </div>

        <div className="metrics-dashboard">
          <div className="metric-card glucose-graph-card">
            <div className="card-header">
              <h3>Blood Glucose Level</h3>
              <div className="live-indicator">
                <span className="live-dot"></span>
                <span>LIVE</span>
              </div>
            </div>
            <div className="glucose-display">
              <div className="glucose-reading">
                <span className="reading-value" id="currentGlucose">95</span>
                <span className="reading-unit">mg/dL</span>
              </div>
              <div className="glucose-status" id="glucoseStatus">Target Range</div>
            </div>
            <canvas id="glucoseTrendChart" width="300" height="150"></canvas>
          </div>

          <div className="metric-card hormones-card">
            <div className="card-header">
              <h3>Pregnancy Hormones</h3>
              <span className="info-icon" title="Hormones affecting insulin resistance">ℹ️</span>
            </div>
            
            <div className="hormone-meter">
              <div className="hormone-item">
                <div className="hormone-label">
                  <span className="hormone-icon">🔴</span>
                  <span className="hormone-name">Human Placental Lactogen (hPL)</span>
                </div>
                <div className="hormone-bar-container">
                  <div className="hormone-bar" id="hplBar" style={{ width: '75%', background: 'linear-gradient(90deg, #ff6b9d, #c44569)' }}></div>
                  <span className="hormone-value" id="hplValue">75%</span>
                </div>
              </div>

              <div className="hormone-item">
                <div className="hormone-label">
                  <span className="hormone-icon">🟡</span>
                  <span className="hormone-name">Cortisol</span>
                </div>
                <div className="hormone-bar-container">
                  <div className="hormone-bar" id="cortisolBar" style={{ width: '60%', background: 'linear-gradient(90deg, #ffd93d, #f5a623)' }}></div>
                  <span className="hormone-value" id="cortisolValue">60%</span>
                </div>
              </div>

              <div className="hormone-item">
                <div className="hormone-label">
                  <span className="hormone-icon">🟠</span>
                  <span className="hormone-name">Progesterone</span>
                </div>
                <div className="hormone-bar-container">
                  <div className="hormone-bar" id="progesteroneBar" style={{ width: '80%', background: 'linear-gradient(90deg, #fa709a, #fee140)' }}></div>
                  <span className="hormone-value" id="progesteroneValue">80%</span>
                </div>
              </div>

              <div className="hormone-item">
                <div className="hormone-label">
                  <span className="hormone-icon">🔵</span>
                  <span className="hormone-name">Insulin Production</span>
                </div>
                <div className="hormone-bar-container">
                  <div className="hormone-bar" id="insulinBar" style={{ width: '45%', background: 'linear-gradient(90deg, #4facfe, #00f2fe)' }}></div>
                  <span className="hormone-value" id="insulinValue">45%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="metric-card resistance-card">
            <div className="card-header">
              <h3>Insulin Resistance</h3>
            </div>
            <div className="resistance-gauge">
              <canvas id="resistanceGauge" width="200" height="150"></canvas>
              <div className="gauge-value">
                <span id="resistancePercent">65</span>%
              </div>
              <div className="gauge-label" id="resistanceLabel">Moderate</div>
            </div>
          </div>
        </div>

        <div className="parameters-panel">
          <div className="quick-stats">
            <div className="stat-box">
              <div className="stat-icon">💧</div>
              <div className="stat-content">
                <div className="stat-label">Glucose in Bloodstream</div>
                <div className="stat-value" id="bloodGlucose">95 mg/dL</div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon">🏭</div>
              <div className="stat-content">
                <div className="stat-label">Pancreas Activity</div>
                <div className="stat-value" id="pancreasActivity">High</div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <div className="stat-label">Energy Production</div>
                <div className="stat-value" id="energyProduction">Normal</div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon">🍼</div>
              <div className="stat-content">
                <div className="stat-label">Baby's Glucose</div>
                <div className="stat-value" id="babyGlucose">Optimal</div>
              </div>
            </div>
          </div>

          <div className="systems-status">
            <h4>Body Systems Status</h4>
            
            <div className="system-item">
              <div className="system-header">
                <span className="system-name">🫀 Cardiovascular</span>
                <span className="system-status status-good">Good</span>
              </div>
              <div className="system-bar">
                <div className="system-fill" style={{ width: '85%', background: '#10ac84' }}></div>
              </div>
            </div>

            <div className="system-item">
              <div className="system-header">
                <span className="system-name">🧠 Nervous System</span>
                <span className="system-status status-good">Good</span>
              </div>
              <div className="system-bar">
                <div className="system-fill" style={{ width: '90%', background: '#10ac84' }}></div>
              </div>
            </div>

            <div className="system-item">
              <div className="system-header">
                <span className="system-name">🔄 Metabolic</span>
                <span className="system-status status-warning" id="metabolicStatus">Compensating</span>
              </div>
              <div className="system-bar">
                <div className="system-fill" id="metabolicBar" style={{ width: '65%', background: '#f39c12' }}></div>
              </div>
            </div>

            <div className="system-item">
              <div className="system-header">
                <span className="system-name">👶 Fetal Development</span>
                <span className="system-status status-good">Healthy</span>
              </div>
              <div className="system-bar">
                <div className="system-fill" style={{ width: '95%', background: '#10ac84' }}></div>
              </div>
            </div>
          </div>

          <div className="time-tracker">
            <h4>Timeline</h4>
            <div className="time-display">
              <div className="time-icon">⏱️</div>
              <div className="time-info">
                <div className="time-elapsed" id="timeElapsed">0:00</div>
                <div className="time-label">Time Since Last Event</div>
              </div>
            </div>
            <div className="time-events">
              <div className="event-item">
                <span className="event-dot"></span>
                <span className="event-text" id="lastEvent">Fasting started</span>
              </div>
            </div>
          </div>

          <div className="simulation-legend">
            <h4>Legend</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#ffd93d' }}></div>
                <span>Glucose Molecules</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#4facfe' }}></div>
                <span>Insulin Molecules</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#ff6b9d' }}></div>
                <span>Pregnancy Hormones</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#10ac84' }}></div>
                <span>Energy/ATP</span>
              </div>
            </div>
          </div>
        </div>

  </div>

      <div className="tracker-tools-row">
        <div className="tool-card">
          <div className="tool-icon">📝</div>
          <h3>Daily Log</h3>
          <p>Track your glucose readings, meals, and activities in one place</p>
          <button className="tool-btn">Start Logging</button>
        </div>

        <div className="tool-card">
          <div className="tool-icon">📊</div>
          <h3>Weekly Report</h3>
          <p>View trends and patterns in your glucose management</p>
          <button className="tool-btn">View Report</button>
        </div>

        <div className="tool-card">
          <div className="tool-icon">🔔</div>
          <h3>Reminders</h3>
          <p>Set alerts for testing times, meals, and medications</p>
          <button className="tool-btn">Set Reminders</button>
        </div>

        <div className="tool-card">
          <div className="tool-icon">📈</div>
          <h3>Target Ranges</h3>
          <p>View and customize your glucose target ranges</p>
          <button className="tool-btn">View Ranges</button>
        </div>
      </div>
    </section>
  );
};

export default TrackerSection;
