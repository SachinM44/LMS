import { useMemo, useState } from 'react';
import { Activity, ActivityType, FilterType } from '../types';

export interface UseActivityFiltersReturn {
  filteredActivities: Activity[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

export const useActivityFilters = (
  activities: Activity[]
): UseActivityFiltersReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredActivities = useMemo(() => {
    let filtered = activities;

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((activity) =>
        activity.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilter !== 'All') {
      if (activeFilter === 'Classes') {
        filtered = filtered.filter(
          (activity) => activity.type === ActivityType.CLASS
        );
      } else if (activeFilter === 'Assessments') {
        filtered = filtered.filter(
          (activity) =>
            activity.type === ActivityType.QUIZ ||
            activity.type === ActivityType.ASSIGNMENT
        );
      } else {
        const categoryMap: Record<string, string> = {
          'AI': 'AI',
          'ML': 'Machine Learning',
          'Cloud Computing': 'Cloud Computing',
        };
        
        const categoryName = categoryMap[activeFilter] || activeFilter;
        
        filtered = filtered.filter(
          (activity) => activity.category === categoryName
        );
      }
    }

    return filtered;
  }, [activities, searchQuery, activeFilter]);

  return {
    filteredActivities,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
  };
};
