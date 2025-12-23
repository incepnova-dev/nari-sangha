import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { getProperty } from '../languages';
import {
  landingContainer,
  landingContent,
  landingActions,
  modalStyles,
  buttons,
} from '../styles';

interface UnauthenticatedLandingProps {
  language?: string;
  onSignInSuccess?: (userData: any) => void;
}

const UnauthenticatedLanding: React.FC<UnauthenticatedLandingProps> = ({
  language = 'en',
  onSignInSuccess,
}) => {
  const message = getProperty('landing.welcome', language);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
   const [signInForm, setSignInForm] = useState({ email: '', password: '' });
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
  const isSigningInRef = useRef(false);

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSignInChange =
    (field: 'email' | 'password') =>
    (value: string) => {
      setSignInForm(prev => ({ ...prev, [field]: value }));
      if (error) {
        setError(null);
      }
    };

  const handleSignInSuccess = useCallback(
    (userData: any) => {
      // Prevent multiple calls
      if (isSigningInRef.current) return;
      isSigningInRef.current = true;

      // Call the callback to update parent state
      if (onSignInSuccess) {
        onSignInSuccess(userData);
      }

      // Close the modal after state update is processed
      setIsSignInModalOpen(false);

      // Reset the ref after a brief delay
      setTimeout(() => {
        isSigningInRef.current = false;
      }, 100);
    },
    [onSignInSuccess]
  );

  const handleSignInModalClose = useCallback(() => {
    if (isLoading) {
      return;
    }
    setError(null);
    setSignInForm({ email: '', password: '' });
    setIsSignInModalOpen(false);
  }, [isLoading]);

  const handleSignInSubmit = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // TODO: Wire this up to real mobile sign-in API when available
      const trimmedEmail = signInForm.email.trim();

      const userData = {
        user: {
          name: trimmedEmail || 'Test User',
          email: trimmedEmail || 'user@example.com',
        },
      };

      handleSignInSuccess(userData);
    } catch (e) {
      setError(
        getProperty('signin.error.generic', language) ||
          'Sign in failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [handleSignInSuccess, language, signInForm, isLoading]);

  return (
    <View style={landingContainer.container}>
      <View style={landingContent.contentContainer}>
        <Text style={landingContent.title}>{message}</Text>
        <Text style={landingContent.subtitle}>
          {getProperty('landing.subtitle', language)}
        </Text>
        <View style={landingActions.actionsContainer}>
          <Text style={landingActions.exploreText}>
            {getProperty('landing.explore', language)}
          </Text>
          <View style={landingActions.buttonsContainer}>
            <TouchableOpacity
              style={[buttons.button, buttons.secondaryButton, { marginRight: 12 }]}
              onPress={handleSignInClick}
            >
              <Text style={buttons.secondaryButtonText}>
                {getProperty('button.signin', language)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttons.button, buttons.primaryButton]}
              onPress={handleSignUpClick}
            >
              <Text style={buttons.primaryButtonText}>
                {getProperty('button.signup', language)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sign In Modal */}
      <Modal
        visible={isSignInModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handleSignInModalClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={modalStyles.modalOverlay}
        >
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>
              {getProperty('signin.title', language)}
            </Text>
            {error ? (
              <Text style={modalStyles.errorText}>{error}</Text>
            ) : null}
            <View style={modalStyles.form}>
              <View style={modalStyles.field}>
                <Text style={modalStyles.label}>
                  {getProperty('signin.email.label', language)}
                </Text>
                <TextInput
                  value={signInForm.email}
                  onChangeText={handleSignInChange('email')}
                  placeholder={getProperty(
                    'signin.email.placeholder',
                    language
                  )}
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
                onPress={handleSignInModalClose}
                disabled={isLoading}
              >
                <Text style={buttons.secondaryButtonText}>
                  {getProperty('signin.button.cancel', language)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[buttons.button, buttons.primaryButton]}
                onPress={handleSignInSubmit}
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

      {/* Sign Up Modal */}
      <Modal
        visible={isSignUpModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseSignUpModal}
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
                onPress={handleCloseSignUpModal}
              >
                <Text style={buttons.secondaryButtonText}>
                  {getProperty('signup.button.cancel', language) || 'Cancel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[buttons.button, buttons.primaryButton]}
                onPress={handleCloseSignUpModal}
              >
                <Text style={buttons.primaryButtonText}>
                  {getProperty('signup.button.submit', language) || 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default UnauthenticatedLanding;

