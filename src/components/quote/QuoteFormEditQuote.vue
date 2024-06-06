<script setup lang="ts">
import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";

import BaseQuoteInputEditPicture from "@/components/base/quote/BaseQuoteInputEditPicture.vue";

import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";
import IconDelete from "@/components/icons/IconDelete.vue";

import type { ValidationSchemaQuote } from "@/plugins/typescript/types";

import { updateQuote } from "@/services/quote";
import axios from "axios";
import { onBeforeUnmount } from "vue";

import { useQuoteStore } from "@/stores/quote";
import { useMovieStore } from "@/stores/movie";

const quoteStore = useQuoteStore();
const movieStore = useMovieStore();

const schema: ValidationSchemaQuote = {
  "quote.en": "required|englishLetters",
  "quote.ka": "required|georgianLetters",
};

const removeSelectedQuote = (): void => {
  const quoteId = quoteStore.editQuoteData?.id;

  quoteStore.removeQuote(quoteId as number);
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
    movieStore.getSingleMovie(quoteStore.quoteSelectedMovie?.id as number);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      setErrors(error.response?.data.errors);
    }
  }
};

onBeforeUnmount((): void => {
  quoteStore.clearSelectedQuoteMovie();
  quoteStore.setEditQuoteData(null);
});
</script>

<template>
  <LayoutsFormMovieAndQuote
    :handleSubmit="handleSubmit"
    :schema="schema"
    heading="Edit Quote"
    mode="edit"
  >
    <template #actions>
      <div
        class="flex flex-row items-center justify-center gap-2.5"
        @click="removeSelectedQuote"
      >
        <IconDelete />
        <span class="text-gray-300 text-base">Delete</span>
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
    <BaseQuoteInputEditPicture />
    <BaseMovieButton class="text-xl" label="Save Changes" />
  </LayoutsFormMovieAndQuote>
</template>
