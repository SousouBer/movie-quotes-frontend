<script setup lang="ts">
import BaseMovieInput from "@/components/base/movies/BaseMovieInput.vue";

import { Form as MovieForm } from "vee-validate";
</script>

<template>
  <MovieForm class="bg-dark-shade-of-blue w-1/2 p-8 flex flex-col gap-6">
    <BaseMovieInput type="text" name="name.en" label="Movie Name" locale="en" />
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
  </MovieForm>
</template>
