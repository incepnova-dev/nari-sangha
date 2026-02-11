import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routeConstants";
import InnerPageHero from "../shared/InnerPageHero";
import SymptomsAnimation from "../shared/animations/SymptomsAnimation";

/* ───── data ───── */
interface SymptomDetail {
    id: string;
    label: string;
    icon: string;
    area: string;
    possibleCauses: string[];
    selfCare: string[];
    whenToWorry: string[];
    relatedScreenings: string[];
}

const SYMPTOM_DATA: SymptomDetail[] = [
    {
        id: "period", label: "Irregular periods / heavy bleeding", icon: "🩸", area: "Reproductive",
        possibleCauses: ["Hormonal imbalance (PCOS, thyroid)", "Uterine fibroids or polyps", "Endometriosis", "Stress or sudden weight change", "Perimenopause", "Medication side effects (anticoagulants, IUD)"],
        selfCare: ["Track cycle with an app for 3+ months", "Iron-rich foods (spinach, lentils, red meat)", "Avoid excessive caffeine & alcohol", "Warm compress for cramps", "NSAIDs (ibuprofen) per OTC label for pain"],
        whenToWorry: ["Soaking a pad/tampon every hour for 2+ hours", "Periods lasting longer than 7 days consistently", "Bleeding between periods or after intercourse", "Cycles shorter than 21 days or longer than 35 days", "Severe fatigue, pallor (possible anemia)"],
        relatedScreenings: ["Pelvic ultrasound", "Thyroid panel (TSH, T3, T4)", "Complete blood count (CBC)", "Hormonal panel (FSH, LH, estradiol)"]
    },
    {
        id: "pain", label: "Pelvic / lower abdominal pain", icon: "⚡", area: "Pelvic",
        possibleCauses: ["Menstrual cramps (dysmenorrhea)", "Ovulation pain (mittelschmerz)", "Endometriosis or adenomyosis", "Ovarian cyst (rupture/torsion)", "Pelvic inflammatory disease (PID)", "Ectopic pregnancy", "Urinary tract infection"],
        selfCare: ["Heat therapy (heating pad on lower abdomen)", "Gentle stretching or yoga (child's pose, cat-cow)", "OTC pain relief (ibuprofen, naproxen)", "Stay hydrated & avoid bladder irritants", "Rest in comfortable position with knees elevated"],
        whenToWorry: ["Sudden, sharp, one-sided pelvic pain", "Pain with fever above 38.3 °C / 101 °F", "Pain with vaginal bleeding during pregnancy", "Pain so severe you cannot stand or walk", "Dizziness or fainting with pelvic pain (internal bleeding sign)"],
        relatedScreenings: ["Pelvic examination", "Transvaginal ultrasound", "Urine culture & sensitivity", "Pregnancy test (beta-hCG)"]
    },
    {
        id: "discharge", label: "Unusual discharge / itching", icon: "🔬", area: "Vaginal",
        possibleCauses: ["Yeast infection (candidiasis)", "Bacterial vaginosis (BV)", "Sexually transmitted infections (chlamydia, gonorrhea, trichomoniasis)", "Allergic reaction (soaps, detergents, latex)", "Hormonal changes (pregnancy, menopause)", "Forgotten tampon or foreign body"],
        selfCare: ["Wear breathable cotton underwear", "Avoid douching or scented products", "Probiotic-rich foods (yogurt, kefir)", "Use unscented, pH-balanced intimate wash", "Change out of wet clothes/swimwear promptly"],
        whenToWorry: ["Green, grey, or foul-smelling discharge", "Discharge with pelvic pain or fever", "Blisters, sores, or ulcers on genitals", "Discharge with blood outside of period", "Persistent itching/burning not relieved by OTC treatment"],
        relatedScreenings: ["Wet mount microscopy", "STI panel (chlamydia, gonorrhea, HIV)", "Vaginal pH testing", "Pap smear (if overdue)"]
    },
    {
        id: "breast", label: "Breast lump / pain / discharge", icon: "🩺", area: "Breast",
        possibleCauses: ["Fibrocystic breast changes (hormonal)", "Breast cyst (fluid-filled)", "Fibroadenoma (benign solid lump)", "Mastitis (infection, often during breastfeeding)", "Hormonal fluctuations (premenstrual)", "Ductal ectasia (dilated milk ducts)", "Breast cancer (rare but important to rule out)"],
        selfCare: ["Well-fitted supportive bra", "Cold or warm compress for soreness", "Reduce caffeine intake", "Breast self-exam monthly (7-10 days after period)", "Evening primrose oil (some evidence for cyclical pain)"],
        whenToWorry: ["Hard, immovable lump that doesn't change with cycle", "Skin dimpling, puckering, or orange-peel texture", "Nipple discharge (especially bloody or clear from one side)", "Newly inverted nipple", "Swollen lymph nodes in armpit", "Persistent breast pain in one spot"],
        relatedScreenings: ["Clinical breast exam", "Mammogram (40+ or as advised)", "Breast ultrasound", "MRI (high-risk individuals)", "Biopsy if lump is suspicious"]
    },
    {
        id: "pregnancy", label: "Pregnancy concern (bleeding, pain, movements)", icon: "🤰", area: "Pregnancy",
        possibleCauses: ["Implantation bleeding (early pregnancy)", "Threatened or inevitable miscarriage", "Ectopic pregnancy", "Placenta previa / placental abruption", "Preeclampsia", "Preterm labor", "Reduced fetal movements (fetal distress)"],
        selfCare: ["Rest and avoid heavy lifting", "Stay hydrated (8-10 glasses/day)", "Count fetal kicks (28+ weeks: 10 movements in 2 hours)", "Left-side sleeping to improve blood flow", "Prenatal vitamins (folic acid, iron, calcium)"],
        whenToWorry: ["Vaginal bleeding with pain in any trimester", "Sudden severe headache or vision changes", "Swelling of face/hands with high BP", "Fewer than 10 movements in 2 hours (after 28 weeks)", "Gush of fluid (possible membrane rupture)", "Regular contractions before 37 weeks"],
        relatedScreenings: ["Beta-hCG blood test", "Dating ultrasound", "Anatomy scan (18-22 weeks)", "Glucose tolerance test (24-28 weeks)", "Group B strep test (35-37 weeks)"]
    },
    {
        id: "urinary", label: "Burning / frequent urination", icon: "💧", area: "Urinary",
        possibleCauses: ["Urinary tract infection (UTI)", "Interstitial cystitis (painful bladder syndrome)", "Overactive bladder", "Kidney stones", "Vaginal atrophy (menopause)", "Diabetes (polyuria)", "STI (chlamydia, gonorrhea)"],
        selfCare: ["Drink plenty of water (flush bacteria)", "Cranberry supplements (may help prevention)", "Urinate before and after intercourse", "Wipe front to back", "Avoid caffeine, alcohol, and spicy food (bladder irritants)", "D-mannose supplements (some evidence for UTI prevention)"],
        whenToWorry: ["Blood in urine (hematuria)", "Fever with back/flank pain (kidney infection)", "Inability to urinate or very small amounts", "Recurrent UTIs (3+ per year)", "Pain spreading to lower back or sides"],
        relatedScreenings: ["Urinalysis & urine culture", "Kidney function tests (BUN, creatinine)", "Pelvic ultrasound", "Cystoscopy (recurrent cases)"]
    },
    {
        id: "headache", label: "Headache / migraine", icon: "🧠", area: "Head & Neurological",
        possibleCauses: ["Tension headache (stress, posture)", "Migraine with or without aura", "Hormonal headache (menstrual migraine)", "Sinusitis", "Dehydration or skipped meals", "Medication overuse headache", "Pre-eclampsia (if pregnant)"],
        selfCare: ["Rest in a dark, quiet room", "Cold compress on forehead/neck", "Stay hydrated (dehydration is a common trigger)", "Regular sleep schedule (7-9 hrs)", "Identify & avoid personal triggers (food diary)", "OTC: paracetamol or ibuprofen (not in pregnancy unless advised)"],
        whenToWorry: ["Thunderclap headache (worst headache of your life, sudden onset)", "Headache with fever, stiff neck, rash (meningitis signs)", "Headache with vision changes or confusion", "Headache after head injury", "New headache pattern after age 50", "Headache with weakness or numbness on one side"],
        relatedScreenings: ["Blood pressure check", "Neurological examination", "Eye examination (papilledema)", "MRI/CT scan if red flags present"]
    },
    {
        id: "fatigue", label: "Persistent fatigue / weakness", icon: "😴", area: "General / Systemic",
        possibleCauses: ["Iron-deficiency anemia", "Hypothyroidism", "Vitamin D or B12 deficiency", "Depression or anxiety", "Sleep disorders (apnea, insomnia)", "Chronic fatigue syndrome", "Diabetes", "Autoimmune conditions (lupus, RA)"],
        selfCare: ["Consistent sleep/wake times", "Balanced meals with iron & protein", "Regular moderate exercise (30 min/day)", "Limit screen time before bed", "Manage stress (mindfulness, journaling)", "Sunlight exposure for Vitamin D & circadian rhythm"],
        whenToWorry: ["Fatigue lasting more than 2 weeks despite rest", "Unintentional weight loss with fatigue", "Shortness of breath or rapid heartbeat at rest", "Bruising easily or frequent infections", "Persistent low-grade fever", "Night sweats or swollen lymph nodes"],
        relatedScreenings: ["Complete blood count (CBC)", "Thyroid function (TSH)", "Iron studies (ferritin, TIBC)", "Vitamin D & B12 levels", "Fasting blood glucose / HbA1c", "Autoimmune markers (ANA, ESR, CRP)"]
    }
];

