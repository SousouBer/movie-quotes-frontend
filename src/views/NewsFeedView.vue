<script setup lang="ts">
import IconNewQuote from "@/components/icons/IconNewQuote.vue";
import BaseMovieInputSearch from "@/components/base/movie/BaseMovieInputSearch.vue";
import { ref } from "vue";

import NewsFeedCard from "@/components/newsFeed/NewsFeedCard.vue";

import { useQuoteStore } from "@/stores/quote";
import { onMounted } from "vue";
import type { QuoteAuthor } from "@/plugins/typescript/types";

const quoteStore = useQuoteStore();

const isSearchFieldFocused = ref<boolean>(false);

const handleFocusChanged = (isFocused: boolean): void => {
  isSearchFieldFocused.value = isFocused;
};

const showQuoteAddForm = (): void => {
  quoteStore.setShowQuoteModal(true);
  quoteStore.setQuoteModalMode("add");
};

onMounted((): void => {
  quoteStore.getQuotes();
});
</script>

<template>
  <div class="w-full sm:w-[61%]">
    <div class="flex items-center gap-8 w-full">
      <div
        @click="showQuoteAddForm"
        class="bg-transparent sm:bg-grayish-purple rounded-[10px] flex gap-2 flex-1 py-2 px-8 sm:p-4 mb-3"
      >
        <IconNewQuote />
        <span class="text-white text-base sm:text-xl whitespace-nowrap"
          >Write new quote</span
        >
      </div>
      <BaseMovieInputSearch
        @focus-changed="handleFocusChanged"
        :class="{ 'w-full': isSearchFieldFocused }"
        class="hidden sm:flex"
        placeholder="Search by"
        focusedPlaceholder="Enter @ to search movies, Enter # to search quotes"
        name="search"
      />
    </div>
    <div class="flex flex-col gap-10 mt-4">
      <NewsFeedCard
        v-for="(quote, index) in quoteStore.quotes"
        :key="index"
        :quote_id="quote.id"
        :quote="quote.quote"
        :quoteAuthor="quote.quote_author as QuoteAuthor"
        :picture="quote.picture"
        :movie="quote.movie"
        :likesCount="quote.likes_count"
        :commentsCount="quote.comments_count"
        :comments="quote.comments"
      />
    </div>
  </div>
</template>
