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

import { useRoute } from "vue-router";
import { useQuoteStore } from "@/stores/quote";
import { useMovieStore } from "@/stores/movie";

import { onBeforeUnmount, computed } from "vue";

const route = useRoute();

const quoteStore = useQuoteStore();
const movieStore = useMovieStore();

const schema: ValidationSchemaQuote = {
  "quote.en": "required|englishLetters",
  "quote.ka": "required|georgianLetters",
};

const displayMovieSelectionDropdown = computed((): boolean => {
  return route.params.id ? false : true;
});

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
    await addQuote(quoteFormValues);

    resetForm();

    quoteStore.setShowQuoteModal(false);

    // Fetch both quotes and movie details to update the UI in both views.
    quoteStore.getQuotes();
    if (selectedMovieId) {
      movieStore.getSingleMovie(selectedMovieId);
    }
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
    <BaseMovieInputFile class="sm:hidden" name="picture" />

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
    <BaseMovieInputFile class="hidden sm:flex" name="picture" />
    <BaseQuoteInputChooseMovie v-if="displayMovieSelectionDropdown" />
    <BaseMovieButton class="text-xl" label="Add Quote" />
  </LayoutsFormMovieAndQuote>
</template>
