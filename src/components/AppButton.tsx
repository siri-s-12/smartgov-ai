import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors, radius, spacing, typography } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

type Variant = "primary" | "outline" | "danger";

interface AppButtonProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export default function AppButton({
  label,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}: AppButtonProps) {
  const isOutline = variant === "outline";
  const isDanger = variant === "danger";

  const backgroundColor = disabled
    ? colors.disabled
    : isDanger
    ? colors.danger
    : isOutline
    ? "transparent"
    : colors.primary;

  const textColor = isOutline ? colors.primary : colors.textOnPrimary;
  const borderColor = isOutline ? colors.primary : "transparent";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.base,
        { backgroundColor, borderColor, width: fullWidth ? "100%" : undefined },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={20} color={textColor} style={styles.icon} />}
          <Text style={[typography.button, { color: textColor }]}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
  },
  icon: {
    marginRight: spacing.sm,
  },
});
