<script setup lang="ts">
import IconQuoteLine from "@/components/icons/IconQuoteLine.vue";

const props = defineProps<{
  imageUrl: string;
  movieQuote: string;
  movieTitle: string;
}>();
</script>

<template>
  <div
    :style="{ backgroundImage: `url(/images/${props.imageUrl})` }"
    class="relative bg-cover bg-center h-screen"
  >
    <div
      class="absolute top-0 right-0 min-h-screen w-full landing-images-blurr-overlay flex items-center pl-16 sm:pl-48"
    >
      <div class="relative flex flex-col gap-2 w-4/5 sm:w-3/5">
        <span class="text-white text-2xl sm:text-4xl font-bold leading-normal"
          >"{{ props.movieQuote }}"</span
        >
        <span class="text-gray-300 font-bold text-lg sm:text-2xl"
          >{{ props.movieTitle }}
        </span>
        <IconQuoteLine
          class="absolute top-5 sm:left-0 transform -translate-x-6 sm:-translate-x-16 -translate-y-1/2 w-4 sm:w-auto"
        />
      </div>
    </div>
  </div>
</template>
