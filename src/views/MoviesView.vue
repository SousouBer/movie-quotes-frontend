<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseMovieInputSearch from "@/components/base/movie/BaseMovieInputSearch.vue";
import MovieCard from "@/components/movie/MovieCard.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";

import { useMovieStore } from "@/stores/movie";

const movieStore = useMovieStore();
const router = useRouter();

const movieDetails = (id: number): void => {
  router.push({ name: "movie", params: { id: id } });
};

const displayAddMovieForm = (): void => {
  movieStore.setShowMovieModal(true);
  movieStore.setMovieFormMode("add");
};

onMounted((): void => {
  movieStore.getMovies();
  movieStore.getGenres();
});
</script>

<template>
  <div class="bg-grayish-blue w-full px-8 sm:px-16 py-8">
    <div
      class="flex items-start gap-2 sm:items-center justify-between sm:mb-12"
    >
      <span
        class="font-medium text-2xl text-white flex flex-col gap-y-2 sm:inline"
        >{{ $t("movie.my_movies_list") }}
        <span class="font-medium text-base sm:text-2xl text-white">
          {{
            `(${$t("movie.total")}: ${movieStore.movies?.length ?? 0})`
          }}</span
        >
      </span>
      <div class="flex items-center">
        <BaseMovieInputSearch
          class="hidden sm:flex mt-2 mr-4"
          name="search"
          :placeholder="$t('movie.search')"
          :isMoviesSearch="true"
        />
        <BaseMovieButton
          @click="displayAddMovieForm"
          :label="$t('movie.add_movie')"
        >
          <IconMovieAdd />
        </BaseMovieButton>
      </div>
    </div>
    <div
      class="flex items-start flex-wrap gap-x-10 gap-y-14 sm:gap-y-32 mt-8 sm:mt-0"
    >
      <MovieCard
        v-for="(movie, index) in movieStore.movies"
        @click="movieDetails(movie.id)"
        class="cursor-pointer"
        :key="index"
        :poster="movie.poster"
        :title="movie.title"
        :year="movie.year"
        :quotesCount="movie.quotes_count"
      />
    </div>
  </div>
</template>
