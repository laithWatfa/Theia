import { db } from "@/lib/mock/db";
import {
delay,
generateId,
jsonError,
now,
} from "@/lib/mock/utils";

export async function GET() {
await delay();

return Response.json(db.bills);
}

export async function POST(request: Request) {
await delay();

try {
const body = await request.json();

const {
    appointment,
    amount,
    is_paid,
} = body;

if (!appointment || !amount) {
    return jsonError(
    "appointment and amount are required"
    );
}

const appointmentData =
    db.appointments.find(
    (item) => item.id === appointment
    );

if (!appointmentData) {
    return jsonError(
    "Appointment not found",
    404
    );
}

const bill = {
    id: generateId("bill"),
    appointment,
    doctor: appointmentData.doctor,
    amount: String(amount),
    is_paid: Boolean(is_paid),
    created_at: now(),
    appointment_datetime:
    appointmentData.appointment_datetime,
    patient_name:
    appointmentData.patient_name,
};

db.bills.push(bill);

return Response.json(bill, {
    status: 201,
});
} catch {
return jsonError(
    "Invalid bill data",
    400
);
}
}