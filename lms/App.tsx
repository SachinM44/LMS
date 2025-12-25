import { Text, View, Pressable } from 'react-native';
import { useTheme } from './src/hooks';
import { ThemeProvider } from './src/context/ThemeContext';
import { SearchBar } from './src/components/SearchBar';
import { DarkModeToggle } from './src/components/DarkModeToggle';

function TestScreen() {
  const { colors, isDark, toggleTheme } = useTheme();

  const onChangeText=()=>{
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
      <DarkModeToggle />

      <SearchBar 
      placeholder='hello there'
      onChangeText={onChangeText}
      value='' />
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
