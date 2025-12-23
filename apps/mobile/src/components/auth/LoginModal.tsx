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
import { signIn as login, SignInData as LoginData } from '../../services/authService';

interface LoginModalProps {
  isOpen: boolean;
  language?: string;
  onClose: () => void;
  onSignInSuccess?: (userData: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  language = 'en',
  onClose,
  onSignInSuccess,
}) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginChange =
    (field: 'email' | 'password') =>
    (value: string) => {
      setLoginForm(prev => ({ ...prev, [field]: value }));
      if (error) setError(null);
    };

  const handleClose = useCallback(() => {
    if (isLoading) return;
    setError(null);
    setLoginForm({ email: '', password: '' });
    onClose();
  }, [isLoading, onClose]);

  const handleSubmit = useCallback(async () => {
    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const trimmedEmail = loginForm.email.trim();
      const result = await login({
        email: trimmedEmail,
        password: loginForm.password,
      });

      if (!result.success) {
        setError(
          result.error ||
            getProperty('login.error.generic', language) ||
            'Login failed. Please try again.'
        );
        return;
      }

      if (onSignInSuccess) {
        onSignInSuccess(result.data as LoginData);
      }
    } catch (e) {
      setError(
        getProperty('login.error.generic', language) ||
          'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language, onSignInSuccess, loginForm.email]);

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
            {getProperty('login.title', language)}
          </Text>

          {error ? <Text style={modalStyles.errorText}>{error}</Text> : null}

          <View style={modalStyles.form}>
            <View style={modalStyles.field}>
              <Text style={modalStyles.label}>
                {getProperty('login.email.label', language)}
              </Text>
              <TextInput
                value={loginForm.email}
                onChangeText={handleLoginChange('email')}
                placeholder={getProperty('login.email.placeholder', language)}
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
                {getProperty('login.password.label', language)}
              </Text>
              <TextInput
                value={loginForm.password}
                onChangeText={handleLoginChange('password')}
                placeholder={getProperty(
                  'login.password.placeholder',
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
                {getProperty('login.button.cancel', language)}
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
                    {getProperty('login.button.submitting', language) ||
                      getProperty('login.button.submit', language)}
                  </Text>
                </View>
              ) : (
                <Text style={buttons.primaryButtonText}>
                  {getProperty('login.button.submit', language)}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default LoginModal;


