<script setup lang="ts">
import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseMovieInputFile from "@/components/base/movie/BaseMovieInputFile.vue";
import BaseMovieInputGenre from "@/components/base/movie/BaseMovieInputGenre.vue";
import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";
import axios from "axios";

import { updateMovie } from "@/services/movie";

import { useMovieStore } from "@/stores/movie";
import { useRoute } from "vue-router";

import type {
  ValidationSchemaMovie,
  Movie,
  Genre,
} from "@/plugins/typescript/types";
import { watch, onBeforeUnmount } from "vue";
import { ref } from "vue";

const route = useRoute();

const movieStore = useMovieStore();

const showGenresRequiredError = ref<boolean>(false);

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

const checkGenreError = (): void => {
  if (!movieStore.selectedGenres.length) {
    showGenresRequiredError.value = true;
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
    const selectedGenres = movieStore.selectedGenres;
    const newMovieCredentials = { ...values, genres: selectedGenres };

    if (selectedGenres.length) {
      const movieId = route.params.id;

      await updateMovie(movieId, newMovieCredentials);

      movieStore.getSingleMovie(movieId as string);

      movieStore.clearSelectedValues();

      movieStore.setShowMovieModal(false);

      resetForm();
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErrors(error.response?.data.errors);
    }
  }
};

watch(
  () => movieStore.movieEditData as Movie,
  (newValue: Movie) => {
    if (newValue) {
      const movieGenres: Genre[] = movieStore.movieEditData?.genres as Genre[];

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

onBeforeUnmount((): void => {
  movieStore.clearSelectedValues();
  movieStore.setMovieEditData(null);
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
    <div>
      <BaseMovieInputGenre placeholder="Choose genres" class="mb-2" />
      <span v-if="showGenresRequiredError" class="text-red-500"
        >This field is required.</span
      >
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
    <BaseMovieInputFile name="poster" />
    <BaseMovieButton @click="checkGenreError" label="Save Changes" />
  </LayoutsFormMovieAndQuote>
</template>
