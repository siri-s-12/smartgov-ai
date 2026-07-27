import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import GlassCard from "../components/GlassCard";
import StatusBadge from "../components/StatusBadge";
import { colors, radius, spacing, typography } from "../constants/theme";
import { ScreenProps } from "../types/navigation";
import { MOCK_QUEUE } from "../data/queue";
import { QueuePatient } from "../types/models";

const FILTERS: { key: "all" | QueuePatient["status"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "waiting", label: "Waiting" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

export default function ReceptionistQueueScreen({ navigation }: ScreenProps<"ReceptionistQueue">) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const filtered =
    filter === "all" ? MOCK_QUEUE : MOCK_QUEUE.filter((p) => p.status === filter);

  const waitingCount = MOCK_QUEUE.filter((p) => p.status === "waiting").length;

  return (
    <ScreenContainer>
      <Header
        title="Live Queue"
        subtitle={`${waitingCount} patients waiting right now`}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{f.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {filtered.map((patient) => (
        <GlassCard key={patient.id} style={styles.queueCard}>
          <View style={styles.tokenBadge}>
            <Text style={styles.tokenText}>{patient.tokenNumber}</Text>
          </View>
          <View style={styles.queueInfo}>
            <View style={styles.nameRow}>
              <Text style={typography.h3}>{patient.patientName}</Text>
              {patient.isWalkIn && (
                <View style={styles.walkInTag}>
                  <Text style={styles.walkInText}>Walk-in</Text>
                </View>
              )}
            </View>
            <Text style={typography.caption}>
              {patient.doctorName} • {patient.departmentName}
            </Text>
            <View style={styles.bottomRow}>
              <Ionicons name="time-outline" size={13} color={colors.textMuted} />
              <Text style={styles.waitingSince}>Since {patient.waitingSince}</Text>
              <StatusBadge status={patient.status} />
            </View>
          </View>
        </GlassCard>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textBody,
  },
  filterTextActive: {
    color: colors.textOnPrimary,
  },
  queueCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  tokenBadge: {
    width: 52,
    height: 52,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  tokenText: {
    fontWeight: "700",
    color: colors.primaryPressed,
  },
  queueInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  walkInTag: {
    backgroundColor: "#FBF0DD",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginLeft: spacing.sm,
  },
  walkInText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#B07A1F",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
    justifyContent: "space-between",
  },
  waitingSince: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 4,
    flex: 1,
  },
});
