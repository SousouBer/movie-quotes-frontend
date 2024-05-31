import Axios from "@/plugins/axios/axios";

import type { SchemaProfile } from "@/plugins/typescript/types.ts";

export async function updateProfile(payload: SchemaProfile) {
  return await Axios.post("/api/profile/update", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
