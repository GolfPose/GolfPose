import { useTheme } from "@/hooks/useTheme";
import { ThemedView } from "../ThemedView";
import BackHeader from "../BackHeader";
import TitleSection from "../TitleSection";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { s, vs } from "react-native-size-matters";
import { useRef } from "react";
import { LoginForm } from "./LoginForm";

interface Props {
  isFromRedirect?: boolean;
}

export const LoginContainer = ({ isFromRedirect = false }: Props) => {
  const scrollViewRef = useRef(null);
  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
            showsVerticalScrollIndicator={true}
          >
            <BackHeader theme={theme} isFromRedirect={isFromRedirect} />
            <ThemedView style={styles.innerContainer}>
              <TitleSection title="로그인" />
              <LoginForm />
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: vs(100),
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: s(24),
  },
});