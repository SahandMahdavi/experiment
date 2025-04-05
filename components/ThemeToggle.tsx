import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useThemeManager } from '@/hooks/useThemeManager';

export function ThemeToggle() {
  const { theme, setTheme } = useThemeManager();
  
  const toggleColorScheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <TouchableOpacity
      style={styles.toggleButton}
      onPress={toggleColorScheme}
      activeOpacity={0.7}>
      <ThemedView style={styles.toggleContainer}>
        <IconSymbol
          name={theme === 'light' ? 'sun.max' : 'moon'}
          size={20}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText type="defaultSemiBold">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
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