import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import {
  containerStyles,
  headerStyles,
  knowledgeHubStyles,
  colors,
} from '../styles';
import { mockDiseases, Disease } from '../__mocks__/KnowledgeHub.mock';

interface KnowledgeHubProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const KnowledgeHub: React.FC<KnowledgeHubProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');

  const diseases: Disease[] = mockDiseases;

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
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    }
  };

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
            <Text style={[headerStyles.headerTitleWhite, { fontSize: 22 }]}>Health Knowledge Hub</Text>
            <Text style={headerStyles.headerSubtitle}>Health information and resources</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Search Bar */}
        <View style={knowledgeHubStyles.searchBar}>
          <Text style={knowledgeHubStyles.searchIcon}>🔍</Text>
          <TextInput
            style={knowledgeHubStyles.searchInput}
            placeholder="Search diseases, conditions, or symptoms..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Disease Cards */}
        <View style={knowledgeHubStyles.diseasesContainer}>
          {filteredDiseases.map((disease) => (
            <TouchableOpacity key={disease.id} style={knowledgeHubStyles.diseaseCard} activeOpacity={0.8}>
              <View style={knowledgeHubStyles.diseaseHeader}>
                <View style={knowledgeHubStyles.diseaseIcon}>
                  <Text style={knowledgeHubStyles.diseaseIconText}>{disease.icon}</Text>
                </View>
                <View style={knowledgeHubStyles.diseaseInfo}>
                  <Text style={knowledgeHubStyles.diseaseName}>{disease.name}</Text>
                  <View style={knowledgeHubStyles.categoryBadge}>
                    <Text style={knowledgeHubStyles.categoryText}>{disease.category}</Text>
                  </View>
                </View>
              </View>
              <Text style={knowledgeHubStyles.description}>{disease.description}</Text>
              <View style={knowledgeHubStyles.prevalenceBadge}>
                <Text style={knowledgeHubStyles.prevalenceText}>📊 {disease.prevalence}</Text>
              </View>
              <View style={knowledgeHubStyles.symptomsSection}>
                <Text style={knowledgeHubStyles.symptomsTitle}>Common Symptoms:</Text>
                <View style={knowledgeHubStyles.symptomsList}>
                  {disease.symptoms.map((symptom, index) => (
                    <View key={index} style={knowledgeHubStyles.symptomTag}>
                      <Text style={knowledgeHubStyles.symptomText}>• {symptom}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={knowledgeHubStyles.learnMoreBtn}
                activeOpacity={0.8}
                onPress={() => {
                  navigation?.navigate('KnowledgeArticle', {
                    diseaseId: disease.id,
                    diseaseName: disease.name,
                    diseaseCategory: disease.category,
                    diseaseDescription: disease.description,
                    diseaseSymptoms: disease.symptoms,
                    diseasePrevalence: disease.prevalence,
                  });
                }}
              >
                <Text style={knowledgeHubStyles.learnMoreBtnText}>Learn More</Text>
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

export default KnowledgeHub;

