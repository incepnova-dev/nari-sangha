import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';

interface Disease {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  symptoms: string[];
  prevalence: string;
}

interface DiseaseListingProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
}

const DiseaseListing: React.FC<DiseaseListingProps> = ({
  navigation,
  user,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');

  const diseases: Disease[] = [
    {
      id: '1',
      name: 'Polycystic Ovary Syndrome (PCOS)',
      icon: '🩺',
      category: 'Hormonal Disorders',
      description: 'A hormonal disorder causing enlarged ovaries with small cysts. Affects 1 in 10 women of childbearing age.',
      symptoms: ['Irregular periods', 'Excess hair growth', 'Weight gain', 'Acne'],
      prevalence: 'Common',
    },
    {
      id: '2',
      name: 'Endometriosis',
      icon: '🎀',
      category: 'Reproductive Health',
      description: 'Tissue similar to uterine lining grows outside the uterus, causing pain and fertility issues.',
      symptoms: ['Pelvic pain', 'Painful periods', 'Heavy bleeding', 'Infertility'],
      prevalence: 'Moderate',
    },
    {
      id: '3',
      name: 'Breast Cancer',
      icon: '💗',
      category: 'Oncology',
      description: 'Cancer that forms in breast cells. Early detection through regular screening significantly improves outcomes.',
      symptoms: ['Breast lump', 'Nipple discharge', 'Skin changes', 'Breast pain'],
      prevalence: 'Common',
    },
    {
      id: '4',
      name: 'Osteoporosis',
      icon: '🦴',
      category: 'Bone Health',
      description: 'A condition where bones become weak and brittle, more common in postmenopausal women.',
      symptoms: ['Bone fractures', 'Loss of height', 'Back pain', 'Stooped posture'],
      prevalence: 'Common',
    },
  ];

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disease.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disease.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else {
      console.log('Navigate to:', screen);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <WelcomeHeader
        userName={userName}
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
            <Text style={styles.headerTitle}>Diseases & Conditions</Text>
            <Text style={styles.headerSubtitle}>Health information and resources</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search diseases, conditions, or symptoms..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Disease Cards */}
        <View style={styles.diseasesContainer}>
          {filteredDiseases.map((disease) => (
            <TouchableOpacity key={disease.id} style={styles.diseaseCard} activeOpacity={0.8}>
              <View style={styles.diseaseHeader}>
                <View style={styles.diseaseIcon}>
                  <Text style={styles.diseaseIconText}>{disease.icon}</Text>
                </View>
                <View style={styles.diseaseInfo}>
                  <Text style={styles.diseaseName}>{disease.name}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{disease.category}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.description}>{disease.description}</Text>
              <View style={styles.prevalenceBadge}>
                <Text style={styles.prevalenceText}>📊 {disease.prevalence}</Text>
              </View>
              <View style={styles.symptomsSection}>
                <Text style={styles.symptomsTitle}>Common Symptoms:</Text>
                <View style={styles.symptomsList}>
                  {disease.symptoms.map((symptom, index) => (
                    <View key={index} style={styles.symptomTag}>
                      <Text style={styles.symptomText}>• {symptom}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.learnMoreBtn}
                activeOpacity={0.8}
                onPress={() => {
                  navigation?.navigate('DiseaseDetails', {
                    diseaseId: disease.id,
                    diseaseName: disease.name,
                    diseaseCategory: disease.category,
                    diseaseDescription: disease.description,
                    diseaseSymptoms: disease.symptoms,
                    diseasePrevalence: disease.prevalence,
                  });
                }}
              >
                <Text style={styles.learnMoreBtnText}>Learn More</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
    fontSize: 22,
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
  searchBar: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  diseasesContainer: {
    padding: 20,
    gap: 15,
  },
  diseaseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  diseaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  diseaseIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FCE4EC',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diseaseIconText: {
    fontSize: 30,
  },
  diseaseInfo: {
    flex: 1,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    color: '#1976D2',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  prevalenceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
  prevalenceText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
  },
  symptomsSection: {
    marginBottom: 15,
  },
  symptomsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  symptomsList: {
    gap: 6,
  },
  symptomTag: {
    backgroundColor: '#FFF5F7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  symptomText: {
    fontSize: 13,
    color: '#555',
  },
  learnMoreBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnMoreBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DiseaseListing;

