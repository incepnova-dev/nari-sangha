import React, { useState } from 'react';
import './ScreeningExplorer.css';

interface Screening {
    id: string;
    title: string;
    category: 'cancer' | 'reproductive' | 'general' | 'bone';
    timing: string;
    why: string;
    preps: string[];
}

const STAGES = [
    { id: '20s', label: '20s - 30s', icon: '🌸' },
    { id: '40s', label: '40s - 50s', icon: '🌅' },
    { id: '60s', label: '60+', icon: '🌺' }
];

const SCREENINGS: Record<string, Screening[]> = {
    '20s': [
        {
            id: 'cervical-20',
            title: 'Cervical Cancer Screening',
            category: 'cancer',
            timing: 'Pap smear every 3 years starting at 21.',
            why: 'Detects abnormal cells that can lead to cervical cancer.',
            preps: ['Avoid douching 48h before', 'Avoid intercourse 48h before']
        },
        {
            id: 'reproductive-20',
            title: 'Reproductive Health Check',
            category: 'reproductive',
            timing: 'Annual clinical exam.',
            why: 'Monitors overall health and contraceptive needs.',
            preps: ['Knowledge of family history', 'Last period date']
        }
    ],
    '40s': [
        {
            id: 'breast-40',
            title: 'Mammogram',
            category: 'cancer',
            timing: 'Every 1-2 years based on risk (starting age 40).',
            why: 'Early detection of breast cancer increases survival rates.',
            preps: ['No deodorant/lotion on chest', 'Wear 2-piece outfit']
        },
        {
            id: 'heart-40',
            title: 'Heart Health Profile',
            category: 'general',
            timing: 'Lipids and BP check every year.',
            why: 'Monitoring risk factors during hormonal transitions.',
            preps: ['Fasting for 12h (lipids)']
        }
    ],
    '60s': [
        {
            id: 'bone-60',
            title: 'Bone Density (DEXA)',
            category: 'bone',
            timing: 'Regular scan starting at 65.',
            why: 'Check for osteoporosis/bone thinning.',
            preps: ['No calcium supplements 24h before']
        },
        {
            id: 'colon-60',
            title: 'Colorectal Screening',
            category: 'cancer',
            timing: 'Every 5-10 years based on method.',
            why: 'Prevents colon cancer through early polyp detection.',
            preps: ['Special diet/prep (method dependent)']
        }
    ]
};

const ScreeningExplorer: React.FC = () => {
    const [activeStage, setActiveStage] = useState('20s');

    return (
        <div className="screening-explorer">
            <div className="stage-tabs">
                {STAGES.map(stage => (
                    <button
                        key={stage.id}
                        className={`stage-tab ${activeStage === stage.id ? 'active' : ''}`}
                        onClick={() => setActiveStage(stage.id)}
                    >
                        <span className="s-icon">{stage.icon}</span>
                        <span className="s-label">{stage.label}</span>
                    </button>
                ))}
            </div>

            <div className="screening-list">
                {SCREENINGS[activeStage].map(s => (
                    <div key={s.id} className="screening-item-card">
                        <div className={`category-tag ${s.category}`}>{s.category.toUpperCase()}</div>
                        <h3>{s.title}</h3>
                        <div className="s-detail">
                            <strong>⏰ Timing:</strong> {s.timing}
                        </div>
                        <div className="s-detail">
                            <strong>❓ Why:</strong> {s.why}
                        </div>
                        <div className="s-prep-box">
                            <strong>📋 Preparation:</strong>
                            <ul>
                                {s.preps.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScreeningExplorer;
