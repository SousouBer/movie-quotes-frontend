<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseMoviesButton from "@/components/base/movies/BaseMoviesButton.vue";
import BaseMoviesInputSearch from "@/components/base/movies/BaseMoviesInputSearch.vue";
import MovieCard from "@/components/movies/MovieCard.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";
</script>

<template>
  <TheHeader />
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
        <BaseMoviesInputSearch
          class="hidden sm:flex"
          name="search"
          placeholder="Search"
        />
        <BaseMoviesButton label="Add Movie">
          <IconMovieAdd />
        </BaseMoviesButton>
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
  </section>
</template>
