import { useMemo, useState } from "react";
import { Activity, ActivityType, FilterType } from "../types";

export interface UseActivityFiltersReturn {
    filteredActivities: Activity[],
    searchQuery: string,
    setSearchQuery: (query: string) => void
    activeFilters: FilterType
    setActiveFilters: (filter: FilterType) => void
}

export const useActivityFilters = (activities: Activity[]): UseActivityFiltersReturn => {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilters, setActiveFilters] = useState<FilterType>('All')

    const filteredActivities = useMemo(() => {
        let filtered = activities

        if (searchQuery.trim() !== '') {
            filtered = filtered.filter((activity) =>
                activity.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        if (activeFilters !== 'All') {
            filtered = filtered.filter((activity) => {
                if (activity.type === ActivityType.QUIZ || activity.type === ActivityType.ASSIGNMENT) {
                    return activity.status.toLowerCase() === activeFilters.toLowerCase()
                }
                return false
            })
        }

        return filtered


    }, [searchQuery, activities, activeFilters])

    return {
        filteredActivities,
        searchQuery,
        setSearchQuery,
        activeFilters,
        setActiveFilters
    }

}