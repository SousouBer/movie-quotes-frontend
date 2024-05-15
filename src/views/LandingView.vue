<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import LayoutsLandingMovie from "@/components/layouts/LayoutsLandingMovie.vue";
</script>

<template>
  <TheHeader />
  <div class="bg-dark-shade-of-blue flex flex-col items-center py-32">
    <h1
      class="font-montserrat text-2xl sm:text-5xl font-bold text-shade-of-beige h-5/6 text-center mb-6 sm:mb-4 sm:leading-normal"
    >
      Find any quotes in <br />millions of movie lines
    </h1>
    <BaseButton label="Get started" />
  </div>
  <div>
    <LayoutsLandingMovie
      imageUrl="movie-image-interstelar.svg"
      movieQuote="You have to leave somethig 
behind to go forward"
      movieTitle="Interstellar, 2014"
    />
    <LayoutsLandingMovie
      imageUrl="movie-image.svg"
      movieQuote="I think we’re just gonna have to be secretly in love with each
            other and leave it that"
      movieTitle="The Royal Tenenbaums, 2001"
    />
    <LayoutsLandingMovie
      imageUrl="movie-image-lotr.svg"
      movieQuote="I see in your eyes the same
fear that would take the 
heart of me...."
      movieTitle="The Lord of the Rings, 2003"
    />
  </div>
</template>
