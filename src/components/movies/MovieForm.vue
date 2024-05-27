<script setup lang="ts">
import BaseMovieInput from "@/components/base/movies/BaseMovieInput.vue";
import BaseMoviesButton from "@/components/base/movies/BaseMoviesButton.vue";

import { Form as MovieForm } from "vee-validate";
</script>

<template>
  <div class="bg-dark-shade-of-blue w-full sm:w-1/2 py-8">
    <div
      class="flex items-center justify-center pt-2 pb-8 border-b border-gray-300"
    >
      <span class="text-white font-medium text-xl sm:text-2xl">Add Movie</span>
      <!-- X icon will go here. -->
    </div>
    <MovieForm class="flex flex-col gap-6 px-8">
      <BaseMovieInput
        type="text"
        name="name.en"
        label="Movie Name"
        locale="en"
      />
      <BaseMovieInput
        type="text"
        name="name.ka"
        label="ფილმის სახელი"
        locale="ka"
      />
      <BaseMovieInput type="date" name="year" label="წელი/year" />
      <BaseMovieInput
        type="text"
        name="director.en"
        label="Director"
        locale="en"
      />
      <BaseMovieInput
        type="text"
        name="director.ka"
        label="რეჟისორი"
        locale="ka"
      />
      <BaseMovieInput
        :isTextarea="true"
        type="textarea"
        name="description.en"
        label="Movie Description"
        locale="en"
      />
      <BaseMovieInput
        :isTextarea="true"
        type="textarea"
        name="description.ka"
        label="ფილმის აღწერა"
        locale="ka"
      />
      <BaseMoviesButton label="Add Now" />
    </MovieForm>
  </div>
</template>
