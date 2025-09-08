// lib/auth.ts
import api, { setAccessToken, clearAccessToken } from "./api";



export async function login(username: string, password: string) {
  console.log(JSON.stringify({username,password}));
  const res = await api.post("/api/users/auth/token/", JSON.stringify({username,password}), {
  headers: {
    'Content-Type': 'application/json'
  }});
  console.log(res)
  setAccessToken(res.data.access);

// try {
//     const response = await fetch("/api/users/auth/token/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // If your API needs a token from another source, add it here:
//         // "Authorization": "Bearer YOUR_TOKEN_HERE",
//       },
//       body: JSON.stringify({
//         username: "new_doctor_username_3",
//         password: "A-very-strong-password123",
//       }),
//       credentials: "include", // include cookies if backend uses them
//     });

//     if (!response.ok) {
//       // For debugging: print server response text
//       const errorText = await response.text();
//       console.error("Server returned error:", errorText);
//       throw new Error(`Request failed: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log("✅ API response:", data);
//     return data;
//   } catch (error) {
//     console.error("❌ API call failed:", error);
//   }
  
  return res.data;
}

export async function signup(data:{
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    role: string,
    specialization: string,
    password: string,
    password2: string,
  }) {
  const res = await api.post("/api/users/register/", data);
  return res;
}


export async function logout() {
clearAccessToken();
}
