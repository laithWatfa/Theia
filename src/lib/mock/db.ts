import {
mockPatients,
mockDiagnoses,
mockAppointments,
mockTreatments,
mockBills,
mockClinics,
} from "@/lib/mock";

import type {
Patient,
Diagnose,
Appointment,
Treatment,
Bill,
} from "@/types/users";

/**
 * In-memory mock database.
 *
 * IMPORTANT:
 * This is intended for a portfolio/demo deployment.
 * Data can reset when the server restarts/redeploys.
 */

export const db = {
patients: [...mockPatients] as Patient[],
diagnoses: [...mockDiagnoses] as Diagnose[],
appointments: [...mockAppointments] as Appointment[],
treatments: [...mockTreatments] as Treatment[],
bills: [...mockBills] as Bill[],
clinics: [...mockClinics],
};