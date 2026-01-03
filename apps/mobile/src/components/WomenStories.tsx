import React, { useState } from 'react';
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

interface Story {
  id: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: { text: string; type: 'pink' | 'purple' | 'blue' | 'green' }[];
  likes: string;
  comments: string;
  category: string;
  isFeatured?: boolean;
}

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

  const stories: Story[] = [
    {
      id: '1',
      authorName: 'Priya Sharma',
      authorAvatar: '👩',
      date: '2 weeks ago',
      readTime: '5 min read',
      title: 'My High-Risk Pregnancy Journey: A Story of Hope',
      excerpt: 'When doctors told me I had a high-risk pregnancy, fear consumed me. But with the right medical team and support system, I delivered a healthy baby boy. This is my story of perseverance...',
      tags: [
        { text: 'High-Risk Pregnancy', type: 'pink' },
        { text: 'Success Story', type: 'green' },
        { text: 'Support System', type: 'blue' },
      ],
      likes: '1.2K',
      comments: '89',
      category: 'Pregnancy & Motherhood',
    },
    {
      id: '2',
      authorName: 'Ananya Reddy',
      authorAvatar: '👩‍🦱',
      date: '3 weeks ago',
      readTime: '7 min read',
      title: 'Postpartum Depression: Breaking the Silence',
      excerpt: 'Nobody talks about the darkness that can follow childbirth. I\'m here to share my experience with postpartum depression and how I found my way back to joy...',
      tags: [
        { text: 'Mental Health', type: 'purple' },
        { text: 'Postpartum', type: 'pink' },
        { text: 'Recovery', type: 'green' },
      ],
      likes: '2.5K',
      comments: '156',
      category: 'Pregnancy & Motherhood',
    },
    {
      id: '3',
      authorName: 'Meera Kapoor',
      authorAvatar: '👱‍♀️',
      date: '1 month ago',
      readTime: '6 min read',
      title: 'Reversing PCOS Naturally: My 2-Year Transformation',
      excerpt: 'Irregular periods, weight gain, and hair loss – PCOS was taking over my life. Then I discovered the power of lifestyle changes. Here\'s how I reversed my symptoms naturally...',
      tags: [
        { text: 'PCOS', type: 'pink' },
        { text: 'Natural Healing', type: 'green' },
        { text: 'Weight Loss', type: 'blue' },
      ],
      likes: '3.8K',
      comments: '234',
      category: 'Overcoming PCOS',
    },
    {
      id: '4',
      authorName: 'Fatima Khan',
      authorAvatar: '🧕',
      date: '1 month ago',
      readTime: '4 min read',
      title: 'Conceiving with PCOS: Our Miracle Baby Story',
      excerpt: 'After 4 years of trying and multiple failed IVF attempts, we had almost given up hope. But persistence paid off, and today I\'m a proud mother of twins...',
      tags: [
        { text: 'PCOS', type: 'pink' },
        { text: 'IVF Journey', type: 'purple' },
        { text: 'Success', type: 'green' },
      ],
      likes: '4.2K',
      comments: '312',
      category: 'Overcoming PCOS',
    },
    {
      id: '5',
      authorName: 'Sneha Patel',
      authorAvatar: '👩‍🦰',
      date: '2 months ago',
      readTime: '10 min read',
      title: 'Beating Breast Cancer: My Journey from Fear to Freedom',
      excerpt: 'Finding a lump in my breast at 35 was terrifying. But early detection saved my life. This is my story of chemotherapy, surgery, and coming out stronger than ever...',
      tags: [
        { text: 'Breast Cancer', type: 'pink' },
        { text: 'Survivor', type: 'green' },
        { text: 'Early Detection', type: 'blue' },
      ],
      likes: '5.6K',
      comments: '421',
      category: 'Cancer Survivors',
    },
    {
      id: '6',
      authorName: 'Lakshmi Iyer',
      authorAvatar: '👩‍🦳',
      date: '2 months ago',
      readTime: '8 min read',
      title: 'Life After Ovarian Cancer: Finding Joy Again',
      excerpt: 'Cancer changed everything, but it also taught me what truly matters. Here\'s how I rebuilt my life after ovarian cancer and found gratitude in unexpected places...',
      tags: [
        { text: 'Ovarian Cancer', type: 'purple' },
        { text: 'Recovery', type: 'green' },
        { text: 'Gratitude', type: 'blue' },
      ],
      likes: '3.1K',
      comments: '189',
      category: 'Cancer Survivors',
    },
    {
      id: '7',
      authorName: 'Divya Singh',
      authorAvatar: '👩‍💼',
      date: '3 months ago',
      readTime: '6 min read',
      title: 'Living with Endometriosis: Pain is Not Normal',
      excerpt: 'For years, doctors told me my severe period pain was normal. It took 7 years to get an endometriosis diagnosis. Here\'s what I wish I knew earlier...',
      tags: [
        { text: 'Endometriosis', type: 'pink' },
        { text: 'Chronic Pain', type: 'purple' },
        { text: 'Awareness', type: 'green' },
      ],
      likes: '2.8K',
      comments: '167',
      category: 'Endometriosis Warriors',
    },
  ];

  const featuredStory: Story = {
    id: 'featured',
    authorName: 'Anonymous',
    authorAvatar: '⭐',
    date: '1 week ago',
    readTime: '8 min read',
    title: 'From Diagnosis to Dancing: My PCOS Journey',
    excerpt: 'After being diagnosed with PCOS at 23, I thought my dreams of becoming a dancer were over. Here\'s how I proved myself wrong...',
    tags: [
      { text: 'PCOS', type: 'pink' },
      { text: 'Inspiration', type: 'green' },
    ],
    likes: '6.2K',
    comments: '445',
    category: 'Featured',
    isFeatured: true,
  };

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
        return styles.tagPink;
      case 'purple':
        return styles.tagPurple;
      case 'blue':
        return styles.tagBlue;
      case 'green':
        return styles.tagGreen;
      default:
        return styles.tagPink;
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
          <Text style={styles.heroIcon}>💖</Text>
          <Text style={styles.heroTitle}>Real Stories, Real Strength</Text>
          <Text style={styles.heroSubtitle}>
            Inspiring journeys of women who overcame health challenges and found their strength
          </Text>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterSection}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterPill,
                activeFilter === filter && styles.filterPillActive,
              ]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === filter && styles.filterPillTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Featured Story */}
          <View style={styles.featuredStory}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>⭐ Featured Story</Text>
            </View>
            <Text style={styles.featuredStoryTitle}>{featuredStory.title}</Text>
            <Text style={styles.featuredStoryExcerpt}>{featuredStory.excerpt}</Text>
            <TouchableOpacity style={styles.featuredReadMoreBtn} activeOpacity={0.8}>
              <Text style={styles.featuredReadMoreBtnText}>Read Full Story →</Text>
            </TouchableOpacity>
          </View>

          {/* Story Categories */}
          {Object.entries(groupedStories).map(([category, categoryStories]) => (
            <View key={category}>
              <View style={styles.categoryTitleContainer}>
                <Text style={styles.categoryTitle}>{category}</Text>
              </View>
              {categoryStories.map((story) => (
                <View key={story.id} style={styles.storyCard}>
                  <View style={styles.storyHeader}>
                    <View style={styles.authorAvatar}>
                      <Text style={styles.authorAvatarText}>{story.authorAvatar}</Text>
                    </View>
                    <View style={styles.authorInfo}>
                      <Text style={styles.authorName}>{story.authorName}</Text>
                      <View style={styles.storyMeta}>
                        <Text style={styles.storyMetaText}>🗓️ {story.date}</Text>
                        <Text style={styles.storyMetaText}>•</Text>
                        <Text style={styles.storyMetaText}>{story.readTime}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.storyTitle}>{story.title}</Text>
                  <Text style={styles.storyExcerpt}>{story.excerpt}</Text>
                  <View style={styles.storyTags}>
                    {story.tags.map((tag, index) => (
                      <View key={index} style={[styles.tag, getTagStyle(tag.type)]}>
                        <Text style={[
                          styles.tagText,
                          tag.type === 'pink' && styles.tagTextPink,
                          tag.type === 'purple' && styles.tagTextPurple,
                          tag.type === 'blue' && styles.tagTextBlue,
                          tag.type === 'green' && styles.tagTextGreen,
                        ]}>
                          {tag.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.storyFooter}>
                    <TouchableOpacity style={styles.readMoreBtn} activeOpacity={0.8}>
                      <Text style={styles.readMoreBtnText}>Read More</Text>
                    </TouchableOpacity>
                    <View style={styles.storyStats}>
                      <Text style={styles.statItem}>❤️ {story.likes}</Text>
                      <Text style={styles.statItem}>💬 {story.comments}</Text>
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
    backgroundColor: '#FFE5EE',
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
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 400,
  },
  filterSection: {
    marginBottom: 10,
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  filterPill: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  filterPillActive: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterPillTextActive: {
    color: 'white',
  },
  contentSection: {
    padding: 20,
    paddingTop: 10,
  },
  featuredStory: {
    backgroundColor: '#667eea',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  featuredBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredStoryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 15,
    lineHeight: 32,
  },
  featuredStoryExcerpt: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuredReadMoreBtn: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredReadMoreBtnText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTitleContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  storyCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
  },
  authorAvatar: {
    width: 60,
    height: 60,
    backgroundColor: '#E91E63',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorAvatarText: {
    fontSize: 28,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  storyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  storyMetaText: {
    fontSize: 13,
    color: '#999',
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    lineHeight: 28,
  },
  storyExcerpt: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  storyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  tagPink: {
    backgroundColor: '#FFE5F0',
  },
  tagPurple: {
    backgroundColor: '#F3E5F5',
  },
  tagBlue: {
    backgroundColor: '#E3F2FD',
  },
  tagGreen: {
    backgroundColor: '#E8F5E9',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagTextPink: {
    color: '#E91E63',
  },
  tagTextPurple: {
    color: '#9C27B0',
  },
  tagTextBlue: {
    color: '#2196F3',
  },
  tagTextGreen: {
    color: '#4CAF50',
  },
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  readMoreBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  readMoreBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  storyStats: {
    flexDirection: 'row',
    gap: 15,
  },
  statItem: {
    fontSize: 14,
    color: '#999',
  },
});

export default WomenStories;

