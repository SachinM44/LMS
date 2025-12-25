/////thsis is for web only 

import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Home, BookOpen, FileText, Settings } from 'lucide-react-native';
import { useTheme } from '../hooks';

export const Sidebar: React.FC = () => {
    const { colors } = useTheme();

    if (Platform.OS !== 'web') {
        return null;
    }

    const menuItems = [
        { icon: Home, label: 'Home', active: true },
        { icon: BookOpen, label: 'My Courses', active: false },
        { icon: FileText, label: 'Assignments', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <View
            style={{
                width: 240,
                backgroundColor: colors.card,
                borderRightWidth: 1,
                borderRightColor: colors.border,
                paddingVertical: 20,
            }}
        >
            <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: colors.secondary,
                    }}
                >
                    LMS Platform
                </Text>
            </View>

            {menuItems.map((item, index) => (
                <Pressable
                    key={index}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: item.active ? colors.primary + '10' : 'transparent',
                        borderLeftWidth: item.active ? 3 : 0,
                        borderLeftColor: colors.primary,
                    }}
                >
                    <item.icon
                        size={20}
                        color={item.active ? colors.primary : colors.textSecondary}
                    />
                    <Text
                        style={{
                            marginLeft: 12,
                            fontSize: 16,
                            fontWeight: item.active ? '600' : '400',
                            color: item.active ? colors.primary : colors.text,
                        }}
                    >
                        {item.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};
