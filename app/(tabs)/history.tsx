import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/Header';
import TitleSection from '@/components/TitleSection';
import AnalysisVideoSection from '@/components/history/AnalysisVideoSection';
import GolfPose2DPanel from '@/components/history/GolfPose2DPanel';
import ControlButton from '@/components/history/ControlButton';
import { s, vs } from 'react-native-size-matters';
import useUserStore from '@/store/useUserStore';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { getColor } from '@/utils/getColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { format as formatDate } from 'date-fns';
import Typography from '@/constants/Typography';

export type ControlAction = 'play' | 'pause' | 'reset' | 'analysis' | null;

export default function HistoryScreen() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [controlAction, setControlAction] = useState<ControlAction>(null);

  const video = useUserStore(state =>
    state.user?.myAnalysisVideos.find(v => v.id === selectedVideoId),
  );
  const theme = useTheme();
  const bgColor = getColor(theme, {
    light: Colors.common.white,
    dark: Colors.common.black,
  });

  const videoDate = useMemo(
    () =>
      video
        ? `${formatDate(new Date(video.uploadedAt), 'yyyy. MM. dd.')} 영상`
        : '',
    [video?.uploadedAt],
  );

  return (
    <ScrollView style={[styles.root, { backgroundColor: bgColor }]}>
      <Header showUserInfo={false} />
      <ThemedView style={styles.container}>
        <TitleSection title="나의 분석 영상" />
        <AnalysisVideoSection
          selectedId={selectedVideoId}
          onSelect={setSelectedVideoId}
        />
        {video?.status === 'COMPLETE' && (
          <>
            <ThemedText style={styles.date}>{videoDate}</ThemedText>
            <ControlButton
              selected={controlAction}
              onPress={setControlAction}
            />
            <GolfPose2DPanel
              key={video.id}
              video={video}
              controlAction={controlAction}
            />
            {/*
            <BodyPartGraphSection video={video} />
            <GolfPose3DPanel video={video} />
            */}
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: s(16),
    marginBottom: vs(100),
  },
  date: {
    fontSize: Typography.xl,
    fontWeight: '500',
    marginTop: vs(16),
    marginBottom: vs(12),
  },
});
