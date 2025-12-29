import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complete Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Tell us about you</Text>
        <Text style={styles.sectionSubtitle}>
          Create your profile (you can change this later)
        </Text>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarUpload}>
            <Text style={styles.avatarEmoji}>👤</Text>
            <View style={styles.cameraBadge}>
              <Text style={styles.cameraBadgeText}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarText}>Add profile photo</Text>
        </View>

        {/* Form */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Display Name / Alias</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Choose a display name"
            placeholderTextColor="#999"
            value={displayName}
            onChangeText={setDisplayName}
          />
          <View style={styles.inputHint}>
            <Text style={styles.inputHintText}>✨ This name will be visible in community discussions</Text>
          </View>
        </View>

        <View style={styles.aliasNote}>
          <Text style={styles.aliasNoteTitle}>🔐 Privacy First</Text>
          <Text style={styles.aliasNoteText}>
            Your display name keeps your real identity private. You can always use a pseudonym in community areas while keeping your real name for clinical consultations.
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Full Name (Optional - For Clinical Use Only)</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
          />
          <View style={styles.inputHint}>
            <Text style={styles.inputHintText}>👩‍⚕️ Only used for doctor consultations</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Date of Birth</Text>
          <TextInput
            style={styles.formInput}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />
        </View>

        {/* Button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary, !displayName.trim() && styles.btnDisabled]}
            onPress={handleComplete}
            disabled={!displayName.trim()}
          >
            <Text style={styles.btnText}>Complete Setup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
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
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E91E63',
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarUpload: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF5F7',
    borderWidth: 4,
    borderColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatarEmoji: {
    fontSize: 60,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    backgroundColor: '#E91E63',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  cameraBadgeText: {
    fontSize: 18,
  },
  avatarText: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'white',
    color: '#333',
  },
  inputHint: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputHintText: {
    fontSize: 13,
    color: '#666',
  },
  aliasNote: {
    backgroundColor: '#FFF5F7',
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 24,
  },
  aliasNoteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 8,
  },
  aliasNoteText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  btnContainer: {
    marginTop: 20,
    paddingTop: 20,
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

export default ProfileSetup;

