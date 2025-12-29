import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

interface RegionSelectionProps {
  navigation?: any;
  onBack?: () => void;
  onContinue?: (region: 'india' | 'global') => void;
}

const RegionSelection: React.FC<RegionSelectionProps> = ({
  navigation,
  onBack,
  onContinue,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'india' | 'global'>('india');

  const handleContinue = () => {
    onContinue?.(selectedRegion);
    if (selectedRegion === 'india') {
      navigation?.navigate('SignUpIndiaPhone');
    } else {
      navigation?.navigate('SignUpGlobalEmail');
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
          <Text style={styles.headerTitle}>Select Your Region</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Where are you from?</Text>
        <Text style={styles.sectionSubtitle}>
          We'll customize your experience based on your location
        </Text>

        {/* Region Cards */}
        <View style={styles.regionCards}>
          <TouchableOpacity
            style={[
              styles.regionCard,
              selectedRegion === 'india' && styles.regionCardSelected,
            ]}
            onPress={() => setSelectedRegion('india')}
          >
            <View style={styles.regionHeader}>
              <Text style={styles.regionFlag}>🇮🇳</Text>
              <View style={styles.regionInfo}>
                <Text style={styles.regionName}>India</Text>
                <Text style={styles.regionSubtext}>भारतीय उपयोगकर्ता</Text>
              </View>
            </View>
            <View style={styles.regionFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Phone number + OTP (Primary)</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Regional language support</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Aadhaar verification (optional)</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.regionCard,
              selectedRegion === 'global' && styles.regionCardSelected,
            ]}
            onPress={() => setSelectedRegion('global')}
          >
            <View style={styles.regionHeader}>
              <Text style={styles.regionFlag}>🌍</Text>
              <View style={styles.regionInfo}>
                <Text style={styles.regionName}>Global</Text>
                <Text style={styles.regionSubtext}>International users</Text>
              </View>
            </View>
            <View style={styles.regionFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Email or phone signup</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Multi-language support</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>International standards</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleContinue}>
            <Text style={styles.btnText}>Continue</Text>
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
  regionCards: {
    gap: 16,
  },
  regionCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  regionCardSelected: {
    borderColor: '#E91E63',
    backgroundColor: '#FFF5F7',
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  regionFlag: {
    fontSize: 40,
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  regionSubtext: {
    fontSize: 14,
    color: '#666',
  },
  regionFeatures: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  featureIcon: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    color: '#555',
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
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});

export default RegionSelection;

