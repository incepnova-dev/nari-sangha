import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { searchAndQuickActionsStyles, icons } from '../styles';

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
    { icon: icons.products, label: 'Shop', id: 'shop' },
    { icon: icons.hospital, label: 'Hospitals', id: 'hospitals' },
    { icon: icons.doctor, label: 'Doctors', id: 'doctors' },
    { icon: icons.calendar, label: 'Calendar', id: 'calendar' },
  ];

  const handleQuickAction = (actionId: string) => {
    onQuickActionPress?.(actionId);
  };

  return (
    <View style={searchAndQuickActionsStyles.container}>
      {/* Search Bar */}
      <View style={searchAndQuickActionsStyles.searchBar}>
        <Text style={searchAndQuickActionsStyles.searchIcon}>{icons.search}</Text>
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

