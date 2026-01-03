import React, { useState } from 'react';
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
  womenStoriesStyles,
  icons,
} from '../styles';
import { mockStories, mockFeaturedStory, Story } from '../__mocks__/WomenStories.mock';

interface WomenStoriesProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const WomenStories: React.FC<WomenStoriesProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [activeFilter, setActiveFilter] = useState<string>('All Stories');

  const filters = ['All Stories', 'PCOS', 'Pregnancy', 'Mental Health', 'Cancer Survivors', 'Fertility'];

  const stories: Story[] = mockStories;
  const featuredStory: Story = { ...mockFeaturedStory, isFeatured: true };

  const filteredStories = activeFilter === 'All Stories'
    ? stories
    : stories.filter(story => {
        const filterLower = activeFilter.toLowerCase();
        return story.category.toLowerCase().includes(filterLower) ||
               story.tags.some(tag => tag.text.toLowerCase().includes(filterLower));
      });

  // Group stories by category
  const groupedStories = filteredStories.reduce((acc, story) => {
    if (!acc[story.category]) {
      acc[story.category] = [];
    }
    acc[story.category].push(story);
    return acc;
  }, {} as Record<string, Story[]>);

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

  const getTagStyle = (type: string) => {
    switch (type) {
      case 'pink':
        return womenStoriesStyles.tagPink;
      case 'purple':
        return womenStoriesStyles.tagPurple;
      case 'blue':
        return womenStoriesStyles.tagBlue;
      case 'green':
        return womenStoriesStyles.tagGreen;
      default:
        return womenStoriesStyles.tagPink;
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
        <View style={womenStoriesStyles.heroSection}>
          <Text style={womenStoriesStyles.heroIcon}>{icons.heartEmoji}</Text>
          <Text style={womenStoriesStyles.heroTitle}>Real Stories, Real Strength</Text>
          <Text style={womenStoriesStyles.heroSubtitle}>
            Inspiring journeys of women who overcame health challenges and found their strength
          </Text>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={womenStoriesStyles.filterSection}
          contentContainerStyle={womenStoriesStyles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                womenStoriesStyles.filterPill,
                activeFilter === filter && womenStoriesStyles.filterPillActive,
              ]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  womenStoriesStyles.filterPillText,
                  activeFilter === filter && womenStoriesStyles.filterPillTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Section */}
        <View style={womenStoriesStyles.contentSection}>
          {/* Featured Story */}
          <View style={womenStoriesStyles.featuredStory}>
            <View style={womenStoriesStyles.featuredBadge}>
              <Text style={womenStoriesStyles.featuredBadgeText}>⭐ Featured Story</Text>
            </View>
            <Text style={womenStoriesStyles.featuredStoryTitle}>{featuredStory.title}</Text>
            <Text style={womenStoriesStyles.featuredStoryExcerpt}>{featuredStory.excerpt}</Text>
            <TouchableOpacity style={womenStoriesStyles.featuredReadMoreBtn} activeOpacity={0.8}>
              <Text style={womenStoriesStyles.featuredReadMoreBtnText}>Read Full Story →</Text>
            </TouchableOpacity>
          </View>

          {/* Story Categories */}
          {Object.entries(groupedStories).map(([category, categoryStories]) => (
            <View key={category}>
              <View style={womenStoriesStyles.categoryTitleContainer}>
                <Text style={womenStoriesStyles.categoryTitle}>{category}</Text>
              </View>
              {categoryStories.map((story) => (
                <View key={story.id} style={womenStoriesStyles.storyCard}>
                  <View style={womenStoriesStyles.storyHeader}>
                    <View style={womenStoriesStyles.authorAvatar}>
                      <Text style={womenStoriesStyles.authorAvatarText}>{story.authorAvatar}</Text>
                    </View>
                    <View style={womenStoriesStyles.authorInfo}>
                      <Text style={womenStoriesStyles.authorName}>{story.authorName}</Text>
                      <View style={womenStoriesStyles.storyMeta}>
                        <Text style={womenStoriesStyles.storyMetaText}>🗓️ {story.date}</Text>
                        <Text style={womenStoriesStyles.storyMetaText}>•</Text>
                        <Text style={womenStoriesStyles.storyMetaText}>{story.readTime}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={womenStoriesStyles.storyTitle}>{story.title}</Text>
                  <Text style={womenStoriesStyles.storyExcerpt}>{story.excerpt}</Text>
                  <View style={womenStoriesStyles.storyTags}>
                    {story.tags.map((tag, index) => (
                      <View key={index} style={[womenStoriesStyles.tag, getTagStyle(tag.type)]}>
                        <Text style={[
                          womenStoriesStyles.tagText,
                          tag.type === 'pink' && womenStoriesStyles.tagTextPink,
                          tag.type === 'purple' && womenStoriesStyles.tagTextPurple,
                          tag.type === 'blue' && womenStoriesStyles.tagTextBlue,
                          tag.type === 'green' && womenStoriesStyles.tagTextGreen,
                        ]}>
                          {tag.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={womenStoriesStyles.storyFooter}>
                    <TouchableOpacity style={womenStoriesStyles.readMoreBtn} activeOpacity={0.8}>
                      <Text style={womenStoriesStyles.readMoreBtnText}>Read More</Text>
                    </TouchableOpacity>
                    <View style={womenStoriesStyles.storyStats}>
                      <Text style={womenStoriesStyles.statItem}>❤️ {story.likes}</Text>
                      <Text style={womenStoriesStyles.statItem}>💬 {story.comments}</Text>
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

export default WomenStories;

