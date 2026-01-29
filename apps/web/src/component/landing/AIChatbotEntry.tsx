import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";
import { useChatbot } from "../../context/ChatbotContext";

const AIChatbotEntry: React.FC = () => {
    const { t } = useI18n();
    const { openChat } = useChatbot();

    return (
        <section className={styles.chatbotSection}>
            <div className={styles.chatbotContainer}>
                <div className={styles.chatbotMedia} />
                <div className={styles.chatbotContent}>
                    <span className={styles.chatbotTag}>{t("chatbot.tag")}</span>
                    <h2>{t("chatbot.title")}</h2>
                    <p>{t("chatbot.body")}</p>
                    <button className={styles.chatbotButton} onClick={openChat}>{t("chatbot.cta")}</button>
                </div>
            </div>
        </section>
    );
};

export default AIChatbotEntry;
