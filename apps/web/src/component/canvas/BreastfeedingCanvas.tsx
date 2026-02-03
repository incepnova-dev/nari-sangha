import React, { useEffect, useRef, useState } from 'react';

interface SimulatorProps {
    milk: number;
    babyActive: boolean;
    pumpActive: boolean;
    sleepActive: boolean;
    overlayText?: string;
}

export const BreastfeedingSimulator: React.FC<SimulatorProps> = ({ milk, babyActive, pumpActive, sleepActive, overlayText }) => {
    return (
        <div className="bio-stage">
            <div className="label-point" style={{ top: 80, left: 60 }}>Milk Ducts</div>
            <div className="label-line" style={{ top: 90, left: 80, width: 40, transform: 'rotate(20deg)' }}></div>

            <div className="label-point" style={{ top: 180, right: 50 }}>Nipple Pores</div>
            <div className="label-line" style={{ top: 180, right: 90, width: 30 }}></div>

            {overlayText && <div className={`bio-text-overlay visible`}>{overlayText}</div>}

            <div className={`sim-sleep ${sleepActive ? 'active' : ''}`}>
                <i className="fa-solid fa-moon" style={{ fontSize: '4rem', marginBottom: '1rem', color: '#ffd54f' }}></i>
                <h3 style={{ fontSize: '1.5rem' }}>Rest & Repair</h3>
                <p>Hormones resetting...</p>
            </div>

            <div className={`sim-pump ${pumpActive ? 'active' : ''}`}>
                <div className="sim-bottle"><div className="sim-b-fill" style={{ height: pumpActive ? '100%' : '0%', transition: 'height 1.5s' }}></div></div>
                <div className="sim-bottle"><div className="sim-b-fill" style={{ height: pumpActive ? '100%' : '0%', transition: 'height 1.5s' }}></div></div>
            </div>

            <div className="torso">
                <div className="sim-breast">
                    <div className="breast-status" style={{ opacity: milk >= 95 ? 1 : 0.6 }}>{milk >= 95 ? 'Full (FIL Active)' : 'Filling...'}</div>
                    <div className="sim-milk" style={{ height: `${milk}%` }}></div>
                    <div className="sim-nipple"></div>
                </div>
                <div className="sim-breast">
                    <div className="breast-status" style={{ opacity: milk >= 95 ? 1 : 0.6 }}>{milk >= 95 ? 'Full (FIL Active)' : 'Filling...'}</div>
                    <div className="sim-milk" style={{ height: `${milk}%` }}></div>
                    <div className="sim-nipple"></div>
                </div>
            </div>

            <div className={`sim-baby ${babyActive ? 'active' : ''}`}>👶</div>
        </div>
    );
};

