import React, { useState } from 'react';
import styles from './FertilityJourney.module.css';
import InnerPageHero from '../shared/InnerPageHero';

interface TreatmentOption {
    id: string;
    name: string;
    icon: string;
    description: string;
    successRate: { age: string; rate: string }[];
    duration: string;
    cost: string;
    steps: string[];
    pros: string[];
    cons: string[];
    idealFor: string[];
}

const TREATMENTS: TreatmentOption[] = [
    {
        id: 'ivf',
        name: 'In Vitro Fertilization (IVF)',
        icon: '🧪',
        description: 'Eggs are retrieved from ovaries, fertilized with sperm in a lab, and the resulting embryo is transferred to the uterus.',
        successRate: [
            { age: 'Under 35', rate: '41-43%' },
            { age: '35-37', rate: '33-36%' },
            { age: '38-40', rate: '23-27%' },
            { age: '41-42', rate: '13-18%' },
            { age: 'Over 42', rate: '3-7%' }
        ],
        duration: '4-6 weeks per cycle',
        cost: '₹1.5L - ₹2.5L per cycle',
        steps: [
            'Ovarian stimulation with hormone injections (8-14 days)',
            'Egg retrieval procedure (minor surgery)',
            'Fertilization in laboratory (3-5 days)',
            'Embryo transfer to uterus',
            'Pregnancy test after 2 weeks'
        ],
        pros: [
            'Highest success rate among fertility treatments',
            'Can use donor eggs or sperm if needed',
            'Genetic testing available (PGT)',
            'Embryos can be frozen for future use'
        ],
        cons: [
            'Expensive and may require multiple cycles',
            'Hormone injections can cause side effects',
            'Multiple pregnancy risk (twins/triplets)',
            'Emotionally and physically demanding'
        ],
        idealFor: [
            'Blocked or damaged fallopian tubes',
            'Male factor infertility',
            'Unexplained infertility',
            'Failed other treatments'
        ]
    },
    {
        id: 'iui',
        name: 'Intrauterine Insemination (IUI)',
        icon: '💉',
        description: 'Sperm is washed, concentrated, and placed directly into the uterus during ovulation to increase chances of fertilization.',
        successRate: [
            { age: 'Under 35', rate: '13-18%' },
            { age: '35-37', rate: '10-13%' },
            { age: '38-40', rate: '7-9%' },
            { age: 'Over 40', rate: '3-5%' }
        ],
        duration: '2-3 weeks per cycle',
        cost: '₹10K - ₹25K per cycle',
        steps: [
            'Ovulation monitoring with ultrasound',
            'Sperm collection and washing',
            'Insemination procedure (15 minutes)',
            'Rest for 15-30 minutes after',
            'Pregnancy test after 2 weeks'
        ],
        pros: [
            'Less invasive than IVF',
            'More affordable option',
            'Minimal medication required',
            'Quick procedure with no anesthesia'
        ],
        cons: [
            'Lower success rates than IVF',
            'Requires open fallopian tubes',
            'May need multiple attempts',
            'Not suitable for severe male factor'
        ],
        idealFor: [
            'Mild male factor infertility',
            'Cervical mucus issues',
            'Unexplained infertility',
            'Using donor sperm'
        ]
    },
    {
        id: 'egg-freezing',
        name: 'Egg Freezing (Oocyte Cryopreservation)',
        icon: '❄️',
        description: 'Eggs are retrieved, frozen, and stored for future use, preserving fertility for women who want to delay childbearing.',
        successRate: [
            { age: 'Under 30', rate: '40-50%' },
            { age: '30-34', rate: '30-40%' },
            { age: '35-37', rate: '20-30%' },
            { age: '38-40', rate: '10-20%' },
            { age: 'Over 40', rate: '5-10%' }
        ],
        duration: '2-3 weeks for retrieval',
        cost: '₹1L - ₹1.5L + annual storage',
        steps: [
            'Fertility assessment and consultation',
            'Ovarian stimulation (10-14 days)',
            'Egg retrieval under sedation',
            'Vitrification (flash freezing)',
            'Storage in cryopreservation facility'
        ],
        pros: [
            'Preserves fertility for future',
            'No partner needed at freezing time',
            'Peace of mind for career-focused women',
            'Medical reasons (cancer treatment)'
        ],
        cons: [
            'No guarantee of future pregnancy',
            'Expensive with ongoing storage fees',
            'Requires IVF to use frozen eggs',
            'Age affects egg quality at freezing'
        ],
        idealFor: [
            'Women delaying childbearing',
            'Before cancer treatment',
            'Career-focused individuals',
            'No current partner but want future family'
        ]
    }
];

