import Axios from "@/plugins/axios/axios";

import type { ValidationSchemaAuth } from "@/plugins/typescript/types.ts";

export async function login(payload: ValidationSchemaAuth) {
  return await Axios.post("/api/login", payload);
}

export async function register(payload: ValidationSchemaAuth) {
  return await Axios.post("/api/register", payload);
}

export async function user() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/user");
}

export async function verifyEmail(url: string) {
  await Axios.get("sanctum/csrf-cookie");
  return await Axios.get(`/api/email-verify/${url}`);
}

export async function resendEmailVerificationLink(email: string) {
  return await Axios.post(`/api/resend-email-verification/${email}`);
}

export async function forgotPassword(payload: ValidationSchemaAuth) {
  return await Axios.post("/api/forgot-password", payload);
}

export async function resetPassword(
  payload: ValidationSchemaAuth,
  email: string,
  token: string,
) {
  return await Axios.post(`/api/reset-password/${email}/${token}`, payload);
}

export async function logout() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/logout");
}

export async function googleAuth() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/auth/google/redirect");
}

export async function googleAuthCallback(url: string) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get(`/api/auth/google/callback${url}`);
}
