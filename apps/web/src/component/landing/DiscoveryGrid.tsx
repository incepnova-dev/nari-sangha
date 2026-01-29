import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./landing.module.css";
import { ROUTES } from "../routes/Routes";

const DiscoveryGrid: React.FC = () => {
    const navigate = useNavigate();

    const categories = [
        { title: "Journeys", subtitle: "Guided health paths", path: ROUTES.JOURNEYS },
        { title: "Symptom Checker", subtitle: "AI-powered triage", path: ROUTES.SYMPTOM_CHECKER },
        { title: "Teleconsultation", subtitle: "Connect with doctors", path: ROUTES.APPOINTMENTS },
        { title: "Specialists", subtitle: "Find expert care", path: ROUTES.APPOINTMENTS },
        { title: "Screening", subtitle: "Preventive health checks", path: ROUTES.PREVENTIVE_HEALTH },
        { title: "Vaccination", subtitle: "Stay protected", path: ROUTES.PREVENTIVE_HEALTH },
    ];

    return (
        <div className={styles.discoverySection}>
            <div className={styles.discoveryGrid}>
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={styles.discoveryCard}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => category.path && navigate(category.path)}
                    >
                        <h3 className={styles.discoveryCardTitle}>{category.title}</h3>
                        <p className={styles.discoveryCardSubtitle}>{category.subtitle}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DiscoveryGrid;
