import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { s, vs } from 'react-native-size-matters';
import Typography from '@/constants/Typography';

interface Props {
  title: string;
  imageSource: any;
  onPress: () => void;
}

export default function PoseThumbnail({ title, imageSource, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <ThemedText style={styles.title}>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: s(8),
    alignItems: 'center',
  },
  image: {
    width: s(60),
    height: vs(60),
    borderRadius: s(6),
  },
  title: {
    marginTop: vs(4),
    fontSize: Typography.xs,
    textAlign: 'center',
  },
});
