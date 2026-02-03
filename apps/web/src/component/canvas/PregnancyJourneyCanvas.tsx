import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
    className?: string;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const particles: Particle[] = [];
        const particleCount = 50;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas!.width) this.x = 0;
                if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                ctx!.fillStyle = `rgba(236, 64, 122, ${this.opacity})`;
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(236, 64, 122, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} id="particleCanvas" className={className} />;
};

interface PregnancySimulatorProps {
    week: number;
    view: 'front' | 'side' | 'xray';
    layers: { baby: boolean, organs: boolean, measures: boolean };
}

export const PregnancySimulator: React.FC<PregnancySimulatorProps> = ({ week, view, layers }) => {
    const bellyRx = 80 + (week * 1.5);
    const bellyRy = 110 + (week * 2);
    const babyBodyRx = 35 + week * 0.3;
    const babyBodyRy = 50 + week * 0.5;
    const babyHeadR = 28 + (week * 0.5);

    const getBodyOpacity = () => {
        if (view === 'front') return 1;
        if (view === 'side') return 0.8;
        return 0.3;
    };

    const getBabyOpacity = () => {
        if (!layers.baby) return 0;
        if (view === 'front') return 0.3;
        if (view === 'side') return 0.5;
        return 1;
    };

    const getOrgansOpacity = () => {
        if (!layers.organs) return 0;
        if (view === 'xray') return 1;
        return 0;
    };

    const getMeasuresOpacity = () => {
        return layers.measures ? 1 : 0;
    };

    const fundalHeight = Math.max(0, week - 20 + 20);
    const babyLength = (0.1 + (51 - 0.1) * (week / 40)).toFixed(1); // Simplified interpolation for SVG label

    return (
        <svg id="pregnancySVG" viewBox="0 0 400 700" className="pregnancy-svg">
            <defs>
                <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ffd7ba', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ffb89d', stopOpacity: 1 }} />
                </linearGradient>
                <radialGradient id="bellyGrad" cx="50%" cy="50%">
                    <stop offset="0%" style={{ stopColor: '#ffe4d1', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ffc7a8', stopOpacity: 1 }} />
                </radialGradient>
                <filter id="softShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g id="bodyGroup" className="body-group" style={{ opacity: getBodyOpacity() }}>
                <ellipse cx="200" cy="80" rx="45" ry="55" fill="url(#skinGrad)" filter="url(#softShadow)" />
                <ellipse cx="200" cy="50" rx="48" ry="35" fill="#4a2c2a" />
                <path d="M 152 70 Q 150 50 165 40 Q 180 35 200 35 Q 220 35 235 40 Q 250 50 248 70" fill="#4a2c2a" stroke="none" />
                <circle cx="185" cy="75" r="3" fill="#3d2817" />
                <circle cx="215" cy="75" r="3" fill="#3d2817" />
                <path d="M 190 95 Q 200 100 210 95" stroke="#d4816f" strokeWidth="2" fill="none" strokeLinecap="round" />
                <rect x="185" y="125" width="30" height="25" fill="url(#skinGrad)" rx="5" />
                <ellipse cx="140" cy="165" rx="35" ry="20" fill="#ec407a" opacity="0.9" />
                <ellipse cx="260" cy="165" rx="35" ry="20" fill="#ec407a" opacity="0.9" />
                <path d="M 120 170 Q 115 250 120 350 L 180 460 Q 200 470 220 460 L 280 350 Q 285 250 280 170 Z" fill="#ec407a" opacity="0.95" />
                <ellipse id="bellyMain" cx="200" cy="320" rx={bellyRx} ry={bellyRy} fill="url(#bellyGrad)" filter="url(#softShadow)" className="belly-growth" />
                <ellipse cx="200" cy="300" rx="4" ry="6" fill="#d4816f" opacity="0.6" />
                <ellipse cx="100" cy="240" rx="18" ry="65" fill="url(#skinGrad)" transform="rotate(-10 100 240)" />
                <ellipse cx="300" cy="240" rx="18" ry="65" fill="url(#skinGrad)" transform="rotate(10 300 240)" />
                <ellipse cx="170" cy="540" rx="20" ry="90" fill="#5d4157" />
                <ellipse cx="230" cy="540" rx="20" ry="90" fill="#5d4157" />
            </g>

            <g id="babyGroup" className="baby-group" style={{ opacity: getBabyOpacity() }}>
                <ellipse id="babyBody" cx="200" cy="320" rx={babyBodyRx} ry={babyBodyRy} fill="#f8bbd0" opacity="0.8" className="baby-growth" />
                <circle id="babyHead" cx="200" cy="260" r={babyHeadR} fill="#f8bbd0" opacity="0.8" className="baby-growth" />
                <ellipse cx="200" cy="270" rx="20" ry="25" fill="#fce4ec" opacity="0.6" />
                <circle cx="193" cy="265" r="2" fill="#d81b60" />
                <circle cx="207" cy="265" r="2" fill="#d81b60" />
                <path d="M 196 273 Q 200 275 204 273" stroke="#d81b60" strokeWidth="1" fill="none" />
                <path id="umbilicalCord" d="M 200 345 Q 190 365 200 380" stroke="#f06292" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
            </g>

            <g id="organsGroup" className="organs-group" style={{ opacity: getOrgansOpacity() }}>
                <ellipse cx="200" cy="320" rx="85" ry="115" fill="none" stroke="#d81b60" strokeWidth="2" strokeDasharray="5,5" />
                <text x="200" y="445" textAnchor="middle" fill="#d81b60" fontSize="12" fontWeight="600">Uterus</text>
                <ellipse cx="230" cy="300" rx="25" ry="20" fill="#c2185b" opacity="0.5" />
                <text x="260" y="305" fill="#c2185b" fontSize="10">Placenta</text>
                <ellipse cx="200" cy="320" rx="75" ry="105" fill="none" stroke="#4fc3f7" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="125" y="330" fill="#0288d1" fontSize="10">Amniotic Sac</text>
            </g>

            <g id="measuresGroup" className="measures-group" style={{ opacity: getMeasuresOpacity() }}>
                <line x1="150" y1="210" x2="250" y2="210" stroke="#f06292" strokeWidth="2" strokeDasharray="4,4" />
                <text x="255" y="215" fill="#d81b60" fontSize="11" fontWeight="600">
                    Fundal Height: <tspan id="svgFundalHeight">{fundalHeight}cm</tspan>
                </text>
                <line x1="180" y1="260" x2="180" y2="370" stroke="#9c27b0" strokeWidth="2" />
                <text x="165" y="315" fill="#9c27b0" fontSize="11" fontWeight="600" transform="rotate(-90 165 315)">
                    <tspan id="svgBabyLength">{babyLength}cm</tspan>
                </text>
            </g>

            <text x="200" y="670" textAnchor="middle" fill="#d81b60" fontSize="18" fontWeight="700" id="svgWeekLabel">
                Week {week}
            </text>
        </svg>
    );
};
