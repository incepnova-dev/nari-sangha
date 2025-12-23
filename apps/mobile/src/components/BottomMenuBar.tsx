import React from 'react';
import { View } from 'react-native';
import { bottomMenuBarStyles } from '../styles';
import HomeIcon from './bottomMenu/HomeIcon';
import CommunityIcon from './bottomMenu/CommunityIcon';
import DiscussionsIcon from './bottomMenu/DiscussionsIcon';
import CreateCommunityIcon from './bottomMenu/CreateCommunityIcon';

interface BottomMenuBarProps {
  activeScreen?: 'home' | 'community' | 'profile' | 'discussions' | 'createCommunity';
  onNavigate: (screen: 'home' | 'community' | 'profile' | 'discussions' | 'createCommunity') => void;
}

const BottomMenuBar: React.FC<BottomMenuBarProps> = ({
  activeScreen = 'home',
  onNavigate,
}) => {
  return (
    <View style={bottomMenuBarStyles.bottomBar}>
      <HomeIcon
        isActive={activeScreen === 'home'}
        onPress={() => onNavigate('home')}
      />

      <CommunityIcon
        isActive={activeScreen === 'community'}
        onPress={() => onNavigate('community')}
      />

      <DiscussionsIcon
        isActive={activeScreen === 'discussions'}
        onPress={() => onNavigate('discussions')}
      />

      <CreateCommunityIcon
        isActive={activeScreen === 'createCommunity'}
        onPress={() => onNavigate('createCommunity')}
      />
    </View>
  );
};

export default BottomMenuBar;

