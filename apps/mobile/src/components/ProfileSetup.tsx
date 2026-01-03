import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  containerStyles,
  headerStyles,
  formStyles,
  buttons,
  profileSetupStyles,
  colors,
} from '../styles';

interface ProfileSetupProps {
  navigation?: any;
  onBack?: () => void;
  onComplete?: (data: { displayName: string; fullName?: string; dateOfBirth?: string }) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({
  navigation,
  onBack,
  onComplete,
}) => {
  const [displayName, setDisplayName] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleComplete = () => {
    if (displayName.trim()) {
      onComplete?.({
        displayName: displayName.trim(),
        fullName: fullName.trim() || undefined,
        dateOfBirth: dateOfBirth || undefined,
      });
      navigation?.navigate('Success');
    }
  };

  return (
    <View style={[containerStyles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={[containerStyles.scrollContentSmall, { paddingTop: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerNoBackground}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitleNoBackground}>Complete Profile</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Progress Bar */}
        <View style={formStyles.progressBar}>
          <View style={[formStyles.progressFill, { width: '100%' }]} />
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>Tell us about you</Text>
        <Text style={headerStyles.sectionSubtitle}>
          Create your profile (you can change this later)
        </Text>

        {/* Avatar Section */}
        <View style={profileSetupStyles.avatarSection}>
          <TouchableOpacity style={profileSetupStyles.avatarUpload}>
            <Text style={profileSetupStyles.avatarEmoji}>👤</Text>
            <View style={profileSetupStyles.cameraBadge}>
              <Text style={profileSetupStyles.cameraBadgeText}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={profileSetupStyles.avatarText}>Add profile photo</Text>
        </View>

        {/* Form */}
        <View style={formStyles.formGroup}>
          <Text style={formStyles.formLabel}>Display Name / Alias</Text>
          <TextInput
            style={formStyles.formInput}
            placeholder="Choose a display name"
            placeholderTextColor={colors.text.tertiary}
            value={displayName}
            onChangeText={setDisplayName}
          />
          <View style={profileSetupStyles.inputHint}>
            <Text style={profileSetupStyles.inputHintText}>✨ This name will be visible in community discussions</Text>
          </View>
        </View>

        <View style={profileSetupStyles.aliasNote}>
          <Text style={profileSetupStyles.aliasNoteTitle}>🔐 Privacy First</Text>
          <Text style={profileSetupStyles.aliasNoteText}>
            Your display name keeps your real identity private. You can always use a pseudonym in community areas while keeping your real name for clinical consultations.
          </Text>
        </View>

        <View style={formStyles.formGroup}>
          <Text style={formStyles.formLabel}>Full Name (Optional - For Clinical Use Only)</Text>
          <TextInput
            style={formStyles.formInput}
            placeholder="Enter your full name"
            placeholderTextColor={colors.text.tertiary}
            value={fullName}
            onChangeText={setFullName}
          />
          <View style={profileSetupStyles.inputHint}>
            <Text style={profileSetupStyles.inputHintText}>👩‍⚕️ Only used for doctor consultations</Text>
          </View>
        </View>

        <View style={formStyles.formGroup}>
          <Text style={formStyles.formLabel}>Date of Birth</Text>
          <TextInput
            style={formStyles.formInput}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.text.tertiary}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />
        </View>

        {/* Button */}
        <View style={profileSetupStyles.btnContainer}>
          <TouchableOpacity
            style={[buttons.buttonFullWidth, buttons.primaryButton, !displayName.trim() && buttons.disabledButton]}
            onPress={handleComplete}
            disabled={!displayName.trim()}
          >
            <Text style={buttons.primaryButtonText}>Complete Setup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSetup;

