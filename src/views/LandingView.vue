<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import ButtonBase from "@/components/ui/ButtonBase.vue";
import LayoutsLandingMovie from "@/components/layouts/LayoutsLandingMovie.vue";
</script>

<template>
  <TheHeader />
  <div class="bg-dark-shade-of-blue flex flex-col items-center py-32">
    <h1
      class="text-2xl sm:text-5xl font-black text-shade-of-beige h-5/6 text-center mb-6 sm:mb-4 sm:leading-normal"
    >
      Find any quotes in <br />millions of movie lines
    </h1>
    <ButtonBase label="Get started" />
  </div>
  <div>
    <LayoutsLandingMovie
      imageUrl="movie-image.svg"
      movieQuote="I think we’re just gonna have to be secretly in love with each
            other and leave it that"
      movieTitle="The Royal Tenenbaums, 2001"
    />
  </div>
</template>
