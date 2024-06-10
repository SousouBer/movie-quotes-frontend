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
import { useQuoteStore } from "@/stores/quote";

const movieStore = useMovieStore();
const quoteStore = useQuoteStore();

const route = useRoute();

const deleteMovieData = (): void => {
  movieStore.deleteMovieData(route.params.id as string);
};

const editMovie = (): void => {
  movieStore.editMovieData(route.params.id as string);
  movieStore.setShowMovieModal(true);
  movieStore.setMovieFormMode("edit");
};

const selectMovie = (): void => {
  const currentMovieId = route.params.id as string;
  const movieData = movieStore.movies?.find(
    (movie) => movie.id === Number(currentMovieId),
  );

  if (movieData) {
    quoteStore.setQuoteMovie(movieData);
  }
};

const addMovieQuote = (): void => {
  selectMovie();
  quoteStore.setShowQuoteModal(true);
  quoteStore.setQuoteModalMode("add");
};

onMounted((): void => {
  const movieId = route.params.id;

  movieStore.getSingleMovie(Number(movieId));
});
</script>

<template>
  <div class="sm:pr-16 pt-5 sm:py-8 sm:px-8">
    <span class="font-medium text-2xl text-white hidden sm:inline">{{
      $t("movie.movie_description")
    }}</span>
    <div
      class="my-6 sm:mb-0 flex flex-col sm:flex-row gap-6 rounded-xl px-8 sm:px-0"
    >
      <div
        class="h-[18.875rem] sm:w-[50.55rem] sm:h-[27.56rem] rounded-xl overflow-hidden"
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
            class="hidden sm:flex items-center justify-center gap-7 bg-custom-gray-900 rounded-lg py-2.5 px-6"
          >
            <IconEdit class="cursor-pointer" @click="editMovie" />
            <IconVerticalLine />
            <IconDelete class="cursor-pointer" @click="deleteMovieData" />
          </div>
        </div>
        <div class="flex flex-wrap gap-3 my-6">
          <BaseMovieChipGenre
            v-for="(genre, index) in movieStore.singleMovie?.genres"
            :key="index"
            :showCancelButton="false"
            :name="genre.title"
            chipRadius="rounded-[4px] "
            chipTitle="font-bold text-lg"
          />
        </div>
        <p class="text-gray-300 font-bold text-lg">
          {{ $t("movie.director") }}:
          <span class="text-white font-medium">{{
            movieStore.singleMovie?.director
          }}</span>
        </p>
        <p class="text-lg text-gray-300 mt-4 leading-[27px]">
          {{ movieStore.singleMovie?.description }}
        </p>
      </div>
    </div>
    <BaseMovieButton
      @click="addMovieQuote()"
      class="sm:hidden mx-8 sm:mx-0"
      :label="$t('movie.add_quote')"
    >
      <IconMovieAdd />
    </BaseMovieButton>
    <div class="border-t border-gray-700 sm:border-none mt-8 pt-8 sm:pt-0">
      <div class="hidden sm:flex relative items-center gap-8 my-10">
        <span class="text-2xl text-white"
          >{{
            `${$t("movie.all_quotes")} (${$t("movie.total")} ${movieStore.singleMovie?.quotes_count})`
          }}
        </span>
        <BaseMovieButton
          class="hidden sm:flex"
          @click="addMovieQuote()"
          :label="$t('movie.add_quote')"
        >
          <IconMovieAdd />
        </BaseMovieButton>
        <IconVerticalLine
          width="4"
          height="20"
          class="absolute z-50 top-1/2 left-[13.3rem] transform -translate-y-1/2"
        />
      </div>
      <div class="flex flex-col gap-2 px-8 sm:hidden">
        <span class="text-2xl text-white">{{ $t("movie.all_quotes") }}</span>
        <span class="text-base text-white"
          >{{
            `(${$t("movie.total")} ${movieStore.singleMovie?.quotes_count})`
          }}
        </span>
      </div>
      <div class="flex flex-col gap-8 mt-8 sm:mt-0">
        <MovieItemQuote
          v-for="(quote, index) in movieStore.singleMovie?.quotes"
          :key="index"
          :id="quote.id"
          :quote="quote.quote"
          :picture="quote.picture"
          :likesCount="quote.likes_count"
          :commentsCount="quote.comments_count"
        />
      </div>
    </div>
  </div>
</template>