const SuccessEstimator: React.FC = () => {
    const [age, setAge] = useState<number>(30);
    const [treatment, setTreatment] = useState<string>('ivf');

    const getSuccessRate = () => {
        const rates: Record<string, Record<string, string>> = {
            ivf: { '35': '41-43%', '37': '33-36%', '40': '23-27%', '42': '13-18%', '45': '3-7%' },
            iui: { '35': '13-18%', '37': '10-13%', '40': '7-9%', '42': '5-7%', '45': '3-5%' },
            'egg-freezing': { '30': '40-50%', '35': '30-40%', '38': '20-30%', '40': '10-20%', '45': '5-10%' }
        };
        
        const ageKey = age < 30 ? '30' : age < 35 ? '35' : age < 38 ? '38' : age < 42 ? '42' : '45';
        return rates[treatment][ageKey] || 'Varies';
    };

    return (
        <div className={styles.estimatorCard}>
            <h3>🎯 Success Rate Estimator</h3>
            <div className={styles.estimatorInputs}>
                <div className={styles.inputGroup}>
                    <label>Your Age</label>
                    <input 
                        type="range" 
                        min="25" 
                        max="45" 
                        value={age} 
                        onChange={(e) => setAge(parseInt(e.target.value))}
                    />
                    <span>{age} years</span>
                </div>
                <div className={styles.inputGroup}>
                    <label>Treatment Type</label>
                    <select value={treatment} onChange={(e) => setTreatment(e.target.value)}>
                        <option value="ivf">IVF</option>
                        <option value="iui">IUI</option>
                        <option value="egg-freezing">Egg Freezing</option>
                    </select>
                </div>
            </div>
            <div className={styles.successDisplay}>
                <span className={styles.successLabel}>Estimated Success Rate</span>
                <span className={styles.successRate}>{getSuccessRate()}</span>
                <span className={styles.successNote}>per cycle/retrieval</span>
            </div>
        </div>
    );
};

const FertilityJourney: React.FC = () => {
    const [selectedTreatment, setSelectedTreatment] = useState<string>('ivf');
    const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'pros-cons' | 'calculator'>('overview');

    const treatment = TREATMENTS.find(t => t.id === selectedTreatment);

    return (
        <div className={styles.pageContainer}>
            <InnerPageHero
                title="Fertility Journey"
                subtitle="Understand IVF, IUI, and egg freezing with interactive biological simulators and success estimators."
                badge="Planning"
            />

            <div className={styles.mainContent}>
                {/* Treatment Selector */}
                <section className={styles.treatmentSelector}>
                    <h2>Choose Your Path</h2>
                    <div className={styles.treatmentCards}>
                        {TREATMENTS.map(t => (
                            <button
                                key={t.id}
                                className={`${styles.treatmentCard} ${selectedTreatment === t.id ? styles.active : ''}`}
                                onClick={() => setSelectedTreatment(t.id)}
                            >
                                <span className={styles.treatmentIcon}>{t.icon}</span>
                                <span className={styles.treatmentName}>{t.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Treatment Detail */}
                {treatment && (
                    <section className={styles.treatmentDetail}>
                        <div className={styles.detailHeader}>
                            <h2>{treatment.icon} {treatment.name}</h2>
                            <p className={styles.description}>{treatment.description}</p>
                        </div>

                        {/* Quick Stats */}
                        <div className={styles.quickStats}>
                            <div className={styles.stat}>
                                <span className={styles.statLabel}>Duration</span>
                                <span className={styles.statValue}>{treatment.duration}</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statLabel}>Cost Range</span>
                                <span className={styles.statValue}>{treatment.cost}</span>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className={styles.tabs}>
                            <button 
                                className={activeTab === 'overview' ? styles.activeTab : ''}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button 
                                className={activeTab === 'steps' ? styles.activeTab : ''}
                                onClick={() => setActiveTab('steps')}
                            >
                                Process Steps
                            </button>
                            <button 
                                className={activeTab === 'pros-cons' ? styles.activeTab : ''}
                                onClick={() => setActiveTab('pros-cons')}
                            >
                                Pros & Cons
                            </button>
                            <button 
                                className={activeTab === 'calculator' ? styles.activeTab : ''}
                                onClick={() => setActiveTab('calculator')}
                            >
                                Success Calculator
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className={styles.tabContent}>
                            {activeTab === 'overview' && (
                                <div className={styles.overviewContent}>
                                    <div className={styles.idealFor}>
                                        <h4>✨ Ideal For</h4>
                                        <ul>
                                            {treatment.idealFor.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.successRates}>
                                        <h4>📊 Success Rates by Age</h4>
                                        <table className={styles.rateTable}>
                                            <thead>
                                                <tr>
                                                    <th>Age Group</th>
                                                    <th>Success Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {treatment.successRate.map((rate, idx) => (
                                                    <tr key={idx}>
                                                        <td>{rate.age}</td>
                                                        <td className={styles.rateValue}>{rate.rate}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'steps' && (
                                <div className={styles.stepsContent}>
                                    <h4>🔄 Treatment Process</h4>
                                    <div className={styles.stepsTimeline}>
                                        {treatment.steps.map((step, idx) => (
                                            <div key={idx} className={styles.step}>
                                                <span className={styles.stepNumber}>{idx + 1}</span>
                                                <span className={styles.stepText}>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'pros-cons' && (
                                <div className={styles.prosConsContent}>
                                    <div className={styles.pros}>
                                        <h4>✅ Advantages</h4>
                                        <ul>
                                            {treatment.pros.map((pro, idx) => (
                                                <li key={idx}>{pro}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h4>⚠️ Considerations</h4>
                                        <ul>
                                            {treatment.cons.map((con, idx) => (
                                                <li key={idx}>{con}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'calculator' && (
                                <div className={styles.calculatorContent}>
                                    <SuccessEstimator />
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaCard}>
                        <h3>Ready to Start Your Fertility Journey?</h3>
                        <p>Connect with fertility specialists who can guide you through the best options for your unique situation.</p>
                        <div className={styles.ctaButtons}>
                            <button className={styles.primaryBtn}>Find Fertility Specialist</button>
                            <button className={styles.secondaryBtn}>Book Consultation</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FertilityJourney;
