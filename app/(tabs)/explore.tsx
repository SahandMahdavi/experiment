import React from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';

import { FeaturedCard } from '@/components/FeaturedCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const featuredItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Development',
    title: 'Building Modern React Native Applications',
    description: 'Learn how to create responsive, performant applications using React Native and Expo. This guide covers everything from setup to deployment.',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Design',
    title: 'UI/UX Design Patterns in Mobile Apps',
    description: 'Explore the latest design patterns and techniques to create engaging user experiences for mobile applications.',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Technology',
    title: 'AI Integration in Mobile Applications',
    description: 'Discover how to leverage artificial intelligence technologies to enhance your mobile app features and user engagement.',
  }
];

export default function ExploreScreen() {
  const handlePress = (id: string) => {
    Alert.alert('Featured Item', `You pressed item ${id}`);
  };

  const handleBookmarkPress = (id: string) => {
    Alert.alert('Bookmark', `You toggled the bookmark status for item ${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title">Explore</ThemedText>
        <ThemedText>Discover trending topics and features</ThemedText>
      </ThemedView>
      
      {featuredItems.map((item) => (
        <FeaturedCard
          key={item.id}
          image={item.image}
          category={item.category}
          title={item.title}
          description={item.description}
          onPress={() => handlePress(item.id)}
          onBookmarkPress={() => handleBookmarkPress(item.id)}
          isBookmarked={item.id === '2'} // Mark the second item as bookmarked for demonstration
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    paddingTop: 24,
    gap: 8,
    marginBottom: 8,
  },
  sectionContainer: {
    padding: 16,
    gap: 8,
  },
});
