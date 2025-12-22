import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

const App: React.FC = () => {
  console.log('App is running');
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <Text style={styles.title}>Welcome to NariSangha</Text>
      <Text style={styles.subtitle}>Your React Native Android App</Text>
      <Text style={styles.debugText}>✓ React Native is working!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  debugText: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default App;


