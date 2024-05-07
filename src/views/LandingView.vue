<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import ButtonBase from "@/components/ui/ButtonBase.vue";
</script>

<template>
  <TheHeader />
  <div class="bg-dark-shade-of-blue flex flex-col items-center py-32">
    <h1
      class="text-2xl sm:text-5xl leading-normal font-black text-shade-of-beige h-5/6 text-center mb-6 sm:mb-4"
    >
      Find any quotes in <br />millions of movie lines
    </h1>
    <ButtonBase label="Get started" />
  </div>
</template>
