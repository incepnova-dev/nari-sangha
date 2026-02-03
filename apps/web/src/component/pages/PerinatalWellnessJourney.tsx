import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PerinatalWellnessJourney.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";
import { HealingParticleBackground } from "../canvas/PostpartumCanvas";
import { motion, AnimatePresence } from "framer-motion";

// --- Sub-components ---

const WellnessTimeline: React.FC = () => {
    const [index, setIndex] = useState(0);
    const stages = [
        { title: "Planning", focus: "Emotional readiness and setting boundaries.", color: "linear-gradient(135deg, #f0fdfa 0%, #fff7ed 100%)" },
        { title: "Pregnancy", focus: "Navigating bodily changes and hormonal shifts.", color: "linear-gradient(135deg, #fff7ed 0%, #fef2f2 100%)" },
        { title: "Postpartum", focus: "Recovery, bonding, and radical self-care.", color: "linear-gradient(135deg, #fef2f2 0%, #f0f9ff 100%)" }
    ];

    const handleDrag = (_: any, info: any) => {
        const threshold = 100;
        if (info.offset.x > threshold && index > 0) {
            setIndex(index - 1);
        } else if (info.offset.x < -threshold && index < stages.length - 1) {
            setIndex(index + 1);
        }
    };

    const handleOffset = typeof window !== 'undefined' ? (window.innerWidth < 768 ? 100 : 380) : 0;

    return (
        <section className={styles.section}>
            <div className={styles.timelineWrapper} style={{ background: stages[index].color }}>
                <h2 className={styles.sectionTitle}>Wellness Over Time</h2>
                <p className={styles.sectionSubtitle}>Drag the handle to explore focus areas across your journey.</p>

                <div className={styles.timelineStages}>
                    {stages.map((s, i) => (
                        <div key={i} className={`${styles.timelineStage} ${index === i ? styles.active : ''}`}>
                            {s.title}
                        </div>
                    ))}
                </div>

                <div className={styles.timelineTrack}>
                    <motion.div
                        className={styles.timelineHandle}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDrag}
                        animate={{ x: index * handleOffset }}
                        style={{ left: `${(index / (stages.length - 1)) * 100}%`, marginLeft: index === 0 ? 0 : index === 1 ? -16 : -32 }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={styles.timelineContent}
                    >
                        <h3>{stages[index].title} Focus</h3>
                        <p>{stages[index].focus}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

const PillarsInteraction: React.FC = () => {
    const [focusedPillar, setFocusedPillar] = useState<number | null>(null);
    const pillars = [
        { title: "Physical Rest", icon: "🛌", content: "Your mind cannot heal if your body is exhausted. We focus on 'radical rest'." },
        { title: "Village", icon: "🤝", content: "Isolation is the greatest enemy of wellness. You need a physiological village." },
        { title: "Flexibility", icon: "🧠", content: "Embracing the 'good enough' parent. Quiet your inner critic with gentle tools." },
        { title: "Movement", icon: "🚶‍♀️", content: "Establishing connection between physical self and emotional state." }
    ];

    return (
        <section className={`${styles.section} ${styles.pillarsSection}`} style={{ background: '#f8fafc' }}>
            <h2 className={styles.sectionTitle}>Pillars of Your Wellness</h2>
            <p className={styles.sectionSubtitle}>Drag a pillar into the Focus Zone to reveal its supportive guidance.</p>

            <motion.div
                className={`${styles.focusZone} ${focusedPillar !== null ? styles.focusZoneActive : ''}`}
            >
                {focusedPillar === null ? "Drop a pillar here" : (
                    <div style={{ textAlign: 'center', padding: '0 20px' }}>
                        <span style={{ fontSize: '32px' }}>{pillars[focusedPillar].icon}</span>
                        <h3>{pillars[focusedPillar].title}</h3>
                        <p>{pillars[focusedPillar].content}</p>
                        <button
                            className={styles.supportBtn}
                            style={{ background: '#10b981', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}
                            onClick={() => setFocusedPillar(null)}
                        >
                            Reset
                        </button>
                    </div>
                )}
            </motion.div>

            <div className={styles.pillarGrid}>
                {pillars.map((pillar, idx) => (
                    <motion.div
                        key={idx}
                        className={`${styles.pillarCard} ${styles.pillarDraggable}`}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.5}
                        onDragEnd={(_, info) => {
                            if (info.offset.y < -100) {
                                setFocusedPillar(idx);
                            }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className={styles.pillarHeader}>
                            <span style={{ fontSize: '24px' }}>{pillar.icon}</span>
                            <h4 style={{ margin: 0 }}>{pillar.title}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const EmotionalPath: React.FC = () => {
    const [step, setStep] = useState(0);
    const [mood, setMood] = useState<string | null>(null);

    const moods = [
        { emoji: '☁️', val: "It's okay to feel heavy.", prompt: "What is one small thing you can let go of right now?", action: "Take two deep breaths." },
        { emoji: '☀️', val: "We celebrate your brightness.", prompt: "How can you share this warmth with yourself today?", action: "Savour this feeling." },
        { emoji: '🌈', val: "Your complexity is beautiful.", prompt: "What light are you finding in the rain?", action: "Write down one victory." },
        { emoji: '🌙', val: "Find peace in the quiet.", prompt: "What does your inner world need tonight?", action: "Dim the lights and rest." },
        { emoji: '🌊', val: "Allow the waves to pass.", prompt: "How can you flow with this change?", action: "Place a hand on your heart." }
    ];

    const currentMood = moods.find(m => m.emoji === mood);

    return (
        <section className={styles.section}>
            <div className={styles.checkInBox}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>How is your heart today?</h2>
                <p style={{ color: '#666' }}>Follow the path to a moment of validation and grounding.</p>

                <div className={styles.emojiGrid}>
                    {moods.map(m => (
                        <button
                            key={m.emoji}
                            className={`${styles.emojiBtn} ${mood === m.emoji ? styles.selected : ''}`}
                            onClick={() => { setMood(m.emoji); setStep(1); }}
                        >
                            {m.emoji}
                        </button>
                    ))}
                </div>

                <div className={styles.emojiRevealContainer}>
                    <AnimatePresence mode="wait">
                        {step >= 1 && currentMood && (
                            <motion.div
                                key={mood + "-1"}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={styles.revealContent}
                                style={{ marginTop: '20px' }}
                            >
                                <p style={{ fontWeight: 700, color: '#0d9488' }}>{currentMood.val}</p>
                                {step === 1 && <button className={styles.supportBtn} onClick={() => setStep(2)} style={{ padding: '8px 16px', marginTop: '10px', background: '#f1f5f9', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>Next</button>}

                                {step >= 2 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                                        <p style={{ fontStyle: 'italic', color: '#64748b' }}>{currentMood.prompt}</p>
                                        {step === 2 && <button className={styles.supportBtn} onClick={() => setStep(3)} style={{ padding: '8px 16px', marginTop: '10px', background: '#f1f5f9', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>Next</button>}
                                    </motion.div>
                                )}

                                {step >= 3 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                                        <p style={{ fontWeight: 600 }}>Action: {currentMood.action}</p>
                                        <button className={styles.supportBtn} onClick={() => { setMood(null); setStep(0); }} style={{ padding: '8px 16px', marginTop: '10px', background: '#0d9488', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>Reset</button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const CommunityStories: React.FC = () => {
    const stories = [
        { name: "Maya, Week 12", quote: "I thought I had to do it all alone. The day I asked for help was the day I started feeling like myself again.", theme: "Asking for Help" },
        { name: "Priya, 3 Months Postpartum", quote: "The 'baby blues' felt like a storm, but knowing it was hormonal made it manageable.", theme: "Hormonal shifts" },
        { name: "Sarah, Planning", quote: "Setting mental boundaries before the baby arrived helped me protect my peace later on.", theme: "Preparation" }
    ];

    return (
        <section className={styles.section} style={{ background: '#fdfcfb', overflow: 'hidden' }}>
            <h2 className={styles.sectionTitle}>Voices of the Journey</h2>
            <p className={styles.sectionSubtitle}>Drag to explore reflections from others who have walked this path.</p>
            <motion.div
                className={styles.storyCarousel}
                drag="x"
                dragConstraints={{ left: -300, right: 0 }}
                style={{ display: 'flex', gap: '30px', cursor: 'grab', padding: '20px 0' }}
            >
                {stories.map((story, idx) => (
                    <motion.div
                        key={idx}
                        className={styles.storyCard}
                        style={{ minWidth: '300px', height: '250px', background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}
                    >
                        <span style={{ background: '#f0fdfa', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: '#0d9488', fontWeight: 700 }}>{story.theme}</span>
                        <p style={{ fontStyle: 'italic', fontSize: '15px', marginTop: '20px', color: '#444' }}>"{story.quote}"</p>
                        <p style={{ marginTop: '20px', fontWeight: 800, fontSize: '13px', color: '#666' }}>— {story.name}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

const DailyToolsInteractive: React.FC = () => {
    const [activeTool, setActiveTool] = useState<number | null>(null);
    const tools = [
        { title: "4-Breath Anchor", icon: "🌬️", detail: "Inhale for 4, hold for 1, exhale for 6. Focus on the physical sensation of breath." },
        { title: "Gratitude Micro-Write", icon: "📔", detail: "Name one thing that felt soft or kind today, like a warm cup of tea." },
        { title: "Safe Space Visual", icon: "🏡", detail: "Close your eyes and visualize a place where you feel completely safe and calm." }
    ];

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Gentle Daily Tools</h2>
            <p className={styles.sectionSubtitle}>Drag a tool into the "Today's Focus" area to see instructions.</p>

            <div className={styles.toolsDropZone}>
                {activeTool === null ? (
                    <p style={{ color: '#94a3b8' }}>Drag and drop a tool here</p>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ textAlign: 'center' }}
                    >
                        <span style={{ fontSize: '40px' }}>{tools[activeTool].icon}</span>
                        <h3>{tools[activeTool].title}</h3>
                        <p style={{ maxWidth: '400px', margin: '10px auto', lineHeight: '1.6' }}>{tools[activeTool].detail}</p>
                        <button className={styles.supportBtn} onClick={() => setActiveTool(null)} style={{ marginTop: '20px', padding: '8px 20px', borderRadius: '30px', border: 'none', background: '#0d9488', color: 'white', cursor: 'pointer' }}>Reset</button>
                    </motion.div>
                )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '30px' }}>
                {tools.map((tool, idx) => (
                    <motion.div
                        key={idx}
                        className={styles.toolChip}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.y < -100) setActiveTool(idx);
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <span>{tool.icon}</span> {tool.title}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const BodySignalsMap: React.FC = () => {
    const [selectedZone, setSelectedZone] = useState<number | null>(null);
    const zones = [
        { name: "Mind", center: { x: 50, y: 15 }, color: "#fef2f2", message: "Racing thoughts? Try a grounding breath." },
        { name: "Heart", center: { x: 50, y: 40 }, color: "#fff1f2", message: "Feeling heavy? Gentle validation: You are doing enough." },
        { name: "Shoulders", center: { x: 50, y: 30 }, color: "#f8fafc", message: "Tension? A slow roll of the shoulders can signal safety to the brain." },
        { name: "Breath", center: { x: 50, y: 55 }, color: "#f0fdf4", message: "Short breaths? Place a hand on your belly for comfort." }
    ];

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Signals to Pause</h2>
            <p className={styles.sectionSubtitle}>Click a zone for a gentle grounding suggestion.</p>
            <div className={styles.bodyMapContainer}>
                <svg viewBox="0 0 100 200" width="200" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))' }}>
                    <path
                        d="M50,10 C40,10 35,15 35,25 C35,35 40,40 50,40 C60,40 65,35 65,25 C65,15 60,10 50,10 M35,40 C30,45 20,60 20,80 L25,120 L35,120 L35,180 L45,180 L45,140 L55,140 L55,180 L65,180 L65,120 L75,120 L80,80 C80,60 70,45 65,40"
                        fill="#f1f5f9"
                        stroke="#cbd5e1"
                        strokeWidth="1"
                    />
                    {zones.map((zone, idx) => (
                        <circle
                            key={idx}
                            cx={zone.center.x}
                            cy={zone.center.y}
                            r="6"
                            fill={zone.color}
                            stroke={selectedZone === idx ? "#0d9488" : "#94a3b8"}
                            strokeWidth="1.5"
                            className={styles.bodyZone}
                            onClick={() => setSelectedZone(idx)}
                        />
                    ))}
                </svg>

                <AnimatePresence mode="wait">
                    {selectedZone !== null && (
                        <motion.div
                            key={selectedZone}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className={styles.zoneDetails}
                        >
                            <h4 style={{ color: '#0d9488', marginBottom: '10px' }}>{zones[selectedZone].name}</h4>
                            <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#475569' }}>{zones[selectedZone].message}</p>
                            <button
                                className={styles.supportBtn}
                                style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', marginTop: '15px' }}
                                onClick={() => setSelectedZone(null)}
                            >
                                Close
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

// --- Main Page Component ---

const PerinatalWellnessJourney: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.perinatalWellnessPage}>
            <div className={styles.heroWrapper}>
                <HealingParticleBackground />
                <InnerPageHero
                    title="Perinatal Wellness Journey"
                    subtitle="A supportive space for your emotional health. We walk beside you through the delicate transitions of pregnancy and early motherhood."
                    badge="Emotional Wellbeing"
                >
                    <button
                        onClick={() => navigate(ROUTES.JOURNEYS)}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px solid rgba(255,255,255,0.4)',
                            color: 'white',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 600,
                            backdropFilter: 'blur(5px)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        ← Back to Paths
                    </button>
                </InnerPageHero>
            </div>

            {/* 1. Wellness Over Time */}
            <WellnessTimeline />

            {/* 2. Pillars Interaction */}
            <PillarsInteraction />

            {/* 3. Emotional Path Reveal */}
            <EmotionalPath />

            {/* 4. Community Stories Carousel */}
            <CommunityStories />

            {/* 5. Daily Tools Draggable */}
            <DailyToolsInteractive />

            {/* 6. Body Signals Map */}
            <BodySignalsMap />

            {/* When to Seek Help */}
            <section className={styles.section}>
                <div className={styles.supportBox}>
                    <h2 style={{ color: '#991b1b', fontSize: '26px', fontWeight: '900', textAlign: 'left' }}>Knowing When You Need More</h2>
                    <p style={{ color: '#7f1d1d', marginTop: '10px' }}>You don't have to wait until you're drowning to ask for a lifeline. Professional support is a gift to your future self.</p>
                    <div className={styles.supportGrid}>
                        <div className={styles.supportItem}>
                            <span style={{ fontSize: '20px' }}>‼️</span>
                            <div>
                                <h4 style={{ margin: 0, color: '#991b1b' }}>Intense Fear or Panic</h4>
                                <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#450a0a' }}>If anxiety prevents you from sleeping even when the baby is resting.</p>
                            </div>
                        </div>
                        <div className={styles.supportItem}>
                            <span style={{ fontSize: '20px' }}>‼️</span>
                            <div>
                                <h4 style={{ margin: 0, color: '#991b1b' }}>Disconnected Feelings</h4>
                                <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#450a0a' }}>If you feel 'numb' or are having trouble bonding with your baby.</p>
                            </div>
                        </div>
                        <div className={styles.supportItem}>
                            <span style={{ fontSize: '20px' }}>‼️</span>
                            <div>
                                <h4 style={{ margin: 0, color: '#991b1b' }}>Harmful Thoughts</h4>
                                <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#450a0a' }}>Any thoughts of harming yourself or the baby—this is a medical emergency.</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <button
                            className={styles.supportBtn}
                            style={{ background: '#991b1b', color: 'white', border: 'none', padding: '14px 30px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}
                            onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        >
                            Schedule a Private Wellness Consult
                        </button>
                    </div>
                </div>
            </section>

            {/* Related Journeys */}
            <section className={styles.section} style={{ textAlign: 'center', background: '#fafaf9' }}>
                <h2 className={styles.sectionTitle}>Continue Your Path</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '40px' }}>
                    <div
                        style={{ background: 'white', padding: '30px', borderRadius: '24px', cursor: 'pointer', border: '1px solid #f1f5f9' }}
                        onClick={() => navigate(ROUTES.MENTAL_WELLNESS)}
                    >
                        <span style={{ fontSize: '30px' }}>🧠</span>
                        <h4 style={{ marginTop: '15px' }}>Holistic Mental Wellness</h4>
                        <p style={{ fontSize: '14px', color: '#666' }}>Deeper tools for long-term emotional health.</p>
                    </div>
                    <div
                        style={{ background: 'white', padding: '30px', borderRadius: '24px', cursor: 'pointer', border: '1px solid #f1f5f9' }}
                        onClick={() => navigate(ROUTES.POSTPARTUM)}
                    >
                        <span style={{ fontSize: '30px' }}>🤱</span>
                        <h4 style={{ marginTop: '15px' }}>Postpartum Recovery</h4>
                        <p style={{ fontSize: '14px', color: '#666' }}>Physical healing and tracking your Fourth Trimester.</p>
                    </div>
                </div>
                <div style={{ marginTop: '60px', fontStyle: 'italic', color: '#94a3b8' }}>
                    "Someone walking beside you — not telling you what to do."
                </div>
            </section>
        </div>
    );
};

export default PerinatalWellnessJourney;
