import Axios from "@/plugins/axios/axios";

export async function login(payload) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/login", payload);
}

export async function register(payload) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/register", payload);
}

export async function user() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/user");
}

export async function verifyEmail(url) {
  await Axios.get("sanctum/csrf-cookie");
  return await Axios.get(`/api/email-verify/${url}`);
}

export async function resendEmailVerificationLink(email) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post(`/api/resend-email-verification/${email}`);
}

export async function forgotPassword(payload) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/forgot-password", payload);
}

export async function resetPassword(payload, email, token) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post(`/api/reset-password/${email}/${token}`, payload);
}
