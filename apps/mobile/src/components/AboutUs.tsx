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
} from '../styles';

interface AboutUsProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
  onSignOut?: () => void;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface Stat {
  number: string;
  label: string;
}

interface WhyItem {
  icon: string;
  title: string;
  text: string;
}

const AboutUs: React.FC<AboutUsProps> = ({
  navigation,
  user,
  onBack,
  onSignOut,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  const stats: Stat[] = [
    { number: '500K+', label: 'Women Served' },
    { number: '1000+', label: 'Expert Doctors' },
    { number: '50+', label: 'Health Topics' },
    { number: '24/7', label: 'AI Support' },
  ];

  const services: Service[] = [
    {
      icon: '🛍️',
      title: 'Product Search & Comparison',
      description: 'Find the best healthcare products tailored to your needs with intelligent search and price comparison.',
      features: [
        'Compare prices across multiple vendors',
        'Verified product reviews and ratings',
        'Expert recommendations',
        'Exclusive discounts and offers',
      ],
    },
    {
      icon: '🏥',
      title: 'Health Insurance Guidance',
      description: 'Navigate health insurance options with personalized recommendations and coverage insights.',
      features: [
        'Policy comparison tools',
        'Claim assistance support',
        'Coverage recommendations',
        'Premium calculators',
      ],
    },
    {
      icon: '📚',
      title: 'Knowledge Hub',
      description: 'Comprehensive information on women-focused diseases, conditions, and health topics.',
      features: [
        'Evidence-based articles',
        'Expert-written guides',
        'Latest research updates',
        'Interactive learning modules',
        'PCOS, Endometriosis, PCOD',
        'Menopause & Hormonal Health',
      ],
    },
    {
      icon: '💉',
      title: 'Vaccination & Screening Guidelines',
      description: 'Stay up-to-date with personalized vaccination schedules and screening recommendations.',
      features: [
        'Age-appropriate screening reminders',
        'HPV & Cervical cancer screening',
        'Breast cancer detection guidelines',
        'Prenatal and maternal vaccinations',
        'Personalized health calendars',
      ],
    },
    {
      icon: '🤖',
      title: 'AI Health Assistant',
      description: 'Get instant answers to your health questions with our intelligent 24/7 AI assistant.',
      features: [
        'Instant health query responses',
        'Symptom assessment guidance',
        'Medication information',
        'Appointment scheduling help',
        'Multilingual support',
      ],
    },
    {
      icon: '❓',
      title: "Women's Health FAQs",
      description: 'Quick answers to the most common women\'s health questions from trusted experts.',
      features: [
        'Menstrual health queries',
        'Pregnancy & fertility FAQs',
        'Hormonal health concerns',
        'Sexual health guidance',
        'Lifestyle & wellness tips',
      ],
    },
  ];

  const whyItems: WhyItem[] = [
    {
      icon: '🎯',
      title: 'Women-Centric Approach',
      text: 'Designed specifically for women\'s unique health needs across all life stages',
    },
    {
      icon: '👩‍⚕️',
      title: 'Expert Medical Team',
      text: 'Access to board-certified specialists in obstetrics, gynecology, and women\'s health',
    },
    {
      icon: '🔒',
      title: 'Privacy & Confidentiality',
      text: 'Your health information is protected with industry-leading security measures',
    },
    {
      icon: '🌐',
      title: 'Accessible Anywhere',
      text: 'Get quality healthcare guidance from the comfort of your home, anytime',
    },
    {
      icon: '💰',
      title: 'Affordable Care',
      text: 'Best prices, insurance support, and transparent pricing with no hidden costs',
    },
    {
      icon: '🔬',
      title: 'Evidence-Based',
      text: 'All information backed by latest medical research and clinical guidelines',
    },
  ];

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
          <Text style={aboutUsStyles.heroEmoji}>💖</Text>
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
                      <Text style={aboutUsStyles.featureCheck}>✓</Text>
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
            <Text style={aboutUsStyles.footerText}>Empowering women's health, one step at a time 💖</Text>
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

