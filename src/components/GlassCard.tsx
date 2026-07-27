import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { colors, radius, shadow, spacing } from "../constants/theme";

interface GlassCardProps {
  style?: ViewStyle;
  padded?: boolean;
}

export default function GlassCard({
  children,
  style,
  padded = true,
}: PropsWithChildren<GlassCardProps>) {
  return (
    <View style={[styles.card, padded && styles.padded, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glassCard,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    ...shadow.card,
  },
  padded: {
    padding: spacing.md,
  },
});
