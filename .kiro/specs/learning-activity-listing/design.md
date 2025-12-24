# Design Document: Learning Activity Listing Platform

## Overview

This design document outlines the architecture and implementation strategy for a cross-platform learning activity listing application. The application will be built using Expo with React Native, providing a unified codebase that runs seamlessly on web browsers and native mobile platforms (iOS and Android).

The core functionality centers around displaying learning activities (online classes and assessments) in a performant, filterable, and searchable interface. The design emphasizes responsive layouts, theme support, and optimal performance through strategic use of React Native's FlatList and memoization techniques.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     App Entry Point                      │
│                      (App.tsx)                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Theme Provider                          │
│            (Dark/Light Mode Context)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Main Screen Layout                      │
│  ┌──────────────┐  ┌──────────────────────────────┐    │
│  │   Sidebar    │  │      Content Area            │    │
│  │  (Web Only)  │  │  ┌────────────────────────┐  │    │
│  │              │  │  │   Header Component     │  │    │
│  │  Navigation  │  │  │  - Search Bar          │  │    │
│  │  Menu Items  │  │  │  - Dark Mode Toggle    │  │    │
│  │              │  │  └────────────────────────┘  │    │
│  │              │  │  ┌────────────────────────┐  │    │
│  │              │  │  │   Filter Bar           │  │    │
│  │              │  │  │  - Horizontal Scroll   │  │    │
│  │              │  │  │  - Filter Chips        │  │    │
│  │              │  │  └────────────────────────┘  │    │
│  │              │  │  ┌────────────────────────┐  │    │
│  │              │  │  │   Activity List        │  │    │
│  │              │  │  │  - FlatList            │  │    │
│  │              │  │  │  - Activity Cards      │  │    │
│  │              │  │  │  - Grid (Web) / List   │  │    │
│  └──────────────┘  └──────────────────────────────┘    │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Bottom Tab Bar (Mobile Only)             │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Expo SDK 54+ with React Native 0.81+
- **Language**: TypeScript 5.9+
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Lucide-react-native
- **State Management**: React Hooks (useState, useContext, custom hooks)
- **Navigation**: React Native's Platform API for conditional rendering
- **Testing**: Jest + React Native Testing Library
- **Build Tools**: Expo CLI

### Platform-Specific Considerations

**Web:**
- Grid layout (2-3 columns) using FlatList's `numColumns` prop with responsive breakpoints
- Sidebar navigation always visible
- Hover states for interactive elements
- CSS media queries via NativeWind for responsive design

**Mobile (iOS/Android):**
- Single column list layout
- Bottom tab bar navigation
- Touch-optimized tap targets (minimum 44x44 points)
- Native scrolling behavior
- Platform-specific status bar styling

## Components and Interfaces

### Component Hierarchy

```
App
├── ThemeProvider
│   └── MainLayout
│       ├── Sidebar (Web only)
│       ├── Header
│       │   ├── SearchBar
│       │   └── DarkModeToggle
│       ├── FilterBar
│       │   └── FilterChip (multiple instances)
│       ├── ActivityList
│       │   └── ActivityCard (multiple instances)
│       │       ├── ClassCard
│       │       └── AssessmentCard
│       └── BottomTabBar (Mobile only)
```

### Core Components

#### 1. **ThemeProvider** (`src/context/ThemeContext.tsx`)
- Manages global theme state (light/dark)
- Provides theme toggle function
- Persists theme preference to AsyncStorage
- Exposes theme colors and styles to all children

**Interface:**
```typescript
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    // ... additional color tokens
  };
}
```

#### 2. **Header** (`src/components/Header.tsx`)
- Contains SearchBar and DarkModeToggle
- Fixed position at top of content area
- Responsive padding and layout

**Props:**
```typescript
interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}
```

#### 3. **SearchBar** (`src/components/SearchBar.tsx`)
- Text input with search icon
- Real-time filtering as user types
- Clear button when text is present
- Accessible with proper labels

**Props:**
```typescript
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}
```

#### 4. **DarkModeToggle** (`src/components/DarkModeToggle.tsx`)
- Switch/toggle button for theme
- Shows sun/moon icon based on current theme
- Smooth transition animation

**Props:**
```typescript
interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}
```

#### 5. **FilterBar** (`src/components/FilterBar.tsx`)
- Horizontal ScrollView with filter chips
- Manages active filter state
- Highlights selected filter

**Props:**
```typescript
interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

type FilterType = 'All' | 'Classes' | 'Assessments' | 'AI' | 'ML' | 'Cloud Computing';
```

#### 6. **FilterChip** (`src/components/FilterChip.tsx`)
- Individual filter button
- Active/inactive states with different styling
- Memoized to prevent re-renders

