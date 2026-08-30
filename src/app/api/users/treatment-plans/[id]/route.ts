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

const index = db.treatments.findIndex(
(treatment) => treatment.id === id
);

if (index === -1) {
return jsonError(
    "Treatment not found",
    404
);
}

const deleted = db.treatments[index];

db.treatments.splice(index, 1);

return Response.json(deleted);
}