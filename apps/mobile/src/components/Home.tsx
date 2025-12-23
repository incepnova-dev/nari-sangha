import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { landingContainer, landingContent, buttons } from '../styles';

interface HomeProps {
  user: any;
  onSignOut: () => void;
  language?: string;
}

const Home: React.FC<HomeProps> = ({ user, onSignOut }) => {
  const userName =
    user?.user?.name || user?.name || user?.email || 'User';

  return (
    <View style={landingContainer.container}>
      <View style={landingContent.contentContainer}>
        <Text style={landingContent.title}>{`Welcome, ${userName}`}</Text>

        <TouchableOpacity
          style={[buttons.button, buttons.secondaryButton, { marginTop: 24 }]}
          onPress={onSignOut}
        >
          <Text style={buttons.secondaryButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;


