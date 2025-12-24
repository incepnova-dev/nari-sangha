import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { menuIconStyles, knowledgehubIconSources } from '../../styles';

interface KnowledgeHubIconProps {
  isActive: boolean;
  onPress: () => void;
}

const KnowledgeHubIcon: React.FC<KnowledgeHubIconProps> = ({ isActive, onPress }) => {
  // Get the appropriate icon source and style based on isActive prop
  const iconSource = isActive ? knowledgehubIconSources.active : knowledgehubIconSources.inactive;
  const iconStyle = isActive 
    ? menuIconStyles.knowledgehubIconActive 
    : menuIconStyles.knowledgehubIconInactive;

  return (
    <TouchableOpacity
      style={[menuIconStyles.menuItem, isActive && menuIconStyles.menuItemActive]}
      onPress={onPress}
      accessibilityLabel="Navigate to Knowledge Hub"
    >
      <Image
        source={iconSource}
        style={iconStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default KnowledgeHubIcon;

