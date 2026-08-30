// src/app/api/diagnoses/route.ts

import { db } from "@/lib/mock/db";
import { delay, jsonError } from "@/lib/mock/utils";
import { generateMockDiagnosis } from "@/lib/mock/ai";

export async function GET() {
await delay(300);

return Response.json(db.diagnoses);
}

export async function POST(request: Request) {
try {
const formData = await request.formData();

const patientId =
    formData.get("patient_id")?.toString();

const appointment =
    formData.get("appointment")?.toString() || null;

if (!patientId) {
    return jsonError(
    "Patient is required.",
    400
    );
}


const patient = db.patients.find(
    (p) => p.id === patientId
);

if (!patient) {
    return jsonError(
    "Patient not found.",
    404
    );
}

const leftImage =
    formData.get("left_fundus_image");

const rightImage =
    formData.get("right_fundus_image");

if (
    leftImage &&
    !(leftImage instanceof File)
) {
    return jsonError(
    "Invalid left fundus image.",
    400
    );
}

if (
    rightImage &&
    !(rightImage instanceof File)
) {
    return jsonError(
    "Invalid right fundus image.",
    400
    );
}

// Simulate AI inference
await delay(1800);

const diagnosis = generateMockDiagnosis({
    patientId: patient.id,

    appointment,

    patientAge: patient.age,

    patientGender: patient.gender,

    leftImage: null,

    rightImage: null,
});

db.diagnoses.push({...diagnosis , physician : 101});

return Response.json(
    diagnosis,
    { status: 201 }
);

} catch (error) {
console.error(
    "Mock diagnosis error:",
    error
);

return jsonError(
    "Failed to process diagnosis.",
    500
);
}
}