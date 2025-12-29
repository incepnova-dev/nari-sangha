import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

interface TermsConditionsProps {
  navigation?: any;
  onBack?: () => void;
  onAccept?: (data: {
    termsAccepted: boolean;
    privacyAccepted: boolean;
    marketingAccepted: boolean;
  }) => void;
}

const TermsConditions: React.FC<TermsConditionsProps> = ({
  navigation,
  onBack,
  onAccept,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const handleAccept = () => {
    if (termsAccepted && privacyAccepted) {
      onAccept?.({
        termsAccepted,
        privacyAccepted,
        marketingAccepted,
      });
      navigation?.navigate('Success');
    }
  };

  const Checkbox = ({ checked, onToggle }: { checked: boolean; onToggle: () => void }) => (
    <TouchableOpacity
      style={[styles.checkbox, checked && styles.checkboxChecked]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      {checked && <Text style={styles.checkboxCheckmark}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack || (() => navigation?.goBack())}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Privacy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Terms Icon */}
        <View style={styles.termsIcon}>
          <Text style={styles.termsIconText}>📋</Text>
        </View>

        {/* Title */}
        <Text style={styles.termsTitle}>Terms of Service</Text>
        <Text style={styles.termsSubtitle}>
          Please review and accept our terms to continue
        </Text>

        {/* Terms Content */}
        <View style={styles.termsContent}>
          <View style={styles.termsSection}>
            <Text style={styles.termsSectionTitle}>🔒 Privacy & Data Protection</Text>
            <Text style={styles.termsSectionText}>
              Your health data is encrypted and securely stored. We never share your personal information without explicit consent.
            </Text>
            <View style={styles.termsList}>
              <Text style={styles.termsListItem}>• End-to-end encryption for all communications</Text>
              <Text style={styles.termsListItem}>• Anonymous browsing in community forums</Text>
              <Text style={styles.termsListItem}>• Complete control over data sharing</Text>
              <Text style={styles.termsListItem}>• HIPAA compliant data storage</Text>
            </View>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termsSectionTitle}>💬 Community Guidelines</Text>
            <Text style={styles.termsSectionText}>
              Maintain a respectful, supportive environment for all members:
            </Text>
            <View style={styles.termsList}>
              <Text style={styles.termsListItem}>• No harassment or discrimination</Text>
              <Text style={styles.termsListItem}>• Respect privacy and confidentiality</Text>
              <Text style={styles.termsListItem}>• Share experiences, not medical advice</Text>
              <Text style={styles.termsListItem}>• Report inappropriate content</Text>
            </View>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termsSectionTitle}>⚕️ Medical Disclaimer</Text>
            <Text style={styles.termsSectionText}>
              This app provides health information and connects you with medical professionals, but does not replace professional medical advice, diagnosis, or treatment.
            </Text>
          </View>

          <View style={styles.termsSection}>
            <Text style={styles.termsSectionTitle}>🔔 Notifications & Alerts</Text>
            <Text style={styles.termsSectionText}>
              We'll send you important health reminders, vaccination alerts, and screening notifications. You can customize these in settings.
            </Text>
          </View>
        </View>

        {/* Acceptance Cards */}
        <View style={styles.acceptanceCards}>
          <TouchableOpacity
            style={[styles.acceptanceCard, termsAccepted && styles.acceptanceCardActive]}
            onPress={() => setTermsAccepted(!termsAccepted)}
            activeOpacity={0.8}
          >
            <View style={styles.acceptanceHeader}>
              <Checkbox checked={termsAccepted} onToggle={() => setTermsAccepted(!termsAccepted)} />
              <View style={styles.acceptanceContent}>
                <Text style={styles.acceptanceTitle}>I accept the Terms of Service</Text>
                <Text style={styles.acceptanceText}>
                  I have read and agree to the <Text style={styles.acceptanceLink}>Terms of Service</Text> and understand the guidelines for using this platform.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.acceptanceCard, privacyAccepted && styles.acceptanceCardActive]}
            onPress={() => setPrivacyAccepted(!privacyAccepted)}
            activeOpacity={0.8}
          >
            <View style={styles.acceptanceHeader}>
              <Checkbox checked={privacyAccepted} onToggle={() => setPrivacyAccepted(!privacyAccepted)} />
              <View style={styles.acceptanceContent}>
                <Text style={styles.acceptanceTitle}>I accept the Privacy Policy</Text>
                <Text style={styles.acceptanceText}>
                  I consent to the collection and processing of my health data as described in the <Text style={styles.acceptanceLink}>Privacy Policy</Text> and understand my data rights.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.acceptanceCard, marketingAccepted && styles.acceptanceCardActive]}
            onPress={() => setMarketingAccepted(!marketingAccepted)}
            activeOpacity={0.8}
          >
            <View style={styles.acceptanceHeader}>
              <Checkbox checked={marketingAccepted} onToggle={() => setMarketingAccepted(!marketingAccepted)} />
              <View style={styles.acceptanceContent}>
                <Text style={styles.acceptanceTitle}>Send me health tips & updates (Optional)</Text>
                <Text style={styles.acceptanceText}>
                  Receive personalized health tips, wellness articles, and community updates via email.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.btn,
            styles.btnPrimary,
            (!termsAccepted || !privacyAccepted) && styles.btnDisabled,
          ]}
          onPress={handleAccept}
          disabled={!termsAccepted || !privacyAccepted}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Accept & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 182, 193, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  termsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    alignSelf: 'center',
  },
  termsIconText: {
    fontSize: 40,
  },
  termsTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  termsSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  termsContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  termsSection: {
    marginBottom: 24,
  },
  termsSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 12,
  },
  termsSectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 24,
    marginBottom: 12,
  },
  termsList: {
    marginTop: 8,
  },
  termsListItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 24,
    marginBottom: 8,
  },
  acceptanceCards: {
    gap: 16,
    marginTop: 24,
  },
  acceptanceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  acceptanceCardActive: {
    borderColor: '#E91E63',
    backgroundColor: '#FFF5F7',
  },
  acceptanceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  acceptanceContent: {
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#E91E63',
  },
  checkboxCheckmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  acceptanceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  acceptanceText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  acceptanceLink: {
    color: '#E91E63',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  btn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#E91E63',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});

export default TermsConditions;

