import React, { useState } from 'react';
import './MythBuster.css';

interface Myth {
    text: string;
    isMyth: boolean;
    explain: string;
}

const MYTHS: Myth[] = [
    {
        text: 'Vaccines cause autism.',
        isMyth: true,
        explain: 'Large studies in over a million children show zero link. The original study was retracted for fraud.'
    },
    {
        text: 'Natural immunity is always better than vaccine immunity.',
        isMyth: true,
        explain: 'Natural infection risks death or disability. Vaccines give immunity safely.'
    },
    {
        text: "You can't get vaccinated while pregnant.",
        isMyth: true,
        explain: 'Inactivated vaccines like Tdap, flu, and COVID-19 are specifically recommended in pregnancy to protect both mom and baby.'
    },
    {
        text: 'HPV vaccine prevents cervical cancer.',
        isMyth: false,
        explain: 'TRUE! HPV vaccine blocks high-risk types that cause ~70% of cervical cancers.'
    }
];

const MythBuster: React.FC = () => {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    return (
        <div className="myth-buster-container">
            <h2 className="myth-title">Shield Her: Myth vs. Fact</h2>
            <p className="myth-subtitle">Tap a card to reveal the truth backed by science.</p>

            <div className="myth-grid">
                {MYTHS.map((myth, idx) => (
                    <div
                        key={idx}
                        className={`myth-card-flip ${flippedIndex === idx ? 'flipped' : ''}`}
                        onClick={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
                    >
                        <div className="myth-card-inner-flip">
                            <div className="myth-card-front-flip">
                                <span className="myth-q-icon">🤔</span>
                                <p>{myth.text}</p>
                                <div className="tap-hint">Tap to reveal</div>
                            </div>
                            <div className={`myth-card-back-flip ${myth.isMyth ? 'is-myth' : 'is-fact'}`}>
                                <span className="verdict-tag">{myth.isMyth ? '🚫 MYTH' : '✅ FACT'}</span>
                                <p>{myth.explain}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MythBuster;
