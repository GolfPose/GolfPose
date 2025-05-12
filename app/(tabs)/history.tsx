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

export default function HistoryScreen() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const video = useUserStore(state =>
    state.user?.myAnalysisVideos.find(v => v.id === selectedVideoId),
  );

  return (
    <ScrollView>
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
  container: {
    paddingHorizontal: s(16),
    marginBottom: vs(100),
  },
});
