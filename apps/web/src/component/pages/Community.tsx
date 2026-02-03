import React from 'react';
import styles from '../landing/landing.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/Routes';
import InnerPageHero from '../shared/InnerPageHero';
import CommunityAnimation from '../shared/animations/CommunityAnimation';

// import { useI18n } from "../../hooks/useI18n";

const Community: React.FC = () => {
    const navigate = useNavigate();
    // const { t } = useI18n(); // Keeping for future i18n support, though we use hardcoded for now

    // const { t } = useI18n(); // Keeping for future i18n support, though we use hardcoded for now

    const features = [
        { title: "Discussion Forums", desc: "Ask questions, share experiences, and get advice from women who understand your journey", icon: "💬", badge: "12k+ members", color: "#667eea" },
        { title: "Support Groups", desc: "Join topic-specific groups for pregnancy, fertility, menopause, chronic conditions", icon: "❤️", badge: "280+ groups", color: "var(--pink)" },
        { title: "Expert Q&A", desc: "Live sessions with doctors, nutritionists, and wellness experts", icon: "🩺", badge: "Weekly", color: "#4facfe" },
    ];

    const topics = [
        { title: "Pregnancy Journey", active: 3456, posts: 8234, icon: "🤰", updated: "5 min ago", color: "linear-gradient(135deg, #667eea, #764ba2)" },
        { title: "Trying to Conceive (TTC)", active: 4123, posts: 12567, icon: "💕", updated: "12 min ago", color: "linear-gradient(135deg, #f093fb, #f5576c)" },
        { title: "Menopause Support", active: 2890, posts: 6789, icon: "🧘‍♀️", updated: "1 hour ago", color: "linear-gradient(135deg, #fa709a, #fee140)" },
        { title: "Mental Wellness", active: 3567, posts: 7890, icon: "🧠", updated: "3 hours ago", color: "linear-gradient(135deg, #a8edea, #fed6e3)" },
    ];

    const events = [
        { title: "Fertility & Nutrition Workshop", month: "AUG", day: "15", time: "5:00 PM", type: "Webinar", location: "Online", desc: "Learn how nutrition impacts fertility from Dr. Lisa Chen." },
        { title: "Prenatal Yoga Class", month: "AUG", day: "18", time: "7:00 AM", type: "Live Session", location: "NYC Center", desc: "Gentle yoga designed for expectant mothers." },
        { title: "Mental Health Support Circle", month: "AUG", day: "20", time: "6:00 PM", type: "Group Call", location: "Online", desc: "A safe space to share and support each other." },
    ];

    const testimonials = [
        { name: "Sarah M.", role: "TTC Member", content: "The TTC community has been my lifeline. The support and hope shared here kept me going during difficult times.", initial: "S", color: "#667eea" },
        { name: "Priya K.", role: "Pregnancy Member", content: "As a first-time mom, I had so many fears. This community provided expert advice and emotional support throughout my journey.", initial: "P", color: "var(--pink)" },
        { name: "Lisa R.", role: "Menopause Member", content: "Navigating perimenopause felt isolating until I found this group. Finally, women who understand the hot flashes and mood swings!", initial: "L", color: "#4facfe" },
    ];

    return (
        <div className="app-container">
            {/* Hero */}
            <InnerPageHero
                title="Women's Health Community"
                subtitle="Connect, share, and find strength with women who understand your journey. Judgement-free, moderated, and safe."
                badge="Safe Space"
                illustration={<CommunityAnimation />}
            >
                <div style={{ marginBottom: '15px' }}>
                    <button
                        onClick={() => navigate(ROUTES.JOURNEYS)}
                        style={{
                            padding: '8px 16px',
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px solid rgba(255,255,255,0.4)',
                            color: 'white',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 600,
                            backdropFilter: 'blur(5px)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        ← Back to Paths
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>👥 12k+ Members</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>💬 Active Forums</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>📅 42 Events</span>
                </div>
            </InnerPageHero>

            <div style={{ background: 'var(--theme-bg-accent)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px' }}>

                    {/* Stats / Intro */}
                    <div style={{ margin: '40px 0 60px', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--pink)' }}>12k+</div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#555' }}>Active Members</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--pink)' }}>50+</div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#555' }}>Expert Moderators</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--pink)' }}>42</div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#555' }}>Upcoming Events</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button className={styles.primaryCta} style={{ width: '100%' }} onClick={() => navigate(ROUTES.DASHBOARD)}>Join Now</button>
                        </div>

                    </div>

                    {/* Features */}
                    <div style={{ marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px', textAlign: 'center' }}>✨ Community Features</h2>
                        <p style={{ color: '#666', textAlign: 'center', marginBottom: '40px' }}>Everything you need to connect, learn, and find support.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                            {features.map((f, idx) => (
                                <div key={idx} className={styles.card} style={{ padding: '32px', background: 'white', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                                    <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
                                    <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>{f.title}</h3>
                                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{f.desc}</p>
                                    <span style={{ background: f.color + '22', color: f.color, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>{f.badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Popular Topics */}
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px', textAlign: 'center' }}>🔥 Popular Discussion Topics</h2>
                    <p style={{ color: '#666', textAlign: 'center', marginBottom: '40px' }}>Join conversations that matter to you.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '80px' }}>
                        {topics.map((t, idx) => (
                            <div key={idx} style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #eee', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '24px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ fontSize: '28px', background: t.color, color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.icon}</div>
                                <div>
                                    <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>{t.title}</h4>
                                    <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#666' }}>
                                        <span>💬 {t.posts} posts</span>
                                        <span>👥 {t.active} members</span>
                                        <span>🕙 Updated {t.updated}</span>
                                    </div>
                                </div>
                                {/* <button className={styles.secondaryCta} style={{ padding: '8px 24px' }} onClick={() => navigate(ROUTES.STORIES)}>Join Group</button> */}

                            </div>
                        ))}
                    </div>

                    {/* Events */}
                    <div style={{ background: '#F3E5F5', borderRadius: '40px', padding: '60px 40px', marginBottom: '80px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#AB47BC', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Live & Interactive</div>
                                <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#4A148C' }}>Upcoming Events</h2>
                            </div>
                            <button style={{ background: 'white', color: '#4A148C', border: 'none', padding: '12px 24px', borderRadius: '24px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>View Calendar</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                            {events.map((e, idx) => (
                                <div key={idx} style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', gap: '20px', transition: 'all 0.3s' }}>
                                    <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', borderRadius: '16px', padding: '12px', textAlign: 'center', minWidth: '80px', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '12px', opacity: 0.9, fontWeight: '700' }}>{e.month}</span>
                                        <span style={{ fontSize: '28px', fontWeight: '900', lineHeight: 1 }}>{e.day}</span>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ color: '#AB47BC', fontSize: '12px', fontWeight: '800' }}>{e.type}</span>
                                            <span style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>{e.time}</span>
                                        </div>
                                        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>{e.title}</h3>
                                        <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', marginBottom: '16px' }}>{e.desc}</p>
                                        <button className={styles.primaryCta} style={{ width: '100%', padding: '10px', fontSize: '12px' }}>Register Free</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div style={{ marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px', textAlign: 'center' }}>⭐ Member Testimonials</h2>
                        <p style={{ color: '#666', textAlign: 'center', marginBottom: '40px' }}>Hear from women who found support and connection in our community.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            {testimonials.map((t, idx) => (
                                <div key={idx} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'relative' }}>
                                    <div style={{ fontSize: '48px', color: 'var(--pink)', opacity: 0.1, position: 'absolute', top: '20px', right: '30px' }}>“</div>
                                    <p style={{ fontStyle: 'italic', color: '#444', lineHeight: '1.7', marginBottom: '24px' }}>"{t.content}"</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ width: '50px', height: '50px', background: t.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900' }}>{t.initial}</div>
                                        <div>
                                            <h4 style={{ fontWeight: '800', fontSize: '16px' }}>{t.name}</h4>
                                            <p style={{ fontSize: '13px', color: '#777' }}>{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Guidelines */}
                    <div style={{ marginTop: '40px', textAlign: 'center', maxWidth: '1000px', margin: '40px auto 0' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px' }}>🛡️ Community Guidelines</h2>
                        <p style={{ color: '#666', marginBottom: '40px' }}>Creating a safe, supportive space for all members.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                            {[
                                { title: "Be Kind & Respectful", desc: "Treat all members with compassion. Every journey is unique.", icon: "❤️" },
                                { title: "Maintain Privacy", desc: "Never share others' personal info. What's shared here stays here.", icon: "🔒" },
                                { title: "No Judgment", desc: "Validating every journey without criticism or judgment.", icon: "🤝" },
                                { title: "Medical Disclaimer", desc: "Advice here doesn't replace professional medical care.", icon: "🩺" }
                            ].map(g => (
                                <div key={g.title} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '32px', marginBottom: '16px' }}>{g.icon}</div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>{g.title}</h4>
                                    <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{g.desc}</p>
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
