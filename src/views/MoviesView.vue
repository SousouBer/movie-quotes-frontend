<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseMoviesButton from "@/components/base/movies/BaseMoviesButton.vue";
import BaseMoviesInputSearch from "@/components/base/movies/BaseMoviesInputSearch.vue";
import MovieCard from "@/components/movies/MovieCard.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";
</script>

<template>
  <TheHeader />
  <section class="bg-custom-gradient h-screen w-full">
    <div class="flex items-center justify-between">
      <span
        class="font-medium text-2xl text-white flex flex-col gap-y-2 sm:inline"
        >My list of movies
        <span class="font-medium text-base sm:text-2xl text-white"
          >(Total 25)</span
        >
      </span>
      <div class="flex items-center">
        <BaseMoviesInputSearch name="search" placeholder="Search" />
        <BaseMoviesButton label="Add Movie">
          <IconMovieAdd />
        </BaseMoviesButton>
      </div>
    </div>
    <div>
      <MovieCard
        poster="/images/dummy-movie-poster.svg"
        title="Loki Mobius"
        year="2021"
        :quotesCount="5"
      />
    </div>
  </section>
</template>
