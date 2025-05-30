import { AnalysisRecord } from './analysis';
import { CreditRecord } from './credit';

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
