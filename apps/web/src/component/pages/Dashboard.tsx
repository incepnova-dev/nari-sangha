import React, { useEffect } from 'react';
import styles from './Dashboard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../routes/Routes';

const Dashboard: React.FC = () => {
    // Scroll to top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    // Protect Route
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate(ROUTES.LANDING);
        }
    }, [isLoading, isAuthenticated, navigate]);

    // We don't need sign in click handler since we are likely authenticated or button is hidden
    const onSignInClick = () => { };

    if (isLoading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    if (!isAuthenticated) return null; // Redirecting...

    return (
        <div className={styles.dashboardPage}>
            <Navbar onSignInClick={onSignInClick} isAuthenticated={isAuthenticated} />

            {/* Hero Header */}
            <header className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroGreeting}>
                        <h1>Welcome back, Priya! 👋</h1>
                        <p>Your personalized health dashboard keeps you on track with reminders, progress tracking, and actionable next steps.</p>
                        <div className={styles.chipRow}>
                            <span className={styles.chip}>🔔 3 Reminders</span>
                            <span className={styles.chip}>📈 2 Active Journeys</span>
                            <span className={styles.chip}>🎯 85% Goals</span>
                        </div>
                    </div>
                    {/* Placeholder for hero image if needed, or keeping it clean */}
                </div>
            </header>

            {/* Quick Actions */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>⚡ Quick Actions</h2>
                    <p className={styles.sectionSubtitle}>Take immediate action with one click.</p>
                </div>

                <div className={styles.dashboardActions}>
                    <div className={styles.actionCard}>
                        <div className={styles.actionIcon} style={{ background: 'linear-gradient(135deg, #FF6B6B, #EE5253)' }}>
                            📅
                        </div>
                        <h3 className={styles.actionTitle}>Book Appointment</h3>
                        <p className={styles.actionDesc}>Schedule your next consultation with a specialist</p>
                        <Link to="/appointments" className={styles.actionButton}>Schedule Now</Link>
                    </div>

                    <div className={styles.actionCard}>
                        <div className={styles.actionIcon} style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
                            💊
                        </div>
                        <h3 className={styles.actionTitle}>Refill Prescription</h3>
                        <p className={styles.actionDesc}>Request refills for your regular medications</p>
                        <Link to="/products" className={styles.actionButton}>Request Refill</Link>
                    </div>

                    <div className={styles.actionCard}>
                        <div className={styles.actionIcon} style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
                            📄
                        </div>
                        <h3 className={styles.actionTitle}>View Test Results</h3>
                        <p className={styles.actionDesc}>Access your latest lab reports and records</p>
                        <button className={styles.actionButton}>View Records</button>
                    </div>
                </div>
            </section>

            {/* Health Stats */}
            <section className={styles.section} style={{ background: 'white' }}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>📊 Your Health Stats</h2>
                    <p className={styles.sectionSubtitle}>Track your wellness journey with key metrics.</p>
                </div>

                <div className={styles.healthStats}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statLabel}>Cycle Day</span>
                            <span style={{ fontSize: '24px' }}>📅</span>
                        </div>
                        <div className={styles.statValue}>Day 14</div>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: '50%' }}></div>
                        </div>
                        <p className={styles.statMeta}>Peak fertility window</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statLabel}>Pregnancy Week</span>
                            <span style={{ fontSize: '24px' }}>👶</span>
                        </div>
                        <div className={styles.statValue}>Week 22</div>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: '55%' }}></div>
                        </div>
                        <p className={styles.statMeta}>Second trimester</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statLabel}>Completed Goals</span>
                            <span style={{ fontSize: '24px' }}>🎯</span>
                        </div>
                        <div className={styles.statValue}>17/20</div>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: '85%' }}></div>
                        </div>
                        <p className={styles.statMeta}>85% achievement rate</p>
                    </div>
                </div>
            </section>

            {/* Upcoming Reminders */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>🔔 Upcoming Reminders</h2>
                    <p className={styles.sectionSubtitle}>Never miss an important health appointment or milestone.</p>
                </div>

                <div className={styles.reminderList}>
                    <div className={styles.reminderItem}>
                        <div className={styles.reminderDate}>
                            <span className={styles.day}>25</span>
                            <span className={styles.month}>FEB</span>
                        </div>
                        <div className={styles.reminderContent}>
                            <h3>Annual Pap Smear Screening</h3>
                            <div className={styles.reminderInfo}>
                                <span>👩‍⚕️ Dr. Sarah Johnson</span>
                                <span>• Women's Health Center</span>
                            </div>
                            <div className={styles.reminderInfo}>
                                <span>⏰ 10:00 AM - 11:00 AM</span>
                            </div>
                        </div>
                        <button className={styles.actionButton} style={{ width: 'auto', padding: '8px 20px', fontSize: '14px' }}>Reschedule</button>
                    </div>

                    <div className={styles.reminderItem}>
                        <div className={styles.reminderDate}>
                            <span className={styles.day}>10</span>
                            <span className={styles.month}>MAR</span>
                        </div>
                        <div className={styles.reminderContent}>
                            <h3>Prenatal Checkup - Week 24</h3>
                            <div className={styles.reminderInfo}>
                                <span>🏥 Maternity Care Clinic</span>
                            </div>
                            <div className={styles.reminderInfo}>
                                <span>👶 Ultrasound and glucose screening</span>
                            </div>
                        </div>
                        <button className={styles.actionButton} style={{ width: 'auto', padding: '8px 20px', fontSize: '14px' }}>Details</button>
                    </div>
                </div>
            </section>

            {/* Active Journeys */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>🗺️ Your Active Journeys</h2>
                    <p className={styles.sectionSubtitle}>Continue where you left off with personalized health paths.</p>
                </div>

                {/* Pregnancy Journey Card */}
                <div className={styles.journeyCardDash}>
                    <div className={styles.journeyHeaderDash}>
                        <div>
                            <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>👶 Pregnancy Journey - Week 22</h3>
                            <p style={{ color: '#666' }}>Your baby is now the size of a papaya! 🫑</p>
                        </div>
                        <span className={`${styles.statusBadge} ${styles.statusActive}`}>Active</span>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontWeight: 600, fontSize: '14px' }}>Journey Progress</span>
                            <span style={{ color: '#d81b60', fontWeight: 600, fontSize: '14px' }}>55% Complete</span>
                        </div>
                        <div className={styles.progressBar} style={{ height: '10px' }}>
                            <div className={styles.progressFill} style={{ width: '55%' }}></div>
                        </div>
                    </div>

                    <div className={styles.journeyGrid}>
                        <div className={styles.journeyStatBox}>
                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 700 }}>Next Milestone</p>
                            <p style={{ fontWeight: 700, fontSize: '16px' }}>Third Trimester Begins</p>
                        </div>
                        <div className={styles.journeyStatBox}>
                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 700 }}>Completed Tasks</p>
                            <p style={{ fontWeight: 700, fontSize: '16px' }}>14 of 25 Tasks</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Link to="/journeys/pregnancy" className={styles.actionButton} style={{ width: 'auto', padding: '12px 32px' }}>Continue Journey</Link>
                    </div>
                </div>
            </section>

            {/* Activity Feed */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>🕒 Recent Activity</h2>
                </div>

                <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                        <div className={`${styles.activityIcon} ${styles.iconSuccess}`}>✅</div>
                        <div>
                            <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>Completed Health Checkup</h4>
                            <p style={{ color: '#666', fontSize: '14px' }}>Annual wellness exam with Dr. Johnson</p>
                            <p style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>February 10, 2026</p>
                        </div>
                    </div>

                    <div className={styles.activityItem}>
                        <div className={`${styles.activityIcon} ${styles.iconInfo}`}>📄</div>
                        <div>
                            <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>Lab Results Available</h4>
                            <p style={{ color: '#666', fontSize: '14px' }}>Blood work and thyroid panel results ready</p>
                            <p style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>February 8, 2026</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Dashboard;
