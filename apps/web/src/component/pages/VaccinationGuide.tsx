import React, { useState } from "react";
import styles from "./VaccinationGuide.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import VaccineExplorer from "../shared/VaccineExplorer";
import MythBuster from "../shared/MythBuster";

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
                                <VaccineExplorer />
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
                                <MythBuster />
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
