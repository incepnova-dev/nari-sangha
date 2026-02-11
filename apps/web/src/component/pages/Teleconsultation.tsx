import React from "react";
import styles from "./Teleconsultation.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import ConsultAnimation from "../shared/animations/ConsultAnimation";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routeConstants";

const Teleconsultation: React.FC = () => {
    const navigate = useNavigate();

    const steps = [
        { num: 1, title: "Choose Concern", desc: "Select a specialty usually based on your symptom." },
        { num: 2, title: "Share Basics", desc: "Short intake so the doctor can prepare." },
        { num: 3, title: "Video Consult", desc: "Secure video call with your specialist." },
        { num: 4, title: "Next Steps", desc: "Get prescriptions, referrals, or care plans." },
    ];

    const specialties = [
        { title: "Gynecologist", for: "Periods, discharge, PCOS", price: "499", available: "Available Today" },
        { title: "Pregnancy Care", for: "Prenatal questions, monitoring", price: "699", available: "Available Today" },
        { title: "Fertility Specialist", for: "TTC, ovulation, IVF prep", price: "999", available: "Next slot tomorrow" },
        { title: "Mental Health", for: "Postpartum, anxiety, hormonal mood", price: "799", available: "Available Now" },
    ];

    const faq = [
        { q: "Is teleconsultation private?", a: "Yes. Use a private space and secure device for best confidentiality." },
        { q: "Can I get prescriptions?", a: "Doctors can recommend treatment and share prescriptions depending on your case." },
    ];

    return (
        <div className={styles.telePage}>
            <InnerPageHero
                title="Teleconsultation Services"
                subtitle="Connect with women's health specialists from home. Fast, secure, and confidential."
                badge="Private & Secure"
                illustration={<ConsultAnimation />}
            />

            <div style={{ background: 'var(--theme-bg-accent)' }}>
                <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 20px 80px' }}>

                    {/* How it works */}
                    <div style={{ textAlign: 'center', margin: '60px 0' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '40px' }}>How it works</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                            {steps.map(step => (
                                <div key={step.num} style={{ background: 'white', padding: '24px', borderRadius: '16px', textAlign: 'left', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                    <div style={{ width: '32px', height: '32px', background: '#E3F2FD', color: '#1565C0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '16px' }}>{step.num}</div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>{step.title}</h4>
                                    <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Specialties */}
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '30px', textAlign: 'center' }}>Book by Specialty</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {specialties.map((s, idx) => (
                            <div key={idx} style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '800' }}>{s.title}</h3>
                                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#333' }}>₹{s.price}</div>
                                </div>
                                <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}><strong>Best for:</strong> {s.for}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '13px', color: '#2E7D32', fontWeight: '700' }}>
                                    <span style={{ width: '8px', height: '8px', background: '#4CAF50', borderRadius: '50%' }} /> {s.available}
                                </div>
                                <button
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: 'linear-gradient(135deg, #d81b60, #f06292)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onClick={() => navigate(ROUTES.TELECONSULTATION)}
                                >
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced stepper from original Teleconsultation */}
                    <div style={{ marginTop: '60px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '40px' }}>Complete Process</h2>
                        <div className={styles.stepper} style={{ marginTop: '40px', justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
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

                    {/* Booking options with icons */}
                    <div style={{ marginTop: '60px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '40px' }}>Book by Specialty</h2>
                        <div className={styles.bookingGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
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

                        <div className={styles.alertCard} style={{ marginTop: '40px', maxWidth: '600px', margin: '60px auto', background: '#f0f8ff', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '2rem' }}>🛡️</span>
                            <div>
                                <strong>Pro Tip:</strong>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>If your visit ends with a recommendation for vaccination or screening, our system will automatically guide you to the appropriate journey checklist.</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div style={{ marginTop: '80px', maxWidth: '800px', margin: '80px auto 0' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px', textAlign: 'center' }}>FAQ</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {faq.map((f, idx) => (
                                <div key={idx} style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #eee' }}>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{f.q}</h4>
                                    <p style={{ fontSize: '14px', color: '#666' }}>{f.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced FAQ from original Teleconsultation */}
                    <div className={styles.faq} style={{ marginTop: '60px', maxWidth: '800px', margin: '60px auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
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

                    {/* Final Nav */}
                    <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <Link to={ROUTES.SYMPTOM_CHECKER} style={{ 
                            padding: '12px 24px', 
                            background: 'white', 
                            color: '#d81b60', 
                            border: '1px solid #d81b60', 
                            borderRadius: '30px', 
                            fontSize: '14px', 
                            fontWeight: 700, 
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer'
                        }}>← Previous: Symptom Checker</Link>
                        <Link to={ROUTES.VACCINATION} style={{ 
                            padding: '12px 24px', 
                            background: '#D32F2F', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '30px', 
                            fontSize: '14px', 
                            fontWeight: 700, 
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer'
                        }}>Next: Vaccination →</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Teleconsultation;
