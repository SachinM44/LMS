import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Bell, BookOpen } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  scheduleNotification,
  NotificationTemplates,
} from '@/services/notificationService';
import { theme } from '@/constants/theme';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [notification1Scheduled, setNotification1Scheduled] = useState(false);
  const [notification2Scheduled, setNotification2Scheduled] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const handleWebViewLoad = () => {
    setIsLoading(false);
    scheduleNotification(NotificationTemplates.webviewLoaded, 2);
  };

  const handleNotification1 = async () => {
    try {
      await scheduleNotification(NotificationTemplates.courseEnrollment, 3);
      setNotification1Scheduled(true);
      Alert.alert(
        'Notification Scheduled',
        'Course enrollment notification will appear in 3 seconds!'
      );
      
      setTimeout(() => setNotification1Scheduled(false), 4000);
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule notification');
      console.error(error);
    }
  };

  const handleNotification2 = async () => {
    try {
      await scheduleNotification(NotificationTemplates.videoReady, 5);
      setNotification2Scheduled(true);
      Alert.alert(
        '  Notification Scheduled',
        'Video notification will appear in 5 seconds!\n\nTap the notification to open the Video Player.'
      );
      
      setTimeout(() => setNotification2Scheduled(false), 6000);
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule notification');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      
        <Card style={styles.webviewCard}>
          <Text style={styles.sectionTitle}>Course Content</Text>
          <Text style={styles.sectionSubtitle}>
            Browse our course catalog
          </Text>

          <View style={styles.webviewContainer}>
            {isLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Loading content...</Text>
              </View>
            )}
            <WebView
              ref={webViewRef}
              source={{ uri: 'https://houseofedtech.in' }}
              style={styles.webview}
              onLoad={handleWebViewLoad}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.error('WebView error:', nativeEvent);
              }}
              startInLoadingState={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </View>
        </Card>

        <Card style={styles.actionsCard}>
          <View style={styles.actionsHeader}>
            <Bell size={24} color={theme.colors.primary} />
            <Text style={styles.sectionTitle}>Notification Center</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Trigger notifications to test the functionality
          </Text>

          <View style={styles.buttonGroup}>
            <Button
              title=" Course Enrollment"
              onPress={handleNotification1}
              variant="primary"
              size="lg"
              loading={notification1Scheduled}
              style={styles.button}
            />

            <Button
              title=" Video Ready"
              onPress={handleNotification2}
              variant="accent"
              size="lg"
              loading={notification2Scheduled}
              style={styles.button}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  headerCard: {
    marginBottom: theme.spacing.sm,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  webviewCard: {
    minHeight: 400,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  sectionSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  webviewContainer: {
    height: 350,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    zIndex: 1,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  actionsCard: {
    marginBottom: theme.spacing.xl,
  },
  actionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  buttonGroup: {
    gap: theme.spacing.md,
  },
  button: {
    width: '100%',
  },
  infoBox: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primaryLight + '15',
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  infoText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    lineHeight: 20,
  },
});