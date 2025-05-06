export interface Plan {
  title: string;
  originalPrice?: string;
  discountLabel?: string;
  price: string;
  creditAmount: string;
  features: string[];
}

export const basicPlan: Plan = {
  title: 'Basic 플랜',
  originalPrice: '289,000',
  discountLabel: '90% 할인',
  price: '28,900',
  creditAmount: '100 크레딧 (10회)',
  features: [
    '8단계 자세 인식 샷',
    'Skeleton 인식 동영상',
    '관절 각도 그래프 동영상',
    '3D 아바타 전후좌우 동영상',
    '스윙 자세 단계별 관절 각도 분석',
  ],
};

export const premiumPlan: Plan = {
  title: 'Premium 플랜',
  originalPrice: '489,000',
  discountLabel: '90% 할인',
  price: '48,900',
  creditAmount: '200 크레딧 (20회)',
  features: [
    'Basic 제공 내용 포함',
    '3D 모션 아바타',
    '모션 회전(원터치, 마우스 좌클릭)',
    '확대 축소(투터치, 마우스 스크롤 클릭)',
    '스윙 자세 단계별 분석 및 교정 솔루션',
    '타임별 유사도 시각화 자료',
    '관절각도 분석 및 교정 솔루션',
    '스윙 영상 전후 비교 분석',
  ],
};

export const Plans = {
  basic: basicPlan,
  premium: premiumPlan,
};
