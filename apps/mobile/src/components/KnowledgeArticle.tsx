import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import {
  containerStyles,
  headerStyles,
  knowledgeArticleStyles,
} from '../styles';

interface KnowledgeArticleProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
  diseaseId?: string;
  diseaseName?: string;
  diseaseCategory?: string;
  diseaseDescription?: string;
  diseaseSymptoms?: string[];
  diseasePrevalence?: string;
}

const KnowledgeArticle: React.FC<KnowledgeArticleProps> = ({
  navigation,
  user,
  onSignOut,
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
    <View style={knowledgeArticleStyles.listContainer}>
      {items.map((item, index) => (
        <View key={index} style={knowledgeArticleStyles.listItem}>
          <Text style={knowledgeArticleStyles.listIcon}>{icon}</Text>
          <Text style={knowledgeArticleStyles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={containerStyles.container}>
      <StatusBar barStyle="light-content" />

          <WelcomeHeader
            userName={userName}
            navigation={navigation}
            user={user}
            {...(onSignOut ? { onSignOut } : {})}
            onProfilePress={() => {
              navigation?.navigate('Profile');
            }}
          />

      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={containerStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerWithBackground}>
          <TouchableOpacity style={headerStyles.backButtonOnPrimary} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonTextWhite}>←</Text>
          </TouchableOpacity>
          <View style={headerStyles.headerContent}>
            <Text style={[headerStyles.headerTitleWhite, { fontSize: 20 }]} numberOfLines={2}>{diseaseData.name}</Text>
            <Text style={headerStyles.headerSubtitle}>{diseaseData.category}</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Content */}
        <View style={knowledgeArticleStyles.content}>
          {/* Overview Section - from HTML with gradient banner */}
          <View style={knowledgeArticleStyles.overviewBanner}>
            <Text style={knowledgeArticleStyles.overviewIcon}>🩺</Text>
            <Text style={knowledgeArticleStyles.overviewTitle}>{diseaseData.name}</Text>
            <Text style={knowledgeArticleStyles.overviewDescription}>{diseaseData.description}</Text>
          </View>

          {/* Common Symptoms Section - from HTML */}
          <View style={knowledgeArticleStyles.section}>
            <View style={knowledgeArticleStyles.sectionHeader}>
              <Text style={knowledgeArticleStyles.sectionTitle}>🔍 Common Symptoms</Text>
            </View>
            <View style={knowledgeArticleStyles.symptomsList}>
              {diseaseData.symptoms.map((symptom, index) => (
                <View key={index} style={knowledgeArticleStyles.symptomItem}>
                  <View style={knowledgeArticleStyles.symptomIconContainer}>
                    <Text style={knowledgeArticleStyles.symptomIcon}>{symptom.icon}</Text>
                  </View>
                  <View style={knowledgeArticleStyles.symptomContent}>
                    <Text style={knowledgeArticleStyles.symptomTitle}>{symptom.title}</Text>
                    <Text style={knowledgeArticleStyles.symptomDescription}>{symptom.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Root Causes Section - from HTML */}
          <View style={knowledgeArticleStyles.section}>
            <View style={knowledgeArticleStyles.sectionHeader}>
              <Text style={knowledgeArticleStyles.sectionTitleOrange}>⚡ Root Causes</Text>
            </View>
            <View style={knowledgeArticleStyles.causesList}>
              {diseaseData.rootCauses.map((cause, index) => (
                <View key={index} style={knowledgeArticleStyles.causeItem}>
                  <View style={knowledgeArticleStyles.causeIconContainer}>
                    <Text style={knowledgeArticleStyles.causeIcon}>{cause.icon}</Text>
                  </View>
                  <View style={knowledgeArticleStyles.causeContent}>
                    <Text style={knowledgeArticleStyles.causeTitle}>{cause.title}</Text>
                    <Text style={knowledgeArticleStyles.causeDescription}>{cause.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Diagnosis Section */}
          <View style={knowledgeArticleStyles.section}>
            <Text style={knowledgeArticleStyles.sectionTitle}>Diagnosis</Text>
            {renderList(diseaseData.diagnosis, '✓')}
          </View>

          {/* Prevention & Management Section - from HTML */}
          <View style={knowledgeArticleStyles.section}>
            <View style={knowledgeArticleStyles.sectionHeader}>
              <Text style={knowledgeArticleStyles.sectionTitleGreen}>✅ Prevention & Management</Text>
            </View>
            <View style={knowledgeArticleStyles.preventionList}>
              {diseaseData.prevention.map((item, index) => (
                <View key={index} style={knowledgeArticleStyles.preventionItem}>
                  <View style={knowledgeArticleStyles.preventionIconContainer}>
                    <Text style={knowledgeArticleStyles.preventionIcon}>{item.icon}</Text>
                  </View>
                  <View style={knowledgeArticleStyles.preventionContent}>
                    <Text style={knowledgeArticleStyles.preventionTitle}>{item.title}</Text>
                    <Text style={knowledgeArticleStyles.preventionDescription}>{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* When to See Doctor Section */}
          <View style={knowledgeArticleStyles.section}>
            <Text style={knowledgeArticleStyles.sectionTitle}>When to See a Doctor</Text>
            {renderList(diseaseData.whenToSeeDoctor, '⚠️')}
          </View>

          {/* Important Note */}
          <View style={knowledgeArticleStyles.noteSection}>
            <Text style={knowledgeArticleStyles.noteIcon}>ℹ️</Text>
            <Text style={knowledgeArticleStyles.noteText}>
              This information is for educational purposes only and is not a substitute for professional medical advice. 
              Please consult with a healthcare provider for proper diagnosis and treatment.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={knowledgeArticleStyles.actionButtons}>
            <TouchableOpacity
              style={knowledgeArticleStyles.findDoctorBtn}
              activeOpacity={0.8}
              onPress={() => {
                navigation?.navigate('DoctorListing');
              }}
            >
              <Text style={knowledgeArticleStyles.findDoctorBtnText}>Find a Doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={knowledgeArticleStyles.findClinicBtn}
              activeOpacity={0.8}
              onPress={() => {
                navigation?.navigate('ClinicListing');
              }}
            >
              <Text style={knowledgeArticleStyles.findClinicBtnText}>Find a Clinic</Text>
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

export default KnowledgeArticle;

