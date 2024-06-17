<script setup lang="ts">
import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";
import NewsFeedCard from "@/components/newsFeed/NewsFeedCard.vue";

import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";

import { useQuoteStore } from "@/stores/quote";

import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconVerticalLine from "@/components/icons/IconVerticalLine.vue";

import { useWindowWidth } from "@/components/composables/useWindowWidth";

const windowWidth = useWindowWidth();

import type { Movie } from "@/plugins/typescript/types";

const quoteStore = useQuoteStore();
</script>

<template>
  <LayoutsFormMovieAndQuote
    :heading="windowWidth < 700 ? '' : $t('quote.view_quote')"
    mode="view"
  >
    <template #actions>
      <div class="flex flex-row items-center justify-center gap-4 sm:gap-6">
        <IconEdit
          @click="
            quoteStore.getEditQuoteData(quoteStore.quoteDetails?.id as number)
          "
        />
        <IconVerticalLine />
        <IconDelete
          @click="quoteStore.removeQuote(quoteStore.quoteDetails?.id as number)"
        />
      </div>
    </template>
    <BaseMovieInput
      :isDisabled="true"
      type="text"
      name="quote.en"
      placeholder="New quote"
      :isTextarea="true"
      locale="Eng"
      :italicFont="true"
    />
    <BaseMovieInput
      :isDisabled="true"
      type="text"
      name="quote.ka"
      placeholder="ახალი ციტატა"
      :isTextarea="true"
      locale="ქარ"
      :italicFont="true"
    />
    <NewsFeedCard
      :quote_id="quoteStore.quoteDetails?.id as number"
      :picture="quoteStore.quoteDetails?.picture as string"
      :movie="quoteStore.quoteDetails?.movie as Movie"
      :likesCount="quoteStore.quoteDetails?.likes_count as string"
      :commentsCount="quoteStore.quoteDetails?.comments_count as string"
      :comments="quoteStore.quoteDetails?.comments"
      :isQuoteViewCard="true"
      :is_liked="quoteStore.quoteDetails?.is_liked"
    />
  </LayoutsFormMovieAndQuote>
</template>
