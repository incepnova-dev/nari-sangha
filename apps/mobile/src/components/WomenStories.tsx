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
    authorAvatar: icons.star,
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

