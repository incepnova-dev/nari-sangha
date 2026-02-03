import React from 'react';
import { usePhase2 } from './Phase2Provider';

export const WeekPicker: React.FC = () => {
    const { stage, updateStage } = usePhase2();

    const handleStageChange = (type: 'pregnancy' | 'postpartum' | 'none') => {
        updateStage({ ...stage, type });
    };

    const handleWeekChange = (week: number) => {
        updateStage({ ...stage, week });
    };

    return (
        <div style={{ paddingBottom: '15px', borderBottom: '1px solid #efefef' }}>
            <h4 style={{ margin: '0 0 10px', fontSize: '13px', color: '#666' }}>I am currently in:</h4>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {['pregnancy', 'postpartum', 'none'].map((t) => (
                    <button
                        key={t}
                        onClick={() => handleStageChange(t as any)}
                        style={{
                            padding: '6px 10px',
                            fontSize: '11px',
                            fontWeight: '700',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            background: stage.type === t ? 'var(--pink)' : 'white',
                            color: stage.type === t ? 'white' : '#666',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {stage.type !== 'none' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888', marginBottom: '5px' }}>
                        <span>Week {stage.week}</span>
                        <span>{stage.type === 'pregnancy' ? 'Max 40' : 'Max 52'}</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max={stage.type === 'pregnancy' ? 40 : 52}
                        value={stage.week}
                        onChange={(e) => handleWeekChange(parseInt(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--pink)' }}
                    />
                </div>
            )}
        </div>
    );
};
