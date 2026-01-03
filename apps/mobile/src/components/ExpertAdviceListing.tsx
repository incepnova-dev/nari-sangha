import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import {
  containerStyles,
  expertAdviceListingStyles,
} from '../styles';
import { mockVideos, Video } from '../__mocks__/ExpertAdviceListing.mock';

interface ExpertAdviceListingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const ExpertAdviceListing: React.FC<ExpertAdviceListingProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [activeCategory, setActiveCategory] = useState<string>('All Topics');

  const categories = ['All Topics', 'PCOS', 'Pregnancy', 'Cancer', 'Menopause', 'Fertility', 'Mental Health'];

  const videos: Video[] = mockVideos;

  const filteredVideos = activeCategory === 'All Topics'
    ? videos
    : videos.filter(video => {
        const categoryLower = activeCategory.toLowerCase();
        return video.title.toLowerCase().includes(categoryLower) ||
               video.description?.toLowerCase().includes(categoryLower) ||
               video.channel.toLowerCase().includes(categoryLower);
      });

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    }
  };

  const handleOpenUrl = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <View style={containerStyles.containerSecondary}>
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
        {/* Hero Section */}
        <View style={expertAdviceListingStyles.heroSection}>
          <Text style={expertAdviceListingStyles.heroIcon}>🎥</Text>
          <Text style={expertAdviceListingStyles.heroTitle}>Expert Advice</Text>
          <Text style={expertAdviceListingStyles.heroSubtitle}>
            Learn from leading healthcare professionals about women's health topics
          </Text>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={expertAdviceListingStyles.categoryTabs}
          contentContainerStyle={expertAdviceListingStyles.categoryTabsContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                expertAdviceListingStyles.categoryTab,
                activeCategory === category && expertAdviceListingStyles.categoryTabActive,
              ]}
              onPress={() => setActiveCategory(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  expertAdviceListingStyles.categoryTabText,
                  activeCategory === category && expertAdviceListingStyles.categoryTabTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Section */}
        <View style={expertAdviceListingStyles.contentSection}>
          {/* Video Cards */}
          {filteredVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={expertAdviceListingStyles.videoCard}
              activeOpacity={0.8}
              onPress={() => handleOpenUrl(video.url)}
            >
              <View style={expertAdviceListingStyles.videoThumbnail}>
                <Text style={expertAdviceListingStyles.videoThumbnailPlaceholder}>🎥</Text>
                <View style={expertAdviceListingStyles.playButton}>
                  <Text style={expertAdviceListingStyles.playButtonText}>▶</Text>
                </View>
              </View>
              <View style={expertAdviceListingStyles.videoInfo}>
                <Text style={expertAdviceListingStyles.videoTitle}>{video.title}</Text>
                <Text style={expertAdviceListingStyles.videoChannel}>{video.channel}</Text>
                <View style={expertAdviceListingStyles.videoMeta}>
                  {video.date && (
                    <>
                      <Text style={expertAdviceListingStyles.videoMetaText}>📅 {video.date}</Text>
                      <Text style={expertAdviceListingStyles.videoMetaText}>•</Text>
                    </>
                  )}
                  <Text style={expertAdviceListingStyles.videoMetaText}>⏱️ {video.duration}</Text>
                  <Text style={expertAdviceListingStyles.videoMetaText}>•</Text>
                  <Text style={expertAdviceListingStyles.videoMetaText}>👁️ {video.views}</Text>
                </View>
                {video.description && (
                  <Text style={expertAdviceListingStyles.videoDescription}>{video.description}</Text>
                )}
                {video.doctorName && (
                  <View style={expertAdviceListingStyles.doctorInfo}>
                    <View style={expertAdviceListingStyles.doctorAvatar}>
                      <Text style={expertAdviceListingStyles.doctorAvatarText}>{video.doctorAvatar || '👩‍⚕️'}</Text>
                    </View>
                    <View style={expertAdviceListingStyles.doctorDetails}>
                      <Text style={expertAdviceListingStyles.doctorName}>{video.doctorName}</Text>
                      {video.doctorSpecialty && (
                        <Text style={expertAdviceListingStyles.doctorSpecialty}>{video.doctorSpecialty}</Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="home"
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default ExpertAdviceListing;

