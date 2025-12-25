import { Text, View, Pressable } from 'react-native';
import { useTheme } from './src/hooks';
import { ThemeProvider } from './src/context/ThemeContext';
import { SearchBar } from './src/components/SearchBar';
import { DarkModeToggle } from './src/components/DarkModeToggle';
import { Header } from './src/components/Header';
import { FilterChip } from './src/components/FilterChip';
import { FilterBar } from './src/components/FilterBar';
import { ClassCard } from './src/components/ClassCard';
import { AssessmentCard } from './src/components/AssessmentCard';
import { ActivityList } from './src/components/ActivityList';
import { Sidebar } from './src/components/Sidebar';
import { BottomTabBar } from './src/components/BottomTabBar';

function TestScreen() {
  const { colors, isDark, toggleTheme } = useTheme();

  const onChangeText = () => {
    console.log('hello there ')
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 16,
          color: colors.text
        }}
      >
      </Text>

      <BottomTabBar />


    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TestScreen />
    </ThemeProvider>
  );
}
