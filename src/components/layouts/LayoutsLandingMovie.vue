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
    :style="{ '--background-url': `url(/images/${props.imageUrl})` }"
    class="relative landing-images-overlay bg-cover bg-fixed bg-center min-h-screen w-full flex items-center pl-16 sm:pl-48"
  >
    <div class="relative flex flex-col gap-2 w-4/5 sm:w-3/5">
      <span
        class="text-white text-2xl sm:text-4xl font-bold sm:leading-relaxed leading-relaxed"
        >"{{ props.movieQuote }}"</span
      >
      <span class="text-gray-300 font-bold text-lg sm:text-2xl"
        >{{ props.movieTitle }}
      </span>
      <IconQuoteLine
        class="absolute top-5 sm:top-7 sm:left-0 transform -translate-x-6 sm:-translate-x-16 -translate-y-1/2 w-4 sm:w-auto"
      />
    </div>
  </div>
</template>
