<script setup lang="ts">
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseMovieInputSearch from "@/components/base/movie/BaseMovieInputSearch.vue";
import MovieCard from "@/components/movie/MovieCard.vue";

import MovieForm from "@/components/movie/MovieForm.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";

import { useMovieStore } from "@/stores/movie";

const movieStore = useMovieStore();
</script>

<template>
  <section class="bg-custom-gradient h-screen w-full px-8 sm:px-16 py-8">
    <div class="flex items-start sm:items-center justify-between sm:mb-12">
      <span
        class="font-medium text-2xl text-white flex flex-col gap-y-2 sm:inline"
        >My list of movies
        <span class="font-medium text-base sm:text-2xl text-white"
          >(Total 25)</span
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
      class="flex items-center justify-center flex-wrap gap-x-10 gap-y-20 sm:gap-y-32"
    >
      <MovieCard
        poster="/images/dummy-movie-poster.svg"
        title="Loki Mobius"
        year="2021"
        :quotesCount="5"
      />
      <MovieCard
        poster="/images/dummy-movie-poster.svg"
        title="Loki Mobius"
        year="2021"
        :quotesCount="5"
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
