import React from "react";
import styles from "./InsuranceGuide.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { insurancePlans } from "../../data/seed";
import InsuranceCard from "../shared/InsuranceCard";

const InsuranceGuide: React.FC = () => {
    const coverageBasics = [
        { title: "Plan Type", icon: "🆔", desc: "HMO, PPO, or EPO affects your network and referral requirements." },
        { title: "Network Status", icon: "🌐", desc: "In-network providers cost significantly less and have simpler claims." },
        { title: "Financials", icon: "💰", desc: "Know your deductible and copay before booking specialized care." },
        { title: "Prior Auth", icon: "📋", desc: "Some imaging and lab tests require insurance approval first." },
    ];

    const questionsToAsk = [
        "Are you in-network for my specific insurance plan and tier?",
        "What is the estimated patient responsibility for this type of visit?",
        "Do you bill as an 'office visit' or 'telehealth' for virtual care?",
        "Are laboratory tests and imaging billed separately from the consultation?",
        "Do I need a prior authorization or a referral from a GP?"
    ];

    return (
        <div className={styles.insurancePage}>
            <InnerPageHero
                title="Insurance & Coverage Guide"
                subtitle="Demystifying health insurance so you can focus on your wellness. Understand your benefits, prepare for clinic visits, and avoid financial surprises."
                badge="Financial Wellness"
                centered
            />

            {/* Insurance Plans Section */}
            <section className={styles.section} style={{ background: '#fce4ec', padding: '80px 20px' }}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span style={{
                            background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
                            color: '#1565C0',
                            fontSize: '12px',
                            fontWeight: '800',
                            padding: '6px 16px',
                            borderRadius: '999px',
                            display: 'inline-block',
                            marginBottom: '16px',
                            letterSpacing: '0.5px'
                        }}>PROTECT YOUR HEALTH</span>
                        <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px', color: '#1a1a1a' }}>Insurance Plans</h2>
                        <p style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                            Comprehensive coverage designed specifically for women's healthcare needs
                        </p>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '32px',
                        marginBottom: '40px'
                    }}>
                        {insurancePlans.map((plan) => (
                            <InsuranceCard key={plan.id} plan={plan} />
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section} style={{ paddingTop: 0 }}>
                <div className={styles.container}>
                    <div className={styles.basicsGrid} style={{ marginTop: '-40px' }}>
                        {coverageBasics.map((item, idx) => (
                            <div key={idx} className={styles.basicCard}>
                                <div className={styles.icon}>{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.checklistSplit}>
                        <div className={styles.panel}>
                            <h2>📜 Pre-Booking Checklist</h2>
                            <ul className={styles.checklist}>
                                <li>Verify clinic/doctor is currently in-network</li>
                                <li>Check if a referral is needed (HMO plans)</li>
                                <li>Confirm teleconsultation coverage for virtual visits</li>
                                <li>Check laboratory & ultrasound coverage locations</li>
                                <li>Verify specific maternity or screening coverage limits</li>
                            </ul>
                        </div>
                        <div className={styles.panel} style={{ background: '#f8f4f6' }}>
                            <h2>💬 Questions for the Clinic</h2>
                            <p style={{ marginBottom: '20px', color: '#666' }}>Copy and paste these when calling a new provider:</p>
                            <div className={styles.questionList}>
                                {questionsToAsk.map((q, idx) => (
                                    <div key={idx} className={styles.questionItem}>
                                        <span className={styles.qNum}>{idx + 1}</span>
                                        <p>{q}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section} style={{ background: 'linear-gradient(135deg, #ec407a 0%, #d81b60 100%)', color: 'white' }}>
                <div className={styles.container}>
                    <div className={styles.ctaBox}>
                        <h2>Ready to move forward?</h2>
                        <p>Once you've clarified your coverage, you can find a specialist or book a virtual consultation with confidence.</p>
                        <div className={styles.btnRow}>
                            <Link to={ROUTES.FIND_DOCTORS} className={styles.btnSecondary}>Find Specialists</Link>
                            <Link to={ROUTES.TELECONSULTATION} className={styles.btnWhite}>Book Teleconsultation</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InsuranceGuide;
