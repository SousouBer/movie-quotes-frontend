import { defineStore } from "pinia";
import { ref } from "vue";

type Genre = {
  id: string;
  title: string;
};

type Movie = {
  id: string;
  title: string;
  poster: string;
  quotes_count: string;
  year: string;
  director?: string;
  description: string;
  budget: string;
  genres: Genre[];
};

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref<Movie[] | null>([]);
  const genres = ref<Genre | null>(null);

  // Collect the ids of selected genres.
  const selectedGenres = ref<string[] | null>(null);

  const singleMovie = ref<Movie | null>(null);

  return {
    movies,
    genres,
    singleMovie,
    selectedGenres,
  };
});
