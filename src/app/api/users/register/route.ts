import { delay } from "@/lib/mock/utils";

export async function POST(request: Request) {
await delay(800);

try {
    const body = await request.json();
    
    console.log(body);

    const {
    username,
    firstName,
    lastName,
    email,
    phone,
    role,
    specialization,
    } = body;

    if (
    !username ||
    !firstName ||
    !lastName ||
    !email
    ) {
    return Response.json(
        {
        detail: "Required fields are missing.",
        },
        { status: 400 }
    );
    }

    return Response.json(
    {
        id: `user-${crypto.randomUUID()}`,
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        role,
        specialization,
        message:
        "Account created successfully.",
    },
    { status: 201 }
    );
} catch {
    return Response.json(
    {
        detail: "Invalid request.",
    },
    { status: 400 }
    );
}
}