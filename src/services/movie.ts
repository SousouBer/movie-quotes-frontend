import Axios from "@/plugins/axios/axios";

import type { ValidationSchemaMovie } from "@/plugins/typescript/types";

export async function fetchMovies() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/movies");
}

export async function fetchSingleMovie(id: string) {
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
