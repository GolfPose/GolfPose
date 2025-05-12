import { UserInfo } from '@/types/user';

export const dummyUser: UserInfo = {
  name: '홍길동',
  email: 'dummy@example.com',
  plan: 'free',
  isLoggedIn: true,
  createdAt: new Date().toISOString(),
  credit: 64,
  creditRecord: [
    {
      id: 'cr1',
      date: '2025-03-18T10:44:23',
      change: -8,
      type: 'use',
    },
    {
      id: 'cr2',
      date: '2025-03-18T09:29:23',
      change: -8,
      type: 'use',
    },
    {
      id: 'cr3',
      date: '2025-03-18T01:36:08',
      change: 60,
      type: 'charge',
    },
  ],
  purchasedRecord: [],
  myAnalysisVideos: [
    {
      id: 'v1',
      uploadedAt: '2025-01-19T10:00:00',
      videoUrl: require('@/assets/videos/ex_video_1.mp4'),
      status: 'COMPLETE',
      graphUrls: {},
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: '',
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
      graphUrls: {},
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: '',
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
      graphUrls: {},
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: '',
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
      graphUrls: {},
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: '',
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
      graphUrls: {},
      thumbnailUrl: require('@/assets/images/swingThumbnail.png'),
      pose3DUrl: '',
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
  accessToken: 'dummy-access-token',
  refreshToken: 'dummy-refresh-token',
};
