type Appointment = {
  id: string;
  patient: string;
  appointment_datetime: string;
  doctor: number;
  doctor_name: string;
  patient_name: string;
  notes: string;
};

type Bill = {
  id: string;
  appointment: string;
  doctor: number;
  amount: string;
  is_paid: boolean;
  created_at: string;
  appointment_datetime: string;
  patient_name: string;
};


type Clinic = {
  id: string;
  name: string;
  location: string;
  created_at: string;
};

type Patient = {
  id: string;
  personal_photo: string | null;
  full_name: string;
  date_of_birth: string;
  gender: string;
  age: number;
  clinic: Clinic;
  address: string;
  phone: string;
  insurance_info: string;
  contact_info: string;
  doctors: number[];
};

type EvidenceVector = {
  left_fundus_diagnose: Record<string, number>;
  right_fundus_diagnose: Record<string, number>;
  age: number;
  gender: string;
};

type Diagnose = {
  id: string;
  left_fundus_image: string | null;
  right_fundus_image: string | null;
  status: "SUCCESS" | "FAILED" | "PENDING";
  result: {
    final_diagnosis: Record<string, string>;
    evidence_vector: EvidenceVector;
  } | null;
  error_message: string | null;
  medical_notes: string;
  worker_id: string;
  started_at: string;
  finished_at: string;
  created_at: string;
  updated_at: string;
  patient: string;
  physician: number;
  appointment: string | null;
  model_version: string | null;
};

// 🔹 Treatment type
type Treatment = {
  id: string;
  diagnosis: string;
  doctor: number;
  medication: string;
  instructions: string;
  created_at: string;
  patient_name: string;
  dosage: string;
  surgical_interventions: string;
};

export type {Bill,Appointment,Treatment,Patient,Diagnose}