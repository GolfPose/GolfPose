export type AnalysisStatus =
  | 'COMPLETE'
  | 'SWING_COMPLETE'
  | 'ANGLE_ESTIMATION_COMPLETE'
  | 'IN_PROGRESS';

export interface SwingImage {
  title: string;
  image: string;
}

export interface GraphUrls {
  leftArm2D: string;
  rightArm2D: string;
  leftLeg2D: string;
  rightLeg2D: string;
  leftArm3D: string;
  rightArm3D: string;
  leftLeg3D: string;
  rightLeg3D: string;
}

export interface AnalysisRecord {
  id: string;
  uploadedAt: string;
  videoUrl: string;
  status: AnalysisStatus;
  avatarUrl?: string;
  thumbnailUrl?: string;
  swingImages: SwingImage[];
  graphUrls: GraphUrls;
  pose3DUrl?: string;
}
