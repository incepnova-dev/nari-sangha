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

interface Video {
  id: string;
  title: string;
  date: string;
  duration: string;
  views: string;
  description: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  url: string;
}

interface ResearchArticle {
  id: string;
  badge: string;
  title: string;
  authors: string;
  journal: string;
  abstract: string;
  tags: { text: string; type: 'pink' | 'purple' | 'blue' | 'green' | 'orange' }[];
  impactFactor: string;
  category: string;
  url?: string;
}

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

  const videos: Video[] = [
    {
      id: '1',
      title: 'Understanding PCOS: A Gynecologist\'s Perspective',
      date: 'Dec 2024',
      duration: '12:45',
      views: '45K views',
      description: 'Dr. Sarah Johnson explains the latest research on Polycystic Ovary Syndrome, including diagnostic criteria, treatment options, and lifestyle interventions that can help manage symptoms effectively.',
      doctorName: 'Dr. Sarah Johnson, MD',
      doctorSpecialty: 'Gynecologist & Reproductive Endocrinologist',
      doctorAvatar: '👩‍⚕️',
      url: 'https://www.youtube.com/watch?v=pD6bshLxFxk',
    },
    {
      id: '2',
      title: 'Breast Health & Cancer Prevention: What Every Woman Should Know',
      date: 'Dec 2024',
      duration: '15:30',
      views: '67K views',
      description: 'Dr. Priya Mehta discusses breast cancer prevention strategies, the importance of early detection, screening guidelines, and recent advances in treatment options that are improving survival rates.',
      doctorName: 'Dr. Priya Mehta, MD',
      doctorSpecialty: 'Oncologist & Breast Cancer Specialist',
      doctorAvatar: '👩‍⚕️',
      url: 'https://www.youtube.com/watch?v=ZUJq6hP6gLk',
    },
  ];

  const featuredArticle: ResearchArticle = {
    id: 'featured',
    badge: '⭐ Breakthrough Study',
    title: 'Revolutionary AI Model Detects Ovarian Cancer 2 Years Earlier Than Current Methods',
    authors: 'Chen L., Rodriguez A., Singh K., et al.',
    journal: 'Nature Medicine • December 2024',
    abstract: 'A groundbreaking machine learning algorithm analyzes blood biomarkers to detect ovarian cancer up to 24 months before conventional diagnostic methods, potentially saving thousands of lives annually...',
    tags: [
      { text: 'Ovarian Cancer', type: 'pink' },
      { text: 'AI Technology', type: 'blue' },
      { text: 'Early Detection', type: 'green' },
    ],
    impactFactor: '91.2',
    category: 'Featured',
  };

  const articles: ResearchArticle[] = [
    {
      id: '1',
      badge: 'NEW',
      title: 'Impact of Mediterranean Diet on PCOS Outcomes: A Randomized Controlled Trial',
      authors: 'Johnson M., Williams E., Brown S., Anderson K.',
      journal: 'Journal of Women\'s Health • December 2024',
      abstract: 'This 12-month study of 250 women with PCOS found that adherence to a Mediterranean diet resulted in significant improvements in insulin resistance (42%), menstrual regularity (67%), and hormone levels compared to standard dietary recommendations.',
      tags: [
        { text: 'PCOS', type: 'pink' },
        { text: 'Nutrition', type: 'green' },
        { text: 'Clinical Trial', type: 'blue' },
      ],
      impactFactor: '4.2',
      category: 'PCOS & Hormonal Health',
    },
    {
      id: '2',
      badge: 'PEER-REVIEWED',
      title: 'Novel Biomarkers for Early Endometriosis Detection Using Salivary Testing',
      authors: 'Kumar R., Patel S., Lee M., Thompson A.',
      journal: 'The Lancet • November 2024',
      abstract: 'Researchers identified three specific protein markers in saliva that can detect endometriosis with 89% accuracy, offering a non-invasive alternative to laparoscopic surgery for diagnosis. This breakthrough could reduce the average 7-year diagnostic delay.',
      tags: [
        { text: 'Endometriosis', type: 'purple' },
        { text: 'Diagnostics', type: 'blue' },
        { text: 'Biomarkers', type: 'green' },
      ],
      impactFactor: '59.1',
      category: 'PCOS & Hormonal Health',
    },
    {
      id: '3',
      badge: 'BREAKTHROUGH',
      title: 'Immunotherapy Combination Increases Ovarian Cancer Survival by 40%',
      authors: 'Zhang Y., O\'Connor M., Davis K., Rodriguez J.',
      journal: 'New England Journal of Medicine • December 2024',
      abstract: 'A phase III clinical trial demonstrated that combining two immunotherapy drugs (pembrolizumab and niraparib) with chemotherapy significantly improved overall survival rates in advanced ovarian cancer patients compared to chemotherapy alone.',
      tags: [
        { text: 'Ovarian Cancer', type: 'pink' },
        { text: 'Immunotherapy', type: 'orange' },
        { text: 'Clinical Trial', type: 'blue' },
      ],
      impactFactor: '91.2',
      category: 'Cancer Research',
    },
    {
      id: '4',
      badge: 'META-ANALYSIS',
      title: 'Breast Cancer Screening: Optimal Age and Frequency Guidelines Updated',
      authors: 'Martinez C., Wilson R., Taylor H., et al.',
      journal: 'JAMA Oncology • November 2024',
      abstract: 'Comprehensive analysis of 85 studies involving 2.3 million women suggests starting annual mammography at age 40 (rather than 50) reduces mortality by 25% in average-risk women, with benefits outweighing potential harms.',
      tags: [
        { text: 'Breast Cancer', type: 'pink' },
        { text: 'Screening', type: 'green' },
        { text: 'Prevention', type: 'blue' },
      ],
      impactFactor: '24.8',
      category: 'Cancer Research',
    },
    {
      id: '5',
      badge: 'AI-POWERED',
      title: 'Postpartum Depression: AI-Assisted Screening Models Achieve 92% Accuracy',
      authors: 'Williams R., Thompson S., Lee K., Anderson P.',
      journal: 'JAMA Psychiatry • December 2024',
      abstract: 'Machine learning algorithm analyzing speech patterns, social media activity, and wearable device data can predict postpartum depression risk with 92% accuracy, enabling early intervention and support for at-risk mothers.',
      tags: [
        { text: 'Mental Health', type: 'purple' },
        { text: 'AI Technology', type: 'blue' },
        { text: 'Postpartum', type: 'pink' },
      ],
      impactFactor: '17.5',
      category: 'Maternal & Pregnancy Health',
    },
    {
      id: '6',
      badge: 'LONGITUDINAL',
      title: 'Preeclampsia Risk Reduced 60% with Low-Dose Aspirin in High-Risk Pregnancies',
      authors: 'Garcia M., Cohen S., Patel N., et al.',
      journal: 'Obstetrics & Gynecology • November 2024',
      abstract: '10-year study of 15,000 high-risk pregnancies confirms that daily low-dose aspirin (150mg) started before 16 weeks gestation significantly reduces preeclampsia risk with minimal adverse effects, potentially preventing thousands of maternal deaths annually.',
      tags: [
        { text: 'Preeclampsia', type: 'orange' },
        { text: 'Prevention', type: 'green' },
        { text: 'High-Risk', type: 'blue' },
      ],
      impactFactor: '6.9',
      category: 'Maternal & Pregnancy Health',
    },
    {
      id: '7',
      badge: 'NEW',
      title: 'Exercise Interventions for Menopausal Bone Health: Resistance Training Superior to Aerobic',
      authors: 'Davis K., Morrison T., White L., et al.',
      journal: 'The Lancet • November 2024',
      abstract: 'Randomized trial of 500 postmenopausal women found that progressive resistance training increased bone mineral density by 3.2% over 18 months, significantly outperforming aerobic exercise (0.8% increase) in preventing osteoporosis.',
      tags: [
        { text: 'Bone Health', type: 'green' },
        { text: 'Exercise', type: 'blue' },
        { text: 'Menopause', type: 'purple' },
      ],
      impactFactor: '59.1',
      category: 'Menopause & Aging',
    },
    {
      id: '8',
      badge: 'REVIEW',
      title: 'Hormone Replacement Therapy: Updated Safety Profile and Personalized Treatment Approaches',
      authors: 'Bennett J., Clarke R., Sullivan K., et al.',
      journal: 'Menopause Journal • December 2024',
      abstract: 'Comprehensive review of 20 years of data suggests individualized HRT strategies, accounting for genetic factors and health history, can safely alleviate menopausal symptoms while minimizing cardiovascular and cancer risks in most women under 60.',
      tags: [
        { text: 'Menopause', type: 'purple' },
        { text: 'HRT', type: 'orange' },
        { text: 'Personalized Medicine', type: 'green' },
      ],
      impactFactor: '5.3',
      category: 'Menopause & Aging',
    },
    {
      id: '9',
      badge: 'CLINICAL TRIAL',
      title: 'Novel IVF Protocol Increases Live Birth Rate by 35% in Women Over 40',
      authors: 'Liu X., Yamamoto K., Schmidt A., et al.',
      journal: 'Fertility and Sterility • December 2024',
      abstract: 'Modified embryo selection protocol using time-lapse imaging and AI analysis significantly improved live birth rates in older women undergoing IVF (from 21% to 28% per cycle), offering new hope for age-related infertility.',
      tags: [
        { text: 'IVF', type: 'blue' },
        { text: 'Fertility', type: 'purple' },
        { text: 'AI Technology', type: 'orange' },
      ],
      impactFactor: '6.6',
      category: 'Fertility & Reproductive Health',
    },
  ];

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

