<script setup lang="ts">
import { useQuoteStore } from "@/stores/quote";

import BaseMovieChipGenre from "@/components/base/movie/BaseMovieChipGenre.vue";

const quoteStore = useQuoteStore();
</script>

<template>
  <div class="flex gap-6 items-center">
    <div class="w-72 h-40 rounded-xl overflow-hidden">
      <img
        class="w-full h-full"
        :src="quoteStore.quoteSelectedMovie?.poster"
        alt="Selected Movie Poster"
      />
    </div>
    <div class="flex-1">
      <span class="font-medium text-warm-gray text-2xl leading-[36px]"
        >{{ quoteStore.quoteSelectedMovie?.title }} ({{
          quoteStore.quoteSelectedMovie?.year
        }})</span
      >
      <div class="flex flex-wrap gap-3 my-6">
        <BaseMovieChipGenre
          v-for="(genre, index) in quoteStore.quoteSelectedMovie?.genres"
          :key="index"
          :name="genre.title"
          :showCancelButton="false"
        />
      </div>
      <span class="font-bold text-[18px] text-gray-300"
        >Director:
        <span class="text-white text-[18px] font-medium">{{
          quoteStore.quoteSelectedMovie?.director
        }}</span></span
      >
    </div>
  </div>
</template>
