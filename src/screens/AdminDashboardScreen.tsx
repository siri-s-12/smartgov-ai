import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import GlassCard from "../components/GlassCard";
import InsightCard from "../components/InsightCard";
import { colors, radius, spacing, typography } from "../constants/theme";
import { ScreenProps } from "../types/navigation";
import { CLINIC_INSIGHTS, DEPARTMENT_LOAD } from "../data/adminStats";

export default function AdminDashboardScreen({ navigation }: ScreenProps<"AdminDashboard">) {
  return (
    <ScreenContainer>
      <Header
        title="Clinic Insights"
        subtitle="Operational overview for today"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.grid}>
        {CLINIC_INSIGHTS.map((insight) => (
          <InsightCard key={insight.label} insight={insight} />
        ))}
      </View>

      <Text style={[typography.h3, styles.sectionTitle]}>Department Load</Text>
      <GlassCard>
        {DEPARTMENT_LOAD.map((dept) => (
          <View key={dept.name} style={styles.deptRow}>
            <View style={styles.deptLabelRow}>
              <Text style={typography.body}>{dept.name}</Text>
              <Text style={typography.caption}>{Math.round(dept.percent * 100)}%</Text>
            </View>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${dept.percent * 100}%`, backgroundColor: dept.color },
                ]}
              />
            </View>
          </View>
        ))}
      </GlassCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionTitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  deptRow: {
    marginBottom: spacing.md,
  },
  deptLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  barTrack: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: radius.pill,
  },
});
