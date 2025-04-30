import { useState } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemedText } from '@/components/ThemedText';
import { MyPageSection } from '@/components/mypage/MyPageSection';
import { useThemeStore, ThemeMode } from '@/store/useThemeStore';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { getColor } from '@/utils/getColor';
import { ThemedView } from '../ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { s, vs } from 'react-native-size-matters';
import Typography from '@/constants/Typography';

export const SettingsTab = () => {
  const { mode, setMode } = useThemeStore();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ThemeMode>(mode);
  const [items, setItems] = useState([
    { label: '라이트', value: 'light' },
    { label: '다크', value: 'dark' },
    { label: '시스템 설정', value: 'system' },
  ]);

  return (
    <MyPageSection style={styles.container} title="환경설정">
      <ThemedView style={styles.row}>
        <ThemedText style={styles.label}>화면모드</ThemedText>

        <View style={styles.dropdownWrapper}>
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
              borderColor: getColor(
                Colors.common.gray300,
                Colors.common.gray500,
              ),
            }}
            dropDownContainerStyle={{
              backgroundColor: getColor(
                Colors.light.background,
                Colors.dark.background,
              ),
              borderColor: getColor(
                Colors.common.gray300,
                Colors.common.gray500,
              ),
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
            ArrowDownIconComponent={({ style }) => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color={getColor(Colors.light.text, Colors.dark.text)}
                style={StyleSheet.flatten(style) as TextStyle}
              />
            )}
            ArrowUpIconComponent={({ style }) => (
              <MaterialIcons
                name="keyboard-arrow-up"
                size={24}
                color={getColor(Colors.light.text, Colors.dark.text)}
                style={StyleSheet.flatten(style) as TextStyle}
              />
            )}
          />
        </View>
      </ThemedView>
    </MyPageSection>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: vs(30),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 4,
    fontSize: Typography.md,
    fontWeight: 'bold',
    flexShrink: 0,
  },
  dropdownWrapper: {
    flex: 1,
    zIndex: 1000,
    minWidth: 80,
  },
});
