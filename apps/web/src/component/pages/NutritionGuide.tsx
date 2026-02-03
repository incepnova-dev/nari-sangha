import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NutritionGuide.module.css';
import { ROUTES } from '../routes/Routes';
import InnerPageHero from '../shared/InnerPageHero';

const NutritionGuide: React.FC = () => {
    const navigate = useNavigate();
    const [hydration, setHydration] = useState(65); // Percentage

    const nutrients = [
        {
            name: "Protein",
            role: "Tissue Repair & Growth",
            icon: "🥩",
            color: "#ff6b6b",
            width: "85%",
            sources: ["Lean lentils", "Chicken", "Eggs", "Greek Yogurt", "Tofu"],
            need: "71g / day"
        },
        {
            name: "Calcium",
            role: "Bone health & Milk quality",
            icon: "🥛",
            color: "#4ecdc4",
            width: "90%",
            sources: ["Milk", "Cheese", "Dark leafy greens", "Fortified juice"],
            need: "1,000mg / day"
        },
        {
            name: "Iron",
            role: "Energy & Blood health",
            icon: "🩸",
            color: "#f39c12",
            width: "70%",
            sources: ["Spinach", "Red meat", "Fortified cereals", "Beans"],
            need: "9-27mg / day"
        },
        {
            name: "Omega-3",
            role: "Baby's brain development",
            icon: "🐟",
            color: "#9b59b6",
            width: "60%",
            sources: ["Walnuts", "Chia seeds", "Salmon", "Flaxseed"],
            need: "200-300mg / day"
        }
    ];

    const mealTimeline = [
        { time: "07:00", type: "Breakfast", title: "Oatmeal with Seeds", icon: "🥣", notes: "Galactagogues (oats) help supply." },
        { time: "10:30", type: "Snack", title: "Handful of Walnuts", icon: "🥜", notes: "Healthy fats for baby's brain." },
        { time: "13:00", type: "Lunch", title: "Quinoa Salad & Chicken", icon: "🥗", notes: "Protein and complex carbs." },
        { time: "16:00", type: "Snack", title: "Greek Yogurt & Berries", icon: "🍓", notes: "Calcium and antioxidants." },
        { time: "19:30", type: "Dinner", title: "Salmon & Steamed Greens", icon: "🍛", notes: "Omega-3 and iron focus." }
    ];

    return (
        <div className={styles.pageWrapper}>
            <InnerPageHero
                title="Nutrition & Supply Guide"
                subtitle="Optimizing your diet for a healthy recovery and a robust milk supply."
                badge="Postnatal Wellness"
            />

            <div className={styles.contentContainer}>
                {/* Hydration Tracker */}
                <section className={styles.hydrationSection}>
                    <div className={styles.hydrationGrid}>
                        <div className={styles.glassContainer}>
                            <div className={styles.waterFill} style={{ height: `${hydration}%` }}>
                                <div className={styles.waterLabel}>{hydration}%</div>
                            </div>
                            <div className={styles.glassMarkers}>
                                <span>3L</span>
                                <span>2L</span>
                                <span>1L</span>
                                <span>0</span>
                            </div>
                        </div>
                        <div className={styles.hydrationContent}>
                            <h2>💧 Hydration Tracker</h2>
                            <p>Nursing mothers need approximately 3.1 liters (about 13 cups) of total water per day. Thirst is often a late indicator—stay ahead!</p>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={hydration}
                                onChange={(e) => setHydration(Number(e.target.value))}
                                className={styles.intakeSlider}
                            />
                            <div className={styles.hydrationTips}>
                                <div className={styles.tipItem}>
                                    <span className={styles.tipIcon}>🥛</span>
                                    <p>Drink a full glass of water every time you nurse or pump.</p>
                                </div>
                                <div className={styles.tipItem}>
                                    <span className={styles.tipIcon}>🍋</span>
                                    <p>Infuse with citrus if plain water is hard to maintain.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Nutrient Grid */}
                <h2 className={styles.sectionTitle}>Essential Nutrients</h2>
                <div className={styles.nutrientGrid}>
                    {nutrients.map(n => (
                        <div key={n.name} className={styles.nutrientCard} style={{ '--card-color': n.color } as any}>
                            <div className={styles.nutrientHeader}>
                                <div className={styles.nutrientIcon}>{n.icon}</div>
                                <div>
                                    <h3 className={styles.nutrientName}>{n.name}</h3>
                                    <span className={styles.nutrientRole}>{n.role}</span>
                                </div>
                            </div>
                            <div className={styles.meterBar}>
                                <div className={styles.meterFill} style={{ '--meter-width': n.width } as any}></div>
                            </div>
                            <div className={styles.foodSources}>
                                <div className={styles.sourceTitle}>Best Sources:</div>
                                <div className={styles.foodTags}>
                                    {n.sources.map(s => <span key={s} className={styles.foodTag}>{s}</span>)}
                                </div>
                            </div>
                            <div className={styles.dailyNeed}>
                                <strong>{n.need}</strong>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Meal Timeline */}
                <div className={styles.mealPlanner}>
                    <h2 className={styles.sectionTitle}>Sample Daily Menu</h2>
                    <div className={styles.timeline}>
                        {mealTimeline.map((meal, idx) => (
                            <div key={idx} className={styles.mealItem}>
                                <div className={styles.mealTime}>
                                    <span className={styles.timeIcon}>{meal.icon}</span>
                                    <span>{meal.time}</span>
                                </div>
                                <div className={styles.mealCard}>
                                    <div className={styles.mealType}>{meal.type}</div>
                                    <h3>{meal.title}</h3>
                                    <p>{meal.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Back to Journey */}
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <button
                        onClick={() => navigate(ROUTES.BREASTFEEDING)}
                        style={{ padding: '16px 32px', borderRadius: '30px', border: '1px solid #eee', background: 'white', fontWeight: '800', cursor: 'pointer', color: '#666' }}
                    >
                        &larr; Back to Breastfeeding Journey
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NutritionGuide;
