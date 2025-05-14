import React, { useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { ThemedView } from '@/components/ThemedView';
import { s, vs } from 'react-native-size-matters';
import HistoryTitleSection from './HistoryTitleSection';
import { AnalysisRecord } from '@/types/analysis';

interface Props {
  video: AnalysisRecord;
  controlAction: 'play' | 'pause' | 'reset' | 'analysis' | null;
}

export default function GolfPose3DPanel({ video, controlAction }: Props) {
  const videoSource = useMemo(() => {
    return typeof video.pose3DUrl === 'string'
      ? { uri: video.pose3DUrl }
      : video.pose3DUrl;
  }, [video.pose3DUrl]);

  const player = useVideoPlayer(videoSource, p => {
    p.loop = true;
    p.play();
  });

  useEffect(() => {
    if (!controlAction) return;

    const control = (player: ReturnType<typeof useVideoPlayer>) => {
      switch (controlAction) {
        case 'play':
          player.play();
          break;
        case 'pause':
          player.pause();
          break;
        case 'reset':
          player.currentTime = 0;
          player.pause();
          break;
      }
    };

    control(player);
  }, [controlAction]);

  return (
    <ThemedView>
      <HistoryTitleSection title="골프자세 3D" />
      <VideoView player={player} style={styles.video} allowsFullscreen />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: vs(220),
    borderRadius: s(8),
    marginTop: vs(10),
  },
});
