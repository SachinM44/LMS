import { Text, View, Pressable } from 'react-native';
import { useTheme } from './src/hooks';
import { ThemeProvider } from './src/context/ThemeContext';
import { SearchBar } from './src/components/SearchBar';
import { DarkModeToggle } from './src/components/DarkModeToggle';
import { Header } from './src/components/Header';

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>





        <Header searchQuery='value' />

      </View>
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
