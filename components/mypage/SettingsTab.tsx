import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemedText } from '@/components/ThemedText';
import { MyPageSection } from '@/components/mypage/MyPageSection';
import { useThemeStore, ThemeMode } from '@/store/useThemeStore';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { getColor } from '@/utils/getColor';
import { ThemedView } from '../ThemedView';

export const SettingsTab = () => {
  const { mode, setMode } = useThemeStore();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ThemeMode>(mode);
  const [items, setItems] = useState([
    { label: '라이트 모드', value: 'light' },
    { label: '다크 모드', value: 'dark' },
    { label: '시스템 모드', value: 'system' },
  ]);

  return (
    <MyPageSection title="환경설정">
      <ThemedText style={styles.label}>화면모드</ThemedText>

      <ThemedView style={styles.dropdownWrapper}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={callback => {
            const next = callback(value);
            setValue(next);
            setMode(next);
          }}
          setItems={setItems}
          style={{
            backgroundColor: getColor(
              Colors.light.background,
              Colors.dark.background,
            ),
            borderColor: getColor(Colors.common.gray300, Colors.common.gray500),
          }}
          dropDownContainerStyle={{
            backgroundColor: getColor(
              Colors.light.background,
              Colors.dark.background,
            ),
            borderColor: getColor(Colors.common.gray300, Colors.common.gray500),
          }}
          listItemContainerStyle={{
            backgroundColor: getColor(
              Colors.light.background,
              Colors.dark.background,
            ),
          }}
          listItemLabelStyle={{
            color: getColor(Colors.light.text, Colors.dark.text),
          }}
          textStyle={{
            color: getColor(Colors.light.text, Colors.dark.text),
          }}
          labelStyle={{ fontWeight: '500' }}
          zIndex={1000}
          listMode="SCROLLVIEW"
        />
      </ThemedView>
    </MyPageSection>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownWrapper: {
    zIndex: 1000,
  },
});
