// components/UserProfile.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface UserProfileProps {
  username: string;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, onLogout }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome, {username}</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default UserProfile;
