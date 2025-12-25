import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from './SearchBar';
import { DarkModeToggle } from './DarkModeToggle';
import { useTheme } from '../hooks';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
          }}
        >
          Learning Activities
        </Text>
        <DarkModeToggle />
      </View>
      <SearchBar  value={searchQuery} onChangeText={onSearchChange} />
    </View>
  );
};
