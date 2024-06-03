import Axios from "@/plugins/axios/axios";

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

export async function addMovie(payload) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.post("/api/movies", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
