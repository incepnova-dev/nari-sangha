import React, { useEffect, useRef } from 'react';
import { ScannerPhase, OrganType } from '../hooks/useMenopauseLogic';

interface ScannerProps {
    phase: ScannerPhase;
    activeOrgan: OrganType;
    onOrganClick: (organ: OrganType) => void;
}

export const WholeBodyScanner: React.FC<ScannerProps> = ({ phase, activeOrgan, onOrganClick }) => {
    const particleLayerRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (!particleLayerRef.current) return;
        const layer = particleLayerRef.current;
        layer.innerHTML = '';

        const count = phase === 'repro' ? 40 : phase === 'peri' ? 20 : 8;
        const speed = phase === 'repro' ? 3 : phase === 'peri' ? 1.5 : 6;

        for (let i = 0; i < count; i++) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const x = 120 + (Math.random() - 0.5) * 80;
            const delay = Math.random() * 5;

            circle.setAttribute("cx", x.toString());
            circle.setAttribute("cy", "600");
            circle.setAttribute("r", (Math.random() * 2 + 1).toString());
            circle.setAttribute("fill", "#d81b60");
            circle.setAttribute("opacity", "0.6");

            const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            anim.setAttribute("attributeName", "cy");
            anim.setAttribute("from", "600");
            anim.setAttribute("to", "-100");
            anim.setAttribute("dur", `${speed + Math.random()}s`);
            anim.setAttribute("begin", `${delay}s`);
            anim.setAttribute("repeatCount", "indefinite");

            circle.appendChild(anim);
            layer.appendChild(circle);
        }
    }, [phase]);

    return (
        <div className={`viz-panel state-${phase}`}>
            <div className="thermal-overlay"></div>
            <svg width="300" height="600" viewBox="0 0 300 600" className="body-map-svg">
                <defs>
                    <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffca28" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ffca28" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Body Outline */}
                <path d="M 150 20 Q 180 20 180 80 Q 180 120 220 140 L 220 240 Q 150 230 80 240 L 80 140 Q 120 120 120 80 Q 120 20 150 20"
                    fill="#f3e5f5" stroke="#ce93d8" strokeWidth="2" />
                <path d="M 80 240 L 60 550 L 150 550 L 150 350 L 240 550 L 220 240"
                    fill="#f3e5f5" stroke="#ce93d8" strokeWidth="2" />

                <g ref={particleLayerRef} id="particleLayer"></g>

                {/* Interactive Organs */}
                <g className={`organ-group ${activeOrgan === 'brain' ? 'active' : ''}`} onClick={() => onOrganClick('brain')}>
                    <circle cx="150" cy="50" r="25" fill={activeOrgan === 'brain' ? "url(#brainGlow)" : "transparent"} />
                    <path d="M 135 50 Q 150 30 165 50 Q 150 70 135 50" fill="#ffca28" opacity="0.8" />
                </g>

                <g className={`organ-group ${activeOrgan === 'heart' ? 'active' : ''}`} onClick={() => onOrganClick('heart')}>
                    <path d="M 150 160 Q 170 140 170 160 Q 170 180 150 200 Q 130 180 130 160 Q 130 140 150 160"
                        fill="#ef5350" opacity="0.9" />
                </g>

                <g className={`organ-group ${activeOrgan === 'bones' ? 'active' : ''}`} onClick={() => onOrganClick('bones')}>
                    <rect x="140" y="350" width="20" height="150" rx="10"
                        fill="#fafafa" stroke="#90a4ae" strokeWidth="2" />
                </g>

                <g className={`organ-group ${activeOrgan === 'vagina' ? 'active' : ''}`} onClick={() => onOrganClick('vagina')}>
                    <ellipse cx="150" cy="300" rx="15" ry="25" fill="#f06292" opacity="0.6" />
                </g>
            </svg>
        </div>
    );
};
