import React, { useState, useMemo } from 'react';
import styles from './OTCGUIDE.module.css';
import InnerPageHero from '../shared/InnerPageHero';

interface Method {
    id: string;
    name: string;
    category: string;
    tags: string[];
    duration: 'short' | 'medium' | 'long' | 'permanent' | 'varies';
    hormones: boolean | 'varies';
    estrogen: 'yes' | 'no' | 'none' | 'varies';
    breastfeedingOk: boolean;
    effectivenessTypical: number;
    effectivenessPerfect: number;
    pros: string[];
    cons: string[];
    whenUse: string[];
    whenNot: string[];
    safety: string[];
    notes?: string[];
}

const METHODS: Method[] = [
    {
        id: "male_condom",
        name: "Male Condom",
        category: "Barrier",
        tags: ["STI", "Non-hormonal", "OTC"],
        duration: "short",
        hormones: false,
        estrogen: "none",
        breastfeedingOk: true,
        effectivenessTypical: 85,
        effectivenessPerfect: 98,
        pros: ["Protects against STIs (incl. HIV)", "No hormonal/systemic effects", "Immediately reversible", "Affordable and accessible"],
        cons: ["Can break/slip", "May reduce sensation", "Needs correct storage and use", "Latex allergy for some"],
        whenUse: ["Need pregnancy + STI protection", "Prefer non-hormonal", "Backup with other methods", "Postpartum/breastfeeding hormone-free option"],
        whenNot: ["Severe latex allergy", "Persistent erection difficulty"],
        safety: ["Check expiry; store cool/dry", "Never reuse", "Use water/silicone lube with latex"]
    },
    {
        id: "female_condom",
        name: "Female Condom",
        category: "Barrier",
        tags: ["STI", "Non-hormonal"],
        duration: "short",
        hormones: false,
        estrogen: "none",
        breastfeedingOk: true,
        effectivenessTypical: 79,
        effectivenessPerfect: 95,
        pros: ["Woman-controlled", "STI protection", "Latex-free options"],
        cons: ["More expensive, less available", "Learning curve", "Can slip/bunch or be noisy"],
        whenUse: ["Want barrier control", "Latex allergy", "Prefer advance insertion"],
        whenNot: ["Not designed for menstruation", "Insertion difficult due to anatomy"],
        safety: ["Do not use with male condom", "Ensure ring position"]
    },
    {
        id: "combined_pill",
        name: "Combined Oral Contraceptive (The Pill)",
        category: "Hormonal",
        tags: ["Estrogen+Progestin", "Cycle control"],
        duration: "short",
        hormones: true,
        estrogen: "yes",
        breastfeedingOk: false,
        effectivenessTypical: 93,
        effectivenessPerfect: 99,
        pros: ["Highly effective correctly taken", "Cycle regulation; less cramps/flow", "May improve acne"],
        cons: ["Daily adherence", "No STI protection", "Small increased clot risk"],
        whenUse: ["Want reversible + cycle benefits", "Acne/PCOS management", "Postpartum if not breastfeeding"],
        whenNot: ["Breastfeeding early postpartum", "Smoker >35", "Clot/stroke/heart disease history", "Migraine with aura"],
        safety: ["Know ACHES signs", "Use backup for first 7 days"]
    },
    {
        id: "mini_pill",
        name: "Progestin-Only Pill (Mini-Pill)",
        category: "Hormonal",
        tags: ["Progestin-only", "Breastfeeding-friendly"],
        duration: "short",
        hormones: true,
        estrogen: "no",
        breastfeedingOk: true,
        effectivenessTypical: 93,
        effectivenessPerfect: 99,
        pros: ["Safe for breastfeeding", "Option when estrogen disallowed", "Lower clot risk than combined"],
        cons: ["Strict timing (3-hour window)", "Irregular bleeding/spotting"],
        whenUse: ["Breastfeeding", "Estrogen contraindications", "Immediately postpartum"],
        whenNot: ["Unable to keep strict schedule", "History of breast cancer"],
        safety: ["Use backup if >3 hours late", "Set a daily alarm"]
    },
    {
        id: "implant",
        name: "Contraceptive Implant",
        category: "Hormonal",
        tags: ["Progestin-only", "Up to 3 years"],
        duration: "long",
        hormones: true,
        estrogen: "no",
        breastfeedingOk: true,
        effectivenessTypical: 99.5,
        effectivenessPerfect: 99.5,
        pros: ["Extremely effective", "3 years duration", "Set-and-forget", "Rapidly reversible"],
        cons: ["Procedure needed", "Irregular bleeding common initially"],
        whenUse: ["Long-term", "Breastfeeding", "Estrogen not allowed"],
        whenNot: ["History of breast cancer", "Cant tolerate irregular bleeding"],
        safety: ["Check site for infection", "Track insertion date"]
    },
    {
        id: "hormonal_iud",
        name: "Hormonal IUD",
        category: "IUDs",
        tags: ["Progestin-only", "3–8 years"],
        duration: "long",
        hormones: true,
        estrogen: "no",
        breastfeedingOk: true,
        effectivenessTypical: 99.5,
        effectivenessPerfect: 99.5,
        pros: ["Extremely effective", "Less bleeding/cramps", "Long-lasting"],
        cons: ["Insertion procedure", "Initial cramping/spotting"],
        whenUse: ["Long-term", "Heavy/painful periods", "Breastfeeding"],
        whenNot: ["Active pelvic infection", "Pregnancy suspected"],
        safety: ["Check strings monthly", "Know infection/expulsion signs"]
    },
    {
        id: "copper_iud",
        name: "Copper IUD",
        category: "IUDs",
        tags: ["Non-hormonal", "10–12 years", "EC option"],
        duration: "long",
        hormones: false,
        estrogen: "none",
        breastfeedingOk: true,
        effectivenessTypical: 99.5,
        effectivenessPerfect: 99.5,
        pros: ["Most effective non-hormonal", "Longest reversible", "Emergency contraception option"],
        cons: ["Heavier bleeding/cramps", "Insertion discomfort"],
        whenUse: ["Long-term hormone-free", "When hormones undesired", "Emergency contraception"],
        whenNot: ["Wilson\u2019s disease", "Severe bleeding/anemia", "Active pelvic infection"],
        safety: ["NSAIDs for cramps", "Check strings monthly"]
    },
    {
        id: "morning_after_pill",
        name: "Emergency Contraception Pills",
        category: "Emergency",
        tags: ["Time-sensitive", "OTC"],
        duration: "short",
        hormones: true,
        estrogen: "varies",
        breastfeedingOk: true,
        effectivenessTypical: 0,
        effectivenessPerfect: 0,
        pros: ["OTC availability", "After failure/unprotected sex"],
        cons: ["Less effective than routine", "Time sensitive"],
        whenUse: ["After unprotected sex", "After condom break"],
        whenNot: ["Not for routine use", "If already pregnant"],
        safety: ["Take ASAP", "If period >1 week late, test"]
    }
];

