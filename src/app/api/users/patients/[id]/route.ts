import { db } from "@/lib/mock/db";
import { delay, jsonError } from "@/lib/mock/utils";

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

const index = db.patients.findIndex(
    (patient) => patient.id === id
);

if (index === -1) {
    return jsonError("Patient not found", 404);
}

const deletedPatient = db.patients[index];

db.patients.splice(index, 1);

return Response.json(deletedPatient);
}