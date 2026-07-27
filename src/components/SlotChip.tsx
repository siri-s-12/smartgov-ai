import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, radius, spacing } from "../constants/theme";
import { TimeSlot } from "../types/models";

interface SlotChipProps {
  slot: TimeSlot;
  selected: boolean;
  onPress: () => void;
}

export default function SlotChip({ slot, selected, onPress }: SlotChipProps) {
  const disabled = !slot.isAvailable;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        selected && styles.chipSelected,
        disabled && styles.chipDisabled,
      ]}
    >
      <Text
        style={[
          styles.label,
          selected && styles.labelSelected,
          disabled && styles.labelDisabled,
        ]}
      >
        {slot.label}
      </Text>
      {disabled && <Text style={styles.takenText}>Booked</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    minWidth: 92,
    alignItems: "center",
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipDisabled: {
    backgroundColor: "#F1F5F5",
    borderColor: "#F1F5F5",
  },
  label: {
    fontWeight: "600",
    color: colors.textHeading,
  },
  labelSelected: {
    color: colors.textOnPrimary,
  },
  labelDisabled: {
    color: colors.disabled,
  },
  takenText: {
    fontSize: 11,
    color: colors.disabled,
    marginTop: 2,
  },
});
