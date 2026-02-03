import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ServicesSection.module.css";
import { ROUTES } from "../routes/Routes";

interface ServiceCategory {
    title: string;
    icon: string;
    desc: string;
    items: string[];
    color: string;
    tag?: string;
    cta?: string;
}


const SERVICES: ServiceCategory[] = [
    {
        title: "Gynaecology & OB",
        icon: "🩺",
        desc: "Comprehensive care for every stage of your reproductive life.",
        items: [
            "Annual Wellness Exam",
            "Prenatal & Postnatal Care",
            "Contraceptive Counselling",
            "PCOS/Endometriosis Management"
        ],
        color: "linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)"
    },
    {
        title: "Fertility & Planning",
        icon: "🥚",
        desc: "Specialized support for those planning a family or exploring options.",
        items: [
            "Fertility Assessment",
            "Ovulation Induction",
            "Egg Freezing Consultation",
            "Infertility Support"
        ],
        color: "linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)"
    },
    {
        title: "Mental Wellness",
        icon: "🧠",
        desc: "Holistic mental health support tailored for women's transitions.",
        items: [
            "Postpartum Depression (PPD)",
            "Anxiety & Stress Management",
            "Menopause Mental Health",
            "Grief & Loss Counselling"
        ],
        color: "linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)"
    },
    {
        title: "Specialized Care",
        icon: "✨",
        desc: "Expert guidance for specific health and aesthetic goals.",
        items: [
            "Adolescent Gynaecology",
            "Menopause Management",
            "Cosmetic Gynaecology",
            "Preventive Screenings"
        ],
        color: "linear-gradient(135deg, #F6D365 0%, #FDA085 100%)"
    },
    {
        title: "Nutrition & Fitness",
        icon: "🥗",
        desc: "Functional nutrition and movement plans tailored to your hormonal health.",
        items: [
            "Cycle-Syncing Nutrition",
            "Hormone Balancing Diet",
            "Prenatal Yoga & Fitness",
            "Metabolic Health Support"
        ],
        color: "linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)"
    },
    {
        title: "Diagnostic & Screening",
        icon: "🔬",
        desc: "Advanced screening and testing to stay ahead of your health goals.",
        items: [
            "Full Body Health Check",
            "Genetic Screenings",
            "Breast Health Scans",
            "Hormone Level Panels"
        ],
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        title: "Master Your Breastfeeding Journey",
        icon: "🍼",
        tag: "Interactive Simulation",
        desc: "Experience the biological wonder of lactation through our Bio-Twin simulation lab and interactive guides.",
        items: [
            "Lactation Biology",
            "3D Latch Simulation",
            "Nutritional Support",
            "Interactive Positioning"
        ],
        cta: "Begin Simulation",
        color: "linear-gradient(135deg, #ec407a 0%, #d81b60 100%)"
    }
];

const ServicesSection: React.FC = () => {
    const navigate = useNavigate();

    const handleServiceClick = (title: string) => {
        switch (title) {
            case "Gynaecology & OB": navigate(ROUTES.GYNAECOLOGY_OB); break;
            case "Fertility & Planning": navigate(ROUTES.FERTILITY); break;
            case "Mental Wellness": navigate(ROUTES.MENTAL_WELLNESS); break;
            case "Specialized Care": navigate(ROUTES.COSMETIC_SURGERY); break;
            case "Nutrition & Fitness": navigate(ROUTES.NUTRITION_GUIDE); break;
            case "Diagnostic & Screening": navigate(ROUTES.PREVENTIVE_HEALTH); break;
            case "Master Your Breastfeeding Journey": navigate(ROUTES.BREASTFEEDING); break;
            default: navigate(ROUTES.JOURNEYS);
        }
    };

    return (
        <div id="services">
            <section className={styles.section}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px' }}>Our Health Services</h2>
                        <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                            Dedicated healthcare solutions designed by women, for women.
                        </p>
                    </div>
                    <div className={styles.grid}>
                        {SERVICES.map((cat, idx) => (
                            <div key={idx} className={styles.categoryCard}>
                                <div className={styles.cardHero} style={{ background: cat.color }}>{cat.icon}</div>
                                <div className={styles.cardBody}>
                                    {cat.tag && <div className={styles.cardTag}>{cat.tag}</div>}
                                    <h3>{cat.title}</h3>
                                    <p className={styles.catDesc}>{cat.desc}</p>
                                    <ul className={styles.itemList}>
                                        {cat.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                    <button className={styles.btnExplore} onClick={() => handleServiceClick(cat.title)}>
                                        {cat.cta || "Learn More"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section} style={{ background: '#f8f4f6' }}>
                <div className={styles.container}>
                    <div className={styles.callout}>
                        <h2>Ready to consult with a specialist?</h2>
                        <p>Our network of experienced doctors and wellness experts is available for both in-person and virtual consultations.</p>
                        <div className={styles.btnRow}>
                            <button className={styles.btnPrimary} onClick={() => navigate(ROUTES.FIND_DOCTORS)}>Find a Doctor</button>
                            <button className={styles.btnOutline} onClick={() => navigate(ROUTES.APPOINTMENTS)}>Book Teleconsultation</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesSection;
