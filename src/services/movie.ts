import Axios from "@/plugins/axios/axios";

import type {
  ValidationSchemaMovie,
  EditMovieData,
} from "@/plugins/typescript/types";

export async function fetchMovies(queryParams = {}) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/movies", {
    params: queryParams,
  });
}

export async function fetchSingleMovie(id: number) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get(`/api/movies/${id}`);
}

export async function fetchGenres() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/genres");
}

export async function addMovie(payload: ValidationSchemaMovie) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/movies", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteMovie(id: string) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.delete(`/api/movies/${id}`);
}

export async function editMovie(id: string) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get(`/api/movies/edit/${id}`);
}

export async function updateMovie(id: number, payload: EditMovieData) {
  await Axios.get("/sanctum/csrf-cookie");

  // Remove poster field if it was not updated.
  if (!payload.poster) {
    delete payload.poster;
  }

  const formData = new FormData();

  for (const key in payload) {
    const value = (payload as any)[key];

    if (typeof value === "object" && key !== "poster") {
      for (const nestedKey in value) {
        formData.append(`${key}[${nestedKey}]`, value[nestedKey]);
      }
    } else {
      formData.append(key, value);
    }
  }

  formData.append("_method", "PATCH");

  return await Axios.post(`/api/movies/${id}`, formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
}
