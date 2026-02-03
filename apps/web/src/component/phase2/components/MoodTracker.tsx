import React from 'react';
import { usePhase2 } from './Phase2Provider';

export const MoodTracker: React.FC = () => {
    const { moodLogs, addMoodLog } = usePhase2();

    const moods: ('😊' | '😐' | '😔' | '😣')[] = ['😊', '😐', '😔', '😣'];

    return (
        <div style={{ borderTop: '1px solid #efefef', paddingTop: '15px' }}>
            <h4 style={{ margin: '0 0 10px', fontSize: '13px', color: '#666' }}>How are you feeling today?</h4>
            <div className="mood-selector">
                {moods.map(m => (
                    <button
                        key={m}
                        className="mood-btn"
                        onClick={() => addMoodLog(m)}
                        title="Log your mood"
                    >
                        {m}
                    </button>
                ))}
            </div>

            {moodLogs.length > 0 && (
                <div style={{ marginTop: '12px', display: 'flex', gap: '4px' }}>
                    {moodLogs.slice(0, 7).reverse().map((log, i) => (
                        <div key={i} style={{
                            width: '24px',
                            height: '24px',
                            background: '#f8f4f6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px'
                        }}>
                            {log.mood}
                        </div>
                    ))}
                </div>
            )}
            <p style={{ fontSize: '10px', color: '#aaa', marginTop: '10px', fontStyle: 'italic' }}>
                * This is not a medical tool.
            </p>
        </div>
    );
};
