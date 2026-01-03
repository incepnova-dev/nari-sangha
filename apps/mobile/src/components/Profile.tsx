import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import { getProfile, UserProfile } from '../services';
import {
  containerStyles,
  headerStyles,
  profileStyles,
} from '../styles';

interface ProfileProps {
  user: any;
  onSignOut: () => void;
  language?: string;
  onNavigate: (screen: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub' | 'createCommunity' | 'createPost') => void;
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
    <View style={containerStyles.containerSecondary}>
      <StatusBar barStyle="light-content" />
      
      <WelcomeHeader
        userName={userName}
        onProfilePress={() => {
          // Already on profile page
        }}
        isProfileActive={true}
      />

      {/* Scrollable content area */}
      <ScrollView
        style={profileStyles.scroll}
        contentContainerStyle={profileStyles.scrollContent}
      >
        <View style={containerStyles.contentContainer}>
          <Text style={headerStyles.sectionTitle}>Profile</Text>

          {isLoading ? (
            <View style={profileStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#E91E63" />
              <Text style={profileStyles.loadingText}>
                Loading profile...
              </Text>
            </View>
          ) : error ? (
            <View style={profileStyles.errorContainer}>
              <Text style={profileStyles.errorText}>{error}</Text>
              <Text style={profileStyles.subtitle}>
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
              style={profileStyles.signOutButton}
              onPress={handleSignOut}
              activeOpacity={0.8}
            >
              <Text style={profileStyles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="home"
        onNavigate={(screen) => {
          if (screen === 'home') {
            onNavigate('home');
          }
        }}
      />
    </View>
  );
};

export default Profile;
