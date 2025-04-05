import React from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { ImageGallery } from '@/components/ImageGallery';
import { 
  FeatureList, 
  ActionButtons, 
  InfoCards, 
  ProgressBar, 
  InteractiveList 
} from '@/components/GalleryComponents';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Alert function for button presses
const showAlert = (message: string) => {
  Alert.alert('Action', message);
};

const galleryItems = [
  {
    id: '1',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.GvntOdvz80txbfbW4rz2kAHaEo%26pid%3DApi&f=1&ipt=e938b670c7a4014f8aeafc107af7aebb1d77a82c8688ed727e070e382bbfb0c7&ipo=images',
    title: 'React Native Development',
    description: (
      <ThemedView>
        <ThemedText style={{ marginBottom: 15 }}>
          React Native lets you create truly native apps and doesn't compromise users' experiences.
        </ThemedText>
        
        <FeatureList features={[
          "Write once, run anywhere with JavaScript",
          "Native components for better performance",
          "Hot-reloading for faster development",
        ]} />
        
        <ActionButtons 
          primaryAction={{ 
            title: "Get Started", 
            onPress: () => showAlert("Let's get started with React Native!")
          }}
          secondaryAction={{ 
            title: "Learn More", 
            onPress: () => showAlert("Opening documentation...")
          }}
        />
      </ThemedView>
    ),
  },
  {
    id: '2',
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mIdl6moE4YyTl2UV6lDKYgHaEo%26pid%3DApi&f=1&ipt=09161cf6cfb181ef4c572c520d6cc02da043133add1f11def55876403d8b48bf&ipo=images",
    title: 'Expo Workflow',
    description: (
      <ThemedView>
        <ThemedText style={{ marginBottom: 15 }}>
          Expo is an open-source framework for apps that run natively on Android, iOS, and the web.
        </ThemedText>
        
        <InfoCards cards={[
          {
            title: "Quick Setup",
            content: "Get started with a new project in minutes without complex configuration."
          },
          {
            title: "Built-in Components",
            content: "Access to camera, maps, notifications, and more with pre-built components."
          },
          {
            title: "OTA Updates",
            content: "Update your app without going through app store review process."
          }
        ]} />
      </ThemedView>
    ),
  },
  {
    id: '3',
    image: 'https://assets-global.website-files.com/63634f4a7b868a399577cf37/64665685a870fadf4bb171c2_labrador%20americano.jpg',
    title: 'TypeScript Benefits',
    description: (
      <ThemedView>
        <ThemedText style={{ marginBottom: 15 }}>
          TypeScript adds type safety to JavaScript, helping catch errors early in development.
        </ThemedText>
        
        <ProgressBar 
          steps={["Install TypeScript", "Configure Project", "Write Code", "Build & Deploy"]} 
          currentStep={2}
        />
        
        <ActionButtons 
          primaryAction={{ 
            title: "Try TypeScript", 
            onPress: () => showAlert("Setting up TypeScript...")
          }}
          secondaryAction={{ 
            title: "See Examples", 
            onPress: () => showAlert("Loading examples...")
          }}
        />
      </ThemedView>
    ),
  },
  {
    id: '4',
    image: 'https://i0.wp.com/bcc-newspack.s3.amazonaws.com/uploads/2023/05/052323-Foxes-in-Millennium-Park-Colin-Boyle-9124.jpg?fit=1650%2C1099&ssl=1',
    title: 'Cross-Platform Development',
    description: (
      <ThemedView>
        <ThemedText style={{ marginBottom: 15 }}>
          Build apps for multiple platforms from a single codebase.
        </ThemedText>
        
        <InteractiveList
          items={[
            {
              id: "ios",
              title: "iOS Development",
              description: "Build for iPhone and iPad devices"
            },
            {
              id: "android",
              title: "Android Development",
              description: "Create apps for the world's most popular mobile OS"
            },
            {
              id: "web",
              title: "Web Development",
              description: "Extend your app to run in browsers too"
            }
          ]}
          onItemPress={(id) => showAlert(`Selected platform: ${id}`)}
        />
      </ThemedView>
    ),
  },
  {
    id: '5',
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.QMS_8HGFbD7veA8PNGlpaAHaFj%26pid%3DApi&f=1&ipt=7bcf7950b98a2e43bfaa67419996bbb43208fce1a83ade40e3bacde104358dec&ipo=images",
    title: 'Modern UI Design',
    description: (
      <ThemedView>
        <ThemedText style={{ marginBottom: 15 }}>
          Create beautiful, responsive user interfaces that look great on any device.
        </ThemedText>
        
        <FeatureList features={[
          "Responsive layouts for all screen sizes",
          "Consistent visual language across platforms",
          "Accessible design for all users"
        ]} />
        
        <InfoCards cards={[
          {
            title: "Design Systems",
            content: "Create a cohesive design system with reusable components."
          },
          {
            title: "UI Animation",
            content: "Add subtle animations to enhance user experience."
          }
        ]} />
      </ThemedView>
    ),
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ImageGallery items={galleryItems} />
      </View>
    </SafeAreaView>
  );
}
