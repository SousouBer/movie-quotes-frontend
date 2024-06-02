import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchMovies, fetchSingleMovie, fetchGenres } from "@/services/movie";

import type { Movie, Genre } from "@/plugins/typescript/types";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref<Movie[] | null>([]);
  const genres = ref<Genre[] | null>(null);

  // Collect the ids of selected genres.
  const selectedGenres = ref<number[]>([]);

  const singleMovie = ref<Movie | null>(null);

  const showMovieAddModal = ref<boolean>(false);

  function setMovies(fetchedMovies: Movie[]): void {
    movies.value = fetchedMovies;
  }

  function setSingleMovie(fetchedSingleMovie: Movie): void {
    singleMovie.value = fetchedSingleMovie;
  }

  function setGenres(fetchedGenres: Genre[]): void {
    genres.value = fetchedGenres;
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

  async function getSingleMovie(id: string): Promise<void> {
    try {
      const { data } = await fetchSingleMovie(id);

      const fetcheSingleMovie: Movie = data.data;

      setSingleMovie(fetcheSingleMovie);
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getGenres(): Promise<void> {
    try {
      const { data } = await fetchGenres();

      const fetchedGenres: Genre[] = data.data;

      setGenres(fetchedGenres);
    } catch (error: any) {
      console.log(error);
    }
  }

  function addSelectedGenre(id: number): void {
    selectedGenres.value.push(id);
  }

  function removeSelectedGenre(id: number): void {
    selectedGenres.value = selectedGenres.value.filter(
      (genreId) => genreId !== id,
    );
  }

  return {
    movies,
    genres,
    singleMovie,
    selectedGenres,
    showMovieAddModal,
    setShowMovieAddModal,
    getMovies,
    getSingleMovie,
    setSingleMovie,
    getGenres,
    addSelectedGenre,
    removeSelectedGenre,
  };
});
