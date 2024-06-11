<script setup lang="ts">
import BaseMovieChipGenre from "@/components/base/movie/BaseMovieChipGenre.vue";

import IconDropdownLocale from "@/components/icons/IconDropdownLocale.vue";
import { ref } from "vue";

import { useMovieStore } from "@/stores/movie";
import { computed } from "vue";

import type { Genre } from "@/plugins/typescript/types";

const movieStore = useMovieStore();

const genreModalIsShown = ref<boolean>(false);

const allGenres = computed((): Genre[] => {
  const genres = movieStore.genres || [];
  const selectedGenreIDs = movieStore.selectedGenres;

  const unselectedGenres = genres.filter(
    (genre) => !selectedGenreIDs.includes(genre.id),
  );

  return unselectedGenres;
});

const toggleGenreModal = (): void => {
  genreModalIsShown.value = !genreModalIsShown.value;
};

const selectGenre = (genreId: number): void => {
  movieStore.addSelectedGenre(genreId);
};

const displaySelectedGenres = computed((): Genre[] => {
  const genres = movieStore.genres || [];
  const selectedGenreIDs = movieStore.selectedGenres || [];

  const selectedGenres = genres.filter((genre) =>
    selectedGenreIDs.includes(genre.id),
  );

  return selectedGenres;
});
</script>

<template>
  <div
    class="relative flex items-center justify-between gap-3 border border-shade-of-gray py-2 px-4 rounded-[4.8px] h-12"
  >
    <div
      class="overflow-hidden overflow-x-scroll no-scrollbar flex items-center gap-2 h-full"
    >
      <BaseMovieChipGenre
        v-for="(selectedGenre, index) in displaySelectedGenres"
        :key="index"
        :name="selectedGenre.title"
        @click="movieStore.removeSelectedGenre(selectedGenre.id)"
      />
    </div>
    <IconDropdownLocale
      :class="{ 'rotate-180': genreModalIsShown }"
      class="cursor-pointer transition-all duration-200"
      color="white"
      @click="toggleGenreModal"
    />
    <div
      v-if="genreModalIsShown"
      class="w-full no-scrollbar flex-wrap absolute -bottom-1 left-0 transform translate-y-full bg-dark-shade-of-blue border border:shade-of-gray rounded-[4.8px] flex gap-2 p-4 z-10 h-36 overflow-y-scroll"
    >
      <BaseMovieChipGenre
        v-for="(genre, index) in allGenres"
        @click="selectGenre(genre.id)"
        :key="index"
        class="cursor-pointer"
        :showCancelButton="false"
        :name="genre.title"
      />
    </div>
  </div>
</template>
