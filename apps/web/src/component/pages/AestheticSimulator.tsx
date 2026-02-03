import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './legacy/s2.css';
import { ROUTES } from '../routes/Routes';
import { useAestheticSimulatorLogic } from '../hooks/useAestheticSimulatorLogic';
import AestheticSimulatorCanvas from '../canvas/AestheticSimulatorCanvas';

const AestheticSimulator: React.FC = () => {
    const navigate = useNavigate();
    const {
        mode,
        landmarks,
        setLandmarks,
        params,
        updateParam,
        sliderPos,
        setSliderPos,
        isUploaded,
        setIsUploaded,
        metrics,
        handleModeSwitch,
        resetAll
    } = useAestheticSimulatorLogic();

    const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setUploadedImage(img);
                    setIsUploaded(true);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleMarkerDrag = (key: string, e: React.MouseEvent | React.TouchEvent) => {
        const container = e.currentTarget.parentElement;
        if (!container) return;

        const onMove = (moveEvent: MouseEvent | TouchEvent) => {
            const rect = container.getBoundingClientRect();
            const clientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
            const clientY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

            let x = (clientX - rect.left) / rect.width;
            let y = (clientY - rect.top) / rect.height;

            x = Math.max(0, Math.min(1, x));
            y = Math.max(0, Math.min(1, y));

            setLandmarks(prev => ({
                ...prev,
                [key]: { ...prev[key], x, y }
            }));
        };

        const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchend', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchend', onUp);
    };

    const handleSliderDrag = (e: React.MouseEvent) => {
        const container = e.currentTarget.parentElement;
        if (!container) return;

        const onMove = (moveEvent: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            let x = moveEvent.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            setSliderPos((x / rect.width) * 100);
        };

        const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    };

    return (
        <div className="simulator-body">
            <div className="app-container-sim">
                {/* Left Panel: Controls */}
                <div className="panel-sim">
                    <div className="header-sim">
                        <span onClick={() => navigate(ROUTES.COSMETIC_SURGERY)} style={{ cursor: 'pointer' }}>⬅</span>
                        Simulation Controls
                    </div>

                    <div className="mode-switch-sim">
                        <div
                            className={`mode-btn-sim ${mode === 'face' ? 'active' : ''}`}
                            onClick={() => handleModeSwitch('face')}
                        >
                            Face
                        </div>
                        <div
                            className={`mode-btn-sim ${mode === 'body' ? 'active' : ''}`}
                            onClick={() => handleModeSwitch('body')}
                        >
                            Body
                        </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                        <strong>Drag the Blue Dots</strong> to match the anatomy before adjusting sliders.
                    </div>

                    <div className={`controls-section-sim active`}>
                        {mode === 'face' ? (
                            <>
                                {['nose', 'lips', 'jaw', 'chin', 'lift', 'cheeks'].map(key => (
                                    <div className="control-group-sim" key={key}>
                                        <div className="label-row-sim">
                                            <span style={{ textTransform: 'capitalize' }}>{key}</span>
                                            <span>{params[key]}%</span>
                                        </div>
                                        <input
                                            type="range" className="range-input-sim" min="0" max="100" value={params[key]}
                                            onChange={(e) => updateParam(key, parseInt(e.target.value))}
                                        />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {['breast', 'blift', 'waist', 'hips'].map(key => (
                                    <div className="control-group-sim" key={key}>
                                        <div className="label-row-sim">
                                            <span style={{ textTransform: 'capitalize' }}>{key}</span>
                                            <span>{params[key]}%</span>
                                        </div>
                                        <input
                                            type="range" className="range-input-sim" min="0" max="100" value={params[key]}
                                            onChange={(e) => updateParam(key, parseInt(e.target.value))}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <button className="reset-btn-sim" onClick={resetAll}>Reset All</button>
                </div>

                {/* Center: Viewport */}
                <div className="viewport-sim">
                    {!isUploaded && (
                        <div className="upload-screen-sim">
                            <h2 style={{ marginBottom: '10px' }}>Aesthetic Simulator</h2>
                            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Upload a photo to begin your transformation.</p>
                            <label htmlFor="imgUpload" className="upload-btn-sim">Upload Photo</label>
                            <input type="file" id="imgUpload" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
                        </div>
                    )}

                    {isUploaded && (
                        <div className="canvas-wrapper-sim">
                            <AestheticSimulatorCanvas
                                image={uploadedImage}
                                params={params}
                                landmarks={landmarks}
                                mode={mode}
                                sliderPos={sliderPos}
                            />

                            <div className="side-label-sim lbl-orig-sim">ORIGINAL</div>
                            <div className="side-label-sim lbl-sim-sim">SIMULATION</div>

                            <div
                                className="slider-bar-sim"
                                style={{ left: `${sliderPos}%` }}
                                onMouseDown={handleSliderDrag}
                            >
                                <div className="slider-handle-sim">↔</div>
                            </div>

                            <div id="markersLayer">
                                {Object.entries(landmarks).map(([key, pos]) => (
                                    <div
                                        key={key}
                                        className="marker-sim"
                                        data-label={pos.label}
                                        style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }}
                                        onMouseDown={(e) => handleMarkerDrag(key, e)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel: Metrics */}
                <div className="panel-sim" style={{ borderLeft: '1px solid var(--border)', borderRight: 'none' }}>
                    <div className="header-sim">Projected Metrics</div>

                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>ESTIMATED COST</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${metrics.cost.toLocaleString()}</div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>RECOVERY TIME</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{metrics.recovery} Days</div>
                        <div style={{ width: '100%', height: '4px', background: '#334155', marginTop: '8px', borderRadius: '2px' }}>
                            <div style={{ width: `${Math.min(100, metrics.recovery * 4)}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.3s' }}></div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', padding: '15px', background: 'rgba(244, 114, 182, 0.1)', border: '1px solid rgba(244, 114, 182, 0.3)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--pink)', fontWeight: 'bold', marginBottom: '5px' }}>MEDICAL DISCLAIMER</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: '1.4' }}>Simulation results are approximations. Consult a board-certified surgeon.</div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default AestheticSimulator;
