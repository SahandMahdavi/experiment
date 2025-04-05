import React from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  ImageSourcePropType,
  useWindowDimensions,
  Platform
} from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const PHONE_BREAKPOINT = 768; // Typical tablet breakpoint

type FeaturedCardProps = {
  image: string;
  category: string;
  title: string;
  description: string;
  onPress: () => void;
  onBookmarkPress: () => void;
  isBookmarked?: boolean;
};

export function FeaturedCard({
  image,
  category,
  title,
  description,
  onPress,
  onBookmarkPress,
  isBookmarked = false,
}: FeaturedCardProps) {
  const { width } = useWindowDimensions();
  const theme = useColorScheme() ?? 'light';
  
  const isTablet = width >= PHONE_BREAKPOINT;
  
  // For phone: full width with 16px margins on each side
  const phoneImageWidth = width - 32;
  // For tablet: half width (minus margin)
  const tabletImageWidth = (width / 2) - 24;
  
  const imageWidth = isTablet ? tabletImageWidth : phoneImageWidth;
  const imageHeight = 584; // Fixed height as requested
  
  const renderContent = () => (
    <View style={styles.contentContainer}>
      <ThemedText 
        style={[styles.category, { color: '#FF0000' }]}>
        {category.toUpperCase()}
      </ThemedText>
      
      <ThemedText 
        style={[
          styles.title, 
          { color: isTablet ? (theme === 'light' ? '#000000' : '#FFFFFF') : '#FFFFFF' }
        ]}>
        {title}
      </ThemedText>
      
      <ThemedText 
        style={[
          styles.description, 
          { color: isTablet ? (theme === 'light' ? '#333333' : '#CCCCCC') : '#EEEEEE' }
        ]}
        numberOfLines={isTablet ? 4 : 2}>
        {description}
      </ThemedText>
    </View>
  );

  const renderBookmarkButton = () => (
    <TouchableOpacity 
      style={[
        styles.bookmarkButton,
        isTablet ? styles.tabletBookmarkButton : styles.phoneBookmarkButton,
        { backgroundColor: isBookmarked ? '#FF0000' : 'rgba(255, 255, 255, 0.2)' }
      ]} 
      onPress={onBookmarkPress}
    >
      <IconSymbol
        name="paperplane.fill" // Using available icon as bookmark placeholder
        size={24}
        color={isTablet ? (theme === 'light' ? '#000000' : '#FFFFFF') : '#FFFFFF'}
      />
    </TouchableOpacity>
  );

  // Tablet layout
  if (isTablet) {
    return (
      <ThemedView style={styles.tabletContainer}>
        <View style={styles.tabletTextColumn}>
          <View style={styles.tabletTextContent}>
            {renderContent()}
          </View>
          {renderBookmarkButton()}
        </View>
        
        <TouchableOpacity 
          style={[styles.tabletImageColumn, { width: imageWidth }]}
          onPress={onPress}
          activeOpacity={0.9}
        >
          <Image 
            source={{ uri: image }} 
            style={[
              styles.image, 
              { 
                width: imageWidth, 
                height: imageHeight 
              }
            ]} 
            resizeMode="cover"
          />
        </TouchableOpacity>
      </ThemedView>
    );
  }
  
  // Phone layout
  return (
    <ThemedView style={styles.phoneContainer}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image 
          source={{ uri: image }} 
          style={[
            styles.image, 
            { 
              width: imageWidth, 
              height: imageHeight 
            }
          ]} 
          resizeMode="cover"
        />
        
        <View style={styles.phoneOverlay}>
          <View style={styles.phoneContentContainer}>
            {renderContent()}
            {renderBookmarkButton()}
          </View>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Common styles
  image: {
    borderRadius: 12,
  },
  contentContainer: {
    gap: 8,
  },
  category: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  bookmarkButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Phone layout styles
  phoneContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
  },
  phoneOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  phoneContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  phoneBookmarkButton: {
    marginLeft: 16,
  },
  
  // Tablet layout styles
  tabletContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 16,
  },
  tabletTextColumn: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  tabletTextContent: {
    flex: 1,
  },
  tabletBookmarkButton: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  tabletImageColumn: {
    borderRadius: 12,
    overflow: 'hidden',
  }
}); 