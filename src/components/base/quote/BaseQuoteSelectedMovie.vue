<script setup lang="ts">
import { useQuoteStore } from "@/stores/quote";

import BaseMovieChipGenre from "@/components/base/movie/BaseMovieChipGenre.vue";
import { useWindowWidth } from "@/components/composables/useWindowWidth";

const windowWidth = useWindowWidth();

const quoteStore = useQuoteStore();
</script>

<template>
  <div
    :class="{ 'bg-black py-3 px-4 rounded-[4px]': windowWidth < 700 }"
    class="flex gap-4 sm:gap-6 items-center"
  >
    <div class="w-28 sm:w-72 h-20 sm:h-40 rounded-xl overflow-hidden">
      <img
        class="w-full h-full"
        :src="quoteStore.quoteSelectedMovie?.poster"
        alt="Selected Movie Poster"
      />
    </div>
    <div class="flex-1 flex flex-col gap-1">
      <span
        class="font-medium text-warm-gray text-base sm:text-2xl leading-6 sm:leading-9"
        >{{ quoteStore.quoteSelectedMovie?.title }} ({{
          quoteStore.quoteSelectedMovie?.year
        }})</span
      >
      <div class="flex flex-wrap gap-3 sm:my-3 order-3 sm:order-2">
        <BaseMovieChipGenre
          v-for="(genre, index) in quoteStore.quoteSelectedMovie?.genres"
          :key="index"
          :name="genre.title"
          :showCancelButton="false"
        />
      </div>
      <span
        class="font-bold text-base sm:text-[18px] text-gray-300 order-2 sm:order-3"
        >{{ $t("movie.director") }}:
        <span class="text-white text-base sm:text-[18px] font-medium">{{
          quoteStore.quoteSelectedMovie?.director
        }}</span></span
      >
    </div>
  </div>
</template>
