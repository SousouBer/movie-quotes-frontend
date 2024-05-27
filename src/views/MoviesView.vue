<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseButtonMovies from "@/components/base/movies/BaseButtonMovies.vue";
import BaseInputSearchMovies from "@/components/base/movies/BaseInputSearchMovies.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";
</script>

<template>
  <TheHeader />
  <section class="bg-custom-gradient h-screen w-full">
    <div class="flex items-center justify-between">
      <span
        class="font-medium text-2xl text-white flex flex-col gap-y-2 sm:inline"
        >My list of movies
        <span class="font-medium text-base sm:text-2xl text-white"
          >(Total 25)</span
        >
      </span>
      <div class="flex items-center">
        <BaseInputSearchMovies name="search" placeholder="Search" />
        <BaseButtonMovies label="Add Movie">
          <IconMovieAdd />
        </BaseButtonMovies>
      </div>
    </div>
  </section>
</template>
