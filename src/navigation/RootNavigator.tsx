import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import HomeScreen from "../screens/HomeScreen";
import SymptomInputScreen from "../screens/SymptomInputScreen";
import AIRecommendationScreen from "../screens/AIRecommendationScreen";
import DoctorAvailabilityScreen from "../screens/DoctorAvailabilityScreen";
import BookingConfirmationScreen from "../screens/BookingConfirmationScreen";
import PatientSummaryScreen from "../screens/PatientSummaryScreen";
import ReceptionistQueueScreen from "../screens/ReceptionistQueueScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SymptomInput" component={SymptomInputScreen} />
      <Stack.Screen name="AIRecommendation" component={AIRecommendationScreen} />
      <Stack.Screen name="DoctorAvailability" component={DoctorAvailabilityScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
      <Stack.Screen name="PatientSummary" component={PatientSummaryScreen} />
      <Stack.Screen name="ReceptionistQueue" component={ReceptionistQueueScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
    </Stack.Navigator>
  );
}
