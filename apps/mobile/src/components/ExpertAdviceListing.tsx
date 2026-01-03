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

interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  url: string;
  date?: string;
  description?: string;
  doctorName?: string;
  doctorSpecialty?: string;
  doctorAvatar?: string;
}

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

  const videos: Video[] = [
    {
      id: '1',
      title: 'The Science of Women\'s Health: Ob/Gyn Reveals 10 Truths You Need to Know',
      channel: 'Mel Robbins • Expert Interview',
      views: '210K views',
      duration: '1:07:13',
      thumbnail: 'https://i.ytimg.com/vi/7KX2x0d42EE/hq720.jpg',
      url: 'https://www.youtube.com/watch?v=7KX2x0d42EE',
      date: 'Dec 2024',
      description: 'An in-depth conversation with a leading gynecologist about essential women\'s health facts that every woman should know.',
    },
    {
      id: '2',
      title: '5 Things Your Gynecologist Wants You To Know: Getting Pregnant',
      channel: 'Mama Doctor Jones • Board Certified ObGyn',
      views: '1.2M views',
      duration: '10:29',
      thumbnail: 'https://i.ytimg.com/vi/EkqVrsrIgAI/hq720.jpg',
      url: 'https://www.youtube.com/watch?v=EkqVrsrIgAI',
      date: 'Nov 2024',
      description: 'Expert advice on fertility, conception, and what to expect when trying to get pregnant.',
    },
    {
      id: '3',
      title: 'Understanding PCOS: A Gynecologist\'s Perspective',
      channel: 'Dr. Sarah Johnson, MD',
      views: '45K views',
      duration: '12:45',
      thumbnail: '',
      url: 'https://www.youtube.com/watch?v=pD6bshLxFxk',
      date: 'Dec 2024',
      description: 'Dr. Sarah Johnson explains the latest research on Polycystic Ovary Syndrome, including diagnostic criteria, treatment options, and lifestyle interventions.',
      doctorName: 'Dr. Sarah Johnson, MD',
      doctorSpecialty: 'Gynecologist & Reproductive Endocrinologist',
      doctorAvatar: '👩‍⚕️',
    },
    {
      id: '4',
      title: 'Breast Health & Cancer Prevention: What Every Woman Should Know',
      channel: 'Dr. Priya Mehta, MD',
      views: '67K views',
      duration: '15:30',
      thumbnail: '',
      url: 'https://www.youtube.com/watch?v=ZUJq6hP6gLk',
      date: 'Dec 2024',
      description: 'Dr. Priya Mehta discusses breast cancer prevention strategies, the importance of early detection, screening guidelines, and recent advances in treatment.',
      doctorName: 'Dr. Priya Mehta, MD',
      doctorSpecialty: 'Oncologist & Breast Cancer Specialist',
      doctorAvatar: '👩‍⚕️',
    },
    {
      id: '5',
      title: 'Menopause: What to Expect and How to Manage Symptoms',
      channel: 'Dr. Lisa Chen, MD',
      views: '89K views',
      duration: '18:20',
      thumbnail: '',
      url: 'https://www.youtube.com/watch?v=example',
      date: 'Nov 2024',
      description: 'Comprehensive guide to understanding menopause, its symptoms, and effective management strategies for a smoother transition.',
      doctorName: 'Dr. Lisa Chen, MD',
      doctorSpecialty: 'Menopause Specialist & Gynecologist',
      doctorAvatar: '👩‍⚕️',
    },
    {
      id: '6',
      title: 'Postpartum Depression: Recognizing Signs and Getting Help',
      channel: 'Dr. Emily Rodriguez, MD',
      views: '52K views',
      duration: '14:15',
      thumbnail: '',
      url: 'https://www.youtube.com/watch?v=example2',
      date: 'Dec 2024',
      description: 'Expert insights on postpartum depression, its symptoms, risk factors, and available treatment options for new mothers.',
      doctorName: 'Dr. Emily Rodriguez, MD',
      doctorSpecialty: 'Psychiatrist & Women\'s Health Specialist',
      doctorAvatar: '👩‍⚕️',
    },
  ];

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

