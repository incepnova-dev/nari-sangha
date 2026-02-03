import React from "react";
import { motion } from "framer-motion";

const CommunityAnimation: React.FC = () => {
    const bubbles = [
        { size: 60, top: "20%", left: "10%", delay: 0 },
        { size: 80, top: "50%", left: "30%", delay: 1 },
        { size: 50, top: "15%", right: "20%", delay: 0.5 },
        { size: 70, bottom: "20%", right: "15%", delay: 1.5 },
        { size: 45, bottom: "40%", left: "15%", delay: 0.8 },
    ];

    return (
        <div style={{ position: "relative", width: "100%", height: "400px", overflow: "hidden" }}>
            {bubbles.map((b, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: [0.4, 0.7, 0.4],
                        y: [0, -40, 0],
                        x: [0, 15, 0],
                    }}
                    transition={{
                        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: b.delay },
                        y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: b.delay },
                        x: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: b.delay },
                        duration: 1,
                    }}
                    style={{
                        position: "absolute",
                        top: b.top,
                        left: b.left,
                        right: b.right,
                        bottom: b.bottom,
                        width: b.size,
                        height: b.size,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: b.size * 0.4,
                    }}
                >
                    {["👩", "💬", "🫂", "✨", "❤️"][i]}
                </motion.div>
            ))}
        </div>
    );
};

export default CommunityAnimation;
