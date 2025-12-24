import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  landingContainer,
  landingContent,
  buttons,
  profileStyles,
} from '../styles';
import TopMenuBar from './TopMenuBar';
import BottomMenuBar from './BottomMenuBar';

interface ProfileProps {
  user: any;
  onSignOut: () => void;
  language?: string;
  onNavigate: (screen: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'createCommunity') => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onSignOut, onNavigate }) => {
  const userName = user?.user?.name || user?.name || 'User';
  const userEmail = user?.user?.email || user?.email || 'No email';

  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <View style={landingContainer.container}>
      <TopMenuBar
        userName={userName}
        onProfilePress={() => onNavigate('profile')}
        isProfileActive={true}
      />

      {/* Scrollable content area */}
      <ScrollView
        style={profileStyles.scroll}
        contentContainerStyle={profileStyles.scrollContent}
      >
        <View style={landingContent.contentContainer}>
          <Text style={landingContent.title}>Profile</Text>

          <View style={profileStyles.profileInfo}>
            <View style={profileStyles.infoRow}>
              <Text style={profileStyles.label}>Name:</Text>
              <Text style={profileStyles.value}>{userName}</Text>
            </View>

            <View style={profileStyles.infoRow}>
              <Text style={profileStyles.label}>Email:</Text>
              <Text style={profileStyles.value}>{userEmail}</Text>
            </View>
          </View>

          <View style={profileStyles.buttonContainer}>
            <TouchableOpacity
              style={[buttons.button, buttons.secondaryButton, profileStyles.button]}
              onPress={handleSignOut}
            >
              <Text style={buttons.secondaryButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="profile"
        onNavigate={onNavigate}
      />
    </View>
  );
};

export default Profile;

