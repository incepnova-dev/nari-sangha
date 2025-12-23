import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getProperty } from '../languages';
import {
  landingContainer,
  landingContent,
  landingActions,
  buttons,
} from '../styles';
import SignInModal from './auth/SignInModal';
import SignUpModal from './auth/SignUpModal';

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

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={handleSignInModalClose}
        language={language}
        onSignInSuccess={handleSignInSuccess}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleCloseSignUpModal}
        language={language}
      />
    </View>
  );
};

export default UnauthenticatedLanding;

