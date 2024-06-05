<script setup lang="ts">
import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";
import BaseMovieInputFile from "@/components/base/movie/BaseMovieInputFile.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseQuoteInputChooseMovie from "@/components/base/quote/BaseQuoteInputChooseMovie.vue";

import BaseQuoteSelectedMovie from "@/components/base/quote/BaseQuoteSelectedMovie.vue";

import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";

import type { ValidationSchemaQuote } from "@/plugins/typescript/types";

import { addQuote } from "@/services/quote";
import axios from "axios";

import { useQuoteStore } from "@/stores/quote";
import { onBeforeUnmount } from "vue";

const quoteStore = useQuoteStore();

const schema: ValidationSchemaQuote = {
  "quote.en": "required|englishLetters",
  "quote.ka": "required|georgianLetters",
};

const handleSubmit = async (
  values: ValidationSchemaQuote,
  {
    resetForm,
    setErrors,
  }: {
    resetForm: () => void;
    setErrors: (errors: Record<string, string>) => void;
  },
) => {
  try {
    await addQuote(values);

    resetForm();
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      setErrors(error.response?.data.errors);
    }
  }
};

onBeforeUnmount((): void => {
  quoteStore.clearSelectedQuoteMovie();
});
</script>

<template>
  <LayoutsFormMovieAndQuote
    :handleSubmit="handleSubmit"
    :schema="schema"
    heading="Write New Quote"
    mode="edit"
  >
    <BaseQuoteSelectedMovie v-if="quoteStore.quoteSelectedMovie" />
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
    <BaseMovieInputFile name="picture" />
    <BaseQuoteInputChooseMovie v-if="!quoteStore.quoteSelectedMovie" />
    <BaseMovieButton class="text-xl" label="Add Quote" />
  </LayoutsFormMovieAndQuote>
</template>
