export function generateId(prefix: string) {
return `${prefix}-${crypto.randomUUID()}`;
}

export function now() {
return new Date().toISOString();
}

export function delay(ms = 300) {
return new Promise((resolve) => setTimeout(resolve, ms));
}

export function jsonError(
message: string,
status = 400
) {
return Response.json(
    {
    success: false,
    message,
    },
    { status }
);
}