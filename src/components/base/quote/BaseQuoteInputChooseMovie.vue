<script setup lang="ts">
import IconMovie from "@/components/icons/IconMovie.vue";
import IconDropdownLocale from "@/components/icons/IconDropdownLocale.vue";

import { useMovieStore } from "@/stores/movie";
import { useQuoteStore } from "@/stores/quote";
import { useWindowWidth } from "@/components/composables/useWindowWidth";

import { ref } from "vue";
import { computed } from "vue";

const movieStore = useMovieStore();
const quoteStore = useQuoteStore();

const windowWidth = useWindowWidth();

const moviesModalIsShown = ref<boolean>(false);

const toggleMovieSelectionModal = (): void => {
  moviesModalIsShown.value = !moviesModalIsShown.value;
};

const selectMovie = (id: number): void => {
  const movieData = movieStore.movies?.find((movie) => movie.id === id);

  if (movieData) {
    quoteStore.setQuoteMovie(movieData);
  }
};

const dynamicIconValues = computed(() =>
  windowWidth.value < 700 ? "24" : "32",
);
</script>

<template>
  <div
    @click="toggleMovieSelectionModal"
    class="bg-black rounded-[4px] flex items-center gap-3 sm:gap-4 cursor-pointer pl-6 pr-8 sm:px-8 py-7 relative"
  >
    <IconMovie :width="dynamicIconValues" :height="dynamicIconValues" />
    <span class="text-white text-base sm:text-2xl">{{
      $t("quote.choose_movie")
    }}</span>
    <IconDropdownLocale
      :class="{ 'rotate-180': moviesModalIsShown }"
      class="ml-auto transition-all duration-300"
      width="17.40"
      height="11.22"
    />
    <div
      v-if="moviesModalIsShown"
      class="absolute transition-all duration-300 overflow-y-scroll h-0 bg-black w-full -bottom-2 left-0 transform translate-y-full border border-shade-of-gray rounded-[4px] flex flex-col px-4 py-2"
      :class="{ '!h-[10rem]': moviesModalIsShown }"
    >
      <span
        v-for="(movie, index) in movieStore.movies"
        :key="index"
        @click="selectMovie(movie.id)"
        class="text-white text-xl border-b border-shade-of-gray pb-2"
        >{{ movie.title }} ({{ movie.year }})</span
      >
    </div>
  </div>
</template>
