import React, { useState } from 'react';

interface SeasonResult {
  title: string;
  season: string;
  weather: string;
  description: string;
  forecast: string[];
}

const SeasonalChecker: React.FC = () => {
  const [seasonAge, setSeasonAge] = useState('');
  const [periodPattern, setPeriodPattern] = useState('');
  const [mainSymptom, setMainSymptom] = useState('');
  const [seasonResult, setSeasonResult] = useState<SeasonResult | null>(null);

  const generateSeasonResult = () => {
    if (!seasonAge || !periodPattern) {
      alert('Please fill in all fields');
      return;
    }

    let title, season, weather, description, forecast;

    if (periodPattern === 'none') {
      title = 'Early Postmenopause (Autumn→Winter)';
      season = 'Autumn Season';
      weather = '🍂';
      description = 'Your hormones have settled into a new baseline. Now is the time to focus on long-term health optimization.';
      forecast = [
        '🦴 <strong>Bone Health Priority:</strong> Start LIFTMOR-style strength training',
        '❤️ <strong>Cardiovascular Care:</strong> Monitor blood pressure and lipids annually',
        '🧠 <strong>Brain Health:</strong> Support cognitive function with lifestyle choices',
        '🌸 <strong>Symptom Management:</strong> Work with your doctor on any persistent issues'
      ];
    } else if (periodPattern === 'gaps') {
      title = 'Late Perimenopause (Late Summer→Autumn)';
      season = 'Transition Season';
      weather = '🌦️';
      description = 'Your hormone climate is in active transition. Expect variability and prepare for stabilization.';
      forecast = [
        '🌡️ <strong>Hot Flashes:</strong> Peak intensity may occur, explore cooling strategies',
        '🌊 <strong>Cycle Changes:</strong> 60+ day gaps indicate approaching final period',
        '💤 <strong>Sleep Disruption:</strong> Consider CBT-I or sleep hygiene improvements',
        '🧠 <strong>Brain Fog:</strong> Common but temporary, use organizational tools'
      ];
    } else if (periodPattern === 'irregular') {
      title = 'Early-Mid Perimenopause (Summer→Autumn)';
      season = 'Transition Season';
      weather = '🌤️→🍂';
      description = 'Your hormone climate is shifting—like moving from summer into autumn. Changes are beginning.';
      forecast = [
        '🌡️ <strong>Hot Flashes Starting:</strong> May begin or intensify',
        '🌊 <strong>Cycle Variability:</strong> Expect 7+ day differences cycle-to-cycle',
        '💤 <strong>Sleep Changes:</strong> May notice early disruptions',
        '🧠 <strong>Cognitive Shifts:</strong> Some women notice memory changes'
      ];
    } else {
      title = 'Late Reproductive Stage (Late Spring)';
      season = 'Spring Season';
      weather = '🌸';
      description = 'Your hormones remain stable, but this is the perfect time to build strong health habits for the future.';
      forecast = [
        '✅ <strong>Regular Cycles:</strong> Maintained every 24-35 days',
        '🔍 <strong>Early Detection:</strong> Start tracking any subtle pattern changes',
        '💪 <strong>Prevention:</strong> Build bone and muscle strength now',
        '🌱 <strong>Preparation:</strong> Learn about upcoming transitions'
      ];
    }

    setSeasonResult({ title, season, weather, description, forecast });
  };

  return (
    <section className="seasonal-checker-section">
      <div className="checker-header">
        <h2 className="checker-title">
          <span className="title-icon">🌦️</span>
          What Season Am I In?
          <span className="title-subtitle">Discover your hormone climate</span>
        </h2>
        <p className="checker-description">
          Answer a few questions to understand your body's current "season" and what care each season needs.
        </p>
      </div>

      <div className="seasonal-interface">
        <div className="season-form">
          <div className="form-card">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🎂</span>
                Your Age Range
              </label>
              <select 
                id="seasonAge" 
                className="custom-select"
                value={seasonAge}
                onChange={(e) => setSeasonAge(e.target.value)}
              >
                <option value="">Choose your age...</option>
                <option value="under35">Under 35 (Early Spring)</option>
                <option value="35-40">35–40 (Late Spring)</option>
                <option value="41-45">41–45 (Early Summer)</option>
                <option value="46-50">46–50 (Late Summer)</option>
                <option value="51-55">51–55 (Autumn)</option>
                <option value="56+">56+ (Winter)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📅</span>
                Period Pattern (Last 12 Months)
              </label>
              <div className="button-grid">
                <button 
                  className={`option-btn ${periodPattern === 'regular' ? 'selected' : ''}`}
                  onClick={() => setPeriodPattern('regular')}
                >
                  <span className="btn-emoji">🟢</span>
                  <span className="btn-text">Regular cycles</span>
                </button>
                <button 
                  className={`option-btn ${periodPattern === 'irregular' ? 'selected' : ''}`}
                  onClick={() => setPeriodPattern('irregular')}
                >
                  <span className="btn-emoji">🟡</span>
                  <span className="btn-text">Irregular patterns</span>
                </button>
                <button 
                  className={`option-btn ${periodPattern === 'gaps' ? 'selected' : ''}`}
                  onClick={() => setPeriodPattern('gaps')}
                >
                  <span className="btn-emoji">🟠</span>
                  <span className="btn-text">60+ day gaps</span>
                </button>
                <button 
                  className={`option-btn ${periodPattern === 'none' ? 'selected' : ''}`}
                  onClick={() => setPeriodPattern('none')}
                >
                  <span className="btn-emoji">⚪</span>
                  <span className="btn-text">No periods</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">💭</span>
                What's Bothering You Most?
              </label>
              <div className="symptom-cards">
                {['bleeding', 'hotflash', 'sleep', 'dryness', 'bone'].map((symptom) => (
                  <label key={symptom} className="symptom-card">
                    <input 
                      type="radio" 
                      name="mainSymptom" 
                      value={symptom}
                      checked={mainSymptom === symptom}
                      onChange={(e) => setMainSymptom(e.target.value)}
                    />
                    <div className="card-inner">
                      <span className="card-emoji">
                        {symptom === 'bleeding' ? '🩸' : 
                         symptom === 'hotflash' ? '🔥' :
                         symptom === 'sleep' ? '😴' :
                         symptom === 'dryness' ? '💧' : '🦴'}
                      </span>
                      <span className="card-label">
                        {symptom === 'bleeding' ? 'Heavy bleeding' :
                         symptom === 'hotflash' ? 'Hot flashes' :
                         symptom === 'sleep' ? 'Sleep & mood' :
                         symptom === 'dryness' ? 'Vaginal dryness' : 'Bone/joint pain'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button className="check-season-btn" onClick={generateSeasonResult}>
              <span className="btn-shine"></span>
              <span className="btn-text">Reveal My Season</span>
              <span className="btn-icon">🔮</span>
            </button>
          </div>
        </div>

        <div className="season-result">
          <div className="result-card">
            {!seasonResult ? (
              <div className="result-placeholder">
                <div className="placeholder-weather">
                  <div className="weather-anim">
                    <span className="weather-emoji">🌈</span>
                  </div>
                </div>
                <h3>Your Personal Climate Awaits</h3>
                <p>Complete the form to discover which season you're in and how to thrive</p>
              </div>
            ) : (
              <div className="result-content">
                <div className="result-weather">
                  <div className="weather-visual">
                    <span style={{ fontSize: '4rem' }}>{seasonResult.weather}</span>
                  </div>
                  <div className="season-badge">{seasonResult.season}</div>
                </div>
                <h3 className="result-title">{seasonResult.title}</h3>
                <p className="result-description">{seasonResult.description}</p>
                <div className="result-forecast">
                  <div className="forecast-title">What to expect this season:</div>
                  <div className="forecast-items">
                    {seasonResult.forecast.map((item: string, idx: number) => (
                      <div key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalChecker;

