import React, { useState } from "react";
import styles from "./VaccinationGuide.module.css";
import InnerPageHero from "../shared/InnerPageHero";

interface Vaccine {
    id: string;
    title: string;
    who: string;
    why: string;
    status: string;
    icon: string;
}

const VACCINES: Vaccine[] = [
    { id: "hpv", title: "HPV", who: "Ages 9-26 (Catch-up to 45)", why: "Reduces cervical cancer risk", status: "Critical", icon: "🛡️" },
    { id: "flu", title: "Influenza (Flu)", who: "All adults, annually", why: "Prevents seasonal complications", status: "Annual", icon: "💉" },
    { id: "tdap", title: "Tdap (Pregnancy)", who: "27-36 weeks (every pregnancy)", why: "Protects baby from whooping cough", status: "Priority", icon: "👶" },
    { id: "covid", title: "COVID-19", who: "All adults", why: "Reduced risk of severe illness", status: "Updated", icon: "🦠" },
];

const VaccinationGuide: React.FC = () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className={styles.vaccinationPage}>
            <InnerPageHero
                title="Vaccination Schedules & Guidance"
                subtitle="Stay protected with recommended vaccines through all life stages—including specialized advice for pregnancy and postpartum recovery."
                badge="Immunization Guide"
                centered
            />

            <section className={styles.section} style={{ paddingTop: 0 }}>
                <div className={styles.container}>
                    <div className={styles.tabContainer} style={{ marginTop: '-40px' }}>
                        <div className={styles.tabHeader}>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'pregnancy' ? styles.tabBtnActive : ''}`}
                                onClick={() => setActiveTab('pregnancy')}
                            >
                                Pregnancy Plan
                            </button>
                            <button
                                className={`${styles.tabBtn} ${activeTab === 'scheduler' ? styles.tabBtnActive : ''}`}
                                onClick={() => setActiveTab('scheduler')}
                            >
                                Set My Schedule
                            </button>
                        </div>

                        <div className={styles.tabContent}>
                            {activeTab === 'overview' && (
                                <div className={styles.overviewGrid}>
                                    {VACCINES.map(v => (
                                        <div key={v.id} className={styles.vaccineCard}>
                                            <span className={styles.vIcon}>{v.icon}</span>
                                            <h3>{v.title}</h3>
                                            <p><strong>Who:</strong> {v.who}</p>
                                            <p><strong>Why:</strong> {v.why}</p>
                                            <div className={styles.vBadge}>{v.status}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'pregnancy' && (
                                <div className={styles.pregnancyPlan}>
                                    <h2>Safe Vaccines During Pregnancy</h2>
                                    <p style={{ marginBottom: '24px', opacity: 0.8 }}>Protecting both you and your baby is a priority. Some vaccines are essential during pregnancy.</p>
                                    <div className={styles.timelineList}>
                                        <div className={styles.timelineItem}>
                                            <div className={styles.timeLabel}>27-36 Weeks</div>
                                            <div className={styles.timeContent}>
                                                <h4>Tdap Vaccine</h4>
                                                <p>Provides antibodies to your baby to protect them from whooping cough (pertussis) during their first few months of life.</p>
                                            </div>
                                        </div>
                                        <div className={styles.timelineItem}>
                                            <div className={styles.timeLabel}>Any Time</div>
                                            <div className={styles.timeContent}>
                                                <h4>Flu Shot</h4>
                                                <p>Flu is more likely to cause severe illness in pregnant women. Safe and recommended at any trimester.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'scheduler' && (
                                <div className={styles.schedulerInterface}>
                                    <h3>Personalized Vaccination Scheduler</h3>
                                    <p>Based on your age and health history, we'll create a custom tracking plan for your dashboard.</p>
                                    <div className={styles.formRow}>
                                        <input type="number" placeholder="Enter Your Age" className={styles.input} />
                                        <select className={styles.select}>
                                            <option>Currently Pregnant?</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                    <button className={styles.btnAction}>Generate My Schedule →</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section} style={{ background: '#fcf8fa' }}>
                <div className={styles.container}>
                    <div className={styles.alertCard}>
                        <span style={{ fontSize: '2rem' }}>💡</span>
                        <div>
                            <strong>Pro Tip:</strong>
                            <p>Most preventive vaccines are covered 100% by insurance under the Affordable Care Act. Check our 'Insurance & Products' page to verify your provider.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VaccinationGuide;
