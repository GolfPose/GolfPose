import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/useUserStore';
import { AnalysisRecord } from '@/types/analysis';
import * as VideoThumbnails from 'expo-video-thumbnails';

export async function fetchVideo() {
  const storeState = useUserStore.getState();
  const setUser = storeState.setUser;
  const updateVideoThumbnail = storeState.updateVideoThumbnail;
  const userId = storeState.user?.id;

  if (!userId) return;

  let offset = 0;
  let hasMore = true;
  const allFetchedVideos: AnalysisRecord[] = [];

  while (hasMore) {
    const dynamicLimit = offset < 5 ? 1 : 5;

    const { data: videoData, error } = await supabase
      .from('golfpose')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + dynamicLimit - 1);

    if (error) {
      console.error('Supabase fetch 에러:', error);
      return;
    }

    if (!videoData || videoData.length === 0) {
      console.log('더 이상 가져올 영상이 없습니다.');
      break;
    }

    const newAnalysisVideos: AnalysisRecord[] = videoData.map(item => ({
      id: item.id.toString(),
      uploadedAt: item.created_at,
      videoUrl: item.original_video_url,
      status: item.status,
      swingImages: [
        { title: 'Address', image: item.swing_img_0 },
        { title: 'Top-up', image: item.swing_img_1 },
        { title: 'Mid-backing swing', image: item.swing_img_2 },
        { title: 'Top', image: item.swing_img_3 },
        { title: 'Mid-down swing', image: item.swing_img_4 },
        { title: 'Impact', image: item.swing_img_5 },
        { title: 'Mid follow throw', image: item.swing_img_6 },
        { title: 'Finish', image: item.swing_img_7 },
      ],
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
      avatarUrl: item.avatar_url,
    }));

    for (const video of newAnalysisVideos) {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          video.videoUrl,
          {
            time: 0,
          },
        );
        updateVideoThumbnail(video.id, uri);
        video.thumbnailUrl = uri;
      } catch (err) {
        console.warn(`썸네일 생성 실패 (id: ${video.id}):`, err);
      }
    }

    allFetchedVideos.push(...newAnalysisVideos);
    console.log(`${offset + videoData.length}개 영상 불러옴`);

    if (videoData.length < dynamicLimit) {
      hasMore = false;
      console.log('모든 영상 불러오기 완료');
    } else {
      offset += dynamicLimit;
    }
  }

  const currentUser = useUserStore.getState().user;
  if (!currentUser) return;

  const merged = [...(currentUser.myAnalysisVideos || []), ...allFetchedVideos];
  const unique = Array.from(new Map(merged.map(v => [v.id, v])).values());
  const sorted = unique.sort((a, b) =>
    b.uploadedAt.localeCompare(a.uploadedAt),
  );

  setUser({
    ...currentUser,
    myAnalysisVideos: sorted,
  });

  console.log(`최종 반영된 영상 수: ${sorted.length}`);
}
