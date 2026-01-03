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
  researchArticlesStyles,
} from '../styles';
import {
  mockVideos,
  mockFeaturedArticle,
  mockArticles,
  Video,
  ResearchArticle,
} from '../__mocks__/ResearchArticles.mock';

interface ResearchArticlesProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const ResearchArticles: React.FC<ResearchArticlesProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [activeCategory, setActiveCategory] = useState<string>('All Research');

  const categories = ['All Research', 'PCOS', 'Cancer', 'Pregnancy', 'Menopause', 'Fertility'];

  const videos: Video[] = mockVideos;
  const featuredArticle: ResearchArticle = mockFeaturedArticle;
  const articles: ResearchArticle[] = mockArticles;

  const filteredArticles = activeCategory === 'All Research'
    ? articles
    : articles.filter(article => {
        const categoryLower = activeCategory.toLowerCase();
        return article.category.toLowerCase().includes(categoryLower) ||
               article.tags.some(tag => tag.text.toLowerCase().includes(categoryLower));
      });

  // Group articles by category
  const groupedArticles = filteredArticles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {} as Record<string, ResearchArticle[]>);

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

  const getTagStyle = (type: string) => {
    switch (type) {
      case 'pink':
        return styles.tagPink;
      case 'purple':
        return styles.tagPurple;
      case 'blue':
        return styles.tagBlue;
      case 'green':
        return styles.tagGreen;
      case 'orange':
        return styles.tagOrange;
      default:
        return styles.tagPink;
    }
  };

  const getTagTextStyle = (type: string) => {
    switch (type) {
      case 'pink':
        return styles.tagTextPink;
      case 'purple':
        return styles.tagTextPurple;
      case 'blue':
        return styles.tagTextBlue;
      case 'green':
        return styles.tagTextGreen;
      case 'orange':
        return styles.tagTextOrange;
      default:
        return styles.tagTextPink;
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
        {/* Hero Section */}
        <View style={researchArticlesStyles.heroSection}>
          <Text style={researchArticlesStyles.heroIcon}>🔬</Text>
          <Text style={researchArticlesStyles.heroTitle}>Cutting-Edge Research</Text>
          <Text style={researchArticlesStyles.heroSubtitle}>
            Stay informed with the latest breakthroughs in women's health research and medical advances
          </Text>
        </View>

        {/* Content Section */}
        <View style={researchArticlesStyles.contentSection}>
          {/* Video Section */}
          <View style={researchArticlesStyles.videoSection}>
            <View style={researchArticlesStyles.sectionHeader}>
              <Text style={researchArticlesStyles.sectionIcon}>🎥</Text>
              <Text style={researchArticlesStyles.sectionTitle}>Expert Insights</Text>
            </View>

            {videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={researchArticlesStyles.videoCard}
                activeOpacity={0.8}
                onPress={() => video.url && handleOpenUrl(video.url)}
              >
                <View style={researchArticlesStyles.videoThumbnail}>
                  <Text style={researchArticlesStyles.videoThumbnailIcon}>▶</Text>
                  <Text style={researchArticlesStyles.videoThumbnailText}>🎥</Text>
                </View>
                <View style={researchArticlesStyles.videoInfo}>
                  <Text style={researchArticlesStyles.videoTitle}>{video.title}</Text>
                  <View style={researchArticlesStyles.videoMeta}>
                    <Text style={researchArticlesStyles.videoMetaText}>📅 {video.date}</Text>
                    <Text style={researchArticlesStyles.videoMetaText}>•</Text>
                    <Text style={researchArticlesStyles.videoMetaText}>⏱️ {video.duration}</Text>
                    <Text style={researchArticlesStyles.videoMetaText}>•</Text>
                    <Text style={researchArticlesStyles.videoMetaText}>👁️ {video.views}</Text>
                  </View>
                  <Text style={researchArticlesStyles.videoDescription}>{video.description}</Text>
                  <View style={researchArticlesStyles.doctorInfo}>
                    <View style={researchArticlesStyles.doctorAvatar}>
                      <Text style={researchArticlesStyles.doctorAvatarText}>{video.doctorAvatar}</Text>
                    </View>
                    <View style={researchArticlesStyles.doctorDetails}>
                      <Text style={researchArticlesStyles.doctorName}>{video.doctorName}</Text>
                      <Text style={researchArticlesStyles.doctorSpecialty}>{video.doctorSpecialty}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={researchArticlesStyles.categoryTabs}
            contentContainerStyle={researchArticlesStyles.categoryTabsContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  researchArticlesStyles.categoryTab,
                  activeCategory === category && researchArticlesStyles.categoryTabActive,
                ]}
                onPress={() => setActiveCategory(category)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    researchArticlesStyles.categoryTabText,
                    activeCategory === category && researchArticlesStyles.categoryTabTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Featured Research */}
          <View style={researchArticlesStyles.featuredResearch}>
            <View style={researchArticlesStyles.featuredBadgeWhite}>
              <Text style={researchArticlesStyles.featuredBadgeWhiteText}>{featuredArticle.badge}</Text>
            </View>
            <Text style={researchArticlesStyles.featuredResearchTitle}>{featuredArticle.title}</Text>
            <Text style={researchArticlesStyles.featuredResearchAuthors}>{featuredArticle.authors}</Text>
            <Text style={researchArticlesStyles.featuredResearchJournal}>{featuredArticle.journal}</Text>
            <Text style={researchArticlesStyles.featuredResearchAbstract}>{featuredArticle.abstract}</Text>
            <TouchableOpacity style={researchArticlesStyles.featuredReadFullBtn} activeOpacity={0.8}>
              <Text style={researchArticlesStyles.featuredReadFullBtnText}>Read Full Study →</Text>
            </TouchableOpacity>
          </View>

          {/* Research Categories */}
          {Object.entries(groupedArticles).map(([category, categoryArticles]) => (
            <View key={category}>
              <View style={researchArticlesStyles.sectionHeader}>
                <Text style={researchArticlesStyles.sectionIcon}>
                  {category.includes('PCOS') ? '🔬' :
                   category.includes('Cancer') ? '🩺' :
                   category.includes('Pregnancy') ? '🤰' :
                   category.includes('Menopause') ? '🌸' :
                   category.includes('Fertility') ? '🧬' : '📚'}
                </Text>
                <Text style={researchArticlesStyles.sectionTitle}>{category}</Text>
              </View>
              {categoryArticles.map((article) => (
                <View key={article.id} style={researchArticlesStyles.researchCard}>
                  <View style={researchArticlesStyles.researchBadge}>
                    <Text style={researchArticlesStyles.researchBadgeText}>{article.badge}</Text>
                  </View>
                  <Text style={researchArticlesStyles.researchTitle}>{article.title}</Text>
                  <Text style={researchArticlesStyles.researchAuthors}>{article.authors}</Text>
                  <Text style={researchArticlesStyles.researchJournal}>{article.journal}</Text>
                  <Text style={researchArticlesStyles.researchAbstract}>{article.abstract}</Text>
                  <View style={researchArticlesStyles.researchTags}>
                    {article.tags.map((tag, index) => (
                      <View key={index} style={[researchArticlesStyles.tag, getTagStyle(tag.type)]}>
                        <Text style={[researchArticlesStyles.tagText, getTagTextStyle(tag.type)]}>
                          {tag.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={researchArticlesStyles.researchFooter}>
                    <TouchableOpacity style={researchArticlesStyles.readFullBtn} activeOpacity={0.8}>
                      <Text style={researchArticlesStyles.readFullBtnText}>Read Full Article</Text>
                    </TouchableOpacity>
                    <View style={researchArticlesStyles.researchStats}>
                      <Text style={researchArticlesStyles.researchStatsText}>📊 Impact Factor: {article.impactFactor}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
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

export default ResearchArticles;

