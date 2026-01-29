import React from "react";
import styles from "./ChatbotTrigger.module.css";
import { useChatbot } from "../../context/ChatbotContext";

const ChatbotTrigger: React.FC = () => {
    const { toggleChat, isChatOpen } = useChatbot();

    return (
        <button
            className={`${styles.trigger} ${isChatOpen ? styles.active : ""}`}
            onClick={toggleChat}
            aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
        >
            <div className={styles.iconWrapper}>
                <span className={styles.icon}>{isChatOpen ? "✕" : "💜"}</span>
            </div>
            <div className={styles.pulse}></div>
        </button>
    );
};

export default ChatbotTrigger;
