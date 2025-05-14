import React from 'react';
import { Pressable, Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { s, vs } from 'react-native-size-matters';
import Typography from '@/constants/Typography';

interface Props {
  thumbnail: any;
  date: string;
  status?: 'COMPLETE' | 'IN_PROGRESS';
  onPress: () => void;
  selected: boolean;
}

function AnalysisCardComponent({
  thumbnail,
  date,
  status,
  onPress,
  selected,
}: Props) {
  return (
    <ThemedView style={[styles.wrapper, selected && styles.borderWrapper]}>
      <Pressable style={styles.card} onPress={onPress}>
        <Image source={thumbnail} style={styles.thumb} resizeMode="cover" />
        {status === 'IN_PROGRESS' && (
          <View style={styles.overlayContainer}>
            <View style={styles.overlay} />
            <ThemedText style={styles.badge}>분석중</ThemedText>
          </View>
        )}
        <ThemedText style={styles.date}>{date}</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

function areEqual(prev: Props, next: Props) {
  return (
    prev.selected === next.selected &&
    prev.thumbnail === next.thumbnail &&
    prev.date === next.date &&
    prev.status === next.status
  );
}

const AnalysisCard = React.memo(AnalysisCardComponent, areEqual);
export default AnalysisCard;

const styles = StyleSheet.create({
  wrapper: {
    marginRight: s(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: s(10),
  },
  borderWrapper: {
    padding: s(1),
    borderWidth: 2,
    borderColor: Colors.common.primary600,
    borderRadius: s(10),
  },
  card: {
    width: s(130),
    height: vs(130),
    borderRadius: s(8),
    overflow: 'hidden',
    position: 'relative',
  },
  thumb: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  badge: {
    paddingHorizontal: s(10),
    paddingVertical: vs(4),
    backgroundColor: 'rgba(51, 51, 51, 0.7)',
    color: Colors.common.white,
    borderRadius: s(6),
    fontSize: Typography.lg,
    fontWeight: 'bold',
    textAlign: 'center',
    elevation: 3,
    zIndex: 3,
  },
  date: {
    position: 'absolute',
    bottom: s(8),
    left: s(8),
    color: Colors.common.white,
    fontSize: Typography.lg,
    fontWeight: 'bold',
    zIndex: 4,
    elevation: 4,
  },
});
