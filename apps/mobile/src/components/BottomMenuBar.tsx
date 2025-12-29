import React from 'react';
import { View, StyleSheet } from 'react-native';
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
    <View style={[bottomMenuBarStyles.bottomBar, styles.bottomBar]}>
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

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
});

export default BottomMenuBar;
