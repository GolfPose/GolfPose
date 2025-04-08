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

export interface AnalysisRecord {
  id: string;
  uploadedAt: string;
  videoUrl: string;
}
