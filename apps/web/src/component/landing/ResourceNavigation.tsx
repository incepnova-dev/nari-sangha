import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, ShieldCheck, BookOpen, UserCheck } from "lucide-react";
import styles from "./landing.module.css";
import { ROUTES } from "../routes/Routes";

const ResourceNavigation: React.FC = () => {
    const resources = [
        {
            title: "HealthCare Products",
            description: "Discover curated healthcare products designed for women’s needs.",
            cta: "Explore Products",
            path: ROUTES.PRODUCTS,
            icon: <ShoppingBag size={24} />,
        },
        {
            title: "Insurance Products",
            description: "Find insurance plans that support women’s health and wellness.",
            cta: "View Insurance Options",
            path: ROUTES.SUPPORT,
            icon: <ShieldCheck size={24} />,
        },
        {
            title: "Knowledge Hub",
            description: "Access trusted articles, guides, and research on women’s health.",
            cta: "Visit Knowledge Hub",
            path: ROUTES.STORIES,
            icon: <BookOpen size={24} />,
        },
        {
            title: "Expert Advice",
            description: "Connect with verified experts for personalized guidance and support.",
            cta: "Get Expert Advice",
            path: ROUTES.COMMUNITY,
            icon: <UserCheck size={24} />,
        },
    ];

    return (
        <section className={styles.resourceSection}>
            <div className={styles.resourceContainer}>
                <div className={styles.resourceHeader}>
                    <h2 className={styles.resourceTitle}>Explore Women’s Health Resources</h2>
                    <p className={styles.resourceSubtitle}>
                        Access trusted products, guidance, and knowledge designed for women.
                    </p>
                </div>
                <div className={styles.resourceGrid}>
                    {resources.map((resource, index) => (
                        <Link to={resource.path} key={index} className={styles.resourceCard}>
                            <div className={styles.resourceCardIcon}>
                                {resource.icon}
                            </div>
                            <h3 className={styles.resourceCardTitle}>{resource.title}</h3>
                            <p className={styles.resourceCardDescription}>{resource.description}</p>
                            <div className={styles.resourceCardCta}>
                                <span>{resource.cta}</span>
                                <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResourceNavigation;
