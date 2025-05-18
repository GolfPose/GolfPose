import React, { useState, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Pressable,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Typography from '@/constants/Typography';
import { Colors } from '@/constants/Colors';
import { s, vs } from 'react-native-size-matters';
import { CreditUsageTab } from '@/components/mypage/CreditUsageTab';
import { ProfileTab } from '@/components/mypage/ProfileTab';
import { SettingsTab } from '@/components/mypage/SettingsTab';
import TitleSection from '@/components/TitleSection';
import Header from '@/components/Header';
import { RequireLogin } from '@/components/auth/RequireLogin';

export default function MyPageScreen() {
  const [section, setSection] = useState<
    'profile' | 'payments' | 'credits' | 'settings'
  >('profile');
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const renderTabContent = () => {
    switch (section) {
      case 'profile':
        return <ProfileTab />;
      case 'credits':
        return <CreditUsageTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <RequireLogin>
      <ThemedView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
          >
            <Header />
            <ThemedView style={styles.innerContainer}>
              <TitleSection title="마이페이지" />
              <ThemedView style={styles.tabMenuContainer}>
                <TabButton
                  label="회원정보"
                  active={section === 'profile'}
                  onPress={() => setSection('profile')}
                />
                <TabButton
                  label="크레딧 내역"
                  active={section === 'credits'}
                  onPress={() => setSection('credits')}
                />
                <TabButton
                  label="환경설정"
                  active={section === 'settings'}
                  onPress={() => setSection('settings')}
                />
              </ThemedView>
              <ThemedView style={styles.sectionContainer}>
                {renderTabContent()}
              </ThemedView>
            </ThemedView>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </ThemedView>
    </RequireLogin>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, active && styles.activeTabButton]}
    >
      <ThemedText
        style={[styles.tabButtonText, active && styles.activeTabButtonText]}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: vs(100),
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: s(24),
  },
  tabMenuContainer: {
    flexDirection: 'column',
    gap: vs(8),
    marginBottom: vs(20),
  },
  tabButton: {
    paddingVertical: vs(8),
    paddingHorizontal: s(16),
    borderRadius: s(8),
    alignItems: 'flex-start',
  },
  activeTabButton: {
    backgroundColor: Colors.common.primary500,
  },
  tabButtonText: {
    fontSize: Typography.md,
  },
  activeTabButtonText: {
    color: Colors.common.white,
  },
  sectionContainer: {
    marginTop: vs(16),
  },
});
