// components/PostForm.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Switch, StyleSheet } from 'react-native';
import axios from 'axios';
import { Text } from 'react-native-paper';

interface PostFormProps {
  token: string;
  onSubmitSuccess: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ token, onSubmitSuccess }) => {
  const [postText, setPostText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/posts',
        { text: postText, anonymous: isAnonymous },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPostText('');
      onSubmitSuccess();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your story..."
        value={postText}
        onChangeText={setPostText}
        multiline
      />
      <View style={styles.switchContainer}>
        <Text>Post as Anonymous:</Text>
        <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
      </View>
      <Button title="Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default PostForm;
