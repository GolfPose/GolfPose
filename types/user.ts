import { CreditRecord } from './credit';
import { AnalysisRecord } from './analysis';
import { PurchaseRecord } from './purchase';

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
