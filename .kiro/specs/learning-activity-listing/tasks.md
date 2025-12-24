# Implementation Plan

- [ ] 1. Setup project dependencies and configuration
  - Install required dependencies: nativewind, tailwindcss, lucide-react-native, @react-native-async-storage/async-storage
  - Configure tailwind.config.js with content paths for React Native
  - Update babel.config.js to include NativeWind plugin
  - Create global.css for Tailwind imports
  - Verify Expo configuration supports web and native builds
  - _Requirements: 6.1, 6.2_

- [ ] 2. Define TypeScript types and mock data
  - Create ActivityType enum (CLASS, QUIZ, ASSIGNMENT) in src/types/index.ts
  - Define discriminated union Activity type with CLASS and QUIZ/ASSIGNMENT variants
  - Define FilterType union type
  - Define ThemeColors and Theme interfaces
  - Create mock activities data (8-10 items) in src/constants/mockActivities.ts covering AI, ML, and Cloud Computing
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 2.1 Write property test for Activity type structure
  - **Property 7: Activity card type discrimination**
  - **Validates: Requirements 1.2, 1.3**

- [ ] 3. Implement Theme Context and Provider
  - Create ThemeContext in src/context/ThemeContext.tsx
  - Implement ThemeProvider with isDark state and toggleTheme function
  - Define light and dark color palettes (ThemeColors)
  - Integrate AsyncStorage to persist theme preference
  - Create useTheme custom hook for consuming theme context
  - _Requirements: 5.2, 5.3, 5.4_

- [ ] 3.1 Write property test for theme toggle
  - **Property 6: Theme toggle state consistency**
  - **Validates: Requirements 5.2, 5.3**

- [ ] 3.2 Write unit tests for ThemeProvider
  - Test theme toggle updates isDark state
  - Test theme persistence to AsyncStorage
  - Test useTheme hook returns correct context
  - _Requirements: 10.1, 10.2_

- [ ] 4. Create custom hooks for filtering and responsiveness
  - Implement useActivityFilters hook in src/hooks/useActivityFilters.ts
  - Add search query state and filtering logic (case-insensitive title match)
  - Add active filter state and filtering logic (type and category filters)
  - Implement combined search + filter logic
  - Create useResponsive hook in src/hooks/useResponsive.ts to determine platform, screen width, and numColumns
  - _Requirements: 2.2, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 7.3_

- [ ] 4.1 Write property test for search filtering
  - **Property 1: Search filtering preserves activity structure**
  - **Validates: Requirements 2.2**

- [ ] 4.2 Write property test for type filter exclusivity
  - **Property 2: Filter exclusivity for type filters**
  - **Validates: Requirements 3.4, 3.5**

- [ ] 4.3 Write property test for category filtering
  - **Property 3: Category filter accuracy**
  - **Validates: Requirements 3.6**

- [ ] 4.4 Write property test for "All" filter
  - **Property 4: "All" filter returns complete list**
  - **Validates: Requirements 3.3**

- [ ] 4.5 Write property test for combined search and filter
  - **Property 5: Combined search and filter consistency**
  - **Validates: Requirements 2.2, 3.2**

- [ ] 4.6 Write property test for empty search results
  - **Property 9: Empty search results**
  - **Validates: Requirements 2.4**

- [ ] 4.7 Write property test for responsive column count
  - **Property 8: Responsive column count**
  - **Validates: Requirements 4.1, 4.2**

- [ ] 4.8 Write unit tests for useActivityFilters hook
  - Test search query filtering
  - Test filter type selection
  - Test category filtering
  - Test combined search and filter
  - _Requirements: 10.1_

- [ ] 5. Build SearchBar component
  - Create SearchBar component in src/components/SearchBar.tsx
  - Add TextInput with search icon from lucide-react-native
  - Implement onChangeText handler
  - Add clear button that appears when text is present
  - Apply NativeWind styling with theme-aware colors
  - Add accessibility labels
  - _Requirements: 2.1, 2.2_

- [ ] 5.1 Write unit tests for SearchBar
  - Test input change triggers onChangeText
  - Test clear button functionality
  - Test accessibility labels
  - _Requirements: 10.1_

