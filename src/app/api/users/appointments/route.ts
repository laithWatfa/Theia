import { db } from "@/lib/mock/db";
import {
delay,
generateId,
jsonError,
} from "@/lib/mock/utils";

export async function GET() {
await delay();

return Response.json(db.appointments);
}

export async function POST(request: Request) {
await delay();

try {
const body = await request.json();

const {
    patient,
    appointment_datetime,
    notes,
} = body;

if (!patient || !appointment_datetime) {
    return jsonError(
    "patient and appointment_datetime are required"
    );
}

const patientData = db.patients.find(
    (item) => item.id === patient
);

if (!patientData) {
    return jsonError("Patient not found", 404);
}

const doctorId =
    patientData.doctors[0] ?? 101;

const doctorNames: Record<number, string> = {
    101: "Dr. Ahmad Hassan",
    102: "Dr. Lina Mahmoud",
    103: "Dr. Omar Saleh",
};

const appointment = {
    id: generateId("appointment"),
    patient,
    appointment_datetime,
    doctor: doctorId,
    doctor_name:
    doctorNames[doctorId] ?? "Dr. Ahmad Hassan",
    patient_name: patientData.full_name,
    notes: notes ?? "",
};

db.appointments.push(appointment);

return Response.json(appointment, {
    status: 201,
});
} catch {
return jsonError(
    "Invalid appointment data",
    400
);
}
}