import Axios from "@/plugins/axios/axios";

import type { ValidationSchemaQuote } from "@/plugins/typescript/types";

export async function fetchQuotes() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/quotes");
}

export async function addQuote(payload: ValidationSchemaQuote) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/quotes", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