const BODY_AREAS = [
    { id: 'head', label: 'Head & Brain', icon: '🧠', symptoms: ['headache'] },
    { id: 'breast', label: 'Breast', icon: '🩺', symptoms: ['breast'] },
    { id: 'abdomen', label: 'Abdomen & Pelvic', icon: '⚡', symptoms: ['pain', 'period', 'pregnancy'] },
    { id: 'urinary', label: 'Urinary', icon: '💧', symptoms: ['urinary'] },
    { id: 'vaginal', label: 'Vaginal', icon: '🔬', symptoms: ['discharge'] },
    { id: 'general', label: 'General / Whole Body', icon: '😴', symptoms: ['fatigue'] },
];

const QUICK_STATS = [
    { value: '60s', label: 'Average triage time' },
    { value: '8', label: 'Symptom categories' },
    { value: '100%', label: 'Private & secure' },
    { value: '24/7', label: 'Available anytime' },
];

/* ───── component ───── */
const SymptomChecker: React.FC = () => {
    const navigate = useNavigate();
    const [selectedSymptom, setSelectedSymptom] = useState<string>("");
    const [severity, setSeverity] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [showResult, setShowResult] = useState(false);
    const [activeBodyArea, setActiveBodyArea] = useState<string | null>(null);
    const [expandedCondition, setExpandedCondition] = useState<string | null>(null);
    const [additionalSymptoms, setAdditionalSymptoms] = useState<string[]>([]);

    const emergencySigns = [
        "Severe pelvic/abdominal pain that is sudden or worsening",
        "Heavy bleeding (soaking a pad in an hour)",
        "Dizziness/fainting, shoulder pain (possible ectopic pregnancy)",
        "High fever with pelvic pain",
        "Pregnancy: severe headache, vision changes, sudden swelling",
        "Chest pain or breathing difficulty"
    ];

    const additionalSymptomOptions = [
        "Nausea / vomiting", "Fever / chills", "Dizziness / lightheadedness",
        "Back pain", "Bloating", "Loss of appetite", "Weight changes",
        "Sleep problems", "Mood changes", "Skin rashes"
    ];

    const selectedDetail = useMemo(() =>
        SYMPTOM_DATA.find(s => s.id === selectedSymptom) || null,
        [selectedSymptom]);

    const filteredSymptoms = useMemo(() => {
        if (!activeBodyArea) return SYMPTOM_DATA;
        const area = BODY_AREAS.find(a => a.id === activeBodyArea);
        return area ? SYMPTOM_DATA.filter(s => area.symptoms.includes(s.id)) : SYMPTOM_DATA;
    }, [activeBodyArea]);

    const getTriageResult = () => {
        if (!selectedSymptom || !severity || !duration) return null;
        let level = "green"; let heading = "Self-care + monitor";
        let msg = "Your answers suggest starting with self-care and monitoring. If symptoms persist, book a consult.";
        let action = "Read Care Guide";
        let timeline = "Monitor for 24-48 hours. If no improvement, schedule a consult.";
        let selfCareSteps = selectedDetail?.selfCare.slice(0, 3) || [];

        if (severity === "moderate" || (duration === "weeks" && severity === "mild")) {
            level = "amber"; heading = "Consult recommended";
            msg = "Your answers suggest you should consult a clinician soon (24-72 hours). Teleconsultation is a fast first step.";
            action = "Book Teleconsult";
            timeline = "Schedule within 24-72 hours. Use teleconsultation for immediate guidance.";
            selfCareSteps = selectedDetail?.selfCare || [];
        }
        if (severity === "severe" || (duration === "today" && (selectedSymptom === "pregnancy" || selectedSymptom === "pain"))) {
            level = "red"; heading = "Urgent care";
            msg = "Your answers suggest urgent evaluation. If you feel unsafe or symptoms are worsening, seek emergency care immediately.";
            action = "Find Urgent Care";
            timeline = "Seek evaluation within hours. Do not delay if symptoms worsen.";
            selfCareSteps = [];
        }
        return { level, heading, msg, action, timeline, selfCareSteps };
    };

    const result = showResult ? getTriageResult() : null;

    const getLevelStyle = (level: string) => {
        switch (level) {
            case 'red': return { bg: '#FFEBEE', border: '#FFCDD2', icon: '🚨', btn: '#D32F2F', gradient: 'linear-gradient(135deg, #D32F2F, #EF5350)' };
            case 'amber': return { bg: '#FFF8E1', border: '#FFECB3', icon: '👨‍⚕️', btn: '#F57C00', gradient: 'linear-gradient(135deg, #F57C00, #FFB74D)' };
            case 'green': return { bg: '#E8F5E9', border: '#C8E6C9', icon: '🍃', btn: '#388E3C', gradient: 'linear-gradient(135deg, #388E3C, #66BB6A)' };
            default: return { bg: '#F5F5F5', border: '#EEE', icon: 'ℹ️', btn: '#555', gradient: '#555' };
        }
    };

    const panelStyle: React.CSSProperties = { background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: '28px', border: '1px solid #eee' };
    const inputStyle: React.CSSProperties = { width: '100%', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e0e0e0', fontSize: '15px', fontFamily: 'inherit', outline: 'none', background: '#fff', transition: 'border-color 0.2s, box-shadow 0.2s', color: '#333' };
    const sectionHeading = (text: string, sub?: string) => (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1a1a1a', marginBottom: '10px' }}>{text}</h2>
            {sub && <p style={{ fontSize: '15px', color: '#888', maxWidth: '600px', margin: '0 auto' }}>{sub}</p>}
        </div>
    );

    const handleSymptomSelect = (id: string) => {
        setSelectedSymptom(id);
        setShowResult(false);
        setActiveBodyArea(null);
    };

    const toggleAdditional = (s: string) => {
        setAdditionalSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    };

    return (
        <div className="app-container">
            {/* ═══ Hero ═══ */}
            <InnerPageHero
                title="Women's Health Symptom Checker"
                subtitle="Quick triage and condition education to help you understand symptoms and decide when to seek medical care."
                badge="AI Triage"
                illustration={<SymptomsAnimation />}
            >
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {["🩺 Quick triage", "📚 Practical guidance", "🛡️ Private by design"].map(t => (
                        <span key={t} style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>{t}</span>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                    <a href="#start" style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #d81b60, #f06292)', color: 'white', borderRadius: '30px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        ▶ Start assessment
                    </a>
                    <button onClick={() => navigate(ROUTES.TELECONSULTATION)} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', borderRadius: '30px', cursor: 'pointer', fontSize: '14px', fontWeight: 700, backdropFilter: 'blur(5px)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        📹 Consult now
                    </button>
                </div>
            </InnerPageHero>

            {/* ═══ Quick Stats Bar ═══ */}
            <div style={{ background: 'linear-gradient(135deg, #fce4ec, #f3e5f5)', padding: '30px 20px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center' }}>
                    {QUICK_STATS.map(s => (
                        <div key={s.label}>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: '#d81b60' }}>{s.value}</div>
                            <div style={{ fontSize: '13px', color: '#888', marginTop: '4px', fontWeight: 600 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ Body Area Selector ═══ */}
            <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 0' }}>
                {sectionHeading("Where does it hurt?", "Select a body area to narrow down your symptoms, or skip to the full assessment below.")}
                <div className="body-area-grid" style={{ display: 'grid', gap: '14px', marginBottom: '20px' }}>
                    {BODY_AREAS.map(area => (
                        <button key={area.id} onClick={() => setActiveBodyArea(activeBodyArea === area.id ? null : area.id)}
                            style={{
                                padding: '20px 12px', borderRadius: '16px', border: activeBodyArea === area.id ? '2px solid #d81b60' : '1px solid #e0e0e0',
                                background: activeBodyArea === area.id ? 'linear-gradient(135deg, #fce4ec, #f8bbd0)' : '#fff',
                                cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease',
                                boxShadow: activeBodyArea === area.id ? '0 4px 16px rgba(216,27,96,0.15)' : '0 2px 8px rgba(0,0,0,0.04)'
                            }}>
                            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{area.icon}</div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: activeBodyArea === area.id ? '#d81b60' : '#555' }}>{area.label}</div>
                        </button>
                    ))}
                </div>
                {activeBodyArea && (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px', animation: 'fadeInUp 0.4s ease both' }}>
                        <span style={{ fontSize: '13px', color: '#888', lineHeight: '32px' }}>Matching symptoms:</span>
                        {filteredSymptoms.map(s => (
                            <button key={s.id} onClick={() => handleSymptomSelect(s.id)}
                                style={{
                                    padding: '6px 16px', borderRadius: '20px', border: selectedSymptom === s.id ? '1px solid #d81b60' : '1px solid #ddd',
                                    background: selectedSymptom === s.id ? '#fce4ec' : '#fff', color: selectedSymptom === s.id ? '#d81b60' : '#555',
                                    fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px'
                                }}>
                                {s.icon} {s.label}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* ═══ Fast Triage Section ═══ */}
            <section id="start" style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px 0' }}>
                {sectionHeading("Fast triage in 60 seconds", "Answer a few questions to get a recommended next step. This is not a diagnosis.")}

                {/* 2-Column Split */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', alignItems: 'start' }}>

                    {/* Left Panel: Form */}
                    <div style={panelStyle}>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>📋 Tell us what's happening</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px', color: '#555', fontSize: '14px' }}>Primary symptom</label>
                                <select style={inputStyle} onChange={(e) => { setSelectedSymptom(e.target.value); setShowResult(false); }} value={selectedSymptom}>
                                    <option value="" disabled>Select...</option>
                                    {SYMPTOM_DATA.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px', color: '#555', fontSize: '14px' }}>Severity</label>
                                <select style={inputStyle} onChange={(e) => { setSeverity(e.target.value); setShowResult(false); }} value={severity}>
                                    <option value="" disabled>Select...</option>
                                    <option value="mild">Mild</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="severe">Severe</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px', color: '#555', fontSize: '14px' }}>How long has it been?</label>
                            <select style={inputStyle} value={duration} onChange={(e) => { setDuration(e.target.value); setShowResult(false); }}>
                                <option value="" disabled>Select...</option>
                                <option value="today">Today / sudden</option>
                                <option value="days">A few days</option>
                                <option value="weeks">Weeks</option>
                                <option value="months">Months</option>
                            </select>
                        </div>

                        {/* Additional symptoms chips */}
                        <div style={{ marginTop: '20px' }}>
                            <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', color: '#555', fontSize: '14px' }}>Any additional symptoms? <span style={{ fontWeight: 400, color: '#aaa' }}>(optional)</span></label>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {additionalSymptomOptions.map(s => (
                                    <button key={s} onClick={() => toggleAdditional(s)}
                                        style={{
                                            padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                                            border: additionalSymptoms.includes(s) ? '1px solid #d81b60' : '1px solid #e0e0e0',
                                            background: additionalSymptoms.includes(s) ? '#fce4ec' : '#fafafa',
                                            color: additionalSymptoms.includes(s) ? '#d81b60' : '#777', transition: 'all 0.2s'
                                        }}>
                                        {additionalSymptoms.includes(s) ? '✓ ' : ''}{s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            style={{
                                width: '100%', marginTop: '24px', padding: '14px',
                                background: (!selectedSymptom || !severity || !duration) ? '#ccc' : 'linear-gradient(135deg, #d81b60, #f06292)',
                                color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 700,
                                cursor: (!selectedSymptom || !severity || !duration) ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s ease'
                            }}
                            disabled={!selectedSymptom || !severity || !duration}
                            onClick={() => setShowResult(true)}>
                            ✨ Get next step
                        </button>

                        {/* Result inline */}
                        {result && (
                            <div style={{ marginTop: '20px', padding: '24px', background: getLevelStyle(result.level).bg, border: `1px solid ${getLevelStyle(result.level).border}`, borderRadius: '16px', animation: 'fadeInUp 0.6s ease both' }}>
                                {(() => {
                                    const style = getLevelStyle(result.level);
                                    return (<>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '999px', fontWeight: 700, fontSize: '13px', marginBottom: '12px', background: 'white', color: style.btn, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                            {style.icon} {result.heading}
                                        </div>
                                        <p style={{ margin: '8px 0', color: '#444', fontSize: '14px', lineHeight: 1.7 }}>{result.msg}</p>
                                        <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.7)', borderRadius: '12px', margin: '12px 0', fontSize: '13px', color: '#555', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            ⏱️ <strong>Timeline:</strong> {result.timeline}
                                        </div>
                                        {result.selfCareSteps.length > 0 && (
                                            <div style={{ margin: '12px 0 16px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#555', marginBottom: '6px' }}>Immediate self-care:</div>
                                                {result.selfCareSteps.map((step, i) => (
                                                    <div key={i} style={{ fontSize: '13px', color: '#666', padding: '4px 0', display: 'flex', gap: '6px' }}>
                                                        <span style={{ color: style.btn }}>•</span> {step}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {additionalSymptoms.length > 0 && (
                                            <div style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>
                                                Also reported: {additionalSymptoms.join(', ')}
                                            </div>
                                        )}
                                        <p style={{ margin: '0 0 16px', color: '#999', fontSize: '12px', fontStyle: 'italic' }}>This tool offers education and next-step guidance, not a medical diagnosis.</p>
                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                            <button onClick={() => navigate(ROUTES.TELECONSULTATION)} style={{ padding: '10px 20px', background: style.gradient, color: 'white', border: 'none', borderRadius: '30px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>📹 Teleconsultation</button>
                                            <button onClick={() => navigate(ROUTES.FIND_DOCTORS)} style={{ padding: '10px 20px', background: 'white', color: style.btn, border: `1px solid ${style.btn}`, borderRadius: '30px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>👩‍⚕️ Find doctors</button>
                                        </div>
                                    </>);
                                })()}
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Emergency */}
                    <div style={panelStyle}>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#D32F2F' }}>⚠️ Emergency warning signs</h3>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>Seek urgent care if you have any of the following:</p>
                        <ul style={{ paddingLeft: '20px', color: '#444', fontSize: '14px', lineHeight: 1.7, margin: '12px 0 0' }}>
                            {emergencySigns.map((sign, idx) => <li key={idx} style={{ marginBottom: '8px' }}>{sign}</li>)}
                        </ul>
                        <div style={{ marginTop: '24px', padding: '16px', background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '16px', fontSize: '14px', color: '#555', lineHeight: 1.6 }}>
                            <strong>Tip:</strong> If you're unsure, choose teleconsultation for rapid guidance.
                            <div style={{ marginTop: '12px' }}>
                                <button onClick={() => navigate(ROUTES.TELECONSULTATION)} style={{ padding: '10px 20px', background: 'white', color: '#d81b60', border: '1px solid #d81b60', borderRadius: '30px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>📹 Start teleconsultation</button>
                            </div>
                        </div>

                        {/* Quick reference: What to tell your doctor */}
                        <div style={{ marginTop: '24px', padding: '16px', background: '#EDE7F6', border: '1px solid #D1C4E9', borderRadius: '16px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#5E35B1' }}>📝 What to tell your doctor</h4>
                            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '13px', color: '#555', lineHeight: 1.7 }}>
                                <li>When symptoms started & how they changed</li>
                                <li>Pain scale (1-10) and location</li>
                                <li>Last menstrual period date</li>
                                <li>Medications & supplements you take</li>
                                <li>Any recent changes (diet, stress, travel)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Triage Overview Cards ═══ */}
            <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    {[
                        { badge: '🍃 Self-care', color: '#1e8449', bg: 'rgba(39,174,96,0.12)', border: 'rgba(39,174,96,0.25)', title: 'Mild symptoms', desc: 'Hydration, rest, warm compress, OTC relief (if appropriate). Monitor for changes.' },
                        { badge: '👨‍⚕️ See a clinician', color: '#b9770e', bg: 'rgba(243,156,18,0.12)', border: 'rgba(243,156,18,0.25)', title: 'Moderate symptoms', desc: 'Schedule a consult within 24-72 hours, especially if symptoms persist.' },
                        { badge: '🚑 Urgent', color: '#c0392b', bg: 'rgba(231,76,60,0.12)', border: 'rgba(231,76,60,0.25)', title: 'Severe symptoms', desc: 'Seek urgent care immediately. Use teleconsultation only if emergency care isn\'t accessible.' },
                    ].map(card => (
                        <div key={card.title} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e0e0e0', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'default' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)'; }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '999px', fontWeight: 700, fontSize: '13px', background: card.bg, color: card.color, border: `1px solid ${card.border}`, marginBottom: '12px' }}>{card.badge}</span>
                            <h4 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px', color: '#1a1a1a' }}>{card.title}</h4>
                            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ Condition Deep-Dive (expandable cards) ═══ */}
            <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 0' }}>
                {sectionHeading("Condition Education Library", "Tap any symptom to learn about possible causes, self-care, warning signs, and recommended screenings.")}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                    {SYMPTOM_DATA.map(s => {
                        const isOpen = expandedCondition === s.id;
                        return (
                            <div key={s.id}
                                onClick={() => setExpandedCondition(isOpen ? null : s.id)}
                                style={{
                                    background: '#fff', borderRadius: '18px', border: isOpen ? '2px solid #d81b60' : '1px solid #eee',
                                    boxShadow: isOpen ? '0 8px 30px rgba(216,27,96,0.1)' : '0 2px 12px rgba(0,0,0,0.04)',
                                    overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease'
                                }}>
                                {/* Header */}
                                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{s.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>{s.label}</div>
                                        <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>{s.area} &middot; {s.possibleCauses.length} possible causes</div>
                                    </div>
                                    <div style={{ fontSize: '18px', color: '#ccc', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</div>
                                </div>
                                {/* Expanded content */}
                                {isOpen && (
                                    <div style={{ padding: '0 24px 24px', animation: 'fadeInUp 0.4s ease both' }} onClick={(e) => e.stopPropagation()}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                            {/* Possible causes */}
                                            <div style={{ padding: '16px', background: '#FFF3E0', borderRadius: '14px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#E65100', marginBottom: '10px' }}>🔍 Possible causes</div>
                                                {s.possibleCauses.map((c, i) => <div key={i} style={{ fontSize: '13px', color: '#555', padding: '3px 0' }}>• {c}</div>)}
                                            </div>
                                            {/* Self care */}
                                            <div style={{ padding: '16px', background: '#E8F5E9', borderRadius: '14px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#2E7D32', marginBottom: '10px' }}>💚 Self-care tips</div>
                                                {s.selfCare.map((c, i) => <div key={i} style={{ fontSize: '13px', color: '#555', padding: '3px 0' }}>• {c}</div>)}
                                            </div>
                                            {/* When to worry */}
                                            <div style={{ padding: '16px', background: '#FFEBEE', borderRadius: '14px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#C62828', marginBottom: '10px' }}>🚩 When to worry</div>
                                                {s.whenToWorry.map((c, i) => <div key={i} style={{ fontSize: '13px', color: '#555', padding: '3px 0' }}>• {c}</div>)}
                                            </div>
                                            {/* Screenings */}
                                            <div style={{ padding: '16px', background: '#E3F2FD', borderRadius: '14px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1565C0', marginBottom: '10px' }}>🧪 Recommended screenings</div>
                                                {s.relatedScreenings.map((c, i) => <div key={i} style={{ fontSize: '13px', color: '#555', padding: '3px 0' }}>• {c}</div>)}
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                                            <button onClick={() => { setSelectedSymptom(s.id); document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' }); }}
                                                style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #d81b60, #f06292)', color: 'white', border: 'none', borderRadius: '30px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                                                Start triage for this →
                                            </button>
                                            <button onClick={() => navigate(ROUTES.SCREENING)}
                                                style={{ padding: '10px 20px', background: 'white', color: '#d81b60', border: '1px solid #d81b60', borderRadius: '30px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                                                View screening guide
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ═══ How It Works ═══ */}
            <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 0' }}>
                {sectionHeading("How our symptom checker works", "A transparent, evidence-based approach to help you take the right next step.")}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    {[
                        { step: '1', icon: '📝', title: 'Describe symptoms', desc: 'Select your primary symptom, severity level, and how long you\'ve had it.' },
                        { step: '2', icon: '🧮', title: 'Smart triage', desc: 'Our algorithm cross-references your inputs against clinical decision trees.' },
                        { step: '3', icon: '📊', title: 'Get next step', desc: 'Receive a colour-coded recommendation: self-care, consult, or urgent.' },
                        { step: '4', icon: '📚', title: 'Learn more', desc: 'Read condition-specific education, self-care tips, and screening guidance.' },
                    ].map(item => (
                        <div key={item.step} style={{ background: '#fff', borderRadius: '18px', padding: '28px 24px', border: '1px solid #eee', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', textAlign: 'center', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #d81b60, #f06292)', color: 'white', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.step}</div>
                            <div style={{ fontSize: '36px', marginBottom: '12px', marginTop: '8px' }}>{item.icon}</div>
                            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#1a1a1a' }}>{item.title}</h4>
                            <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ Common Questions ═══ */}
            <section style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px 0' }}>
                {sectionHeading("Frequently asked questions")}
                {[
                    { q: "Is this tool a replacement for a doctor?", a: "No. This is an educational triage tool that helps you understand your symptoms and decide on a sensible next step. It is not a diagnosis. Always consult a healthcare professional for medical advice." },
                    { q: "Is my data stored or shared?", a: "No. All processing happens in your browser. We do not store, transmit, or share any symptom data you enter. Your privacy is our priority." },
                    { q: "What clinical guidelines is this based on?", a: "Our triage logic is informed by WHO guidelines, ACOG recommendations, and evidence-based clinical decision frameworks for women's health. The content is reviewed by medical professionals." },
                    { q: "When should I call emergency services instead?", a: "If you experience sudden severe pain, heavy uncontrolled bleeding, loss of consciousness, difficulty breathing, or any symptom that feels life-threatening, call emergency services (112/911) immediately." },
                    { q: "Can I use this tool during pregnancy?", a: "Yes, but with extra caution. Pregnancy-related symptoms can be time-sensitive. If in doubt, always contact your OB-GYN or visit your nearest maternal health facility." },
                ].map((faq, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #eee', padding: '20px 24px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Q: {faq.q}</h4>
                        <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                    </div>
                ))}
            </section>

            {/* ═══ Quick Access Cards ═══ */}
            <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 0' }}>
                {sectionHeading("Related resources", "Continue your health journey with these tools and guides.")}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {[
                        { icon: '🩺', title: 'Screening Guide', desc: 'Age-based screenings & tests', route: ROUTES.SCREENING },
                        { icon: '💉', title: 'Vaccination Tracker', desc: 'Recommended vaccines for women', route: ROUTES.VACCINATION },
                        { icon: '📹', title: 'Teleconsultation', desc: 'Speak to a doctor now', route: ROUTES.TELECONSULTATION },
                        { icon: '👩‍⚕️', title: 'Find Doctors', desc: 'Specialists near you', route: ROUTES.FIND_DOCTORS },
                        { icon: '🏥', title: 'All Services', desc: 'Browse all health services', route: ROUTES.SERVICES },
                        { icon: '🛡️', title: 'Preventive Health', desc: 'Your health checklist', route: ROUTES.PREVENTIVE_HEALTH },
                        { icon: '💊', title: 'OTC Guide', desc: 'Over-the-counter remedies', route: ROUTES.OTC_GUIDE },
                        { icon: '🍎', title: 'Nutrition Guide', desc: 'Diet & wellness tips', route: ROUTES.NUTRITION_GUIDE },
                    ].map(card => (
                        <div key={card.title} onClick={() => navigate(card.route)}
                            style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '24px 20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#f8bbd0'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#eee'; }}>
                            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{card.icon}</div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>{card.title}</div>
                            <div style={{ fontSize: '12px', color: '#aaa' }}>{card.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ Medical Disclaimer ═══ */}
            <section style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px 0' }}>
                <div style={{ background: 'linear-gradient(135deg, #fff3e0, #fff8e1)', borderRadius: '18px', padding: '28px 32px', border: '1px solid #ffe0b2' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div style={{ fontSize: '28px', flexShrink: 0 }}>⚕️</div>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#E65100', marginBottom: '8px' }}>Medical Disclaimer</h4>
                            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7, margin: 0 }}>
                                This symptom checker is for educational purposes only and does not constitute medical advice, diagnosis, or treatment.
                                The information provided is based on general clinical guidelines and may not apply to your specific situation.
                                Always consult with a qualified healthcare professional for any medical concerns. If you are experiencing a medical emergency,
                                call your local emergency number immediately. Content is reviewed by medical professionals but should not replace
                                a face-to-face consultation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Navigation ═══ */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', padding: '50px 20px 80px' }}>
                <button onClick={() => navigate(ROUTES.FERTILITY)} style={{ padding: '12px 24px', background: 'white', color: '#d81b60', border: '1px solid #d81b60', borderRadius: '30px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>← Previous: Fertility</button>
                <button onClick={() => navigate(ROUTES.TELECONSULTATION)} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #d81b60, #f06292)', color: 'white', border: 'none', borderRadius: '30px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>Next: Teleconsultation →</button>
            </div>

            <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                .body-area-grid {
                    grid-template-columns: repeat(6, 1fr);
                }
                @media (max-width: 900px) {
                    .body-area-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                    #start > div:nth-child(2) { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 600px) {
                    .body-area-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            `}</style>
        </div>
    );
};

export default SymptomChecker;
