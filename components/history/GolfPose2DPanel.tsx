import React, { useEffect, useMemo } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { VideoView, useVideoPlayer } from 'expo-video';
import { AnalysisRecord } from '@/types/analysis';
import PoseThumbnail from '@/components/history/PoseThumbnail';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';
import { ThemedView } from '../ThemedView';

interface Props {
  video: AnalysisRecord;
  controlAction: 'play' | 'pause' | 'reset' | 'analysis' | null;
}

export default function GolfPose2DPanel({ video, controlAction }: Props) {
  const videoSource = useMemo(() => {
    return typeof video.videoUrl === 'string'
      ? { uri: video.videoUrl }
      : video.videoUrl;
  }, [video.videoUrl]);

  const player = useVideoPlayer(videoSource, p => {
    p.loop = true;
    p.play();
  });

  useEffect(() => {
    if (!controlAction) return;

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
      case 'analysis':
        console.log('분석 기능은 추후 구현 예정입니다.');
        break;
    }
  }, [controlAction]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>골프자세 2D</ThemedText>
      <VideoView player={player} style={styles.mainVideo} allowsFullscreen />

      <FlatList
        data={video.swingImages}
        keyExtractor={(_, i) => i.toString()}
        numColumns={4}
        renderItem={({ item }) => (
          <PoseThumbnail title={item.title} imageSource={item.image} />
        )}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: vs(16),
  },
  title: {
    fontSize: Typography.xl,
    fontWeight: '600',
    marginVertical: vs(14),
  },
  mainVideo: {
    width: '100%',
    minHeight: vs(160),
    borderRadius: s(8),
    backgroundColor: Colors.common.white,
    marginBottom: vs(12),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: vs(8),
  },
});
