import React from 'react';
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

interface AboutUsProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
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
    } else {
      console.log('Navigate to:', screen);
    }
  };

  const handleGetStarted = () => {
    navigation?.navigate('HomeLanding');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <WelcomeHeader
        userName={userName}
        onProfilePress={() => {
          navigation?.navigate('Profile');
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Us</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>💖</Text>
          <Text style={styles.heroTitle}>Women's Health Hub</Text>
          <Text style={styles.heroSubtitle}>
            Empowering women with comprehensive healthcare solutions, expert guidance, and compassionate support at every life stage
          </Text>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Mission */}
          <View style={styles.missionBox}>
            <Text style={styles.missionTitle}>Our Mission</Text>
            <Text style={styles.missionText}>
              To revolutionize women's healthcare by providing accessible, personalized, and evidence-based health solutions. We believe every woman deserves comprehensive care, timely information, and the support needed to make informed decisions about her health and wellbeing.
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>Making an Impact</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={styles.statNumber}>{stat.number}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Services */}
          <Text style={styles.servicesHeader}>Our Services</Text>
          
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.serviceFeatures}>
                  {service.features.map((feature, fIndex) => (
                    <View key={fIndex} style={styles.featureItem}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Why Choose Us */}
          <View style={styles.whyChooseSection}>
            <Text style={styles.whyTitle}>Why Choose Women's Health Hub?</Text>
            <View style={styles.whyItems}>
              {whyItems.map((item, index) => (
                <View key={index} style={styles.whyItem}>
                  <Text style={styles.whyIcon}>{item.icon}</Text>
                  <View style={styles.whyContent}>
                    <Text style={styles.whyItemTitle}>{item.title}</Text>
                    <Text style={styles.whyItemText}>{item.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* CTA */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Ready to Take Control of Your Health?</Text>
            <Text style={styles.ctaText}>Join thousands of women who trust us for their healthcare needs</Text>
            <TouchableOpacity
              style={styles.ctaButton}
              activeOpacity={0.8}
              onPress={handleGetStarted}
            >
              <Text style={styles.ctaButtonText}>Get Started Today</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 Women's Health Hub. All rights reserved.</Text>
            <Text style={styles.footerText}>Empowering women's health, one step at a time 💖</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E91E63',
    padding: 20,
    paddingTop: 20,
    marginBottom: 0,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: 'white',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  headerSpacer: {
    width: 35,
  },
  heroSection: {
    backgroundColor: '#E91E63',
    padding: 40,
    paddingVertical: 40,
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
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
  },
  contentSection: {
    padding: 20,
  },
  missionBox: {
    backgroundColor: '#FFF5F7',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: '#E91E63',
  },
  missionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 15,
  },
  missionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  statsSection: {
    backgroundColor: '#667eea',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  statItem: {
    width: '47%',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  servicesHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  servicesGrid: {
    gap: 20,
    marginBottom: 30,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },
  serviceIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 12,
  },
  serviceDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  serviceFeatures: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureCheck: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
  whyChooseSection: {
    backgroundColor: '#FFF8FB',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
  },
  whyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  whyItems: {
    gap: 15,
  },
  whyItem: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'flex-start',
  },
  whyIcon: {
    fontSize: 28,
  },
  whyContent: {
    flex: 1,
  },
  whyItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  whyItemText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: '#E91E63',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 25,
    opacity: 0.95,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
  },
  footer: {
    backgroundColor: '#333',
    padding: 30,
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AboutUs;

