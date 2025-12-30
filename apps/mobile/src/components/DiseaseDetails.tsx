import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';

interface DiseaseDetailsProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
  diseaseId?: string;
  diseaseName?: string;
  diseaseCategory?: string;
  diseaseDescription?: string;
  diseaseSymptoms?: string[];
  diseasePrevalence?: string;
}

const DiseaseDetails: React.FC<DiseaseDetailsProps> = ({
  navigation,
  user,
  onBack,
  diseaseId,
  diseaseName = 'Polycystic Ovary Syndrome (PCOS)',
  diseaseCategory = 'Hormonal Disorders',
  diseaseDescription = 'A hormonal disorder causing enlarged ovaries with small cysts. Affects 1 in 10 women of childbearing age.',
  diseaseSymptoms = ['Irregular periods', 'Excess hair growth', 'Weight gain', 'Acne'],
  diseasePrevalence = 'Common',
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  // Convert simple symptoms array to detailed format if needed
  const getDetailedSymptoms = () => {
    // If symptoms are already in detailed format, use them
    if (diseaseSymptoms && diseaseSymptoms.length > 0 && typeof diseaseSymptoms[0] === 'object') {
      return diseaseSymptoms as Array<{ title: string; description: string; icon: string }>;
    }
    
    // Default detailed symptoms based on disease name (PCOS example)
    const defaultSymptoms = [
      {
        title: 'Irregular Periods',
        description: 'Infrequent, irregular, or prolonged menstrual cycles',
        icon: '📅',
      },
      {
        title: 'Excess Hair Growth',
        description: 'Hirsutism - excess facial and body hair',
        icon: '💇',
      },
      {
        title: 'Weight Gain',
        description: 'Difficulty losing weight or unexplained weight gain',
        icon: '🎯',
      },
      {
        title: 'Acne & Oily Skin',
        description: 'Severe acne or excessively oily skin',
        icon: '🌟',
      },
      {
        title: 'Dark Skin Patches',
        description: 'Darkening of skin in body creases (neck, armpits)',
        icon: '🌓',
      },
    ];
    
    // If simple string array provided, map to default structure
    if (diseaseSymptoms && diseaseSymptoms.length > 0 && typeof diseaseSymptoms[0] === 'string') {
      return diseaseSymptoms.slice(0, 5).map((symptom, index) => ({
        title: symptom,
        description: defaultSymptoms[index]?.description || 'Common symptom of this condition',
        icon: defaultSymptoms[index]?.icon || '⚠️',
      }));
    }
    
    return defaultSymptoms;
  };

  // Sample data - in a real app, this would come from props or API
  const diseaseData = {
    id: diseaseId || '1',
    name: diseaseName,
    category: diseaseCategory,
    description: diseaseDescription,
    symptoms: getDetailedSymptoms(),
    prevalence: diseasePrevalence,
    // Root Causes from HTML inspiration
    rootCauses: [
      {
        title: 'Insulin Resistance',
        description: 'Excess insulin may increase androgen production',
        icon: '⚖️',
      },
      {
        title: 'Genetic Factors',
        description: 'Family history increases likelihood of PCOS',
        icon: '🧬',
      },
      {
        title: 'Hormonal Imbalance',
        description: 'Excess androgens (male hormones) in women',
        icon: '🔬',
      },
      {
        title: 'Low-grade Inflammation',
        description: 'Chronic inflammation may trigger insulin resistance',
        icon: '🔥',
      },
    ],
    // Prevention and Management from HTML inspiration
    prevention: [
      {
        title: 'Healthy Diet',
        description: 'Low-GI foods, whole grains, lean proteins, fruits & vegetables',
        icon: '🥗',
      },
      {
        title: 'Regular Exercise',
        description: '150 minutes/week of moderate activity improves insulin sensitivity',
        icon: '🏃‍♀️',
      },
      {
        title: 'Weight Management',
        description: 'Even 5-10% weight loss can significantly improve symptoms',
        icon: '⚖️',
      },
      {
        title: 'Medical Treatment',
        description: 'Birth control pills, metformin, or fertility medications as prescribed',
        icon: '💊',
      },
      {
        title: 'Stress Management',
        description: 'Yoga, meditation, adequate sleep to reduce cortisol levels',
        icon: '😌',
      },
    ],
    // Keep other sections from existing component
    diagnosis: [
      'Physical examination',
      'Blood tests (hormone levels)',
      'Ultrasound (ovary imaging)',
      'Medical history review',
    ],
    treatment: [
      'Lifestyle changes (diet and exercise)',
      'Hormonal birth control',
      'Metformin (for insulin resistance)',
      'Fertility medications (if trying to conceive)',
    ],
    whenToSeeDoctor: [
      'Irregular or missed periods',
      'Difficulty losing weight',
      'Excessive hair growth',
      'Trouble conceiving',
    ],
  };

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    }
  };

  const renderList = (items: string[], icon: string) => (
    <View style={styles.listContainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.listIcon}>{icon}</Text>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

          <WelcomeHeader
            userName={userName}
            navigation={navigation}
            user={user}
            onSignOut={onSignOut}
            onProfilePress={() => {
              navigation?.navigate('Profile');
            }}
          />

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
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle} numberOfLines={2}>{diseaseData.name}</Text>
            <Text style={styles.headerSubtitle}>{diseaseData.category}</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Overview Section - from HTML with gradient banner */}
          <View style={styles.overviewBanner}>
            <Text style={styles.overviewIcon}>🩺</Text>
            <Text style={styles.overviewTitle}>{diseaseData.name}</Text>
            <Text style={styles.overviewDescription}>{diseaseData.description}</Text>
          </View>

          {/* Common Symptoms Section - from HTML */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔍 Common Symptoms</Text>
            </View>
            <View style={styles.symptomsList}>
              {diseaseData.symptoms.map((symptom, index) => (
                <View key={index} style={styles.symptomItem}>
                  <View style={styles.symptomIconContainer}>
                    <Text style={styles.symptomIcon}>{symptom.icon}</Text>
                  </View>
                  <View style={styles.symptomContent}>
                    <Text style={styles.symptomTitle}>{symptom.title}</Text>
                    <Text style={styles.symptomDescription}>{symptom.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Root Causes Section - from HTML */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitleOrange}>⚡ Root Causes</Text>
            </View>
            <View style={styles.causesList}>
              {diseaseData.rootCauses.map((cause, index) => (
                <View key={index} style={styles.causeItem}>
                  <View style={styles.causeIconContainer}>
                    <Text style={styles.causeIcon}>{cause.icon}</Text>
                  </View>
                  <View style={styles.causeContent}>
                    <Text style={styles.causeTitle}>{cause.title}</Text>
                    <Text style={styles.causeDescription}>{cause.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Diagnosis Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diagnosis</Text>
            {renderList(diseaseData.diagnosis, '✓')}
          </View>

          {/* Prevention & Management Section - from HTML */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitleGreen}>✅ Prevention & Management</Text>
            </View>
            <View style={styles.preventionList}>
              {diseaseData.prevention.map((item, index) => (
                <View key={index} style={styles.preventionItem}>
                  <View style={styles.preventionIconContainer}>
                    <Text style={styles.preventionIcon}>{item.icon}</Text>
                  </View>
                  <View style={styles.preventionContent}>
                    <Text style={styles.preventionTitle}>{item.title}</Text>
                    <Text style={styles.preventionDescription}>{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* When to See Doctor Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>When to See a Doctor</Text>
            {renderList(diseaseData.whenToSeeDoctor, '⚠️')}
          </View>

          {/* Important Note */}
          <View style={styles.noteSection}>
            <Text style={styles.noteIcon}>ℹ️</Text>
            <Text style={styles.noteText}>
              This information is for educational purposes only and is not a substitute for professional medical advice. 
              Please consult with a healthcare provider for proper diagnosis and treatment.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.findDoctorBtn}
              activeOpacity={0.8}
              onPress={() => {
                navigation?.navigate('DoctorListing');
              }}
            >
              <Text style={styles.findDoctorBtnText}>Find a Doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.findClinicBtn}
              activeOpacity={0.8}
              onPress={() => {
                navigation?.navigate('ClinicListing');
              }}
            >
              <Text style={styles.findClinicBtnText}>Find a Clinic</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="discover"
        onNavigate={handleNavigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E91E63',
    padding: 20,
    paddingTop: 20,
    marginBottom: 0,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: 'white',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  headerSpacer: {
    width: 35,
  },
  content: {
    padding: 20,
  },
  // Overview Banner - from HTML
  overviewBanner: {
    backgroundColor: '#E91E63',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  overviewIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  overviewTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    marginBottom: 12,
  },
  overviewDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E91E63',
  },
  sectionTitleOrange: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF9800',
  },
  sectionTitleGreen: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  prevalenceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  prevalenceText: {
    fontSize: 13,
    color: '#FF9800',
    fontWeight: '600',
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  listIcon: {
    fontSize: 16,
    color: '#E91E63',
    marginTop: 2,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  // Symptoms List - from HTML
  symptomsList: {
    gap: 12,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  symptomIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  symptomIcon: {
    fontSize: 16,
  },
  symptomContent: {
    flex: 1,
  },
  symptomTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  symptomDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  // Root Causes - from HTML
  causesList: {
    gap: 12,
  },
  causeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  causeIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  causeIcon: {
    fontSize: 16,
  },
  causeContent: {
    flex: 1,
  },
  causeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  causeDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  // Prevention & Management - from HTML
  preventionList: {
    gap: 12,
  },
  preventionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  preventionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  preventionIcon: {
    fontSize: 16,
  },
  preventionContent: {
    flex: 1,
  },
  preventionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  preventionDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  noteSection: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  noteIcon: {
    fontSize: 24,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  findDoctorBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  findDoctorBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  findClinicBtn: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E91E63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  findClinicBtnText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DiseaseDetails;

