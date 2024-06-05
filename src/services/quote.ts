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

export async function editQuote(id: number) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get(`/api/quotes/edit/${id}`);
}

export async function updateQuote(id, payload) {
  await Axios.get("/sanctum/csrf-cookie");

  if (!payload.picture) {
    delete payload.picture;
  }
  console.log("payload", payload);

  const formData = new FormData();

  for (const key in payload) {
    if (typeof payload[key] === "object" && key !== "picture") {
      for (const nestedKey in payload[key]) {
        formData.append(`${key}[${nestedKey}]`, payload[key][nestedKey]);
      }
    } else {
      formData.append(key, payload[key]);
    }
  }

  formData.append("_method", "PATCH");

  return await Axios.post(`/api/quotes/${id}`, formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
}
