export interface UserInfo {
  isLoggedIn: boolean;
  name: string;
  email: string;
  plan: 'free' | 'basic' | 'premium';
  createdAt: string;
  credit: number;
  creditRecord: CreditRecord[];
  purchasedRecord: PurchaseRecord[];
  myAnalysisVideos: AnalysisRecord[];
  accessToken: string;
  refreshToken?: string;
}

export interface CreditRecord {
  id: string;
  date: string;
  change: number;
  type: 'charge' | 'use';
}

export interface PurchaseRecord {
  id: string;
  plan: string;
  price: number;
  date: string;
}

export type AnalysisStatus =
  | 'COMPLETE'
  | 'SWING_COMPLETE'
  | 'ANGLE_ESTIMATION_COMPLETE'
  | 'IN_PROGRESS';

export interface AnalysisRecord {
  id: string;
  uploadedAt: string;
  videoUrl: string;
  status: AnalysisStatus;
  avatarUrl?: string;
  swingImages: { title: string; image: string }[];
  graphUrls: {
    leftArm2D?: string;
    rightArm2D?: string;
    leftLeg2D?: string;
    rightLeg2D?: string;
    main2D?: string;

    leftArm3D?: string;
    rightArm3D?: string;
    leftLeg3D?: string;
    rightLeg3D?: string;
    main3D?: string;
  };
  pose3DUrl?: string;
}
