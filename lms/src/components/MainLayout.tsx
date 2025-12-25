
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './Header';
import { FilterBar } from './FilterBar';
import { ActivityList } from './ActivityList';
import { Sidebar } from './Sidebar';
import { BottomTabBar } from './BottomTabBar';
import { useTheme, useActivityFilters } from '../hooks';
import { MOCK_ACTIVITIES } from '../constants';

export const MainLayout: React.FC = () => {
  const { colors } = useTheme();
  
  const {
    filteredActivities,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
  } = useActivityFilters(MOCK_ACTIVITIES);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Sidebar />
        <View style={{ flex: 1 }}>
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <ActivityList activities={filteredActivities} />
        </View>
      </View>
      <BottomTabBar />
    </SafeAreaView>
  );
};
