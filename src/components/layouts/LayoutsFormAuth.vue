<script setup lang="ts">
const props = defineProps<{
  heading: string;
  description: string;
}>();
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col items-center gap-2 mb-4">
      <span class="font-medium text-3xl text-white whitespace-nowrap">{{
        props.heading
      }}</span>
      <span class="text-base text-shade-of-gray font-normal">{{
        props.description
      }}</span>
    </div>
    <slot />
  </div>
</template>
