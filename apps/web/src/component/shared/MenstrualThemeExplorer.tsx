import React, { useState } from 'react';
import './MenstrualThemeExplorer.css';

interface ThemeContent {
    basic: string;
    pros?: string[];
    cons?: string[];
    whenToUse?: string | string[];
    whenNotToUse?: string | string[];
    medical?: string;
    symptoms?: string | string[];
    safety?: string | string[];
    programs?: string;
}

interface Theme {
    id: number;
    title: string;
    category: 'products' | 'health' | 'postpartum' | 'education' | 'rights';
    icon: string;
    description: string;
    tags: string[];
    content: ThemeContent;
}

const THEMES: Theme[] = [
    {
        id: 1,
        title: "Disposable Sanitary Pads",
        category: "products",
        icon: "🩹",
        description: "Absorbent pads with adhesive backing for external use",
        tags: ["Easy to use", "Widely available", "Postpartum safe"],
        content: {
            basic: "Single-use absorbent pads attached to underwear. Available in various sizes from panty liners to maternity pads. Changed every 4-6 hours depending on flow.",
            pros: ["Easy to use", "Widely available", "No internal insertion needed", "Suitable for postpartum"],
            cons: ["Environmental impact", "Ongoing cost", "Can cause irritation"],
            medical: "Change every 4-6 hours to prevent bacterial growth. Moisture can cause skin irritation.",
            safety: ["Wash hands before/after changing", "Store in clean, dry place", "Fragrance-free preferred"]
        }
    },
    {
        id: 2,
        title: "Tampons",
        category: "products",
        icon: "🔸",
        description: "Internal absorbent products inserted into the vagina",
        tags: ["Discreet", "Swimming safe", "TSS risk"],
        content: {
            basic: "Cylindrical absorbent products inserted into the vagina. Different absorbency levels available.",
            pros: ["Discreet", "Swimming/sports safe", "No bulk"],
            cons: ["TSS risk if left too long", "Learning curve", "Cannot use overnight >8hrs"],
            medical: "Maximum wear time 8 hours. Use lowest absorbency needed. TSS is rare but serious.",
            safety: ["Wash hands", "Change every 4-8 hours", "Never exceed 8 hours"]
        }
    },
    {
        id: 3,
        title: "Menstrual Cups",
        category: "products",
        icon: "🔴",
        description: "Reusable silicone cups that collect menstrual blood",
        tags: ["Eco-friendly", "12-hour wear", "Cost-effective"],
        content: {
            basic: "Bell-shaped cups made of medical-grade silicone. Worn up to 12 hours. Lasts 5-10 years.",
            pros: ["Eco-friendly", "Cost-effective", "12-hour wear", "No TSS risk"],
            cons: ["Learning curve", "Need clean water to rinse", "Higher initial cost"],
            medical: "Sterilize between cycles by boiling. Collector allows for volume monitoring.",
            safety: ["Boil for 5-10 mins between cycles", "Wash hands", "Empty every 12 hours"]
        }
    },
    {
        id: 8,
        title: "Normal Menstrual Cycle",
        category: "health",
        icon: "📅",
        description: "Understanding healthy menstrual patterns",
        tags: ["21-35 days", "3-7 days flow", "Hormonal phases"],
        content: {
            basic: "Average cycle is 28 days (21-35 is normal). Four phases: menstrual, follicular, ovulation, luteal.",
            pros: ["Regularity indicates balance", "Predictability aids planning"],
            medical: "Regulated by estrogen, progesterone, FSH, and LH. Stress can disrupt regularity.",
            symptoms: ["Normal: mild cramping, small clots", "Abnormal: soaking pad hourly, periods >7 days"]
        }
    },
    {
        id: 11,
        title: "Endometriosis",
        category: "health",
        icon: "🎗️",
        description: "Tissue similar to uterine lining grows outside uterus",
        tags: ["Chronic pain", "Infertility", "1 in 10 women"],
        content: {
            basic: "Tissue grows outside the uterus, causing severe pain and potential infertility. Affects ~10% of women.",
            cons: ["Severe chronic pain", "Diagnosis delay (7-10 years average)", "Infertility risk"],
            medical: "Diagnosis via laparoscopy. Treatment includes hormonal therapy or surgery.",
            symptoms: ["Severe cramps", "Pelvic pain", "Pain during intercourse"]
        }
    },
    {
        id: 13,
        title: "Postpartum Period Return",
        category: "postpartum",
        icon: "👶",
        description: "When and how menstruation returns after childbirth",
        tags: ["6-8 weeks", "Breastfeeding delays", "Fertility returns"],
        content: {
            basic: "Return timing varies: 6-8 weeks if not breastfeeding, 6-12+ months with exclusive breastfeeding.",
            pros: ["Indicates hormonal recovery"],
            cons: ["First periods can be very heavy", "Unpredictable timing"],
            medical: "Prolactin suppresses ovulation. Fertility can return BEFORE the first period."
        }
    },
    {
        id: 20,
        title: "Period Poverty & Access",
        category: "rights",
        icon: "💰",
        description: "Addressing lack of access to menstrual products",
        tags: ["Global issue", "Education impact", "Human right"],
        content: {
            basic: "Lack of access to products, education, and facilities due to financial or systemic barriers.",
            cons: ["Girls miss school", "Health risks from unsafe materials", "Economic burden"],
            programs: "Scotland provides free products. Many NGOs distribute 'dignity kits'.",
            safety: ["Seek safe alternatives", "Advocate for policy change"]
        }
    }
    // Simplified for demonstration - in production, all 25 would be here
];

