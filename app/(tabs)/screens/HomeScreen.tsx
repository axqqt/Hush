// screens/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, AsyncStorage } from 'react-native';
import axios from 'axios';
import PostForm from './PostForm';
import PostList from './PostList';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

interface Post {
  _id: string;
  text: string;
  anonymous: boolean;
  userId: {
    username: string;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve token from route params or AsyncStorage or Redux store
    if (route.params?.token) {
      setToken(route.params.token);
      AsyncStorage.setItem('token', route.params.token);
    } else {
      AsyncStorage.getItem('token').then((storedToken: React.SetStateAction<string | null>) => {
        if (storedToken) {
          setToken(storedToken);
        } else {
          navigation.navigate('Auth');
        }
      });
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const handleLogout = () => {
    // Clear token from AsyncStorage or Redux store
    AsyncStorage.removeItem('token');
    navigation.navigate('Auth');
  };

  const handleCommentSuccess = () => {
    fetchPosts(); // Refresh posts after successful comment
  };

  const handleProfile = () => {
    navigation.navigate('UserProfile', { username: 'DummyUser' });
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Profile" onPress={handleProfile} />
      <PostForm token={token || ''} onSubmitSuccess={fetchPosts} />
      <PostList posts={posts} token={token || ''} onCommentSuccess={handleCommentSuccess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
