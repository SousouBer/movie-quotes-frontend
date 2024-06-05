<script setup lang="ts">
import IconMovie from "@/components/icons/IconMovie.vue";
import IconDropdownLocale from "@/components/icons/IconDropdownLocale.vue";

import { useMovieStore } from "@/stores/movie";
import { ref } from "vue";

const movieStore = useMovieStore();

const moviesModalIsShown = ref<boolean>(false);

const toggleMovieSelectionModal = (): void => {
  moviesModalIsShown.value = !moviesModalIsShown.value;
};
</script>

<template>
  <div
    @click="toggleMovieSelectionModal"
    class="bg-black rounded-[4px] flex items-center gap-4 cursor-pointer py-7 px-8 relative"
  >
    <IconMovie />
    <span class="text-white text-2xl">Choose Movie</span>
    <IconDropdownLocale
      :class="{ 'rotate-180': moviesModalIsShown }"
      class="ml-auto transition-all duration-300"
      width="24"
      height="24"
    />
    <div
      v-if="moviesModalIsShown"
      class="absolute transition-all duration-300 overflow-y-scroll h-0 bg-black w-full -bottom-2 left-0 transform translate-y-full border border-shade-of-gray rounded-[4px] flex flex-col px-4 py-2"
      :class="{ '!h-[10rem]': moviesModalIsShown }"
    >
      <span
        v-for="(movie, index) in movieStore.movies"
        :key="index"
        class="text-white text-xl border-b border-shade-of-gray pb-2"
        >{{ movie.title }} ({{ movie.year }})</span
      >
    </div>
  </div>
</template>
