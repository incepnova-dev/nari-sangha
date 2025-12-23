import React, { useCallback, useState } from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { getProperty } from '../../i18';
import { modalStyles, buttons } from '../../styles';
import { signIn, SignInData } from '../../services/authService';

interface SignInModalProps {
  isOpen: boolean;
  language?: string;
  onClose: () => void;
  onSignInSuccess?: (userData: any) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  language = 'en',
  onClose,
  onSignInSuccess,
}) => {
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignInChange =
    (field: 'email' | 'password') =>
    (value: string) => {
      setSignInForm(prev => ({ ...prev, [field]: value }));
      if (error) setError(null);
    };

  const handleClose = useCallback(() => {
    if (isLoading) return;
    setError(null);
    setSignInForm({ email: '', password: '' });
    onClose();
  }, [isLoading, onClose]);

  const handleSubmit = useCallback(async () => {
    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const trimmedEmail = signInForm.email.trim();
      const result = await signIn({
        email: trimmedEmail,
        password: signInForm.password,
      });

      if (!result.success) {
        setError(
          result.error ||
            getProperty('signin.error.generic', language) ||
            'Sign in failed. Please try again.'
        );
        return;
      }

      if (onSignInSuccess) {
        onSignInSuccess(result.data as SignInData);
      }
    } catch (e) {
      setError(
        getProperty('signin.error.generic', language) ||
          'Sign in failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language, onSignInSuccess, signInForm.email]);

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={modalStyles.modalOverlay}
      >
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>
            {getProperty('signin.title', language)}
          </Text>

          {error ? <Text style={modalStyles.errorText}>{error}</Text> : null}

          <View style={modalStyles.form}>
            <View style={modalStyles.field}>
              <Text style={modalStyles.label}>
                {getProperty('signin.email.label', language)}
              </Text>
              <TextInput
                value={signInForm.email}
                onChangeText={handleSignInChange('email')}
                placeholder={getProperty('signin.email.placeholder', language)}
                placeholderTextColor={modalStyles.modalPlaceholder.color}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
                style={modalStyles.input}
              />
            </View>

            <View style={modalStyles.field}>
              <Text style={modalStyles.label}>
                {getProperty('signin.password.label', language)}
              </Text>
              <TextInput
                value={signInForm.password}
                onChangeText={handleSignInChange('password')}
                placeholder={getProperty(
                  'signin.password.placeholder',
                  language
                )}
                placeholderTextColor={modalStyles.modalPlaceholder.color}
                secureTextEntry
                editable={!isLoading}
                style={modalStyles.input}
              />
            </View>
          </View>

          <View style={modalStyles.modalButtons}>
            <TouchableOpacity
              style={[buttons.button, buttons.secondaryButton, { marginRight: 12 }]}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={buttons.secondaryButtonText}>
                {getProperty('signin.button.cancel', language)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[buttons.button, buttons.primaryButton]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={modalStyles.loadingContainer}>
                  <ActivityIndicator size="small" color="#ffffff" />
                  <Text style={buttons.primaryButtonText}>
                    {getProperty('signin.button.submitting', language) ||
                      getProperty('signin.button.submit', language)}
                  </Text>
                </View>
              ) : (
                <Text style={buttons.primaryButtonText}>
                  {getProperty('signin.button.submit', language)}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SignInModal;


