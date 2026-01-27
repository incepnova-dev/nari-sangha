import React from "react";
import styles from "../landing/landing.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

const Dashboard: React.FC = () => {
    // Mock data for dashboard
    const user = { name: "Priya" };
    const quickActions = [
        { title: "Book Appointment", icon: "📅", path: ROUTES.APPOINTMENTS, color: "#e91e63" },
        { title: "Log Symptoms", icon: "💊", path: ROUTES.SYMPTOM_CHECKER, color: "#d81b60" },
        { title: "Track Period", icon: "🩸", path: ROUTES.JOURNEYS, color: "#c2185b" },
    ];

    const stats = [
        { label: "Cycle Day", value: "14", sub: "Ovulation Phase", color: "#FCE4EC" },
        { label: "Wellness Score", value: "92/100", sub: "Improving", color: "#E8EAF6" },
    ];

    const reminders = [
        { title: "Annual Health Checkup", time: "Tomorrow, 10:00 AM", type: "medical" },
        { title: "Take Vitamin D", time: "Daily", type: "pill" },
    ];

    const recentActivity = [
        { text: "Completed Health Quiz", date: "2 hours ago", icon: "✅" },
        { text: "Read: 'Understanding Iron Deficiency'", date: "Yesterday", icon: "📖" },
    ];

    return (
        <div className="app-container" style={{ background: "var(--bg-cream)", minHeight: "100vh", paddingBottom: "80px" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #F06292 0%, #F8BBD0 100%)", padding: "100px 20px 60px", color: "white" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <h1 style={{ fontSize: "36px", fontWeight: "900", marginBottom: "8px" }}>Welcome back, {user.name}! 👋</h1>
                    <p style={{ fontSize: "18px", opacity: 0.9 }}>Your personal health dashboard is ready.</p>
                </div>
            </div>

            <div style={{ maxWidth: "1200px", margin: "-40px auto 0", padding: "0 20px", display: "grid", gap: "40px" }}>

                {/* Quick Actions */}
                <section>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                        {quickActions.map((action, idx) => (
                            <Link
                                key={idx}
                                to={action.path}
                                style={{
                                    background: "white",
                                    padding: "20px 32px",
                                    borderRadius: "20px",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    flex: "1",
                                    minWidth: "160px",
                                    transition: "transform 0.2s"
                                }}
                            >
                                <div style={{
                                    background: action.color,
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "24px",
                                    marginBottom: "12px",
                                    color: "white"
                                }}>{action.icon}</div>
                                <span style={{ color: "#333", fontWeight: "700", fontSize: "15px" }}>{action.title}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>

                    {/* Health Stats */}
                    <section style={{ background: "white", padding: "32px", borderRadius: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                        <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                            📊 Your Health Stats
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            {stats.map((stat, idx) => (
                                <div key={idx} style={{ background: stat.color, padding: "20px", borderRadius: "16px" }}>
                                    <div style={{ fontSize: "13px", color: "#555", marginBottom: "4px", textTransform: "uppercase", fontWeight: "700" }}>{stat.label}</div>
                                    <div style={{ fontSize: "28px", fontWeight: "900", color: "#333", marginBottom: "4px" }}>{stat.value}</div>
                                    <div style={{ fontSize: "13px", color: "#777" }}>{stat.sub}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Reminders */}
                    <section style={{ background: "white", padding: "32px", borderRadius: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                        <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                            🔔 Upcoming Reminders
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {reminders.map((reminder, idx) => (
                                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", background: "#FAFAFA", borderRadius: "16px", border: "1px solid #EEE" }}>
                                    <div style={{
                                        width: "8px",
                                        height: "40px",
                                        borderRadius: "4px",
                                        background: reminder.type === "medical" ? "#7B1FA2" : "#D81B60"
                                    }} />
                                    <div>
                                        <div style={{ fontWeight: "700", color: "#333" }}>{reminder.title}</div>
                                        <div style={{ fontSize: "14px", color: "#777" }}>{reminder.time}</div>
                                    </div>
                                    <button style={{ marginLeft: "auto", border: "none", background: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", cursor: "pointer" }}>Done</button>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Active Journey */}
                <section style={{ background: "white", padding: "32px", borderRadius: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "24px" }}>🌱 Your Active Journeys</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px", padding: "30px", background: "linear-gradient(to right, #FFF3E0, #FFE0B2)", borderRadius: "20px" }}>
                        <div style={{ flex: 1, minWidth: "280px" }}>
                            <div style={{
                                display: "inline-block",
                                padding: "6px 12px",
                                background: "white",
                                borderRadius: "20px",
                                fontSize: "12px",
                                fontWeight: "800",
                                color: "#F57C00",
                                marginBottom: "12px"
                            }}>pregnancy-journey-week-22</div>
                            <h2 style={{ fontSize: "24px", marginBottom: "8px", fontWeight: "800" }}>Pregnancy • Week 22</h2>
                            <p style={{ marginBottom: "20px", opacity: 0.8 }}>You're doing great! Baby is the size of a coconut.</p>
                            <div style={{ background: "rgba(255,255,255,0.5)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                                <div style={{ width: "55%", height: "100%", background: "#EF6C00" }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", marginTop: "8px", opacity: 0.7 }}>
                                <span>Week 1</span>
                                <span>Week 40</span>
                            </div>
                        </div>
                        <Link to={ROUTES.PREGNANCY} className={styles.primaryCta} style={{ background: "white", color: "#E65100" }}>
                            View Daily Update
                        </Link>
                    </div>
                </section>

                {/* Recent Activity */}
                <section style={{ marginBottom: "40px" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "24px", textAlign: "center" }}>Recent Activity</h3>
                    <div style={{ background: "white", borderRadius: "24px", overflow: "hidden", maxWidth: "800px", margin: "0 auto", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                        {recentActivity.map((act, idx) => (
                            <div key={idx} style={{
                                padding: "20px 30px",
                                borderBottom: idx !== recentActivity.length - 1 ? "1px solid #F5F5F5" : "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px"
                            }}>
                                <span style={{ fontSize: "20px" }}>{act.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: "600", color: "#333" }}>{act.text}</div>
                                    <div style={{ fontSize: "12px", color: "#999" }}>{act.date}</div>
                                </div>
                                <button style={{ color: "var(--pink)", fontWeight: "700", background: "none", border: "none", cursor: "pointer" }}>Details</button>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Dashboard;
