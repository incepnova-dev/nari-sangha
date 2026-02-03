import React, { useState } from 'react';
import { WeekPicker } from './WeekPicker';
import { MoodTracker } from './MoodTracker';
import { PersonalizationOverlay } from './PersonalizationOverlay';
import './Phase2Styles.css';

export const Phase2UI: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <PersonalizationOverlay />

            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    left: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--pink)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(236, 64, 122, 0.4)',
                    cursor: 'pointer',
                    zIndex: 1001,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isOpen ? '✕' : '✨'}
            </button>

            {isOpen && (
                <div className="phase2-floating-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '900' }}>Personalization</h2>
                    </div>

                    <WeekPicker />
                    <MoodTracker />

                    <div style={{ fontSize: '11px', color: '#999', textAlign: 'center', marginTop: '5px' }}>
                        Phase-2 Enhancements (Local Only)
                    </div>
                </div>
            )}
        </>
    );
};
