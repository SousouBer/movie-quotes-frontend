<script setup lang="ts">
import IconGoogle from "@/components/icons/IconGoogle.vue";

type Props = {
  hasBorder?: boolean;
  label: string;
  isGoogleButton: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  hasBorder: false,
  label: "",
  isGoogleButton: false,
});
</script>

<template>
  <button
    :class="{
      'bg-vivid-red': !props.hasBorder,
      'bg-transparent border border-white': props.hasBorder,
    }"
    class="text-white px-6 py-2 rounded-md whitespace-nowrap flex items-center justify-center gap-3"
  >
    <IconGoogle v-if="props.isGoogleButton" />
    {{ label }}
  </button>
</template>
