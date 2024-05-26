<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  isMobileButton?: boolean;
}>();

const dynamicClasses = computed((): string => {
  return props.isMobileButton
    ? "pt-6"
    : "absolute top-1/2 right-0 transform translate-x-14";
});
</script>

<template>
  <button
    type="button"
    class="text-lg sm:text-xl text-gray-300"
    :class="dynamicClasses"
  >
    {{ $t("profile.edit") }}
  </button>
</template>
