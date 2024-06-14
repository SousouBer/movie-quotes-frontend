<script setup lang="ts">
import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";
import BaseMovieInputFile from "@/components/base/movie/BaseMovieInputFile.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseQuoteInputChooseMovie from "@/components/base/quote/BaseQuoteInputChooseMovie.vue";

import BaseQuoteSelectedMovie from "@/components/base/quote/BaseQuoteSelectedMovie.vue";

import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";

import type { Quote, ValidationSchemaQuote } from "@/plugins/typescript/types";

import { addQuote } from "@/services/quote";
import axios from "axios";

import { useRoute } from "vue-router";
import { useQuoteStore } from "@/stores/quote";
import { useMovieStore } from "@/stores/movie";

import { onBeforeUnmount, computed, ref } from "vue";
import { watch } from "vue";

const route = useRoute();

const quoteStore = useQuoteStore();
const movieStore = useMovieStore();

const schema: ValidationSchemaQuote = {
  "quote.en": "required|englishLetters",
  "quote.ka": "required|georgianLetters",
};

const showMoviesRequiredError = ref<boolean>(false);
const showPosterRequiredError = ref<boolean>(false);

const checkForErrors = (): void => {
  if (!quoteStore.quoteSelectedMovie) {
    showMoviesRequiredError.value = true;
  }

  if (!movieStore.movieImageIsUploaded) {
    showPosterRequiredError.value = true;
  }
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

    if (quoteStore.quoteSelectedMovie && movieStore.movieImageIsUploaded) {
      await addQuote(quoteFormValues);

      resetForm();

      quoteStore.setShowQuoteModal(false);

      // Fetch both quotes and movie details to update the UI in both views.
      quoteStore.getQuotes();
      if (selectedMovieId) {
        movieStore.getSingleMovie(selectedMovieId);
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      setErrors(error.response?.data.errors);
    }
  }
};

watch(
  () => quoteStore.quoteSelectedMovie as Quote | null,
  (newValue: Quote | null) => {
    if (newValue) {
      showMoviesRequiredError.value = false;
    }
  },
);

watch(
  () => movieStore.movieImageIsUploaded as boolean,
  (newValue: boolean) => {
    if (newValue) {
      showPosterRequiredError.value = false;
    }
  },
);

onBeforeUnmount((): void => {
  quoteStore.clearSelectedQuoteMovie();
});
</script>

<template>
  <LayoutsFormMovieAndQuote
    :handleSubmit="handleSubmit"
    :schema="schema"
    :heading="$t('quote.add_quote')"
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
      :italicFont="true"
    />
    <BaseMovieInput
      type="text"
      name="quote.ka"
      placeholder="ახალი ციტატა"
      :isTextarea="true"
      locale="ქარ"
      :italicFont="true"
    />
    <div>
      <BaseMovieInputFile class="hidden sm:flex mb-2" name="picture" />
      <span v-if="showPosterRequiredError" class="text-red-500">{{
        $t("movie.validation_required")
      }}</span>
    </div>
    <div>
      <BaseQuoteInputChooseMovie
        v-if="displayMovieSelectionDropdown"
        class="mb-2"
      />
      <span v-if="showMoviesRequiredError" class="text-red-500">{{
        $t("movie.validation_required")
      }}</span>
    </div>
    <BaseMovieButton
      @click="checkForErrors"
      class="text-xl"
      :label="$t('quote.post')"
    />
  </LayoutsFormMovieAndQuote>
</template>
