import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchMovies } from "@/services/movie";

import type { Movie, Genre } from "@/plugins/typescript/types";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref<Movie[] | null>([]);
  const genres = ref<Genre[] | null>(null);

  // Collect the ids of selected genres.
  const selectedGenres = ref<string[] | null>(null);

  const singleMovie = ref<Movie | null>(null);

  const showMovieAddModal = ref<boolean>(false);

  function setMovies(fetchedMovies: Movie[]): void {
    movies.value = fetchedMovies;
  }

  function setShowMovieAddModal(value: boolean): void {
    showMovieAddModal.value = value;
  }

  async function getMovies(): Promise<void> {
    try {
      const { data } = await fetchMovies();

      const fetchedMovies: Movie[] = data.data;

      setMovies(fetchedMovies);
    } catch (error: any) {
      console.log(error);
    }
  }

  return {
    movies,
    genres,
    singleMovie,
    selectedGenres,
    showMovieAddModal,
    setShowMovieAddModal,
    getMovies,
  };
});
