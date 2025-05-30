import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { s, vs } from 'react-native-size-matters';
import Typography from '@/constants/Typography';

interface Props {
  title: string;
  imageSource: any;
}

export default function PoseThumbnail({ title, imageSource }: Props) {
  const resolvedSource =
    typeof imageSource === 'string'
      ? { uri: imageSource }
      : imageSource || require('@/assets/images/noimage.jpg');

  return (
    <Pressable style={[styles.container, { marginRight: GAP }]}>
      <ThemedView style={styles.titleBox}>
        <ThemedText numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {title}
        </ThemedText>
      </ThemedView>

      <Image source={resolvedSource} style={styles.image} resizeMode="cover" />
    </Pressable>
  );
}

const IMAGE_SIZE = s(72);
const GAP = s(6);
const TITLE_H = vs(32);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: IMAGE_SIZE,
  },
  titleBox: {
    width: '100%',
    height: TITLE_H,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.xs,
    lineHeight: vs(10),
    textAlign: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: s(6),
  },
});
