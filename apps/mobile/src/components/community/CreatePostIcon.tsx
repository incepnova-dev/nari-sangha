import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createCommunityIconSource, communityStyles } from '../../styles';

interface CreatePostIconProps {
  onPress: () => void;
}

const CreatePostIcon: React.FC<CreatePostIconProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={communityStyles.floatingButton}
      onPress={onPress}
      accessibilityLabel="Create community"
      activeOpacity={0.8}
    >
      <Image
        source={createCommunityIconSource}
        style={communityStyles.floatingButtonImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default CreatePostIcon;

