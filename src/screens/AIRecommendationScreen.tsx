import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import GlassCard from "../components/GlassCard";
import DoctorCard from "../components/DoctorCard";
import AppButton from "../components/AppButton";
import { colors, radius, spacing, typography } from "../constants/theme";
import { ScreenProps } from "../types/navigation";
import { getAIRecommendation } from "../data/mockAI";
import { NEARBY_CENTERS } from "../data/doctors";

export default function AIRecommendationScreen({
  navigation,
  route,
}: ScreenProps<"AIRecommendation">) {
  const { symptoms } = route.params;

  // Simulated AI inference — computed locally from mock rules/data.
  const recommendation = useMemo(() => getAIRecommendation(symptoms), [symptoms]);
  const { department, doctor, estimatedWaitMinutes, confidence } = recommendation;

  return (
    <ScreenContainer>
      <Header title="AI Recommendation" onBack={() => navigation.goBack()} />

      <GlassCard style={styles.symptomCard}>
        <Text style={typography.caption}>You said</Text>
        <Text style={[typography.body, styles.symptomText]}>"{symptoms}"</Text>
      </GlassCard>

      <View style={styles.confidenceRow}>
        <Ionicons name="sparkles" size={16} color={colors.primary} />
        <Text style={styles.confidenceText}>
          Medicure AI is {confidence}% confident in this match
        </Text>
      </View>

      <GlassCard style={styles.deptCard}>
        <View style={[styles.deptIcon, { backgroundColor: department.color + "22" }]}>
          <Ionicons name={department.icon as any} size={26} color={department.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={typography.caption}>Recommended Department</Text>
          <Text style={typography.h3}>{department.name}</Text>
        </View>
      </GlassCard>

      {doctor.available ? (
        <>
          <Text style={[typography.h3, styles.sectionTitle]}>Suggested Doctor</Text>
          <DoctorCard doctor={doctor} departmentName={department.name} />

          <GlassCard style={styles.waitCard}>
            <Ionicons name="time-outline" size={20} color={colors.primaryPressed} />
            <Text style={styles.waitText}>
              Estimated waiting time: <Text style={styles.waitBold}>{estimatedWaitMinutes} min</Text>
            </Text>
          </GlassCard>

          <AppButton
            label="View Available Slots"
            icon="calendar-outline"
            onPress={() =>
              navigation.navigate("DoctorAvailability", { doctorId: doctor.id, symptoms })
            }
            style={{ marginTop: spacing.lg }}
          />
        </>
      ) : (
        <>
          <GlassCard style={styles.unavailableCard}>
            <Ionicons name="alert-circle-outline" size={22} color={colors.danger} />
            <Text style={styles.unavailableTitle}>
              {doctor.name} is currently unavailable
            </Text>
            <Text style={typography.caption}>
              Try one of these nearby healthcare centers instead:
            </Text>
          </GlassCard>

          {NEARBY_CENTERS.map((center) => (
            <GlassCard key={center} style={styles.centerCard}>
              <Ionicons name="location-outline" size={18} color={colors.primary} />
              <Text style={styles.centerText}>{center}</Text>
            </GlassCard>
          ))}

          <AppButton
            label="Back to Symptoms"
            variant="outline"
            onPress={() => navigation.navigate("SymptomInput")}
            style={{ marginTop: spacing.lg }}
          />
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  symptomCard: {
    marginBottom: spacing.md,
  },
  symptomText: {
    marginTop: spacing.xs,
    fontStyle: "italic",
  },
  confidenceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  confidenceText: {
    marginLeft: spacing.xs,
    color: colors.primaryPressed,
    fontWeight: "600",
    fontSize: 13,
  },
  deptCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  deptIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  waitCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  waitText: {
    marginLeft: spacing.sm,
    color: colors.textBody,
  },
  waitBold: {
    fontWeight: "700",
    color: colors.textHeading,
  },
  unavailableCard: {
    marginBottom: spacing.md,
  },
  unavailableTitle: {
    fontWeight: "700",
    color: colors.textHeading,
    marginTop: spacing.xs,
    marginBottom: 4,
  },
  centerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  centerText: {
    marginLeft: spacing.sm,
    color: colors.textBody,
    fontWeight: "600",
  },
});
