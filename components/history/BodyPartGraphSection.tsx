import { StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import HistoryTitleSection from './HistoryTitleSection';
import { AnalysisRecord } from '@/types/analysis';
import { vs } from 'react-native-size-matters';
import GraphBlock from './GraphBlock';

interface Props {
  video: AnalysisRecord;
  controlAction: 'play' | 'pause' | 'reset' | 'analysis' | null;
}

export default function BodyPartGraphSection({ video, controlAction }: Props) {
  const {
    leftArm2D,
    leftArm3D,
    rightArm2D,
    rightArm3D,
    leftLeg2D,
    leftLeg3D,
    rightLeg2D,
    rightLeg3D,
  } = video.graphUrls;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.title}>
        <HistoryTitleSection title="부위별 2D & 3D" />
      </ThemedView>
      <GraphBlock
        label="왼팔"
        video2D={leftArm2D}
        video3D={leftArm3D}
        controlAction={controlAction}
      />
      <GraphBlock
        label="오른팔"
        video2D={rightArm2D}
        video3D={rightArm3D}
        controlAction={controlAction}
      />
      <GraphBlock
        label="왼다리"
        video2D={leftLeg2D}
        video3D={leftLeg3D}
        controlAction={controlAction}
      />
      <GraphBlock
        label="오른다리"
        video2D={rightLeg2D}
        video3D={rightLeg3D}
        controlAction={controlAction}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: vs(16),
  },
  title: {
    marginBottom: vs(10),
  },
});
