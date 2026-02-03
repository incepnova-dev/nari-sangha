import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LivingBodyAnimationProps {
    activeRegion?: "full" | "abdomen" | "lower-abdomen" | "pelvic" | null;
}

const LivingBodyAnimation: React.FC<LivingBodyAnimationProps> = ({ activeRegion }) => {
    // Breathing loop variants
    const breathingVariants = {
        animate: {
            scale: [1, 1.01, 1],
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut" as const,
            },
        },
    };

    // Flow particles logic (removed variants to fix lint)

    return (
        <div style={{ position: "relative", width: "100%", height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <motion.div
                variants={breathingVariants}
                animate="animate"
                style={{ position: "relative", height: "100%", aspectRatio: "1/2.5" }}
            >
                {/* Main Silhouette SVG */}
                <svg viewBox="0 0 200 500" style={{ height: "100%", width: "auto" }}>
                    <defs>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fff5f7" />
                            <stop offset="50%" stopColor="#fdf2f8" />
                            <stop offset="100%" stopColor="#fff5f7" />
                        </linearGradient>

                        <filter id="glow">
                            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Body Outline */}
                    <path
                        d="M100,20 C80,20 70,35 70,55 C70,75 80,90 80,105 C80,115 75,125 60,140 C40,160 35,190 35,230 C35,270 45,300 65,330 C75,345 80,365 80,400 L80,480 L120,480 L120,400 C120,365 125,345 135,330 C155,300 165,270 165,230 C165,190 160,160 140,140 C125,125 120,115 120,105 C120,90 130,75 130,55 C130,35 120,20 100,20 Z"
                        fill="url(#bodyGradient)"
                        stroke="#fceef2"
                        strokeWidth="1"
                    />

                    {/* Ambient Flow (Particles) */}
                    <AnimatePresence>
                        {[...Array(5)].map((_, i) => (
                            <motion.circle
                                key={i}
                                cx={80 + Math.random() * 40}
                                cy={350}
                                r={2 + Math.random() * 3}
                                fill="#ec407a"
                                opacity={0.2}
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ y: -200, opacity: [0, 0.3, 0] }}
                                transition={{
                                    duration: 10 + Math.random() * 5,
                                    repeat: Infinity,
                                    delay: i * 2,
                                    ease: "linear",
                                }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Interactive Highlights */}
                    <AnimatePresence>
                        {activeRegion === "full" && (
                            <motion.path
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                exit={{ opacity: 0 }}
                                d="M100,20 C80,20 70,35 70,55 C70,75 80,90 80,105 C80,115 75,125 60,140 C40,160 35,190 35,230 C35,270 45,300 65,330 C75,345 80,365 80,400 L80,480 L120,480 L120,400 C120,365 125,345 135,330 C155,300 165,270 165,230 C165,190 160,160 140,140 C125,125 120,115 120,105 C120,90 130,75 130,55 C130,35 120,20 100,20 Z"
                                fill="#fdf2f8"
                                filter="url(#glow)"
                            />
                        )}

                        {activeRegion === "abdomen" && (
                            <motion.circle
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1, 0.8] }}
                                exit={{ opacity: 0 }}
                                cx="100"
                                cy="220"
                                r="40"
                                fill="#ec407a"
                                filter="url(#glow)"
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}

                        {activeRegion === "lower-abdomen" && (
                            <motion.ellipse
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1, 0.8] }}
                                exit={{ opacity: 0 }}
                                cx="100"
                                cy="280"
                                rx="35"
                                ry="25"
                                fill="#ec407a"
                                filter="url(#glow)"
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}

                        {activeRegion === "pelvic" && (
                            <motion.path
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.1, 0.5, 0.1] }}
                                exit={{ opacity: 0 }}
                                d="M70,250 Q100,320 130,250 Q100,280 70,250"
                                fill="#be185d"
                                filter="url(#glow)"
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        )}
                    </AnimatePresence>
                </svg>
            </motion.div>
        </div>
    );
};

export default LivingBodyAnimation;