- [ ] 6. Build DarkModeToggle component
  - Create DarkModeToggle component in src/components/DarkModeToggle.tsx
  - Add switch/toggle with sun/moon icon from lucide-react-native
  - Connect to useTheme hook for isDark state and toggleTheme function
  - Apply smooth transition animation
  - Apply NativeWind styling
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 6.1 Write unit tests for DarkModeToggle
  - Test toggle triggers theme change
  - Test icon changes based on theme
  - _Requirements: 10.1, 10.2_

- [ ] 7. Build Header component
  - Create Header component in src/components/Header.tsx
  - Compose SearchBar and DarkModeToggle
  - Apply responsive layout (flexbox)
  - Apply NativeWind styling with theme-aware background
  - Add proper spacing and padding
  - _Requirements: 2.1, 5.1_

- [ ] 7.1 Write unit tests for Header
  - Test SearchBar and DarkModeToggle are rendered
  - Test search query prop is passed correctly
  - _Requirements: 10.1_

- [ ] 8. Build FilterChip component
  - Create FilterChip component in src/components/FilterChip.tsx
  - Add Pressable with label text
  - Implement active/inactive visual states
  - Apply NativeWind styling with conditional classes for active state
  - Wrap with React.memo for performance
  - _Requirements: 3.1, 3.2_

- [ ] 8.1 Write unit tests for FilterChip
  - Test press handler is called
  - Test active state styling
  - Test inactive state styling
  - _Requirements: 10.1_

- [ ] 9. Build FilterBar component
  - Create FilterBar component in src/components/FilterBar.tsx
  - Add horizontal ScrollView with filter chips
  - Define filter options: "All", "Classes", "Assessments", "AI", "ML", "Cloud Computing"
  - Manage active filter state
  - Render FilterChip for each option
  - Apply NativeWind styling
  - _Requirements: 3.1, 3.2_

- [ ] 9.1 Write unit tests for FilterBar
  - Test all filter chips are rendered
  - Test filter selection updates active filter
  - Test active filter is highlighted
  - _Requirements: 10.1_

- [ ] 10. Build ClassCard component
  - Create ClassCard component in src/components/ClassCard.tsx
  - Display video icon, title, category badge
  - Display instructor name with icon
  - Implement progress bar showing completion percentage
  - Display time remaining (durationLeft)
  - Add "Resume Class" button with primary styling
  - Apply NativeWind styling with card borders and shadows
  - Use theme-aware colors
  - _Requirements: 1.2, 8.2, 8.3_

- [ ] 10.1 Write unit tests for ClassCard
  - Test all CLASS fields are displayed
  - Test progress bar shows correct percentage
  - Test "Resume Class" button is present
  - _Requirements: 10.1_

- [ ] 11. Build AssessmentCard component
  - Create AssessmentCard component in src/components/AssessmentCard.tsx
  - Display quiz/assignment icon, title, category badge
  - Display due date with calendar icon
  - Implement status badge (PENDING/COMPLETED) with color coding
  - Add "Start" button for PENDING or "View" button for COMPLETED
  - Apply NativeWind styling with card borders and shadows
  - Use theme-aware colors
  - _Requirements: 1.3, 8.2, 8.4_

- [ ] 11.1 Write unit tests for AssessmentCard
  - Test all assessment fields are displayed
  - Test status badge shows correct status
  - Test button text changes based on status
  - _Requirements: 10.1_

- [ ] 12. Build ActivityCard wrapper component
  - Create ActivityCard component in src/components/ActivityCard.tsx
  - Implement type discrimination: render ClassCard for CLASS type, AssessmentCard for QUIZ/ASSIGNMENT
  - Wrap with React.memo for performance optimization
  - Apply consistent card container styling
  - _Requirements: 1.2, 1.3, 7.2_

- [ ] 12.1 Write unit tests for ActivityCard
  - Test ClassCard renders for CLASS type
  - Test AssessmentCard renders for QUIZ/ASSIGNMENT types
  - Test React.memo prevents unnecessary re-renders
  - _Requirements: 10.1_

