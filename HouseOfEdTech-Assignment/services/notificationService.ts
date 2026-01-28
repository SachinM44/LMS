import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface NotificationContent {
  title: string;
  body: string;
  data?: Record<string, any>;
}

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.log('Notifications work only on physical devices');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push notification permissions!');
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#2563eb',
    });
  }

  return 'notification-permission-granted';
}

export async function scheduleNotification(
  content: NotificationContent,
  delayInSeconds: number = 3
): Promise<string> {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: content.title,
      body: content.body,
      data: content.data || {},
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delayInSeconds,
      repeats: false,
    },
  });

  return notificationId;
}

export async function cancelNotification(notificationId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export const NotificationTemplates = {
  courseEnrollment: {
    title: 'Course Enrollment Successful!',
    body: 'Welcome to your new course. Start learning now!',
    data: { type: 'course_enrollment', action: 'open_course' },
  },
  
  videoReady: {
    title: ' New Video Available',
    body: 'A new learning video is ready for you. Tap to watch now!',
    data: { type: 'video_ready', action: 'open_video' },
  },
  
  progressUpdate: {
    title: ' Progress Update',
    body: "You're making great progress! Keep up the good work.",
    data: { type: 'progress_update', action: 'view_progress' },
  },
  
  webviewLoaded: {
    title: ' Content Loaded',
    body: 'Your learning content has been loaded successfully!',
    data: { type: 'webview_loaded', action: 'none' },
  },
};