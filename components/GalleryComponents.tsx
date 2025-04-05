import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useThemeManager } from '@/hooks/useThemeManager';

// Feature list component for listing key features
export const FeatureList = ({ features }: { features: string[] }) => {
  const { theme } = useThemeManager();
  const bulletColor = theme === 'light' ? Colors.light.tint : Colors.dark.tint;
  
  return (
    <ThemedView style={styles.featureContainer}>
      <ThemedText type="subtitle" style={styles.featureTitle}>Key Features</ThemedText>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <View style={[styles.bullet, { backgroundColor: bulletColor }]} />
          <ThemedText style={styles.featureText}>{feature}</ThemedText>
        </View>
      ))}
    </ThemedView>
  );
};

// Action buttons component
export const ActionButtons = ({ 
  primaryAction, 
  secondaryAction 
}: { 
  primaryAction: { title: string; onPress: () => void },
  secondaryAction: { title: string; onPress: () => void }
}) => {
  const { theme } = useThemeManager();
  
  return (
    <ThemedView style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[
          styles.button, 
          styles.primaryButton,
          { backgroundColor: theme === 'light' ? Colors.light.tint : Colors.dark.tint }
        ]}
        onPress={primaryAction.onPress}
      >
        <ThemedText style={[styles.buttonText, { color: '#fff' }]}>
          {primaryAction.title}
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.button, 
          styles.secondaryButton,
          { 
            borderColor: theme === 'light' ? Colors.light.tint : Colors.dark.tint 
          }
        ]}
        onPress={secondaryAction.onPress}
      >
        <ThemedText style={[
          styles.buttonText, 
          { color: theme === 'light' ? Colors.light.tint : Colors.dark.tint }
        ]}>
          {secondaryAction.title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

// Card component for displaying info cards
export const InfoCards = ({ cards }: { cards: { title: string; content: string }[] }) => {
  const { theme } = useThemeManager();
  
  return (
    <ThemedView style={styles.cardsContainer}>
      {cards.map((card, index) => (
        <ThemedView 
          key={index} 
          style={[
            styles.card,
            { 
              borderColor: theme === 'light' ? '#E6E6E6' : '#444444',
              shadowColor: theme === 'light' ? '#000000' : 'transparent'
            }
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            {card.title}
          </ThemedText>
          <ThemedText style={styles.cardContent}>
            {card.content}
          </ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
};

// Progress component
export const ProgressBar = ({ 
  steps, 
  currentStep 
}: { 
  steps: string[], 
  currentStep: number 
}) => {
  const { theme } = useThemeManager();
  const activeColor = theme === 'light' ? Colors.light.tint : Colors.dark.tint;
  const inactiveColor = theme === 'light' ? '#E6E6E6' : '#444444';
  
  return (
    <ThemedView style={styles.progressContainer}>
      <ThemedText type="subtitle" style={styles.progressTitle}>Progress</ThemedText>
      
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <View style={[
              styles.stepDot,
              { 
                backgroundColor: index <= currentStep ? activeColor : inactiveColor,
                borderColor: index <= currentStep ? activeColor : inactiveColor
              }
            ]}>
              {index < currentStep && (
                <IconSymbol 
                  name="chevron.right" 
                  size={12} 
                  color="#FFFFFF"
                />
              )}
            </View>
            {index < steps.length - 1 && (
              <View style={[
                styles.stepLine,
                { backgroundColor: index < currentStep ? activeColor : inactiveColor }
              ]} />
            )}
          </View>
        ))}
      </View>
      
      <ThemedText type="defaultSemiBold" style={styles.currentStepText}>
        {steps[currentStep]}
      </ThemedText>
    </ThemedView>
  );
};

// Interactive elements component with clickable items
export const InteractiveList = ({ 
  items, 
  onItemPress 
}: { 
  items: { id: string; title: string; description: string }[], 
  onItemPress: (id: string) => void 
}) => {
  const { theme } = useThemeManager();
  
  const renderItem = ({ item }: { item: { id: string; title: string; description: string } }) => (
    <TouchableOpacity 
      style={[
        styles.listItem,
        { 
          borderColor: theme === 'light' ? '#E6E6E6' : '#444444',
          backgroundColor: theme === 'light' ? '#FFFFFF' : '#2A2A2A'
        }
      ]}
      onPress={() => onItemPress(item.id)}
    >
      <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
      <ThemedText style={styles.listItemDescription}>{item.description}</ThemedText>
      <View style={styles.listItemArrow}>
        <IconSymbol
          name="chevron.right"
          size={16}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
      </View>
    </TouchableOpacity>
  );
  
  return (
    <ThemedView style={styles.listContainer}>
      <ThemedText type="subtitle" style={styles.listTitle}>Select an Option</ThemedText>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        scrollEnabled={false}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  // Feature List styles
  featureContainer: {
    marginBottom: 20,
  },
  featureTitle: {
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  featureText: {
    flex: 1,
  },
  
  // Action Buttons styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  primaryButton: {
    borderWidth: 0,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Info Cards styles
  cardsContainer: {
    flexDirection: 'column',
    marginVertical: 20,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardContent: {
    lineHeight: 20,
  },
  
  // Progress Bar styles
  progressContainer: {
    marginVertical: 20,
  },
  progressTitle: {
    marginBottom: 12,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    zIndex: 1,
  },
  stepLine: {
    height: 2,
    width: 30,
  },
  currentStepText: {
    textAlign: 'center',
  },
  
  // Interactive List styles
  listContainer: {
    marginVertical: 20,
  },
  listTitle: {
    marginBottom: 12,
  },
  list: {
    width: '100%',
  },
  listItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    position: 'relative',
    paddingRight: 32,
  },
  listItemDescription: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.8,
  },
  listItemArrow: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
}); 