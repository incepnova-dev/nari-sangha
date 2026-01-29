import React, { useState } from "react";
import styles from "./GovernmentSchemes.module.css";
import InnerPageHero from "../shared/InnerPageHero";

interface Scheme {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: string[];
    benefits: string[];
    eligibility: string[];
    documents: string[];
    steps: string[];
    icon: string;
    badges: string[];
    color?: string;
}

const SCHEMES: Scheme[] = [
    {
        id: "jsy",
        title: "Janani Suraksha Yojana (JSY)",
        description: "Safe motherhood intervention promoting institutional delivery with cash assistance.",
        tags: ["pregnancy", "delivery", "cash"],
        category: ["pregnancy"],
        benefits: [
            "Rural Mothers: ₹1,400 cash assistance for institutional birth",
            "Urban Mothers: ₹1,000 cash assistance for institutional birth",
            "BPL Mothers: ₹500 for home delivery (19+ years)",
            "ASHA Support: Escort to hospital & facilitated admission",
            "Post-delivery: Cash is paid at the center itself"
        ],
        eligibility: [
            "All pregnant women (LPA states)",
            "BPL/SC/ST women (HPA states)",
            "19 years of age and above"
        ],
        documents: ["Jadav / MCP Card", "Aadhaar Card", "Bank Account Details", "BPL Card (if applicable)"],
        steps: ["Register with ASHA/ANM", "Get at least 3 ANC checkups", "Deliver at Govt Facility", "Receive Bank Transfer"],
        icon: "🤰",
        badges: ["Gov. Hospital", "Cash Aid", "ASHA Help"]
    },
    {
        id: "rbsk",
        title: "RBSK (Rashtriya Bal Swasthya Karyakram)",
        description: "Child health screening and early intervention for 30+ health conditions.",
        tags: ["kids", "health", "surgery"],
        category: ["kids"],
        benefits: [
            "Health Screening: Mobile health teams visit schools/Anganwadis",
            "Free Treatment: Cost of surgery for heart defects, cleft lip, etc.",
            "4 D's Coverage: Defects, Deficiencies, Diseases, Delays",
            "Aids: Free glasses, hearing aids, mobility aids",
            "Referral: Transport to tertiary care centers"
        ],
        eligibility: [
            "Newborns to 6 years (Anganwadi)",
            "6 to 18 years (Govt Schools)",
            "Children with birth defects"
        ],
        documents: ["School ID / Anganwadi reg", "Screening Card", "Aadhaar (if available)", "Referral Slip"],
        steps: ["Attend Camp/School Visit", "Get Screened by Team", "Receive Referral Card", "Visit DEIC Center"],
        icon: "👶",
        badges: ["Screening", "Surgery", "Development"]
    },
    {
        id: "jssk",
        title: "JSSK (Janani Shishu Suraksha Karyakram)",
        description: "Absolute cashless services for pregnant women and sick infants (up to 1 year).",
        tags: ["pregnancy", "newborn", "free"],
        category: ["pregnancy", "kids"],
        benefits: [
            "Delivery: Free normal or C-section delivery",
            "Transport: Free pick-up & drop-back (102 Ambulance)",
            "Diagnostics: Free blood, urine tests & ultrasound",
            "Blood: Free blood transfusion if needed",
            "Newborns: Free treatment for sick infants (up to 1 yr)"
        ],
        eligibility: [
            "All Pregnant Women (Govt Facility)",
            "Sick Infants (0-1 year)",
            "No income criteria"
        ],
        documents: ["MCP Card", "Aadhaar Card", "OPD/IPD Slip"],
        steps: ["Call 102 for transport", "Admit to Govt Hospital", "Show ID/Registration", "Avail Cashless Care"],
        icon: "🚑",
        badges: ["Zero Cost", "Free Drugs", "Free Diet"]
    },
    {
        id: "parivar-vikas",
        title: "Mission Parivar Vikas",
        description: "High-quality family planning choices and reproductive health services.",
        tags: ["family", "planning", "preventive"],
        category: ["family", "preventive"],
        benefits: [
            "Contraceptives: Free Condoms, OCPs (Mala-N), ECPs",
            "Injectables: 'Antara' (MPA) injections (free)",
            "Sterilization: Compensation for loss of wages",
            "Kits: 'Nayi Pehal' kit for newlyweds (in focus districts)",
            "Counseling: Pre-marriage & family planning guidance"
        ],
        eligibility: [
            "Eligible Couples (15-49 yrs)",
            "Newlyweds",
            "Post-partum women"
        ],
        documents: ["Aadhaar Card", "Marriage Proof (optional)", "Mobile Number"],
        steps: ["Visit PHC/CHC/Sub-center", "Consult Counsellor", "Choose Method", "Receive Supply/Service"],
        icon: "👨‍👩‍👧‍👦",
        badges: ["Contraceptives", "Counseling", "Nayi Pehal"]
    },
    {
        id: "esic",
        title: "ESIC Maternity Benefit",
        description: "Paid maternity leave and medical care for women in organized sector jobs.",
        tags: ["work", "pregnancy", "insurance"],
        category: ["pregnancy"],
        benefits: [
            "Full Pay: 100% of average daily wages for 26 weeks",
            "Medical Bonus: ₹5,000 cash if no medical care provided by employer",
            "Miscarriage: 6 weeks paid leave following miscarriage",
            "Sickness: Extra 1 month leave for pregnancy complications",
            "Extension: Can be extended on medical advice"
        ],
        eligibility: [
            "Insured Women (IP)",
            "Income < ₹21,000/mo",
            "Contribution > 70 days"
        ],
        documents: ["ESIC E-Pehchan Card", "Form 19 (Claim)", "Medical Certificate"],
        steps: ["Notify Employer", "Get Medical Cert", "Submit to ESIC Branch", "Receive Bank Transfer"],
        icon: "💼",
        badges: ["Paid Leave", "26 Weeks", "Medical Bonus"]
    },
    {
        id: "ssy",
        title: "Sukanya Samriddhi Yojana (SSY)",
        description: "High-interest government savings scheme specifically for the girl child.",
        tags: ["finance", "girlchild", "future"],
        category: ["family", "empowerment"],
        benefits: [
            "High Return: Interest rate usually higher than PPF/FD",
            "Tax Benefit: Section 80C deduction (EEE status)",
            "Low Entry: Open account with just ₹250",
            "Maturity: 21 years or upon marriage (after 18)",
            "Withdrawal: 50% allowed for higher education at 18"
        ],
        eligibility: [
            "Girl child < 10 years",
            "Max 2 girls per family",
            "Parents/Guardians"
        ],
        documents: ["Birth Certificate", "Parent's Aadhaar/PAN", "Initial Deposit (₹250)"],
        steps: ["Visit Post Office/Bank", "Fill SSY Form", "Deposit Cash/Cheque", "Get Passbook"],
        icon: "💰",
        badges: ["High Interest", "Tax Free", "Education"]
    },
    {
        id: "bbbp",
        title: "Beti Bachao Beti Padhao",
        description: "Campaign to prevent gender-biased sex selection and ensure girl child education.",
        tags: ["girlchild", "education", "awareness"],
        category: ["empowerment"],
        benefits: [
            "Protection: Strict enforcement of PC-PNDT Act",
            "Education: 100% enrollment drives for girls in schools",
            "Infrastructure: Functional toilets for girls in schools",
            "Incentives: Linkage to local reward schemes",
            "Community: Guddi-Gudda Boards to track birth ratios"
        ],
        eligibility: [
            "Girl Children",
            "Parents & Communities",
            "Districts with low CSR"
        ],
        documents: ["Birth Certificate", "School Admission Forms", "Aadhaar (Child/Parent)"],
        steps: ["Contact Anganwadi", "Enroll girl in school", "Report violations", "Join local drives"],
        icon: "🎓",
        badges: ["CSR", "Enrollment", "Awareness"]
    },
    {
        id: "poshan",
        title: "Poshan Abhiyaan",
        description: "Holistic nutrition program to reduce stunting, undernutrition, and anemia.",
        tags: ["nutrition", "health", "kids"],
        category: ["kids", "preventive"],
        benefits: [
            "Monitoring: Growth tracking via 'Poshan Tracker' app",
            "Supplements: IFA tablets and deworming",
            "Events: Community Based Events (Godh Bharai)",
            "Fortification: Access to fortified rice/milk/salt",
            "Counseling: Door-to-door advice on balanced diet"
        ],
        eligibility: [
            "Children (0-6 yrs)",
            "Adolescent Girls",
            "Pregnant/Lactating Women"
        ],
        documents: ["Aadhaar (for app)", "Mobile Number", "MCP Card"],
        steps: ["Visit Anganwadi", "Get height/weight measured", "Check status on App", "Get nutrition counseling"],
        icon: "🥕",
        badges: ["Tech Tracking", "Diet Diversity", "Anemia Mukt"]
    },
    {
        id: "sakhi",
        title: "Sakhi (One Stop Centre)",
        description: "Integrated support for women affected by violence, in private or public spaces.",
        tags: ["safety", "violence", "support"],
        category: ["safety"],
        benefits: [
            "Emergency Response: Immediate rescue & medical aid",
            "Police Assistance: Help filing FIR/NCR on site",
            "Legal Aid: Free legal counseling and court support",
            "Shelter: Temporary stay (up to 5 days) with food",
            "Counseling: Psycho-social support for trauma"
        ],
        eligibility: [
            "Any woman facing violence",
            "All ages (girls & women)",
            "Domestic/Sexual violence victims"
        ],
        documents: ["None mandatory initially", "ID (if available)", "Any evidence (if available)"],
        steps: ["Call 181 (Women Helpline)", "Go to Sakhi Centre", "Meet Caseworker", "Receive Support"],
        icon: "🛡️",
        badges: ["Legal Aid", "Medical", "Shelter"]
    },
    {
        id: "pmmvy",
        title: "PMMVY (Matru Vandana Yojana)",
        description: "Direct cash transfer scheme for pregnant women and lactating mothers.",
        tags: ["pregnancy", "cash", "family"],
        category: ["pregnancy", "family"],
        benefits: [
            "Installment 1: ₹1,000 on early registration",
            "Installment 2: ₹2,000 after 6 months ANC",
            "Installment 3: ₹2,000 after birth and immunization",
            "Total Aid: ₹5,000 directly to bank account",
            "Second Child: Benefits for second child if it's a girl"
        ],
        eligibility: [
            "First time pregnant mothers",
            "Beneficiaries of APL/BPL",
            "Not in govt employment"
        ],
        documents: ["Aadhaar Card", "Bank Passbook", "MCP Card", "Registration at govt health center"],
        steps: ["Register at Anganwadi/Health Center", "Apply within 150 days of LMP", "Submit claim forms", "Verification & DBT"],
        icon: "🤰",
        badges: ["₹5,000 Cash", "First Child", "DBT"]
    }
];

