import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';

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
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroIcon}>🎥</Text>
          <Text style={styles.heroTitle}>Expert Advice</Text>
          <Text style={styles.heroSubtitle}>
            Learn from leading healthcare professionals about women's health topics
          </Text>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabs}
          contentContainerStyle={styles.categoryTabsContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                activeCategory === category && styles.categoryTabActive,
              ]}
              onPress={() => setActiveCategory(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  activeCategory === category && styles.categoryTabTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Video Cards */}
          {filteredVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoCard}
              activeOpacity={0.8}
              onPress={() => handleOpenUrl(video.url)}
            >
              <View style={styles.videoThumbnail}>
                <Text style={styles.videoThumbnailPlaceholder}>🎥</Text>
                <View style={styles.playButton}>
                  <Text style={styles.playButtonText}>▶</Text>
                </View>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoChannel}>{video.channel}</Text>
                <View style={styles.videoMeta}>
                  {video.date && (
                    <>
                      <Text style={styles.videoMetaText}>📅 {video.date}</Text>
                      <Text style={styles.videoMetaText}>•</Text>
                    </>
                  )}
                  <Text style={styles.videoMetaText}>⏱️ {video.duration}</Text>
                  <Text style={styles.videoMetaText}>•</Text>
                  <Text style={styles.videoMetaText}>👁️ {video.views}</Text>
                </View>
                {video.description && (
                  <Text style={styles.videoDescription}>{video.description}</Text>
                )}
                {video.doctorName && (
                  <View style={styles.doctorInfo}>
                    <View style={styles.doctorAvatar}>
                      <Text style={styles.doctorAvatarText}>{video.doctorAvatar || '👩‍⚕️'}</Text>
                    </View>
                    <View style={styles.doctorDetails}>
                      <Text style={styles.doctorName}>{video.doctorName}</Text>
                      {video.doctorSpecialty && (
                        <Text style={styles.doctorSpecialty}>{video.doctorSpecialty}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    backgroundColor: '#667eea',
    padding: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.95,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 400,
  },
  categoryTabs: {
    marginBottom: 10,
  },
  categoryTabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  categoryTab: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  categoryTabActive: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryTabTextActive: {
    color: 'white',
  },
  contentSection: {
    padding: 20,
    paddingTop: 10,
  },
  videoCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  videoThumbnailPlaceholder: {
    fontSize: 80,
    opacity: 0.3,
  },
  playButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(233, 30, 99, 0.9)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    fontSize: 30,
    color: 'white',
  },
  videoInfo: {
    padding: 20,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    lineHeight: 25,
  },
  videoChannel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 12,
  },
  videoMetaText: {
    fontSize: 14,
    color: '#666',
  },
  videoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    backgroundColor: '#E91E63',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorAvatarText: {
    fontSize: 24,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 3,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: '#999',
  },
});

export default ExpertAdviceListing;

