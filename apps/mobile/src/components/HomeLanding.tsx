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
import SearchAndQuickActions from './SearchAndQuickActions';
import AgenticPlayground from './AgenticPlayground';
import {
  containerStyles,
  headerStyles,
  cardStyles,
  buttons,
  homeLandingStyles,
} from '../styles';

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
        return cardStyles.storyCardPregnancy;
      case 'reproductive':
        return cardStyles.storyCardReproductive;
      case 'perimenopause':
        return cardStyles.storyCardPerimenopause;
      case 'menopause':
        return cardStyles.storyCardMenopause;
      default:
        return {};
    }
  };

  return (
    <View style={containerStyles.containerTertiary}>
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
        style={containerStyles.scrollView}
        contentContainerStyle={containerStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Section */}
        <View style={containerStyles.contentSection}>
          {/* AI Chatbot Banner */}
          <TouchableOpacity style={homeLandingStyles.chatbotBanner} onPress={handleChatNow} activeOpacity={0.8}>
            <Text style={homeLandingStyles.chatbotTitle}>Meet Your AI Health Assistant 🤖</Text>
            <Text style={homeLandingStyles.chatbotSubtitle}>Get instant answers to your women's health questions, 24/7</Text>
            <View style={homeLandingStyles.chatNowBtn}>
              <Text style={homeLandingStyles.chatNowBtnText}>Chat Now</Text>
            </View>
          </TouchableOpacity>

          {/* Women's Health Stories */}
          <View style={headerStyles.sectionHeader}>
            <Text style={headerStyles.sectionTitle}>Women's Health Stories</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('WomenStories')}>
              <Text style={headerStyles.seeAllBtn}>See All →</Text>
            </TouchableOpacity>
          </View>

          {stories.map((story, index) => (
            <TouchableOpacity
              key={index}
              style={[cardStyles.storyCard, getStoryThemeStyle(story.theme)]}
              activeOpacity={0.8}
            >
              <Text style={homeLandingStyles.storyIcon}>{story.icon}</Text>
              <Text style={homeLandingStyles.storyTitle}>{story.title}</Text>
              <Text style={homeLandingStyles.storySubtitle}>{story.subtitle}</Text>
              <Text style={homeLandingStyles.storyDescription}>{story.description}</Text>
            </TouchableOpacity>
          ))}

          {/* Latest Research */}
          <View style={headerStyles.sectionHeader}>
            <Text style={headerStyles.sectionTitle}>Latest Research 📚</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('ResearchArticles')}>
              <Text style={headerStyles.seeAllBtn}>See All →</Text>
            </TouchableOpacity>
          </View>

          {research.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={cardStyles.cardWithBorder}
              activeOpacity={0.8}
              onPress={() => item.url && handleOpenUrl(item.url)}
            >
              <Text style={homeLandingStyles.researchTitle}>{item.title}</Text>
              <Text style={homeLandingStyles.researchAuthors}>{item.authors}</Text>
              <Text style={homeLandingStyles.researchJournal}>{item.journal}</Text>
            </TouchableOpacity>
          ))}

          {/* Expert Gynecologist Videos */}
          <View style={headerStyles.sectionHeader}>
            <Text style={headerStyles.sectionTitle}>Expert Advice 🎥</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('ExpertAdviceListing')}>
              <Text style={headerStyles.seeAllBtn}>Explore</Text>
            </TouchableOpacity>
          </View>

          {videos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={homeLandingStyles.videoCard}
              activeOpacity={0.8}
              onPress={() => handleOpenUrl(video.url)}
            >
              <View style={homeLandingStyles.videoThumbnail}>
                <Text style={homeLandingStyles.videoThumbnailPlaceholder}>🎥</Text>
                <View style={homeLandingStyles.playButton}>
                  <Text style={homeLandingStyles.playButtonText}>▶</Text>
                </View>
              </View>
              <View style={homeLandingStyles.videoContent}>
                <Text style={homeLandingStyles.videoTitle}>{video.title}</Text>
                <Text style={homeLandingStyles.videoChannel}>{video.channel}</Text>
                <View style={homeLandingStyles.videoStats}>
                  <Text style={homeLandingStyles.videoStat}>👁️ {video.views}</Text>
                  <Text style={homeLandingStyles.videoStat}>⏱️ {video.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Healthcare Products */}
          <View style={headerStyles.sectionHeader}>
            <Text style={headerStyles.sectionTitle}>Healthcare Products 💊</Text>
            <TouchableOpacity onPress={handleProductsOption}>
              <Text style={headerStyles.seeAllBtn}>See All →</Text>
            </TouchableOpacity>
          </View>

          <View style={homeLandingStyles.productGrid}>
            {products.map((product, index) => (
              <TouchableOpacity key={index} style={homeLandingStyles.productCard} activeOpacity={0.8}>
                <View style={homeLandingStyles.discountBadge}>
                  <Text style={homeLandingStyles.discountBadgeText}>{product.discount}</Text>
                </View>
                <View style={homeLandingStyles.productImage}>
                  <Text style={homeLandingStyles.productImageIcon}>{product.icon}</Text>
                </View>
                <Text style={homeLandingStyles.productName}>{product.name}</Text>
                <Text style={homeLandingStyles.productBrand}>{product.brand}</Text>
                <View style={homeLandingStyles.productPricing}>
                  <Text style={homeLandingStyles.productPrice}>{product.price}</Text>
                  <Text style={homeLandingStyles.productOriginalPrice}>{product.originalPrice}</Text>
                </View>
                {product.vendors.map((vendor, vIndex) => (
                  <View key={vIndex} style={homeLandingStyles.vendorInfo}>
                    <Text style={homeLandingStyles.vendorIcon}>{vendor.icon}</Text>
                    <Text style={homeLandingStyles.vendorName}>{vendor.name}</Text>
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </View>

          {/* Insurance Plans */}
          <View style={headerStyles.sectionHeader}>
            <Text style={headerStyles.sectionTitle}>Insurance Plans 🛡️</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('ProductsOption')}>
              <Text style={headerStyles.seeAllBtn}>See All →</Text>
            </TouchableOpacity>
          </View>

          {insurancePlans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              style={cardStyles.card}
              activeOpacity={0.8}
              onPress={() => navigation?.navigate('WomensInsuranceListing')}
            >
              <View style={homeLandingStyles.insuranceHeader}>
                <View style={homeLandingStyles.insuranceIcon}>
                  <Text style={homeLandingStyles.insuranceIconText}>{plan.icon}</Text>
                </View>
                <View style={homeLandingStyles.insuranceTitleSection}>
                  <Text style={homeLandingStyles.insuranceName}>{plan.name}</Text>
                  <Text style={homeLandingStyles.insuranceProvider}>{plan.provider}</Text>
                </View>
              </View>
              <View style={homeLandingStyles.insuranceFeatures}>
                {plan.features.map((feature, fIndex) => (
                  <View key={fIndex} style={homeLandingStyles.featureItem}>
                    <Text style={homeLandingStyles.featureCheck}>✓</Text>
                    <Text style={homeLandingStyles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <View style={homeLandingStyles.insuranceFooter}>
                <View>
                  <Text style={homeLandingStyles.insurancePrice}>{plan.price}</Text>
                  <Text style={homeLandingStyles.pricePeriod}>{plan.period}</Text>
                </View>
                <TouchableOpacity style={homeLandingStyles.viewDetailsBtn} activeOpacity={0.8}>
                  <Text style={homeLandingStyles.viewDetailsBtnText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          {/* Health Conditions Guide */}
          <View style={headerStyles.sectionHeader}>
            <Text style={headerStyles.sectionTitle}>Health Knowledge Hub</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('KnowledgeHub')}>
              <Text style={headerStyles.seeAllBtn}>Explore</Text>
            </TouchableOpacity>
          </View>

          {conditions.map((condition, index) => (
            <TouchableOpacity key={index} style={homeLandingStyles.conditionCard} activeOpacity={0.8}>
              <View style={homeLandingStyles.conditionHeader}>
                <View style={homeLandingStyles.conditionIcon}>
                  <Text style={homeLandingStyles.conditionIconText}>{condition.icon}</Text>
                </View>
                <Text style={homeLandingStyles.conditionName}>{condition.name}</Text>
              </View>
              <Text style={homeLandingStyles.conditionDescription}>{condition.description}</Text>
              <View style={homeLandingStyles.conditionTags}>
                {condition.tags.map((tag, tIndex) => (
                  <View
                    key={tIndex}
                    style={[
                      homeLandingStyles.tag,
                      tag.type === 'pink' && homeLandingStyles.tagPink,
                      tag.type === 'green' && homeLandingStyles.tagGreen,
                      tag.type === 'orange' && homeLandingStyles.tagOrange,
                    ]}
                  >
                    <Text style={homeLandingStyles.tagText}>{tag.text}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}

          {/* Footer */}
          <View style={homeLandingStyles.footer}>
            <View style={homeLandingStyles.footerSection}>
              <Text style={homeLandingStyles.footerTitle}>Seva Health Network</Text>
              <View style={homeLandingStyles.footerInfo}>
                <View style={homeLandingStyles.footerInfoItem}>
                  <Text style={homeLandingStyles.footerIcon}>🕐</Text>
                  <Text style={homeLandingStyles.footerInfoText}>Working Hours: Mon-Sat, 9:00 AM - 6:00 PM</Text>
                </View>
                <View style={homeLandingStyles.footerInfoItem}>
                  <Text style={homeLandingStyles.footerIcon}>📧</Text>
                  <Text style={homeLandingStyles.footerInfoText}>support@sevahhealth.com</Text>
                </View>
                <View style={homeLandingStyles.footerInfoItem}>
                  <Text style={homeLandingStyles.footerIcon}>📞</Text>
                  <Text style={homeLandingStyles.footerInfoText}>+91 1800-XXX-XXXX</Text>
                </View>
              </View>
            </View>

            <View style={homeLandingStyles.footerSection}>
              <Text style={homeLandingStyles.footerTitle}>Quick Links</Text>
              <View style={homeLandingStyles.footerLinks}>
                <TouchableOpacity>
                  <Text style={homeLandingStyles.footerLink}>Product Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={homeLandingStyles.footerLink}>Partner with Us</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={homeLandingStyles.footerLink}>Privacy & Data Security</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={homeLandingStyles.footerLink}>Compliant with Ayushman Bharat Privacy</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={homeLandingStyles.footerBottom}>
              <Text style={homeLandingStyles.footerBottomText}>© 2024 Seva Health Network. All rights reserved.</Text>
              <Text style={homeLandingStyles.footerBottomText}>Committed to your health and privacy 💗</Text>
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

export default HomeLanding;
