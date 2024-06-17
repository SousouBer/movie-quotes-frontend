<script setup lang="ts">
import IconNewQuote from "@/components/icons/IconNewQuote.vue";
import BaseMovieInputSearch from "@/components/base/movie/BaseMovieInputSearch.vue";
import { ref } from "vue";

import NewsFeedCard from "@/components/newsFeed/NewsFeedCard.vue";
import TheLoader from "@/components/shared/TheLoader.vue";

import { useQuoteStore } from "@/stores/quote";
import { onMounted } from "vue";
import type { QuoteAuthor } from "@/plugins/typescript/types";

import { useRoute } from "vue-router";

const route = useRoute();

const quoteStore = useQuoteStore();

const isSearchFieldFocused = ref<boolean>(false);
const newsFeedContainer = ref<HTMLDivElement | null>(null);
const loading = ref<boolean>(false);

const handleFocusChanged = (isFocused: boolean): void => {
  isSearchFieldFocused.value = isFocused;
};

const showQuoteAddForm = (): void => {
  quoteStore.setShowQuoteModal(true);
  quoteStore.setQuoteModalMode("add");
};

const loadQuotes = async (): Promise<void> => {
  if (quoteStore.lastPage && quoteStore.currentPage > quoteStore.lastPage)
    return;

  loading.value = true;

  await quoteStore.getQuotes(quoteStore.currentPage, route.query);
  loading.value = false;

  quoteStore.currentPage += 1;
};

const onScroll = (): void => {
  const container = newsFeedContainer.value as HTMLDivElement;

  if (
    container.scrollTop + container.clientHeight >=
    container.scrollHeight - 10
  ) {
    loadQuotes();
  }
};

onMounted((): void => {
  loadQuotes();
});
</script>

<template>
  <div
    @scroll="onScroll"
    ref="newsFeedContainer"
    class="w-full h-screen overflow-y-auto gray-scrollbar pb-20"
  >
    <div class="flex items-center gap-8 w-auto mt-9 sm:w-[70%]">
      <div
        @click="showQuoteAddForm"
        class="cursor-pointer bg-transparent sm:bg-grayish-purple rounded-[10px] flex gap-4 flex-1 py-2 px-8 sm:p-4 mb-3"
      >
        <IconNewQuote />
        <span class="text-white text-base sm:text-xl whitespace-nowrap">{{
          $t("quote.write_new_quote")
        }}</span>
      </div>
      <BaseMovieInputSearch
        @focus-changed="handleFocusChanged"
        :class="{ 'w-full': isSearchFieldFocused }"
        class="hidden sm:flex"
        :placeholder="$t('general.search')"
        :focusedPlaceholder="`${$t('general.search_movies')}, ${$t('general.search_quotes')}`"
        name="search"
      />
    </div>

    <div class="flex flex-col gap-10 mt-4 sm:w-[70%]">
      <NewsFeedCard
        v-for="(quote, index) in quoteStore.quotes"
        :key="index"
        :is_liked="quote.is_liked"
        :quote_id="quote.id"
        :quote="quote.quote"
        :quoteAuthor="quote.quote_author as QuoteAuthor"
        :picture="quote.picture"
        :movie="quote.movie"
        :likesCount="quote.likes_count"
        :commentsCount="quote.comments_count"
        :comments="quote.comments"
      />
      <TheLoader v-if="loading" />
    </div>
  </div>
</template>
