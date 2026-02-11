import React, { useState } from 'react';
import styles from './MilkSupplyGuide.module.css';
import InnerPageHero from '../shared/InnerPageHero';

interface FoodItem {
    name: string;
    icon: string;
    benefit: string;
    category: 'galactagogue' | 'hydration' | 'nutrition';
}

const FOODS: FoodItem[] = [
    { name: 'Oats', icon: '🌾', benefit: 'Rich in iron and fiber, boosts prolactin', category: 'galactagogue' },
    { name: 'Fenugreek', icon: '🌿', benefit: 'Traditional herb that increases milk production', category: 'galactagogue' },
    { name: 'Fennel Seeds', icon: '🌱', benefit: 'Helps increase milk supply and aids digestion', category: 'galactagogue' },
    { name: 'Brewer\'s Yeast', icon: '🍞', benefit: 'B-vitamins and protein for milk production', category: 'galactagogue' },
    { name: 'Leafy Greens', icon: '🥬', benefit: 'Iron, calcium, and phytoestrogens', category: 'nutrition' },
    { name: 'Salmon', icon: '🐟', benefit: 'Omega-3s for baby\'s brain development', category: 'nutrition' },
    { name: 'Eggs', icon: '🥚', benefit: 'Complete protein and choline', category: 'nutrition' },
    { name: 'Sweet Potato', icon: '🍠', benefit: 'Vitamin A and potassium', category: 'nutrition' },
    { name: 'Water', icon: '💧', benefit: 'Essential for milk production - drink 3L+ daily', category: 'hydration' },
    { name: 'Coconut Water', icon: '🥥', benefit: 'Natural electrolytes and hydration', category: 'hydration' },
    { name: 'Herbal Tea', icon: '🍵', benefit: 'Lactation teas with fenugreek and fennel', category: 'hydration' },
    { name: 'Bone Broth', icon: '🍲', benefit: 'Hydration plus minerals and collagen', category: 'hydration' }
];

const SUPPLY_BOOSTERS = [
    {
        title: 'Power Pumping',
        description: 'Pump for 20 min, rest 10 min, pump 10 min, rest 10 min, pump 10 min. Mimics cluster feeding to boost supply.',
        icon: '⏰',
        frequency: 'Once daily for 3-4 days'
    },
    {
        title: 'Breast Compression',
        description: 'Gently compress breast while nursing or pumping to increase milk flow and emptying.',
        icon: '👐',
        frequency: 'During every feeding'
    },
    {
        title: 'Skin-to-Skin Contact',
        description: 'Direct skin contact stimulates oxytocin and prolactin, boosting milk production.',
        icon: '🤱',
        frequency: 'Daily for 30+ minutes'
    },
    {
        title: 'Nurse on Demand',
        description: 'Frequent nursing (8-12 times daily) signals body to produce more milk.',
        icon: '🍼',
        frequency: 'Every 2-3 hours'
    },
    {
        title: 'Empty Both Breasts',
        description: 'Always offer both sides and ensure thorough emptying to maintain supply.',
        icon: '✅',
        frequency: 'Every feeding session'
    },
    {
        title: 'Rest & Reduce Stress',
        description: 'Stress inhibits oxytocin. Prioritize sleep and relaxation techniques.',
        icon: '😴',
        frequency: 'Daily self-care routine'
    }
];

