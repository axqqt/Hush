// components/CommentForm.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

interface CommentFormProps {
  postId: string;
  token: string;
  onSubmitSuccess: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, token, onSubmitSuccess }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/comments',
        { postId, text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText('');
      onSubmitSuccess();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your comment..."
        value={commentText}
        onChangeText={setCommentText}
        multiline
      />
      <Button title="Comment" onPress={handleSubmit} />
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
});

export default CommentForm;
