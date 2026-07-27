import { ClinicInsight } from "../types/models";

export const CLINIC_INSIGHTS: ClinicInsight[] = [
  {
    label: "Patients Today",
    value: "84",
    icon: "people-outline",
    color: "#4A8B96",
    trend: "up",
    trendValue: "+12% vs yesterday",
  },
  {
    label: "Avg. Wait Time",
    value: "19 min",
    icon: "time-outline",
    color: "#C98A3E",
    trend: "down",
    trendValue: "-4 min vs yesterday",
  },
  {
    label: "Walk-ins",
    value: "17",
    icon: "walk-outline",
    color: "#5A7DBB",
    trend: "flat",
    trendValue: "same as yesterday",
  },
  {
    label: "No-shows",
    value: "5",
    icon: "close-circle-outline",
    color: "#F4511E",
    trend: "up",
    trendValue: "+2 vs yesterday",
  },
  {
    label: "Doctors On Duty",
    value: "9 / 10",
    icon: "medkit-outline",
    color: "#6FAE7B",
  },
  {
    label: "Bookings via AI",
    value: "61",
    icon: "sparkles-outline",
    color: "#8A7DD9",
    trend: "up",
    trendValue: "+8% vs yesterday",
  },
];

export const DEPARTMENT_LOAD = [
  { name: "General Medicine", percent: 0.82, color: "#4A8B96" },
  { name: "Cardiology", percent: 0.64, color: "#E05263" },
  { name: "Orthopedics", percent: 0.9, color: "#5A7DBB" },
  { name: "Pediatrics", percent: 0.47, color: "#6FAE7B" },
  { name: "Dentistry", percent: 0.3, color: "#3FA9B0" },
  { name: "Ophthalmology", percent: 0.22, color: "#8A7DD9" },
];
