import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  landingContainer,
  landingContent,
  scrollStyles,
} from '../styles';
import TopMenuBar from './TopMenuBar';
import BottomMenuBar from './BottomMenuBar';

interface CreateCommunityProps {
  user: any;
  onSignOut: () => void;
  language?: string;
  onNavigate: (
    screen: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub' | 'createCommunity' | 'createPost'
  ) => void;
}

const CreateCommunity: React.FC<CreateCommunityProps> = ({
  user,
  onSignOut,
  onNavigate,
}) => {
  const userName =
    user?.user?.name || user?.name || user?.email || 'User';

  return (
    <View style={landingContainer.container}>
      <TopMenuBar
        userName={userName}
        onProfilePress={() => onNavigate('profile')}
      />

      {/* Scrollable content area */}
      <ScrollView
        style={scrollStyles.scroll}
        contentContainerStyle={scrollStyles.scrollContent}
      >
        <View style={landingContent.contentContainer}>
          <Text style={landingContent.title}>Create Community</Text>
          <Text style={landingContent.subtitle}>
            Coming soon...
          </Text>
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="createCommunity"
        onNavigate={onNavigate}
      />
    </View>
  );
};

export default CreateCommunity;

