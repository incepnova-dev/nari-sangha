import React, { useState, useEffect } from "react";
import styles from "../landing/landing.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routeConstants";

const About: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedStats, setAnimatedStats] = useState([
        { label: "Women supported", value: 0, target: 50000, suffix: "+", sub: "Across life stages" },
        { label: "Expert network", value: 0, target: 120, suffix: "+", sub: "Doctors & mentors" },
        { label: "Support", value: 0, target: 24, suffix: "×7", sub: "Journeys & tools" },
        { label: "Languages", value: 0, target: 8, suffix: "+", sub: "Regional dialects" }
    ]);

    // Animation for stats counter
    useEffect(() => {
        setIsVisible(true);
        
        const timers = animatedStats.map((stat, index) => {
            const increment = Math.ceil(stat.target / 50);
            const interval = setInterval(() => {
                setAnimatedStats(prev => {
                    const newStats = [...prev];
                    if (newStats[index].value < newStats[index].target) {
                        newStats[index].value = Math.min(
                            newStats[index].value + increment,
                            newStats[index].target
                        );
                    } else {
                        clearInterval(interval);
                    }
                    return newStats;
                });
            }, 30);
            return interval;
        });

        return () => timers.forEach(timer => clearInterval(timer));
    }, []);

    const enhancedStats = [
        { label: "Women supported", value: animatedStats[0].value.toLocaleString() + animatedStats[0].suffix, sub: "Across life stages", icon: "👩" },
        { label: "Expert network", value: animatedStats[1].value + animatedStats[1].suffix, sub: "Doctors & mentors", icon: "👩‍⚕️" },
        { label: "Support", value: animatedStats[2].value + animatedStats[2].suffix, sub: "Journeys & tools", icon: "⏰" },
        { label: "Languages", value: animatedStats[3].value + animatedStats[3].suffix, sub: "Regional dialects", icon: "🗣️" }
    ];

    const values = [
        { 
            title: "Compassion first", 
            desc: "Every journey is personal. We treat symptoms and stigma with empathy.", 
            icon: "❤️",
            color: "#FF6B9D"
        },
        { 
            title: "Evidence-based care", 
            desc: "All guidance is rooted in clinical guidelines and expert review.", 
            icon: "🛡️",
            color: "#4CAF50"
        },
        { 
            title: "Quality information", 
            desc: "We prioritize clarity, accuracy, and Indian context over sensation.", 
            icon: "⭐",
            color: "#FFC107"
        },
        { 
            title: "Community support", 
            desc: "Women learn best from women. Shared experiences help you feel prepared.", 
            icon: "👥",
            color: "#2196F3"
        }
    ];

    const supportFeatures = [
        { 
            title: "Guided Journeys", 
            desc: "Step-by-step pathways aligned with local realities.", 
            icon: "🛣️",
            gradient: "linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)"
        },
        { 
            title: "Symptom Education", 
            desc: "Plain language explanations for better health literacy.", 
            icon: "🩺",
            gradient: "linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)"
        },
        { 
            title: "Bridging Offline Care", 
            desc: "Tools to prepare for and understand doctor visits.", 
            icon: "🤝",
            gradient: "linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)"
        },
        { 
            title: "Community Support", 
            desc: "Connect with others who share similar experiences.", 
            icon: "💬",
            gradient: "linear-gradient(135deg, #FFD89B 0%, #19547B 100%)"
        }
    ];

    const teamMembers = [
        { name: "Dr. Priya Sharma", role: "Chief Medical Officer", bio: "20+ years in women's health", image: "👩‍⚕️" },
        { name: "Anjali Patel", role: "Head of Product", bio: "Former Google UX lead", image: "👩‍💻" },
        { name: "Meera Singh", role: "Community Director", bio: "Social entrepreneur", image: "👩‍💼" },
        { name: "Dr. Karthik Rao", role: "Technical Advisor", bio: "AI in healthcare expert", image: "👨‍🔬" }
    ];

    const milestones = [
        { year: "2022", event: "Platform Launch", description: "Started with menstrual health journeys" },
        { year: "2023", event: "Expert Network Growth", description: "Reached 100+ healthcare professionals" },
        { year: "2024", event: "Regional Expansion", description: "Added 8 regional languages" },
        { year: "2025", event: "Community Milestone", description: "50,000 women supported" }
    ];

    return (
        <div className="app-container">
            {/* Enhanced Hero */}
            <InnerPageHero
                title="Reimagining guided health journeys for every woman"
                subtitle="Nari Sangha combines evidence-based guidance, culturally aware content, and digital tools so you can navigate life stages with confidence."
                badge="Our Story"
                illustration={
                    <div style={{ position: "relative" }}>
                        <div style={{
                            width: "100%",
                            height: "400px",
                            background: "linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)",
                            borderRadius: "24px",
                            border: "10px solid white",
                            boxShadow: "0 20px 40px rgba(255, 107, 157, 0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "80px",
                            animation: "float 6s ease-in-out infinite"
                        }}>
                            👩‍⚕️
                        </div>
                    </div>
                }
            >
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🇮🇳 Made for India</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🗣️ Local Languages</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🛡️ Trusted Experts</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🤖 AI-Powered</span>
                </div>
            </InnerPageHero>

            <div style={{ background: 'var(--theme-bg-accent)', paddingTop: '80px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

                    {/* Enhanced Mission & Stats */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '60px', 
                        alignItems: 'center', 
                        marginBottom: '100px',
                        animation: isVisible ? 'fadeInUp 1s ease-out' : 'none'
                    }}>
                        <div style={{ animation: 'slideInLeft 1s ease-out' }}>
                            <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '24px', background: 'linear-gradient(135deg, #FF6B9D, #FF8FA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Our Mission
                            </h2>
                            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#555', marginBottom: '20px' }}>
                                Nari Sangha was created to close the gap between medical information and everyday decisions. We believe that trustworthy support should be accessible in every mother tongue across India.
                            </p>
                            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#555' }}>
                                From tier-1 cities to small towns, our aim is to make health support feel like a conversation with a friend, not a textbook.
                            </p>
                            <div style={{ marginTop: '30px', padding: '20px', background: 'linear-gradient(135deg, #FFF0F5, #FFE4E1)', borderRadius: '16px', borderLeft: '4px solid #FF6B9D' }}>
                                <strong style={{ color: '#D81B60' }}>💡 Our Vision:</strong>
                                <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#666' }}>
                                    Empowering 1 million women annually with personalized, culturally-sensitive health guidance by 2027.
                                </p>
                            </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', animation: 'slideInRight 1s ease-out' }}>
                            {enhancedStats.map((s, index) => (
                                <div 
                                    key={s.label} 
                                    style={{ 
                                        background: 'white', 
                                        padding: '25px', 
                                        borderRadius: '24px', 
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '20px',
                                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                        opacity: isVisible ? 1 : 0,
                                        transition: `all 0.6s ease-out ${index * 0.1}s`,
                                        border: `2px solid ${['#FF6B9D', '#4CAF50', '#FFC107', '#2196F3'][index]}20`
                                    }}
                                >
                                    <div style={{ 
                                        fontSize: '32px', 
                                        width: '60px', 
                                        height: '60px', 
                                        background: `linear-gradient(135deg, ${['#FF6B9D', '#4CAF50', '#FFC107', '#2196F3'][index]}20, ${['#FF6B9D', '#4CAF50', '#FFC107', '#2196F3'][index]}40)`,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {s.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '28px', fontWeight: '900', color: ['var(--pink)', '#4CAF50', '#FFC107', '#2196F3'][index] }}>
                                            {s.value}
                                        </div>
                                        <div style={{ fontWeight: '800', color: '#333', fontSize: '14px' }}>{s.label}</div>
                                        <div style={{ fontSize: '12px', color: '#777' }}>{s.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Values with Hover Effects */}
                    <div style={{ marginBottom: '100px' }}>
                        <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '12px', textAlign: 'center', background: 'linear-gradient(135deg, #6A1B9A, #8E24AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            What we stand for
                        </h2>
                        <p style={{ color: '#666', textAlign: 'center', marginBottom: '50px', fontSize: '18px' }}>
                            Our platform blends clinical insight with lived experiences.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
                            {values.map((v, index) => (
                                <div 
                                    key={v.title} 
                                    className={styles.card} 
                                    style={{ 
                                        padding: '40px 32px', 
                                        background: 'white', 
                                        borderRadius: '24px', 
                                        textAlign: 'center',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        border: `2px solid ${v.color}20`,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                        opacity: isVisible ? 1 : 0,
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)';
                                        e.currentTarget.style.boxShadow = `0 20px 40px ${v.color}20`;
                                        e.currentTarget.style.border = `2px solid ${v.color}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.05)';
                                        e.currentTarget.style.border = `2px solid ${v.color}20`;
                                    }}
                                >
                                    <div style={{ 
                                        fontSize: '48px', 
                                        marginBottom: '20px',
                                        animation: 'pulse 2s infinite'
                                    }}>
                                        {v.icon}
                                    </div>
                                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: v.color }}>
                                        {v.title}
                                    </h3>
                                    <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7' }}>
                                        {v.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div style={{ marginBottom: '100px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '12px', background: 'linear-gradient(135deg, #00BCD4, #0097A7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Meet Our Leadership
                        </h2>
                        <p style={{ color: '#666', marginBottom: '50px', fontSize: '18px' }}>
                            Passionate professionals dedicated to women's health
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                            {teamMembers.map((member, index) => (
                                <div 
                                    key={member.name}
                                    style={{
                                        background: 'white',
                                        padding: '35px 25px',
                                        borderRadius: '24px',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                                        transition: 'all 0.3s ease',
                                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                        opacity: isVisible ? 1 : 0,
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.05)';
                                    }}
                                >
                                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>{member.image}</div>
                                    <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: '#333' }}>{member.name}</h3>
                                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#FF6B9D', marginBottom: '12px' }}>{member.role}</div>
                                    <p style={{ fontSize: '14px', color: '#777' }}>{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Milestones Timeline */}
                    <div style={{ marginBottom: '100px' }}>
                        <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '12px', textAlign: 'center', background: 'linear-gradient(135deg, #FF5722, #E64A19)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Our Journey
                        </h2>
                        <p style={{ color: '#666', textAlign: 'center', marginBottom: '50px', fontSize: '18px' }}>
                            Key milestones in our mission to empower women
                        </p>
                        <div style={{ 
                            position: 'relative', 
                            maxWidth: '800px', 
                            margin: '0 auto',
                            paddingLeft: '30px',
                            borderLeft: '3px solid #FF6B9D'
                        }}>
                            {milestones.map((milestone, index) => (
                                <div 
                                    key={milestone.year}
                                    style={{
                                        position: 'relative',
                                        marginBottom: '40px',
                                        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                                        opacity: isVisible ? 1 : 0,
                                        transition: `all 0.6s ease-out ${index * 0.2}s`
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        left: '-43px',
                                        top: '0',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: '#FF6B9D',
                                        border: '4px solid white',
                                        boxShadow: '0 0 0 4px #FF6B9D'
                                    }}></div>
                                    <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#FF6B9D' }}>{milestone.year}</h3>
                                            <span style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>{milestone.event}</span>
                                        </div>
                                        <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Support Features */}
                    <div style={{ 
                        background: 'white', 
                        padding: '80px 40px', 
                        borderRadius: '40px', 
                        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                        marginBottom: '100px'
                    }}>
                        <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '12px', textAlign: 'center', background: 'linear-gradient(135deg, #8E24AA, #6A1B9A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            How we support your journey
                        </h2>
                        <p style={{ color: '#666', textAlign: 'center', marginBottom: '50px', fontSize: '18px' }}>
                            Tools and services designed for real-life health management.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '35px' }}>
                            {supportFeatures.map((f, index) => (
                                <div 
                                    key={f.title}
                                    style={{
                                        padding: '35px 25px',
                                        borderRadius: '24px',
                                        background: f.gradient,
                                        textAlign: 'center',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                        transition: 'all 0.4s ease',
                                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                        opacity: isVisible ? 1 : 0,
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                                    }}
                                >
                                    <div style={{ fontSize: '48px', marginBottom: '20px', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}>
                                        {f.icon}
                                    </div>
                                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: '#333' }}>
                                        {f.title}
                                    </h3>
                                    <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7' }}>
                                        {f.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced CTA */}
                    <div style={{ 
                        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%)', 
                        padding: '80px 40px', 
                        borderRadius: '40px', 
                        textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(255, 107, 157, 0.2)'
                    }}>
                        <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(135deg, #D81B60, #FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Ready to start your journey?
                        </h2>
                        <p style={{ fontSize: '18px', color: '#555', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.7' }}>
                            Begin with a journey that matches your current life stage and join 50k+ women who trust Nari Sangha.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link 
                                to={ROUTES.JOURNEYS} 
                                className={styles.primaryCta} 
                                style={{ 
                                    padding: '18px 45px', 
                                    fontSize: '18px',
                                    background: 'linear-gradient(135deg, #D81B60, #FF6B9D)',
                                    border: 'none',
                                    borderRadius: '30px',
                                    color: 'white',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 25px rgba(216, 27, 96, 0.3)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(216, 27, 96, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(216, 27, 96, 0.3)';
                                }}
                            >
                                Explore Journeys
                            </Link>
                            <Link 
                                to={ROUTES.COMMUNITY} 
                                className={styles.secondaryCta} 
                                style={{ 
                                    padding: '18px 45px', 
                                    fontSize: '18px',
                                    background: 'white',
                                    border: '2px solid #D81B60',
                                    borderRadius: '30px',
                                    color: '#D81B60',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#D81B60';
                                    e.currentTarget.style.color = 'white';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.color = '#D81B60';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                Meet the Community
                            </Link>
                        </div>
                        
                        {/* Trust Badges */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: '30px', 
                            marginTop: '40px',
                            flexWrap: 'wrap'
                        }}>
                            {[
                                { icon: "🔒", text: "HIPAA Compliant" },
                                { icon: "🏥", text: "Clinically Verified" },
                                { icon: "🇮🇳", text: "India First" },
                                { icon: "🤖", text: "AI Powered" }
                            ].map((badge, index) => (
                                <div 
                                    key={badge.text}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 20px',
                                        background: 'white',
                                        borderRadius: '30px',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                        opacity: isVisible ? 1 : 0,
                                        animationDelay: `${0.5 + index * 0.1}s`
                                    }}
                                >
                                    <span style={{ fontSize: '20px' }}>{badge.icon}</span>
                                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Global Styles */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                
                .app-container {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
};

export default About;
