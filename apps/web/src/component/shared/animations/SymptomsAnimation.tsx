import React from "react";
import { motion } from "framer-motion";

const SymptomsAnimation: React.FC = () => {
    return (
        <div style={{ position: "relative", width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Abstract Body Shape Outer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2 }}
                style={{
                    width: "220px",
                    height: "320px",
                    borderRadius: "110px / 160px",
                    border: "3px solid white",
                    position: "absolute",
                }}
            />

            {/* Radial Scan Pulse */}
            <motion.div
                animate={{
                    scale: [0.8, 1.5],
                    opacity: [0.3, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
                style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                    position: "absolute",
                }}
            />

            {/* Floating Markers */}
            {[
                { top: "30%", left: "45%" },
                { top: "50%", right: "40%" },
                { bottom: "35%", left: "50%" },
                { top: "45%", left: "35%" },
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeInOut",
                    }}
                    style={{
                        position: "absolute",
                        ...pos,
                        width: "12px",
                        height: "12px",
                        background: "white",
                        borderRadius: "50%",
                        boxShadow: "0 0 15px white",
                    }}
                />
            ))}
        </div>
    );
};

export default SymptomsAnimation;
