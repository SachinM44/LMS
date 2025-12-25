# Learning Management System - Activity Listing

A cross-platform learning activity listing app built with React Native and Expo. Works on web, iOS, and Android from a single codebase.

##  What This App Does

This is an activity listing screen for an online learning platform. Students can:
- View all their learning activities (classes and assessments)
- Search for specific activities by title
- Filter by type (Classes vs Assessments) or category (AI, ML, Cloud Computing)
- See progress on classes and due dates for assessments
- Switch between light and dark themes
- Use it on web or mobile with the same codebase

## the Tech Stack

**Framework & Language:**
- **Expo** - React Native framework for cross-platform development
- **TypeScript** - Type safety and better developer experience
- **React Native** - Build native apps with React

**Styling:**
- **NativeWind** - Tailwind CSS for React Native (works on web and mobile)
- Inline styles for precise control

**Icons:**
- **Lucide React Native** 

**State Management:**
- React Hooks (useState, useMemo, useContext)
- Custom hooks for reusable logic

**Storage:**
- **AsyncStorage** - Persist theme preference

### Installation

1. Clone this repo:
```bash
git clone https://github.com/SachinM44/LMS.git
cd lms
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```


### Running on Web

```bash
npx expo start --web
```

Then press `w` to open in your browser. The app will open at `http://localhost:8081`

### Running on Mobile (Development)

1. Start the dev server:
```bash
npx expo start
```

2. Scan the QR code with:
   - **Android**: Expo Go app

The app will load on your phone

### Building for Android (APK)

To create an APK file you can share:

```bash
npx eas build --platform android --profile preview
```

This will:
1. Ask you to create an Expo account 
2. Build your app in the cloud
3. Give you a download link for the APK

##  Design Decisions

### Why Expo?
- Single codebase for web and mobile
- Fast development with hot reload
- Easy deployment
- Great documentation

### Why NativeWind?
- Familiar Tailwind CSS syntax
- Works on both web and native
- Smaller bundle size than other styling solutions
- Easy to maintain

### Why TypeScript?
- Catch errors before runtime
- Better IDE support
- Easier to refactor
- Self-documenting code

### Why FlatList?
- Built-in virtualization (only renders visible items)
- Smooth scrolling even with large lists
- getItemLayout for even better performance

##  Trade-offs

### What We Chose vs Alternatives

**Expo vs Plain React Native:**
-  Chose Expo: Easier setup, web support out of the box
-  Trade-off: Slightly larger app size, some native modules not supported

**NativeWind vs React Native Paper:**
-  Chose NativeWind: More flexible, works on web, smaller bundle
-  Trade-off: Less pre-built components, more custom styling



**Inline Styles vs Pure Tailwind:**
-  Chose Mix: Inline for dynamic values (colors from theme), Tailwind for static
-  Trade-off: Less consistent, but more flexible


##  What's Next?

If I had more time, here's what I'd add:

### High Priority
1. **API Integration**: Connect to a real backend
2. **User Authentication**: Login/signup with JWT
3. **Activity Details Page**: Click an activity to see full details
4. **Progress Persistence**: Save user progress to database

### Medium Priority
6. **Pull to Refresh**: Refresh activity list on mobile
7. **Skeleton Loading**: Show placeholders while loading

## some Known Issues

1. **SafeAreaView Warning**: Using deprecated SafeAreaView from react-native. Should migrate to react-native-safe-area-context (already installed, just need to update imports).

WEb app link : https://helpful-crumble-dbb335.netlify.app/

APK file : https://expo.dev/accounts/sachin1211/projects/lms/builds/4ff455ad-5bb1-483b-a571-2a5a864fe310
(visit the above site 'expo' click on install it will install apk file localy)