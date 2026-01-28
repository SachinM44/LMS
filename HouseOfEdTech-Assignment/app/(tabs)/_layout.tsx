import { Tabs } from 'expo-router';
import { Globe, PlayCircle } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
          color: theme.colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learning Portal',
          tabBarLabel: 'Portal',
          tabBarIcon: ({ color, size }) => <Globe size={size} color={color} />,
          headerTitle: 'House of EdTech LMS',
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Video Player',
          tabBarLabel: 'Videos',
          tabBarIcon: ({ color, size }) => (
            <PlayCircle size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
