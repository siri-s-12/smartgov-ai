import { Doctor } from "../types/models";

// 10 mock doctors distributed across departments.
// One doctor (Dr. Manjunath Gowda) is marked unavailable to simulate the
// "doctor absent -> suggest nearby centers" flow.
export const DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Ananya Rao",
    departmentId: "general-medicine",
    qualification: "MBBS, MD (General Medicine)",
    experienceYears: 9,
    rating: 4.7,
    avatarColor: "#4A8B96",
    available: true,
    currentQueueCount: 3,
  },
  {
    id: "doc-2",
    name: "Dr. Srinivas Murthy",
    departmentId: "cardiology",
    qualification: "MBBS, DM (Cardiology)",
    experienceYears: 14,
    rating: 4.8,
    avatarColor: "#E05263",
    available: true,
    currentQueueCount: 5,
  },
  {
    id: "doc-3",
    name: "Dr. Lakshmi Hegde",
    departmentId: "dermatology",
    qualification: "MBBS, MD (Dermatology)",
    experienceYears: 7,
    rating: 4.6,
    avatarColor: "#C98A3E",
    available: true,
    currentQueueCount: 2,
  },
  {
    id: "doc-4",
    name: "Dr. Manjunath Gowda",
    departmentId: "orthopedics",
    qualification: "MBBS, MS (Orthopedics)",
    experienceYears: 11,
    rating: 4.5,
    avatarColor: "#5A7DBB",
    available: false,
    currentQueueCount: 0,
  },
  {
    id: "doc-5",
    name: "Dr. Kavya Shastri",
    departmentId: "pediatrics",
    qualification: "MBBS, MD (Pediatrics)",
    experienceYears: 6,
    rating: 4.9,
    avatarColor: "#6FAE7B",
    available: true,
    currentQueueCount: 4,
  },
  {
    id: "doc-6",
    name: "Dr. Nagaraj Bhat",
    departmentId: "orthopedics",
    qualification: "MBBS, MS (Orthopedics)",
    experienceYears: 16,
    rating: 4.7,
    avatarColor: "#5A7DBB",
    available: true,
    currentQueueCount: 6,
  },
  {
    id: "doc-7",
    name: "Dr. Sowmya Iyengar",
    departmentId: "gynecology",
    qualification: "MBBS, MD (Obstetrics & Gynecology)",
    experienceYears: 10,
    rating: 4.8,
    avatarColor: "#B872C4",
    available: true,
    currentQueueCount: 3,
  },
  {
    id: "doc-8",
    name: "Dr. Ramesh Kulkarni",
    departmentId: "dentistry",
    qualification: "BDS, MDS (Oral & Maxillofacial)",
    experienceYears: 8,
    rating: 4.6,
    avatarColor: "#3FA9B0",
    available: true,
    currentQueueCount: 1,
  },
  {
    id: "doc-9",
    name: "Dr. Vidya Prabhu",
    departmentId: "ophthalmology",
    qualification: "MBBS, MS (Ophthalmology)",
    experienceYears: 12,
    rating: 4.7,
    avatarColor: "#8A7DD9",
    available: true,
    currentQueueCount: 2,
  },
  {
    id: "doc-10",
    name: "Dr. Suresh Naik",
    departmentId: "general-medicine",
    qualification: "MBBS, MD (General Medicine)",
    experienceYears: 5,
    rating: 4.4,
    avatarColor: "#4A8B96",
    available: true,
    currentQueueCount: 7,
  },
];

export const getDoctorById = (id: string): Doctor | undefined =>
  DOCTORS.find((d) => d.id === id);

export const getDoctorsByDepartment = (departmentId: string): Doctor[] =>
  DOCTORS.filter((d) => d.departmentId === departmentId);

// Nearby healthcare centers shown when the matched doctor is unavailable.
export const NEARBY_CENTERS = [
  "Sapthagiri Community Health Centre",
  "Vinayaka Rural Hospital",
  "Sri Chamundeshwari Clinic",
  "Basaveshwara Primary Health Centre",
];
