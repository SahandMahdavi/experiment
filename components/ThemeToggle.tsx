import React from 'react';
import { TouchableOpacity, StyleSheet, useColorScheme as _useColorScheme } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';

type ThemeToggleProps = {
  onToggle?: (theme: 'light' | 'dark') => void;
};

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const toggleColorScheme = () => {
    const newTheme = colorScheme === 'light' ? 'dark' : 'light';
    if (onToggle) {
      onToggle(newTheme);
    }
  };

  return (
    <TouchableOpacity
      style={styles.toggleButton}
      onPress={toggleColorScheme}
      activeOpacity={0.7}>
      <ThemedView style={styles.toggleContainer}>
        <IconSymbol
          name={colorScheme === 'light' ? 'sun.max' : 'moon'}
          size={20}
          color={colorScheme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText type="defaultSemiBold">
          {colorScheme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    gap: 6,
  },
}); 