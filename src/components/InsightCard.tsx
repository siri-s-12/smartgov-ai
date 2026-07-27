import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlassCard from "./GlassCard";
import { colors, radius, spacing, typography } from "../constants/theme";
import { ClinicInsight } from "../types/models";

export default function InsightCard({ insight }: { insight: ClinicInsight }) {
  const trendIcon =
    insight.trend === "up" ? "arrow-up" : insight.trend === "down" ? "arrow-down" : "remove";
  const trendColor =
    insight.trend === "up"
      ? colors.success
      : insight.trend === "down"
      ? colors.danger
      : colors.textMuted;

  return (
    <GlassCard style={styles.card}>
      <View style={[styles.iconBadge, { backgroundColor: insight.color + "22" }]}>
        <Ionicons name={insight.icon as any} size={20} color={insight.color} />
      </View>
      <Text style={styles.value}>{insight.value}</Text>
      <Text style={typography.caption}>{insight.label}</Text>
      {insight.trendValue && (
        <View style={styles.trendRow}>
          <Ionicons name={trendIcon as any} size={12} color={trendColor} />
          <Text style={[styles.trendText, { color: trendColor }]}>{insight.trendValue}</Text>
        </View>
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47%",
    marginBottom: spacing.md,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textHeading,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  trendText: {
    fontSize: 11,
    marginLeft: 4,
    fontWeight: "600",
  },
});
