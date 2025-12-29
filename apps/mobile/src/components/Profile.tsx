import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import { getProfile, UserProfile } from '../services';

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
    <View style={styles.container}>
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
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Profile</Text>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#E91E63" />
              <Text style={styles.loadingText}>
                Loading profile...
              </Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <Text style={styles.subtitle}>
                Showing cached user information
              </Text>
              <View style={styles.profileInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{userName}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{userEmail}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              {userId && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>ID:</Text>
                  <Text style={styles.value}>{userId}</Text>
                </View>
              )}

              <View style={styles.infoRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{userName}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userEmail}</Text>
              </View>

              {/* Display any additional profile fields */}
              {profileData && Object.keys(profileData).map((key) => {
                if (key !== 'id' && key !== 'name' && key !== 'email') {
                  return (
                    <View key={key} style={styles.infoRow}>
                      <Text style={styles.label}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </Text>
                      <Text style={styles.value}>
                        {String(profileData[key])}
                      </Text>
                    </View>
                  );
                }
                return null;
              })}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
              activeOpacity={0.8}
            >
              <Text style={styles.signOutButtonText}>Sign Out</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  contentContainer: {
    padding: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#E91E63',
    marginBottom: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#999',
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    paddingVertical: 20,
  },
  errorText: {
    color: '#FF4081',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  profileInfo: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 80,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  signOutButton: {
    backgroundColor: '#E91E63',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Profile;
