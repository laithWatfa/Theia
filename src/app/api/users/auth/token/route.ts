import { delay } from "@/lib/mock/utils";

const MOCK_USERS = [
{
id: "doctor-001",
username: "doctor",
password: "123456",
first_name: "Ahmad",
last_name: "Hassan",
email: "doctor@example.com",
phone: "+963 944 123 456",
role: "DOCTOR",
specialization: "Ophthalmology",
passwordResetToken: null,
doctor_id: 101,
},
{
id: "doctor-002",
username: "lina",
password: "123456",
first_name: "Lina",
last_name: "Mahmoud",
email: "lina@example.com",
phone: "+963 955 234 567",
role: "DOCTOR",
specialization: "Ophthalmology",
passwordResetToken: null,
doctor_id: 102,
},
];

export async function POST(request: Request) {
// Simulate real API latency
await delay(700);

try {
const body = await request.json();

const { username, password } = body;

if (!username || !password) {
    return Response.json(
    {
        detail: "Username and password are required.",
    },
    { status: 400 }
    );
}

const user = MOCK_USERS.find(
    (user) =>
    user.username === username &&
    user.password === password
);

if (!user) {
    return Response.json(
    {
        detail: "No active account found with the given credentials.",
    },
    { status: 401 }
    );
}

// Mock JWT-like token.
// It doesn't need to be a real JWT because this is a demo API.
const accessToken = `mock-access-token-${user.id}`;

return Response.json({
    access: accessToken,
    refresh: `mock-refresh-token-${user.id}`,
    user: {
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    specialization: user.specialization,
    doctor_id: user.doctor_id,
    },
});
} catch {
return Response.json(
    {
    detail: "Invalid request body.",
    },
    { status: 400 }
);
}
}