import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { AnalysisRecord } from '@/types/analysis';
import PoseThumbnail from '@/components/history/PoseThumbnail';
import { ThemedView } from '../ThemedView';
import { vs } from 'react-native-size-matters';

interface Props {
  video: AnalysisRecord;
}

export default function GolfPoseSwingImageGrid({ video }: Props) {
  const swingTitles = [
    'Address',
    'Top-up',
    'Mid-backing swing',
    'Top',
    'Mid-down swing',
    'Impact',
    'Mid follow throw',
    'Finish',
  ];

  const swingImagesWithTitles = video.swingImages.map((item, index) => ({
    ...item,
    title: swingTitles[index],
  }));

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={swingImagesWithTitles}
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
    marginBottom: vs(16),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: vs(8),
  },
});
