import Axios from "@/plugins/axios/axios";

export async function login(payload) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/login", payload);
}

export async function register(payload) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/register", payload);
}
