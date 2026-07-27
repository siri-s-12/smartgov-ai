import React, { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../constants/theme";

interface ScreenContainerProps {
  scroll?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  backgroundColor?: string;
}

export default function ScreenContainer({
  children,
  scroll = true,
  style,
  contentStyle,
  backgroundColor,
}: PropsWithChildren<ScreenContainerProps>) {
  const Wrapper = scroll ? ScrollView : View;
  const wrapperProps = scroll
    ? {
        contentContainerStyle: [styles.content, contentStyle],
        showsVerticalScrollIndicator: false,
      }
    : { style: [styles.content, contentStyle] };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: backgroundColor ?? colors.background }, style]}
    >
      {/* @ts-ignore - Wrapper is dynamically ScrollView or View, props narrow at runtime */}
      <Wrapper {...wrapperProps}>{children}</Wrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
