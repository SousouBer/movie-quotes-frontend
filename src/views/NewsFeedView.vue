<script setup lang="ts">
import IconNewQuote from "@/components/icons/IconNewQuote.vue";
import BaseMovieInputSearch from "@/components/base/movie/BaseMovieInputSearch.vue";
import { ref } from "vue";

const isSearchFieldFocused = ref<boolean>(false);

const handleFocusChanged = (isFocused: boolean): void => {
  isSearchFieldFocused.value = isFocused;
};
</script>

<template>
  <div class="w-2/3">
    <div class="flex items-center gap-8 w-full">
      <div
        class="bg-grayish-purple rounded-[10px] flex gap-2 flex-1 border py-2 px-4 mb-3"
      >
        <IconNewQuote />
        <span class="text-white text-xl whitespace-nowrap"
          >Write new quote</span
        >
      </div>
      <BaseMovieInputSearch
        @focus-changed="handleFocusChanged"
        :class="{ 'w-full': isSearchFieldFocused }"
        placeholder="Search by"
        focusedPlaceholder="Enter @ to search movies, Enter # to search quotes"
        name="search"
      />
    </div>
  </div>
</template>
