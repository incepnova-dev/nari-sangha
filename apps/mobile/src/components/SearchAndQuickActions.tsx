import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface SearchAndQuickActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onQuickActionPress?: (action: string) => void;
}

const SearchAndQuickActions: React.FC<SearchAndQuickActionsProps> = ({
  searchQuery,
  onSearchChange,
  onQuickActionPress,
}) => {
  const quickActions = [
    { icon: '🛍️', label: 'Shop', id: 'shop' },
    { icon: '🏥', label: 'Hospitals', id: 'hospitals' },
    { icon: '👩‍⚕️', label: 'Doctors', id: 'doctors' },
    { icon: '📅', label: 'Calendar', id: 'calendar' },
  ];

  const handleQuickAction = (actionId: string) => {
    onQuickActionPress?.(actionId);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products, conditions, doctors..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      {/* Quick Actions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickActionsContainer}
        contentContainerStyle={styles.quickActions}
      >
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.quickActionBtn}
            onPress={() => handleQuickAction(action.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.quickActionIcon}>{action.icon}</Text>
            <Text style={styles.quickActionText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 20,
    color: '#E91E63',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  quickActionsContainer: {
    marginTop: 20,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  quickActionBtn: {
    width: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

export default SearchAndQuickActions;

