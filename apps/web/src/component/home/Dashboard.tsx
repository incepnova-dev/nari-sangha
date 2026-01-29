import React from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

const Dashboard: React.FC = () => {
    const user = { name: "Priya" };

    const quickActions = [
        { title: "Book Appointment", icon: "📅", path: ROUTES.TELECONSULTATION, color: "linear-gradient(135deg, #667eea, #764ba2)", desc: "Schedule your next consultation" },
        { title: "Refill Prescription", icon: "💊", path: ROUTES.PRODUCTS, color: "linear-gradient(135deg, #f093fb, #f5576c)", desc: "Request refills for medications" },
        { title: "View Test Records", icon: "📋", path: "#", color: "linear-gradient(135deg, #4facfe, #00f2fe)", desc: "Access latest lab reports" },
    ];

    const stats = [
        { label: "Cycle Day", value: "Day 14", sub: "Peak fertility window", progress: 50, icon: "🗓️" },
        { label: "Pregnancy Week", value: "Week 22", sub: "Second trimester", progress: 55, icon: "👶" },
        { label: "Completed Goals", value: "17/20", sub: "85% achievement rate", progress: 85, icon: "🎯" },
        { label: "Wellness Score", value: "92/100", sub: "Excellent health status", progress: 92, icon: "❤️" },
    ];

    const reminders = [
        { day: "25", month: "FEB", title: "Annual Pap Smear Screening", provider: "Dr. Sarah Johnson", time: "10:00 AM", type: "medical" },
        { day: "10", month: "MAR", title: "Prenatal Checkup - Week 24", provider: "Maternity Care Clinic", time: "02:30 PM", type: "baby" },
        { day: "15", month: "MAR", title: "Mammogram Screening", provider: "City Imaging Center", time: "09:00 AM", type: "shield" },
    ];

    return (
        <div className={styles.dashboardPage}>
            <header className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroGrid}>
                        <div>
                            <h1 className={styles.welcomeTitle}>Welcome back, {user.name}! 👋</h1>
                            <p className={styles.heroSubtitle}>Your personalized health companion is keeping everything on track. You have 3 upcoming milestones this month.</p>
                            <div className={styles.badgeRow}>
                                <span className={styles.badge}>🔔 3 Reminders</span>
                                <span className={styles.badge}>🌱 2 Active Journeys</span>
                                <span className={styles.badge}>🎯 85% Goals</span>
                            </div>
                        </div>
                        <div className={styles.heroMedia}>
                            <img src="https://images.unsplash.com/photo-1543332164-6e82f355bacd?w=800" alt="Dashboard" />
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.container}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🚀 Quick Actions</h2>
                    <div className={styles.actionGrid}>
                        {quickActions.map((action, idx) => (
                            <Link key={idx} to={action.path} className={styles.actionCard}>
                                <div className={styles.actionIcon} style={{ background: action.color }}>{action.icon}</div>
                                <h3>{action.title}</h3>
                                <p>{action.desc}</p>
                                <span className={styles.actionBtn}>Select Action</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>📊 Your Health Metrics</h2>
                    <div className={styles.statsGrid}>
                        {stats.map((stat, idx) => (
                            <div key={idx} className={styles.statCard}>
                                <div className={styles.statHeader}>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                    <span className={styles.statIcon}>{stat.icon}</span>
                                </div>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${stat.progress}%` }}></div>
                                </div>
                                <p className={styles.statSub}>{stat.sub}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className={styles.mainGrid}>
                    <section className={styles.remindersSection}>
                        <h2 className={styles.sectionTitle}>🔔 Upcoming Milestones</h2>
                        <div className={styles.reminderList}>
                            {reminders.map((rem, idx) => (
                                <div key={idx} className={styles.reminderItem}>
                                    <div className={styles.reminderDate}>
                                        <span className={styles.day}>{rem.day}</span>
                                        <span className={styles.month}>{rem.month}</span>
                                    </div>
                                    <div className={styles.reminderContent}>
                                        <h3>{rem.title}</h3>
                                        <p>📍 {rem.provider}</p>
                                        <p>🕒 {rem.time}</p>
                                    </div>
                                    <button className={styles.btnReminder}>Reschedule</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className={styles.sidePanel}>
                        <div className={styles.journeyCard}>
                            <div className={styles.journeyHeader}>
                                <h3>👶 Pregnancy Journey</h3>
                                <span className={styles.activeBadge}>Active</span>
                            </div>
                            <p>Week 22: Baby is the size of a coconut!</p>
                            <div className={styles.progressBar} style={{ height: '10px' }}>
                                <div className={styles.progressFill} style={{ width: '55%', background: '#ff9800' }}></div>
                            </div>
                            <Link to={ROUTES.PREGNANCY} className={styles.btnLink}>Continue Journey →</Link>
                        </div>

                        <div className={styles.recommendationCard}>
                            <h3>💡 Recommended for You</h3>
                            <p>"Second Trimester Nutrition: Essential Vitamins for Baby's Growth"</p>
                            <a href="#" className={styles.btnLinkSmall}>Read Article</a>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
