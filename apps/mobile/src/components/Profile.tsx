import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  landingContainer,
  landingContent,
  buttons,
  profileStyles,
  modalStyles,
} from '../styles';
import TopMenuBar from './TopMenuBar';
import BottomMenuBar from './BottomMenuBar';
import { getProfile, UserProfile } from '../services/profileService';

interface ProfileProps {
  user: any;
  onSignOut: () => void;
  language?: string;
  onNavigate: (screen: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub') => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onSignOut, onNavigate }) => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract token from user prop (from login response)
  const token = user?.token || user?.data?.token;

  // Fallback to user data from login response
  const fallbackName = user?.user?.name || user?.name || 'User';
  const fallbackEmail = user?.user?.email || user?.email || 'No email';

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError('No authentication token available');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await getProfile(token);
        
        if (result.success && result.data) {
          setProfileData(result.data);
        } else {
          setError(result.error || 'Failed to fetch profile');
        }
      } catch (err: any) {
        setError(err?.message || 'An error occurred while fetching profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Use profile data from API if available, otherwise fallback to user prop
  const userName = profileData?.name || fallbackName;
  const userEmail = profileData?.email || fallbackEmail;
  const userId = profileData?.id || user?.user?.id || user?.id;

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

          {isLoading ? (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <ActivityIndicator size="large" color="#9146ff" />
              <Text style={{ color: '#9CA3AF', marginTop: 16 }}>
                Loading profile...
              </Text>
            </View>
          ) : error ? (
            <View style={{ paddingVertical: 20 }}>
              <Text style={modalStyles.errorText}>{error}</Text>
              <Text style={landingContent.subtitle}>
                Showing cached user information
              </Text>
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
            </View>
          ) : (
            <View style={profileStyles.profileInfo}>
              {userId && (
                <View style={profileStyles.infoRow}>
                  <Text style={profileStyles.label}>ID:</Text>
                  <Text style={profileStyles.value}>{userId}</Text>
                </View>
              )}

              <View style={profileStyles.infoRow}>
                <Text style={profileStyles.label}>Name:</Text>
                <Text style={profileStyles.value}>{userName}</Text>
              </View>

              <View style={profileStyles.infoRow}>
                <Text style={profileStyles.label}>Email:</Text>
                <Text style={profileStyles.value}>{userEmail}</Text>
              </View>

              {/* Display any additional profile fields */}
              {profileData && Object.keys(profileData).map((key) => {
                if (key !== 'id' && key !== 'name' && key !== 'email') {
                  return (
                    <View key={key} style={profileStyles.infoRow}>
                      <Text style={profileStyles.label}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </Text>
                      <Text style={profileStyles.value}>
                        {String(profileData[key])}
                      </Text>
                    </View>
                  );
                }
                return null;
              })}
            </View>
          )}

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

