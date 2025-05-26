import { CreditRecord } from './credit';
import { AnalysisRecord } from './analysis';

export interface UserInfo {
  uid: string;
  isLoggedIn: boolean;
  name: string;
  email: string;
  plan: 'free' | 'basic' | 'premium';
  createdAt: string;
  credit: number;
  creditRecord: CreditRecord[];
  myAnalysisVideos: AnalysisRecord[];
}
