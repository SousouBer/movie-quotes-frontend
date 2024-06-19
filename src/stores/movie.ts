import { defineStore } from "pinia";
import { ref } from "vue";

import {
  fetchMovies,
  fetchSingleMovie,
  fetchGenres,
  deleteMovie,
  editMovie,
} from "@/services/movie";

import { useRouter } from "vue-router";

import type { Movie, Genre, MovieEdit } from "@/plugins/typescript/types";

type FormMode = "add" | "edit" | null;

type BackendError = {
  string: string[];
};

export const useMovieStore = defineStore("movieStore", () => {
  const router = useRouter();

  const movies = ref<Movie[] | null>([]);
  const genres = ref<Genre[] | null>(null);

  // Collect the ids of selected genres.
  const selectedGenres = ref<number[]>([]);

  const singleMovie = ref<Movie | null>(null);

  const movieEditData = ref<MovieEdit | null>(null);

  const showMovieModal = ref<boolean>(false);
  const movieFormMode = ref<FormMode>(null);

  const imageBackendErrors = ref<Array<BackendError> | null>(null);

  const movieImageIsUploaded = ref<boolean>(false);

  function setImageBackendErrors(value: Array<BackendError> | null): void {
    imageBackendErrors.value = value;

    setTimeout((): void => {
      imageBackendErrors.value = null;
    }, 4000);
  }

  function setMovies(fetchedMovies: Movie[]): void {
    movies.value = fetchedMovies;
  }

  function setSingleMovie(fetchedSingleMovie: Movie): void {
    singleMovie.value = fetchedSingleMovie;
  }

  function setGenres(fetchedGenres: Genre[]): void {
    genres.value = fetchedGenres;
  }

  function setMovieEditData(fetchedData: MovieEdit | null): void {
    movieEditData.value = fetchedData;
  }

  function setShowMovieModal(value: boolean): void {
    showMovieModal.value = value;
  }

  function setMovieFormMode(value: FormMode): void {
    movieFormMode.value = value;
  }

  function clearSelectedValues() {
    selectedGenres.value = [];
    movieImageIsUploaded.value = false;
  }

  async function getMovies(query = {}): Promise<void> {
    try {
      const { data } = await fetchMovies(query);

      const fetchedMovies: Movie[] = data.data;

      setMovies(fetchedMovies);
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getSingleMovie(id: number): Promise<void> {
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

  async function deleteMovieData(id: string): Promise<void> {
    try {
      await deleteMovie(id);

      router.push({ name: "movies" });
    } catch (error: any) {
      console.log(error);
    }
  }

  async function editMovieData(id: string): Promise<void> {
    try {
      const response = await editMovie(id);

      const movieData = response.data.data;

      setMovieEditData(movieData);
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
    showMovieModal,
    setShowMovieModal,
    getMovies,
    getSingleMovie,
    setSingleMovie,
    getGenres,
    addSelectedGenre,
    removeSelectedGenre,
    deleteMovieData,
    editMovieData,
    movieEditData,
    movieFormMode,
    setMovieFormMode,
    setMovieEditData,
    movieImageIsUploaded,
    clearSelectedValues,
    imageBackendErrors,
    setImageBackendErrors,
  };
});
