import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
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
    setIsSignInModalOpen(false);
  }, []);

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
            <Text style={modalStyles.modalPlaceholder}>
              Sign In functionality will be implemented here
            </Text>
            <View style={modalStyles.modalButtons}>
              <TouchableOpacity
                style={[buttons.button, buttons.secondaryButton, { marginRight: 12 }]}
                onPress={handleSignInModalClose}
              >
                <Text style={buttons.secondaryButtonText}>
                  {getProperty('signin.button.cancel', language)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[buttons.button, buttons.primaryButton]}
                onPress={() => {
                  // TODO: Implement actual sign in
                  handleSignInSuccess({ user: { name: 'Test User' } });
                }}
              >
                <Text style={buttons.primaryButtonText}>
                  {getProperty('signin.button.submit', language)}
                </Text>
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

