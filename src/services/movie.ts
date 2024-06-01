import Axios from "@/plugins/axios/axios";

export async function fetchMovies() {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get("/api/movies");
}

export async function fetchSingleMovie(id: string) {
  await Axios.get("/sanctum/csrf-cookie");
  return await Axios.get(`/api/movies/${id}`);
}
