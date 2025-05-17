import React, { useState, useMemo, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  LayoutChangeEvent,
} from 'react-native';
import Header from '@/components/Header';
import TitleSection from '@/components/TitleSection';
import AnalysisVideoSection from '@/components/history/AnalysisVideoSection';
import GolfPose2DPanel from '@/components/history/GolfPose2DPanel';
import ControlButton from '@/components/history/ControlButton';
import { ms, s, vs } from 'react-native-size-matters';
import useUserStore from '@/store/useUserStore';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { getColor } from '@/utils/getColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { format as formatDate } from 'date-fns';
import Typography from '@/constants/Typography';
import BodyPartGraphSection from '@/components/history/BodyPartGraphSection';
import GolfPose3DPanel from '@/components/history/GolfPose3DPanel';
import { RequireLogin } from '@/components/auth/RequireLogin';

export type ControlAction = 'play' | 'pause' | 'reset' | 'analysis' | null;

export default function HistoryScreen() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [controlAction, setControlAction] = useState<ControlAction>(null);
  const [showFixed, setShowFixed] = useState(false);
  const controlBtnY = useRef(0);

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

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    setShowFixed(y > controlBtnY.current + ms(70));
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    controlBtnY.current = e.nativeEvent.layout.y;
  };

  return (
    <RequireLogin>
      <View style={styles.wrapper}>
        <ScrollView
          style={[styles.root, { backgroundColor: bgColor }]}
          onScroll={handleScroll}
          scrollEventThrottle={s(16)}
        >
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
                {!showFixed ? (
                  <ThemedView onLayout={handleLayout}>
                    <ControlButton
                      selected={controlAction}
                      onPress={setControlAction}
                    />
                  </ThemedView>
                ) : (
                  <ThemedView style={styles.placeholder}></ThemedView>
                )}
                <GolfPose2DPanel
                  key={video.id}
                  video={video}
                  controlAction={controlAction}
                />
                <BodyPartGraphSection
                  video={video}
                  controlAction={controlAction}
                />
                <GolfPose3DPanel video={video} controlAction={controlAction} />
              </>
            )}
          </ThemedView>
        </ScrollView>
        {showFixed && video?.status === 'COMPLETE' && (
          <ThemedView style={styles.controlFixed}>
            <ControlButton selected={controlAction} onPress={setControlAction} />
          </ThemedView>
        )}
      </View>
    </RequireLogin>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
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
  controlFixed: {
    position: 'absolute',
    top: 0,
    left: s(16),
    right: s(16),
    zIndex: 10,
  },
  placeholder: {
    height: ms(55),
  },
});
