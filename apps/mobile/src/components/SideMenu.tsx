import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { sideMenuStyles } from '../styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = SCREEN_WIDTH * 0.75; // 75% of screen width

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  onPress?: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  navigation,
  user,
  onSignOut,
}) => {
  const slideAnim = React.useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -MENU_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      route: 'HomeLanding',
    },
    {
      id: 'products',
      label: 'Products',
      icon: '🛍️',
      route: 'ProductsOption',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      route: 'Profile',
    },
    {
      id: 'about',
      label: 'About Us',
      icon: 'ℹ️',
      route: 'AboutUs',
    },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.route) {
      navigation?.navigate(item.route);
    } else if (item.onPress) {
      item.onPress();
    }
    onClose();
  };

  const handleSignOut = () => {
    onSignOut?.();
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={sideMenuStyles.container}>
        {/* Overlay */}
        <Animated.View
          style={[
            sideMenuStyles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={sideMenuStyles.overlayTouchable}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        {/* Side Menu */}
        <Animated.View
          style={[
            sideMenuStyles.menuContainer,
            {
              width: MENU_WIDTH,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <ScrollView
            style={sideMenuStyles.scrollView}
            contentContainerStyle={sideMenuStyles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* User Profile Section */}
            <View style={sideMenuStyles.profileSection}>
              <View style={sideMenuStyles.profileIcon}>
                <Text style={sideMenuStyles.profileIconText}>👤</Text>
              </View>
              <Text style={sideMenuStyles.userName}>{userName}</Text>
              <Text style={sideMenuStyles.userEmail}>{user?.email || 'user@example.com'}</Text>
            </View>

            {/* Menu Items */}
            <View style={sideMenuStyles.menuItemsContainer}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={sideMenuStyles.menuItem}
                  onPress={() => handleMenuItemPress(item)}
                  activeOpacity={0.7}
                >
                  <Text style={sideMenuStyles.menuItemIcon}>{item.icon}</Text>
                  <Text style={sideMenuStyles.menuItemLabel}>{item.label}</Text>
                  <Text style={sideMenuStyles.menuItemArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Divider */}
            <View style={sideMenuStyles.divider} />

            {/* Sign Out */}
            <TouchableOpacity
              style={sideMenuStyles.signOutButton}
              onPress={handleSignOut}
              activeOpacity={0.7}
            >
              <Text style={sideMenuStyles.signOutIcon}>🚪</Text>
              <Text style={sideMenuStyles.signOutLabel}>Sign Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SideMenu;

