import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

interface LandingHomeProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
}

const LandingHome: React.FC<LandingHomeProps> = ({
  navigation,
  user,
  onSignOut,
}) => {
  const [activeNav, setActiveNav] = useState<'home' | 'health' | 'community' | 'profile'>('home');

  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'Priya';

  const features = [
    {
      icon: '📚',
      title: 'Knowledge Hub',
      subtitle: 'Diseases & Conditions',
      onPress: () => {
        // Navigate to knowledge hub
        console.log('Navigate to Knowledge Hub');
      },
    },
    {
      icon: '💉',
      title: 'Vaccination',
      subtitle: 'Schedule & Tracking',
      onPress: () => {
        // Navigate to vaccination
        console.log('Navigate to Vaccination');
      },
    },
    {
      icon: '🏥',
      title: 'Find Clinics',
      subtitle: 'Nearby Hospitals & Centers',
      onPress: () => {
        // Navigate to clinics
        console.log('Navigate to Find Clinics');
      },
    },
    {
      icon: '🛡️',
      title: 'Insurance',
      subtitle: 'Compare Products',
      onPress: () => {
        // Navigate to insurance
        console.log('Navigate to Insurance');
      },
    },
    {
      icon: '👩‍⚕️',
      title: 'Gynecologists',
      subtitle: 'Book Appointments',
      onPress: () => {
        // Navigate to gynecologists
        console.log('Navigate to Gynecologists');
      },
    },
    {
      icon: '🔍',
      title: 'Product Finder',
      subtitle: 'Compare like Skyscanner',
      onPress: () => {
        // Navigate to product finder
        console.log('Navigate to Product Finder');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.profilePic}>
          <Text style={styles.profilePicText}>👩</Text>
        </View>
        <View style={styles.welcomeText}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{userName}!</Text>
        </View>
        <TouchableOpacity style={styles.searchIcon} activeOpacity={0.7}>
          <Text style={styles.searchIconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView
        style={styles.contentArea}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.featureGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              onPress={feature.onPress}
              activeOpacity={0.8}
            >
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>{feature.icon}</Text>
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('home')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeNav === 'home' && styles.navIconActive]}>
            🏠
          </Text>
          <Text style={[styles.navText, activeNav === 'home' && styles.navTextActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('health')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeNav === 'health' && styles.navIconActive]}>
            ❤️
          </Text>
          <Text style={[styles.navText, activeNav === 'health' && styles.navTextActive]}>
            Health
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('community')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeNav === 'community' && styles.navIconActive]}>
            👥
          </Text>
          <Text style={[styles.navText, activeNav === 'community' && styles.navTextActive]}>
            Community
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('profile')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeNav === 'profile' && styles.navIconActive]}>
            👤
          </Text>
          <Text style={[styles.navText, activeNav === 'profile' && styles.navTextActive]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: '#E91E63',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicText: {
    fontSize: 20,
    color: 'white',
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  searchIcon: {
    padding: 5,
  },
  searchIconText: {
    fontSize: 24,
    color: '#999',
  },
  contentArea: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 15,
  },
  featureCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
  },
  featureIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FCE4EC',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureIconText: {
    fontSize: 32,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureSubtitle: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
    textAlign: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    gap: 5,
  },
  navIcon: {
    fontSize: 24,
    color: '#999',
  },
  navIconActive: {
    color: '#C2185B',
  },
  navText: {
    fontSize: 11,
    color: '#999',
  },
  navTextActive: {
    color: '#C2185B',
  },
});

export default LandingHome;

