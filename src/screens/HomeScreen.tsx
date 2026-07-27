import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import GlassCard from "../components/GlassCard";
import AppButton from "../components/AppButton";
import { colors, radius, spacing, typography } from "../constants/theme";
import { ScreenProps } from "../types/navigation";

export default function HomeScreen({ navigation }: ScreenProps<"Home">) {
  return (
    <ScreenContainer>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="pulse" size={22} color="#fff" />
          </View>
          <Text style={styles.logoText}>Medicure</Text>
        </View>
      </View>

      {/* Hero */}
      <GlassCard style={styles.heroCard}>
        <Text style={typography.h1}>Your Health, One Tap Away</Text>
        <Text style={[typography.body, styles.heroSubtitle]}>
          AI-powered clinic assistant that recommends the right department and doctor
          for your symptoms — in seconds.
        </Text>
        <AppButton
          label="Describe Symptoms"
          icon="chatbubble-ellipses-outline"
          onPress={() => navigation.navigate("SymptomInput")}
          style={{ marginTop: spacing.md }}
        />
      </GlassCard>

      {/* Quick actions */}
      <Text style={[typography.h3, styles.sectionTitle]}>Quick Actions</Text>
      <View style={styles.grid}>
        <QuickAction
          icon="chatbubble-ellipses-outline"
          label="AI Symptom Booking"
          color={colors.primary}
          onPress={() => navigation.navigate("SymptomInput")}
        />
        <QuickAction
          icon="people-outline"
          label="Receptionist Queue"
          color="#5A7DBB"
          onPress={() => navigation.navigate("ReceptionistQueue")}
        />
        <QuickAction
          icon="bar-chart-outline"
          label="Admin Dashboard"
          color="#8A7DD9"
          onPress={() => navigation.navigate("AdminDashboard")}
        />
        <QuickAction
          icon="call-outline"
          label="Call Clinic"
          color={colors.danger}
          onPress={() => {}}
        />
      </View>

      {/* How it works */}
      <Text style={[typography.h3, styles.sectionTitle]}>How Medicure Works</Text>
      <GlassCard>
        <Step number="1" text="Tell us your symptoms in your own words" />
        <Step number="2" text="AI recommends the right department and doctor" />
        <Step number="3" text="Pick a slot and confirm your booking instantly" />
      </GlassCard>
    </ScreenContainer>
  );
}

function QuickAction({
  icon,
  label,
  color,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.8}>
      <GlassCard style={styles.quickCard}>
        <View style={[styles.quickIcon, { backgroundColor: color + "22" }]}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <Text style={styles.quickLabel}>{label}</Text>
      </GlassCard>
    </TouchableOpacity>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepNumber}>{number}</Text>
      </View>
      <Text style={[typography.body, styles.stepText]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textHeading,
  },
  heroCard: {
    marginBottom: spacing.lg,
  },
  heroSubtitle: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  quickAction: {
    width: "48%",
    marginBottom: spacing.md,
  },
  quickCard: {
    alignItems: "flex-start",
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  quickLabel: {
    fontWeight: "600",
    color: colors.textHeading,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  stepNumber: {
    color: colors.primaryPressed,
    fontWeight: "700",
  },
  stepText: {
    flex: 1,
  },
});
