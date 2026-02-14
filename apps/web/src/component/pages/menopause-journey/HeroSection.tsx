import React, { useEffect, useRef } from 'react';
import { StageKey } from './constants';

interface HeroSectionProps {
  onStageChange: (stage: StageKey) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStageChange }) => {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize particle canvas
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(236, 64, 122, 0.3)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="hero-constellation">
      <div className="constellation-bg">
        <canvas ref={particleCanvasRef} id="particleCanvas"></canvas>
        <div className="gradient-morph"></div>
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="pulse-dot"></span>
            Your Personal Hormone Journey
          </div>
          
          <h1 className="hero-title-3d">
            <span className="title-line">Menopause is a</span>
            <span className="title-line title-emphasis">Journey</span>
            <span className="title-line">Not One Day</span>
          </h1>

          <p className="hero-description">
            From late 30s to post‑menopause, your hormones, brain, heart, bones, and mood are all connected. Navigate your unique path with evidence-based guidance.
          </p>

          <div className="badge-constellation">
            <div className="badge-orbit">
              <span className="hero-badge-3d badge-1">
                <i className="badge-icon">📊</i>
                <span>STRAW+10 Staging</span>
              </span>
              <span className="hero-badge-3d badge-2">
                <i className="badge-icon">🪟</i>
                <span>Windows of Opportunity</span>
              </span>
              <span className="hero-badge-3d badge-3">
                <i className="badge-icon">🔬</i>
                <span>Evidence‑Based Care</span>
              </span>
            </div>
          </div>

          <div className="hero-cta-constellation">
            <button className="btn-primary-3d">
              <span className="btn-shine"></span>
              <span className="btn-text">Start Your Journey</span>
              <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20">
                <path d="M10 4 L10 16 M10 16 L6 12 M10 16 L14 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="btn-secondary-3d">
              <span className="btn-icon">👩‍⚕️</span>
              <span className="btn-text">Talk to an Expert</span>
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="stage-constellation">
            <div className="hormone-core">
              <div className="core-pulse"></div>
              <div className="core-label">Your Journey</div>
            </div>

            <div className="stage-orb orb-1" onClick={() => onStageChange('lateRepro')}>
              <div className="orb-glow"></div>
              <div className="orb-content">
                <div className="orb-number">01</div>
                <div className="orb-icon">🌱</div>
                <div className="orb-label">Late Reproductive</div>
                <div className="orb-sublabel">30s–early 40s</div>
              </div>
            </div>

            <div className="stage-orb orb-2" onClick={() => onStageChange('peri')}>
              <div className="orb-glow"></div>
              <div className="orb-content">
                <div className="orb-number">02</div>
                <div className="orb-icon">⚡</div>
                <div className="orb-label">Perimenopause</div>
                <div className="orb-sublabel">Cycles wobble</div>
              </div>
            </div>

            <div className="stage-orb orb-3" onClick={() => onStageChange('earlyPost')}>
              <div className="orb-glow"></div>
              <div className="orb-content">
                <div className="orb-number">03</div>
                <div className="orb-icon">🧘‍♀️</div>
                <div className="orb-label">Postmenopause</div>
                <div className="orb-sublabel">Long-term health</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-text">Explore Your Path</div>
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 4 L12 20 M12 20 L8 16 M12 20 L16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

