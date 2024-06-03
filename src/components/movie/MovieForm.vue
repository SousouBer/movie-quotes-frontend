<script setup lang="ts">
import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseMovieInputFile from "@/components/base/movie/BaseMovieInputFile.vue";
import BaseMovieInputGenre from "@/components/base/movie/BaseMovieInputGenre.vue";
import LayoutsFormMovieAndQuote from "@/components/layouts/LayoutsFormMovieAndQuote.vue";
</script>

<template>
  <LayoutsFormMovieAndQuote heading="Add Movie">
    <BaseMovieInput
      type="text"
      name="name.en"
      label="Movie Name"
      locale="Eng"
    />
    <BaseMovieInput
      type="text"
      name="name.ka"
      label="ფილმის სახელი"
      locale="ქარ"
    />
    <BaseMovieInputGenre placeholder="Choose genres" />
    <BaseMovieInput type="text" name="year" label="წელი/year" />
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
    <BaseMovieButton label="Add Now" />
  </LayoutsFormMovieAndQuote>
</template>
