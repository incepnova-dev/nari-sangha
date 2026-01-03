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
import {
  mockStories,
  mockResearch,
  mockVideos,
  mockProducts,
  mockInsurancePlans,
  mockConditions,
  Story,
  Research,
  Video,
  Product,
  Insurance,
  Condition,
} from '../__mocks__/HomeLanding.mock';

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

  const stories: Story[] = mockStories;
  const research: Research[] = mockResearch;
  const videos: Video[] = mockVideos;
  const products: Product[] = mockProducts;
  const insurancePlans: Insurance[] = mockInsurancePlans;
  const conditions: Condition[] = mockConditions;

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
