import type { Appointment } from "@/types/users";

export const mockAppointments: Appointment[] = [
{
    id: "appointment-001",
    patient: "patient-001",
    appointment_datetime: "2026-08-03T09:00:00Z",
    doctor: 101,
    doctor_name: "Dr. Ahmad Hassan",
    patient_name: "Ahmad Khaled",
    notes: "Routine eye examination",
},

{
    id: "appointment-002",
    patient: "patient-002",
    appointment_datetime: "2026-08-04T10:30:00Z",
    doctor: 101,
    doctor_name: "Dr. Ahmad Hassan",
    patient_name: "Sara Hassan",
    notes: "Follow-up examination after previous diagnosis",
},

{
    id: "appointment-003",
    patient: "patient-003",
    appointment_datetime: "2026-08-05T11:00:00Z",
    doctor: 102,
    doctor_name: "Dr. Lina Mahmoud",
    patient_name: "Omar Mahmoud",
    notes: "Diabetic eye screening",
},

{
    id: "appointment-004",
    patient: "patient-004",
    appointment_datetime: "2026-08-06T09:30:00Z",
    doctor: 102,
    doctor_name: "Dr. Lina Mahmoud",
    patient_name: "Lina Ahmad",
    notes: "Vision problems and headaches",
},

{
    id: "appointment-005",
    patient: "patient-005",
    appointment_datetime: "2026-08-07T14:00:00Z",
    doctor: 103,
    doctor_name: "Dr. Omar Saleh",
    patient_name: "Khaled Ali",
    notes: "Cataract evaluation",
},

{
    id: "appointment-006",
    patient: "patient-006",
    appointment_datetime: "2026-08-10T10:00:00Z",
    doctor: 103,
    doctor_name: "Dr. Omar Saleh",
    patient_name: "Maya Saleh",
    notes: "Routine follow-up",
},

{
    id: "appointment-007",
    patient: "patient-007",
    appointment_datetime: "2026-08-11T11:30:00Z",
    doctor: 101,
    doctor_name: "Dr. Ahmad Hassan",
    patient_name: "Yousef Ibrahim",
    notes: "Glaucoma monitoring",
},

{
    id: "appointment-008",
    patient: "patient-008",
    appointment_datetime: "2026-08-12T09:00:00Z",
    doctor: 102,
    doctor_name: "Dr. Lina Mahmoud",
    patient_name: "Nour Samir",
    notes: "Blurred vision examination",
},

{
    id: "appointment-009",
    patient: "patient-009",
    appointment_datetime: "2026-08-13T13:30:00Z",
    doctor: 103,
    doctor_name: "Dr. Omar Saleh",
    patient_name: "Fadi Nasser",
    notes: "Retinal examination",
},

{
    id: "appointment-010",
    patient: "patient-010",
    appointment_datetime: "2026-08-14T10:30:00Z",
    doctor: 101,
    doctor_name: "Dr. Ahmad Hassan",
    patient_name: "Rana Tarek",
    notes: "Vision assessment",
},
];