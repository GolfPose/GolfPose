import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="credit"
        options={{
          title: '크레딧 구매',
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '분석하기',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '나의 분석 영상',
        }}
      />

      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이페이지',
        }}
      />
    </Tabs>
  );
}
