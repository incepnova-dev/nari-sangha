import React, { useState } from 'react';
import './VaccineExplorer.css';

interface Vaccine {
    name: string;
    target: string;
    protection: string;
    consequence: string;
    timing: string;
    emoji: string;
}

interface Zone {
    title: string;
    emoji: string;
    vaccines: Vaccine[];
}

const VACCINES_BY_ZONE: Record<string, Zone> = {
    head: {
        emoji: '🧠',
        title: 'Head & Brain',
        vaccines: [
            {
                emoji: '🧬',
                name: 'Hib Vaccine',
                target: 'Bacterial Meningitis',
                protection: '≈95% protection',
                consequence: 'Hib meningitis: 15–30% fatal; permanent neurological damage risk.',
                timing: '6, 10, 14 weeks; booster at 15–18 months'
            },
            {
                emoji: '🌈',
                name: 'MMR (Measles)',
                target: 'Measles Encephalitis',
                protection: '≈97% against measles after 2 doses',
                consequence: 'Can cause pneumonia, encephalitis and rare fatal brain degeneration.',
                timing: '9–12 months; 2nd dose at 15–18 months or 4–6 years'
            }
        ]
    },
    chest: {
        emoji: '🫁',
        title: 'Chest & Lungs',
        vaccines: [
            {
                emoji: '🧷',
                name: 'Pneumococcal (PCV)',
                target: 'Bacterial Pneumonia',
                protection: '≈75–85% reduction',
                consequence: 'Leading infectious killer; meningitis risk.',
                timing: '6, 10, 14 weeks + booster at 12–15 months'
            },
            {
                emoji: '🛠️',
                name: 'DTaP / Tdap',
                target: 'Diphtheria, Tetanus, Whooping Cough',
                protection: '85–90% against pertussis; Near 100% for D/T',
                consequence: 'Pertussis is a leading cause of infant death; Tetanus is 10–20% fatal.',
                timing: 'Multiple doses from 6 weeks through adulthood'
            }
        ]
    },
    reproductive: {
        emoji: '💜',
        title: 'Reproductive Health',
        vaccines: [
            {
                emoji: '🎗️',
                name: 'HPV Vaccine',
                target: 'Cervical Cancer',
                protection: 'Nearly 100% against main types',
                consequence: 'Cervical cancer is the 2nd leading cancer killer of Indian women.',
                timing: 'Ages 9–14 (2 doses); 15–26 (3 doses)'
            },
            {
                emoji: '🤰',
                name: 'Tdap in Pregnancy',
                target: 'Infant Whooping Cough',
                protection: '≈91% reduction in infant pertussis',
                consequence: '90% of pertussis deaths occur in infants <6 months.',
                timing: 'Every pregnancy at 27–36 weeks'
            }
        ]
    }
};

const AGE_STAGES = [
    { id: 'birth', emoji: '👶', label: 'Birth–2yr', zones: ['head', 'chest'] },
    { id: 'teen', emoji: '👩', label: '11–18 yrs', zones: ['head', 'reproductive', 'chest'] },
    { id: 'pregnant', emoji: '🤰', label: 'Pregnant', zones: ['reproductive', 'chest'] },
    { id: 'senior', emoji: '👵', label: '65+ yrs', zones: ['chest', 'head'] }
];

const VaccineExplorer: React.FC = () => {
    const [selectedStage, setSelectedStage] = useState(AGE_STAGES[0]);
    const [activeZone, setActiveZone] = useState<string | null>(null);

    const currentZones = selectedStage.zones;

    return (
        <div className="vaccine-explorer">
            <div className="age-stage-selector">
                {AGE_STAGES.map(stage => (
                    <button
                        key={stage.id}
                        className={`age-btn ${selectedStage.id === stage.id ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedStage(stage);
                            setActiveZone(null);
                        }}
                    >
                        <span className="age-emoji">{stage.emoji}</span>
                        <span className="age-label">{stage.label}</span>
                    </button>
                ))}
            </div>

            <div className="explorer-main">
                <div className="body-visualization">
                    <div className="body-outline">
                        {/* Simple representation of hotspots */}
                        <div
                            className={`hotspot head ${currentZones.includes('head') ? 'active' : ''} ${activeZone === 'head' ? 'selected' : ''}`}
                            onClick={() => currentZones.includes('head') && setActiveZone('head')}
                        >
                            🧠
                        </div>
                        <div
                            className={`hotspot chest ${currentZones.includes('chest') ? 'active' : ''} ${activeZone === 'chest' ? 'selected' : ''}`}
                            onClick={() => currentZones.includes('chest') && setActiveZone('chest')}
                        >
                            🫁
                        </div>
                        <div
                            className={`hotspot repro ${currentZones.includes('reproductive') ? 'active' : ''} ${activeZone === 'reproductive' ? 'selected' : ''}`}
                            onClick={() => currentZones.includes('reproductive') && setActiveZone('reproductive')}
                        >
                            💜
                        </div>
                    </div>
                    <p className="hint-text">Tap a glowing icon to see vaccines for this stage</p>
                </div>

                <div className="info-panel-vax">
                    {!activeZone ? (
                        <div className="empty-info">
                            <h3>Select a zone on the map</h3>
                            <p>Explore protective vaccines recommended for the <strong>{selectedStage.label}</strong> stage.</p>
                        </div>
                    ) : (
                        <div className="zone-details">
                            <div className="zone-header">
                                <span className="zone-emoji-large">{VACCINES_BY_ZONE[activeZone].emoji}</span>
                                <h2>{VACCINES_BY_ZONE[activeZone].title}</h2>
                            </div>
                            <div className="vax-list">
                                {VACCINES_BY_ZONE[activeZone].vaccines.map((v, i) => (
                                    <div key={i} className="vax-item">
                                        <div className="vax-head">
                                            <span className="v-emoji">{v.emoji}</span>
                                            <h4>{v.name}</h4>
                                        </div>
                                        <p className="v-target"><strong>Protects against:</strong> {v.target}</p>
                                        <div className="v-stats">
                                            <div className="v-stat">✅ {v.protection}</div>
                                            <div className="v-stat warn">⚠️ {v.consequence}</div>
                                            <div className="v-stat time">⏰ Timing: {v.timing}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VaccineExplorer;
