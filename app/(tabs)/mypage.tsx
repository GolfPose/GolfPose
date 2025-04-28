import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Pressable,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Typography from '@/constants/Typography';
import { Colors } from '@/constants/Colors';
import { s, vs } from 'react-native-size-matters';
import { PaymentHistoryTab } from '@/components/mypage/PaymentHistoryTab';
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

  return (
    <RequireLogin>
      <ThemedView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
            <Header />
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <ThemedView style={styles.innerContainer}>
                <TitleSection title="마이페이지" />
                <ThemedView style={styles.tabMenuContainer}>
                  <TabButton
                    label="회원정보"
                    active={section === 'profile'}
                    onPress={() => setSection('profile')}
                  />
                  <TabButton
                    label="결제내역"
                    active={section === 'payments'}
                    onPress={() => setSection('payments')}
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
                  {section === 'profile' && <ProfileTab />}
                  {section === 'payments' && <PaymentHistoryTab />}
                  {section === 'credits' && <CreditUsageTab />}
                  {section === 'settings' && <SettingsTab />}
                </ThemedView>
              </ThemedView>
            </ScrollView>
          </KeyboardAvoidingView>
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
    color: Colors.common.black,
  },
  activeTabButtonText: {
    color: Colors.common.white,
  },
  sectionContainer: {
    marginTop: vs(16),
  },
});
