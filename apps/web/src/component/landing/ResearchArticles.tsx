import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";
import { ArrowRight } from "lucide-react";

const ResearchArticles: React.FC = () => {
    const { t } = useI18n();

    const articles = [
        { title: "Understanding PCOS: Latest Treatment Research", date: "Jan 12, 2026", category: "Medical Research" },
        { title: "The Impact of Nutrition on Women's Health", date: "Jan 10, 2026", category: "Nutrition" },
        { title: "Mental Wellness: Breaking the Stigma in Communities", date: "Jan 08, 2026", category: "Mental Health" },
    ];

    return (
        <section className={styles.researchSection}>
            <div className={styles.researchContainerWidth}>
                <div className={styles.researchHeaderRow}>
                    <div className={styles.sectionHeader} style={{ textAlign: 'left', margin: 0, maxWidth: 'none' }}>
                        <h2>{t("research.title")}</h2>
                        <p>{t("research.subtitle")}</p>
                    </div>
                    <a href="#!" className={styles.viewAllLink}>
                        View all research <ArrowRight size={16} />
                    </a>
                </div>

                <div className={styles.researchGrid}>
                    {articles.map((article, idx) => (
                        <div
                            key={idx}
                            className={styles.researchCard}
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            <span className={styles.articleBadge}>{article.category}</span>
                            <h3 className={styles.articleTitle}>{article.title}</h3>
                            <p className={styles.articleDate}>{article.date}</p>
                            <button className={styles.articleCta}>
                                View Article <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchArticles;
