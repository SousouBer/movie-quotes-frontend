<script setup lang="ts">
import BaseMovieChipGenre from "@/components/base/movie/BaseMovieChipGenre.vue";

import IconDropdownLocale from "@/components/icons/IconDropdownLocale.vue";
import { ref } from "vue";

const props = defineProps<{
  placeholder: string;
}>();

const genreModalIsShown = ref<boolean>(false);

const toggleGenreModal = (): void => {
  genreModalIsShown.value = !genreModalIsShown.value;
};
</script>

<template>
  <div
    class="relative flex items-center justify-between gap-3 border border:shade-of-gray py-2 px-4 rounded-[4.8px] h-12"
  >
    <div class="overflow-hidden flex items-center gap-2 h-full">
      <BaseMovieChipGenre :showCancelButton="true" name="Science" />
      <BaseMovieChipGenre :showCancelButton="true" name="History" />
      <BaseMovieChipGenre :showCancelButton="true" name="Adventure" />
      <BaseMovieChipGenre :showCancelButton="true" name="Supernatural" />
      <BaseMovieChipGenre name="Supernatural" />
    </div>
    <IconDropdownLocale
      :class="{ 'rotate-180': genreModalIsShown }"
      class="cursor-pointer transition-all duration-200"
      color="white"
      @click="toggleGenreModal"
    />
    <div
      v-if="genreModalIsShown"
      class="w-full flex-wrap absolute -bottom-1 left-0 transform translate-y-full bg-dark-shade-of-blue border border:shade-of-gray rounded-[4.8px] flex gap-2 p-4 z-10"
    >
      <BaseMovieChipGenre
        class="cursor-pointer"
        :showCancelButton="false"
        name="Science"
      />
      <BaseMovieChipGenre
        class="cursor-pointer"
        :showCancelButton="false"
        name="Science"
      />
      <BaseMovieChipGenre :showCancelButton="false" name="Science" />
      <BaseMovieChipGenre :showCancelButton="false" name="Science" />
      <BaseMovieChipGenre :showCancelButton="false" name="Science" />
      <BaseMovieChipGenre :showCancelButton="false" name="Science" />
      <BaseMovieChipGenre :showCancelButton="false" name="Science" />
      <BaseMovieChipGenre :showCancelButton="false" name="Science" />
      <BaseMovieChipGenre :showCancelButton="false" name="Science" />
      <BaseMovieChipGenre :showCancelButton="false" name="Science" />
    </div>
  </div>
</template>