export const LatchSimulator3D: React.FC = () => {
    const [pos, setPos] = useState('cradle');
    const [phase, setPhase] = useState<'align' | 'gape' | 'latch' | 'success' | 'idle'>('idle');
    const [status, setStatus] = useState('Select a position to begin alignment.');

    const animateDeepLatch = () => {
        setPhase('align');
        setStatus('Step 1: Aligning Nose to Nipple... (Chin tucked)');

        setTimeout(() => {
            setPhase('gape');
            setStatus('Step 2: Waiting for wide gape (160°)...');

            setTimeout(() => {
                setPhase('latch');
                setStatus('Step 3: Asymmetric Latch! Chin first, then lips seal.');

                setTimeout(() => {
                    setPhase('success');
                    setStatus('Success! Deep latch achieved. Milk flowing.');
                }, 600);
            }, 1000);
        }, 800);
    };

    return (
        <div className="latch-3d-container">
            <div className={`stage-3d ${phase === 'gape' ? 'gaping' : ''} ${phase === 'latch' || phase === 'success' ? 'latching' : ''}`} data-pos={pos}>
                <div className="actor mother-group">
                    <svg width="240" height="320" viewBox="0 0 240 320" className="human-svg">
                        <path d="M 60 320 L 60 100 Q 60 20 160 20 L 230 20" fill="#ffdbac" />
                        <path d="M 60 120 Q 200 120 200 220 Q 200 290 130 310 L 60 310" fill="#ffdbac" />
                        <circle cx="160" cy="215" r="28" fill="#e57373" opacity="0.6" />
                        <circle cx="160" cy="215" r="8" fill="#d32f2f" opacity="0.8" />
                    </svg>
                </div>
                <div className="actor baby-group">
                    <svg width="150" height="150" viewBox="0 0 150 150" className="human-svg">
                        <g id="baby-head-shape" style={{ transform: phase === 'gape' ? 'rotate(-15deg)' : 'none', transition: 'transform 0.6s' }}>
                            <path d="M 20 80 Q 20 10 80 10 Q 140 10 140 70 L 140 85 Q 140 95 80 95" fill="#ffdbac" />
                            <ellipse cx="120" cy="80" rx="8" ry="10" fill="#e0bfa0" />
                        </g>
                        <g id="baby-jaw" style={{ transform: phase === 'gape' ? 'rotate(45deg)' : phase === 'latch' || phase === 'success' ? 'rotate(35deg)' : 'none', transition: 'transform 0.6s' }}>
                            <path d="M 35 90 Q 80 150 120 100 L 120 90" fill="#ffdbac" />
                        </g>
                    </svg>
                </div>
            </div>

            <div className="latch-ui">
                <h3><i className="fas fa-check-circle"></i> Perfect Latch Simulator</h3>
                <div className="control-grid">
                    {['cradle', 'cross', 'football', 'side'].map(p => (
                        <div key={p} className={`pos-card ${pos === p ? 'active' : ''}`} onClick={() => { setPos(p); setPhase('idle'); setStatus(`Aligned for ${p} hold. Ready to latch.`); }}>
                            <i className={`fas fa-${p === 'cradle' ? 'baby-carriage' : p === 'cross' ? 'hands-holding-circle' : p === 'football' ? 'football-ball' : 'bed'}`}></i>
                            <div><strong>{p.charAt(0).toUpperCase() + p.slice(1)}</strong></div>
                        </div>
                    ))}
                </div>
                <button className="play-latch-btn" onClick={animateDeepLatch}>
                    <i className="fas fa-play-circle"></i> Simulate Deep Latch
                </button>
                <div className={`latch-feedback-box ${phase === 'success' ? 'success' : phase !== 'idle' ? 'active' : ''}`}>
                    <span>{status}</span>
                </div>
            </div>
        </div>
    );
};

export const LifestyleWheel: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = 400 * dpr;
        canvas.height = 400 * dpr;
        ctx.scale(dpr, dpr);

        const data = [
            { label: 'Nutrition', val: 85, color: '#ec407a' },
            { label: 'Hydration', val: 70, color: '#42a5f5' },
            { label: 'Rest', val: 60, color: '#ab47bc' },
            { label: 'Stress', val: 40, color: '#ffa726' },
            { label: 'Latch', val: 90, color: '#66bb6a' }
        ];

        const centerX = 200;
        const centerY = 200;
        const radius = 150;

        const draw = () => {
            ctx.clearRect(0, 0, 400, 400);

            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                ctx.strokeStyle = '#eee';
                ctx.lineWidth = 1;
                for (let j = 0; j < data.length; j++) {
                    const angle = (j / data.length) * Math.PI * 2 - Math.PI / 2;
                    const r = (radius / 5) * i;
                    const x = centerX + r * Math.cos(angle);
                    const y = centerY + r * Math.sin(angle);
                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.fillStyle = 'rgba(236, 64, 122, 0.2)';
            ctx.strokeStyle = '#ec407a';
            ctx.lineWidth = 3;
            for (let j = 0; j < data.length; j++) {
                const angle = (j / data.length) * Math.PI * 2 - Math.PI / 2;
                const r = (radius * data[j].val) / 100;
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            data.forEach((item, j) => {
                const angle = (j / data.length) * Math.PI * 2 - Math.PI / 2;
                const x = centerX + (radius + 25) * Math.cos(angle);
                const y = centerY + (radius + 25) * Math.sin(angle);
                ctx.fillStyle = '#666';
                ctx.font = 'bold 12px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(item.label, x, y);
            });
        };

        draw();
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', maxWidth: '400px', height: 'auto' }} />;
};
