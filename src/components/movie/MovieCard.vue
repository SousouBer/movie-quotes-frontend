<script setup lang="ts">
import IconQuote from "@/components/icons/IconQuote.vue";

const props = defineProps<{
  poster: string;
  title: string;
  year: string;
  quotesCount: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-4 w-[27.5rem]">
    <div class="h-96 overflow-hidden rounded-xl">
      <img class="w-full h-full" :src="props.poster" :alt="`${title} poster`" />
    </div>
    <span class="uppercase text-white font-medium text-2xl"
      >{{ title }} ({{ props.year }})</span
    >
    <div class="flex items-center gap-3">
      <span class="text-white text-xl font-medium">{{
        props.quotesCount
      }}</span>
      <IconQuote />
    </div>
  </div>
</template>
