import React from 'react';
import styles from '../landing/landing.module.css';
import InnerPageHero from '../shared/InnerPageHero';
// import { useI18n } from "../../hooks/useI18n";

const Community: React.FC = () => {
    // const { t } = useI18n(); // Keeping for future i18n support, though we use hardcoded for now

    const topics = [
        { title: "Pregnancy Journey", active: 350, icon: "🤰" },
        { title: "Trying to Conceive (TTC)", active: 120, icon: "💕" },
        { title: "Menopause & Perimenopause", active: 200, icon: "🧘‍♀️" },
        { title: "PCOS & Hormonal Health", active: 410, icon: "🌸" },
        { title: "Mental Wellness", active: 180, icon: "🧠" },
    ];

    const events = [
        { title: "Fertility & Nutrition Workshop", date: "Aug 15", time: "5:00 PM", type: "Webinar" },
        { title: "Prenatal Yoga Class", date: "Aug 18", time: "7:00 AM", type: "Live Session" },
        { title: "Mental Health Support Circle", date: "Aug 20", time: "6:00 PM", type: "Group Call" },
    ];

    return (
        <div className="app-container">
            {/* Hero */}
            <InnerPageHero
                title="Women's Health Community"
                subtitle="Connect, share, and find strength with women who understand your journey. Judgement-free, moderated, and safe."
                badge="Safe Space"
            />

            <div style={{ background: 'var(--theme-bg-accent)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px' }}>

                    {/* Stats / Intro */}
                    <div style={{ margin: '60px 0 60px', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--pink)' }}>10k+</div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#555' }}>Active Members</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--pink)' }}>50+</div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#555' }}>Expert Moderators</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--pink)' }}>Daily</div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#555' }}>Live Sessions</div>
                        </div>
                        <div>
                            <button className={styles.primaryCta} style={{ width: '100%' }}>Join Now</button>
                        </div>
                    </div>

                    {/* Popular Topics */}
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '30px', textAlign: 'center' }}>🔥 Popular Discussion Topics</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '80px' }}>
                        {topics.map((t, idx) => (
                            <div key={idx} style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.2s', cursor: 'pointer' }}>
                                <div style={{ fontSize: '24px', background: '#FFF0F5', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{t.title}</h4>
                                    <span style={{ fontSize: '12px', color: '#777' }}>🟢 {t.active} online now</span>
                                </div>
                                <button style={{ background: 'none', border: 'none', color: 'var(--pink)', fontWeight: '800' }}>Join</button>
                            </div>
                        ))}
                    </div>

                    {/* Events */}
                    <div style={{ background: '#F3E5F5', borderRadius: '32px', padding: '60px 40px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#AB47BC', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Live & Interactive</div>
                                    <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#4A148C' }}>Upcoming Events</h2>
                                </div>
                                <button style={{ background: 'white', color: '#4A148C', border: 'none', padding: '12px 24px', borderRadius: '24px', fontWeight: '700', cursor: 'pointer' }}>View Calendar</button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                {events.map((e, idx) => (
                                    <div key={idx} style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <span style={{ background: '#E1BEE7', color: '#4A148C', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '800' }}>{e.type}</span>
                                            <span style={{ fontWeight: '700', color: '#444' }}>{e.date} • {e.time}</span>
                                        </div>
                                        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>{e.title}</h3>
                                        <button style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '12px', background: 'transparent', fontWeight: '700', cursor: 'pointer' }}>Register</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Guidelines */}
                    <div style={{ marginTop: '80px', textAlign: 'center', maxWidth: '800px', margin: '80px auto 0' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>🛡️ Our Community Guidelines</h3>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {["Be Kind & Respectful", "Maintain Privacy", "No Medical Advice", "Report Harassment"].map(g => (
                                <div key={g} style={{ background: '#F5F5F5', padding: '12px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', color: '#555' }}>
                                    {g}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Community;
