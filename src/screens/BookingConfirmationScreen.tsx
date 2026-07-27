import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import GlassCard from "../components/GlassCard";
import AppButton from "../components/AppButton";
import { colors, radius, spacing, typography } from "../constants/theme";
import { ScreenProps } from "../types/navigation";
import { getDoctorById } from "../data/doctors";
import { getDepartmentById } from "../constants/departments";
import { getMockSlots } from "../data/mockAI";

export default function BookingConfirmationScreen({
  navigation,
  route,
}: ScreenProps<"BookingConfirmation">) {
  const { doctorId, slotId, symptoms } = route.params;
  const doctor = getDoctorById(doctorId)!;
  const department = getDepartmentById(doctor.departmentId)!;
  const slot = useMemo(() => getMockSlots(doctorId).find((s) => s.id === slotId), [
    doctorId,
    slotId,
  ])!;

  // Mock token + booking id generated client-side for the prototype.
  const tokenNumber = useMemo(
    () => `${department.name[0]}-${Math.floor(20 + Math.random() * 60)}`,
    [department.name]
  );
  const bookingId = useMemo(() => `booking-${Date.now()}`, []);

  return (
    <ScreenContainer>
      <View style={styles.iconWrap}>
        <View style={styles.successBadge}>
          <Ionicons name="checkmark" size={36} color="#fff" />
        </View>
        <Text style={typography.h1}>Booking Confirmed!</Text>
        <Text style={[typography.body, styles.subtitle]}>
          A confirmation SMS will be sent to your registered number.
        </Text>
      </View>

      <GlassCard style={styles.summaryCard}>
        <SummaryRow label="Doctor" value={doctor.name} />
        <SummaryRow label="Department" value={department.name} />
        <SummaryRow label="Date & Time" value={`${slot.date}, ${slot.label}`} />
        <SummaryRow label="Symptoms" value={symptoms} />
        <View style={styles.divider} />
        <SummaryRow label="Your Token" value={tokenNumber} highlight />
      </GlassCard>

      <AppButton
        label="View AI Summary for Doctor"
        icon="document-text-outline"
        onPress={() => navigation.navigate("PatientSummary", { bookingId })}
        style={{ marginTop: spacing.lg }}
      />
      <AppButton
        label="Back to Home"
        variant="outline"
        onPress={() => navigation.navigate("Home")}
        style={{ marginTop: spacing.md }}
      />
    </ScreenContainer>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={typography.caption}>{label}</Text>
      <Text
        style={[
          typography.bodyMedium,
          highlight && { color: colors.primary, fontSize: 20, fontWeight: "700" },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  successBadge: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    textAlign: "center",
    marginTop: spacing.xs,
  },
  summaryCard: {
    marginBottom: spacing.md,
  },
  row: {
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
});
