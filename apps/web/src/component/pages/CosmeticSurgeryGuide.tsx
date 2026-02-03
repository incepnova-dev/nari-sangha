import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import styles from "./CosmeticSurgeryGuide.module.css";
import InnerPageHero from "../shared/InnerPageHero";

interface Procedure {
    id: string;
    name: string;
    subtitle: string;
    icon: string;
    severityLevels: {
        label: string;
        text: string;
        class: string;
    }[];
    highlights: string[];
}

const PROCEDURES: Procedure[] = [
    {
        id: "rhinoplasty",
        name: "Rhinoplasty",
        subtitle: "Nasal Refinement & Function",
        icon: "👃",
        severityLevels: [
            { label: "Minor", text: "Tip refinement, slight bridge adjustment. Minimal swelling.", class: styles.severityMild },
            { label: "Moderate", text: "Bridge shaving, structural changes. Moderate downtime.", class: styles.severityModerate },
            { label: "Major", text: "Complete reconstruction, septal work. Significant recovery.", class: styles.severityCritical }
        ],
        highlights: ["7-10 days initial recovery", "Final results at 12 months", "Improves breathing & aesthetics"]
    },
    {
        id: "breast-aug",
        name: "Breast Augmentation",
        subtitle: "Volume Enhancement & Shaping",
        icon: "✨",
        severityLevels: [
            { label: "Saline", text: "Small incision, adjustable volume. Faster recovery.", class: styles.severityMild },
            { label: "Silicone", text: "Cohesive gel for natural feel. Standard incision.", class: styles.severityModerate },
            { label: "Composite", text: "Augmentation combined with lift. Complex recovery.", class: styles.severityCritical }
        ],
        highlights: ["1-2 weeks off work", "Sport bra for 6 weeks", "Scar management required"]
    },
    {
        id: "liposuction",
        name: "Liposuction",
        subtitle: "Contouring & Fat Removal",
        icon: "💉",
        severityLevels: [
            { label: "Targeted", text: "Small area (chin/knees). Local anesthesia possible.", class: styles.severityMild },
            { label: "Multi-Zone", text: "Abdomen, flanks, thighs. 2-3 liters removal.", class: styles.severityModerate },
            { label: "High-Vol", text: "Total body contouring. Hospital stay required.", class: styles.severityCritical }
        ],
        highlights: ["Compression garment essential", "Fluids management crucial", "Permanent fat cell removal"]
    },
    {
        id: "facelift",
        name: "Deep Plane Facelift",
        subtitle: "Structural Rejuvenation",
        icon: "🎭",
        severityLevels: [
            { label: "Mini", text: "Lower face and jowl focus. Hidden incisions.", class: styles.severityMild },
            { label: "Full", text: "Face and neck tightening. Deep structural work.", class: styles.severityModerate },
            { label: "Combined", text: "Facelift + Brows + Eyes. Comprehensive youth.", class: styles.severityCritical }
        ],
        highlights: ["10-14 days social downtime", "Natural non-tight look", "Longest lasting results"]
    }
];

