// components/PostList.tsx

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CommentForm from './CommentForm';

interface PostListProps {
  posts: Post[];
  token: string;
  onCommentSuccess: () => void;
}

interface Post {
  _id: string;
  text: string;
  anonymous: boolean;
  userId: {
    username: string;
  };
}

const PostList: React.FC<PostListProps> = ({ posts, token, onCommentSuccess }) => {
  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <Text>{item.text}</Text>
      <Text>{item.anonymous ? 'Anonymous' : 'Normal'}</Text>
      <Text>By: {item.userId.username}</Text>
      <CommentForm postId={item._id} token={token} onSubmitSuccess={onCommentSuccess} />
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  postItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default PostList;
