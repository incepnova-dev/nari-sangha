import React from 'react';
import { View } from 'react-native';
import { bottomMenuBarStyles } from '../styles';
import HomeIcon from './bottomMenu/HomeIcon';
import CommunityIcon from './bottomMenu/CommunityIcon';
import DiscussionsIcon from './bottomMenu/DiscussionsIcon';
import ProductsIcon from './bottomMenu/ProductsIcon';
import KnowledgeHubIcon from './bottomMenu/KnowledgeHubIcon';

interface BottomMenuBarProps {
  activeScreen?: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub';
  onNavigate: (screen: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub') => void;
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

      <ProductsIcon
        isActive={activeScreen === 'products'}
        onPress={() => onNavigate('products')}
      />

      <KnowledgeHubIcon
        isActive={activeScreen === 'knowledgehub'}
        onPress={() => onNavigate('knowledgehub')}
      />
    </View>
  );
};

export default BottomMenuBar;

