import React from 'react';
import styles from './Community.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/Routes';

const Community: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        { 
            title: "Discussion Forums", 
            desc: "Ask questions, share experiences, and get advice from women who understand your journey", 
            icon: "💬", 
            badge: "12,456 active members", 
            badgeColor: "#ec4899"
        },
        { 
            title: "Support Groups", 
            desc: "Join topic-specific groups for pregnancy, fertility, menopause, chronic conditions", 
            icon: "❤️", 
            badge: "287 groups", 
            badgeColor: "#22c55e"
        },
        { 
            title: "Local Events & Meetups", 
            desc: "Attend workshops, wellness events, and meet other community members in person", 
            icon: "📅", 
            badge: "42 upcoming events", 
            badgeColor: "#f59e0b"
        },
        { 
            title: "Expert Q&A Sessions", 
            desc: "Live sessions with doctors, nutritionists, and wellness experts", 
            icon: "👩‍⚕️", 
            badge: "Weekly sessions", 
            badgeColor: "#3b82f6"
        },
        { 
            title: "Member Stories", 
            desc: "Read inspiring journeys and share your own experiences", 
            icon: "📖", 
            badge: "2,134 stories", 
            badgeColor: "#e91e63"
        },
        { 
            title: "Resources & Guides", 
            desc: "Member-curated resources, tips, and downloadable guides", 
            icon: "🎁", 
            badge: "Free access", 
            badgeColor: "#27ae60"
        }
    ];

    const topics = [
        { 
            title: "Pregnancy Journey", 
            desc: "Weekly updates, symptoms, preparing for baby, sharing ultrasound moments",
            posts: "8,234", 
            members: "3,456", 
            icon: "🤰", 
            updated: "5 min ago",
            color: "linear-gradient(135deg, #667eea, #764ba2)"
        },
        { 
            title: "Trying to Conceive (TTC)", 
            desc: "Support, tips, tracking ovulation, and encouragement during fertility journey",
            posts: "12,567", 
            members: "4,123", 
            icon: "💕", 
            updated: "12 min ago",
            color: "linear-gradient(135deg, #f093fb, #f5576c)"
        },
        { 
            title: "Menopause & Perimenopause", 
            desc: "Managing hot flashes, mood swings, HRT discussions, lifestyle tips",
            posts: "6,789", 
            members: "2,890", 
            icon: "🔥", 
            updated: "1 hour ago",
            color: "linear-gradient(135deg, #fa709a, #fee140)"
        },
        { 
            title: "Fitness & Nutrition", 
            desc: "Exercise routines, healthy eating, weight management, prenatal workouts",
            posts: "5,432", 
            members: "3,210", 
            icon: "💪", 
            updated: "2 hours ago",
            color: "linear-gradient(135deg, #4facfe, #00f2fe)"
        },
        { 
            title: "Mental Health & Wellness", 
            desc: "Anxiety, depression, self-care strategies, postpartum support",
            posts: "7,890", 
            members: "3,567", 
            icon: "🧘", 
            updated: "3 hours ago",
            color: "linear-gradient(135deg, #a8edea, #fed6e3)"
        },
        { 
            title: "Chronic Conditions", 
            desc: "PCOS, endometriosis, fibromyalgia, thyroid disorders support",
            posts: "9,123", 
            members: "2,456", 
            icon: "🎗️", 
            updated: "4 hours ago",
            color: "linear-gradient(135deg, #ff9a9e, #fecfef)"
        }
    ];

    const events = [
        { 
            title: "Fertility & Nutrition Workshop", 
            month: "FEB", 
            day: "15", 
            time: "6:00 PM - 7:30 PM EST",
            type: "Online Webinar",
            desc: "Learn how nutrition impacts fertility from Dr. Lisa Chen, reproductive endocrinologist",
            price: "Free"
        },
        { 
            title: "Prenatal Yoga Class", 
            month: "FEB", 
            day: "22", 
            time: "10:00 AM - 11:00 AM",
            type: "Wellness Center, NYC",
            desc: "Gentle yoga designed for expectant mothers. All trimesters welcome!",
            price: "$15"
        },
        { 
            title: "Women's Health Symposium", 
            month: "MAR", 
            day: "08", 
            time: "9:00 AM - 5:00 PM",
            type: "Convention Center, LA",
            desc: "Full-day event with expert speakers, vendor exhibits, and networking opportunities",
            price: "$50"
        }
    ];

    const testimonials = [
        { 
            name: "Sarah M.", 
            role: "TTC Community Member", 
            content: "The TTC community has been my lifeline during this difficult journey. The support, understanding, and hope shared here kept me going. I finally got my BFP after 18 months, and I couldn't have done it without this incredible group of women.",
            initial: "S", 
            color: "linear-gradient(135deg, #667eea, #764ba2)"
        },
        { 
            name: "Priya K.", 
            role: "Pregnancy Journey Member", 
            content: "As a first-time mom, I had so many questions and fears. This community provided expert advice, practical tips, and emotional support throughout my entire pregnancy. I made real friendships that continue after birth!",
            initial: "P", 
            color: "linear-gradient(135deg, #f093fb, #f5576c)"
        },
        { 
            name: "Lisa R.", 
            role: "Menopause Support Member", 
            content: "Navigating perimenopause felt isolating until I found this group. Finally, women who understand the hot flashes, mood swings, and sleep issues! The shared tips and medical insights have been invaluable.",
            initial: "L", 
            color: "linear-gradient(135deg, #4facfe, #00f2fe)"
        }
    ];

    const guidelines = [
        { 
            title: "Be Respectful", 
            desc: "Treat all members with kindness, compassion, and understanding. Every journey is unique.", 
            icon: "❤️",
            color: "linear-gradient(135deg, #667eea, #764ba2)"
        },
        { 
            title: "Privacy First", 
            desc: "Never share others' personal information. What's shared in the community stays in the community.", 
            icon: "🔒",
            color: "linear-gradient(135deg, #f093fb, #f5576c)"
        },
        { 
            title: "Support, Don't Judge", 
            desc: "Everyone's journey is different and valid. Offer support without judgment or criticism.", 
            icon: "🤝",
            color: "linear-gradient(135deg, #4facfe, #00f2fe)"
        },
        { 
            title: "Medical Disclaimer", 
            desc: "Community advice doesn't replace professional medical care. Always consult your doctor.", 
            icon: "🩺",
            color: "linear-gradient(135deg, #fa709a, #fee140)"
        }
    ];

    return (
        <div className={styles.communityPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroGrid}>
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>Women's Health Community 💕</h1>
                            <p className={styles.heroSubtitle}>
                                Connect with others, share experiences, find support, and join events focused on women's wellness. You're never alone on this journey.
                            </p>
                            <div className={styles.heroChips}>
                                <span className={styles.chip}>👥 12,456 Members</span>
                                <span className={styles.chip}>💬 Active Forums</span>
                                <span className={styles.chip}>📅 42 Events</span>
                            </div>
                            <button className={styles.joinButton} onClick={() => navigate(ROUTES.DASHBOARD)}>
                                👤 Join Community
                            </button>
                        </div>
                        <div className={styles.heroImage}>
                            <img 
                                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800" 
                                alt="Community" 
                                className={styles.heroImg}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Features */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>✨ Community Features</h2>
                    <p className={styles.sectionSubtitle}>Everything you need to connect, learn, and find support.</p>
                    
                    <div className={styles.featuresGrid}>
                        {features.map((f, idx) => (
                            <div key={idx} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{f.icon}</div>
                                <h3 className={styles.featureTitle}>{f.title}</h3>
                                <p className={styles.featureDesc}>{f.desc}</p>
                                <span 
                                    className={styles.featureBadge}
                                    style={{ backgroundColor: f.badgeColor + '22', color: f.badgeColor }}
                                >
                                    {f.badge}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Discussion Topics */}
            <section className={`${styles.section} ${styles.altSection}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>🔥 Popular Discussion Topics</h2>
                    <p className={styles.sectionSubtitle}>Join conversations that matter to you.</p>
                    
                    <div className={styles.topicsList}>
                        {topics.map((t, idx) => (
                            <div key={idx} className={styles.topicCard}>
                                <div 
                                    className={styles.topicIcon}
                                    style={{ background: t.color }}
                                >
                                    {t.icon}
                                </div>
                                <div className={styles.topicContent}>
                                    <h3 className={styles.topicTitle}>{t.title}</h3>
                                    <p className={styles.topicDesc}>{t.desc}</p>
                                    <div className={styles.topicStats}>
                                        <span>💬 {t.posts} posts</span>
                                        <span>👥 {t.members} members</span>
                                        <span>🕐 Updated {t.updated}</span>
                                    </div>
                                </div>
                                <button className={styles.joinTopicBtn}>Join</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>📅 Upcoming Events</h2>
                    <p className={styles.sectionSubtitle}>Workshops, webinars, and meetups to enhance your health journey.</p>
                    
                    <div className={styles.eventsGrid}>
                        {events.map((e, idx) => (
                            <div key={idx} className={styles.eventCard}>
                                <div className={styles.eventDate}>
                                    <span className={styles.eventMonth}>{e.month}</span>
                                    <span className={styles.eventDay}>{e.day}</span>
                                </div>
                                <div className={styles.eventInfo}>
                                    <h3 className={styles.eventTitle}>{e.title}</h3>
                                    <p className={styles.eventMeta}>📍 {e.type}</p>
                                    <p className={styles.eventMeta}>🕐 {e.time}</p>
                                    <p className={styles.eventDesc}>{e.desc}</p>
                                    <button className={styles.registerBtn}>
                                        Register {e.price === "Free" ? "Free" : `(${e.price})`}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Member Testimonials */}
            <section className={`${styles.section} ${styles.altSection}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>⭐ Member Testimonials</h2>
                    <p className={styles.sectionSubtitle}>Hear from women who found support and connection in our community.</p>
                    
                    <div className={styles.testimonialsGrid}>
                        {testimonials.map((t, idx) => (
                            <div key={idx} className={styles.testimonialCard}>
                                <span className={styles.quoteIcon}>"</span>
                                <p className={styles.testimonialContent}>"{t.content}"</p>
                                <div className={styles.testimonialAuthor}>
                                    <div 
                                        className={styles.authorAvatar}
                                        style={{ background: t.color }}
                                    >
                                        {t.initial}
                                    </div>
                                    <div className={styles.authorInfo}>
                                        <h4 className={styles.authorName}>{t.name}</h4>
                                        <p className={styles.authorRole}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Guidelines */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>🛡️ Community Guidelines</h2>
                    <p className={styles.sectionSubtitle}>Creating a safe, supportive space for all members.</p>
                    
                    <div className={styles.guidelinesGrid}>
                        {guidelines.map((g, idx) => (
                            <div key={idx} className={styles.guidelineCard}>
                                <div 
                                    className={styles.guidelineIcon}
                                    style={{ background: g.color }}
                                >
                                    {g.icon}
                                </div>
                                <h3 className={styles.guidelineTitle}>{g.title}</h3>
                                <p className={styles.guidelineDesc}>{g.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`${styles.section} ${styles.altSection}`}>
                <div className={styles.container}>
                    <div className={styles.ctaBox}>
                        <h2 className={styles.ctaTitle}>Ready to Join?</h2>
                        <p className={styles.ctaSubtitle}>Create your free account and become part of our supportive community.</p>
                        <div className={styles.ctaButtons}>
                            <button 
                                className={styles.ctaPrimary}
                                onClick={() => navigate(ROUTES.DASHBOARD)}
                            >
                                👤 Join Community
                            </button>
                            <button 
                                className={styles.ctaSecondary}
                                onClick={() => navigate(ROUTES.JOURNEYS)}
                            >
                                🛤️ Explore Journeys
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Community;
