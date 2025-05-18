import { create, UseBoundStore, StoreApi } from 'zustand';
import { UserInfo } from '@/types/user';
import { CreditRecord } from '@/types/credit';
import { AnalysisRecord } from '@/types/analysis';

interface UserStore {
  user: UserInfo | null;

  // setter
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
  logoutUser: () => void;

  // credit
  addCredit: (amount: number, record: CreditRecord) => void;
  useCredit: (amount: number, record: CreditRecord) => void;

  // video
  addAnalysisVideo: (video: AnalysisRecord) => void;

  // query
  getVideosByMonth: (year: number, month: number) => AnalysisRecord[];
  getRecentVideos: () => AnalysisRecord[];
}

const useUserStore: UseBoundStore<StoreApi<UserStore>> = create<UserStore>(
  (set, get) => ({
    user: null,

    setUser: user => set({ user }),

    clearUser: () => set({ user: null }),

    logoutUser: () => {
      const currentUser = get().user;
      if (!currentUser) return;
      set({
        user: {
          ...currentUser,
          isLoggedIn: false,
        },
      });
    },

    addCredit: (amount, record) => {
      const currentUser = get().user;
      if (!currentUser) return;
      set({
        user: {
          ...currentUser,
          credit: currentUser.credit + amount,
          creditRecord: [...currentUser.creditRecord, record],
        },
      });
    },

    useCredit: (amount, record) => {
      const currentUser = get().user;
      if (!currentUser) return;
      const newCredit = currentUser.credit - amount;
      set({
        user: {
          ...currentUser,
          credit: newCredit < 0 ? 0 : newCredit,
          creditRecord: [...currentUser.creditRecord, record],
        },
      });
    },

    addAnalysisVideo: video => {
      const currentUser = get().user;
      if (!currentUser) return;
      set({
        user: {
          ...currentUser,
          myAnalysisVideos: [...currentUser.myAnalysisVideos, video],
        },
      });
    },

    getVideosByMonth: (year: number, month: number): AnalysisRecord[] => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      const prefix = `${year}-${pad(month)}`;
      const videos = get().user?.myAnalysisVideos || [];
      return videos.filter(v => v.uploadedAt.startsWith(prefix));
    },

    getRecentVideos: (): AnalysisRecord[] => {
      const videos = get().user?.myAnalysisVideos || [];
      return [...videos].sort((a, b) =>
        b.uploadedAt.localeCompare(a.uploadedAt),
      );
    },
  }),
);

export default useUserStore;
