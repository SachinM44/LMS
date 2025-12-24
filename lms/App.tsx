import { Text, View, Pressable } from 'react-native';
import { useTheme } from './src/hooks';
import { ThemeProvider } from './src/context/ThemeContext';

function TestScreen() {
  const { colors, isDark, toggleTheme } = useTheme();

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
        Hello LMS! 🚀
      </Text>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 16,
          color: colors.textSecondary
        }}
      >
        Theme: {isDark ? 'Dark 🌙' : 'Light ☀️'}
      </Text>

      <Pressable
        onPress={toggleTheme}
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
          backgroundColor: colors.primary
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
          Toggle Theme
        </Text>
      </Pressable>
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
