import React from "react";
import styles from "./Teleconsultation.module.css";
import InnerPageHero from "../shared/InnerPageHero";

const Teleconsultation: React.FC = () => {
    return (
        <div className={styles.telePage}>
            <InnerPageHero
                title="Teleconsultation Services"
                subtitle="Connect with women’s health specialists from the comfort and privacy of your home. Fast, secure, and confidential online consultations for triage, advice, and prescriptions."
                badge="Virtual Care"
                centered
            />

            <section className={styles.section} style={{ paddingTop: 0 }}>
                <div className={styles.container}>
                    <div className={styles.stepper} style={{ marginTop: '40px' }}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <h3>Choose Concern</h3>
                            <p>Periods, pelvic pain, fertility, pregnancy, menopause, or mental wellness.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <h3>Share Basics</h3>
                            <p>Complete a short digital intake so the specialist can prepare for your visit.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <h3>Video Consult</h3>
                            <p>Discuss your symptoms in real-time and receive a clear medical plan.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>4</div>
                            <h3>Next Steps</h3>
                            <p>Get prescriptions, referrals, lab orders, or guidance on in-person care.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section} style={{ background: '#fcf8fa' }}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2>Book by Specialty</h2>
                        <p style={{ color: '#666' }}>Pick the right expert for immediate resolution.</p>
                    </div>

                    <div className={styles.bookingGrid}>
                        <div className={styles.bcard}>
                            <h3><span>🩺</span> Gynecologist</h3>
                            <p style={{ flex: 1 }}>Best for: Periods, abnormal discharge, pelvic pain, or PCOS concerns.</p>
                            <p className={styles.price}>₹499 – ₹799</p>
                            <div className={styles.avail}>
                                <span className={styles.dot}></span>
                                Available Today
                            </div>
                            <button className={styles.btnBook}>Book Now</button>
                        </div>

                        <div className={styles.bcard}>
                            <h3><span>👶</span> OB / Pregnancy</h3>
                            <p style={{ flex: 1 }}>Best for: Pregnancy monitoring, prenatal questions, and postpartum follow-ups.</p>
                            <p className={styles.price}>₹699 – ₹999</p>
                            <div className={styles.avail}>
                                <span className={styles.dot}></span>
                                Available Today
                            </div>
                            <button className={styles.btnBook}>Book Now</button>
                        </div>

                        <div className={styles.bcard}>
                            <h3><span>🌱</span> Fertility Expert</h3>
                            <p style={{ flex: 1 }}>Best for: Conception planning, ovulation tracking, and fertility assessments.</p>
                            <p className={styles.price}>₹999 – ₹1499</p>
                            <div className={styles.avail}>
                                <span className={`${styles.dot} ${styles.dotAmber}`}></span>
                                Next Slot: Tomorrow
                            </div>
                            <button className={styles.btnBook}>Book Now</button>
                        </div>

                        <div className={styles.bcard}>
                            <h3><span>🧠</span> Mental Health</h3>
                            <p style={{ flex: 1 }}>Best for: Postpartum mood, hormonal anxiety, and mental wellbeing support.</p>
                            <p className={styles.price}>₹799 – ₹1299</p>
                            <div className={styles.avail}>
                                <span className={styles.dot}></span>
                                Available Now
                            </div>
                            <button className={styles.btnBook}>Book Now</button>
                        </div>
                    </div>

                    <div className={styles.alertCard}>
                        <span style={{ fontSize: '2rem' }}>🛡️</span>
                        <div>
                            <strong>Pro Tip:</strong>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>If your visit ends with a recommendation for vaccination or screening, our system will automatically guide you to the appropriate journey checklist.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className={styles.faq}>
                        <div className={styles.q}>
                            <h3>Is teleconsultation secure and private?</h3>
                            <p>Absolutely. We use encrypted video platforms and ensure all patient data is stored following strict privacy standards. We recommend using a private space for your visit.</p>
                        </div>
                        <div className={styles.q}>
                            <h3>Can I receive prescriptions digitally?</h3>
                            <p>Yes, doctors can provide digital prescriptions and referrals where clinically appropriate and within local regulatory guidelines.</p>
                        </div>
                        <div className={styles.q}>
                            <h3>When should I see a doctor in person instead?</h3>
                            <p>For physical examinations, imaging (ultrasounds), surgical procedures, or emergency evaluations, an in-person visit is required. You can use our 'Find Doctors' tool for these needs.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Teleconsultation;
