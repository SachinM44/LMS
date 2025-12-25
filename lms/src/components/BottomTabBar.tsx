import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Home, BookOpen, FileText, User } from 'lucide-react-native';
import { useTheme } from '../hooks';

export const BottomTabBar: React.FC = () => {
    const { colors } = useTheme();
    ///checking here 
    if (Platform.OS === 'web') {
        return null;
    }

    const tabs = [
        { icon: Home, label: 'Home', active: true },
        { icon: BookOpen, label: 'Courses', active: false },
        { icon: FileText, label: 'Tasks', active: false },
        { icon: User, label: 'Profile', active: false },
    ];

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: colors.card,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                paddingVertical: 8,
                paddingBottom: 20, // Extra padding for iOS safe area
            }}
        >
            {tabs.map((tab, index) => (
                <Pressable
                    key={index}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingVertical: 8,
                    }}
                >
                    <tab.icon
                        size={24}
                        color={tab.active ? colors.primary : colors.textSecondary}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            marginTop: 4,
                            color: tab.active ? colors.primary : colors.textSecondary,
                            fontWeight: tab.active ? '600' : '400',
                        }}
                    >
                        {tab.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};
