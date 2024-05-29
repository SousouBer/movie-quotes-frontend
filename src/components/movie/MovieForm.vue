<script setup lang="ts">
import BaseMovieInput from "@/components/base/movie/BaseMovieInput.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";
import BaseMovieInputFile from "@/components/base/movie/BaseMovieInputFile.vue";

import IconModalCancel from "@/components/icons/IconModalCancel.vue";

import { Form as MovieForm } from "vee-validate";
</script>

<template>
  <div class="bg-dark-shade-of-blue w-full sm:w-1/2 py-8">
    <div
      class="flex items-center justify-between pt-2 pb-8 px-8 border-b border-[#EFEFEF33]"
    >
      <span
        class="flex-grow text-center text-white font-medium text-xl sm:text-2xl"
        >Add Movie</span
      >
      <IconModalCancel class="cursor-pointer ml-auto" />
    </div>

    <MovieForm class="flex flex-col gap-6 px-8">
      <div class="flex items-center gap-3 mt-8 mb-2">
        <div class="w-10 h-10 rounded-full border border-red-500">
          <img class="h-full w-full" src="" alt="" />
        </div>
        <span class="text-white text-xl">Nino Tabagari</span>
      </div>
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
      <BaseMovieInput type="date" name="year" label="წელი/year" />
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
    </MovieForm>
  </div>
</template>