**Props:**
```typescript
interface FilterChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}
```

#### 7. **ActivityList** (`src/components/ActivityList.tsx`)
- FlatList wrapper with performance optimizations
- Handles empty states
- Responsive column count (1 for mobile, 2-3 for web)
- Uses getItemLayout for performance

**Props:**
```typescript
interface ActivityListProps {
  activities: Activity[];
  numColumns?: number;
}
```

#### 8. **ActivityCard** (`src/components/ActivityCard.tsx`)
- Discriminates between ClassCard and AssessmentCard based on activity type
- Memoized with React.memo
- Consistent card styling (shadow, border, padding)

**Props:**
```typescript
interface ActivityCardProps {
  activity: Activity;
}
```

#### 9. **ClassCard** (`src/components/ClassCard.tsx`)
- Displays class-specific information
- Progress bar component
- Instructor info
- "Resume Class" button

**Displays:**
- Video icon
- Title
- Category badge
- Instructor name
- Progress bar with percentage
- Time remaining
- Action button

#### 10. **AssessmentCard** (`src/components/AssessmentCard.tsx`)
- Displays assessment-specific information
- Due date with calendar icon
- Status badge (PENDING/COMPLETED)
- "Start" or "View" button based on status

**Displays:**
- Assessment type icon (quiz/assignment)
- Title
- Category badge
- Due date
- Status badge
- Action button

#### 11. **Sidebar** (`src/components/Sidebar.tsx`)
- Web-only navigation component
- Fixed position on left side
- Navigation menu items with icons
- Conditional rendering based on Platform.OS

#### 12. **BottomTabBar** (`src/components/BottomTabBar.tsx`)
- Mobile-only navigation component
- Fixed position at bottom
- Tab items with icons and labels
- Conditional rendering based on Platform.OS

### Custom Hooks

#### **useActivityFilters** (`src/hooks/useActivityFilters.ts`)
Encapsulates all filtering and search logic for activities.

**Interface:**
```typescript
interface UseActivityFiltersReturn {
  filteredActivities: Activity[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

function useActivityFilters(activities: Activity[]): UseActivityFiltersReturn;
```

**Logic:**
1. Maintains search query state
2. Maintains active filter state
3. Filters activities based on search query (case-insensitive title match)
4. Filters activities based on active filter:
   - "All": No filtering
   - "Classes": Only CLASS type
   - "Assessments": Only QUIZ/ASSIGNMENT types
   - "AI", "ML", "Cloud Computing": Filter by category
5. Returns filtered list and state setters

#### **useTheme** (`src/hooks/useTheme.ts`)
Provides access to theme context.

**Interface:**
```typescript
function useTheme(): ThemeContextType;
```

#### **useResponsive** (`src/hooks/useResponsive.ts`)
Determines responsive layout properties based on screen dimensions.

**Interface:**
```typescript
interface UseResponsiveReturn {
  isWeb: boolean;
  isMobile: boolean;
  numColumns: number;
  screenWidth: number;
}

function useResponsive(): UseResponsiveReturn;
```

## Data Models

### TypeScript Types and Interfaces

#### **ActivityType Enum**
```typescript
export enum ActivityType {
  CLASS = 'CLASS',
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT',
}
```

#### **Activity Discriminated Union**
```typescript
export type Activity =
  | {
      id: string;
      title: string;
      type: ActivityType.CLASS;
      category: string;
      instructor: string;
      progress: number; // 0-100
      durationLeft: string; // e.g., "2 hrs left"
    }
  | {
      id: string;
      title: string;
      type: ActivityType.QUIZ | ActivityType.ASSIGNMENT;
      category: string;
      dueDate: string; // ISO date string or formatted string
      status: 'PENDING' | 'COMPLETED';
    };
```

#### **Filter Types**
```typescript
export type FilterType = 'All' | 'Classes' | 'Assessments' | 'AI' | 'ML' | 'Cloud Computing';
```

#### **Theme Types**
```typescript
export interface ThemeColors {
  background: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  shadow: string;
}

export interface Theme {
  isDark: boolean;
  colors: ThemeColors;
}
```

### Mock Data Structure

Mock data will be stored in `src/constants/mockActivities.ts`:

