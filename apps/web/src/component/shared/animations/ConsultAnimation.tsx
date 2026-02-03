import React from "react";
import { motion } from "framer-motion";

const ConsultAnimation: React.FC = () => {
    return (
        <div style={{ position: "relative", width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Central Avatar silhouette */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "48px",
                    zIndex: 2,
                    border: "2px solid rgba(255, 255, 255, 0.4)",
                }}
            >
                👩‍⚕️
            </motion.div>

            {/* Pulse Rings */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.5 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeOut",
                    }}
                    style={{
                        position: "absolute",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                    }}
                />
            ))}

            {/* Surrounding Nodes */}
            {[
                { top: "20%", left: "20%", delay: 0.5 },
                { top: "30%", right: "15%", delay: 0.8 },
                { bottom: "25%", left: "25%", delay: 1.1 },
            ].map((node, index) => (
                <React.Fragment key={index}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: node.delay }}
                        style={{
                            position: "absolute",
                            top: node.top,
                            left: node.left,
                            right: node.right,
                            bottom: node.bottom,
                            width: "40px",
                            height: "40px",
                            background: "rgba(255, 255, 255, 0.15)",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "18px",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                    >
                        📱
                    </motion.div>
                    {/* Dotted lines towards center could be added here with SVG if complex, but keeping it simple as per "subtle" rule */}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ConsultAnimation;
