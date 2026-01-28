# House of EdTech - React Native Expo Assignment


### 1. WebView Integration
- Embeds the House of EdTech website (`https://houseofedtech.in`) inside the app using `react-native-webview`.
- Includes a loading indicator while the content is being fetched.
- **Bonus**: Triggers a local notification automatically when the WebView finishes loading.

### 2. Notification System
- Implements local notifications using `expo-notifications`.
- **Distinct Notifications**:
  - **Course Enrollment**: Triggers after 3 seconds.
  - **Video Ready**: Triggers after 5 seconds.
  - **WebView Loaded**: Triggers automatically on load.
- **Bonus**: Tapping the "Video Ready" notification automatically navigates the user to the Video Player page.

### 3. Video Player (HLS)
- Plays HLS (`.m3u8`) video streams using `expo-av`.
- **Custom Controls**:
  - Play/Pause
  - Mute/Unmute
  - Fullscreen toggle
  - **Bonus**: Seek Forward (+10s) and Seek Backward (-10s) buttons.
- **Bonus**: Stream Switching allows users to toggle between multiple HLS streams.

## Tech Stack

- **Framework**: React Native (Expo SDK 52+)
- **Routing**: Expo Router (File-based routing)
- **Styling**: NativeWind (Tailwind CSS) & Custom Theme System
- **Icons**: Lucide React Native
- **Libraries**:
  - `react-native-webview`
  - `expo-notifications`
  - `expo-av`
  - `expo-device`


## 🏃 How to Run

git clone 

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the App**:
   ```bash
   npx expo start
   ```

3. **Run on Device/Emulator**:
   - Scan the QR code with **Expo Go** (Android/iOS).
   - Or press `a` for Android Emulator, `i` for iOS Simulator.