```typescript
export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    type: ActivityType.CLASS,
    category: 'Machine Learning',
    instructor: 'Dr. A. Smith',
    progress: 40,
    durationLeft: '2 hrs left',
  },
  {
    id: '2',
    title: 'Neural Networks Quiz',
    type: ActivityType.QUIZ,
    category: 'AI',
    dueDate: 'Due tomorrow, 11:59 PM',
    status: 'PENDING',
  },
  // ... 6-8 more activities
];
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Search filtering preserves activity structure
*For any* search query and activity list, when filtering activities by search query, all returned activities should contain the search query (case-insensitive) in their title, and each activity should maintain its complete data structure.

**Validates: Requirements 2.2**

### Property 2: Filter exclusivity for type filters
*For any* activity list, when the "Classes" filter is active, all returned activities should have type CLASS, and when the "Assessments" filter is active, all returned activities should have type QUIZ or ASSIGNMENT.

**Validates: Requirements 3.4, 3.5**

### Property 3: Category filter accuracy
*For any* activity list and category filter (AI, ML, Cloud Computing), all returned activities should have a category field matching the selected filter.

**Validates: Requirements 3.6**

### Property 4: "All" filter returns complete list
*For any* activity list, when the "All" filter is active and search query is empty, the filtered result should equal the original activity list.

**Validates: Requirements 3.3**

### Property 5: Combined search and filter consistency
*For any* activity list, search query, and active filter, the filtered activities should satisfy both the search criteria (title contains query) AND the filter criteria (type/category match).

**Validates: Requirements 2.2, 3.2**

### Property 6: Theme toggle state consistency
*For any* theme state, toggling the theme should invert the isDark boolean, and toggling twice should return to the original state.

**Validates: Requirements 5.2, 5.3**

### Property 7: Activity card type discrimination
*For any* activity, if the activity type is CLASS, the rendered card should display progress, instructor, and durationLeft fields; if the activity type is QUIZ or ASSIGNMENT, the rendered card should display dueDate and status fields.

**Validates: Requirements 1.2, 1.3**

### Property 8: Responsive column count
*For any* screen width, if the platform is web and width >= 768px, numColumns should be 2 or 3; if the platform is mobile or width < 768px, numColumns should be 1.

**Validates: Requirements 4.1, 4.2**

### Property 9: Empty search results
*For any* activity list and search query, if no activities contain the search query in their title, the filtered list should be empty and an empty state message should be displayed.

**Validates: Requirements 2.4**

### Property 10: Activity list performance
*For any* activity list rendered in FlatList, the component should use getItemLayout and React.memo, ensuring that scrolling maintains 60fps on standard devices.

**Validates: Requirements 7.1, 7.2**

## Error Handling

### Input Validation
- **Search Query**: No validation needed; empty strings are valid and show all activities
- **Filter Selection**: Constrained to predefined FilterType values through TypeScript
- **Activity Data**: Validate structure at runtime if fetching from API (future enhancement)

### Error Boundaries
- Wrap main application in React Error Boundary
- Display user-friendly error message if component crashes
- Log errors to console for debugging

### Empty States
- **No Activities**: Display message "No activities available"
- **No Search Results**: Display message "No activities match your search"
- **No Filter Results**: Display message "No activities in this category"

### Platform-Specific Errors
- **Web**: Handle browser compatibility issues gracefully
- **Mobile**: Handle permission errors (if future features require them)
- **Network**: Handle offline state (if API integration added)

### Theme Persistence Errors
- If AsyncStorage fails to save theme preference, fall back to system default
- Log error but don't block user interaction

## Testing Strategy

### Unit Testing

We will use **Jest** and **React Native Testing Library** for unit tests.

**Components to Test:**
1. **SearchBar**: Test input changes, clear button functionality
2. **FilterChip**: Test active/inactive states, press handlers
3. **FilterBar**: Test filter selection and state updates
4. **ActivityCard**: Test rendering of CLASS vs QUIZ/ASSIGNMENT types
5. **ClassCard**: Test display of progress, instructor, duration
6. **AssessmentCard**: Test display of due date, status badge
7. **DarkModeToggle**: Test theme toggle functionality
8. **useActivityFilters hook**: Test search and filter logic

**Example Unit Test Structure:**
```typescript
describe('SearchBar', () => {
  it('should call onChangeText when user types', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={mockOnChange} placeholder="Search..." />
    );
    
    const input = getByPlaceholderText('Search...');
    fireEvent.changeText(input, 'Machine Learning');
    
    expect(mockOnChange).toHaveBeenCalledWith('Machine Learning');
  });
});
```

### Property-Based Testing

We will use **fast-check** (a property-based testing library for JavaScript/TypeScript) for property-based tests.

**Configuration:**
- Each property test should run a minimum of 100 iterations
- Tests should generate random activities, search queries, and filter states
- Each test must be tagged with a comment referencing the design document property

**Property Tests to Implement:**

1. **Property 1: Search filtering preserves activity structure**
   - Generate random activities and search queries
   - Verify filtered activities contain query in title
   - Verify activity structure is unchanged
   - **Feature: learning-activity-listing, Property 1: Search filtering preserves activity structure**

2. **Property 2: Filter exclusivity for type filters**
   - Generate random activities
   - Apply "Classes" filter, verify all are CLASS type
   - Apply "Assessments" filter, verify all are QUIZ/ASSIGNMENT
   - **Feature: learning-activity-listing, Property 2: Filter exclusivity for type filters**

3. **Property 3: Category filter accuracy**
   - Generate random activities with various categories
   - Apply category filters, verify all results match category
   - **Feature: learning-activity-listing, Property 3: Category filter accuracy**

4. **Property 4: "All" filter returns complete list**
   - Generate random activity lists
   - Apply "All" filter with empty search
   - Verify result equals original list
   - **Feature: learning-activity-listing, Property 4: "All" filter returns complete list**

5. **Property 5: Combined search and filter consistency**
   - Generate random activities, queries, and filters
   - Verify results satisfy both search AND filter criteria
   - **Feature: learning-activity-listing, Property 5: Combined search and filter consistency**

6. **Property 6: Theme toggle state consistency**
   - Generate random initial theme states
   - Toggle twice, verify return to original state
   - **Feature: learning-activity-listing, Property 6: Theme toggle state consistency**

7. **Property 7: Activity card type discrimination**
   - Generate random activities of both types
   - Verify CLASS activities render with progress/instructor
   - Verify QUIZ/ASSIGNMENT activities render with dueDate/status
   - **Feature: learning-activity-listing, Property 7: Activity card type discrimination**

8. **Property 8: Responsive column count**
   - Generate random screen widths
   - Verify column count matches platform and width rules
   - **Feature: learning-activity-listing, Property 8: Responsive column count**

9. **Property 9: Empty search results**
   - Generate activities and non-matching search queries
   - Verify empty list and empty state display
   - **Feature: learning-activity-listing, Property 9: Empty search results**

10. **Property 10: Activity list performance**
    - Generate large activity lists (100+ items)
    - Verify FlatList uses getItemLayout
    - Verify ActivityCard uses React.memo
    - **Feature: learning-activity-listing, Property 10: Activity list performance**

**Example Property Test Structure:**
```typescript
import fc from 'fast-check';

