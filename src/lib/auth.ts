// lib/auth.ts
import api, { setAccessToken, clearAccessToken } from "./api";



export async function login(
  username: string,
  password: string
) {
  const res = await api.post(
    "/api/users/auth/token/",
    {
      username,
      password,
    }
  );

  setAccessToken(res.data.access);

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
