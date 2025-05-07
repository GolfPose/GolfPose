import React, { useState } from 'react';
import Header from '@/components/Header';
import { Image, Pressable, StyleSheet, useColorScheme, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { s, vs } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';
import PoseThumbnail from '@/components/history/PoseThumbnail';

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const handlePress = (key: string) => {
    setSelectedButton(key);
    setTimeout(() => {
      setSelectedButton(null);
    }, 1000);
    
    console.log(`${key} 클릭`);
  };

  const poses = [
    { title: 'Address', image: require('@/assets/images/swing2.jpg') },
    { title: 'Top-up', image: require('@/assets/images/swing2.jpg') },
    { title: 'Mid-backing swing', image: require('@/assets/images/swing2.jpg') },
    { title: 'Top', image: require('@/assets/images/swing2.jpg') },
    { title: 'Mid-down swing', image: require('@/assets/images/swing2.jpg') },
    { title: 'Impact', image: require('@/assets/images/swing2.jpg') },
    { title: 'Mid follow throw', image: require('@/assets/images/swing2.jpg') },
    { title: 'Finish', image: require('@/assets/images/swing2.jpg') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header showUserInfo={false} />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>나의 분석 영상</ThemedText>

        <ThemedView style={styles.videoRow}>
          <Pressable style={styles.videoCard} onPress={() => setSelectedDate('2025.03.18')}>
            <Image source={require('@/assets/images/swing1.jpg')} style={styles.videoImage} />
            <Pressable style={styles.overlayButton}>
              <ThemedText style={styles.overlayText}>분석중</ThemedText>
            </Pressable>
            <ThemedText style={styles.dateText}>2025.03.18.</ThemedText>
          </Pressable>

          <Pressable style={styles.videoCard} onPress={() => setSelectedDate('2025.03.18')}>
            <Image source={require('@/assets/images/swing2.jpg')} style={styles.videoImage} />
            <Pressable style={styles.overlayButton}>
              <ThemedText style={styles.overlayText}>분석중</ThemedText>
            </Pressable>
            <ThemedText style={styles.dateText}>2025.03.18.</ThemedText>
          </Pressable>
        </ThemedView>

        {selectedDate && (
          <>
            <ThemedText style={styles.videoTitle}>{selectedDate} 영상</ThemedText>

            <ThemedView style={styles.buttonRow}>
              <Pressable
                style={[
                  styles.button, styles.play,
                  selectedButton === 'play' && styles.selectedButton,
                ]}
                onPress={() => handlePress('play')}
              >
                <ThemedText
                  style={[
                    styles.buttonText,
                    selectedButton === 'play' && styles.selectedButtonText,
                  ]}
                >
                  ▷동시 재생
                </ThemedText>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  selectedButton === 'pause' && styles.selectedButton,
                ]}
                onPress={() => handlePress('pause')}
              >
                <ThemedText
                  style={[
                    styles.buttonText,
                    selectedButton === 'pause' && styles.selectedButtonText,
                  ]}
                >
                  ⏸ 동시 정지
                </ThemedText>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  selectedButton === 'reset' && styles.selectedButton,
                ]}
                onPress={() => handlePress('reset')}
              >
                <ThemedText
                  style={[
                    styles.buttonText,
                    selectedButton === 'reset' && styles.selectedButtonText,
                  ]}
                >
                  ◁영상 시간 초기화
                </ThemedText>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  selectedButton === 'analysis' && styles.selectedButton,
                ]}
                onPress={() => handlePress('analysis')}
              >
                <ThemedText
                  style={[
                    styles.buttonText,
                    selectedButton === 'analysis' && styles.selectedButtonText,
                  ]}
                >
                  솔루션 분석
                </ThemedText>
              </Pressable>
            </ThemedView>

            {/* 썸네일 전체 이미지 */}
            <Image source={require('@/assets/images/swing2.jpg')} style={styles.fullThumbnail} />

            <ThemedText style={styles.subtitle}>골프자세 2D</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {poses.map((pose, index) => (
                <PoseThumbnail key={index} title={pose.title} imageSource={pose.image}
                  onPress={() => console.log(`${pose.title} 클릭됨`)} />
              ))}
            </ScrollView>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: vs(50),
  },
  container: {
    flex: 1,
    padding: s(16),
  },
  title: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    marginBottom: vs(16),
  },
  videoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(16),
  },
  videoCard: {
    width: s(150),
    position: 'relative',
  },
  videoImage: {
    width: s(150),
    height: vs(120),
    borderRadius: s(8),
  },
  overlayButton: {
    position: 'absolute',
    top: vs(8),
    right: s(8),
    backgroundColor: Colors.common.black,
    paddingHorizontal: s(8),
    paddingVertical: vs(4),
    borderRadius: s(4),
    opacity: 0.8,
  },
  overlayText: {
    color: Colors.common.white,
    fontSize: Typography.sm,
  },
  dateText: {
    marginTop: vs(4),
    fontSize: Typography.sm,
    textAlign: 'center',
    color: Colors.common.gray500,
  },
  videoTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    marginBottom: vs(8),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(16),
  },
  button: {
    flex: 1,
    backgroundColor: Colors.common.gray600,
    borderRadius: s(6),
    paddingVertical: vs(1),
    marginHorizontal: s(4),
    alignItems: 'center',
  },
  play: {
    backgroundColor: Colors.common.primary500,
  },
  buttonText: {
    color: Colors.common.black,
    fontSize: Typography.sm,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Typography.md,
    fontWeight: '600',
    marginBottom: vs(8),
  },
  poseImage: {
    width: s(80),
    height: vs(100),
    marginRight: s(8),
    borderRadius: s(6),
  },
  fullThumbnail: {
    width: s(315),
    height: vs(200),
    borderRadius: s(8),
    marginBottom: vs(16),
  },
  selectedButton: {
    backgroundColor: Colors.common.white,
  },
  selectedButtonText: {
    color: Colors.common.black,
    fontWeight: 'bold',
  },

});
