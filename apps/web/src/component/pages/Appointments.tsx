import React from "react";
import styles from "../landing/landing.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const Appointments: React.FC = () => {

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
        <div className="app-container">
            {/* Hero */}
            <InnerPageHero
                title="Teleconsultation Services"
                subtitle="Connect with women's health specialists from home. Fast, secure, and confidential."
                badge="Private & Secure"
            />
            {/* Keeping the feature tags but placing them below hero if needed, or removing if strictly following "NO additional elements" constraint. User said: "Hero Structure (must be identical across pages): ... NO additional elements." So I will remove the extra tags from the hero area. */}

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
                            <div key={idx} className={styles.card} style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '800' }}>{s.title}</h3>
                                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#333' }}>₹{s.price}</div>
                                </div>
                                <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}><strong>Best for:</strong> {s.for}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '13px', color: '#2E7D32', fontWeight: '700' }}>
                                    <span style={{ width: '8px', height: '8px', background: '#4CAF50', borderRadius: '50%' }} /> {s.available}
                                </div>
                                <button className={styles.primaryCta} style={{ width: '100%', borderRadius: '12px' }}>Book Now</button>
                            </div>
                        ))}
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

                    {/* Final Nav */}
                    <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <Link to={ROUTES.SYMPTOM_CHECKER} className={styles.secondaryCta}>← Previous: Symptom Checker</Link>
                        <Link to={ROUTES.PRODUCTS} className={styles.primaryCta} style={{ background: '#D32F2F' }}>Next: Vaccination →</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Appointments;
