import React, { useState, useMemo } from 'react';
import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import useUserStore from '@/store/useUserStore';
import { format } from 'date-fns';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import VideoModal from '@/components/history/VideoModal';
import { ThemedView } from '../ThemedView';
import AnalysisCard from './AnalysisCard';
import { vs } from 'react-native-size-matters';

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
  const currentMonth = useMemo(() => new Date().getMonth() + 1, []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const getVideosByMonth = useUserStore(state => state.getVideosByMonth);
  const currentMonthVideos = useMemo(
    () => getVideosByMonth(currentYear, currentMonth),
    [getVideosByMonth, currentYear, currentMonth],
  );

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
        data={currentMonthVideos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AnalysisCard
            thumbnail={toImageSource(item.thumbnailUrl)}
            date={format(new Date(item.uploadedAt), 'yyyy.MM.dd')}
            status={item.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 'COMPLETE'}
            onPress={() => onSelect(item.id)}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />

      <VideoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={onSelect}
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
