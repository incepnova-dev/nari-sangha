import React from "react";
import { motion } from "framer-motion";

const ProductsAnimation: React.FC = () => {
    const cardIcons = ["💊", "🩺", "🧴", "🩹", "🤰", "🥣", "🧬", "🧪"];
    const count = cardIcons.length;

    return (
        <div style={{ position: "relative", width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Central soft circle */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "white",
                    position: "absolute",
                }}
            />

            {/* Orbiting Cards */}
            {cardIcons.map((icon, index) => {
                const startRotation = (index / count) * 360;
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0, rotate: startRotation }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: startRotation + 360,
                        }}
                        transition={{
                            opacity: { duration: 0.8, delay: 0.1 * index },
                            scale: { duration: 0.8, delay: 0.1 * index },
                            rotate: {
                                duration: 20, // Slightly slower for more items
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }}
                        style={{
                            position: "absolute",
                            width: "55px", // Slightly smaller to fit more
                            height: "55px",
                            background: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "12px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "22px",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            transformOrigin: "center 150px", // Slightly larger radius
                            top: "50px",
                        }}
                    >
                        {/* Reverse rotation for the icon to stay upright */}
                        <motion.div
                            animate={{ rotate: -(startRotation + 360) }}
                            initial={{ rotate: -startRotation }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            {icon}
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ProductsAnimation;
