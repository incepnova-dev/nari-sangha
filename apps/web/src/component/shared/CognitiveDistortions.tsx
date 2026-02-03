import React, { useState } from 'react';
import './CognitiveDistortions.css';

interface Distortion {
    id: string;
    name: string;
    pattern: string;
    example: string;
    reframe: string;
    icon: string;
}

const DISTORTIONS: Distortion[] = [
    {
        id: 'catastrophizing',
        name: 'Catastrophizing',
        pattern: 'Expecting the absolute worst outcome, even when it is unlikely.',
        example: '"My baby is crying and I can\'t soothe him immediately. I am a failure and he will never bond with me."',
        reframe: '"Babies cry for many reasons. I am learning his cues, and one difficult moment doesn\'t define our entire relationship."',
        icon: '🌪️'
    },
    {
        id: 'all_or_nothing',
        name: 'All-or-Nothing Thinking',
        pattern: 'Seeing things in black and white—if it\'s not perfect, it\'s a total failure.',
        example: '"I planned to exclusively breastfeed but had to use formula once. I\'ve completely failed at being a "natural" mom."',
        reframe: '"I am doing my best to feed my baby. One supplement doesn\'t erase all the care I provide."',
        icon: '⚖️'
    },
    {
        id: 'mind_reading',
        name: 'Mind Reading',
        pattern: 'Assuming you know what others are thinking (usually something negative about you).',
        example: '"My husband is quiet tonight. He must be thinking about how much I\'ve changed and how much he regrets having a baby with me."',
        reframe: '"He might just be tired from work. I can ask him how he\'s feeling instead of assuming the worst."',
        icon: '🧠'
    },
    {
        id: 'emotional_reasoning',
        name: 'Emotional Reasoning',
        pattern: 'Assuming that because you feel a certain way, it must be the objective truth.',
        example: '"I feel like a terrible mother right now, so I must actually be a terrible mother."',
        reframe: '"My feelings are valid, but they aren\'t facts. Feeling overwhelmed is a response to stress, not a reflection of my character."',
        icon: '🌊'
    },
    {
        id: 'should_statements',
        name: 'Should Statements',
        pattern: 'Having a list of rigid rules about how you and others "should" act.',
        example: '"I should be glowing and happy all the time. I shouldn\'t feel resentful about losing my old life."',
        reframe: '"It is normal to have complex feelings about a major life transition. I can be a loving mother and still miss my autonomy."',
        icon: '📋'
    }
];

const CognitiveDistortions: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selected = DISTORTIONS.find(d => d.id === selectedId);

    return (
        <div className="cognitive-distortions-container">
            <div className="distortions-grid">
                {DISTORTIONS.map(d => (
                    <button
                        key={d.id}
                        className={`distortion-chip ${selectedId === d.id ? 'active' : ''}`}
                        onClick={() => setSelectedId(d.id)}
                    >
                        <span className="distortion-icon">{d.icon}</span>
                        <span className="distortion-name">{d.name}</span>
                    </button>
                ))}
            </div>

            <div className="distortion-detail-box">
                {selected ? (
                    <div className="distortion-detail-content">
                        <div className="detail-header">
                            <span className="detail-icon">{selected.icon}</span>
                            <h3>{selected.name}</h3>
                        </div>

                        <div className="detail-section">
                            <h4 className="label-pattern">The Pattern:</h4>
                            <p>{selected.pattern}</p>
                        </div>

                        <div className="detail-section example">
                            <h4 className="label-example">The "Depression Voice":</h4>
                            <p><em>{selected.example}</em></p>
                        </div>

                        <div className="detail-section reframe">
                            <h4 className="label-reframe">The Healthy Reframe:</h4>
                            <p><strong>{selected.reframe}</strong></p>
                        </div>
                    </div>
                ) : (
                    <div className="detail-placeholder">
                        <i className="fas fa-lightbulb"></i>
                        <p>Select a common "thinking trap" above to learn how to reframe it.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CognitiveDistortions;
