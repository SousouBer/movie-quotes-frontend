<script setup lang="ts">
import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseMovieInputFile from "@/components/base/movie/BaseMovieInputFile.vue";
import BaseMovieInputGenre from "@/components/base/movie/BaseMovieInputGenre.vue";
import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";
import axios from "axios";

import { updateMovie } from "@/services/movie";

import { useMovieStore } from "@/stores/movie";

import type { ValidationSchemaMovie } from "@/plugins/typescript/types";
import { watch, onBeforeUnmount } from "vue";

const movieStore = useMovieStore();

const schema: ValidationSchemaMovie = {
  "title.en": "required|englishLetters",
  "title.ka": "required|georgianLetters",
  "director.en": "required|englishLetters",
  "director.ka": "required|georgianLetters",
  "description.en": "required|englishLetters",
  "description.ka": "required|georgianLetters",
  budget: "required",
  year: "required",
};

const handleSubmit = async (
  values: ValidationSchemaMovie,
  {
    resetForm,
    setErrors,
  }: {
    resetForm: () => void;
    setErrors: (errors: Record<string, string>) => void;
  },
) => {
  try {
    const selectedGenres = movieStore.selectedGenres;
    console.log(selectedGenres);
    const newMovieCredentials = { ...values, genres: selectedGenres };

    await updateMovie(35, newMovieCredentials);

    resetForm();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErrors(error.response?.data.errors);
    }
  }
};

watch(
  () => movieStore.movieEditData,
  (newValue) => {
    if (newValue) {
      const movieGenres = movieStore.movieEditData?.genres;

      if (movieGenres) {
        for (const genre of movieGenres) {
          if (genre.id) {
            movieStore.addSelectedGenre(genre.id);
          }
        }
      }
    }
  },
);

onBeforeUnmount((): void => {
  movieStore.clearSelectedValues();
});
</script>

<template>
  <LayoutsFormMovieAndQuote
    :schema="schema"
    :handleSubmit="handleSubmit"
    heading="Edit Movie"
  >
    <BaseMovieInput
      type="text"
      name="title.en"
      label="Movie Name"
      locale="Eng"
    />
    <BaseMovieInput
      type="text"
      name="title.ka"
      label="ფილმის სახელი"
      locale="ქარ"
    />
    <BaseMovieInputGenre placeholder="Choose genres" />
    <BaseMovieInput type="text" name="year" label="წელი/year" />
    <BaseMovieInput type="text" name="budget" label="ბიუჯეტი/Budget" />
    <BaseMovieInput
      type="text"
      name="director.en"
      label="Director"
      locale="Eng"
    />
    <BaseMovieInput
      type="text"
      name="director.ka"
      label="რეჟისორი"
      locale="ქარ"
    />
    <BaseMovieInput
      :isTextarea="true"
      type="textarea"
      name="description.en"
      label="Movie Description"
      locale="Eng"
    />
    <BaseMovieInput
      :isTextarea="true"
      type="textarea"
      name="description.ka"
      label="ფილმის აღწერა"
      locale="ქარ"
    />
    <BaseMovieInputFile name="poster" />
    <BaseMovieButton label="Save Changes" />
  </LayoutsFormMovieAndQuote>
</template>
