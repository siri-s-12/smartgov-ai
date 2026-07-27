import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlassCard from "./GlassCard";
import { colors, radius, spacing, typography } from "../constants/theme";
import { Doctor } from "../types/models";

function getInitials(name: string) {
  const parts = name.replace("Dr. ", "").split(" ");
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function DoctorCard({
  doctor,
  departmentName,
}: {
  doctor: Doctor;
  departmentName?: string;
}) {
  return (
    <GlassCard>
      <View style={styles.row}>
        <View style={[styles.avatar, { backgroundColor: doctor.avatarColor }]}>
          <Text style={styles.avatarText}>{getInitials(doctor.name)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={typography.h3}>{doctor.name}</Text>
          {departmentName && <Text style={typography.caption}>{departmentName}</Text>}
          <Text style={[typography.caption, styles.qualification]}>{doctor.qualification}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={14} color="#D99B2B" />
            <Text style={styles.metaText}>{doctor.rating.toFixed(1)}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{doctor.experienceYears} yrs exp</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: doctor.available ? colors.success : colors.danger },
          ]}
        />
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  qualification: {
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  metaText: {
    fontSize: 13,
    color: colors.textMuted,
    marginLeft: 4,
  },
  metaDot: {
    marginHorizontal: 6,
    color: colors.textMuted,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
});
