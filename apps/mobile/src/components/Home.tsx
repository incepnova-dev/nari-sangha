import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  landingContainer,
  landingContent,
  homeStyles,
} from '../styles';
import TopMenuBar from './TopMenuBar';
import BottomMenuBar from './BottomMenuBar';
import Profile from './Profile';
import Community from './Community';
import Discussions from './Discussions';
import ProductListing from './ProductListing';
import KnowledgeHub from './KnowledgeHub';

interface HomeProps {
  user: any;
  onSignOut: () => void;
  language?: string;
}

const Home: React.FC<HomeProps> = ({ user, onSignOut }) => {
  const [activeScreen, setActiveScreen] = useState<'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub'>('home');
  const userName =
    user?.user?.name || user?.name || user?.email || 'User';

  const handleNavigate = (screen: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub') => {
    setActiveScreen(screen);
  };

  if (activeScreen === 'community') {
    return (
      <Community
        user={user}
        onSignOut={onSignOut}
        onNavigate={handleNavigate}
      />
    );
  }

  if (activeScreen === 'profile') {
    return (
      <Profile
        user={user}
        onSignOut={onSignOut}
        onNavigate={handleNavigate}
      />
    );
  }

  if (activeScreen === 'discussions') {
    return (
      <Discussions
        user={user}
        onSignOut={onSignOut}
        onNavigate={handleNavigate}
      />
    );
  }

  if (activeScreen === 'products') {
    return (
      <ProductListing
        user={user}
        onSignOut={onSignOut}
        onNavigate={handleNavigate}
      />
    );
  }

  if (activeScreen === 'knowledgehub') {
    return (
      <KnowledgeHub
        user={user}
        onSignOut={onSignOut}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <View style={landingContainer.container}>
      <TopMenuBar
        userName={userName}
        onProfilePress={() => handleNavigate('profile')}
      />

      {/* Scrollable content area */}
      <ScrollView
        style={homeStyles.scroll}
        contentContainerStyle={homeStyles.scrollContent}
      >
        <View style={landingContent.contentContainer}>
          {/* You can replace this with real home content (cards, lists, etc.) */}
          <Text style={landingContent.subtitle}>
            This is your home screen. Add your main app content here.
          </Text>

          {/* Example scrollable items */}
          {Array.from({ length: 20 }).map((_, index) => (
            <View key={index} style={homeStyles.card}>
              <Text style={homeStyles.cardTitle}>Item {index + 1}</Text>
              <Text style={homeStyles.cardBody}>
                This area can show user-specific information, feeds, or other
                content.
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default Home;


