import React, { useState } from "react";
import styles from "../landing/landing.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const SymptomChecker: React.FC = () => {
    const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
    const [duration, setDuration] = useState<string>("today");

    // Emergency Warning List
    const emergencySigns = [
        "Severe pelvic/abdominal pain that is sudden or worsening",
        "Heavy bleeding (soaking a pad in an hour)",
        "Dizziness/fainting, shoulder pain (possible ectopic pregnancy)",
        "High fever with pelvic pain",
        "Chest pain or breathing difficulty"
    ];

    const symptoms = [
        { id: "pain", label: "Pelvic / Abdominal Pain", severity: "moderate" },
        { id: "bleeding", label: "Abnormal Bleeding", severity: "severe" },
        { id: "discharge", label: "Unusual Discharge", severity: "mild" },
        { id: "mood", label: "Severe Mood Swings", severity: "mild" },
        { id: "nausea", label: "Nausea / Vomiting", severity: "moderate" },
        { id: "headache", label: "Persistent Headache", severity: "warning" },
    ];

    const getTriageResult = (symptomId: string) => {
        // Simple mock logic
        const results: Record<string, any> = {
            pain: {
                level: "amber", // Moderate
                heading: "Moderate symptoms",
                advice: "Schedule a consult within 24-72 hours, especially if symptoms persist.",
                action: "Book Consult"
            },
            bleeding: {
                level: "red", // Severe
                heading: "Severe symptoms",
                advice: "Seek urgent care immediately. Use teleconsultation only if emergency care isn't accessible.",
                action: "Find Urgent Care"
            },
            discharge: {
                level: "green", // Mild
                heading: "Mild symptoms",
                advice: "Hydration, rest, and monitor. Likely a minor infection but consult if it continues for 3 days.",
                action: "Read Guide"
            }
        };
        // Default fallback
        return results[symptomId] || results["pain"];
    };

    const result = selectedSymptom ? getTriageResult(selectedSymptom) : null;

    const getLevelStyle = (level: string) => {
        switch (level) {
            case 'red': return { bg: '#FFEBEE', border: '#FFCDD2', icon: '🚨', btn: '#D32F2F' };
            case 'amber': return { bg: '#FFF8E1', border: '#FFECB3', icon: '👨‍⚕️', btn: '#F57C00' };
            case 'green': return { bg: '#E8F5E9', border: '#C8E6C9', icon: '🍃', btn: '#388E3C' };
            default: return { bg: '#F5F5F5', border: '#EEE', icon: 'ℹ️', btn: '#555' };
        }
    };

    return (
        <div className="app-container">
            {/* Hero */}
            <InnerPageHero
                title="Women's Health Symptom Checker"
                subtitle="Quick triage and condition education to help you understand symptoms and decide when to seek medical care."
                badge="AI Triage"
            />

            <div style={{ background: 'var(--theme-bg-accent)', minHeight: '100vh', marginTop: '60px', paddingTop: '0px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 80px' }}>

                    {/* 2-Column Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '0px' }}>

                        {/* Left: Input Form */}
                        <div className={styles.card} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>📋 Tell us what's happening</h3>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#555' }}>Primary Symptom</label>
                                <select
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px' }}
                                    onChange={(e) => setSelectedSymptom(e.target.value)}
                                    value={selectedSymptom || ""}
                                >
                                    <option value="" disabled>Select...</option>
                                    {symptoms.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                                </select>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#555' }}>How long has it been?</label>
                                <select
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px' }}
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                >
                                    <option value="today">Started today</option>
                                    <option value="days">Few days</option>
                                    <option value="weeks">Weeks+</option>
                                </select>
                            </div>

                            <button
                                className={styles.primaryCta}
                                style={{ width: '100%', textAlign: 'center', borderRadius: '12px' }}
                                disabled={!selectedSymptom}
                            >
                                Get Assessment
                            </button>
                        </div>

                        {/* Right: Emergency Warnings or Result */}
                        <div className={styles.card} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                            {result ? (
                                <div style={{ animation: 'fadeIn 0.5s' }}>
                                    {(() => {
                                        const style = getLevelStyle(result.level);
                                        return (
                                            <>
                                                <div style={{ display: 'inline-flex', padding: '6px 12px', background: style.bg, color: style.btn, borderRadius: '20px', fontWeight: '800', fontSize: '12px', marginBottom: '16px', alignItems: 'center', gap: '6px' }}>
                                                    {style.icon} {result.heading.toUpperCase()}
                                                </div>
                                                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>{result.heading}</h3>
                                                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '24px' }}>{result.advice}</p>

                                                <div style={{ display: 'flex', gap: '12px' }}>
                                                    <Link to={ROUTES.APPOINTMENTS} className={styles.primaryCta} style={{ flex: 1, background: style.btn, textAlign: 'center', fontSize: '14px' }}>
                                                        {result.action}
                                                    </Link>
                                                    {result.level !== 'red' && (
                                                        <button className={styles.secondaryCta} style={{ flex: 1, textAlign: 'center', fontSize: '14px' }}>Save Log</button>
                                                    )}
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#D32F2F' }}>
                                        ⚠️ Emergency warning signs
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>Seek urgent care if you have any of the following:</p>
                                    <ul style={{ paddingLeft: '20px', color: '#444', fontSize: '14px', lineHeight: '1.6' }}>
                                        {emergencySigns.map((sign, idx) => (
                                            <li key={idx} style={{ marginBottom: '8px' }}>{sign}</li>
                                        ))}
                                    </ul>
                                    <div style={{ marginTop: '24px', padding: '16px', background: '#F5F5F5', borderRadius: '12px', fontSize: '13px' }}>
                                        <strong>Tip:</strong> If you're unsure, choose teleconsultation for rapid guidance.
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default SymptomChecker;
