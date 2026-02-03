import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InnerPageHero from '../shared/InnerPageHero';
import styles from './GynaecologyOB.module.css';

const CANCER_TYPES = ['breast', 'cervical', 'ovarian', 'endometrial'] as const;
const STAGES = [1, 2, 3, 4] as const;

type CancerType = typeof CANCER_TYPES[number];
type Stage = typeof STAGES[number];

interface VisualColors {
    tissue: string[];
    tumor: string[];
    necrotic: string;
    infection: string[];
    inflammation: string[];
    lymph: string[];
    blood: string;
    accent: string;
}

const COLORS: Record<CancerType, VisualColors> = {
    breast: {
        tissue: ['#fce4ec', '#f8bbd0', '#f48fb1'],
        tumor: ['#ffcdd2', '#ef5350', '#c62828', '#b71c1c'],
        necrotic: '#311b92',
        infection: ['#ffcdd2', '#ef9a9a', '#e57373', '#ef5350'],
        inflammation: ['#ffab91', '#ff7043', '#f4511e'],
        lymph: ['#ff9800', '#f57c00', '#ef6c00'],
        blood: '#e53935',
        accent: '#d81b60'
    },
    cervical: {
        tissue: ['#fff0f3', '#ffd4d4', '#f8bbd0'],
        tumor: ['#ffcdd2', '#e53935', '#d32f2f', '#c62828'],
        necrotic: '#1a237e',
        infection: ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373'],
        inflammation: ['#ffb74d', '#ff9800', '#f57c00'],
        lymph: ['#ff6f00', '#f57c00', '#c62828'],
        blood: '#d32f2f',
        accent: '#c2185b'
    },
    ovarian: {
        tissue: ['#f3e5f5', '#e1bee7', '#ce93d8'],
        tumor: ['#e1bee7', '#8e24aa', '#7b1fa2', '#4a148c'],
        necrotic: '#1a237e',
        infection: ['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8'],
        inflammation: ['#ba68c8', '#ab47bc', '#9c27b0'],
        lymph: ['#6a1b9a', '#4a148c', '#311b92'],
        blood: '#ab47bc',
        accent: '#7b1fa2'
    },
    endometrial: {
        tissue: ['#fce4ec', '#f8bbd0', '#f48fb1'],
        tumor: ['#ffcdd2', '#e53935', '#d32f2f', '#c62828'],
        necrotic: '#311b92',
        infection: ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373'],
        inflammation: ['#ffb74d', '#ff9800', '#f57c00'],
        lymph: ['#c62828', '#b71c1c', '#311b92'],
        blood: '#e53935',
        accent: '#880e4f'
    }
};

