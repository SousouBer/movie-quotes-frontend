<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseMovieInputSearch from "@/components/base/movie/BaseMovieInputSearch.vue";
import MovieCard from "@/components/movie/MovieCard.vue";

import MovieForm from "@/components/movie/MovieForm.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";

import { useMovieStore } from "@/stores/movie";

const movieStore = useMovieStore();
const router = useRouter();

const movieDetails = (id: string): void => {
  router.push({ name: "movie", params: { id: id } });
};

onMounted((): void => {
  movieStore.getMovies();
  movieStore.getGenres();
});
</script>

<template>
  <section class="bg-custom-gradient w-full px-8 sm:px-16 py-8">
    <div class="flex items-start sm:items-center justify-between sm:mb-12">
      <span
        class="font-medium text-2xl text-white flex flex-col gap-y-2 sm:inline"
        >My list of movies
        <span class="font-medium text-base sm:text-2xl text-white">
          {{ `(total: ${movieStore.movies?.length ?? 0})` }}</span
        >
      </span>
      <div class="flex items-center">
        <BaseMovieInputSearch
          class="hidden sm:flex"
          name="search"
          placeholder="Search"
        />
        <BaseMovieButton
          @click="movieStore.setShowMovieAddModal(true)"
          label="Add Movie"
        >
          <IconMovieAdd />
        </BaseMovieButton>
      </div>
    </div>
    <div
      class="flex items-start flex-wrap gap-x-10 gap-y-20 sm:gap-y-32 mt-8 sm:mt-0"
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
    <Teleport to="body">
      <div
        v-if="movieStore.showMovieAddModal"
        @click.self="movieStore.setShowMovieAddModal(false)"
        class="bg-blurred-gradient absolute top-0 left-0 w-full min-h-full flex sm:items-center justify-center"
      >
        <MovieForm />
      </div>
    </Teleport>
  </section>
</template>
