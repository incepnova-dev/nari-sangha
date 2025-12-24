import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  landingContainer,
  landingContent,
  scrollStyles,
} from '../styles';
import TopMenuBar from './TopMenuBar';
import BottomMenuBar from './BottomMenuBar';
import CreatePostIcon from './discussions/CreatePostIcon';

interface DiscussionsProps {
  user: any;
  onSignOut: () => void;
  language?: string;
  onNavigate: (screen: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub' | 'createCommunity' | 'createPost') => void;
}

const Discussions: React.FC<DiscussionsProps> = ({
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
          <Text style={landingContent.title}>Discussions</Text>
          <Text style={landingContent.subtitle}>
            Coming soon...
          </Text>
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="discussions"
        onNavigate={onNavigate}
      />

      {/* Floating create post button - only visible in Discussions screen */}
      <CreatePostIcon onPress={() => onNavigate('createPost')} />
    </View>
  );
};

export default Discussions;

