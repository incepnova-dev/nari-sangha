import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatbotPopup.module.css";
import { useChatbot } from "../../context/ChatbotContext";

interface Message {
    id: string;
    text: string;
    sender: "bot" | "user";
}

const ChatbotPopup: React.FC = () => {
    const { isChatOpen, closeChat } = useChatbot();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const bodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const suggestions = [
        "Period pain tips",
        "PCOS help",
        "Pregnancy nutrition",
        "Mental wellness"
    ];

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [messages, isChatOpen]);

    useEffect(() => {
        if (isChatOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isChatOpen]);

    // ESC key to close
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeChat();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeChat]);

    const handleSend = (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: "user"
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");

        // Mock bot response
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: `I'm here to help with "${messageText}". As your health companion, I can provide general guidance and tips. What else would you like to know?`,
                sender: "bot"
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    if (!isChatOpen && messages.length === 0) return null;

    return (
        <div className={styles.chatbotOverlay}>
            <div className={`${styles.chatbotPopup} ${isChatOpen ? styles.open : ""}`}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.botInfo}>
                        <div className={styles.avatar}>💜</div>
                        <div className={styles.headerText}>
                            <span className={styles.botName}>Nari AI</span>
                            <span className={styles.botSubtitle}>Your health companion</span>
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={closeChat} aria-label="Close Chat">
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className={styles.body} ref={bodyRef}>
                    {messages.length === 0 ? (
                        <div className={styles.welcomeContainer}>
                            <div className={styles.welcomeIllustration}>💜</div>
                            <h3 className={styles.welcomeTitle}>Hi! I'm Nari AI 💜</h3>
                            <p className={styles.welcomeText}>
                                I'm here to guide you on your health journey. Ask me anything about your wellness!
                            </p>
                            <div className={styles.suggestionChips}>
                                {suggestions.map((s) => (
                                    <button key={s} className={styles.chip} onClick={() => handleSend(s)}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((m) => (
                                <div key={m.id} className={`${styles.message} ${m.sender === "bot" ? styles.botMessage : styles.userMessage}`}>
                                    {m.text}
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Input */}
                <div className={styles.inputArea}>
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.inputField}
                        placeholder="Ask me anything..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className={styles.sendButton} onClick={() => handleSend()} disabled={!inputValue.trim()}>
                        ➔
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPopup;
