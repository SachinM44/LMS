import React from 'react';
import { Pressable } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '../hooks';

export const DarkModeToggle: React.FC = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={{
        padding: 8,
        borderRadius: 8,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun size={20} color={colors.text} />
      ) : (
        <Moon size={20} color={colors.text} />
      )}
    </Pressable>
  );
};
