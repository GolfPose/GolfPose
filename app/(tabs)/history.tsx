import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '@/components/Header';
import TitleSection from '@/components/TitleSection';
import AnalysisVideoSection from '@/components/history/AnalysisVideoSection';
import GolfPose2DPanel from '@/components/history/GolfPose2DPanel';
import { s, vs } from 'react-native-size-matters';
/* 
import BodyPartGraphSection from '@/components/history/BodyPartGraphSection';
import GolfPose3DPanel from '@/components/history/GolfPose3DPanel';
*/
import useUserStore from '@/store/useUserStore';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { getColor } from '@/utils/getColor';
import { Colors } from '@/constants/Colors';

export default function HistoryScreen() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const video = useUserStore(state =>
    state.user?.myAnalysisVideos.find(v => v.id === selectedVideoId),
  );
  const theme = useTheme();
  const bgColor = getColor(theme, {
    light: Colors.common.white,
    dark: Colors.common.black,
  });

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
            <GolfPose2DPanel key={video.id} video={video} />
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
});
