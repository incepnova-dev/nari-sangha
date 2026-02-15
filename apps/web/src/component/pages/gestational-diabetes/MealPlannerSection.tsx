import React from 'react';
import '../../../styles/pages/gestational-diabetes.css';

interface MealPlannerSectionProps {
  openSugarTracker?: () => void;
  selectMealTime?: (time: string) => void;
  toggleWizard?: () => void;
  addFood?: (id: string, type: string, gi: string, name: string, emoji: string, size: string) => void;
  skipWizard?: () => void;
  previousWizardStep?: () => void;
  nextWizardStep?: () => void;
  finishWizard?: () => void;
  clearPlate?: () => void;
  saveMeal?: () => void;
  shareMeal?: () => void;
  shareViaWhatsApp?: () => void;
  downloadMealImage?: () => void;
  copyMealLink?: () => void;
  emailMeal?: () => void;
  loadMealTemplate?: (template: string) => void;
}

const MealPlannerSection: React.FC<MealPlannerSectionProps> = ({
  openSugarTracker = () => {},
  selectMealTime = () => {},
  toggleWizard = () => {},
  addFood = () => {},
  skipWizard = () => {},
  previousWizardStep = () => {},
  nextWizardStep = () => {},
  finishWizard = () => {},
  clearPlate = () => {},
  saveMeal = () => {},
  shareMeal = () => {},
  shareViaWhatsApp = () => {},
  downloadMealImage = () => {},
  copyMealLink = () => {},
  emailMeal = () => {},
  loadMealTemplate = () => {},
}) => {
  return (
    <section className="meal-planner-section">
 <div className="section-header">
  <div className="header-badge-prominent">
    <span className="badge-pulse"></span>
    <span className="badge-text">Interactive Meal Builder</span>
  </div>

  <h2 className="section-title-prominent">
    GDM-Friendly <span className="title-highlight">Indian Meal Planner</span>
  </h2>

  <p className="section-subtitle-prominent">
    <span className="subtitle-sparkle">💡</span>
    Build your perfect Indian plate and get an instant prediction of its blood glucose impact —
    <strong>drag and drop foods</strong> to see how your choices shape a balanced GDM-friendly meal.
    <span className="subtitle-sparkle">💡</span>
  </p>
</div>

    <div className="track-levels-cta">
      <button className="open-tracker-btn" onClick={openSugarTracker}>
        <span className="btn-icon-lg">📊</span>
        <div className="btn-content">
          <h3>Track My Glucose Levels</h3>
          <p>Log meals, monitor readings, search foods, and compare nutrition</p>
        </div>
        <span className="btn-arrow">→</span>
      </button>
    </div>

  <div className="meal-planner-container">
    <div className="plate-builder-interactive">
      <div className="meal-selector">
        <button className="meal-time-btn active" onClick={() => selectMealTime('breakfast')}>
          <span className="meal-icon">🌅</span>
          <span className="meal-name">Breakfast</span>
        </button>
        <button className="meal-time-btn" onClick={() => selectMealTime('lunch')}>
          <span className="meal-icon">☀️</span>
          <span className="meal-name">Lunch</span>
        </button>
        <button className="meal-time-btn" onClick={() => selectMealTime('dinner')}>
          <span className="meal-icon">🌙</span>
          <span className="meal-name">Dinner</span>
        </button>
        <button className="meal-time-btn" onClick={() => selectMealTime('snack')}>
          <span className="meal-icon">🍎</span>
          <span className="meal-name">Snack</span>
        </button>
      </div>

      <div className="meal-wizard" id="mealWizard">
        <div className="wizard-toggle">
          <button className="wizard-toggle-btn" onClick={toggleWizard}>
            <span className="wizard-icon">🧙‍♀️</span>
            <span className="wizard-text">Guided Meal Builder</span>
            <span className="wizard-arrow">▼</span>
          </button>
        </div>
        
        <div className="wizard-content" id="wizardContent" style={{ display: 'none' }}>
          <div className="wizard-progress">
            <div className="wizard-step active" data-step="1">
              <div className="step-circle">
                <span className="step-number">1</span>
                <span className="step-check">✓</span>
              </div>
              <span className="step-label">Vegetables</span>
            </div>
            <div className="wizard-connector"></div>
            <div className="wizard-step" data-step="2">
              <div className="step-circle">
                <span className="step-number">2</span>
                <span className="step-check">✓</span>
              </div>
              <span className="step-label">Protein</span>
            </div>
            <div className="wizard-connector"></div>
            <div className="wizard-step" data-step="3">
              <div className="step-circle">
                <span className="step-number">3</span>
                <span className="step-check">✓</span>
              </div>
              <span className="step-label">Carbs</span>
            </div>
            <div className="wizard-connector"></div>
            <div className="wizard-step" data-step="4">
              <div className="step-circle">
                <span className="step-number">4</span>
                <span className="step-check">✓</span>
              </div>
              <span className="step-label">Review</span>
            </div>
          </div>
          
          <div className="wizard-body">
            <div className="wizard-instruction" id="wizardInstruction">
              <div className="instruction-icon">🥦</div>
              <h3 id="wizardTitle">Step 1: Fill Half Your Plate with Vegetables</h3>
              <p id="wizardDescription">
                Vegetables should make up 50% of your plate. They're rich in fiber, 
                which slows glucose absorption and keeps you full longer.
              </p>
              <div className="wizard-goal" id="wizardGoal">
                <span className="goal-label">Goal:</span>
                <span className="goal-value">Add 2-3 vegetable items</span>
                <div className="goal-progress">
                  <div className="goal-progress-bar" id="goalProgress" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="wizard-recommendations" id="wizardRecs">
              <h4>Recommended for You:</h4>
              <div className="wizard-food-suggestions">
                <div className="wizard-suggestion" onClick={() => addFood('leafy-greens', 'vegetable', 'low', 'Leafy Greens', '🥬', 'medium')}>
                  <span className="suggestion-emoji">🥬</span>
                  <span className="suggestion-name">Leafy Greens</span>
                  <span className="suggestion-badge">Best Choice</span>
                </div>
                <div className="wizard-suggestion" onClick={() => addFood('vegetables', 'vegetable', 'low', 'Mixed Veggies', '🥦', 'medium')}>
                  <span className="suggestion-emoji">🥦</span>
                  <span className="suggestion-name">Mixed Veggies</span>
                  <span className="suggestion-badge">Best Choice</span>
                </div>
              </div>
            </div>
            
            <div className="wizard-tip" id="wizardTip">
              <div className="tip-icon">💡</div>
              <p><strong>Pro Tip:</strong> Eating vegetables first can reduce glucose spikes by up to 30%!</p>
            </div>
          </div>
          
          <div className="wizard-actions">
            <button className="wizard-btn skip" onClick={skipWizard}>
              <span>Skip Guide</span>
            </button>
            <button className="wizard-btn back" onClick={previousWizardStep} style={{ display: 'none' }}>
              <span>← Back</span>
            </button>
            <button className="wizard-btn next" onClick={nextWizardStep}>
              <span>Next Step →</span>
            </button>
            <button className="wizard-btn finish" onClick={finishWizard} style={{ display: 'none' }}>
              <span>✓ Finish</span>
            </button>
          </div>
        </div>
      </div>

      <div className="virtual-plate-container">
        <div className="virtual-plate" id="virtualPlate">
          <div className="plate-section vegetables" id="plateVeggies">
            <span className="section-label">Vegetables<br />50%</span>
            <div className="dropped-foods" id="veggiesDropped"></div>
          </div>
          <div className="plate-section protein" id="plateProtein">
            <span className="section-label">Protein<br />25%</span>
            <div className="dropped-foods" id="proteinDropped"></div>
          </div>
          <div className="plate-section carbs" id="plateCarbs">
            <span className="section-label">Carbs<br />25%</span>
            <div className="dropped-foods" id="carbsDropped"></div>
          </div>
        </div>
        
        <div className="plate-actions">
          <button className="plate-btn clear-btn" onClick={clearPlate}>
            <span>Clear Plate</span>
          </button>
          <button className="plate-btn save-btn" onClick={saveMeal}>
            <span>Save Meal</span>
          </button>
        </div>
      </div>

      <button className="share-meal-btn" onClick={shareMeal}>
          <span className="share-icon">📤</span> Share This Meal
        </button>

        <div className="share-modal" id="shareModal">
          <h3>Share Your Healthy Meal</h3>
          <div className="share-preview" id="sharePreview">
          </div>
          
          <div className="share-options">
            <button onClick={shareViaWhatsApp}>
              <span className="icon">💬</span> WhatsApp
            </button>
            <button onClick={downloadMealImage}>
              <span className="icon">📷</span> Save Image
            </button>
            <button onClick={copyMealLink}>
              <span className="icon">🔗</span> Copy Link
            </button>
            <button onClick={emailMeal}>
              <span className="icon">✉️</span> Email
            </button>
          </div>
        </div>
      
      
      <div className="glucose-predictor">
        <h3>Predicted Glucose Impact</h3>
        <div className="prediction-meter">
          <div className="meter-bar-container">
            <div className="meter-bar-fill" id="predictionBar" style={{ width: '0%' }}></div>
          </div>
          <div className="meter-labels">
            <span className="meter-label low">Low Impact</span>
            <span className="meter-label medium">Medium Impact</span>
            <span className="meter-label high">High Impact</span>
          </div>
        </div>


        
      <div className="macro-balance-chart">
        <h4>Plate Balance</h4>
        <canvas id="macroChart" width="200" height="200"></canvas>
        <div className="balance-indicators">
          <div className="balance-item">
            <span className="color-dot vegetables"></span>
            <span className="label">Vegetables: <span id="vegPercent">0%</span></span>
          </div>
          <div className="balance-item">
            <span className="color-dot protein"></span>
            <span className="label">Protein: <span id="proteinPercent">0%</span></span>
          </div>
          <div className="balance-item">
            <span className="color-dot carbs"></span>
            <span className="label">Carbs: <span id="carbsPercent">0%</span></span>
          </div>
        </div>
        <div className="balance-status" id="balanceStatus">
          🎯 Aim: 50% Veggies, 25% Protein, 25% Carbs
        </div>
      </div>
        
        <div className="prediction-details">
          <div className="prediction-stat">
            <span className="stat-icon">📊</span>
            <div className="stat-info">
              <span className="stat-label">Estimated Peak</span>
              <span className="stat-value" id="predictedPeak">115 mg/dL</span>
            </div>
          </div>
          <div className="prediction-stat">
            <span className="stat-icon">⏱️</span>
            <div className="stat-info">
              <span className="stat-label">Time to Peak</span>
              <span className="stat-value" id="timeToPeak">45-60 min</span>
            </div>
          </div>
          <div className="prediction-stat">
            <span className="stat-icon">✓</span>
            <div className="stat-info">
              <span className="stat-label">Status</span>
              <span className="stat-value status-good" id="mealStatus">Safe Choice</span>
            </div>
          </div>
        </div>
        
        <div className="smart-suggestions" id="smartSuggestions">
          <h4>💡 Smart Suggestions</h4>
          <ul id="suggestionsList">
            <li>Great choice! This meal has perfect protein-carb balance</li>
            <li>Add more vegetables to fill you up and slow glucose absorption</li>
          </ul>
        </div>


        
      <div className="glucose-timeline">
        <h4>Predicted Glucose Response (2 hours)</h4>
        <canvas id="glucoseCurve" width="400" height="200"></canvas>
        <div className="timeline-markers">
          <span className="marker fasting">Fasting: 95</span>
          <span className="marker one-hour">1hr: 135</span>
          <span className="marker two-hour">2hr: 110</span>
        </div>
        <div className="timeline-zones">
          <div className="zone safe">✓ Safe Zone: &lt; 140 mg/dL</div>
          <div className="zone warning">⚠️ Caution: 140-160 mg/dL</div>
          <div className="zone danger">❌ Avoid: &gt; 160 mg/dL</div>
        </div>
      </div>


         
        <div className="meal-score-card">
          <h3 className="score-card-title">Meal Score</h3>
          
          <div className="score-circle-container">
            <svg className="score-circle-svg" width="140" height="140" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4caf50" stopOpacity={1} />
                  <stop offset="100%" stopColor="#45a049" stopOpacity={1} />
                </linearGradient>
              </defs>
              <circle className="score-bg" cx="70" cy="70" r="60" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.1)" 
                      stroke-width="12"></circle>
              <circle className="score-fill" cx="70" cy="70" r="60" 
                      fill="none" 
                      stroke="url(#scoreGradient)" 
                      stroke-width="12"
                      stroke-linecap="round"
                      stroke-dasharray="377" 
                      stroke-dashoffset="377"
                      transform="rotate(-90 70 70)"
                      id="scoreCircle"></circle>
            </svg>
            <div className="score-text">
              <span className="score-value" id="mealScore">0</span>
              <span className="score-max">/100</span>
            </div>
            <div className="score-rating" id="scoreRating">Build Your Meal</div>
          </div>
          
          <div className="score-breakdown">
            <div className="score-item">
              <div className="score-item-header">
                <span className="score-icon">🥦</span>
                <span className="score-name">Vegetable Power</span>
              </div>
              <div className="score-bar">
                <div className="score-bar-fill" id="veggieBar" style={{ width: '0%' }}></div>
              </div>
              <span className="score-points" id="veggiePoints">+0</span>
            </div>
            
            <div className="score-item">
              <div className="score-item-header">
                <span className="score-icon">⚖️</span>
                <span className="score-name">Plate Balance</span>
              </div>
              <div className="score-bar">
                <div className="score-bar-fill" id="balanceBar" style={{ width: '0%' }}></div>
              </div>
              <span className="score-points" id="balancePoints">+0</span>
            </div>
            
            <div className="score-item">
              <div className="score-item-header">
                <span className="score-icon">📉</span>
                <span className="score-name">Low GI Selection</span>
              </div>
              <div className="score-bar">
                <div className="score-bar-fill" id="giBar" style={{ width: '0%' }}></div>
              </div>
              <span className="score-points" id="giPoints">+0</span>
            </div>
          </div>
          
          <div className="achievements-section">
            <h4 className="achievements-title">🏆 Achievements Earned</h4>
            <div className="achievements-earned" id="achievements">
              <div className="achievement-placeholder">
                <span className="placeholder-icon">🎯</span>
                <p>Complete your first meal to earn achievements!</p>
              </div>
            </div>
          </div>
        </div>
        

        
        <div className="meal-history-suggestions-container">
          <div className="meal-history-panel">
            <h3>Your Meal History</h3>
            <div className="history-filters">
              <button onClick={() => { /* filterHistory('today') */ }}>Today</button>
              <button onClick={() => { /* filterHistory('week') */ }}>This Week</button>
              <button onClick={() => { /* filterHistory('favorites') */ }}>⭐ Favorites</button>
            </div>
            
            <div className="history-list" id="mealHistory">
              
            </div>
          </div>
        </div>

      </div>
    </div>

    
    <div className="food-selector-interactive">
      <div className="food-search">
        <input type="text" placeholder="Search foods..." className="search-input" id="foodSearch" />
        <span className="search-icon">🔍</span>
      </div>

      <div className="food-comparison-tool">
        <button className="compare-btn" onClick={() => { /* openTrackerComparison() */ }}>
          Compare Foods 🔍
        </button>
      </div>

      
      <div className="comparison-overlay" id="comparisonOverlay"></div>

      <div className="comparison-modal" id="comparisonModal">
      <div className="comparison-modal-content-new">
        <button className="close-comparison" onClick={() => { /* closeComparison() */ }}>✕</button>
        
        <div className="modal-header-modern">
          <h2>⚖️ Compare Foods Side-by-Side</h2>
          <p>Search and compare nutritional values for better glucose control</p>
        </div>
        
        <div className="compare-selection-area">
          <div className="compare-slot">
            <div className="slot-header">Food A</div>
            <input 
              type="text" 
              className="compare-search-input" 
              placeholder="Search food..." 
              id="modalCompareA" 
              onInput={() => { /* searchForModalCompare('A') */ }}
              style={{ display: 'block', visibility: 'visible', opacity: 1 }} />
            <div className="compare-suggestions" id="modalSuggestionsA"></div>
            <div className="selected-food-compare" id="modalSelectedA">
              <div className="slot-placeholder">Select a food to compare</div>
            </div>
          </div>

          <div className="compare-vs">
            <div className="vs-circle">VS</div>
          </div>

          <div className="compare-slot">
            <div className="slot-header">Food B</div>
            <input 
              type="text" 
              className="compare-search-input" 
              placeholder="Search food..." 
              id="modalCompareB" 
              onInput={() => { /* searchForModalCompare('B') */ }}
              style={{ display: 'block', visibility: 'visible', opacity: 1 }} />
            <div className="compare-suggestions" id="modalSuggestionsB"></div>
            <div className="selected-food-compare" id="modalSelectedB">
              <div className="slot-placeholder">Select a food to compare</div>
            </div>
          </div>
        </div>

        <div className="comparison-results" id="modalComparisonResults">
          <div className="comparison-placeholder">
            <div className="placeholder-icon-large">⚖️</div>
            <p>Select two foods to see detailed comparison</p>
          </div>
        </div>
      </div>
    </div>


      
      <div className="comparison-backdrop" id="comparisonBackdrop" onClick={() => { /* closeComparison() */ }}></div>

    
      
      <div className="cuisine-selector">
        <h4>Choose Your Cuisine Style</h4>
        <select id="cuisineStyle" onChange={() => { /* updateFoodOptions() */ }}>
          <option value="all">All Indian Foods</option>
          <option value="north">North Indian</option>
          <option value="south">South Indian</option>
          <option value="east">East Indian</option>
          <option value="west">West Indian</option>
          <option value="fusion">Modern Fusion</option>
        </select>
      </div>

      
      <div className="dietary-filters">
        <h4>Customize Your Options</h4>
        <div className="filter-buttons">
          <button className="filter-btn" data-filter="vegetarian" onClick={() => { /* toggleFilter('vegetarian') */ }}>
            <span className="filter-icon">🥬</span> Vegetarian
          </button>
          <button className="filter-btn" data-filter="non-veg" onClick={() => { /* toggleFilter('non-veg') */ }}>
            <span className="filter-icon">🍗</span> Non-Veg
          </button>
          <button className="filter-btn" data-filter="vegan" onClick={() => { /* toggleFilter('vegan') */ }}>
            <span className="filter-icon">🌱</span> Vegan
          </button>
          <button className="filter-btn" data-filter="gluten-free" onClick={() => { /* toggleFilter('gluten-free') */ }}>
            <span className="filter-icon">🌾</span> Gluten-Free
          </button>
          <button className="filter-btn" data-filter="dairy-free" onClick={() => { /* toggleFilter('dairy-free') */ }}>
            <span className="filter-icon">🥛</span> Dairy-Free
          </button>
        </div>
      </div>


      <div className="food-category">
        <h4 className="category-title">✅ Excellent Choices (Low GI)</h4>
        <div className="food-grid draggable">
          <div className="food-item good draggable-food" draggable="true" data-type="vegetable" data-gi="low" data-food="leafy-greens">

            
            <div className="food-item" data-tooltip-id="leafy-greens">
              <span className="food-icon">🥬</span>
              <span className="food-name">Leafy Greens</span>
              <span className="gi-badge low">GI: 15</span>
              <span className="info-icon" onClick={() => { /* showFoodInfo('leafy-greens') */ }}>ℹ️</span>
            </div>

            <div className="food-info-tooltip" id="tooltip-leafy-greens">
              <div className="tooltip-header">
                <h4>🥬 Leafy Greens</h4>
                <button className="close-tooltip">×</button>
              </div>
              
              <div className="tooltip-body">
                <div className="nutrient-info">
                  <span className="label">GI:</span>
                  <span className="value">15 (Very Low)</span>
                </div>
                <div className="nutrient-info">
                  <span className="label">Fiber:</span>
                  <span className="value">High - Slows glucose absorption</span>
                </div>
                <div className="nutrient-info">
                  <span className="label">Benefits:</span>
                  <ul>
                    <li>Rich in folate (essential for baby's development)</li>
                    <li>High in iron (prevents anemia)</li>
                    <li>Minimal effect on blood sugar</li>
                  </ul>
                </div>
                
                <div className="portion-guide">
                  <h5>Serving Guide:</h5>
                  <div className="portion-visual">
                    <img src="portion-leafy-greens.jpg" alt="Portion size" />
                    <p>1 cup cooked = 1 serving</p>
                  </div>
                </div>
                
                <div className="recipe-links">
                  <h5>Try These Recipes:</h5>
                  <a href="#recipe1">Palak Paneer (Low GI)</a>
                  <a href="#recipe2">Saag Dal</a>
                </div>
              </div>
            </div>

          </div>
          <div className="food-item good draggable-food" draggable="true" data-type="protein" data-gi="low" data-food="dal">
            <span className="food-icon">🫘</span>
            <span className="food-name">Dal/Legumes</span>
            <span className="gi-badge low">GI: 28</span>
            <div className="portion-controls">
              <button className="portion-btn small" onClick={() => addFood('dal', 'protein', 'low', 'Dal/Legumes', '🫘', 'small')}>
                <span className="portion-icon">🥄</span>
                <span className="portion-label">Small</span>
              </button>
              <button className="portion-btn medium" onClick={() => addFood('dal', 'protein', 'low', 'Dal/Legumes', '🫘', 'medium')}>
                <span className="portion-icon">🍽️</span>
                <span className="portion-label">Med</span>
              </button>
              <button className="portion-btn large" onClick={() => addFood('dal', 'protein', 'low', 'Dal/Legumes', '🫘', 'large')}>
                <span className="portion-icon">🍲</span>
                <span className="portion-label">Large</span>
              </button>
            </div>
          </div>
          <div className="food-item good draggable-food" draggable="true" data-type="carbs" data-gi="low" data-food="brown-rice">
            <span className="food-icon">🍚</span>
            <span className="food-name">Brown Rice</span>
            <span className="gi-badge low">GI: 50</span>
            <div className="portion-controls">
              <button className="portion-btn small" onClick={() => addFood('brown-rice', 'carbs', 'low', 'Brown Rice', '🍚', 'small')}>
                <span className="portion-icon">🥄</span>
                <span className="portion-label">Small</span>
              </button>
              <button className="portion-btn medium" onClick={() => addFood('brown-rice', 'carbs', 'low', 'Brown Rice', '🍚', 'medium')}>
                <span className="portion-icon">🍽️</span>
                <span className="portion-label">Med</span>
              </button>
              <button className="portion-btn large" onClick={() => addFood('brown-rice', 'carbs', 'low', 'Brown Rice', '🍚', 'large')}>
                <span className="portion-icon">🍲</span>
                <span className="portion-label">Large</span>
              </button>
            </div>
          </div>
          <div className="food-item good draggable-food" draggable="true" data-type="protein" data-gi="low" data-food="eggs">
            <span className="food-icon">🥚</span>
            <span className="food-name">Eggs</span>
            <span className="gi-badge low">GI: 0</span>
          </div>
          <div className="food-item good draggable-food" draggable="true" data-type="protein" data-gi="low" data-food="curd">
            <span className="food-icon">🥛</span>
            <span className="food-name">Curd/Yogurt</span>
            <span className="gi-badge low">GI: 36</span>
          </div>
          <div className="food-item good draggable-food" draggable="true" data-type="vegetable" data-gi="low" data-food="vegetables">
            <span className="food-icon">🥦</span>
            <span className="food-name">Mixed Veggies</span>
            <span className="gi-badge low">GI: 20</span>
          </div>
          <div className="food-item good draggable-food" draggable="true" data-type="protein" data-gi="low" data-food="fish">
            <span className="food-icon">🐟</span>
            <span className="food-name">Fish</span>
            <span className="gi-badge low">GI: 0</span>
          </div>
          <div className="food-item good draggable-food" draggable="true" data-type="carbs" data-gi="medium" data-food="roti">
            <span className="food-icon">🫓</span>
            <span className="food-name">Whole Wheat Roti</span>
            <span className="gi-badge medium">GI: 62</span>
          </div>
        </div>
      </div>

      <div className="food-category">
        <h4 className="category-title">⚠️ Use Sparingly (Medium GI)</h4>
        <div className="food-grid draggable">
          <div className="food-item moderate draggable-food" draggable="true" data-type="carbs" data-gi="medium" data-food="white-rice">
            <span className="food-icon">🍚</span>
            <span className="food-name">White Rice</span>
            <span className="gi-badge medium">GI: 73</span>
          </div>
          <div className="food-item moderate draggable-food" draggable="true" data-type="carbs" data-gi="medium" data-food="potato">
            <span className="food-icon">🥔</span>
            <span className="food-name">Potato</span>
            <span className="gi-badge medium">GI: 78</span>
          </div>
          <div className="food-item moderate draggable-food" draggable="true" data-type="carbs" data-gi="medium" data-food="banana">
            <span className="food-icon">🍌</span>
            <span className="food-name">Banana</span>
            <span className="gi-badge medium">GI: 51</span>
          </div>
        </div>
      </div>

      <div className="food-category">
        <h4 className="category-title">❌ Avoid (High GI)</h4>
        <div className="food-grid draggable">
          <div className="food-item avoid" data-food="sweets">
            <span className="food-icon">🧁</span>
            <span className="food-name">Sweets</span>
            <span className="gi-badge high">GI: 90+</span>
          </div>
          <div className="food-item avoid" data-food="sugary-drinks">
            <span className="food-icon">🥤</span>
            <span className="food-name">Sugary Drinks</span>
            <span className="gi-badge high">GI: 95+</span>
          </div>
          <div className="food-item avoid" data-food="fried">
            <span className="food-icon">🍟</span>
            <span className="food-name">Fried Foods</span>
            <span className="gi-badge high">GI: 85+</span>
          </div>
          <div className="food-item avoid" data-food="white-bread">
            <span className="food-icon">🍞</span>
            <span className="food-name">White Bread</span>
            <span className="gi-badge high">GI: 75</span>
          </div>
        </div>
      </div>

      <div className="gi-info-box">
        <h4>Understanding Glycemic Index (GI)</h4>
        <div className="gi-scale">
          <div className="gi-range low">
            <span className="gi-value">0-55</span>
            <span className="gi-label">Low GI - Best Choice</span>
          </div>
          <div className="gi-range medium">
            <span className="gi-value">56-69</span>
            <span className="gi-label">Medium GI - Moderate</span>
          </div>
          <div className="gi-range high">
            <span className="gi-value">70+</span>
            <span className="gi-label">High GI - Limit/Avoid</span>
          </div>
        </div>
      </div>

      
      <div className="meal-suggestions">
        <h3>Quick Meal Ideas</h3>
        <div className="suggestion-cards">
          <div className="suggestion-card" onClick={() => loadMealTemplate('breakfast1')}>
            <div className="suggestion-icon">🌅</div>
            <h4>Perfect Breakfast</h4>
            <p>Oats upma + boiled egg + buttermilk</p>
            <div className="suggestion-stats">
              <span className="stat">GI: Low</span>
              <span className="stat">Protein: High</span>
            </div>
          </div>
          <div className="suggestion-card" onClick={() => loadMealTemplate('lunch1')}>
            <div className="suggestion-icon">☀️</div>
            <h4>Balanced Lunch</h4>
            <p>Brown rice + dal + mixed veggies + salad</p>
            <div className="suggestion-stats">
              <span className="stat">GI: Low</span>
              <span className="stat">Fiber: High</span>
            </div>
          </div>
          <div className="suggestion-card" onClick={() => loadMealTemplate('dinner1')}>
            <div className="suggestion-icon">🌙</div>
            <h4>Light Dinner</h4>
            <p>Grilled fish + roti + vegetable curry</p>
            <div className="suggestion-stats">
              <span className="stat">GI: Low</span>
              <span className="stat">Omega-3: High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </section>
  );
};

export default MealPlannerSection;
