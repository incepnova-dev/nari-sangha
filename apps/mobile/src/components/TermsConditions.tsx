import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  containerStyles,
  headerStyles,
  buttons,
  termsConditionsStyles,
  colors,
} from '../styles';

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
      style={[termsConditionsStyles.checkbox, checked && termsConditionsStyles.checkboxChecked]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      {checked && <Text style={termsConditionsStyles.checkboxCheckmark}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={[containerStyles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Header */}
      <View style={termsConditionsStyles.topHeader}>
        <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
          <Text style={headerStyles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={headerStyles.headerTitleNoBackground}>Terms & Privacy</Text>
        <View style={headerStyles.headerSpacer} />
      </View>

      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={containerStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Terms Icon */}
        <View style={termsConditionsStyles.termsIcon}>
          <Text style={termsConditionsStyles.termsIconText}>📋</Text>
        </View>

        {/* Title */}
        <Text style={termsConditionsStyles.termsTitle}>Terms of Service</Text>
        <Text style={termsConditionsStyles.termsSubtitle}>
          Please review and accept our terms to continue
        </Text>

        {/* Terms Content */}
        <View style={termsConditionsStyles.termsContent}>
          <View style={termsConditionsStyles.termsSection}>
            <Text style={termsConditionsStyles.termsSectionTitle}>🔒 Privacy & Data Protection</Text>
            <Text style={termsConditionsStyles.termsSectionText}>
              Your health data is encrypted and securely stored. We never share your personal information without explicit consent.
            </Text>
            <View style={termsConditionsStyles.termsList}>
              <Text style={termsConditionsStyles.termsListItem}>• End-to-end encryption for all communications</Text>
              <Text style={termsConditionsStyles.termsListItem}>• Anonymous browsing in community forums</Text>
              <Text style={termsConditionsStyles.termsListItem}>• Complete control over data sharing</Text>
              <Text style={termsConditionsStyles.termsListItem}>• HIPAA compliant data storage</Text>
            </View>
          </View>

          <View style={termsConditionsStyles.termsSection}>
            <Text style={termsConditionsStyles.termsSectionTitle}>💬 Community Guidelines</Text>
            <Text style={termsConditionsStyles.termsSectionText}>
              Maintain a respectful, supportive environment for all members:
            </Text>
            <View style={termsConditionsStyles.termsList}>
              <Text style={termsConditionsStyles.termsListItem}>• No harassment or discrimination</Text>
              <Text style={termsConditionsStyles.termsListItem}>• Respect privacy and confidentiality</Text>
              <Text style={termsConditionsStyles.termsListItem}>• Share experiences, not medical advice</Text>
              <Text style={termsConditionsStyles.termsListItem}>• Report inappropriate content</Text>
            </View>
          </View>

          <View style={termsConditionsStyles.termsSection}>
            <Text style={termsConditionsStyles.termsSectionTitle}>⚕️ Medical Disclaimer</Text>
            <Text style={termsConditionsStyles.termsSectionText}>
              This app provides health information and connects you with medical professionals, but does not replace professional medical advice, diagnosis, or treatment.
            </Text>
          </View>

          <View style={termsConditionsStyles.termsSection}>
            <Text style={termsConditionsStyles.termsSectionTitle}>🔔 Notifications & Alerts</Text>
            <Text style={termsConditionsStyles.termsSectionText}>
              We'll send you important health reminders, vaccination alerts, and screening notifications. You can customize these in settings.
            </Text>
          </View>
        </View>

        {/* Acceptance Cards */}
        <View style={termsConditionsStyles.acceptanceCards}>
          <TouchableOpacity
            style={[termsConditionsStyles.acceptanceCard, termsAccepted && termsConditionsStyles.acceptanceCardActive]}
            onPress={() => setTermsAccepted(!termsAccepted)}
            activeOpacity={0.8}
          >
            <View style={termsConditionsStyles.acceptanceHeader}>
              <Checkbox checked={termsAccepted} onToggle={() => setTermsAccepted(!termsAccepted)} />
              <View style={termsConditionsStyles.acceptanceContent}>
                <Text style={termsConditionsStyles.acceptanceTitle}>I accept the Terms of Service</Text>
                <Text style={termsConditionsStyles.acceptanceText}>
                  I have read and agree to the <Text style={termsConditionsStyles.acceptanceLink}>Terms of Service</Text> and understand the guidelines for using this platform.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[termsConditionsStyles.acceptanceCard, privacyAccepted && termsConditionsStyles.acceptanceCardActive]}
            onPress={() => setPrivacyAccepted(!privacyAccepted)}
            activeOpacity={0.8}
          >
            <View style={termsConditionsStyles.acceptanceHeader}>
              <Checkbox checked={privacyAccepted} onToggle={() => setPrivacyAccepted(!privacyAccepted)} />
              <View style={termsConditionsStyles.acceptanceContent}>
                <Text style={termsConditionsStyles.acceptanceTitle}>I accept the Privacy Policy</Text>
                <Text style={termsConditionsStyles.acceptanceText}>
                  I consent to the collection and processing of my health data as described in the <Text style={termsConditionsStyles.acceptanceLink}>Privacy Policy</Text> and understand my data rights.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[termsConditionsStyles.acceptanceCard, marketingAccepted && termsConditionsStyles.acceptanceCardActive]}
            onPress={() => setMarketingAccepted(!marketingAccepted)}
            activeOpacity={0.8}
          >
            <View style={termsConditionsStyles.acceptanceHeader}>
              <Checkbox checked={marketingAccepted} onToggle={() => setMarketingAccepted(!marketingAccepted)} />
              <View style={termsConditionsStyles.acceptanceContent}>
                <Text style={termsConditionsStyles.acceptanceTitle}>Send me health tips & updates (Optional)</Text>
                <Text style={termsConditionsStyles.acceptanceText}>
                  Receive personalized health tips, wellness articles, and community updates via email.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Button Container */}
      <View style={termsConditionsStyles.buttonContainer}>
        <TouchableOpacity
          style={[
            buttons.buttonFullWidth,
            buttons.primaryButton,
            (!termsAccepted || !privacyAccepted) && buttons.disabledButton,
          ]}
          onPress={handleAccept}
          disabled={!termsAccepted || !privacyAccepted}
          activeOpacity={0.8}
        >
          <Text style={buttons.primaryButtonText}>Accept & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsConditions;

