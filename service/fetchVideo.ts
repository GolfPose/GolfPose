import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/useUserStore';
import { AnalysisRecord } from '@/types/analysis';
import * as VideoThumbnails from 'expo-video-thumbnails';

let offset = 0;
const limit = 5;

export async function fetchVideo() {
  const storeState = useUserStore.getState();
  // const userId = storeState.user?.id;
  const userId = 13;

  const { data: videoData, error } = await supabase
    .from('golfpose')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Supabase fetch 에러:', error);
    return;
  }

  if (!videoData || videoData.length === 0) {
    console.log('더 이상 가져올 영상이 없습니다.');
    return;
  }

  const { setUser } = useUserStore.getState();
  const currentUser = useUserStore.getState().user;

  if (!currentUser) return;

  // 1️⃣ 새로 불러온 데이터 → AnalysisRecord로 매핑
  const newAnalysisVideos: AnalysisRecord[] = videoData.map(item => ({
    id: item.id.toString(),
    uploadedAt: item.created_at,
    videoUrl: item.original_video_url,
    status: item.status,
    swingImages: Array.from({ length: 8 }, (_, i) => ({
      title: `Swing ${i}`,
      image: item[`swing_img_${i}`],
    })),
    graphUrls: {
      leftArm2D: item.left_arm_2d_url,
      rightArm2D: item.right_arm_2d_url,
      leftLeg2D: item.left_leg_2d_url,
      rightLeg2D: item.right_leg_2d_url,
      leftArm3D: item.left_arm_3d_url,
      rightArm3D: item.right_arm_3d_url,
      leftLeg3D: item.left_leg_3d_url,
      rightLeg3D: item.right_leg_3d_url,
    },
    thumbnailUrl: undefined,
    pose3DUrl: item.main_3d_url,
  }));

  setUser({
    ...currentUser,
    myAnalysisVideos: [...currentUser.myAnalysisVideos, ...newAnalysisVideos],
  });

  // 썸네일 비동기 생성
  const startIndex = currentUser.myAnalysisVideos.length;
  const thumbnailPromises = newAnalysisVideos.map(async (video, index) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(video.videoUrl, {
        time: 0,
      });

      const updatedVideos = [...useUserStore.getState().user!.myAnalysisVideos];
      updatedVideos[startIndex + index] = {
        ...updatedVideos[startIndex + index],
        thumbnailUrl: uri,
      };

      setUser({
        ...useUserStore.getState().user!,
        myAnalysisVideos: updatedVideos,
      });
    } catch (err) {
      console.warn(`썸네일 생성 실패 (id: ${video.id}):`, err);
    }
  });

  await Promise.all(thumbnailPromises);

  console.log(`${offset + videoData.length}개 영상 불러옴`);

  // 가져올 영상 남으면 재귀
  if (videoData.length === limit) {
    offset += limit;
    await fetchVideo();
  } else {
    console.log('모든 영상 불러오기 완료');
  }
}
