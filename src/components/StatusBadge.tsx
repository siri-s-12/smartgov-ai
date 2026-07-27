import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../constants/theme";

type Status = "waiting" | "in-progress" | "completed" | "no-show" | "confirmed";

const STATUS_MAP: Record<Status, { label: string; bg: string; fg: string }> = {
  waiting: { label: "Waiting", bg: "#FBF0DD", fg: "#B07A1F" },
  "in-progress": { label: "In Progress", bg: "#DCEFF1", fg: colors.primaryPressed },
  completed: { label: "Completed", bg: "#DFF3E7", fg: colors.success },
  "no-show": { label: "No-show", bg: colors.dangerLight, fg: colors.danger },
  confirmed: { label: "Confirmed", bg: "#DFF3E7", fg: colors.success },
};

export default function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_MAP[status];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.text, { color: cfg.fg }]}>{cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});
