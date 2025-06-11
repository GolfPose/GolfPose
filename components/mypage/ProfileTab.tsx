import { useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import Typography from '@/constants/Typography';
import { Colors } from '@/constants/Colors';
import { s, vs } from 'react-native-size-matters';
import useUserStore from '@/store/useUserStore';
import { MyPageSection } from '@/components/mypage/MyPageSection';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { logout, updateDisplayName, withdrawAccount } from '@/service/auth';
import { CustomAlert } from '../CustomAlert';

export const ProfileTab = () => {
  const user = useUserStore(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.name ?? '');
  const theme = useTheme();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmText, setConfirmText] = useState('확인');
  const [alertType, setAlertType] = useState<'save' | 'logout' | 'withdraw' | null>(null);
  const showCancelButton = alertType !== 'save';

  const handleSave = async () => {
    if (!user) return;
    const { success, message } = await updateDisplayName(user.uid, tempName);
    setAlertType('save');
    setAlertMessage(success ? '닉네임이 변경되었습니다!' : message);
    setConfirmText('확인');
    setAlertVisible(true);
  };

  const handleLogoutAlert = () => {
    setAlertType('logout');
    setAlertMessage('정말 로그아웃 하시겠습니까?');
    setConfirmText('로그아웃');
    setAlertVisible(true);
  };

  const handleWithdrawAlert = () => {
    setAlertType('withdraw');
    setAlertMessage('정말로 탈퇴하시겠습니까? \n이 작업은 되돌릴 수 없습니다.');
    setConfirmText('탈퇴하기');
    setAlertVisible(true);
  };

  const handleCancelEdit = () => {
    setTempName(user?.name ?? '');
    setIsEditing(false);
  };

  const handleConfirm = async () => {
    const currentUser = useUserStore.getState().user;
    if (!currentUser) {
      setAlertMessage('사용자 정보가 없습니다.');
      return;
    }
    if (alertType === 'save') {
      setIsEditing(false);
      setAlertVisible(false);
    }
    else if (alertType === 'logout') {
      await logout();
      router.replace('/login');
    }
    else if (alertType === 'withdraw') {
      const currentUser = useUserStore.getState().user;
      if (!currentUser?.email) return;
      const { success } = await withdrawAccount(currentUser.email);
      if (success) setTimeout(() => router.replace('/'), 1000);
      setAlertVisible(false);
    }
    setAlertType(null);  
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

      {/* 버튼 영역 */}
      <ThemedView style={styles.buttonContainer}>
        <Pressable style={styles.logoutButton} onPress={handleLogoutAlert}>
          <ThemedText
            style={[styles.buttonText, { color: Colors.common.primary500 }]}
          >
            로그아웃
          </ThemedText>
        </Pressable>

        <Pressable style={styles.withdrawButton} onPress={handleWithdrawAlert}>
          <ThemedText style={[styles.buttonText, { color: Colors.common.red }]}>
            회원탈퇴
          </ThemedText>
        </Pressable>
      </ThemedView>

      {/* 공통 Alert */}
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        confirmText={confirmText}
      
        {...(showCancelButton
          ? {
            cancelText: '취소', onCancel: () => {
              setAlertVisible(false);
              setAlertType(null);
            }
          }
          : {})}
        onConfirm={handleConfirm}
        onClose={() => {
          setAlertVisible(false);
          setAlertType(null);
        }}
      />
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