const CosmeticSurgeryGuide: React.FC = () => {
    const navigate = useNavigate();
    const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [activeProcedure, setActiveProcedure] = useState<Procedure | null>(null);

    const bodyPoints = [
        { id: "face", label: "Facial Aesthetics", top: "10%", left: "50%" },
        { id: "eyes", label: "Ocular Refinement", top: "15%", left: "50%" },
        { id: "chest", label: "Breast & Chest", top: "28%", left: "50%" },
        { id: "abdomen", label: "Core Contouring", top: "45%", left: "50%" },
        { id: "hips", label: "Lower Body", top: "60%", left: "50%" }
    ];

    const openSimulation = (proc: Procedure) => {
        setActiveProcedure(proc);
        setShowModal(true);
    };

    return (
        <div className={styles.cosmeticPage}>
            <InnerPageHero
                title="Cosmetic Surgery Guide"
                subtitle="An interactive exploration of aesthetic procedures, safety standards, and recovery experiences. Empowering your choice with evidence-based visual guidance."
                badge="Aesthetic Excellence"
                centered
            />

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.heroVisual}>
                        <div className={styles.bodySilhouette}>
                            {bodyPoints.map(p => (
                                <div
                                    key={p.id}
                                    className={styles.bodyPoint}
                                    style={{ top: p.top, left: p.left }}
                                    onClick={() => setSelectedPoint(p.label)}
                                >
                                    <span className={styles.pointLabel}>{p.label}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginLeft: '80px', maxWidth: '400px' }}>
                            <h2 style={{ marginBottom: '20px' }}>Map Your Transformation</h2>
                            <p style={{ color: '#666', marginBottom: '30px' }}>
                                Click on the pulse points to discover procedures tailored to specific areas.
                                {selectedPoint && (
                                    <span style={{ display: 'block', marginTop: '20px', color: '#d81b60', fontWeight: 800 }}>
                                        Focused on: {selectedPoint}
                                    </span>
                                )}
                            </p>
                            <div className={styles.severityItem} style={{ background: 'white' }}>
                                <span className={styles.severityBadge} style={{ background: '#4caf50' }}>Safe</span>
                                <span className={styles.severityText}>All listed procedures follow board-certified standards.</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.procedureGrid}>
                        {PROCEDURES.map(proc => (
                            <article key={proc.id} className={styles.procedureCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>{proc.icon}</div>
                                    <h3 className={styles.cardName}>{proc.name}</h3>
                                    <p className={styles.cardSubtitle}>{proc.subtitle}</p>
                                </div>
                                <div className={styles.cardBody}>
                                    {proc.severityLevels.map((lvl, idx) => (
                                        <div key={idx} className={styles.severityItem}>
                                            <span className={`${styles.severityBadge} ${lvl.class}`}>{lvl.label}</span>
                                            <p className={styles.severityText}>{lvl.text}</p>
                                        </div>
                                    ))}
                                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: '#666' }}>
                                        {proc.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                    </ul>
                                </div>
                                <div className={styles.cardFooter}>
                                    <button
                                        className={styles.btnSimulate}
                                        onClick={() => navigate(ROUTES.AESTHETIC_SIMULATOR)}
                                    >
                                        Aesthetic Simulator
                                    </button>
                                    <button
                                        className={styles.btnMore}
                                        onClick={() => openSimulation(proc)}
                                    >
                                        View Outcomes
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recovery Experience Modal */}
            {showModal && activeProcedure && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setShowModal(false)}>&times;</button>
                        <h2 style={{ marginBottom: '10px' }}>{activeProcedure.name} Recovery Experience</h2>
                        <p style={{ color: '#666', marginBottom: '40px' }}>Detailed clinical timeline and what to expect during your healing journey.</p>

                        <div className={styles.timeline}>
                            <div className={styles.timelineItem}>
                                <div className={styles.marker}></div>
                                <h3>Day 1-3: The Peak</h3>
                                <p style={{ color: '#666' }}>Highest discomfort and swelling. Strict rest, prescribed meds, and initial follow-up appointment.</p>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.marker} style={{ opacity: 0.6 }}></div>
                                <h3>Day 7-10: First Milestone</h3>
                                <p style={{ color: '#666' }}>Sutures removed. Most social bruising can be covered. Return to light activity possible.</p>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.marker} style={{ opacity: 0.3 }}></div>
                                <h3>Week 6: Active Living</h3>
                                <p style={{ color: '#666' }}>Clearance for vigorous exercise. Swelling reduced by 90%. Natural shape begins to settle.</p>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.marker} style={{ opacity: 0.1 }}></div>
                                <h3>Month 12: Final Result</h3>
                                <p style={{ color: '#666' }}>Scars matured and faded. All minor residual tissue swelling fully resolved. Permanent outcome achieved.</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '40px', padding: '24px', background: '#fcf8fa', borderRadius: '16px', display: 'flex', gap: '20px' }}>
                            <div style={{ fontSize: '2rem' }}>💎</div>
                            <div>
                                <h4 style={{ marginBottom: '5px' }}>Premium Aftercare</h4>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>The best results are achieved through strict adherence to your surgeon's specific post-operative protocol.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CosmeticSurgeryGuide;
