import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import DoctorCard from "../components/DoctorCard";
import SlotChip from "../components/SlotChip";
import AppButton from "../components/AppButton";
import { colors, spacing, typography } from "../constants/theme";
import { ScreenProps } from "../types/navigation";
import { getDoctorById } from "../data/doctors";
import { getDepartmentById } from "../constants/departments";
import { getMockSlots } from "../data/mockAI";

export default function DoctorAvailabilityScreen({
  navigation,
  route,
}: ScreenProps<"DoctorAvailability">) {
  const { doctorId, symptoms } = route.params;
  const doctor = getDoctorById(doctorId)!;
  const department = getDepartmentById(doctor.departmentId)!;

  const slots = useMemo(() => getMockSlots(doctorId), [doctorId]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  return (
    <ScreenContainer>
      <Header title="Doctor Availability" onBack={() => navigation.goBack()} />

      <DoctorCard doctor={doctor} departmentName={department.name} />

      <Text style={[typography.h3, styles.sectionTitle]}>Choose a Slot</Text>
      <Text style={[typography.caption, styles.dateLabel]}>{slots[0]?.date}</Text>

      <View style={styles.slotWrap}>
        {slots.map((slot) => (
          <SlotChip
            key={slot.id}
            slot={slot}
            selected={selectedSlotId === slot.id}
            onPress={() => setSelectedSlotId(slot.id)}
          />
        ))}
      </View>

      <AppButton
        label="Book Now"
        icon="checkmark-circle-outline"
        disabled={!selectedSlotId}
        onPress={() =>
          navigation.navigate("BookingConfirmation", {
            doctorId,
            slotId: selectedSlotId!,
            symptoms,
          })
        }
        style={{ marginTop: spacing.xl }}
      />

      <AppButton
        label="Call Clinic to Book"
        icon="call-outline"
        variant="outline"
        onPress={() => {}}
        style={{ marginTop: spacing.md }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: 2,
  },
  dateLabel: {
    marginBottom: spacing.md,
  },
  slotWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
