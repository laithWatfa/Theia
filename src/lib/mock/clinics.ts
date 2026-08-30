import type { Patient } from "@/types/users";

export const mockClinics: Patient["clinic"][] = [
{
    id: "clinic-001",
    name: "Al-Shifa Eye Clinic",
    location: "Damascus, Syria",
    created_at: "2024-01-15T09:00:00Z",
},
{
    id: "clinic-002",
    name: "Al-Noor Ophthalmology Center",
    location: "Homs, Syria",
    created_at: "2024-03-10T09:00:00Z",
},
{
    id: "clinic-003",
    name: "Vision Care Center",
    location: "Aleppo, Syria",
    created_at: "2024-06-20T09:00:00Z",
},
];