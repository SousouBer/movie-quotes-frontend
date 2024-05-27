<script setup lang="ts">
import BaseMovieInput from "@/components/base/movies/BaseMovieInput.vue";

import { Form as MovieForm } from "vee-validate";
</script>

<template>
  <MovieForm class="bg-dark-shade-of-blue w-1/2 p-8">
    <BaseMovieInput name="name.en" label="Movie Name" locale="en" />
    <BaseMovieInput name="name.ka" label="ფილმის სახელი" locale="ka" />
  </MovieForm>
</template>
