import { db } from "@/lib/mock/db";
import { delay, generateId, jsonError} from "@/lib/mock/utils";

export async function GET() {
await delay();

return Response.json(db.patients);
}

export async function POST(request: Request) {
await delay();

try {
    const formData = await request.formData();

    const fullName = formData.get("full_name")?.toString();
    const dateOfBirth = formData.get("date_of_birth")?.toString();
    const gender = formData.get("gender")?.toString();
    const address = formData.get("address")?.toString();
    const phone = formData.get("phone")?.toString();
    const insuranceInfo = formData.get("insurance_info")?.toString();
    const contactInfo = formData.get("contact_info")?.toString();

    if (!fullName || !dateOfBirth || !gender) {
    return jsonError(
        "full_name, date_of_birth and gender are required"
    );
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age =
    today.getFullYear() -
    birthDate.getFullYear();

    const monthDifference =
    today.getMonth() - birthDate.getMonth();

    if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
    age--;
    }

    const newPatient = {
    id: generateId("patient"),
    personal_photo: null,
    full_name: fullName,
    date_of_birth: dateOfBirth,
    gender,
    age,
    clinic: db.clinics[0],
    address: address ?? "",
    phone: phone ?? "",
    insurance_info: insuranceInfo ?? "",
    contact_info: contactInfo ?? "",
    doctors: [],
    };

    db.patients.push(newPatient);

    return Response.json(newPatient, { status: 201 });
} catch {
    return jsonError("Failed to create patient", 500);
}
}