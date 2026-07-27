import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import GlassCard from "../components/GlassCard";
import AppButton from "../components/AppButton";
import { colors, radius, spacing, typography } from "../constants/theme";
import { ScreenProps } from "../types/navigation";
import { getMockPatientSummary } from "../data/mockAI";

const URGENCY_COLOR: Record<string, string> = {
  Low: colors.success,
  Moderate: "#D99B2B",
  High: colors.danger,
};

export default function PatientSummaryScreen({ navigation, route }: ScreenProps<"PatientSummary">) {
  const { bookingId } = route.params;

  // In a real system this would be fetched using bookingId. For the
  // prototype we generate a representative mock summary locally.
  const summary = useMemo(
    () =>
      getMockPatientSummary(
        bookingId,
        "Fever, headache and cough since yesterday",
        "General Medicine"
      ),
    [bookingId]
  );

  return (
    <ScreenContainer>
      <Header title="AI Patient Summary" subtitle="Generated for the consulting doctor" onBack={() => navigation.goBack()} />

      <GlassCard style={styles.headerCard}>
        <Ionicons name="sparkles-outline" size={20} color={colors.primary} />
        <Text style={styles.headerText}>Summarized automatically by Medicure AI</Text>
      </GlassCard>

      <GlassCard style={styles.section}>
        <Text style={typography.caption}>Reported Symptoms</Text>
        <Text style={[typography.body, styles.value]}>{summary.symptomsReported}</Text>
      </GlassCard>

      <GlassCard style={styles.section}>
        <Text style={typography.caption}>Possible Causes (AI Suggested)</Text>
        {summary.possibleCauses.map((cause) => (
          <View key={cause} style={styles.bulletRow}>
            <View style={styles.bullet} />
            <Text style={typography.body}>{cause}</Text>
          </View>
        ))}
      </GlassCard>

      <View style={styles.metaRow}>
        <GlassCard style={styles.metaCard}>
          <Text style={typography.caption}>Department</Text>
          <Text style={typography.bodyMedium}>{summary.recommendedDepartment}</Text>
        </GlassCard>
        <GlassCard style={styles.metaCard}>
          <Text style={typography.caption}>Urgency</Text>
          <Text
            style={[
              typography.bodyMedium,
              { color: URGENCY_COLOR[summary.urgencyLevel] },
            ]}
          >
            {summary.urgencyLevel}
          </Text>
        </GlassCard>
      </View>

      <GlassCard style={styles.section}>
        <Text style={typography.caption}>Notes for Doctor</Text>
        <Text style={[typography.body, styles.value]}>{summary.notesForDoctor}</Text>
      </GlassCard>

      <AppButton
        label="Back to Home"
        onPress={() => navigation.navigate("Home")}
        style={{ marginTop: spacing.lg }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    backgroundColor: colors.primaryLight,
  },
  headerText: {
    marginLeft: spacing.sm,
    color: colors.primaryPressed,
    fontWeight: "600",
    fontSize: 13,
  },
  section: {
    marginBottom: spacing.md,
  },
  value: {
    marginTop: spacing.xs,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  metaCard: {
    width: "48%",
  },
});
