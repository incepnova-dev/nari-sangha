import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createPostIconSource, discussionsStyles } from '../../styles';

interface CreatePostIconProps {
  onPress: () => void;
}

const CreatePostIcon: React.FC<CreatePostIconProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={discussionsStyles.floatingButton}
      onPress={onPress}
      accessibilityLabel="Create new post"
      activeOpacity={0.8}
    >
      <Image
        source={createPostIconSource}
        style={discussionsStyles.floatingButtonImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default CreatePostIcon;

