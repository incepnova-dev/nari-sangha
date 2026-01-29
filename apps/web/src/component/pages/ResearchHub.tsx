import React, { useState } from "react";
import styles from "./ResearchHub.module.css";
import InnerPageHero from "../shared/InnerPageHero";

type Mode = "cycle" | "fertilization" | "menstruation" | "pcos" | "endo" | "protection" | "adeno";
type CancerType = "breast" | "cervical" | "ovarian";

const ResearchHub: React.FC = () => {
    const [mode, setMode] = useState<Mode>("cycle");
    const [cancer, setCancer] = useState<CancerType>("breast");

    const modeLabels: Record<Mode, string> = {
        cycle: "Healthy Cycle",
        fertilization: "Fertilization",
        menstruation: "Menstruation",
        pcos: "PCOS",
        endo: "Endometriosis",
        protection: "Hormonal Protection",
        adeno: "Adenomyosis"
    };

    const modeDescs: Record<Mode, { title: string; text: string }> = {
        cycle: {
            title: "Healthy Cycle",
            text: "This is the monthly rhythm of your body. An egg matures in the ovary, is released (ovulation), and travels down the fallopian tube. If not fertilized, the cycle resets."
        },
        fertilization: {
            title: "Fertilization",
            text: "Sperm meets the egg in the fallopian tube. The fertilized egg then travels to the uterus to implant in the lining, beginning a pregnancy."
        },
        menstruation: {
            title: "Menstruation",
            text: "When no pregnancy occurs, the thickened lining of the uterus sheds. This is your period, signifyin the start of a new hormonal cycle."
        },
        pcos: {
            title: "PCOS",
            text: "Polycystic Ovary Syndrome involves hormonal imbalances that can lead to multiple small follicles on the ovaries and irregular cycles."
        },
        endo: {
            title: "Endometriosis",
            text: "Tissue similar to the lining of the uterus grows outside the uterus, potentially causing inflammation, pain, and scarring."
        },
        protection: {
            title: "Hormonal Protection",
            text: "Healthy lifestyle choices and proper hormonal balance support the health of your reproductive organs and reduce long-term risks."
        },
        adeno: {
            title: "Adenomyosis",
            text: "Tissue that normally lines the uterus grows into the muscular wall of the uterus, often causing heavy bleeding and pelvic pain."
        }
    };

    return (
        <div className={styles.researchPage}>
            <InnerPageHero
                title="Research & Health Insights"
                subtitle="Evidence-based articles, latest research, and expert insights on women's health topics. Explore interactive guides to understand your body's complex systems."
                badge="Health Science"
                centered
            />

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.journeyHeader}>
                        <h2>The Science of Your Body's Journey</h2>
                        <p className={styles.sub}>Evidence-based insights for every stage of your reproductive health</p>
                    </div>

                    <div className={styles.anatomicalJourney}>
                        <div className={styles.anatomyVisualization}>
                            <div className={styles.eduControls}>
                                <div className={styles.controlHeader}>
                                    <span className={styles.pulseDot}></span>
                                    <span id="activeModeLabel">Live Anatomy: {modeLabels[mode]}</span>
                                </div>
                                <div className={styles.controlButtons}>
                                    {Object.keys(modeLabels).map((m) => (
                                        <button
                                            key={m}
                                            className={`${styles.modeBtn} ${mode === m ? styles.modeBtnActive : ""}`}
                                            onClick={() => setMode(m as Mode)}
                                        >
                                            {m === "cycle" && "🔄"}
                                            {m === "fertilization" && "👶"}
                                            {m === "menstruation" && "🩸"}
                                            {m === "pcos" && "⚪"}
                                            {m === "endo" && "🔥"}
                                            {m === "protection" && "🛡️"}
                                            {m === "adeno" && "⚖️"}
                                            {" " + (m.charAt(0).toUpperCase() + m.slice(1))}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <svg className={styles.enhancedSvg} viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <filter id="strongGlow">
                                        <feGaussianBlur stdDeviation="6" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <linearGradient id="uterusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: "#fce4ec", stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: "#f8bbd0", stopOpacity: 1 }} />
                                    </linearGradient>
                                    <linearGradient id="ovaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{ stopColor: "#e1bee7", stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: "#ce93d8", stopOpacity: 1 }} />
                                    </linearGradient>
                                    <filter id="softGlow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                    </filter>
                                </defs>

                                <g opacity="0.1">
                                    <ellipse cx="200" cy="150" rx="80" ry="100" fill="#e1bee7" />
                                    <ellipse cx="200" cy="300" rx="90" ry="150" fill="#f8bbd0" />
                                </g>

                                <g className="anatomy-core">
                                    <path d="M 200 320 Q 170 300, 160 280 L 160 250 Q 160 230, 180 220 L 200 210 L 220 220 Q 240 230, 240 250 L 240 280 Q 230 300, 200 320 Z"
                                        fill="url(#uterusGrad)" stroke="#ec407a" strokeWidth="2" filter="url(#softGlow)"
                                    />
                                    <path d="M 160 240 Q 120 230, 100 240" stroke="#ec407a" strokeWidth="3" fill="none" strokeLinecap="round" />
                                    <path d="M 240 240 Q 280 230, 300 240" stroke="#ec407a" strokeWidth="3" fill="none" strokeLinecap="round" />
                                    <ellipse cx="95" cy="250" rx="22" ry="28" fill="url(#ovaryGrad)" stroke="#ab47bc" strokeWidth="2" />
                                    <ellipse cx="305" cy="250" rx="22" ry="28" fill="url(#ovaryGrad)" stroke="#ab47bc" strokeWidth="2" />
                                </g>

                                {mode === "cycle" && (
                                    <g id="cycle-animation">
                                        <circle cx="88" cy="245" r="4" fill="#fff" opacity="0.8">
                                            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <circle r="5" fill="#ffd54f">
                                            <animateMotion path="M 88 245 Q 120 230, 160 240" dur="3s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
                                        </circle>
                                        <text x="58" y="206" className={styles.vizLabel} fill="#c2185b">Ovulation</text>
                                        <text x="58" y="220" className={styles.vizSub} fill="#c2185b">Egg releases & enters tube</text>
                                    </g>
                                )}

                                {mode === "fertilization" && (
                                    <g id="fertilization-animation">
                                        <circle r="1.5" fill="#fff">
                                            <animateMotion path="M 200 320 Q 200 280, 240 240" dur="2s" repeatCount="indefinite" rotate="auto" />
                                        </circle>
                                        <circle cx="240" cy="240" r="0" fill="#fff">
                                            <animate attributeName="r" values="0;15;0" dur="1s" begin="1.5s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="1;0" dur="1s" begin="1.5s" repeatCount="indefinite" />
                                        </circle>
                                        <text x="165" y="375" className={styles.vizLabel} fill="#2e7d32">Fertilization</text>
                                        <text x="165" y="389" className={styles.vizSub} fill="#2e7d32">Sperm meets egg in tube</text>
                                    </g>
                                )}

                                {mode === "menstruation" && (
                                    <g id="menstruation-animation">
                                        <path d="M 180 250 Q 200 240, 220 250 L 220 280 Q 200 300, 180 280 Z" fill="#ef5350" opacity="0.3">
                                            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
                                        </path>
                                        <circle r="3" fill="#ef5350">
                                            <animateMotion path="M 200 280 L 200 350" dur="1.5s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" />
                                        </circle>
                                        <text x="132" y="200" className={styles.vizLabel} fill="#b71c1c">Menstruation</text>
                                        <text x="132" y="214" className={styles.vizSub} fill="#b71c1c">Lining sheds & cycle resets</text>
                                    </g>
                                )}

                                {mode === "pcos" && (
                                    <g id="pcos-animation">
                                        <ellipse cx="305" cy="250" rx="30" ry="36" fill="#ef9a9a" opacity="0.8">
                                            <animate attributeName="rx" values="30;32;30" dur="2s" repeatCount="indefinite" />
                                        </ellipse>
                                        <g fill="#fff" stroke="#e57373">
                                            <circle cx="290" cy="235" r="2.5" /><circle cx="300" cy="230" r="2.5" /><circle cx="310" cy="230" r="2.5" />
                                        </g>
                                        <text x="250" y="330" className={styles.vizLabel} fill="#e65100">PCOS</text>
                                        <text x="250" y="344" className={styles.vizSub} fill="#e65100">Multiple follicles; ovulation issues</text>
                                    </g>
                                )}

                                {mode === "endo" && (
                                    <g id="endo-animation">
                                        <g fill="#880e4f" stroke="#fff" strokeWidth="0.5">
                                            <circle cx="150" cy="230" r="4"><animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" /></circle>
                                            <circle cx="180" cy="330" r="5"><animate attributeName="r" values="5;6;5" dur="1.8s" repeatCount="indefinite" /></circle>
                                        </g>
                                        <text x="120" y="390" className={styles.vizLabel} fill="#4a148c">Endometriosis</text>
                                        <text x="120" y="404" className={styles.vizSub} fill="#4a148c">Tissue grows outside uterus</text>
                                    </g>
                                )}
                            </svg>

                            <div className={styles.eduDescBox}>
                                <strong>{modeDescs[mode].title}</strong>
                                <p>{modeDescs[mode].text}</p>
                            </div>
                        </div>

                        <div className={styles.topicsScroll}>
                            <div className={styles.topicSection}>
                                <h3>Quick Access Topics</h3>
                                <div className={styles.researchList}>
                                    <div className={styles.researchCard}>
                                        <h4>Hormonal Health</h4>
                                        <p>Understanding estrogen and progesterone throughout your life stages.</p>
                                    </div>
                                    <div className={styles.researchCard}>
                                        <h4>Fertility Science</h4>
                                        <p>The latest breakthroughs in reproductive assistance and IVF.</p>
                                    </div>
                                    <div className={styles.researchCard}>
                                        <h4>Preventive Care</h4>
                                        <p>Early detection strategies for common women's health conditions.</p>
                                    </div>
                                    <div className={styles.researchCard}>
                                        <h4>Menopause Transition</h4>
                                        <p>Research-backed ways to manage perimenopause symptoms.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cancer Visualizer Part */}
            <section className={`${styles.section} ${styles.alt}`}>
                <div className={styles.container}>
                    <div className={styles.journeyHeader}>
                        <h2>Cancer Research & Early Detection</h2>
                        <p className={styles.sub}>Visualizing detection stages and clinical survival data</p>
                    </div>

                    <div className={`${styles.anatomicalJourney} ${styles.cancer2col}`}>
                        <div className={styles.anatomyVisualization}>
                            <div className={styles.eduControls}>
                                <div className={styles.cancerSelector}>
                                    <button
                                        className={`${styles.cancerTab} ${cancer === 'breast' ? styles.cancerTabActive : ''}`}
                                        onClick={() => setCancer('breast')}
                                    >
                                        <strong>Breast Cancer</strong>
                                        <small>1 in 8 women</small>
                                    </button>
                                    <button
                                        className={`${styles.cancerTab} ${cancer === 'cervical' ? styles.cancerTabActive : ''}`}
                                        onClick={() => setCancer('cervical')}
                                    >
                                        <strong>Cervical Cancer</strong>
                                        <small>HPV Prevention</small>
                                    </button>
                                    <button
                                        className={`${styles.cancerTab} ${cancer === 'ovarian' ? styles.cancerTabActive : ''}`}
                                        onClick={() => setCancer('ovarian')}
                                    >
                                        <strong>Ovarian Cancer</strong>
                                        <small>Silent signs</small>
                                    </button>
                                </div>
                            </div>

                            <div className={styles.stageIntelPanel}>
                                <div className={styles.statRow}>
                                    <span>5-Year Survival</span>
                                    <span>{cancer === 'breast' ? '99%' : cancer === 'cervical' ? '92%' : '88%'} (Early)</span>
                                </div>
                                <div className={styles.survivalBarBg}>
                                    <div className={styles.survivalBarFill} style={{ width: cancer === 'breast' ? '99%' : '90%' }}></div>
                                </div>
                                <h4 className={styles.stageTitleText}>Understanding Early Detection</h4>
                                <p className={styles.stageDescText}>
                                    {cancer === 'breast' ? 'Regular mammograms and self-exams can catch breast cancer in Stage 0-1, where survival rates are near 100%.' :
                                        cancer === 'cervical' ? 'Pap smears and HPV testing can prevent almost all cervical cancers by catching pre-cancerous cells.' :
                                            'Ovarian cancer is often silent. Research focuses on genetic markers like BRCA1/2 for high-risk individuals.'}
                                </p>
                            </div>

                            <div className={styles.eduDescBox}>
                                <strong>Clinical Fact Sheet</strong>
                                <ul style={{ fontSize: '0.9rem', color: '#555', paddingLeft: '20px' }}>
                                    <li>Screening improves survival by 40%.</li>
                                    <li>Genetic testing available for family history.</li>
                                    <li>Early stage treatment is 70% less invasive.</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.topicsScroll}>
                            <h3>Latest Findings</h3>
                            <div className={styles.researchList}>
                                <div className={styles.researchCard}>
                                    <h4>AI in Diagnostics</h4>
                                    <p>How machine learning is helping radiologists identify breast lesions earlier than ever before.</p>
                                </div>
                                <div className={styles.researchCard}>
                                    <h4>HPV Vaccine Impact</h4>
                                    <p>Longitudinal study shows 90% drop in cervical cancer cases after nationwide vaccination drives.</p>
                                </div>
                                <div className={styles.researchCard}>
                                    <h4>Genetic Markers</h4>
                                    <p>New liquid biopsy research aims to detect ovarian cancer through a simple blood test.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResearchHub;
