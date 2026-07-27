// SIMULATED AI ONLY.
// Everything in this file is a local, rule-based mock. There is no call to
// OpenAI, Claude, or any other model/API — it exists purely to make the
// prototype feel alive using local/mock data, as required for this build.

import { DEPARTMENTS, getDepartmentById } from "../constants/departments";
import { getDoctorsByDepartment } from "./doctors";
import {
  AIRecommendation,
  Department,
  DepartmentId,
  PatientAISummary,
  TimeSlot,
} from "../types/models";

interface KeywordRule {
  departmentId: DepartmentId;
  keywords: string[];
}

const KEYWORD_RULES: KeywordRule[] = [
  {
    departmentId: "cardiology",
    keywords: ["chest pain", "heart", "palpitation", "breathless", "blood pressure", "bp"],
  },
  {
    departmentId: "dermatology",
    keywords: ["skin", "rash", "itching", "acne", "allergy patch", "eczema"],
  },
  {
    departmentId: "orthopedics",
    keywords: ["leg", "knee", "joint", "fracture", "back pain", "bone", "shoulder", "ankle"],
  },
  {
    departmentId: "pediatrics",
    keywords: ["child", "baby", "infant", "kid", "son", "daughter"],
  },
  {
    departmentId: "gynecology",
    keywords: ["pregnan", "period", "menstrual", "women", "gynec"],
  },
  {
    departmentId: "dentistry",
    keywords: ["tooth", "teeth", "gum", "dental", "toothache"],
  },
  {
    departmentId: "ophthalmology",
    keywords: ["eye", "vision", "blurry", "seeing"],
  },
];

const FALLBACK_DEPARTMENT: DepartmentId = "general-medicine";

/**
 * Very simple keyword matcher standing in for a real NLP/AI symptom classifier.
 * Falls back to General Medicine when nothing else matches, mirroring how a
 * real triage model would default to a generalist for unclear symptoms.
 */
function matchDepartment(symptomText: string): {
  department: Department;
  matchedKeywords: string[];
} {
  const text = symptomText.toLowerCase();

  for (const rule of KEYWORD_RULES) {
    const matched = rule.keywords.filter((k) => text.includes(k));
    if (matched.length > 0) {
      return {
        department: getDepartmentById(rule.departmentId)!,
        matchedKeywords: matched,
      };
    }
  }

  return {
    department: getDepartmentById(FALLBACK_DEPARTMENT)!,
    matchedKeywords: [],
  };
}

/**
 * Given free-text symptoms, returns a mocked AI recommendation: department,
 * best-available doctor in that department, and an estimated wait time
 * derived from the doctor's current mock queue length.
 */
export function getAIRecommendation(symptomText: string): AIRecommendation {
  const { department, matchedKeywords } = matchDepartment(symptomText);
  const doctorsInDept = getDoctorsByDepartment(department.id);
  const availableDoctors = doctorsInDept.filter((d) => d.available);

  // Prefer the doctor with the shortest current queue among available ones.
  const doctor =
    [...availableDoctors].sort((a, b) => a.currentQueueCount - b.currentQueueCount)[0] ??
    doctorsInDept[0];

  const estimatedWaitMinutes = doctor.available
    ? Math.max(5, doctor.currentQueueCount * 6)
    : 0;

  const confidence = matchedKeywords.length > 0 ? 88 + Math.min(matchedKeywords.length * 3, 10) : 62;

  return {
    department,
    doctor,
    estimatedWaitMinutes,
    confidence,
    matchedKeywords,
  };
}

/**
 * 5 mock upcoming slots for the next day, per the MVP requirement of
 * showing 5 selectable time slots per doctor.
 */
export function getMockSlots(doctorId: string): TimeSlot[] {
  const baseTimes = ["09:30 AM", "11:00 AM", "12:30 PM", "02:00 PM", "04:30 PM"];
  return baseTimes.map((label, index) => ({
    id: `${doctorId}-slot-${index}`,
    label,
    date: "Tomorrow, 12 Aug",
    // simulate one slot already taken so the UI can show a disabled state
    isAvailable: index !== 2,
  }));
}

/**
 * Mock AI-generated patient summary handed to the doctor before consultation.
 */
export function getMockPatientSummary(
  bookingId: string,
  symptoms: string,
  departmentName: string
): PatientAISummary {
  const lower = symptoms.toLowerCase();
  const urgencyLevel: PatientAISummary["urgencyLevel"] = /severe|unbearable|can't breathe|chest pain/.test(
    lower
  )
    ? "High"
    : /since|days|weeks/.test(lower)
    ? "Moderate"
    : "Low";

  return {
    bookingId,
    symptomsReported: symptoms,
    possibleCauses: derivePossibleCauses(lower),
    recommendedDepartment: departmentName,
    urgencyLevel,
    notesForDoctor:
      "Patient described symptoms via the Medicure AI intake. Please verify history and vitals on arrival before consultation.",
  };
}

function derivePossibleCauses(lowerSymptomText: string): string[] {
  if (lowerSymptomText.includes("fever")) {
    return ["Viral infection", "Seasonal flu", "Common cold"];
  }
  if (lowerSymptomText.includes("leg") || lowerSymptomText.includes("knee")) {
    return ["Muscle strain", "Joint inflammation", "Minor injury"];
  }
  if (lowerSymptomText.includes("skin") || lowerSymptomText.includes("rash")) {
    return ["Allergic reaction", "Skin infection", "Contact dermatitis"];
  }
  if (lowerSymptomText.includes("tooth") || lowerSymptomText.includes("teeth")) {
    return ["Dental cavity", "Gum inflammation"];
  }
  return ["General fatigue", "Non-specific viral symptoms", "Requires in-person evaluation"];
}

export const ALL_DEPARTMENTS = DEPARTMENTS;
