import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { VideoView, useVideoPlayer } from 'expo-video';
import { AnalysisRecord } from '@/types/user';
import PoseThumbnail from '@/components/history/PoseThumbnail';
import ControlButton from './ControlButton';
import Typography from '@/constants/Typography';
import { formatDate } from 'date-fns';
import { s, vs } from 'react-native-size-matters';
import { ThemedView } from '../ThemedView';

interface Props {
  video: AnalysisRecord;
}

export default function GolfPose2DPanel({ video }: Props) {
  const videoSource = useMemo(() => {
    return typeof video.videoUrl === 'string'
      ? { uri: video.videoUrl }
      : video.videoUrl;
  }, [video.videoUrl]);

  const videoDate = useMemo(
    () => `${formatDate(new Date(video.uploadedAt), 'yyyy. MM. dd.')} 영상`,
    [video.uploadedAt],
  );

  const player = useVideoPlayer(videoSource, p => {
    p.loop = true;
    p.play();
  });

  useEffect(() => () => {}, [player]);

  const [selected, setSelected] = useState<string | null>(null);
  const handle = (action: string) => {
    setSelected(action);
    setTimeout(() => setSelected(null), 800);

    switch (action) {
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
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.date}>{videoDate}</ThemedText>
      <ControlButton selected={selected} onPress={handle} />
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
  date: {
    fontSize: Typography.xl,
    fontWeight: '500',
    marginBottom: vs(16),
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
