<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import ButtonBase from "@/components/ui/ButtonBase.vue";
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
    <div
      class="relative bg-[url('@/assets/images/movie-image.svg')] bg-cover h-full min-h-screen"
    >
      <div
        class="absolute top-0 right-0 z-10 min-h-screen w-full landing-images-blurr-overlay"
      ></div>
    </div>
  </div>
</template>
