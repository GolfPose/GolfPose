import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { s, vs } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors'; // 경로는 프로젝트 구조에 맞게 조정해줘

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveTintColor: Colors.common.primary500,
        tabBarInactiveTintColor: Colors.common.gray500,
      }}
    >
      <Tabs.Screen
        name="credit"
        options={{
          title: '크레딧 구매',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'card' : 'card-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '분석하기',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'analytics' : 'analytics-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '나의 분석 영상',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'play' : 'play-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    height: vs(56),
    paddingBottom: vs(6),
    paddingTop: vs(6),
    borderTopWidth: s(0.5),
    borderTopColor: Colors.common.gray300,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
