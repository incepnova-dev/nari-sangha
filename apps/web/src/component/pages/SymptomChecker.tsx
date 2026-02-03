import React, { useState } from "react";
import styles from "../landing/landing.module.css";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../routes/routeConstants";

import InnerPageHero from "../shared/InnerPageHero";
import SymptomsAnimation from "../shared/animations/SymptomsAnimation";

const SymptomChecker: React.FC = () => {
    const navigate = useNavigate();
    const [selectedSymptom, setSelectedSymptom] = useState<string>("");

    const [severity, setSeverity] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [showResult, setShowResult] = useState(false);

    // Emergency Warning List
    const emergencySigns = [
        "Severe pelvic/abdominal pain that is sudden or worsening",
        "Heavy bleeding (soaking a pad in an hour)",
        "Dizziness/fainting, shoulder pain (possible ectopic pregnancy)",
        "High fever with pelvic pain",
        "Pregnancy: severe headache, vision changes, sudden swelling",
        "Chest pain or breathing difficulty"
    ];

    const symptomOptions = [
        { id: "period", label: "Irregular periods / heavy bleeding" },
        { id: "pain", label: "Pelvic / lower abdominal pain" },
        { id: "discharge", label: "Unusual discharge / itching" },
        { id: "breast", label: "Breast lump / pain / discharge" },
        { id: "pregnancy", label: "Pregnancy concern (bleeding, pain, movements)" },
        { id: "urinary", label: "Burning / frequent urination" },
    ];

    const getTriageResult = () => {
        if (!selectedSymptom || !severity || !duration) return null;

        let level = "green";
        let heading = "Self-care + monitor";
        let msg = "Your answers suggest starting with self-care and monitoring. If symptoms persist, book a consult.";
        let action = "Read Care Guide";

        if (severity === "moderate") {
            level = "amber";
            heading = "Consult recommended";
            msg = "Your answers suggest you should consult a clinician soon (24–72 hours). Teleconsultation is a fast first step.";
            action = "Book Teleconsult";
        }

        if (severity === "severe" || (duration === "today" && (selectedSymptom === "pregnancy" || selectedSymptom === "pain"))) {
            level = "red";
            heading = "Urgent care";
            msg = "Your answers suggest urgent evaluation. If you feel unsafe or symptoms are worsening, seek emergency care immediately.";
            action = "Find Urgent Care";
        }

        return { level, heading, msg, action };
    };

    const result = showResult ? getTriageResult() : null;

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
                illustration={<SymptomsAnimation />}
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
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🩺 Quick Triage</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>📚 Practical Guidance</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🛡️ Private by Design</span>
                </div>
            </InnerPageHero>

            <div style={{ background: 'var(--theme-bg-accent)', minHeight: '100vh', marginTop: '40px', paddingTop: '0px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 80px' }}>

                    {/* 2-Column Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '0px' }}>

                        {/* Left: Input Form */}
                        <div className={styles.card} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>📋 Tell us what's happening</h3>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#555' }}>Primary Symptom</label>
                                <select
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px' }}
                                    onChange={(e) => { setSelectedSymptom(e.target.value); setShowResult(false); }}
                                    value={selectedSymptom}
                                >
                                    <option value="" disabled>Select...</option>
                                    {symptomOptions.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                                </select>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#555' }}>Severity</label>
                                <select
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px' }}
                                    onChange={(e) => { setSeverity(e.target.value); setShowResult(false); }}
                                    value={severity}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="mild">Mild</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="severe">Severe</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: '#555' }}>How long has it been?</label>
                                <select
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px' }}
                                    value={duration}
                                    onChange={(e) => { setDuration(e.target.value); setShowResult(false); }}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="today">Started today</option>
                                    <option value="days">Few days</option>
                                    <option value="weeks">Weeks+</option>
                                </select>
                            </div>

                            <button
                                className={styles.primaryCta}
                                style={{ width: '100%', textAlign: 'center', borderRadius: '12px' }}
                                disabled={!selectedSymptom || !severity || !duration}
                                onClick={() => setShowResult(true)}
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
                                                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '24px' }}>{result.msg}</p>

                                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                                    <button
                                                        className={styles.primaryCta}
                                                        style={{ flex: 1, background: style.btn, textAlign: 'center', fontSize: '14px', minWidth: '150px', border: 'none', color: 'white', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            if (result.action === "Read Care Guide") {
                                                                if (selectedSymptom === "period" || selectedSymptom === "wellness") {
                                                                    navigate(ROUTES.PREVENTIVE_HEALTH);
                                                                } else if (selectedSymptom === "research" || duration === "weeks") {
                                                                    navigate(ROUTES.RESEARCH);
                                                                } else {
                                                                    navigate(ROUTES.SERVICES);
                                                                }
                                                            } else if (result.action === "Book Teleconsult") {
                                                                navigate(ROUTES.TELECONSULTATION);
                                                            } else {
                                                                navigate(ROUTES.FIND_DOCTORS);
                                                            }
                                                        }}
                                                    >
                                                        {result.action}
                                                    </button>
                                                    <button
                                                        className={styles.secondaryCta}
                                                        style={{ flex: 1, textAlign: 'center', fontSize: '14px', minWidth: '150px' }}
                                                        onClick={() => navigate(ROUTES.DASHBOARD)}
                                                    >
                                                        Save Log
                                                    </button>
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

                {/* Triage Overview Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '60px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #E8F5E9', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                        <div style={{ display: 'inline-flex', padding: '4px 12px', background: '#E8F5E9', color: '#2E7D32', borderRadius: '20px', fontWeight: '800', fontSize: '12px', marginBottom: '12px' }}>🟢 SELF-CARE</div>
                        <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Mild Symptoms</h4>
                        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Hydration, rest, warm compress, OTC relief. Monitor for changes over 24-48 hours.</p>
                    </div>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #FFF8E1', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                        <div style={{ display: 'inline-flex', padding: '4px 12px', background: '#FFF8E1', color: '#F57C00', borderRadius: '20px', fontWeight: '800', fontSize: '12px', marginBottom: '12px' }}>🟡 CONSULT</div>
                        <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Moderate Symptoms</h4>
                        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Schedule a consult within 24–72 hours. Teleconsultation is recommended for rapid guidance.</p>
                    </div>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #FFEBEE', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                        <div style={{ display: 'inline-flex', padding: '4px 12px', background: '#FFEBEE', color: '#D32F2F', borderRadius: '20px', fontWeight: '800', fontSize: '12px', marginBottom: '12px' }}>🔴 URGENT</div>
                        <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Severe Symptoms</h4>
                        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Seek urgent care immediately. Use teleconsultation only if emergency care isn’t accessible.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SymptomChecker;