const CancerVisualization: React.FC = () => {
    const [type, setType] = useState<CancerType>('breast');
    const [stage, setStage] = useState<Stage>(1);
    const vizRef = useRef<HTMLDivElement>(null);

    const colors = useMemo(() => COLORS[type], [type]);

    const scrollToViz = () => {
        vizRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // --- SVG COMPONENT HELPERS ---

    const renderInfectionWaves = (cx: number, cy: number, baseR: number, currentStage: number) => {
        const waveCount = currentStage * 2;
        return (
            <g className="infection-waves">
                {Array.from({ length: 8 }).map((_, i) => {
                    const isVisible = i < waveCount;
                    const r = baseR + (i * 15);
                    const op = 0.3 - (i * 0.035);
                    return (
                        <motion.circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            initial={{ r: baseR, opacity: 0 }}
                            animate={{
                                r: isVisible ? r : baseR,
                                opacity: isVisible ? op : 0,
                                stroke: isVisible ? colors.infection[Math.min(i, colors.infection.length - 1)] : 'transparent'
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            fill="none"
                            strokeWidth={2.5 - i * 0.2}
                        >
                            <animate attributeName="r" values={`${isVisible ? r * 0.95 : baseR};${isVisible ? r * 1.15 : baseR};${isVisible ? r * 0.95 : baseR}`} dur="4s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values={`${isVisible ? op : 0};${isVisible ? op * 0.5 : 0};${isVisible ? op : 0}`} dur="4s" repeatCount="indefinite" />
                        </motion.circle>
                    );
                })}
            </g>
        );
    };

    const renderInflammationHalo = (cx: number, cy: number, tumorSize: number, currentStage: number) => {
        if (currentStage < 2) return null;
        return (
            <motion.circle
                cx={cx}
                cy={cy}
                initial={{ r: tumorSize, opacity: 0 }}
                animate={{ r: tumorSize + 25, opacity: 0.3 }}
                fill={colors.inflammation[0]}
                filter="url(#glowSoft)"
            >
                <animate attributeName="r" values={`${tumorSize + 20};${tumorSize + 35};${tumorSize + 20}`} dur="5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.4;0.2" dur="5s" repeatCount="indefinite" />
            </motion.circle>
        );
    };

    const renderAngiogenesis = (cx: number, cy: number, radius: number, currentStage: number) => {
        if (currentStage < 2) return null;
        const count = currentStage * 6;
        return (
            <g className="angiogenesis">
                {Array.from({ length: count }).map((_, i) => {
                    const angle = (i * (360 / count)) * (Math.PI / 180);
                    const length = radius * (1.1 + Math.random() * 0.6);
                    const x2 = cx + Math.cos(angle) * length;
                    const y2 = cy + Math.sin(angle) * length;

                    const cp1x = cx + Math.cos(angle + 0.1) * (length * 0.4);
                    const cp1y = cy + Math.sin(angle + 0.1) * (length * 0.4);
                    const cp2x = cx + Math.cos(angle - 0.1) * (length * 0.7);
                    const cp2y = cy + Math.sin(angle - 0.1) * (length * 0.7);

                    return (
                        <motion.path
                            key={i}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.5 }}
                            d={`M ${cx} ${cy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`}
                            fill="none"
                            stroke={colors.blood}
                            strokeWidth={1.2}
                            strokeLinecap="round"
                        >
                            <animate attributeName="opacity" values="0.3;0.6;0.3" dur={`${3 + Math.random() * 2}s`} repeatCount="indefinite" />
                        </motion.path>
                    );
                })}
            </g>
        );
    };

    const renderTendrils = (cx: number, cy: number, radius: number, currentStage: number) => {
        if (currentStage < 3) return null;
        const count = 15;
        return (
            <g className="invasion-tendrils">
                {Array.from({ length: count }).map((_, i) => {
                    const angle = (i * (360 / count)) * (Math.PI / 180);
                    const len = radius * (1.3 + Math.random() * 0.4);
                    const x1 = cx + Math.cos(angle) * (radius * 0.8);
                    const y1 = cy + Math.sin(angle) * (radius * 0.8);
                    const x2 = cx + Math.cos(angle) * len;
                    const y2 = cy + Math.sin(angle) * len;
                    return (
                        <motion.line
                            key={i}
                            initial={{ x2: x1, y2: y1, opacity: 0 }}
                            animate={{ x2: x2, y2: y2, opacity: 0.5 }}
                            x1={x1} y1={y1}
                            stroke={colors.tumor[2]}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        >
                            <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
                        </motion.line>
                    );
                })}
            </g>
        );
    };

    const renderParticles = (cx: number, cy: number, radius: number, currentStage: number) => {
        const count = currentStage * 8;
        return (
            <g className="cellular-particles">
                {Array.from({ length: 40 }).map((_, i) => {
                    const isVisible = i < count;
                    const angle = (i * 137.5) * (Math.PI / 180);
                    const dist = radius + 15 + (i * 2);
                    const x = cx + Math.cos(angle) * dist;
                    const y = cy + Math.sin(angle) * dist;
                    const size = 1 + Math.random();

                    return (
                        <motion.circle
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 0.5 : 0 }}
                            cx={x} cy={y}
                            r={size}
                            fill={colors.infection[1]}
                        >
                            <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${4 + Math.random() * 2}s`} repeatCount="indefinite" />
                            <animateTransform
                                attributeName="transform"
                                type="translate"
                                values="0 0; 2 2; 0 0"
                                dur={`${6 + Math.random() * 4}s`}
                                repeatCount="indefinite"
                            />
                        </motion.circle>
                    );
                })}
            </g>
        );
    };

    const renderTumorSphere = (cx: number, cy: number, r: number, currentStage: number) => {
        const pulseDur = "3s";
        return (
            <motion.g
                key={`${type}-${currentStage}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {/* 1. Volumetric Shadow (Casts downward-right) */}
                <circle cx={cx + r * 0.15} cy={cy + r * 0.15} r={r} fill="black" opacity="0.15" filter="url(#shadowSoft)" />

                {/* 2. Biological Envelope (Outer rim) */}
                <circle cx={cx} cy={cy} r={r + 4} fill={colors.tumor[0]} opacity="0.2">
                    <animate attributeName="r" values={`${r + 2};${r + 6};${r + 2}`} dur={pulseDur} repeatCount="indefinite" />
                </circle>

                {/* 3. Main Tumor Body (Spherical Gradient) */}
                <circle cx={cx} cy={cy} r={r} fill="url(#tumor3DGrad)" filter="url(#glowMedium)">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur={pulseDur} repeatCount="indefinite" />
                </circle>

                {/* 4. Necrotic Core (Appears at Stage III+) */}
                <AnimatePresence>
                    {currentStage >= 3 && (
                        <motion.circle
                            initial={{ r: 0, opacity: 0 }}
                            animate={{ r: r * 0.45, opacity: 0.7 }}
                            exit={{ r: 0, opacity: 0 }}
                            cx={cx} cy={cy}
                            fill={colors.necrotic}
                            filter="url(#glowSoft)"
                        >
                            <animate attributeName="opacity" values="0.6;0.8;0.6" dur="4s" repeatCount="indefinite" />
                        </motion.circle>
                    )}
                </AnimatePresence>

                {/* 5. Highlight (Specular Gloss top-left) */}
                <ellipse
                    cx={cx - r * 0.35}
                    cy={cy - r * 0.35}
                    rx={r * 0.3}
                    ry={r * 0.25}
                    fill="white"
                    opacity="0.35"
                    transform={`rotate(-45, ${cx - r * 0.35}, ${cy - r * 0.35})`}
                />
            </motion.g>
        );
    };

    const renderAnatomy = () => {
        if (type === 'breast') {
            const tumorSize = 25 + stage * 12;
            return (
                <g>
                    {/* Background Tissue Depth */}
                    <circle cx="225" cy="180" r="110" fill={colors.tissue[0]} opacity="0.15" filter="url(#shadowSoft)" />
                    <circle cx="225" cy="180" r="100" fill="url(#organ3DGrad)" filter="url(#shadowSoft)" />

                    {/* Anatomical Details */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <line
                            key={i}
                            x1={225 + Math.cos(i * 45 * Math.PI / 180) * 40}
                            y1={180 + Math.sin(i * 45 * Math.PI / 180) * 40}
                            x2={225 + Math.cos(i * 45 * Math.PI / 180) * 90}
                            y2={180 + Math.sin(i * 45 * Math.PI / 180) * 90}
                            stroke={colors.tissue[2]} strokeWidth="0.5" opacity="0.4"
                        />
                    ))}

                    <motion.g
                        className="stage-layers"
                        animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        {renderInfectionWaves(225, 180, tumorSize, stage)}
                        {renderInflammationHalo(225, 180, tumorSize, stage)}
                        {renderParticles(225, 180, tumorSize, stage)}
                        {renderAngiogenesis(225, 180, tumorSize, stage)}
                        {renderTendrils(225, 180, tumorSize, stage)}
                        {renderTumorSphere(225, 180, tumorSize, stage)}
                    </motion.g>

                    {stage === 4 && (
                        <g>
                            <path d="M 225 180 Q 150 120 100 80" fill="none" stroke={colors.blood} strokeWidth="2" strokeDasharray="6,4" opacity="0.6">
                                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="4s" repeatCount="indefinite" />
                            </path>
                            <circle cx="100" cy="80" r="8" fill="url(#tumor3DGrad)">
                                <animateMotion dur="5s" repeatCount="indefinite" path="M 225 180 Q 150 120 100 80" />
                            </circle>
                            <text x="70" y="65" fontSize="10" fontWeight="900" fill={colors.accent}>Lung Met</text>
                        </g>
                    )}
                </g>
            );
        }

        if (type === 'cervical') {
            const h = 25 + stage * 10;
            const w = 18 + stage * 8;
            return (
                <g>
                    <path d="M 170,110 Q 235,80 300,110 L 300,190 Q 235,220 170,190 Z" fill={colors.tissue[1]} opacity="0.35" filter="url(#shadowSoft)" />
                    <ellipse cx="235" cy="210" rx="65" ry="50" fill="url(#organ3DGrad)" filter="url(#shadowSoft)" />

                    <motion.g
                        className="stage-layers"
                        animate={{ x: [0, 1, 0], y: [0, -1, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    >
                        {renderInfectionWaves(235, 210, Math.max(h, w), stage)}
                        {renderInflammationHalo(235, 210, Math.max(h, w), stage)}
                        {renderParticles(235, 210, Math.max(h, w), stage)}
                        {renderAngiogenesis(235, 210, h, stage)}
                        {renderTumorSphere(235, 210, w, stage)}
                    </motion.g>
                </g>
            );
        }

        if (type === 'ovarian') {
            const r = 30 + stage * 10;
            return (
                <g>
                    <path d="M 195,190 Q 240,170 285,190 L 285,250 Q 240,270 195,250 Z" fill={colors.tissue[1]} opacity="0.3" />
                    <ellipse cx="155" cy="200" rx="42" ry="52" fill="url(#organ3DGrad)" filter="url(#shadowSoft)" />
                    <ellipse cx="325" cy="200" rx="40" ry="50" fill="url(#organ3DGrad)" opacity="0.5" />

                    <motion.g
                        className="stage-layers"
                        animate={{ x: [0, -1, 0], y: [0, 1, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        {renderInfectionWaves(155, 200, r, stage)}
                        {renderInflammationHalo(155, 200, r, stage)}
                        {renderParticles(155, 200, r, stage)}
                        {renderAngiogenesis(155, 200, r, stage)}
                        {renderTumorSphere(155, 200, r, stage)}
                    </motion.g>
                </g>
            );
        }

        // Endometrial
        const r = 35 + stage * 8;
        return (
            <g>
                <path d="M 235 110 Q 180 125 180 180 L 180 230 Q 180 255 200 262 L 260 262 Q 280 255 280 230 L 280 180 Q 280 125 235 110 Z" fill="url(#organ3DGrad)" filter="url(#shadowSoft)" />
                <motion.g
                    className="stage-layers"
                    animate={{ x: [0, 1.5, 0], y: [0, -1.5, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
                >
                    {renderInfectionWaves(230, 190, r, stage)}
                    {renderInflammationHalo(230, 190, r, stage)}
                    {renderParticles(230, 190, r, stage)}
                    {renderTumorSphere(230, 190, r * 0.8, stage)}
                </motion.g>
                {stage === 4 && (
                    <g>
                        <path d="M 230 190 Q 150 120 100 80" fill="none" stroke={colors.blood} strokeWidth="2" strokeDasharray="6,4" opacity="0.6">
                            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="4s" repeatCount="indefinite" />
                        </path>
                        <circle cx="100" cy="80" r="8" fill="url(#tumor3DGrad)">
                            <animateMotion dur="4.5s" repeatCount="indefinite" path="M 230 190 Q 150 120 100 80" />
                        </circle>
                        <text x="70" y="65" fontSize="10" fontWeight="900" fill={colors.accent}>Lung Met</text>
                    </g>
                )}
            </g>
        );
    };

    return (
        <div className={styles.page} style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fefce8 100%)' }}>
            <InnerPageHero
                title="Ultra-Realistic 3D Cancer Explorer"
                subtitle="Interactive educational visualization to understand cancer stages, progression, and anatomical impact — designed for clarity, not diagnosis."
                badge="Medical Visualization"
                illustration={
                    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            style={{ position: 'relative' }}
                        >
                            <svg width="300" height="300" viewBox="0 0 200 200">
                                <defs>
                                    <radialGradient id="heroTumorGrad" fx="30%" fy="30%">
                                        <stop offset="0%" stopColor="#ffcdd2" />
                                        <stop offset="70%" stopColor="#e53935" />
                                        <stop offset="100%" stopColor="#b71c1c" />
                                    </radialGradient>
                                    <filter id="heroGlow">
                                        <feGaussianBlur stdDeviation="10" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <circle cx="100" cy="100" r="60" fill="url(#heroTumorGrad)" filter="url(#heroGlow)" />
                                <ellipse cx="75" cy="75" rx="20" ry="15" fill="white" opacity="0.2" transform="rotate(-45, 75, 75)" />
                            </svg>
                        </motion.div>
                    </div>
                }
            >
                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                    <button
                        onClick={scrollToViz}
                        style={{ padding: '16px 32px', borderRadius: '50px', border: 'none', background: '#d81b60', color: 'white', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 30px rgba(216, 27, 96, 0.2)' }}
                    >
                        Explore Stages
                    </button>
                    <button
                        onClick={scrollToViz}
                        style={{ padding: '16px 32px', borderRadius: '50px', border: '2px solid rgba(216, 27, 96, 0.3)', background: 'transparent', color: '#880e4f', fontWeight: 800, cursor: 'pointer' }}
                    >
                        Learn About Cancer Types
                    </button>
                </div>
            </InnerPageHero>

            <div className={styles.container} ref={vizRef} style={{ padding: '80px 0' }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(32px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        padding: '3rem',
                        borderRadius: '56px',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.05)'
                    }}
                >

                    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '4rem' }}>
                        <aside>
                            <div style={{ position: 'sticky', top: '2rem' }}>
                                <section style={{ marginBottom: '3rem' }}>
                                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Select Organ System</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {CANCER_TYPES.map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setType(t)}
                                                style={{
                                                    padding: '1.25rem 1.5rem',
                                                    borderRadius: '24px',
                                                    border: '1px solid',
                                                    borderColor: type === t ? colors.accent : '#f1f5f9',
                                                    cursor: 'pointer',
                                                    background: type === t ? colors.accent : 'white',
                                                    color: type === t ? 'white' : '#475569',
                                                    fontWeight: 800,
                                                    textAlign: 'left',
                                                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                                                    boxShadow: type === t ? `0 12px 24px ${colors.accent}33` : 'none',
                                                    fontSize: '15px'
                                                }}
                                            >
                                                {t.charAt(0).toUpperCase() + t.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Clinical Staging</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                                        {STAGES.map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setStage(s)}
                                                style={{
                                                    aspectRatio: '1',
                                                    borderRadius: '20px',
                                                    border: '1px solid',
                                                    borderColor: stage === s ? colors.accent : '#f1f5f9',
                                                    cursor: 'pointer',
                                                    background: stage === s ? colors.accent : 'white',
                                                    color: stage === s ? 'white' : '#475569',
                                                    fontWeight: 900,
                                                    fontSize: '20px',
                                                    transition: 'all 0.3s'
                                                }}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <div style={{ marginTop: '4rem', padding: '24px', background: 'rgba(241, 245, 249, 0.5)', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#475569', marginBottom: '12px' }}>Biological Markers</h4>
                                    <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: 12, height: 12, borderRadius: '4px', background: colors.blood }} />
                                            <span>Angiogenesis (Stage II+)</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: 12, height: 12, borderRadius: '4px', background: colors.inflammation[0] }} />
                                            <span>Inflammation Halo</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: 12, height: 12, borderRadius: '4px', background: colors.necrotic }} />
                                            <span>Necrotic Mass (Stage III+)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <main style={{ position: 'relative' }}>
                            <div style={{
                                background: '#fff',
                                borderRadius: '40px',
                                boxShadow: 'inset 0 10px 40px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.01)',
                                border: '1px solid #f1f5f9',
                                position: 'relative',
                                height: '560px',
                                overflow: 'hidden'
                            }}>
                                <svg viewBox="0 0 450 400" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
                                    <defs>
                                        {/* Medical-Scan Grade 3D Lighting */}
                                        <radialGradient id="organ3DGrad" fx="35%" fy="35%">
                                            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                                            <stop offset="50%" stopColor={colors.tissue[0]} />
                                            <stop offset="100%" stopColor={colors.tissue[2]} />
                                        </radialGradient>

                                        <radialGradient id="tumor3DGrad" fx="30%" fy="30%">
                                            <stop offset="0%" stopColor={colors.tumor[0]} />
                                            <stop offset="40%" stopColor={colors.tumor[1]} />
                                            <stop offset="85%" stopColor={colors.tumor[2]} />
                                            <stop offset="100%" stopColor={colors.tumor[3]} />
                                        </radialGradient>

                                        <filter id="glowSoft">
                                            <feGaussianBlur stdDeviation="8" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>

                                        <filter id="glowMedium">
                                            <feGaussianBlur stdDeviation="4" result="blur" />
                                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                        </filter>

                                        <filter id="shadowSoft">
                                            <feDropShadow dx="6" dy="10" stdDeviation="10" floodOpacity="0.12" />
                                        </filter>
                                    </defs>
                                    {renderAnatomy()}
                                </svg>

                                {/* Educational Info Card */}
                                <motion.div
                                    key={stage}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.05)', padding: '20px 32px', borderRadius: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                            <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1a202c' }}>STAGE {['I', 'II', 'III', 'IV'][stage - 1]}</h2>
                                            <div style={{ height: '3px', width: '40px', background: colors.accent, borderRadius: '2px' }} />
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>
                                            {stage === 1 && "Localized microscopic interaction within tissue boundaries."}
                                            {stage === 2 && "Vascular expansion and early physiological penetration."}
                                            {stage === 3 && "Extensive regional mass growth and cellular invasion."}
                                            {stage === 4 && "Systemic migration to distant anatomical quadrants."}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right', minWidth: '140px' }}>
                                        <div style={{ fontSize: '18px', fontWeight: 900, color: colors.accent }}>
                                            {[96, 84, 62, 24][stage - 1]}% Rate
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Survival Trend</div>
                                    </div>
                                </motion.div>
                            </div>

                            <div style={{ marginTop: '2rem', fontSize: '12px', color: '#94a3b8', fontWeight: 500, fontStyle: 'italic', textAlign: 'center', background: '#f8fafc', padding: '12px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                                ⚠ Educational Framework: This model is for visualization only and does not provide medical diagnosis.
                            </div>
                        </main>
                    </div>
                </motion.div>
            </div>

            <style>{`
                @media (prefers-reduced-motion: reduce) {
                    svg * {
                        animation: none !important;
                        transition: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CancerVisualization;
