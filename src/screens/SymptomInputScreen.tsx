import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import GlassCard from "../components/GlassCard";
import AppButton from "../components/AppButton";
import { colors, radius, spacing, typography } from "../constants/theme";
import { ScreenProps } from "../types/navigation";

const SUGGESTIONS = [
  "Fever, headache and cough",
  "Pain in my leg since 2 days",
  "Toothache and swelling in gum",
  "Skin rash and itching",
];

export default function SymptomInputScreen({ navigation }: ScreenProps<"SymptomInput">) {
  const [symptoms, setSymptoms] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Voice input is mocked — no real speech-to-text/API is wired up.
  const handleMicPress = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSymptoms("Fever, headache and cough since yesterday");
    }, 1200);
  };

  return (
    <ScreenContainer>
      <Header
        title="Describe Your Symptoms"
        subtitle="Type or speak — Medicure AI will find the right doctor"
        onBack={() => navigation.goBack()}
      />

      <GlassCard>
        <Text style={typography.h3}>What's bothering you today?</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            multiline
            placeholder='e.g. "Fever, headache and cough"'
            placeholderTextColor={colors.textMuted}
            value={symptoms}
            onChangeText={setSymptoms}
          />
          <TouchableOpacity
            onPress={handleMicPress}
            style={[styles.micButton, isListening && styles.micButtonActive]}
          >
            <Ionicons
              name={isListening ? "radio-outline" : "mic-outline"}
              size={22}
              color={isListening ? colors.textOnPrimary : colors.primary}
            />
          </TouchableOpacity>
        </View>
        {isListening && (
          <Text style={styles.listeningText}>Listening in ಕನ್ನಡ (Kannada)...</Text>
        )}
      </GlassCard>

      <Text style={[typography.h3, styles.sectionTitle]}>Try an example</Text>
      <View style={styles.suggestionWrap}>
        {SUGGESTIONS.map((s) => (
          <TouchableOpacity key={s} style={styles.suggestionChip} onPress={() => setSymptoms(s)}>
            <Text style={styles.suggestionText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <AppButton
        label="Get AI Recommendation"
        icon="sparkles-outline"
        disabled={symptoms.trim().length === 0}
        onPress={() => navigation.navigate("AIRecommendation", { symptoms })}
        style={{ marginTop: spacing.lg }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: spacing.md,
  },
  input: {
    flex: 1,
    minHeight: 56,
    maxHeight: 120,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.textBody,
  },
  micButton: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing.sm,
  },
  micButtonActive: {
    backgroundColor: colors.primary,
  },
  listeningText: {
    marginTop: spacing.sm,
    color: colors.primaryPressed,
    fontWeight: "600",
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  suggestionWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  suggestionChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  suggestionText: {
    color: colors.textBody,
    fontSize: 13,
  },
});
