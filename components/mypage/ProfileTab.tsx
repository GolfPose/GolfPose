import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import Typography from '@/constants/Typography';
import { Colors } from '@/constants/Colors';
import { s, vs } from 'react-native-size-matters';
import useUserStore from '@/store/useUserStore';
import { MyPageSection } from '@/components/mypage/MyPageSection';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { logout, updateDisplayName } from '@/service/auth';

export const ProfileTab = () => {
  const user = useUserStore(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.name ?? '');
  const theme = useTheme();

  const handleSave = async () => {
    if (!user) return;

    const { success, message } = await updateDisplayName(user.uid, tempName);

    alert(message);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleCancelEdit = () => {
    setTempName(user?.name ?? '');
    setIsEditing(false);
  };

  const handleWithdraw = () => {
    Alert.alert(
      '회원탈퇴',
      '정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '탈퇴하기',
          style: 'destructive',
          onPress: () => console.log('탈퇴 처리'),
        },
      ],
    );
  };

  return (
    <MyPageSection title="회원정보">
      {/* 이메일 */}
      <ThemedView style={styles.informationContainer}>
        <ThemedText style={styles.label}>이메일</ThemedText>
        <ThemedText style={styles.content}>{user?.email}</ThemedText>
      </ThemedView>

      {/* 닉네임 */}
      <ThemedView style={styles.informationContainer}>
        <ThemedText style={styles.label}>닉네임</ThemedText>
        {isEditing ? (
          <ThemedView style={styles.editRow}>
            <TextInput
              scrollEnabled={false}
              style={[
                styles.input,
                {
                  backgroundColor:
                    theme === 'dark'
                      ? Colors.common.black
                      : Colors.common.white,
                  color:
                    theme === 'dark'
                      ? Colors.common.white
                      : Colors.common.black,
                },
              ]}
              value={tempName}
              onChangeText={setTempName}
              placeholder="닉네임 입력"
              placeholderTextColor={Colors.common.gray400}
            />
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <ThemedText style={styles.saveButtonText}>저장</ThemedText>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={handleCancelEdit}>
              <ThemedText style={styles.cancelButtonText}>취소</ThemedText>
            </Pressable>
          </ThemedView>
        ) : (
          <ThemedView style={styles.nicknameRow}>
            <ThemedText style={styles.name}>{user?.name}</ThemedText>
            <Pressable
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <ThemedText style={styles.editButtonText}>수정</ThemedText>
            </Pressable>
          </ThemedView>
        )}
      </ThemedView>
      {/* 회원탈퇴 버튼 */}
      <ThemedView style={styles.buttonContainer}>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText
            style={[styles.buttonText, { color: Colors.common.primary500 }]}
          >
            로그아웃
          </ThemedText>
        </Pressable>
        <Pressable style={styles.withdrawButton} onPress={handleWithdraw}>
          <ThemedText style={[styles.buttonText, { color: Colors.common.red }]}>
            회원탈퇴
          </ThemedText>
        </Pressable>
      </ThemedView>
    </MyPageSection>
  );
};

const styles = StyleSheet.create({
  informationContainer: {
    gap: vs(3),
    marginBottom: vs(2),
  },
  label: {
    fontSize: Typography.sm,
    color: Colors.common.gray500,
  },
  content: {
    fontSize: Typography.md,
    fontWeight: '500',
  },
  nicknameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  name: {
    fontSize: Typography.md,
    fontWeight: '500',
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.common.gray400,
    borderRadius: s(8),
    paddingHorizontal: s(12),
    paddingVertical: vs(8),
    fontSize: Typography.md,
  },
  editButton: {
    backgroundColor: Colors.common.primary500,
    paddingVertical: vs(6),
    paddingHorizontal: s(12),
    borderRadius: s(8),
  },
  editButtonText: {
    fontWeight: 'bold',
    color: Colors.common.black,
  },
  saveButton: {
    backgroundColor: Colors.common.primary500,
    paddingVertical: vs(6),
    paddingHorizontal: s(12),
    borderRadius: s(8),
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: Colors.common.black,
  },
  cancelButton: {
    backgroundColor: Colors.common.gray400,
    paddingVertical: vs(6),
    paddingHorizontal: s(12),
    borderRadius: s(8),
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: Colors.common.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: s(8),
  },
  logoutButton: {
    marginTop: vs(16),
    borderColor: Colors.common.primary500,
    borderWidth: s(1.5),
    paddingVertical: vs(10),
    paddingHorizontal: s(16),
    borderRadius: s(8),
    alignSelf: 'flex-start',
  },
  withdrawButton: {
    marginTop: vs(16),
    borderColor: Colors.common.red,
    borderWidth: s(1.5),
    paddingVertical: vs(10),
    paddingHorizontal: s(16),
    borderRadius: s(8),
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: Typography.sm,
    fontWeight: 'bold',
    color: Colors.common.white,
  },
});
