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

export async function PUT(
request: Request,
{ params }: Params
) {
await delay();

const { id } = await params;

const index = db.bills.findIndex(
(bill) => bill.id === id
);

if (index === -1) {
return jsonError(
    "Bill not found",
    404
);
}

try {
const body = await request.json();

const currentBill = db.bills[index];

const updatedBill = {
    ...currentBill,
    ...body,
    id: currentBill.id,
};

db.bills[index] = updatedBill;

return Response.json(updatedBill);
} catch {
return jsonError(
    "Invalid bill data",
    400
);
}
}

export async function DELETE(
request: Request,
{ params }: Params
) {
await delay();

const { id } = await params;

const index = db.bills.findIndex(
(bill) => bill.id === id
);

if (index === -1) {
return jsonError(
    "Bill not found",
    404
);
}

const deleted = db.bills[index];

db.bills.splice(index, 1);

return Response.json(deleted);
}