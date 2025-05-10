import { create } from 'zustand';
import {
  UserInfo,
  CreditRecord,
  PurchaseRecord,
  AnalysisRecord,
} from '@/types/user';

interface UserStore {
  user: UserInfo | null;

  // setter
  setUser: (user: UserInfo) => void;
  clearUser: () => void;

  // credit
  addCredit: (amount: number, record: CreditRecord) => void;
  useCredit: (amount: number, record: CreditRecord) => void;

  // purchase
  addPurchase: (record: PurchaseRecord) => void;

  // analysis
  addAnalysisVideo: (video: AnalysisRecord) => void;
  getRecentVideos: () => AnalysisRecord[];
  getVideosByMonth: (year: number, month: number) => AnalysisRecord[];
  getVideoById: (id: string) => AnalysisRecord | undefined;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,

  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),

  addCredit: (amount, record) =>
    set(state => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          credit: state.user.credit + amount,
          creditRecord: [...state.user.creditRecord, record],
        },
      };
    }),

  useCredit: (amount, record) =>
    set(state => {
      if (!state.user) return state;
      const newCredit = state.user.credit - amount;
      return {
        user: {
          ...state.user,
          credit: newCredit < 0 ? 0 : newCredit,
          creditRecord: [...state.user.creditRecord, record],
        },
      };
    }),

  addPurchase: record =>
    set(state => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          purchasedRecord: [...state.user.purchasedRecord, record],
        },
      };
    }),

  addAnalysisVideo: video =>
    set(state => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          myAnalysisVideos: [...state.user.myAnalysisVideos, video],
        },
      };
    }),

  getRecentVideos: () => {
    const state = get();
    return state.user?.myAnalysisVideos ?? [];
  },

  getVideosByMonth: (year, month) => {
    const state = get();
    return (
      state.user?.myAnalysisVideos.filter(video => {
        const date = new Date(video.uploadedAt);
        return date.getFullYear() === year && date.getMonth() + 1 === month;
      }) ?? []
    );
  },

  getVideoById: id => {
    const state = get();
    return state.user?.myAnalysisVideos.find(video => video.id === id);
  },
}));

export default useUserStore;
