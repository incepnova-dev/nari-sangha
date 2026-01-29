import React from "react";
import styles from "./Services.module.css";
import InnerPageHero from "../shared/InnerPageHero";

interface ServiceCategory {
    title: string;
    icon: string;
    desc: string;
    items: string[];
    color: string;
}

const SERVICES: ServiceCategory[] = [
    {
        title: "Gynaecology & OB",
        icon: "🩺",
        desc: "Comprehensive care for every stage of your reproductive life.",
        items: ["Annual Wellness Exam", "Prenatal & Postnatal Care", "Contraceptive Counselling", "PCOS/Endometriosis Management"],
        color: "linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)"
    },
    {
        title: "Fertility & Planning",
        icon: "🥚",
        desc: "Specialized support for those planning a family or exploring options.",
        items: ["Fertility Assessment", "Ovulation Induction", "Egg Freezing Consultation", "Infertility Support"],
        color: "linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)"
    },
    {
        title: "Mental Wellness",
        icon: "🧠",
        desc: "Holistic mental health support tailored for women's transitions.",
        items: ["Postpartum Depression (PPD)", "Anxiety & Stress Management", "Menopause Mental Health", "Grief & Loss Counselling"],
        color: "linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)"
    },
    {
        title: "Specialized Care",
        icon: "✨",
        desc: "Expert guidance for specific health and aesthetic goals.",
        items: ["Adolescent Gynaecology", "Menopause Management", "Cosmetic Gynaecology", "Preventive Screenings"],
        color: "linear-gradient(135deg, #F6D365 0%, #FDA085 100%)"
    }
];

const Services: React.FC = () => {
    return (
        <div className={styles.servicesPage}>
            <InnerPageHero
                title="Our Health Services"
                subtitle="Dedicated healthcare solutions designed by women, for women. From routine checkups to specialized surgical and mental health support."
                badge="Complete Care"
                centered
            />

            <section className={styles.section} style={{ paddingTop: 0 }}>
                <div className={styles.container}>
                    <div className={styles.grid} style={{ marginTop: '-40px' }}>
                        {SERVICES.map((cat, idx) => (
                            <div key={idx} className={styles.categoryCard}>
                                <div className={styles.cardHero} style={{ background: cat.color }}>{cat.icon}</div>
                                <div className={styles.cardBody}>
                                    <h3>{cat.title}</h3>
                                    <p className={styles.catDesc}>{cat.desc}</p>
                                    <ul className={styles.itemList}>
                                        {cat.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                    <button className={styles.btnExplore}>Learn More</button>
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
                            <button className={styles.btnPrimary}>Find a Doctor</button>
                            <button className={styles.btnOutline}>Book Teleconsultation</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
