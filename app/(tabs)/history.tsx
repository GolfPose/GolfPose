import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Header from '@/components/Header';
import TitleSection from '@/components/TitleSection';
import AnalysisVideoSection from '@/components/history/AnalysisVideoSection';
import GolfPose2DPanel from '@/components/history/GolfPose2DPanel';
import BodyPartGraphSection from '@/components/history/BodyPartGraphSection';
import GolfPose3DPanel from '@/components/history/GolfPose3DPanel';
import useUserStore from '@/store/useUserStore';

export default function HistoryScreen() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const video = useUserStore(state =>
    state.user?.myAnalysisVideos.find(v => v.id === selectedVideoId),
  );

  return (
    <ScrollView>
      <Header showUserInfo={false} />
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <TitleSection title="나의 분석 영상" />
        <AnalysisVideoSection
          selectedId={selectedVideoId}
          onSelect={setSelectedVideoId}
        />
        {video && (
          <>
            <GolfPose2DPanel video={video} />
            <BodyPartGraphSection video={video} />
            <GolfPose3DPanel video={video} />
          </>
        )}
      </View>
    </ScrollView>
  );
}
