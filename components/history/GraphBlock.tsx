import React, { useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { s, vs } from 'react-native-size-matters';
import Typography from '@/constants/Typography';

interface Props {
  label: string;
  video2D: string;
  video3D: string;
  controlAction: 'play' | 'pause' | 'reset' | 'analysis' | null;
}

export default function BodyPartGraphBlock({
  label,
  video2D,
  video3D,
  controlAction,
}: Props) {
  const video2DSource = useMemo(() => {
    return typeof video2D === 'string' ? { uri: video2D } : video2D;
  }, [video2D]);
  const video3DSource = useMemo(() => {
    return typeof video3D === 'string' ? { uri: video3D } : video3D;
  }, [video3D]);

  const player2D = useVideoPlayer(video2DSource, p => {
    p.loop = true;
    p.play();
  });
  const player3D = useVideoPlayer(video3DSource, p => {
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

    control(player2D);
    control(player3D);
  }, [controlAction]);

  return (
    <ThemedView>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedView style={styles.videoRow}>
        {video2D && <VideoView player={player2D} style={styles.graph} />}
        {video3D && <VideoView player={player3D} style={styles.graph} />}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  label: {
    marginLeft: s(8),
    marginBottom: vs(8),
    fontSize: Typography.md,
    fontWeight: '600',
  },
  videoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  graph: {
    width: '50%',
    height: vs(120),
    borderRadius: s(8),
  },
});
