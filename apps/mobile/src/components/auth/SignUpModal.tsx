import React from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { getProperty } from '../../i18';
import { modalStyles, buttons } from '../../styles';

interface SignUpModalProps {
  isOpen: boolean;
  language?: string;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  language = 'en',
  onClose,
}) => {
  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={modalStyles.modalOverlay}
      >
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>
            {getProperty('signup.title', language) || 'Sign Up'}
          </Text>
          <Text style={modalStyles.modalPlaceholder}>
            Sign Up functionality will be implemented here
          </Text>
          <View style={modalStyles.modalButtons}>
            <TouchableOpacity
              style={[buttons.button, buttons.secondaryButton, { marginRight: 12 }]}
              onPress={onClose}
            >
              <Text style={buttons.secondaryButtonText}>
                {getProperty('signup.button.cancel', language) || 'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttons.button, buttons.primaryButton]}
              onPress={onClose}
            >
              <Text style={buttons.primaryButtonText}>
                {getProperty('signup.button.submit', language) || 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SignUpModal;