- [ ] 13. Build ActivityList component
  - Create ActivityList component in src/components/ActivityList.tsx
  - Implement FlatList with data prop for activities
  - Add getItemLayout for performance (fixed item height)
  - Use numColumns prop from useResponsive hook
  - Implement keyExtractor using activity.id
  - Render ActivityCard for each item
  - Handle empty state with message
  - Apply NativeWind styling
  - _Requirements: 1.1, 1.4, 2.4, 4.1, 4.2, 7.1_

- [ ] 13.1 Write property test for FlatList performance
  - **Property 10: Activity list performance**
  - **Validates: Requirements 7.1, 7.2**

- [ ] 13.2 Write unit tests for ActivityList
  - Test FlatList renders with activities
  - Test empty state displays when no activities
  - Test getItemLayout is provided
  - Test numColumns is responsive
  - _Requirements: 10.1_

- [ ] 14. Build Sidebar component (web only)
  - Create Sidebar component in src/components/Sidebar.tsx
  - Add conditional rendering based on Platform.OS === 'web'
  - Implement navigation menu items with icons from lucide-react-native
  - Apply fixed positioning on left side
  - Apply NativeWind styling with theme-aware background
  - _Requirements: 4.3_

- [ ] 14.1 Write unit tests for Sidebar
  - Test Sidebar renders on web platform
  - Test Sidebar does not render on mobile
  - _Requirements: 10.1_

- [ ] 15. Build BottomTabBar component (mobile only)
  - Create BottomTabBar component in src/components/BottomTabBar.tsx
  - Add conditional rendering based on Platform.OS !== 'web'
  - Implement tab items with icons and labels
  - Apply fixed positioning at bottom
  - Apply NativeWind styling with theme-aware background
  - _Requirements: 4.4_

- [ ] 15.1 Write unit tests for BottomTabBar
  - Test BottomTabBar renders on mobile
  - Test BottomTabBar does not render on web
  - _Requirements: 10.1_

- [ ] 16. Build MainLayout component
  - Create MainLayout component in src/components/MainLayout.tsx
  - Compose Sidebar (web), Header, FilterBar, ActivityList, BottomTabBar (mobile)
  - Implement responsive layout with proper spacing
  - Apply NativeWind styling with theme-aware background
  - Use SafeAreaView for mobile platforms
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 16.1 Write unit tests for MainLayout
  - Test all child components render correctly
  - Test responsive layout on web vs mobile
  - _Requirements: 10.1_

- [ ] 17. Integrate everything in App.tsx
  - Wrap app with ThemeProvider
  - Import and render MainLayout
  - Import global.css for NativeWind
  - Pass mock activities data to MainLayout
  - Integrate useActivityFilters hook for search and filter state
  - Connect all components with proper props
  - _Requirements: 1.1, 1.5, 6.1, 6.2_

- [ ] 17.1 Write integration tests
  - Test complete user flow: search → filter → view activities
  - Test theme switching across all components
  - Test responsive layout changes
  - _Requirements: 10.1, 10.2_

- [ ] 18. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 19. Create comprehensive README documentation
  - Write README.md with project overview
  - Document tech stack choices and rationale (Expo, NativeWind, TypeScript)
  - Explain tradeoffs (single codebase vs native features, FlatList vs other solutions)
  - List limitations (mock data only, no authentication, no persistence beyond theme)
  - Provide setup instructions: clone repo, install dependencies
  - Provide run instructions for web: `npm start` then press `w`
  - Provide build instructions for iOS: `npx expo run:ios`
  - Provide build instructions for Android: `npx expo run:android`
  - Document testing: `npm test`
  - Add screenshots of light/dark modes on web and mobile
  - _Requirements: 10.3, 10.4, 10.5_

- [ ] 20. Final verification and polish
  - Test application on web browser (Chrome, Firefox, Safari)
  - Test application on iOS simulator/device
  - Test application on Android emulator/device
  - Verify all acceptance criteria are met
  - Verify light and dark modes work correctly
  - Verify responsive layouts work correctly
  - Verify search and filter functionality works correctly
  - Fix any remaining bugs or styling issues
  - _Requirements: 6.3, 6.4, 6.5_
