import React from 'react';
import { View } from 'react-native';
import { bottomMenuBarStyles } from '../styles';
import HomeIcon from './bottomMenu/HomeIcon';
import DiscoverIcon from './bottomMenu/DiscoverIcon';
import TrackIcon from './bottomMenu/TrackIcon';
import ProductsIcon from './bottomMenu/ProductsIcon';

interface BottomMenuBarProps {
  activeScreen?: 'home' | 'discover' | 'track' | 'products';
  onNavigate: (screen: 'home' | 'discover' | 'track' | 'products') => void;
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
      <DiscoverIcon
        isActive={activeScreen === 'discover'}
        onPress={() => onNavigate('discover')}
      />
      <TrackIcon
        isActive={activeScreen === 'track'}
        onPress={() => onNavigate('track')}
      />
      <ProductsIcon
        isActive={activeScreen === 'products'}
        onPress={() => onNavigate('products')}
      />
    </View>
  );
};

export default BottomMenuBar;
