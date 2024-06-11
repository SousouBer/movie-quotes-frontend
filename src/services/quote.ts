import Axios from "@/plugins/axios/axios";

import type {
  ValidationSchemaQuote,
  EditQuote,
  CommentPayload,
} from "@/plugins/typescript/types";

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

export async function updateQuote(id: number, payload: EditQuote) {
  await Axios.get("/sanctum/csrf-cookie");

  if (!payload.picture) {
    delete payload.picture;
  }
  const formData = new FormData();

  for (const key in payload) {
    const value = (payload as any)[key];

    if (typeof value === "object" && key !== "picture") {
      for (const nestedKey in value) {
        formData.append(`${key}[${nestedKey}]`, value[nestedKey]);
      }
    } else {
      formData.append(key, value);
    }
  }

  formData.append("_method", "PATCH");

  return await Axios.post(`/api/quotes/${id}`, formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
}

export async function deleteQuote(id: number) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.delete(`/api/quotes/${id}`);
}

export async function fetchQuoteDetails(id: number) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get(`/api/quotes/${id}`);
}

export async function addComment(payload: CommentPayload) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/comment", payload);
}
