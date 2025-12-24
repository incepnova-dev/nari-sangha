import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  landingContainer,
  landingContent,
  scrollStyles,
} from '../styles';
import TopMenuBar from './TopMenuBar';
import BottomMenuBar from './BottomMenuBar';

interface KnowledgeHubProps {
  user: any;
  onSignOut: () => void;
  language?: string;
  onNavigate: (
    screen: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub' | 'createCommunity' | 'createPost'
  ) => void;
}

const KnowledgeHub: React.FC<KnowledgeHubProps> = ({
  user,
  onSignOut,
  onNavigate,
}) => {
  const userName =
    user?.user?.name || user?.name || user?.email || 'User';

  // Sample knowledge hub content - replace with actual data from your API/state
  const knowledgeItems = [
    { id: '1', title: 'Article 1', description: 'Description of article 1', category: 'Health' },
    { id: '2', title: 'Article 2', description: 'Description of article 2', category: 'Wellness' },
    { id: '3', title: 'Article 3', description: 'Description of article 3', category: 'Education' },
  ];

  return (
    <View style={landingContainer.container}>
      <TopMenuBar
        userName={userName}
        onProfilePress={() => onNavigate('profile')}
      />

      {/* Scrollable content area */}
      <ScrollView
        style={scrollStyles.scroll}
        contentContainerStyle={scrollStyles.scrollContent}
      >
        <View style={landingContent.contentContainer}>
          <Text style={landingContent.title}>Knowledge Hub</Text>
          
          {knowledgeItems.length === 0 ? (
            <Text style={landingContent.subtitle}>
              No content available
            </Text>
          ) : (
            knowledgeItems.map((item) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: '#1f2937',
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#374151',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: '#9146ff',
                    marginBottom: 8,
                    fontWeight: '600',
                  }}
                >
                  {item.category}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#9CA3AF',
                  }}
                >
                  {item.description}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="knowledgehub"
        onNavigate={onNavigate}
      />
    </View>
  );
};

export default KnowledgeHub;

