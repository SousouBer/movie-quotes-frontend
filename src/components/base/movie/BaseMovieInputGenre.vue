<script setup lang="ts">
import BaseMovieChipGenre from "@/components/base/movie/BaseMovieChipGenre.vue";

import IconDropdownLocale from "@/components/icons/IconDropdownLocale.vue";

const props = defineProps<{
  placeholder: string;
}>();
</script>

<template>
  <div
    class="flex items-center justify-between gap-3 border border:shade-of-gray py-2 px-4 rounded-[4.8px] h-12"
  >
    <div class="overflow-hidden flex items-center gap-2 h-full">
      <BaseMovieChipGenre name="Science" />
      <BaseMovieChipGenre name="History" />
      <BaseMovieChipGenre name="Adventure" />
      <BaseMovieChipGenre name="Supernatural" />
      <BaseMovieChipGenre name="Supernatural" />
    </div>
    <IconDropdownLocale color="white" />
  </div>
</template>
