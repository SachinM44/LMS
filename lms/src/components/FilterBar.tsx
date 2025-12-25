import React from 'react';
import { ScrollView, View } from 'react-native';
import { FilterChip } from './FilterChip';
import { FilterType } from '../types';
import { useTheme } from '../hooks';

interface FilterBarProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const FILTERS: FilterType[] = ['All', 'AI', 'Assessments', 'Cloud Computing', 'Classes', 'ML'];

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
    const { colors } = useTheme();

    return (
        <View
            style={{
                backgroundColor: colors.background,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            }}
        >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {FILTERS.map((filter) => (
                    <FilterChip
                        key={filter}
                        label={filter}
                        isActive={activeFilter === filter}
                        onPress={() => onFilterChange(filter)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};
