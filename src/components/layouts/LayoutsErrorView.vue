<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";

import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  imageUrl: string;
  imageAlt: string;
  heading: string;
  description: string;
}>();

const returnHome = (): void => {
  router.push({ name: "landing" });
};
</script>

<template>
  <div
    class="flex items-center justify-center bg-dark-shade-of-blue min-h-screen px-8 text-center"
  >
    <div class="flex items-center gap-3 sm:gap-8 flex-col">
      <div class="relative z-50">
        <img class="z-50" :src="props.imageUrl" :alt="props.imageAlt" />
      </div>
      <span class="text-white font-bold text-2xl sm:text-5xl">{{
        props.heading
      }}</span>
      <span class="text-white font-medium text-base sm:text-2xl">{{
        props.description
      }}</span>
      <BaseButton
        @click="returnHome"
        class="text-base sm:text-xl mt-6"
        label="Return Home"
      />
    </div>
  </div>
</template>
