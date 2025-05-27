import { UserInfo } from '@/types/user';

export const dummyUser: UserInfo = {
  id: 9999,
  name: '홍길동',
  email: 'dummy@example.com',
  plan: 'free',
  isLoggedIn: true,
  createdAt: new Date().toISOString(),
  credit: 64,
  uid: 'aaaabbbbccccdddd',
  creditRecord: [
    {
      id: 1,
      date: '2025-03-18T10:44:23',
      change: -8,
      type: 'USE',
    },
    {
      id: 2,
      date: '2025-03-18T09:29:23',
      change: -8,
      type: 'USE',
    },
    {
      id: 3,
      date: '2025-03-18T01:36:08',
      change: 60,
      type: 'REFUND',
    },
  ],

  myAnalysisVideos: [
    {
      id: 'v1',
      uploadedAt: '2025-01-19T10:00:00',
      videoUrl: require('@/assets/videos/ex_video_1.mp4'),
      status: 'COMPLETE',
      graphUrls: {
        leftArm2D: require('@/assets/videos/graph.mp4'),
        rightArm2D: require('@/assets/videos/graph.mp4'),
        leftLeg2D: require('@/assets/videos/graph.mp4'),
        rightLeg2D: require('@/assets/videos/graph.mp4'),
        leftArm3D: require('@/assets/videos/graph.mp4'),
        rightArm3D: require('@/assets/videos/graph.mp4'),
        leftLeg3D: require('@/assets/videos/graph.mp4'),
        rightLeg3D: require('@/assets/videos/graph.mp4'),
      },
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: require('@/assets/videos/avatar.mp4'),
      swingImages: [
        {
          title: 'Address',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top-up',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-backing swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-down swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Impact',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid follow throw',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Finish',
          image: require('@/assets/images/swingThumbnail.png'),
        },
      ],
    },
    {
      id: 'v2',
      uploadedAt: '2025-03-19T10:00:00',
      videoUrl: require('@/assets/videos/ex_video_1.mp4'),
      status: 'IN_PROGRESS',
      graphUrls: {
        leftArm2D: require('@/assets/videos/graph.mp4'),
        rightArm2D: require('@/assets/videos/graph.mp4'),
        leftLeg2D: require('@/assets/videos/graph.mp4'),
        rightLeg2D: require('@/assets/videos/graph.mp4'),
        leftArm3D: require('@/assets/videos/graph.mp4'),
        rightArm3D: require('@/assets/videos/graph.mp4'),
        leftLeg3D: require('@/assets/videos/graph.mp4'),
        rightLeg3D: require('@/assets/videos/graph.mp4'),
      },
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: require('@/assets/videos/avatar.mp4'),
      swingImages: [
        {
          title: 'Address',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top-up',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-backing swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-down swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Impact',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid follow throw',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Finish',
          image: require('@/assets/images/swingThumbnail.png'),
        },
      ],
    },
    {
      id: 'v3',
      uploadedAt: '2025-05-01T10:00:00',
      videoUrl: require('@/assets/videos/ex_video_1.mp4'),
      status: 'IN_PROGRESS',
      graphUrls: {
        leftArm2D: require('@/assets/videos/graph.mp4'),
        rightArm2D: require('@/assets/videos/graph.mp4'),
        leftLeg2D: require('@/assets/videos/graph.mp4'),
        rightLeg2D: require('@/assets/videos/graph.mp4'),
        leftArm3D: require('@/assets/videos/graph.mp4'),
        rightArm3D: require('@/assets/videos/graph.mp4'),
        leftLeg3D: require('@/assets/videos/graph.mp4'),
        rightLeg3D: require('@/assets/videos/graph.mp4'),
      },
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: require('@/assets/videos/avatar.mp4'),
      swingImages: [
        {
          title: 'Address',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top-up',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-backing swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-down swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Impact',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid follow throw',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Finish',
          image: require('@/assets/images/swingThumbnail.png'),
        },
      ],
    },
    {
      id: 'v4',
      uploadedAt: '2025-05-8T10:00:00',
      videoUrl: require('@/assets/videos/ex_video_1.mp4'),
      status: 'COMPLETE',
      graphUrls: {
        leftArm2D: require('@/assets/videos/graph.mp4'),
        rightArm2D: require('@/assets/videos/graph.mp4'),
        leftLeg2D: require('@/assets/videos/graph.mp4'),
        rightLeg2D: require('@/assets/videos/graph.mp4'),
        leftArm3D: require('@/assets/videos/graph.mp4'),
        rightArm3D: require('@/assets/videos/graph.mp4'),
        leftLeg3D: require('@/assets/videos/graph.mp4'),
        rightLeg3D: require('@/assets/videos/graph.mp4'),
      },
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: require('@/assets/videos/avatar.mp4'),
      swingImages: [
        {
          title: 'Address',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top-up',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-backing swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-down swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Impact',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid follow throw',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Finish',
          image: require('@/assets/images/swingThumbnail.png'),
        },
      ],
    },
    {
      id: 'v5',
      uploadedAt: '2025-05-10T10:00:00',
      videoUrl: require('@/assets/videos/ex_video_1.mp4'),
      status: 'COMPLETE',
      graphUrls: {
        leftArm2D: require('@/assets/videos/graph.mp4'),
        rightArm2D: require('@/assets/videos/graph.mp4'),
        leftLeg2D: require('@/assets/videos/graph.mp4'),
        rightLeg2D: require('@/assets/videos/graph.mp4'),
        leftArm3D: require('@/assets/videos/graph.mp4'),
        rightArm3D: require('@/assets/videos/graph.mp4'),
        leftLeg3D: require('@/assets/videos/graph.mp4'),
        rightLeg3D: require('@/assets/videos/graph.mp4'),
      },
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: require('@/assets/videos/avatar.mp4'),
      swingImages: [
        {
          title: 'Address',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top-up',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-backing swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Top',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid-down swing',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Impact',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Mid follow throw',
          image: require('@/assets/images/swingThumbnail.png'),
        },
        {
          title: 'Finish',
          image: require('@/assets/images/swingThumbnail.png'),
        },
      ],
    },
  ],
};
