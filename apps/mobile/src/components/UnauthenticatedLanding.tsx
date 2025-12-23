import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getProperty } from '../languages';

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
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{message}</Text>
        <Text style={styles.subtitle}>
          {getProperty('landing.subtitle', language)}
        </Text>
        <View style={styles.actionsContainer}>
          <Text style={styles.exploreText}>
            {getProperty('landing.explore', language)}
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton, { marginRight: 12 }]}
              onPress={handleSignInClick}
            >
              <Text style={styles.secondaryButtonText}>
                {getProperty('button.signin', language)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleSignUpClick}
            >
              <Text style={styles.primaryButtonText}>
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
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {getProperty('signin.title', language)}
            </Text>
            <Text style={styles.modalPlaceholder}>
              Sign In functionality will be implemented here
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton, { marginRight: 12 }]}
                onPress={handleSignInModalClose}
              >
                <Text style={styles.secondaryButtonText}>
                  {getProperty('signin.button.cancel', language)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => {
                  // TODO: Implement actual sign in
                  handleSignInSuccess({ user: { name: 'Test User' } });
                }}
              >
                <Text style={styles.primaryButtonText}>
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
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {getProperty('signup.title', language) || 'Sign Up'}
            </Text>
            <Text style={styles.modalPlaceholder}>
              Sign Up functionality will be implemented here
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton, { marginRight: 12 }]}
                onPress={handleCloseSignUpModal}
              >
                <Text style={styles.secondaryButtonText}>
                  {getProperty('signup.button.cancel', language) || 'Cancel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleCloseSignUpModal}
              >
                <Text style={styles.primaryButtonText}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#030718', // Dark background similar to web
  },
  contentContainer: {
    maxWidth: 960,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 48, // 6rem equivalent for mobile
    fontWeight: '700',
    marginBottom: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18, // 1.1rem equivalent
    color: '#ffffff',
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 32,
  },
  exploreText: {
    fontSize: 18,
    color: '#ffffff',
    marginRight: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#9146ff',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 8, 40, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalPlaceholder: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default UnauthenticatedLanding;

