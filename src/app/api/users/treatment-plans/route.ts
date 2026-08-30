import { db } from "@/lib/mock/db";
import {
delay,
generateId,
jsonError,
now,
} from "@/lib/mock/utils";

export async function GET() {
await delay();

return Response.json(db.treatments);
}

export async function POST(request: Request) {
await delay();

try {
const body = await request.json();

const {
    diagnosis,
    medication,
    instructions,
    dosage,
    surgical_interventions,
} = body;

if (!diagnosis) {
    return jsonError(
    "diagnosis is required"
    );
}

const diagnosisData = db.diagnoses.find(
    (item) => item.id === diagnosis
);

if (!diagnosisData) {
    return jsonError(
    "Diagnosis not found",
    404
    );
}

const patientData = db.patients.find(
    (item) => item.id === diagnosisData.patient
);

const treatment = {
    id: generateId("treatment"),
    diagnosis,
    doctor: diagnosisData.physician,
    medication: medication ?? "",
    instructions: instructions ?? "",
    created_at: now(),
    patient_name:
    patientData?.full_name ?? "Unknown Patient",
    dosage: dosage ?? "",
    surgical_interventions:
    surgical_interventions ?? "",
};

db.treatments.push(treatment);

return Response.json(treatment, {
    status: 201,
});
} catch {
return jsonError(
    "Invalid treatment data",
    400
);
}
}