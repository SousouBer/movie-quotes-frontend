<script setup lang="ts">
import BaseMovieChipGenre from "@/components/base/movie/BaseMovieChipGenre.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import MovieItemQuote from "@/components/movie/MovieItemQuote.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";
import IconVerticalLine from "@/components/icons/IconVerticalLine.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";

import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useMovieStore } from "@/stores/movie";

const movieStore = useMovieStore();
const route = useRoute();

const deleteMovieData = (): void => {
  movieStore.deleteMovieData(route.params.id as string);
};

const editMovie = (): void => {
  movieStore.editMovieData(route.params.id as string);
  movieStore.setShowMovieAddModal(true);
  movieStore.setMovieFormMode("edit");
};

onMounted((): void => {
  const movieId = route.params.id;

  movieStore.getSingleMovie(movieId as string);
});
</script>

<template>
  <div class="px-4 sm:pr-16">
    <span class="font-medium text-2xl text-white hidden sm:inline"
      >Movie description</span
    >
    <div class="my-6 sm:mb-0 flex flex-col sm:flex-row gap-6 rounded-xl">
      <div
        class="h-[18.875rem] sm:h-[27.56rem] flex-1 rounded-xl overflow-hidden"
      >
        <img
          class="h-full w-full"
          :src="movieStore.singleMovie?.poster"
          alt="Movie Image"
        />
      </div>
      <div class="flex-1">
        <div class="flex justify-between items-center">
          <span class="font-medium text-2xl text-warm-gray">{{
            `${movieStore.singleMovie?.title}
          (${movieStore.singleMovie?.year})`
          }}</span>
          <div
            class="hidden sm:flex items-center justify-center gap-6 border border-gray-300 rounded-lg py-2 px-6"
          >
            <IconEdit @click="editMovie" />
            <IconVerticalLine />
            <IconDelete @click="deleteMovieData" />
          </div>
        </div>
        <div class="flex flex-wrap gap-3 my-6">
          <BaseMovieChipGenre
            v-for="(genre, index) in movieStore.singleMovie?.genres"
            :key="index"
            :showCancelButton="false"
            :name="genre.title"
          />
        </div>
        <p class="text-gray-300 font-bold text-lg">
          Director:
          <span class="text-white font-medium">{{
            movieStore.singleMovie?.director
          }}</span>
        </p>
        <p class="text-lg text-gray-300 mt-4 leading-[27px]">
          {{ movieStore.singleMovie?.description }}
        </p>
      </div>
    </div>
    <BaseMovieButton class="sm:hidden" label="Add Quote">
      <IconMovieAdd />
    </BaseMovieButton>
    <div class="border-t border-gray-700 sm:border-none mt-8 pt-8 sm:pt-0">
      <span class="text-2xl text-white">{{
        `Quotes (Total ${movieStore.singleMovie?.quotes_count}) `
      }}</span>
      <div class="hidden sm:flex relative items-center gap-8 my-8">
        <span class="text-2xl text-white"
          >{{ `All Quotes (Total ${movieStore.singleMovie?.quotes_count})` }}
        </span>
        <BaseMovieButton label="Add Quote">
          <IconMovieAdd />
        </BaseMovieButton>
        <IconVerticalLine
          class="absolute top-1/2 left-[11.5rem] transform -translate-y-1/2"
        />
      </div>
      <div class="flex flex-col gap-8">
        <MovieItemQuote
          v-for="(quote, index) in movieStore.singleMovie?.quotes"
          :key="index"
          :quote="quote.quote"
          :picture="quote.picture"
          :likesCount="quote.likes_count"
          :commentsCount="quote.comments_count"
        />
      </div>
    </div>
  </div>
</template>
