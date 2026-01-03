import React from 'react';
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
  headerStyles,
  aboutUsStyles,
  icons,
} from '../styles';
import {
  mockStats,
  mockServices,
  mockWhyItems,
  Stat,
  Service,
  WhyItem,
} from '../__mocks__/AboutUs.mock';

interface AboutUsProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
  onSignOut?: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({
  navigation,
  user,
  onBack,
  onSignOut,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  const stats: Stat[] = mockStats;
  const services: Service[] = mockServices;
  const whyItems: WhyItem[] = mockWhyItems;

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    }
  };

  const handleGetStarted = () => {
    navigation?.navigate('HomeLanding');
  };

  return (
    <View style={containerStyles.container}>
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
        style={containerStyles.scrollView}
        contentContainerStyle={containerStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.header}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitle}>About Us</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Hero Section */}
        <View style={aboutUsStyles.heroSection}>
          <Text style={aboutUsStyles.heroEmoji}>{icons.heartEmoji}</Text>
          <Text style={aboutUsStyles.heroTitle}>Women's Health Hub</Text>
          <Text style={aboutUsStyles.heroSubtitle}>
            Empowering women with comprehensive healthcare solutions, expert guidance, and compassionate support at every life stage
          </Text>
        </View>

        {/* Content Section */}
        <View style={containerStyles.contentSection}>
          {/* Mission */}
          <View style={aboutUsStyles.missionBox}>
            <Text style={aboutUsStyles.missionTitle}>Our Mission</Text>
            <Text style={aboutUsStyles.missionText}>
              To revolutionize women's healthcare by providing accessible, personalized, and evidence-based health solutions. We believe every woman deserves comprehensive care, timely information, and the support needed to make informed decisions about her health and wellbeing.
            </Text>
          </View>

          {/* Stats */}
          <View style={aboutUsStyles.statsSection}>
            <Text style={aboutUsStyles.statsTitle}>Making an Impact</Text>
            <View style={aboutUsStyles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={aboutUsStyles.statItem}>
                  <Text style={aboutUsStyles.statNumber}>{stat.number}</Text>
                  <Text style={aboutUsStyles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Services */}
          <Text style={aboutUsStyles.servicesHeader}>Our Services</Text>
          
          <View style={aboutUsStyles.servicesGrid}>
            {services.map((service, index) => (
              <View key={index} style={aboutUsStyles.serviceCard}>
                <Text style={aboutUsStyles.serviceIcon}>{service.icon}</Text>
                <Text style={aboutUsStyles.serviceTitle}>{service.title}</Text>
                <Text style={aboutUsStyles.serviceDescription}>{service.description}</Text>
                <View style={aboutUsStyles.serviceFeatures}>
                  {service.features.map((feature, fIndex) => (
                    <View key={fIndex} style={aboutUsStyles.featureItem}>
                      <Text style={aboutUsStyles.featureCheck}>{icons.checkmark}</Text>
                      <Text style={aboutUsStyles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Why Choose Us */}
          <View style={aboutUsStyles.whyChooseSection}>
            <Text style={aboutUsStyles.whyTitle}>Why Choose Women's Health Hub?</Text>
            <View style={aboutUsStyles.whyItems}>
              {whyItems.map((item, index) => (
                <View key={index} style={aboutUsStyles.whyItem}>
                  <Text style={aboutUsStyles.whyIcon}>{item.icon}</Text>
                  <View style={aboutUsStyles.whyContent}>
                    <Text style={aboutUsStyles.whyItemTitle}>{item.title}</Text>
                    <Text style={aboutUsStyles.whyItemText}>{item.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* CTA */}
          <View style={aboutUsStyles.ctaSection}>
            <Text style={aboutUsStyles.ctaTitle}>Ready to Take Control of Your Health?</Text>
            <Text style={aboutUsStyles.ctaText}>Join thousands of women who trust us for their healthcare needs</Text>
            <TouchableOpacity
              style={aboutUsStyles.ctaButton}
              activeOpacity={0.8}
              onPress={handleGetStarted}
            >
              <Text style={aboutUsStyles.ctaButtonText}>Get Started Today</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={aboutUsStyles.footer}>
            <Text style={aboutUsStyles.footerText}>© 2025 Women's Health Hub. All rights reserved.</Text>
            <Text style={aboutUsStyles.footerText}>Empowering women's health, one step at a time {icons.heartEmoji}</Text>
          </View>
        </View>
      </ScrollView>

      {/* BottomMenuBar */}
      <BottomMenuBar
        activeScreen="home"
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default AboutUs;

