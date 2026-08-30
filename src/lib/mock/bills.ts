import type { Bill } from "@/types/users";

export const mockBills: Bill[] = [
{
    id: "bill-001",
    appointment: "appointment-001",
    doctor: 101,
    amount: "35000",
    is_paid: true,
    created_at: "2026-08-03T10:00:00Z",
    appointment_datetime: "2026-08-03T09:00:00Z",
    patient_name: "Ahmad Khaled",
},

{
    id: "bill-002",
    appointment: "appointment-002",
    doctor: 101,
    amount: "40000",
    is_paid: true,
    created_at: "2026-08-04T11:30:00Z",
    appointment_datetime: "2026-08-04T10:30:00Z",
    patient_name: "Sara Hassan",
},

{
    id: "bill-003",
    appointment: "appointment-003",
    doctor: 102,
    amount: "50000",
    is_paid: false,
    created_at: "2026-08-05T12:00:00Z",
    appointment_datetime: "2026-08-05T11:00:00Z",
    patient_name: "Omar Mahmoud",
},

{
    id: "bill-004",
    appointment: "appointment-004",
    doctor: 102,
    amount: "30000",
    is_paid: true,
    created_at: "2026-08-06T10:30:00Z",
    appointment_datetime: "2026-08-06T09:30:00Z",
    patient_name: "Lina Ahmad",
},

{
    id: "bill-005",
    appointment: "appointment-005",
    doctor: 103,
    amount: "75000",
    is_paid: false,
    created_at: "2026-08-07T14:30:00Z",
    appointment_datetime: "2026-08-07T14:00:00Z",
    patient_name: "Khaled Ali",
},

{
    id: "bill-006",
    appointment: "appointment-006",
    doctor: 103,
    amount: "35000",
    is_paid: true,
    created_at: "2026-08-10T10:30:00Z",
    appointment_datetime: "2026-08-10T10:00:00Z",
    patient_name: "Maya Saleh",
},

{
    id: "bill-007",
    appointment: "appointment-007",
    doctor: 101,
    amount: "60000",
    is_paid: false,
    created_at: "2026-08-11T12:00:00Z",
    appointment_datetime: "2026-08-11T11:30:00Z",
    patient_name: "Yousef Ibrahim",
},

{
    id: "bill-008",
    appointment: "appointment-008",
    doctor: 102,
    amount: "30000",
    is_paid: true,
    created_at: "2026-08-12T10:00:00Z",
    appointment_datetime: "2026-08-12T09:00:00Z",
    patient_name: "Nour Samir",
},

{
    id: "bill-009",
    appointment: "appointment-009",
    doctor: 103,
    amount: "55000",
    is_paid: true,
    created_at: "2026-08-13T14:30:00Z",
    appointment_datetime: "2026-08-13T13:30:00Z",
    patient_name: "Fadi Nasser",
},

{
    id: "bill-010",
    appointment: "appointment-010",
    doctor: 101,
    amount: "30000",
    is_paid: false,
    created_at: "2026-08-14T11:30:00Z",
    appointment_datetime: "2026-08-14T10:30:00Z",
    patient_name: "Rana Tarek",
},
];