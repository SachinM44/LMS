import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Card } from '@/components/ui/Card';
import { VideoControls } from '@/components/ui/VideoControls';
import { theme } from '@/constants/theme';

const VIDEO_STREAMS = [
  {
    id: '1',
    title: 'Sample HLS Stream',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    description: 'High-quality test stream from Mux',
  },
  {
    id: '2',
    title: 'Big Buck Bunny',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    description: 'Alternative stream option',
  },
];

export default function VideoScreen() {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedStreamId, setSelectedStreamId] = useState('1');

  const selectedStream = VIDEO_STREAMS.find((s) => s.id === selectedStreamId);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.stopAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling play/pause:', error);
      Alert.alert('Error', 'Failed to play/pause video');
    }
  };

  const handleMuteToggle = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const handleFullscreen = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.presentFullscreenPlayer();
    } catch (error) {
      console.error('Error entering fullscreen:', error);
      Alert.alert('Error', 'Failed to enter fullscreen mode');
    }
  };

  const handleSeek = async (seconds: number) => {
    if (!videoRef.current) return;
    try {
      const newPosition = currentTime + seconds * 1000;
      const targetPosition = Math.max(0, Math.min(newPosition, duration));
      await videoRef.current.setPositionAsync(targetPosition);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  };

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  const handleStreamChange = async (streamId: string) => {
    try {
      if (videoRef.current) {
        await videoRef.current.stopAsync();
        setIsPlaying(false);
      }
      setSelectedStreamId(streamId);
      Alert.alert('Stream Changed', 'Loading new video stream...');
    } catch (error) {
      console.error('Error changing stream:', error);
      Alert.alert('Error', 'Failed to change stream');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.videoCard}>
          <Text style={styles.title}>{selectedStream?.title}</Text>
          <Text style={styles.subtitle}>{selectedStream?.description}</Text>

          <View style={styles.videoWrapper}>
            <Video
              ref={videoRef}
              source={{ uri: selectedStream?.url || '' }}
              style={styles.video}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={false}
              isLooping={false}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              useNativeControls={false}
            />
          </View>

          <VideoControls
            isPlaying={isPlaying}
            isMuted={isMuted}
            onPlayPause={handlePlayPause}
            onMuteToggle={handleMuteToggle}
            onFullscreen={handleFullscreen}
            onSeekForward={() => handleSeek(10)}
            onSeekBackward={() => handleSeek(-10)}
            currentTime={currentTime}
            duration={duration}
          />
        </Card>

        <Card style={styles.streamCard}>
          <Text style={styles.sectionTitle}>Available Streams</Text>
          <Text style={styles.sectionSubtitle}>
            Switch between different video streams
          </Text>

          <View style={styles.streamList}>
            {VIDEO_STREAMS.map((stream) => (
              <TouchableOpacity
                key={stream.id}
                style={[
                  styles.streamItem,
                  selectedStreamId === stream.id && styles.streamItemActive,
                ]}
                onPress={() => handleStreamChange(stream.id)}
                activeOpacity={0.7}
              >
                <View style={styles.streamContent}>
                  <Text
                    style={[
                      styles.streamTitle,
                      selectedStreamId === stream.id &&
                        styles.streamTitleActive,
                    ]}
                  >
                    {stream.title}
                  </Text>
                  <Text style={styles.streamDescription}>
                    {stream.description}
                  </Text>
                </View>
                {selectedStreamId === stream.id && (
                  <View style={styles.activeIndicator} />
                )}
              </TouchableOpacity>
            ))}
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
    paddingBottom: theme.spacing.xl,
  },
  videoCard: {
    padding: 0,
    overflow: 'hidden',
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  streamCard: {},
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
  streamList: {
    gap: theme.spacing.sm,
  },
  streamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  streamItemActive: {
    backgroundColor: theme.colors.primaryLight + '15',
    borderColor: theme.colors.primary,
  },
  streamContent: {
    flex: 1,
  },
  streamTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  streamTitleActive: {
    color: theme.colors.primary,
  },
  streamDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  infoCard: {
    marginBottom: theme.spacing.md,
  },
  featuresList: {
    gap: theme.spacing.sm,
  },
  featureItem: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
});