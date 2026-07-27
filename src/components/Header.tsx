import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, typography } from "../constants/theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function Header({ title, subtitle, onBack }: HeaderProps) {
  return (
    <View style={styles.row}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </TouchableOpacity>
      )}
      <View style={styles.textWrap}>
        <Text style={typography.h2}>{title}</Text>
        {subtitle && <Text style={[typography.caption, styles.subtitle]}>{subtitle}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  textWrap: {
    flex: 1,
  },
  subtitle: {
    marginTop: 2,
  },
});