const CATEGORIES = [
    { id: 'all', name: 'All Themes', icon: '🌌' },
    { id: 'products', name: 'Products', icon: '🛍️' },
    { id: 'health', name: 'Health', icon: '⚕️' },
    { id: 'postpartum', name: 'Postpartum', icon: '🤱' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'rights', name: 'Rights', icon: '⚖️' }
];

const MenstrualThemeExplorer: React.FC = () => {
    const [filter, setFilter] = useState<string>('all');
    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

    const filteredThemes = filter === 'all'
        ? THEMES
        : THEMES.filter(t => t.category === filter);

    return (
        <div className="theme-explorer-container">
            <div className="explorer-filters">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                        onClick={() => setFilter(cat.id)}
                    >
                        <span className="filter-icon">{cat.icon}</span>
                        <span className="filter-name">{cat.name}</span>
                    </button>
                ))}
            </div>

            <div className="themes-grid">
                {filteredThemes.map(theme => (
                    <div
                        key={theme.id}
                        className="theme-card-inter"
                        onClick={() => setSelectedTheme(theme)}
                    >
                        <div className="theme-card-header-inter">
                            <div className="theme-icon-inter">{theme.icon}</div>
                            <h4>{theme.title}</h4>
                        </div>
                        <p className="theme-desc-inter">{theme.description}</p>
                        <div className="theme-tags-inter">
                            {theme.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="theme-tag-inter">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedTheme && (
                <div className="theme-modal-overlay" onClick={() => setSelectedTheme(null)}>
                    <div className="theme-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedTheme(null)}>×</button>

                        <div className="modal-header-section">
                            <div className="modal-icon-box">{selectedTheme.icon}</div>
                            <div>
                                <span className="modal-category-tag">{selectedTheme.category}</span>
                                <h2>{selectedTheme.title}</h2>
                            </div>
                        </div>

                        <div className="modal-body-scroll">
                            <div className="detail-section-inter">
                                <h5>📋 The Basics</h5>
                                <p>{selectedTheme.content.basic}</p>
                            </div>

                            {selectedTheme.content.pros && (
                                <div className="detail-section-inter">
                                    <h5>✅ Advantages</h5>
                                    <ul>
                                        {selectedTheme.content.pros.map((p, i) => <li key={i}>{p}</li>)}
                                    </ul>
                                </div>
                            )}

                            {selectedTheme.content.cons && (
                                <div className="detail-section-inter">
                                    <h5>⚠️ Considerations</h5>
                                    <ul>
                                        {selectedTheme.content.cons.map((c, i) => <li key={i}>{c}</li>)}
                                    </ul>
                                </div>
                            )}

                            {selectedTheme.content.medical && (
                                <div className="detail-section-inter medical">
                                    <h5>🩺 Medical Knowledge</h5>
                                    <p>{selectedTheme.content.medical}</p>
                                </div>
                            )}

                            {selectedTheme.content.symptoms && (
                                <div className="detail-section-inter warning">
                                    <h5>🚨 Watch For</h5>
                                    <ul>
                                        {Array.isArray(selectedTheme.content.symptoms)
                                            ? selectedTheme.content.symptoms.map((s, i) => <li key={i}>{s}</li>)
                                            : <li>{selectedTheme.content.symptoms}</li>
                                        }
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenstrualThemeExplorer;
