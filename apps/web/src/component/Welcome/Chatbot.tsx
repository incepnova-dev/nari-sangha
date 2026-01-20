import React, { useState, useRef, useEffect } from 'react';
import { icons } from '../../styles/theme';
import styles from './Chatbot.module.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your health assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I'm here to help! Can you tell me more about what you're looking for?",
        "That's a great question! Let me help you with that.",
        "I understand. Let me provide you with some information about that.",
        "Thanks for your question! Here's what I can tell you...",
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickReplies = [
    'Find a doctor',
    'Health products',
    'Track vaccines',
    'Learn about PCOS',
  ];

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        className={`${styles.chatbotButton} ${isOpen ? styles.chatbotButtonHidden : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <span className={styles.chatbotIcon}>{icons.ai}</span>
        <span className={styles.chatbotPulse}></span>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>
            <div className={styles.chatbotHeaderInfo}>
              <span className={styles.chatbotHeaderIcon}>{icons.ai}</span>
              <div>
                <h3 className={styles.chatbotTitle}>Health Assistant</h3>
                <p className={styles.chatbotStatus}>Online</p>
              </div>
            </div>
            <button
              className={styles.chatbotClose}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className={styles.chatbotMessages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.sender === 'user' ? styles.messageUser : styles.messageBot
                }`}
              >
                <div className={styles.messageBubble}>
                  <p className={styles.messageText}>{message.text}</p>
                  <span className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatbotQuickReplies}>
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className={styles.quickReplyButton}
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <div className={styles.chatbotInput}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={styles.chatbotInputField}
            />
            <button
              className={styles.chatbotSendButton}
              onClick={handleSendMessage}
              aria-label="Send message"
            >
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

