// screens/AuthScreen.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import AuthForm from './AuthForm';
import axios from 'axios';

interface AuthScreenProps {
  navigation: any;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      const authToken = response.data.token;
      // Save token to AsyncStorage or Redux store
      navigation.navigate('Home', { token: authToken });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      await axios.post('http://localhost:3000/api/signup', { email, password });
      handleLogin(email, password); // Auto login after signup
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
      <AuthForm onSubmit={handleSignup} buttonText="Sign Up" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});

export default AuthScreen;
