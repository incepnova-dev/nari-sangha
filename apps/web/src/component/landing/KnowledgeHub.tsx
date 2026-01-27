import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";

const KnowledgeHub: React.FC = () => {
    const { t } = useI18n();

    return (
        <section className={styles.knowledgeHubSection}>
            <div className={styles.knowledgeHubContainer}>
                <h2>{t("knowledge.title")}</h2>
                <p>{t("knowledge.subtitle")}</p>
                <button className={styles.primaryCta}>Join the Hub</button>
            </div>
        </section>
    );
};

export default KnowledgeHub;
