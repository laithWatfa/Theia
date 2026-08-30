import { db } from "@/lib/mock/db";
import {
delay,
jsonError,
} from "@/lib/mock/utils";

type Params = {
params: Promise<{
id: string;
}>;
};

export async function DELETE(
request: Request,
{ params }: Params
) {
await delay();

const { id } = await params;

const index = db.appointments.findIndex(
(appointment) => appointment.id === id
);

if (index === -1) {
return jsonError(
    "Appointment not found",
    404
);
}

const deleted = db.appointments[index];

db.appointments.splice(index, 1);

return Response.json(deleted);
}