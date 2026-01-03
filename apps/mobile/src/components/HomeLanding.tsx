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
import SearchAndQuickActions from './SearchAndQuickActions';
import AgenticPlayground from './AgenticPlayground';

interface HomeLandingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onNavigate?: (route: string) => void;
}

interface Story {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  theme: 'pregnancy' | 'reproductive' | 'perimenopause' | 'menopause';
}

interface Research {
  title: string;
  authors: string;
  journal: string;
  url?: string;
}

interface Video {
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  url: string;
}

interface Product {
  icon: string;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  vendors: { icon: string; name: string }[];
}

interface Insurance {
  icon: string;
  name: string;
  provider: string;
  features: string[];
  price: string;
  period: string;
}

interface Condition {
  icon: string;
  name: string;
  description: string;
  tags: { text: string; type: 'pink' | 'green' | 'orange' }[];
}

const HomeLanding: React.FC<HomeLandingProps> = ({
  navigation,
  user,
  onSignOut,
  onNavigate,
}) => {
  const [activeNav, setActiveNav] = useState<'home'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAgenticPlaygroundOpen, setIsAgenticPlaygroundOpen] = useState(false);

  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'Priya';

  const stories: Story[] = [
    {
      icon: '🤰',
      title: 'Pregnancy Journey',
      subtitle: 'Nurturing new life, embracing transformation',
      description: '"Every kick, every flutter reminds me of the miracle within. Pregnancy isn\'t just about growing a baby—it\'s about discovering strength you never knew you had. From morning sickness to that first heartbeat, every moment is precious. You\'re not just expecting a baby; you\'re becoming a superhero."',
      theme: 'pregnancy',
    },
    {
      icon: '🌸',
      title: 'Reproductive Health',
      subtitle: 'Understanding your body, owning your choices',
      description: '"Your reproductive health is your power. Whether managing PCOS, planning a family, or simply understanding your cycle better—knowledge is empowerment. Regular checkups, honest conversations with your doctor, and listening to your body are acts of self-love. You deserve care, understanding, and respect."',
      theme: 'reproductive',
    },
    {
      icon: '🌅',
      title: 'Perimenopause Transition',
      subtitle: 'The bridge to a new chapter of vitality',
      description: '"Hot flashes? Mood swings? Welcome to the transition that no one talks about enough! Perimenopause is your body\'s way of preparing for wisdom years. It\'s not an ending—it\'s a transformation. Stay active, eat well, seek support, and remember: this phase brings clarity, confidence, and freedom you\'ve been working toward your whole life."',
      theme: 'perimenopause',
    },
    {
      icon: '🦋',
      title: 'Menopause & Beyond',
      subtitle: 'Celebrating wisdom, strength, and new beginnings',
      description: '"Menopause is your body\'s way of saying: \'You\'ve done enough caregiving for others—now it\'s YOUR time!\' No more periods, no pregnancy worries, just pure freedom to focus on YOU. This is when many women start businesses, travel the world, or finally pursue that dream. Bone health, heart health, and mental wellness become priorities. You\'re not aging—you\'re ascending!"',
      theme: 'menopause',
    },
  ];

  const research: Research[] = [
    {
      title: 'Advances in Management of Obesity, Menopause, and Osteoporosis',
      authors: 'JAMA Network Research Team',
      journal: 'JAMA Women\'s Health • 2025',
      url: 'https://jamanetwork.com/collections/42139/womens-health',
    },
    {
      title: 'New Directions For Women\'s Health: Expanding Understanding and Research',
      authors: 'Health Affairs Research Initiative',
      journal: 'Health Affairs • January 2025',
      url: 'https://www.healthaffairs.org/doi/10.1377/hlthaff.2024.01004',
    },
    {
      title: 'Closing the Women\'s Health Gap: Diagnostic Delays and Tailored Treatments',
      authors: 'American Society for Microbiology',
      journal: 'ASM Research • May 2025',
      url: 'https://asm.org/articles/2025/may/closing-the-women-s-health-gap',
    },
    {
      title: 'A New Vision for Women\'s Health Research Across NIH',
      authors: 'National Academies of Sciences',
      journal: 'National Academies Press • December 2024',
      url: 'https://www.nationalacademies.org/projects/HMD-BPH-23-04/publication/28586',
    },
    {
      title: 'Single-Dose HPV Vaccine: Breakthrough in Cervical Cancer Prevention',
      authors: 'Gates Foundation Research',
      journal: 'Women\'s Health Technology • 2024',
    },
  ];

  const videos: Video[] = [
    {
      title: 'The Science of Women\'s Health: Ob/Gyn Reveals 10 Truths You Need to Know',
      channel: 'Mel Robbins • Expert Interview',
      views: '210K views',
      duration: '1:07:13',
      thumbnail: 'https://i.ytimg.com/vi/7KX2x0d42EE/hq720.jpg',
      url: 'https://www.youtube.com/watch?v=7KX2x0d42EE',
    },
    {
      title: '5 Things Your Gynecologist Wants You To Know: Getting Pregnant',
      channel: 'Mama Doctor Jones • Board Certified ObGyn',
      views: '1.2M views',
      duration: '10:29',
      thumbnail: 'https://i.ytimg.com/vi/EkqVrsrIgAI/hq720.jpg',
      url: 'https://www.youtube.com/watch?v=EkqVrsrIgAI',
    },
  ];

  const products: Product[] = [
    {
      icon: '💊',
      name: 'Prenatal Vitamins',
      brand: 'HealthPlus',
      price: '₹349',
      originalPrice: '₹499',
      discount: '30% OFF',
      vendors: [
        { icon: '🛒', name: 'Amazon' },
        { icon: '🏥', name: '1mg' },
      ],
    },
    {
      icon: '💊',
      name: 'Menstrual Pain Relief',
      brand: 'WellnessRx',
      price: '₹225',
      originalPrice: '₹300',
      discount: '25% OFF',
      vendors: [
        { icon: '🛒', name: 'Flipkart' },
        { icon: '🏥', name: 'Netmeds' },
      ],
    },
    {
      icon: '🧘‍♀️',
      name: 'Yoga Mat Premium',
      brand: 'FitLife',
      price: '₹599',
      originalPrice: '₹999',
      discount: '40% OFF',
      vendors: [
        { icon: '🛒', name: 'Amazon' },
        { icon: '👗', name: 'Myntra' },
      ],
    },
    {
      icon: '💊',
      name: 'Iron Supplements',
      brand: 'NutriCare',
      price: '₹299',
      originalPrice: '₹459',
      discount: '35% OFF',
      vendors: [
        { icon: '🏥', name: '1mg' },
        { icon: '🏥', name: 'PharmEasy' },
      ],
    },
    {
      icon: '🌡️',
      name: 'Digital Thermometer',
      brand: 'MediTech',
      price: '₹399',
      originalPrice: '₹499',
      discount: '20% OFF',
      vendors: [
        { icon: '🛒', name: 'Amazon' },
        { icon: '🏥', name: '1mg' },
      ],
    },
    {
      icon: '🩸',
      name: 'Calcium + Vitamin D',
      brand: 'BoneStrong',
      price: '₹349',
      originalPrice: '₹635',
      discount: '45% OFF',
      vendors: [
        { icon: '🏥', name: 'Netmeds' },
        { icon: '🏥', name: 'PharmEasy' },
      ],
    },
  ];

  const insurancePlans: Insurance[] = [
    {
      icon: '🏥',
      name: "Women's Health Shield",
      provider: 'Star Health Insurance',
      features: [
        'Maternity coverage up to ₹2L',
        'Cancer treatment covered',
        'Annual health checkup included',
      ],
      price: '₹8,999',
      period: 'per year',
    },
    {
      icon: '🤰',
      name: 'Maternity Care Plus',
      provider: 'ICICI Lombard',
      features: [
        'Pre & post natal coverage',
        'Newborn baby cover (90 days)',
        'Ambulance charges covered',
      ],
      price: '₹12,499',
      period: 'per year',
    },
    {
      icon: '🩺',
      name: "Complete Women's Wellness",
      provider: 'Max Bupa Health Insurance',
      features: [
        'PCOS & Thyroid treatment covered',
        'Fertility consultations included',
        'Mental health support covered',
      ],
      price: '₹10,999',
      period: 'per year',
    },
  ];

  const conditions: Condition[] = [
    {
      icon: '🩺',
      name: 'Polycystic Ovary Syndrome (PCOS)',
      description: 'Hormonal disorder causing enlarged ovaries with small cysts. Affects 1 in 10 women of childbearing age.',
      tags: [
        { text: 'Irregular periods', type: 'pink' },
        { text: 'Lifestyle changes', type: 'green' },
        { text: 'Hormonal imbalance', type: 'orange' },
      ],
    },
    {
      icon: '🎗️',
      name: 'Breast Cancer',
      description: 'Cancer that forms in breast cells. Early detection through regular screening significantly improves outcomes.',
      tags: [
        { text: 'Breast lump', type: 'pink' },
        { text: 'Regular screening', type: 'green' },
        { text: 'Genetic factors', type: 'orange' },
      ],
    },
    {
      icon: '💢',
      name: 'Endometriosis',
      description: 'Tissue similar to uterine lining grows outside the uterus, causing pain and fertility issues.',
      tags: [
        { text: 'Pelvic pain', type: 'pink' },
        { text: 'Early diagnosis', type: 'green' },
        { text: 'Unknown origin', type: 'orange' },
      ],
    },
  ];

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    } else if (screen === 'home') {
      setActiveNav('home');
    } else {
      console.log('Navigate to:', screen);
    }
  };

  const handleChatNow = () => {
    setIsAgenticPlaygroundOpen(true);
  };

  const handleProductsOption = () => {
    navigation?.navigate('ProductsOption');
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

  const getStoryThemeStyle = (theme: string) => {
    switch (theme) {
      case 'pregnancy':
        return styles.storyCardPregnancy;
      case 'reproductive':
        return styles.storyCardReproductive;
      case 'perimenopause':
        return styles.storyCardPerimenopause;
      case 'menopause':
        return styles.storyCardMenopause;
      default:
        return {};
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

      <AgenticPlayground
        isOpen={isAgenticPlaygroundOpen}
        onClose={() => setIsAgenticPlaygroundOpen(false)}
        userName={userName}
      />

      <SearchAndQuickActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickActionPress={(actionId) => {
          if (actionId === 'shop') {
            handleProductsOption();
          } else if (actionId === 'hospitals') {
            navigation?.navigate('HospitalListing');
          } else if (actionId === 'doctors') {
            navigation?.navigate('DoctorListing');
          }
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* AI Chatbot Banner */}
          <TouchableOpacity style={styles.chatbotBanner} onPress={handleChatNow} activeOpacity={0.8}>
            <Text style={styles.chatbotTitle}>Meet Your AI Health Assistant 🤖</Text>
            <Text style={styles.chatbotSubtitle}>Get instant answers to your women's health questions, 24/7</Text>
            <View style={styles.chatNowBtn}>
              <Text style={styles.chatNowBtnText}>Chat Now</Text>
            </View>
          </TouchableOpacity>

          {/* Women's Health Stories */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Women's Health Stories</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('WomenStories')}>
              <Text style={styles.seeAllBtn}>See All →</Text>
            </TouchableOpacity>
          </View>

          {stories.map((story, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.storyCard, getStoryThemeStyle(story.theme)]}
              activeOpacity={0.8}
            >
              <Text style={styles.storyIcon}>{story.icon}</Text>
              <Text style={styles.storyTitle}>{story.title}</Text>
              <Text style={styles.storySubtitle}>{story.subtitle}</Text>
              <Text style={styles.storyDescription}>{story.description}</Text>
            </TouchableOpacity>
          ))}

          {/* Latest Research */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Research 📚</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('ResearchArticles')}>
              <Text style={styles.seeAllBtn}>See All →</Text>
            </TouchableOpacity>
          </View>

          {research.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.researchCard}
              activeOpacity={0.8}
              onPress={() => item.url && handleOpenUrl(item.url)}
            >
              <Text style={styles.researchTitle}>{item.title}</Text>
              <Text style={styles.researchAuthors}>{item.authors}</Text>
              <Text style={styles.researchJournal}>{item.journal}</Text>
            </TouchableOpacity>
          ))}

          {/* Expert Gynecologist Videos */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Expert Advice 🎥</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('ExpertAdviceListing')}>
              <Text style={styles.seeAllBtn}>Explore</Text>
            </TouchableOpacity>
          </View>

          {videos.map((video, index) => (
            <TouchableOpacity
              key={index}
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
              <View style={styles.videoContent}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoChannel}>{video.channel}</Text>
                <View style={styles.videoStats}>
                  <Text style={styles.videoStat}>👁️ {video.views}</Text>
                  <Text style={styles.videoStat}>⏱️ {video.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Healthcare Products */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Healthcare Products 💊</Text>
            <TouchableOpacity onPress={handleProductsOption}>
              <Text style={styles.seeAllBtn}>See All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            {products.map((product, index) => (
              <TouchableOpacity key={index} style={styles.productCard} activeOpacity={0.8}>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountBadgeText}>{product.discount}</Text>
                </View>
                <View style={styles.productImage}>
                  <Text style={styles.productImageIcon}>{product.icon}</Text>
                </View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productBrand}>{product.brand}</Text>
                <View style={styles.productPricing}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <Text style={styles.productOriginalPrice}>{product.originalPrice}</Text>
                </View>
                {product.vendors.map((vendor, vIndex) => (
                  <View key={vIndex} style={styles.vendorInfo}>
                    <Text style={styles.vendorIcon}>{vendor.icon}</Text>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </View>

          {/* Insurance Plans */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Insurance Plans 🛡️</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('ProductsOption')}>
              <Text style={styles.seeAllBtn}>See All →</Text>
            </TouchableOpacity>
          </View>

          {insurancePlans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              style={styles.insuranceCard}
              activeOpacity={0.8}
              onPress={() => navigation?.navigate('WomensInsuranceListing')}
            >
              <View style={styles.insuranceHeader}>
                <View style={styles.insuranceIcon}>
                  <Text style={styles.insuranceIconText}>{plan.icon}</Text>
                </View>
                <View style={styles.insuranceTitleSection}>
                  <Text style={styles.insuranceName}>{plan.name}</Text>
                  <Text style={styles.insuranceProvider}>{plan.provider}</Text>
                </View>
              </View>
              <View style={styles.insuranceFeatures}>
                {plan.features.map((feature, fIndex) => (
                  <View key={fIndex} style={styles.featureItem}>
                    <Text style={styles.featureCheck}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.insuranceFooter}>
                <View>
                  <Text style={styles.insurancePrice}>{plan.price}</Text>
                  <Text style={styles.pricePeriod}>{plan.period}</Text>
                </View>
                <TouchableOpacity style={styles.viewDetailsBtn} activeOpacity={0.8}>
                  <Text style={styles.viewDetailsBtnText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          {/* Health Conditions Guide */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Knowledge Hub</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('KnowledgeHub')}>
              <Text style={styles.seeAllBtn}>Explore</Text>
            </TouchableOpacity>
          </View>

          {conditions.map((condition, index) => (
            <TouchableOpacity key={index} style={styles.conditionCard} activeOpacity={0.8}>
              <View style={styles.conditionHeader}>
                <View style={styles.conditionIcon}>
                  <Text style={styles.conditionIconText}>{condition.icon}</Text>
                </View>
                <Text style={styles.conditionName}>{condition.name}</Text>
              </View>
              <Text style={styles.conditionDescription}>{condition.description}</Text>
              <View style={styles.conditionTags}>
                {condition.tags.map((tag, tIndex) => (
                  <View
                    key={tIndex}
                    style={[
                      styles.tag,
                      tag.type === 'pink' && styles.tagPink,
                      tag.type === 'green' && styles.tagGreen,
                      tag.type === 'orange' && styles.tagOrange,
                    ]}
                  >
                    <Text style={styles.tagText}>{tag.text}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>Seva Health Network</Text>
              <View style={styles.footerInfo}>
                <View style={styles.footerInfoItem}>
                  <Text style={styles.footerIcon}>🕐</Text>
                  <Text style={styles.footerInfoText}>Working Hours: Mon-Sat, 9:00 AM - 6:00 PM</Text>
                </View>
                <View style={styles.footerInfoItem}>
                  <Text style={styles.footerIcon}>📧</Text>
                  <Text style={styles.footerInfoText}>support@sevahhealth.com</Text>
                </View>
                <View style={styles.footerInfoItem}>
                  <Text style={styles.footerIcon}>📞</Text>
                  <Text style={styles.footerInfoText}>+91 1800-XXX-XXXX</Text>
                </View>
              </View>
            </View>

            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>Quick Links</Text>
              <View style={styles.footerLinks}>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Product Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Partner with Us</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Privacy & Data Security</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Compliant with Ayushman Bharat Privacy</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footerBottom}>
              <Text style={styles.footerBottomText}>© 2024 Seva Health Network. All rights reserved.</Text>
              <Text style={styles.footerBottomText}>Committed to your health and privacy 💗</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BottomMenuBar */}
      <BottomMenuBar
        activeScreen={activeNav}
        onNavigate={handleNavigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  contentSection: {
    padding: 25,
    paddingHorizontal: 20,
  },
  chatbotBanner: {
    backgroundColor: '#667eea',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  chatbotTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  chatbotSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 15,
  },
  chatNowBtn: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  chatNowBtnText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  seeAllBtn: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
  },
  storyCard: {
    borderRadius: 20,
    padding: 30,
    paddingHorizontal: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  storyCardPregnancy: {
    backgroundColor: '#E8F5E9',
  },
  storyCardReproductive: {
    backgroundColor: '#FFF3E0',
  },
  storyCardPerimenopause: {
    backgroundColor: '#E3F2FD',
  },
  storyCardMenopause: {
    backgroundColor: '#F3E5F5',
  },
  storyIcon: {
    fontSize: 50,
    marginBottom: 15,
    textAlign: 'center',
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  storySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  storyDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
  },
  researchCard: {
    backgroundColor: 'white',
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  researchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  researchAuthors: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  researchJournal: {
    fontSize: 12,
    color: '#999',
  },
  videoCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFE5F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  videoThumbnailPlaceholder: {
    fontSize: 60,
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
  videoContent: {
    padding: 20,
  },
  videoTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  videoChannel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  videoStats: {
    flexDirection: 'row',
    gap: 15,
  },
  videoStat: {
    fontSize: 13,
    color: '#999',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 30,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#FFF8FB',
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 15,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#E91E63',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    zIndex: 1,
  },
  discountBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  productImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginVertical: 20,
  },
  productImageIcon: {
    fontSize: 60,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E91E63',
  },
  productOriginalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  vendorIcon: {
    fontSize: 14,
  },
  vendorName: {
    fontSize: 12,
    color: '#666',
  },
  insuranceCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  insuranceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
  },
  insuranceIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FFE5F0',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insuranceIconText: {
    fontSize: 32,
  },
  insuranceTitleSection: {
    flex: 1,
  },
  insuranceName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  insuranceProvider: {
    fontSize: 14,
    color: '#999',
  },
  insuranceFeatures: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  featureCheck: {
    color: '#4CAF50',
    fontSize: 18,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
  insuranceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insurancePrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#E91E63',
  },
  pricePeriod: {
    fontSize: 14,
    color: '#999',
  },
  viewDetailsBtn: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E91E63',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  viewDetailsBtnText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '600',
  },
  conditionCard: {
    backgroundColor: '#FFF8FB',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 15,
  },
  conditionIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionIconText: {
    fontSize: 28,
  },
  conditionName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  conditionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  conditionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  tagPink: {
    backgroundColor: '#FFE5F0',
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
  footer: {
    backgroundColor: '#2c3e50',
    padding: 40,
    paddingTop: 40,
    paddingBottom: 20,
    marginTop: 40,
  },
  footerSection: {
    marginBottom: 25,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#E91E63',
  },
  footerInfo: {
    gap: 10,
  },
  footerInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  footerIcon: {
    fontSize: 16,
  },
  footerInfoText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#ecf0f1',
  },
  footerLinks: {
    gap: 10,
  },
  footerLink: {
    color: '#ecf0f1',
    fontSize: 14,
    marginBottom: 10,
  },
  footerBottom: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  footerBottomText: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default HomeLanding;
