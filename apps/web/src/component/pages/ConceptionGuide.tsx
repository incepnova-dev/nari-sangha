import React, { useState } from 'react';
import styles from './ConceptionGuide.module.css';
import InnerPageHero from '../shared/InnerPageHero';

const ConceptionGuide: React.FC = () => {
    const [cycleDay, setCycleDay] = useState<number>(14);
    const [cycleLength, setCycleLength] = useState<number>(28);

    // Calculate fertile window
    const ovulationDay = cycleLength - 14;
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 1;

    const getDayStatus = (day: number) => {
        if (day === ovulationDay) return 'ovulation';
        if (day >= fertileStart && day <= fertileEnd) return 'fertile';
        if (day <= 5) return 'menstrual';
        return 'normal';
    };

    const getFertilityScore = () => {
        const distance = Math.abs(cycleDay - ovulationDay);
        if (distance === 0) return { score: 100, label: 'Peak Fertility', color: '#d81b60' };
        if (distance <= 2) return { score: 80, label: 'High Fertility', color: '#f06292' };
        if (distance <= 5) return { score: 50, label: 'Moderate Fertility', color: '#ffb74d' };
        return { score: 10, label: 'Low Fertility', color: '#90a4ae' };
    };

    const fertility = getFertilityScore();

    const tips = [
        {
            icon: '📅',
            title: 'Track Your Cycle',
            description: 'Use ovulation predictor kits or track basal body temperature to identify your most fertile days.'
        },
        {
            icon: '🥗',
            title: 'Eat Fertility-Boosting Foods',
            description: 'Include folate-rich foods, omega-3 fatty acids, antioxidants, and maintain a healthy weight.'
        },
        {
            icon: '🏃‍♀️',
            title: 'Exercise Moderately',
            description: 'Regular moderate exercise improves fertility, but avoid excessive intense workouts.'
        },
        {
            icon: '😴',
            title: 'Prioritize Sleep',
            description: 'Aim for 7-9 hours of quality sleep to regulate hormones essential for conception.'
        },
        {
            icon: '🚭',
            title: 'Avoid Harmful Substances',
            description: 'Quit smoking, limit alcohol, and reduce caffeine intake to improve conception chances.'
        },
        {
            icon: '🧘',
            title: 'Manage Stress',
            description: 'High stress can affect ovulation. Practice meditation, yoga, or other relaxation techniques.'
        }
    ];

    const ovulationSigns = [
        { sign: 'Cervical Mucus Changes', description: 'Becomes clear, stretchy, and egg-white like' },
        { sign: 'Basal Body Temperature Rise', description: 'Slight increase (0.5-1°F) after ovulation' },
        { sign: 'Mild Pelvic Pain', description: 'Ovulation pain (mittelschmerz) on one side' },
        { sign: 'Increased Libido', description: 'Natural peak in sexual desire' },
        { sign: 'Breast Tenderness', description: 'Slight sensitivity due to hormone changes' },
        { sign: 'Bloating', description: 'Mild abdominal bloating' }
    ];

    return (
        <div className={styles.pageContainer}>
            <InnerPageHero
                title="Conception Guide"
                subtitle="Track ovulation, understand your cycle, and get natural tips to improve your chances of conceiving."
                badge="Planning"
            />

            <div className={styles.mainContent}>
                {/* Ovulation Calculator */}
                <section className={styles.calculatorSection}>
                    <h2>🎯 Ovulation & Fertility Calculator</h2>
                    
                    <div className={styles.calculatorCard}>
                        <div className={styles.inputs}>
                            <div className={styles.inputGroup}>
                                <label>Cycle Length (days)</label>
                                <input 
                                    type="range" 
                                    min="21" 
                                    max="35" 
                                    value={cycleLength}
                                    onChange={(e) => setCycleLength(parseInt(e.target.value))}
                                />
                                <span>{cycleLength} days</span>
                            </div>
                            
                            <div className={styles.inputGroup}>
                                <label>Current Cycle Day</label>
                                <input 
                                    type="range" 
                                    min="1" 
                                    max={cycleLength}
                                    value={cycleDay}
                                    onChange={(e) => setCycleDay(parseInt(e.target.value))}
                                />
                                <span>Day {cycleDay}</span>
                            </div>
                        </div>

                        {/* Cycle Visualization */}
                        <div className={styles.cycleVisual}>
                            <h4>Your Cycle Visualization</h4>
                            <div className={styles.cycleBar}>
                                {Array.from({ length: cycleLength }, (_, i) => i + 1).map(day => {
                                    const status = getDayStatus(day);
                                    return (
                                        <div
                                            key={day}
                                            className={`${styles.dayMarker} ${styles[status]} ${day === cycleDay ? styles.current : ''}`}
                                            title={`Day ${day}`}
                                        />
                                    );
                                })}
                            </div>
                            <div className={styles.legend}>
                                <span><span className={`${styles.dot} ${styles.menstrual}`}></span> Menstrual</span>
                                <span><span className={`${styles.dot} ${styles.fertile}`}></span> Fertile Window</span>
                                <span><span className={`${styles.dot} ${styles.ovulation}`}></span> Ovulation Day</span>
                                <span><span className={`${styles.dot} ${styles.normal}`}></span> Other Days</span>
                            </div>
                        </div>

                        {/* Fertility Score */}
                        <div className={styles.fertilityScore} style={{ borderColor: fertility.color }}>
                            <div className={styles.scoreHeader}>
                                <span className={styles.scoreLabel}>Today's Fertility Status</span>
                                <span className={styles.scoreValue} style={{ color: fertility.color }}>{fertility.label}</span>
                            </div>
                            <div className={styles.scoreBar}>
                                <div 
                                    className={styles.scoreFill} 
                                    style={{ width: `${fertility.score}%`, background: fertility.color }}
                                />
                            </div>
                            <p className={styles.scoreNote}>
                                {fertility.score >= 80 
                                    ? 'Great timing! Your chances of conception are highest during this window.' 
                                    : fertility.score >= 50 
                                    ? 'Fertility is moderate. Consider timing intercourse within the next few days.' 
                                    : 'Outside fertile window. Track your cycle for optimal timing next month.'}
                            </p>
                        </div>

                        {/* Key Dates */}
                        <div className={styles.keyDates}>
                            <div className={styles.dateCard}>
                                <span className={styles.dateLabel}>Next Ovulation</span>
                                <span className={styles.dateValue}>Day {ovulationDay}</span>
                            </div>
                            <div className={styles.dateCard}>
                                <span className={styles.dateLabel}>Fertile Window</span>
                                <span className={styles.dateValue}>Days {fertileStart}-{fertileEnd}</span>
                            </div>
                            <div className={styles.dateCard}>
                                <span className={styles.dateLabel}>Best Days to Conceive</span>
                                <span className={styles.dateValue}>Days {ovulationDay-2}-{ovulationDay}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ovulation Signs */}
                <section className={styles.signsSection}>
                    <h2>🔍 Signs of Ovulation</h2>
                    <p className={styles.sectionDesc}>Learn to recognize your body's natural fertility signals</p>
                    
                    <div className={styles.signsGrid}>
                        {ovulationSigns.map((item, idx) => (
                            <div key={idx} className={styles.signCard}>
                                <h4>{item.sign}</h4>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Natural Conception Tips */}
                <section className={styles.tipsSection}>
                    <h2>💡 Natural Conception Tips</h2>
                    <p className={styles.sectionDesc}>Lifestyle changes to boost your fertility naturally</p>
                    
                    <div className={styles.tipsGrid}>
                        {tips.map((tip, idx) => (
                            <div key={idx} className={styles.tipCard}>
                                <span className={styles.tipIcon}>{tip.icon}</span>
                                <h4>{tip.title}</h4>
                                <p>{tip.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Timing Guide */}
                <section className={styles.timingSection}>
                    <h2>⏰ Conception Timing Guide</h2>
                    <div className={styles.timingCard}>
                        <div className={styles.timingItem}>
                            <span className={styles.timingDay}>5 Days Before</span>
                            <div className={styles.timingBar}>
                                <div className={styles.timingFill} style={{ width: '20%' }}></div>
                            </div>
                            <span className={styles.timingChance}>10% chance</span>
                        </div>
                        <div className={styles.timingItem}>
                            <span className={styles.timingDay}>4 Days Before</span>
                            <div className={styles.timingBar}>
                                <div className={styles.timingFill} style={{ width: '35%' }}></div>
                            </div>
                            <span className={styles.timingChance}>20% chance</span>
                        </div>
                        <div className={styles.timingItem}>
                            <span className={styles.timingDay}>3 Days Before</span>
                            <div className={styles.timingBar}>
                                <div className={styles.timingFill} style={{ width: '55%' }}></div>
                            </div>
                            <span className={styles.timingChance}>30% chance</span>
                        </div>
                        <div className={styles.timingItem}>
                            <span className={styles.timingDay}>2 Days Before</span>
                            <div className={styles.timingBar}>
                                <div className={styles.timingFill} style={{ width: '75%' }}></div>
                            </div>
                            <span className={styles.timingChance}>40% chance</span>
                        </div>
                        <div className={styles.timingItem}>
                            <span className={styles.timingDay}>1 Day Before</span>
                            <div className={styles.timingBar}>
                                <div className={styles.timingFill} style={{ width: '90%' }}></div>
                            </div>
                            <span className={styles.timingChance}>45% chance</span>
                        </div>
                        <div className={styles.timingItem}>
                            <span className={styles.timingDay}>Ovulation Day</span>
                            <div className={styles.timingBar}>
                                <div className={styles.timingFill} style={{ width: '100%' }}></div>
                            </div>
                            <span className={styles.timingChance}>50% chance</span>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaCard}>
                        <h3>Ready to Start Trying?</h3>
                        <p>Download our cycle tracking app or connect with a fertility specialist for personalized guidance.</p>
                        <div className={styles.ctaButtons}>
                            <button className={styles.primaryBtn}>Download Tracker</button>
                            <button className={styles.secondaryBtn}>Find Specialist</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ConceptionGuide;