const GovernmentSchemes: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [expandedScheme, setExpandedScheme] = useState<string | null>(null);
    const [savedSchemes, setSavedSchemes] = useState<Set<string>>(new Set());

    const filters = [
        { id: "all", label: "All Programs", icon: "🏢" },
        { id: "pregnancy", label: "Pregnancy", icon: "🤰" },
        { id: "kids", label: "Kids", icon: "👶" },
        { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
        { id: "preventive", label: "Preventive", icon: "🛡️" },
        { id: "safety", label: "Safety", icon: "👮‍♀️" },
        { id: "empowerment", label: "Empowerment", icon: "💪" }
    ];

    const filteredSchemes = activeFilter === "all"
        ? SCHEMES
        : SCHEMES.filter(s => s.category.includes(activeFilter));

    const toggleSave = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const next = new Set(savedSchemes);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSavedSchemes(next);
    };

    const toggleExpand = (id: string) => {
        setExpandedScheme(expandedScheme === id ? null : id);
    };

    return (
        <div className={styles.schemesPage}>
            <InnerPageHero
                title="Government Health Schemes"
                subtitle="Discover public programs, benefits, and financial assistance for women's healthcare. Access free or low-cost services designed to support your health journey."
                badge="Public Benefits"
                centered
            />

            {/* HUD */}
            <div className={styles["kp-hud"]}>
                <div className={styles["kp-hud__item"]}>
                    <div className={styles["kp-hud__icon"]}>🏆</div>
                    <div className={styles["kp-hud__txt"]}>
                        <strong>Quest</strong>
                        <span>Available: {SCHEMES.length}</span>
                    </div>
                </div>
                <div className={styles["kp-hud__item"]}>
                    <div className={styles["kp-hud__icon"]}>💎</div>
                    <div className={styles["kp-hud__txt"]}>
                        <strong>Saved</strong>
                        <span>{savedSchemes.size}</span>
                    </div>
                </div>
                <div className={styles["kp-hud__item"]}>
                    <div className={styles["kp-hud__icon"]}>⚡</div>
                    <div className={styles["kp-hud__txt"]}>
                        <strong>Unlocked</strong>
                        <span>{expandedScheme ? 1 : 0} / 1</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <section className={styles.filtersSection}>
                <div className={styles.filtersContainer}>
                    {filters.map(f => (
                        <button
                            key={f.id}
                            className={`${styles.filterBtn} ${activeFilter === f.id ? styles.filterBtnActive : ""}`}
                            onClick={() => setActiveFilter(f.id)}
                        >
                            <span>{f.icon}</span>
                            {f.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <main className={styles.schemesGrid}>
                {filteredSchemes.map(scheme => (
                    <article
                        key={scheme.id}
                        className={styles.schemeCard}
                        onClick={() => toggleExpand(scheme.id)}
                    >
                        <div className={styles.cardTop}>
                            <div className={styles.emblem}>{scheme.icon}</div>
                            <div className={styles.cardHead}>
                                <h3>{scheme.title}</h3>
                                <p>{scheme.description}</p>
                                <div className={styles.badges}>
                                    {scheme.badges.map(b => (
                                        <span key={b} className={styles.badge}>{b}</span>
                                    ))}
                                </div>
                            </div>
                            <button
                                className={`${styles.saveBtn} ${savedSchemes.has(scheme.id) ? styles.saveBtnActive : ""}`}
                                onClick={(e) => toggleSave(e, scheme.id)}
                            >
                                {savedSchemes.has(scheme.id) ? "★" : "☆"}
                            </button>
                        </div>

                        <div className={`${styles.drawer} ${expandedScheme === scheme.id ? styles.drawerOpen : ""}`}>
                            <div className={styles.drawerContent}>
                                <div className={styles.panel}>
                                    <h4>🎁 What you get</h4>
                                    <ul className={styles.list}>
                                        {scheme.benefits.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.panel}>
                                    <h4>✅ Who it helps</h4>
                                    <ul className={styles.list}>
                                        {scheme.eligibility.map((e, i) => (
                                            <li key={i}>{e}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.panel}>
                                    <h4>📋 Bring these</h4>
                                    <div className={styles.chips}>
                                        {scheme.documents.map((d, i) => (
                                            <span key={i} className={styles.chip}>{d}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.panel}>
                                    <h4>🗺️ 60-second path</h4>
                                    <div className={styles.steps}>
                                        {scheme.steps.map((s, i) => (
                                            <div key={i} className={styles.stepItem}>
                                                <div className={styles.stepNum}>{i + 1}</div>
                                                <div className={styles.stepText}>{s}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className={styles.expandBtn}>
                            {expandedScheme === scheme.id ? "Close details" : "Unlock details"}
                        </button>
                    </article>
                ))}
            </main>
        </div>
    );
};

export default GovernmentSchemes;
