import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../hooks';

interface FilterChipProps {
    label: string;
    isActive: boolean;
    onPress: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = React.memo(
    ({ label, isActive, onPress }) => {
        const { colors } = useTheme();

        return (
            <Pressable
                onPress={onPress}
                style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: isActive ? colors.primary : colors.card,
                    borderWidth: 1,
                    borderColor: isActive ? colors.primary : colors.border,
                    marginRight: 8,
                }}
                accessibilityLabel={`Filter by ${label}`}
                accessibilityState={{ selected: isActive }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: isActive ? '600' : '400',
                        color: isActive ? '#FFFFFF' : colors.text,
                    }}
                >
                    {label}
                </Text>
            </Pressable>
        );
    }
);

FilterChip.displayName = 'FilterChip';