const OTCGUIDE: React.FC = () => {
    const [filters, setFilters] = useState({
        sti: 'any',
        hormones: 'any',
        duration: 'any',
        postpartum: 'any',
        estrogen: 'any'
    });
    const [compareList, setCompareList] = useState<string[]>([]);
    const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
    const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);

    const filteredMethods = useMemo(() => {
        return METHODS.filter(m => {
            if (filters.sti === 'yes' && !m.tags.includes('STI')) return false;
            if (filters.hormones === 'no' && m.hormones !== false) return false;
            if (filters.hormones === 'yes' && m.hormones !== true) return false;
            if (filters.duration !== 'any' && m.duration !== filters.duration) return false;
            if (filters.postpartum === 'breastfeeding' && !m.breastfeedingOk) return false;
            if (filters.estrogen === 'avoid' && m.estrogen === 'yes') return false;
            return true;
        });
    }, [filters]);

    const handleCompare = (id: string) => {
        if (compareList.includes(id)) {
            setCompareList(prev => prev.filter(i => i !== id));
        } else if (compareList.length < 3) {
            setCompareList(prev => [...prev, id]);
            setIsCompareDrawerOpen(true);
        }
    };

    const selectedMethod = METHODS.find(m => m.id === selectedMethodId);

    return (
        <div className={styles.pageContainer}>
            <InnerPageHero
                title="Contraception Compass"
                subtitle="Navigate your options for birth control and STI protection with science-backed guidance."
                badge="Interactive Guide"
            />

            <div className={styles.mainContent}>
                {/* Explorer Controls */}
                <section className={styles.explorerSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Method Explorer</h2>
                        <div className={styles.headerActions}>
                            <button
                                className={styles.resetBtn}
                                onClick={() => setFilters({ sti: 'any', hormones: 'any', duration: 'any', postpartum: 'any', estrogen: 'any' })}
                            >
                                Reset Filters
                            </button>
                            {compareList.length > 0 && (
                                <button className={styles.compareBtn} onClick={() => setIsCompareDrawerOpen(true)}>
                                    Compare ({compareList.length})
                                </button>
                            )}
                        </div>
                    </div>

                    <div className={styles.filterGrid}>
                        <div className={styles.filterItem}>
                            <label>STI Protection Needed?</label>
                            <select value={filters.sti} onChange={(e) => setFilters({ ...filters, sti: e.target.value })}>
                                <option value="any">Any</option>
                                <option value="yes">Yes (must protect)</option>
                                <option value="no">Not required</option>
                            </select>
                        </div>
                        <div className={styles.filterItem}>
                            <label>Hormones</label>
                            <select value={filters.hormones} onChange={(e) => setFilters({ ...filters, hormones: e.target.value })}>
                                <option value="any">Any</option>
                                <option value="no">Prefer hormone-free</option>
                                <option value="yes">Hormonal OK</option>
                            </select>
                        </div>
                        <div className={styles.filterItem}>
                            <label>Duration</label>
                            <select value={filters.duration} onChange={(e) => setFilters({ ...filters, duration: e.target.value })}>
                                <option value="any">Any</option>
                                <option value="short">Short-acting (Daily)</option>
                                <option value="long">Long-acting (Years)</option>
                            </select>
                        </div>
                        <div className={styles.filterItem}>
                            <label>Breastfeeding friendly?</label>
                            <select value={filters.postpartum} onChange={(e) => setFilters({ ...filters, postpartum: e.target.value })}>
                                <option value="any">Any</option>
                                <option value="breastfeeding">Yes</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.methodGrid}>
                        {filteredMethods.map(m => (
                            <div key={m.id} className={styles.methodCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.category}>{m.category}</span>
                                    <h3 className={styles.methodName}>{m.name}</h3>
                                </div>
                                <div className={styles.badgeRow}>
                                    {m.tags.map(t => <span key={t} className={styles.tagBadge}>{t}</span>)}
                                </div>
                                <div className={styles.stats}>
                                    <div className={styles.statPoint}>
                                        <span className={styles.statLabel}>Typical Use:</span>
                                        <span className={styles.statValue}>{m.effectivenessTypical}%</span>
                                    </div>
                                    <div className={styles.statPoint}>
                                        <span className={styles.statLabel}>Duration:</span>
                                        <span className={styles.statValue}>{m.duration}</span>
                                    </div>
                                </div>
                                <div className={styles.cardActions}>
                                    <button className={styles.detailsAction} onClick={() => setSelectedMethodId(m.id)}>Details</button>
                                    <button
                                        className={`${styles.compareAction} ${compareList.includes(m.id) ? styles.active : ''}`}
                                        onClick={() => handleCompare(m.id)}
                                    >
                                        {compareList.includes(m.id) ? 'Comparing' : 'Compare'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Details Modal */}
            {selectedMethod && (
                <div className={styles.modalOverlay} onClick={() => setSelectedMethodId(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeModal} onClick={() => setSelectedMethodId(null)}>\u2715</button>
                        <div className={styles.modalHeader}>
                            <span className={styles.modalKicker}>{selectedMethod.category}</span>
                            <h2>{selectedMethod.name}</h2>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.detailGrid}>
                                <div className={styles.detailSection}>
                                    <h4>Pros</h4>
                                    <ul>{selectedMethod.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
                                </div>
                                <div className={styles.detailSection}>
                                    <h4>Cons</h4>
                                    <ul>{selectedMethod.cons.map((c, i) => <li key={i}>{c}</li>)}</ul>
                                </div>
                            </div>
                            <div className={styles.safetyBox}>
                                <h4>Safety First</h4>
                                <ul>{selectedMethod.safety.map((s, i) => <li key={i}>{s}</li>)}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Comparison Tray */}
            <div className={`${styles.compareTray} ${isCompareDrawerOpen ? styles.open : ''}`}>
                <div className={styles.trayHeader}>
                    <h3>Comparison List</h3>
                    <button onClick={() => setIsCompareDrawerOpen(false)}>Close</button>
                </div>
                <div className={styles.compareGrid}>
                    {compareList.map(id => {
                        const m = METHODS.find(x => x.id === id);
                        if (!m) return null;
                        return (
                            <div key={id} className={styles.compareItem}>
                                <h4>{m.name}</h4>
                                <p>Effectiveness: {m.effectivenessTypical}%</p>
                                <p>Hormonal: {m.hormones ? 'Yes' : 'No'}</p>
                                <button onClick={() => handleCompare(id)}>Remove</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OTCGUIDE;
