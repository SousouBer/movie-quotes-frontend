<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseButtonMovies from "@/components/base/movies/BaseButtonMovies.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";
</script>

<template>
  <TheHeader />
  <section class="bg-custom-gradient h-screen w-full">
    <div>
      <BaseButtonMovies label="Add Movie">
        <IconMovieAdd />
      </BaseButtonMovies>
    </div>
  </section>
</template>
