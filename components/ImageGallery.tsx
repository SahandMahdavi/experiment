import React, { useState, useRef, ReactNode, useMemo } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,

} from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ThemeToggle } from './ThemeToggle';
import { useThemeManager } from '@/hooks/useThemeManager';

const { width } = Dimensions.get('window');
const ASPECT_RATIO = 16 / 9;
const IMAGE_HEIGHT = width / ASPECT_RATIO;

type GalleryItem = {
  id: string;
  image: string; // URL string for the image
  title: string;
  description: ReactNode; // Can be text or React components
};

type ImageGalleryProps = {
  items: GalleryItem[];
};

export function ImageGallery({ items }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { theme } = useThemeManager();


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleDotPress = (index: number) => {
    // Commented out scrolling functionality
    // scrollViewRef.current?.scrollTo({ x: width * index, animated: true });
    
    // Update the active index which will trigger the useEffect to update the scroll position
    setActiveIndex(index);
  };

  const slides = useMemo(() => {
    const image = items[activeIndex].image
    return items.map((item) => (
      <View key={item.id} style={styles.slide}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      </View>
    ))
  }, [items, activeIndex])

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.mainScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.galleryContainer}>
          <ThemeToggle />
          
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.scrollView}
          >
          {slides}            
          </ScrollView>
            <View style={styles.paginationContainer}>
              {items.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dot,
                    index === activeIndex && styles.activeDot,
                    { backgroundColor: index === activeIndex 
                      ? (theme === 'light' ? '#ff0000' : '#fff') 
                      : (theme === 'light' ? '#CCCCCC' : '#666666') 
                    }
                  ]}
                  onPress={() => handleDotPress(index)}
                />
              ))}
          </View>
          
        </View>
        
        <ThemedView style={styles.contentContainer}>
          <ThemedView style={styles.contentHeader}>
            <ThemedText type="title">{items[activeIndex].title}</ThemedText>
          </ThemedView>
          
          {typeof items[activeIndex].description === 'string' ? (
            <ThemedText style={styles.contentText}>{items[activeIndex].description}</ThemedText>
          ) : (
            items[activeIndex].description
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainScrollContainer: {
    flexGrow: 1,
  },
  galleryContainer: {
    height: IMAGE_HEIGHT + 50, // Image height plus space for pagination dots
    position: 'relative',
  },
  scrollView: {
    width: width,
    height: IMAGE_HEIGHT,
  },
  slide: {
    width: width,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: width,
    height: IMAGE_HEIGHT,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
  },
  contentContainer: {
    padding: 16,
    minHeight: 300,
  },
  contentHeader: {
    marginBottom: 16,
  },
  contentText: {
    lineHeight: 24,
  },
}); 