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

const POST_PREGNANCY_TREATMENTS = [
    {
        id: 'mommy-makeover',
        name: 'Mommy Makeover',
        icon: '🌟',
        description: 'Combined procedures to restore pre-pregnancy body: tummy tuck, breast lift, and liposuction.',
        recovery: '4-6 weeks',
        safeAfter: '6 months postpartum',
        includes: ['Tummy Tuck', 'Breast Lift/Augmentation', 'Liposuction', 'Skin Tightening'],
        considerations: ['Must be done breastfeeding', 'Wait until weight stabilizes', 'Plan childcare support for recovery']
    },
    {
        id: 'diastasis-repair',
        name: 'Diastasis Recti Repair',
        icon: '💪',
        description: 'Surgical correction of abdominal muscle separation that occurs during pregnancy.',
        recovery: '6-8 weeks',
        safeAfter: '12 months postpartum',
        includes: ['Muscle Re-approximation', 'Core Reconstruction', 'Hernia Repair if needed'],
        considerations: ['Try physical therapy first', 'Wait until fully healed', 'No heavy lifting for 6 weeks']
    },
    {
        id: 'stretch-marks',
        name: 'Stretch Mark Treatment',
        icon: '✨',
        description: 'Non-invasive treatments to reduce the appearance of pregnancy stretch marks.',
        recovery: 'Minimal - 1-3 days',
        safeAfter: '3 months postpartum',
        includes: ['Laser Therapy', 'Microneedling', 'Chemical Peels', 'PRP Therapy'],
        considerations: ['Multiple sessions needed', 'Best on newer marks', 'Skin type affects results']
    },
    {
        id: 'skin-rejuvenation',
        name: 'Postpartum Skincare',
        icon: '🧴',
        description: 'Address hormonal skin changes like melasma, acne, and dullness after pregnancy.',
        recovery: 'No downtime',
        safeAfter: 'Immediately if not breastfeeding',
        includes: ['Melasma Treatment', 'Hormonal Acne Solutions', 'Hydration Therapy', 'Anti-aging Protocols'],
        considerations: ['Some actives unsafe while breastfeeding', 'Hormone levels must stabilize', 'SPF is essential']
    },
    {
        id: 'pelvic-floor',
        name: 'Pelvic Floor Restoration',
        icon: '🏥',
        description: 'Therapeutic and surgical options for pelvic floor weakness after childbirth.',
        recovery: '2-6 weeks depending on treatment',
        safeAfter: '6 weeks postpartum for therapy',
        includes: ['Kegel Therapy', 'Electrical Stimulation', 'Laser Tightening', 'Surgical Repair'],
        considerations: ['Start with non-invasive options', 'Common after vaginal birth', 'Can improve incontinence']
    },
    {
        id: 'hair-restoration',
        name: 'Postpartum Hair Loss Treatment',
        icon: '💇‍♀️',
        description: 'Address postpartum hair shedding with targeted treatments and nutritional support.',
        recovery: 'No downtime',
        safeAfter: '3 months postpartum',
        includes: ['PRP Hair Therapy', 'Nutritional Supplements', 'Scalp Treatments', 'Low-level Laser'],
        considerations: ['Hair loss usually peaks 3-4 months postpartum', 'Often resolves naturally by 12 months', 'Rule out thyroid issues first']
    }
];

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
    const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
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

            {/* POST-PREGNANCY BODY & AESTHETICS */}
            <section className={styles.section} style={{ background: '#fcf8fa' }}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span style={{
                            background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
                            color: '#d81b60',
                            fontSize: '12px',
                            fontWeight: 800,
                            padding: '6px 16px',
                            borderRadius: '999px',
                            display: 'inline-block',
                            marginBottom: '16px',
                            letterSpacing: '0.5px'
                        }}>POST-PREGNANCY CARE</span>
                        <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '12px', color: '#1a1a1a' }}>Body & Aesthetics Recovery</h2>
                        <p style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                            Safe cosmetic treatments, skincare, and recovery plans for the post-pregnancy body.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: '24px',
                        marginBottom: '40px'
                    }}>
                        {POST_PREGNANCY_TREATMENTS.map(treatment => (
                            <div key={treatment.id} style={{
                                background: 'white',
                                borderRadius: '24px',
                                padding: '32px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: selectedTreatment === treatment.id ? '2px solid #d81b60' : '2px solid transparent'
                            }}
                                onClick={() => setSelectedTreatment(selectedTreatment === treatment.id ? null : treatment.id)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '36px' }}>{treatment.icon}</span>
                                    <div>
                                        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px', color: '#1a1a1a' }}>{treatment.name}</h3>
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#d81b60', background: '#fce4ec', padding: '4px 10px', borderRadius: '20px' }}>
                                            Safe after: {treatment.safeAfter}
                                        </span>
                                    </div>
                                </div>

                                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, marginBottom: '16px' }}>
                                    {treatment.description}
                                </p>

                                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ flex: 1, background: '#f5f5f5', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                                        <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', marginBottom: '4px' }}>RECOVERY</span>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a1a' }}>{treatment.recovery}</span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#888', display: 'block', marginBottom: '8px' }}>INCLUDES:</span>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {treatment.includes.map((item, i) => (
                                            <span key={i} style={{
                                                background: '#e3f2fd',
                                                color: '#1565c0',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: 700
                                            }}>{item}</span>
                                        ))}
                                    </div>
                                </div>

                                {selectedTreatment === treatment.id && (
                                    <div style={{
                                        borderTop: '1px solid #f0f0f0',
                                        paddingTop: '16px',
                                        marginTop: '8px'
                                    }}>
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#f57c00', display: 'block', marginBottom: '10px' }}>
                                            ⚠️ IMPORTANT CONSIDERATIONS:
                                        </span>
                                        <ul style={{ paddingLeft: '16px', margin: 0 }}>
                                            {treatment.considerations.map((c, i) => (
                                                <li key={i} style={{ fontSize: '13px', color: '#555', padding: '4px 0', lineHeight: 1.6 }}>{c}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Safety Advisory */}
                    <div style={{
                        background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                        padding: '30px',
                        borderRadius: '20px',
                        textAlign: 'center'
                    }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px', color: '#1a1a1a' }}>
                            ⚕️ Important Safety Note
                        </h4>
                        <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
                            Always consult with your OB/GYN and a board-certified plastic surgeon before pursuing any post-pregnancy procedures.
                            Timing matters - most procedures should wait until you've finished breastfeeding and your body has fully recovered.
                            Prioritize your health and your baby's wellbeing first.
                        </p>
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