const MilkSupplyGuide: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [supplyLevel, setSupplyLevel] = useState<number>(50);

    const filteredFoods = activeCategory === 'all' 
        ? FOODS 
        : FOODS.filter(f => f.category === activeCategory);

    const getSupplyStatus = () => {
        if (supplyLevel >= 80) return { label: 'Excellent Supply', color: '#4caf50', message: 'Great job! Keep maintaining your routine.' };
        if (supplyLevel >= 50) return { label: 'Adequate Supply', color: '#ff9800', message: 'Good progress. Try adding more galactagogues.' };
        return { label: 'Low Supply', color: '#f44336', message: 'Consider consulting a lactation specialist.' };
    };

    const status = getSupplyStatus();

    return (
        <div className={styles.pageContainer}>
            <InnerPageHero
                title="Milk Supply & Nutrition"
                subtitle="Dietary plans and hydration tips to naturally boost your milk supply and energy levels."
                badge="Nursing"
            />

            <div className={styles.mainContent}>
                {/* Supply Tracker */}
                <section className={styles.trackerSection}>
                    <h2>🥛 Milk Supply Tracker</h2>
                    <div className={styles.trackerCard}>
                        <div className={styles.trackerInput}>
                            <label>How would you rate your current milk supply?</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={supplyLevel}
                                onChange={(e) => setSupplyLevel(parseInt(e.target.value))}
                            />
                            <div className={styles.trackerScale}>
                                <span>Low</span>
                                <span>Adequate</span>
                                <span>Excellent</span>
                            </div>
                        </div>
                        
                        <div className={styles.supplyStatus} style={{ borderColor: status.color }}>
                            <div className={styles.statusHeader}>
                                <span className={styles.statusLabel}>Current Status</span>
                                <span className={styles.statusValue} style={{ color: status.color }}>{status.label}</span>
                            </div>
                            <div className={styles.statusBar}>
                                <div 
                                    className={styles.statusFill} 
                                    style={{ width: `${supplyLevel}%`, background: status.color }}
                                />
                            </div>
                            <p className={styles.statusMessage}>{status.message}</p>
                        </div>
                    </div>
                </section>

                {/* Supply Boosters */}
                <section className={styles.boostersSection}>
                    <h2>🚀 Quick Supply Boosters</h2>
                    <p className={styles.sectionDesc}>Proven techniques to increase milk production naturally</p>
                    
                    <div className={styles.boostersGrid}>
                        {SUPPLY_BOOSTERS.map((booster, idx) => (
                            <div key={idx} className={styles.boosterCard}>
                                <span className={styles.boosterIcon}>{booster.icon}</span>
                                <h4>{booster.title}</h4>
                                <p className={styles.boosterDesc}>{booster.description}</p>
                                <span className={styles.boosterFreq}>{booster.frequency}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Nutrition Guide */}
                <section className={styles.nutritionSection}>
                    <h2>🥗 Milk-Boosting Foods</h2>
                    <p className={styles.sectionDesc}>Add these galactagogues and nutritious foods to your diet</p>
                    
                    <div className={styles.categoryFilter}>
                        <button 
                            className={activeCategory === 'all' ? styles.active : ''}
                            onClick={() => setActiveCategory('all')}
                        >
                            All Foods
                        </button>
                        <button 
                            className={activeCategory === 'galactagogue' ? styles.active : ''}
                            onClick={() => setActiveCategory('galactagogue')}
                        >
                            Galactagogues
                        </button>
                        <button 
                            className={activeCategory === 'nutrition' ? styles.active : ''}
                            onClick={() => setActiveCategory('nutrition')}
                        >
                            Nutrition
                        </button>
                        <button 
                            className={activeCategory === 'hydration' ? styles.active : ''}
                            onClick={() => setActiveCategory('hydration')}
                        >
                            Hydration
                        </button>
                    </div>

                    <div className={styles.foodsGrid}>
                        {filteredFoods.map((food, idx) => (
                            <div key={idx} className={styles.foodCard}>
                                <span className={styles.foodIcon}>{food.icon}</span>
                                <h4>{food.name}</h4>
                                <p>{food.benefit}</p>
                                <span className={`${styles.categoryTag} ${styles[food.category]}`}>
                                    {food.category}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sample Meal Plan */}
                <section className={styles.mealPlanSection}>
                    <h2>📋 Sample Daily Meal Plan</h2>
                    <div className={styles.mealPlanCard}>
                        <div className={styles.meal}>
                            <span className={styles.mealTime}>🌅 Breakfast</span>
                            <ul>
                                <li>Oatmeal with brewer's yeast and banana</li>
                                <li>2 boiled eggs</li>
                                <li>Herbal lactation tea</li>
                            </ul>
                        </div>
                        <div className={styles.meal}>
                            <span className={styles.mealTime}>🌞 Mid-Morning Snack</span>
                            <ul>
                                <li>Whole grain toast with almond butter</li>
                                <li>Coconut water</li>
                            </ul>
                        </div>
                        <div className={styles.meal}>
                            <span className={styles.mealTime}>☀️ Lunch</span>
                            <ul>
                                <li>Grilled salmon with quinoa</li>
                                <li>Spinach and kale salad</li>
                                <li>Fennel seed water</li>
                            </ul>
                        </div>
                        <div className={styles.meal}>
                            <span className={styles.mealTime}>🌤️ Afternoon Snack</span>
                            <ul>
                                <li>Carrot sticks with hummus</li>
                                <li>Handful of almonds</li>
                                <li>Water (500ml)</li>
                            </ul>
                        </div>
                        <div className={styles.meal}>
                            <span className={styles.mealTime}>🌙 Dinner</span>
                            <ul>
                                <li>Chicken curry with fenugreek</li>
                                <li>Sweet potato mash</li>
                                <li>Steamed broccoli</li>
                                <li>Bone broth soup</li>
                            </ul>
                        </div>
                        <div className={styles.meal}>
                            <span className={styles.mealTime}>🌜 Evening Snack</span>
                            <ul>
                                <li>Warm milk with turmeric</li>
                                <li>2-3 dates</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Hydration Tracker */}
                <section className={styles.hydrationSection}>
                    <h2>💧 Hydration Goals</h2>
                    <div className={styles.hydrationCard}>
                        <div className={styles.hydrationInfo}>
                            <div className={styles.hydrationIcon}>💧</div>
                            <div className={styles.hydrationText}>
                                <h4>Daily Water Target</h4>
                                <p className={styles.hydrationTarget}>3 - 4 Liters</p>
                                <p className={styles.hydrationTip}>Nursing mothers need extra hydration. Keep a water bottle nearby while feeding.</p>
                            </div>
                        </div>
                        <div className={styles.hydrationBenefits}>
                            <h5>Why Hydration Matters:</h5>
                            <ul>
                                <li>Milk is 87% water - dehydration reduces supply</li>
                                <li>Prevents fatigue and headaches</li>
                                <li>Supports overall milk production</li>
                                <li>Helps with postpartum recovery</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Warning Signs */}
                <section className={styles.warningSection}>
                    <h2>⚠️ When to Seek Help</h2>
                    <div className={styles.warningCard}>
                        <p>Contact a lactation consultant or healthcare provider if you experience:</p>
                        <ul>
                            <li>Baby not gaining weight or losing weight</li>
                            <li>Fewer than 6 wet diapers per day after day 5</li>
                            <li>Baby seems constantly hungry or fussy after feeds</li>
                            <li>Painful breastfeeding that doesn't improve</li>
                            <li>Signs of mastitis (fever, breast pain, redness)</li>
                            <li>Supplementing with formula but want to exclusively breastfeed</li>
                        </ul>
                        <button className={styles.helpBtn}>Find Lactation Consultant</button>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaCard}>
                        <h3>Join Our Breastfeeding Community</h3>
                        <p>Connect with other nursing mothers, share tips, and get support from lactation experts.</p>
                        <div className={styles.ctaButtons}>
                            <button className={styles.primaryBtn}>Join Community</button>
                            <button className={styles.secondaryBtn}>Book Consultation</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MilkSupplyGuide;
