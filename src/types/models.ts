// Core data models used across the Medicure prototype.
// All data is mocked locally — there is no backend or network layer.

export type DepartmentId =
  | "general-medicine"
  | "cardiology"
  | "dermatology"
  | "orthopedics"
  | "pediatrics"
  | "gynecology"
  | "dentistry"
  | "ophthalmology";

export interface Department {
  id: DepartmentId;
  name: string;
  icon: string; // Ionicons name
  color: string;
}

export interface Doctor {
  id: string;
  name: string;
  departmentId: DepartmentId;
  qualification: string;
  experienceYears: number;
  rating: number; // 0-5
  avatarColor: string; // used for initials avatar background
  available: boolean; // false simulates an absent doctor
  currentQueueCount: number;
}

export interface TimeSlot {
  id: string;
  label: string; // e.g. "10:30 AM"
  date: string; // e.g. "Tomorrow, 12 Aug"
  isAvailable: boolean;
}

export interface AIRecommendation {
  department: Department;
  doctor: Doctor;
  estimatedWaitMinutes: number;
  confidence: number; // 0-100, simulated AI confidence
  matchedKeywords: string[];
}

export interface Booking {
  id: string;
  patientName: string;
  doctor: Doctor;
  department: Department;
  slot: TimeSlot;
  tokenNumber: string;
  symptoms: string;
  status: "confirmed" | "waiting" | "in-progress" | "completed";
  createdAt: string;
}

export interface PatientAISummary {
  bookingId: string;
  symptomsReported: string;
  possibleCauses: string[];
  recommendedDepartment: string;
  urgencyLevel: "Low" | "Moderate" | "High";
  notesForDoctor: string;
}

export interface QueuePatient {
  id: string;
  tokenNumber: string;
  patientName: string;
  doctorName: string;
  departmentName: string;
  waitingSince: string;
  status: "waiting" | "in-progress" | "completed" | "no-show";
  isWalkIn: boolean;
}

export interface ClinicInsight {
  label: string;
  value: string;
  icon: string;
  color: string;
  trend?: "up" | "down" | "flat";
  trendValue?: string;
}
