<script setup lang="ts">
import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";
import BaseMovieInputFile from "@/components/base/movie/BaseMovieInputFile.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";

import BaseQuoteInputEditPicture from "@/components/base/quote/BaseQuoteInputEditPicture.vue";

import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";

import type { ValidationSchemaQuote } from "@/plugins/typescript/types";

import { updateQuote } from "@/services/quote";
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
    const selectedMovieId = quoteStore.quoteSelectedMovie?.id;
    const quoteFormValues = { ...values, movie_id: selectedMovieId };

    await updateQuote(quoteStore.editQuoteData?.id, quoteFormValues);

    resetForm();

    quoteStore.setShowQuoteModal(false);
    quoteStore.getQuotes();
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
    heading="Edit Quote"
    mode="edit"
  >
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
    <BaseQuoteInputEditPicture />
    <BaseMovieButton class="text-xl" label="Save Changes" />
  </LayoutsFormMovieAndQuote>
</template>
