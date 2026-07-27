import { Department } from "../types/models";

export const DEPARTMENTS: Department[] = [
  {
    id: "general-medicine",
    name: "General Medicine",
    icon: "medkit-outline",
    color: "#4A8B96",
  },
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "heart-outline",
    color: "#E05263",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    icon: "sparkles-outline",
    color: "#C98A3E",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: "body-outline",
    color: "#5A7DBB",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: "happy-outline",
    color: "#6FAE7B",
  },
  {
    id: "gynecology",
    name: "Gynecology",
    icon: "woman-outline",
    color: "#B872C4",
  },
  {
    id: "dentistry",
    name: "Dentistry",
    icon: "medical-outline",
    color: "#3FA9B0",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    icon: "eye-outline",
    color: "#8A7DD9",
  },
];

export const getDepartmentById = (id: string): Department | undefined =>
  DEPARTMENTS.find((d) => d.id === id);