/**
 * Feature: learning-activity-listing, Property 1: Search filtering preserves activity structure
 */
describe('Property: Search filtering preserves activity structure', () => {
  it('should preserve activity structure when filtering by search query', () => {
    fc.assert(
      fc.property(
        fc.array(activityArbitrary), // Generate random activities
        fc.string(), // Generate random search query
        (activities, query) => {
          const filtered = filterBySearch(activities, query);
          
          // All filtered activities should contain query in title
          filtered.forEach(activity => {
            expect(activity.title.toLowerCase()).toContain(query.toLowerCase());
          });
          
          // All filtered activities should maintain structure
          filtered.forEach(activity => {
            expect(activity).toHaveProperty('id');
            expect(activity).toHaveProperty('title');
            expect(activity).toHaveProperty('type');
            expect(activity).toHaveProperty('category');
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing
- Test complete user flows: search → filter → view activity
- Test theme switching across all components
- Test responsive layout changes

### Visual Regression Testing (Optional)
- Capture screenshots of light/dark modes
- Compare across platforms (web, iOS, Android)

### Performance Testing
- Measure FlatList scroll performance with large datasets
- Verify 60fps on mid-range devices
- Test initial load time

## Implementation Notes

### NativeWind Setup
1. Install dependencies: `nativewind`, `tailwindcss`
2. Configure `tailwind.config.js` with content paths
3. Add NativeWind babel plugin to `babel.config.js`
4. Import `global.css` in App.tsx

### Dark Mode Implementation
- Use React Context for theme state
- Define light and dark color palettes
- Apply conditional Tailwind classes: `className={isDark ? 'bg-gray-900' : 'bg-white'}`
- Persist preference with AsyncStorage

### Responsive Design Strategy
- Use `useWindowDimensions` hook to get screen size
- Define breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Conditionally render Sidebar (web) vs BottomTabBar (mobile)
- Use FlatList `numColumns` prop with responsive value

### Performance Optimizations
1. **FlatList getItemLayout**: Provide fixed item height for instant scrolling
2. **React.memo**: Wrap ActivityCard to prevent re-renders when props unchanged
3. **useCallback**: Memoize filter and search handlers
4. **useMemo**: Memoize filtered activity list
5. **Key extraction**: Use activity.id as FlatList key

### Accessibility Considerations
- Add `accessibilityLabel` to all interactive elements
- Ensure color contrast meets WCAG AA standards
- Support keyboard navigation on web
- Test with screen readers

### Future Enhancements
- API integration for real activity data
- Pagination for large activity lists
- Pull-to-refresh on mobile
- Activity detail view
- User authentication
- Progress tracking persistence
- Notifications for upcoming deadlines
