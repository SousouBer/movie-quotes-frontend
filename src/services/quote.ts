import Axios from "@/plugins/axios/axios";

export async function fetchQuotes() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/quotes");
}
