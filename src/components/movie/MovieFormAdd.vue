<script setup lang="ts">
import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseMovieInputFile from "@/components/base/movie/BaseMovieInputFile.vue";
import BaseMovieInputGenre from "@/components/base/movie/BaseMovieInputGenre.vue";
import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";
import axios from "axios";

import { addMovie } from "@/services/movie";

import { useMovieStore } from "@/stores/movie";

import type { ValidationSchemaMovie } from "@/plugins/typescript/types";
import { ref, watch } from "vue";

const movieStore = useMovieStore();

const showGenresRequiredError = ref<boolean>(false);
const showPosterRequiredError = ref<boolean>(false);

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

const checkForErrors = (): void => {
  if (!movieStore.selectedGenres.length) {
    showGenresRequiredError.value = true;
  }

  if (!movieStore.movieImageIsUploaded) {
    showPosterRequiredError.value = true;
  }
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
    const selectedGenres: number[] = movieStore.selectedGenres;
    const newMovieCredentials = { ...values, genres: selectedGenres };

    if (selectedGenres.length && movieStore.movieImageIsUploaded) {
      await addMovie(newMovieCredentials);

      resetForm();

      movieStore.clearSelectedValues();
      movieStore.getMovies();

      movieStore.setShowMovieModal(false);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        movieStore.setImageBackendErrors(error.response.data.errors.poster);
      } else {
        setErrors(error.response?.data.errors);
      }
    }
  }
};

watch(
  () => movieStore.movieImageIsUploaded as boolean,
  (newValue: boolean) => {
    if (newValue) {
      showPosterRequiredError.value = false;
    }
  },
);

watch(
  () => movieStore.selectedGenres as number[],
  (newValue: number[]) => {
    if (newValue.length === 0) {
      showGenresRequiredError.value = true;
    } else {
      showGenresRequiredError.value = false;
    }
  },
  { deep: true },
);
</script>

<template>
  <LayoutsFormMovieAndQuote
    :handleSubmit="handleSubmit"
    :schema="schema"
    :heading="$t('movie.add_movie')"
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
    <div>
      <BaseMovieInputGenre placeholder="Choose genres" class="mb-2" />
      <span v-if="showGenresRequiredError" class="text-red-500">{{
        $t("movie.validation_required")
      }}</span>
    </div>
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
    <div>
      <BaseMovieInputFile name="poster" class="mb-2" />
      <span v-if="showPosterRequiredError" class="text-red-500">{{
        $t("movie.validation_required")
      }}</span>
      <!-- <div v-if="movieStore.imageBackendErrors?.length">
        <span
          v-for="(error, index) in movieStore.imageBackendErrors"
          :key="index"
          class="text-red-500"
          >{{ error }}</span
        >
      </div> -->
    </div>
    <BaseMovieButton
      @click="checkForErrors"
      :label="$t('movie.movie_form_add.btn_add_now')"
    />
  </LayoutsFormMovieAndQuote>
</template>
