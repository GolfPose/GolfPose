import { CreditRecord } from './credit';
import { AnalysisRecord } from './analysis';

export interface UserInfo {
  id: number;
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
