import Axios from "@/plugins/axios/axios";

export async function getNotifications() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/notifications");
}
