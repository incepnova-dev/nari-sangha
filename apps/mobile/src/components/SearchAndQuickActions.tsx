import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { searchAndQuickActionsStyles } from '../styles';

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
    <View style={searchAndQuickActionsStyles.container}>
      {/* Search Bar */}
      <View style={searchAndQuickActionsStyles.searchBar}>
        <Text style={searchAndQuickActionsStyles.searchIcon}>🔍</Text>
        <TextInput
          style={searchAndQuickActionsStyles.searchInput}
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
        style={searchAndQuickActionsStyles.quickActionsContainer}
        contentContainerStyle={searchAndQuickActionsStyles.quickActions}
      >
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={searchAndQuickActionsStyles.quickActionBtn}
            onPress={() => handleQuickAction(action.id)}
            activeOpacity={0.8}
          >
            <Text style={searchAndQuickActionsStyles.quickActionIcon}>{action.icon}</Text>
            <Text style={searchAndQuickActionsStyles.quickActionText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchAndQuickActions;

