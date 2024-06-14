<script setup lang="ts">
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

import { Form as CommentForm, useField } from "vee-validate";
import { addComment } from "@/services/quote";
import type { CommentPayload } from "@/plugins/typescript/types";
import axios from "axios";

const { value } = useField<string>("comment");

import { useQuoteStore } from "@/stores/quote";
import { useMovieStore } from "@/stores/movie";

const props = defineProps<{
  quote_id: number;
}>();

const movieStore = useMovieStore();
const qouteStore = useQuoteStore();

const handleSubmit = async (): Promise<void> => {
  try {
    const commentData: CommentPayload = {
      quote_id: props.quote_id,
      comment: value.value,
    };

    const response = await addComment(commentData);

    const updatedQuote = response.data.data;

    const quoteIndex = qouteStore.quotes?.findIndex(
      (quote) => quote.id === props.quote_id,
    );

    if (quoteIndex !== -1) {
      // Replace the existing quote with the updated one
      qouteStore.quotes?.splice(quoteIndex as number, 1, updatedQuote);
    }

    if (qouteStore.quoteDetails) {
      qouteStore.setQuoteDetails(updatedQuote);
    }

    if (movieStore.singleMovie) {
      movieStore.getSingleMovie(movieStore.singleMovie?.id as number);
    }

    value.value = "";
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("An error occured: ", error);
    }
  }
};
</script>

<template>
  <CommentForm @submit="handleSubmit" class="flex items-center gap-4">
    <BaseUserDetails :isNewsFeedUser="true" :showUsername="false" />
    <input
      name="comment"
      class="bg-grayish-purple w-full outline-none text-base sm:text-xl text-white rounded-[10px] px-4 sm:px-8 py-2 sm:py-3"
      type="text"
      :placeholder="$t('quote.new_comment')"
      v-model="value"
    />
    <button class="hidden">Submit Form</button>
  </CommentForm>
</template>
