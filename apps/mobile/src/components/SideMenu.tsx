import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';

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
      <View style={styles.container}>
        {/* Overlay */}
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.overlayTouchable}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        {/* Side Menu */}
        <Animated.View
          style={[
            styles.menuContainer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* User Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.profileIcon}>
                <Text style={styles.profileIconText}>👤</Text>
              </View>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuItemsContainer}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemIcon}>{item.icon}</Text>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Sign Out */}
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
              activeOpacity={0.7}
            >
              <Text style={styles.signOutIcon}>🚪</Text>
              <Text style={styles.signOutLabel}>Sign Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    backgroundColor: '#E91E63',
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  profileIconText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  menuItemsContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
  },
  menuItemLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#999',
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
    marginHorizontal: 25,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  signOutIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
  },
  signOutLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#E91E63',
  },
});

export default SideMenu;

