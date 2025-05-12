import React, { useMemo } from 'react';
import {
  Modal,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import useUserStore from '@/store/useUserStore';
import { format } from 'date-fns';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { getColor } from '@/utils/getColor';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MODAL_WIDTH = SCREEN_WIDTH * 0.9 - s(24);

export default function VideoModal({ visible, onClose, onSelect }: Props) {
  const getRecentVideos = useUserStore(state => state.getRecentVideos);
  const videos = useMemo(() => getRecentVideos(), [getRecentVideos]);
  const ITEM_SIZE = (MODAL_WIDTH - s(6) * 2) / 2;

  const theme = useTheme();
  const backgroundColor = getColor(theme, {
    light: Colors.common.white,
    dark: Colors.common.black,
  });
  const overlayBackground = getColor(theme, {
    light: 'rgba(0,0,0,0.3)',
    dark: 'rgba(255,255,255,0.2)',
  });
  const iconColor = getColor(theme, {
    light: Colors.common.black,
    dark: Colors.common.white,
  });
  const dateColor = getColor(theme, {
    light: Colors.common.gray600,
    dark: Colors.common.gray300,
  });

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <ThemedView
        style={[styles.modalBackground, { backgroundColor: overlayBackground }]}
      >
        <ThemedView style={[styles.modalContainer, { backgroundColor }]}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={s(20)} color={iconColor} />
          </Pressable>

          <FlatList
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.columnWrapper}
            data={videos}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const isFirstCol = index % 2 === 0;
              const isLastOdd =
                videos.length % 2 === 1 && index === videos.length - 1;

              return (
                <Pressable
                  style={[
                    styles.item,
                    { width: ITEM_SIZE },
                    isFirstCol && { marginRight: s(6) },
                    isLastOdd && { marginRight: 'auto' },
                  ]}
                  onPress={() => {
                    onSelect(item.id);
                    onClose();
                  }}
                >
                  <ThemedView style={styles.thumbWrapper}>
                    <Image
                      source={
                        typeof item.thumbnailUrl === 'string'
                          ? { uri: item.thumbnailUrl }
                          : item.thumbnailUrl
                      }
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />
                  </ThemedView>
                  <ThemedText style={[styles.date, { color: dateColor }]}>
                    {format(new Date(item.uploadedAt), 'yyyy.MM.dd')}
                  </ThemedText>
                </Pressable>
              );
            }}
          />
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    borderRadius: s(12),
    padding: s(12),
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: s(8),
    right: s(8),
    zIndex: 10,
    padding: s(4),
  },
  listContainer: {
    paddingTop: vs(32),
    paddingBottom: vs(16),
    paddingHorizontal: s(3),
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  item: {
    marginVertical: vs(6),
    alignItems: 'center',
  },
  thumbWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: s(8),
    overflow: 'hidden',
    marginBottom: vs(6),
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  date: {
    fontSize: Typography.md,
  },
});
