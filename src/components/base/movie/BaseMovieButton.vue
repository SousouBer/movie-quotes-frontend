<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <button
    class="flex items-center justify-center gap-3 text-base sm:text-xl bg-bright-red text-white rounded-[4.8px] py-[9px] px-[17px] transition-colors duration-200 hover:bg-red-500 whitespace-nowrap"
  >
    <slot />
    {{ props.label }}
  </button>
</template>
