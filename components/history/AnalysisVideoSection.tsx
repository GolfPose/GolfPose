import React, { useState, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import useUserStore from '@/store/useUserStore';
import { format } from 'date-fns';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import VideoModal from '@/components/history/VideoModal';
import { ThemedView } from '../ThemedView';
import AnalysisCard from './AnalysisCard';
import { vs } from 'react-native-size-matters';
import { AnalysisRecord } from '@/types/analysis';

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const toImageSource = (src?: string | number) =>
  src
    ? typeof src === 'string'
      ? { uri: src }
      : src
    : require('@/assets/images/noimage.jpg');

export default function AnalysisVideoSection({ selectedId, onSelect }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [extraVideo, setExtraVideo] = useState<AnalysisRecord | null>(null);

  const allVideos = useUserStore(state => state.user?.myAnalysisVideos || []);
  const recentVideos = useMemo(() => allVideos.slice(0, 5), [allVideos]);

  const displayVideos = useMemo(() => {
    if (extraVideo && !recentVideos.find(v => v.id === extraVideo.id)) {
      return [extraVideo, ...recentVideos];
    }
    return recentVideos;
  }, [extraVideo, recentVideos]);

  const handleSelect = (id: string) => {
    const selected = allVideos.find(v => v.id === id);
    if (selected) {
      setExtraVideo(selected);
    }
    onSelect(id);
    setModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerRow}>
        <Pressable
          style={styles.moreButton}
          onPress={() => setModalVisible(true)}
        >
          <ThemedText style={styles.moreText}>+ 더보기</ThemedText>
        </Pressable>
      </ThemedView>

      <FlatList
        horizontal
        data={displayVideos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AnalysisCard
            thumbnail={toImageSource(item.thumbnailUrl)}
            date={format(new Date(item.uploadedAt), 'yyyy.MM.dd')}
            status={item.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 'COMPLETE'}
            onPress={() => onSelect(item.id)}
            selected={item.id === selectedId}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />

      <VideoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelect}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: vs(16),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(8),
  },
  moreButton: {
    marginLeft: 'auto',
  },
  moreText: {
    color: Colors.common.primary500,
  },
});
