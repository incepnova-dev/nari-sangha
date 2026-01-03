import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { agenticPlaygroundStyles, colors } from '../styles';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AgenticPlaygroundProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const AgenticPlayground: React.FC<AgenticPlaygroundProps> = ({
  isOpen,
  onClose,
  userName = 'User',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${userName}! 👋 I'm your AI Health Assistant. How can I help you today?`,
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      // Scroll to bottom when new message is added
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('pcos') || lowerInput.includes('polycystic')) {
      return 'PCOS (Polycystic Ovary Syndrome) is a hormonal disorder affecting 1 in 10 women. Common symptoms include irregular periods, excess hair growth, and weight gain. Treatment often involves lifestyle changes, medication, and regular monitoring. Would you like more specific information?';
    } else if (lowerInput.includes('pregnancy') || lowerInput.includes('pregnant')) {
      return 'Pregnancy care is crucial for both mother and baby. Key aspects include:\n• Regular prenatal checkups\n• Proper nutrition and supplements\n• Exercise and rest\n• Monitoring fetal development\n\nIs there a specific aspect of pregnancy you\'d like to know more about?';
    } else if (lowerInput.includes('menstrual') || lowerInput.includes('period')) {
      return 'Menstrual health is important for overall well-being. Common concerns include:\n• Irregular cycles\n• Pain management\n• Heavy bleeding\n• PMS symptoms\n\nWhat specific menstrual health question can I help with?';
    } else if (lowerInput.includes('symptom') || lowerInput.includes('pain')) {
      return 'I can help you understand symptoms, but please remember I\'m not a replacement for professional medical advice. For persistent or severe symptoms, please consult with a healthcare provider. What symptoms are you experiencing?';
    } else if (lowerInput.includes('doctor') || lowerInput.includes('appointment')) {
      return 'I can help you find healthcare providers! You can:\n• Search for doctors by specialization\n• Find clinics near you\n• Book appointments\n• Get recommendations\n\nWould you like me to help you find a doctor?';
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return `Hello! I'm here to help with your women's health questions. What would you like to know?`;
    } else {
      return 'Thank you for your question. I\'m here to help with women\'s health topics including:\n• Health conditions and symptoms\n• Pregnancy and fertility\n• Menstrual health\n• Finding healthcare providers\n• General wellness\n\nHow can I assist you today?';
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={agenticPlaygroundStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <StatusBar barStyle="light-content" />
        
        {/* Header */}
        <View style={agenticPlaygroundStyles.header}>
          <TouchableOpacity style={agenticPlaygroundStyles.closeButton} onPress={onClose}>
            <Text style={agenticPlaygroundStyles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={agenticPlaygroundStyles.headerContent}>
            <Text style={agenticPlaygroundStyles.headerTitle}>AI Health Assistant</Text>
            <Text style={agenticPlaygroundStyles.headerSubtitle}>Your 24/7 health companion</Text>
          </View>
          <View style={agenticPlaygroundStyles.headerSpacer} />
        </View>

        {/* Messages Container */}
        <ScrollView
          ref={scrollViewRef}
          style={agenticPlaygroundStyles.messagesContainer}
          contentContainerStyle={agenticPlaygroundStyles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                agenticPlaygroundStyles.messageWrapper,
                message.sender === 'user' ? agenticPlaygroundStyles.userMessageWrapper : agenticPlaygroundStyles.assistantMessageWrapper,
              ]}
            >
              <View
                style={[
                  agenticPlaygroundStyles.messageBubble,
                  message.sender === 'user' ? agenticPlaygroundStyles.userMessage : agenticPlaygroundStyles.assistantMessage,
                ]}
              >
                <Text
                  style={[
                    agenticPlaygroundStyles.messageText,
                    message.sender === 'user' ? agenticPlaygroundStyles.userMessageText : agenticPlaygroundStyles.assistantMessageText,
                  ]}
                >
                  {message.text}
                </Text>
                <Text style={agenticPlaygroundStyles.timestamp}>{formatTime(message.timestamp)}</Text>
              </View>
            </View>
          ))}
          
          {isTyping && (
            <View style={[agenticPlaygroundStyles.messageWrapper, agenticPlaygroundStyles.assistantMessageWrapper]}>
              <View style={[agenticPlaygroundStyles.messageBubble, agenticPlaygroundStyles.assistantMessage]}>
                <View style={agenticPlaygroundStyles.typingIndicator}>
                  <View style={agenticPlaygroundStyles.typingDot} />
                  <View style={agenticPlaygroundStyles.typingDot} />
                  <View style={agenticPlaygroundStyles.typingDot} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Container */}
        <View style={agenticPlaygroundStyles.inputContainer}>
          <TextInput
            style={agenticPlaygroundStyles.input}
            placeholder="Type your message..."
            placeholderTextColor={colors.text.tertiary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[agenticPlaygroundStyles.sendButton, !inputText.trim() && agenticPlaygroundStyles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || isTyping}
          >
            <Text style={agenticPlaygroundStyles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AgenticPlayground;

