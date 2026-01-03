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
          <Text style={styles.heroIcon}>🔬</Text>
          <Text style={styles.heroTitle}>Cutting-Edge Research</Text>
          <Text style={styles.heroSubtitle}>
            Stay informed with the latest breakthroughs in women's health research and medical advances
          </Text>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Video Section */}
          <View style={styles.videoSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🎥</Text>
              <Text style={styles.sectionTitle}>Expert Insights</Text>
            </View>

            {videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                activeOpacity={0.8}
                onPress={() => video.url && handleOpenUrl(video.url)}
              >
                <View style={styles.videoThumbnail}>
                  <Text style={styles.videoThumbnailIcon}>▶</Text>
                  <Text style={styles.videoThumbnailText}>🎥</Text>
                </View>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <View style={styles.videoMeta}>
                    <Text style={styles.videoMetaText}>📅 {video.date}</Text>
                    <Text style={styles.videoMetaText}>•</Text>
                    <Text style={styles.videoMetaText}>⏱️ {video.duration}</Text>
                    <Text style={styles.videoMetaText}>•</Text>
                    <Text style={styles.videoMetaText}>👁️ {video.views}</Text>
                  </View>
                  <Text style={styles.videoDescription}>{video.description}</Text>
                  <View style={styles.doctorInfo}>
                    <View style={styles.doctorAvatar}>
                      <Text style={styles.doctorAvatarText}>{video.doctorAvatar}</Text>
                    </View>
                    <View style={styles.doctorDetails}>
                      <Text style={styles.doctorName}>{video.doctorName}</Text>
                      <Text style={styles.doctorSpecialty}>{video.doctorSpecialty}</Text>
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

          {/* Featured Research */}
          <View style={styles.featuredResearch}>
            <View style={styles.featuredBadgeWhite}>
              <Text style={styles.featuredBadgeWhiteText}>{featuredArticle.badge}</Text>
            </View>
            <Text style={styles.featuredResearchTitle}>{featuredArticle.title}</Text>
            <Text style={styles.featuredResearchAuthors}>{featuredArticle.authors}</Text>
            <Text style={styles.featuredResearchJournal}>{featuredArticle.journal}</Text>
            <Text style={styles.featuredResearchAbstract}>{featuredArticle.abstract}</Text>
            <TouchableOpacity style={styles.featuredReadFullBtn} activeOpacity={0.8}>
              <Text style={styles.featuredReadFullBtnText}>Read Full Study →</Text>
            </TouchableOpacity>
          </View>

          {/* Research Categories */}
          {Object.entries(groupedArticles).map(([category, categoryArticles]) => (
            <View key={category}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>
                  {category.includes('PCOS') ? '🔬' :
                   category.includes('Cancer') ? '🩺' :
                   category.includes('Pregnancy') ? '🤰' :
                   category.includes('Menopause') ? '🌸' :
                   category.includes('Fertility') ? '🧬' : '📚'}
                </Text>
                <Text style={styles.sectionTitle}>{category}</Text>
              </View>
              {categoryArticles.map((article) => (
                <View key={article.id} style={styles.researchCard}>
                  <View style={styles.researchBadge}>
                    <Text style={styles.researchBadgeText}>{article.badge}</Text>
                  </View>
                  <Text style={styles.researchTitle}>{article.title}</Text>
                  <Text style={styles.researchAuthors}>{article.authors}</Text>
                  <Text style={styles.researchJournal}>{article.journal}</Text>
                  <Text style={styles.researchAbstract}>{article.abstract}</Text>
                  <View style={styles.researchTags}>
                    {article.tags.map((tag, index) => (
                      <View key={index} style={[styles.tag, getTagStyle(tag.type)]}>
                        <Text style={[styles.tagText, getTagTextStyle(tag.type)]}>
                          {tag.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.researchFooter}>
                    <TouchableOpacity style={styles.readFullBtn} activeOpacity={0.8}>
                      <Text style={styles.readFullBtnText}>Read Full Article</Text>
                    </TouchableOpacity>
                    <View style={styles.researchStats}>
                      <Text style={styles.researchStatsText}>📊 Impact Factor: {article.impactFactor}</Text>
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
  contentSection: {
    padding: 20,
    paddingTop: 10,
  },
  videoSection: {
    marginBottom: 35,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
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
  videoThumbnailIcon: {
    position: 'absolute',
    fontSize: 60,
    color: 'white',
    zIndex: 1,
  },
  videoThumbnailText: {
    fontSize: 80,
    opacity: 0.3,
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
  featuredResearch: {
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
  featuredBadgeWhite: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  featuredBadgeWhiteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredResearchTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 15,
    lineHeight: 32,
  },
  featuredResearchAuthors: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  featuredResearchJournal: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
  },
  featuredResearchAbstract: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    marginBottom: 20,
  },
  featuredReadFullBtn: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredReadFullBtnText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  researchCard: {
    backgroundColor: 'white',
    borderLeftWidth: 5,
    borderLeftColor: '#E91E63',
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  researchBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFE5F0',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 15,
    marginBottom: 15,
  },
  researchBadgeText: {
    color: '#E91E63',
    fontSize: 12,
    fontWeight: '700',
  },
  researchTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    lineHeight: 27,
  },
  researchAuthors: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  researchJournal: {
    fontSize: 13,
    color: '#999',
    marginBottom: 15,
  },
  researchAbstract: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  researchTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
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
  tagOrange: {
    backgroundColor: '#FFF3E0',
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
  tagTextOrange: {
    color: '#FF9800',
  },
  researchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  readFullBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  readFullBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  researchStats: {
    flexDirection: 'row',
    gap: 15,
  },
  researchStatsText: {
    fontSize: 13,
    color: '#999',
  },
});

export default ResearchArticles;

