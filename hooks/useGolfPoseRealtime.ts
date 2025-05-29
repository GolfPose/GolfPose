import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/useUserStore';
import { fetchSingleVideo } from '@/service/fetchSingleVideo';

export function useGolfPoseRealtime(userId: number) {
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`golfpose_changes_${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'golfpose',
          filter: `user_id=eq.${userId}`,
        },
        async payload => {
          console.log('Status 업데이트 감지:', payload);
          const updatedId = payload.new.id;
          const updatedVideo = await fetchSingleVideo(updatedId);
          if (updatedVideo) {
            const { user, setUser } = useUserStore.getState();
            if (!user) return;
            const updatedVideos = user.myAnalysisVideos.map(v =>
              v.id === updatedId.toString() ? updatedVideo : v,
            );
            setUser({ ...user, myAnalysisVideos: updatedVideos });
          }
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [userId]);
}
