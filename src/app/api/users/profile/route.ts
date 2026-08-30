import { delay } from "@/lib/mock/utils";

const MOCK_USERS = [
{
id: "doctor-001",
username: "doctor",
first_name: "Ahmad",
last_name: "Hassan",
email: "doctor@example.com",
phone: "+963 944 123 456",
role: "DOCTOR",
specialization: "Ophthalmology",
doctor_id: 101,
},
{
id: "doctor-002",
username: "lina",
first_name: "Lina",
last_name: "Mahmoud",
email: "lina@example.com",
phone: "+963 955 234 567",
role: "DOCTOR",
specialization: "Ophthalmology",
doctor_id: 102,
},
];

export async function GET(request: Request) {
await delay(300);

const authorization =
request.headers.get("authorization");

if (!authorization) {
return Response.json(
    {
    detail: "Authentication credentials were not provided.",
    },
    { status: 401 }
);
}

const token = authorization.replace(
"Bearer ",
""
);

const user = MOCK_USERS.find(
(user) =>
    token === `mock-access-token-${user.id}`
);

if (!user) {
return Response.json(
    {
    detail: "Invalid or expired token.",
    },
    { status: 401 }
);
}

return Response.json(user);
}