<script setup lang="ts">
import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";
import NewsFeedCard from "@/components/newsFeed/NewsFeedCard.vue";

import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";

import { useQuoteStore } from "@/stores/quote";

import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconVerticalLine from "@/components/icons/IconVerticalLine.vue";

import type { Movie } from "@/plugins/typescript/types";

const quoteStore = useQuoteStore();
</script>

<template>
  <LayoutsFormMovieAndQuote heading="View Quote" mode="view">
    <template #actions>
      <div class="flex flex-row items-center justify-center gap-6">
        <IconDelete />
        <IconVerticalLine color="#6C757D" />
        <IconEdit />
      </div>
    </template>
    <BaseMovieInput
      type="text"
      name="quote.en"
      placeholder="New quote"
      :isTextarea="true"
      locale="Eng"
    />
    <BaseMovieInput
      type="text"
      name="quote.ka"
      placeholder="ახალი ციტატა"
      :isTextarea="true"
      locale="ქარ"
    />
    <NewsFeedCard
      :picture="quoteStore.quoteDetails?.picture as string"
      :movie="quoteStore.quoteDetails?.movie as Movie"
      :likesCount="quoteStore.quoteDetails?.likes_count as string"
      :commentsCount="quoteStore.quoteDetails?.comments_count as string"
      :comments="quoteStore.quoteDetails?.comments"
    />
  </LayoutsFormMovieAndQuote>
</template>
