import type { Treatment } from "@/types/users";

export const mockTreatments: Treatment[] = [
{
    id: "treatment-001",
    diagnosis: "diagnosis-001",
    doctor: 101,
    medication: "Metformin + ophthalmic monitoring",
    instructions:
    "Continue prescribed medication and schedule regular retinal examinations.",
    created_at: "2026-08-03T10:00:00Z",
    patient_name: "Ahmad Khaled",
    dosage: "As prescribed",
    surgical_interventions: "None",
},

{
    id: "treatment-002",
    diagnosis: "diagnosis-003",
    doctor: 102,
    medication: "Anti-diabetic medication + retinal monitoring",
    instructions:
    "Maintain blood glucose control and return for retinal examination within 3 months.",
    created_at: "2026-08-05T12:00:00Z",
    patient_name: "Omar Mahmoud",
    dosage: "As prescribed",
    surgical_interventions: "None",
},

{
    id: "treatment-003",
    diagnosis: "diagnosis-006",
    doctor: 101,
    medication: "IOP-lowering ophthalmic drops",
    instructions:
    "Apply prescribed eye drops regularly and monitor intraocular pressure.",
    created_at: "2026-08-11T13:00:00Z",
    patient_name: "Yousef Ibrahim",
    dosage: "1 drop twice daily",
    surgical_interventions: "None",
},

{
    id: "treatment-004",
    diagnosis: "diagnosis-007",
    doctor: 103,
    medication: "Artificial tears",
    instructions:
    "Use lubricating eye drops as needed while preparing for further evaluation.",
    created_at: "2026-08-13T15:00:00Z",
    patient_name: "Fadi Nasser",
    dosage: "1 drop 3 times daily",
    surgical_interventions:
    "Cataract surgery evaluation recommended.",
},
];