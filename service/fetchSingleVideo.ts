import { supabase } from '@/lib/supabase';
import { AnalysisRecord } from '@/types/analysis';

export async function fetchSingleVideo(
  videoId: number,
): Promise<AnalysisRecord | null> {
  const { data, error } = await supabase
    .from('golfpose')
    .select('*')
    .eq('id', videoId)
    .single();

  if (error || !data) {
    console.error('단일 영상 fetch 실패:', error);
    return null;
  }

  return {
    id: data.id.toString(),
    uploadedAt: data.created_at,
    videoUrl: data.original_video_url,
    status: data.status,
    swingImages: [
      { title: 'Address', image: data.swing_img_0 },
      { title: 'Top-up', image: data.swing_img_1 },
      { title: 'Mid-backing swing', image: data.swing_img_2 },
      { title: 'Top', image: data.swing_img_3 },
      { title: 'Mid-down swing', image: data.swing_img_4 },
      { title: 'Impact', image: data.swing_img_5 },
      { title: 'Mid follow throw', image: data.swing_img_6 },
      { title: 'Finish', image: data.swing_img_7 },
    ],
    graphUrls: {
      leftArm2D: data.left_arm_2d_url,
      rightArm2D: data.right_arm_2d_url,
      leftLeg2D: data.left_leg_2d_url,
      rightLeg2D: data.right_leg_2d_url,
      leftArm3D: data.left_arm_3d_url,
      rightArm3D: data.right_arm_3d_url,
      leftLeg3D: data.left_leg_3d_url,
      rightLeg3D: data.right_leg_3d_url,
    },
    thumbnailUrl: undefined,
    pose3DUrl: data.main_3d_url,
    avatarUrl: data.avatar_url,
  };
}
