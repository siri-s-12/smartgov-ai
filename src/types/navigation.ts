import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  SymptomInput: undefined;
  AIRecommendation: { symptoms: string };
  DoctorAvailability: { doctorId: string; symptoms: string };
  BookingConfirmation: { doctorId: string; slotId: string; symptoms: string };
  PatientSummary: { bookingId: string };
  ReceptionistQueue: undefined;
  AdminDashboard: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
