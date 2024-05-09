<script setup lang="ts">
type Props = {
  hasBorder?: boolean;
  label: string;
};

const props = withDefaults(defineProps<Props>(), {
  hasBorder: false,
  label: "",
});
</script>

<template>
  <button
    :class="{
      'bg-vivid-red': !props.hasBorder,
      'bg-transparent border border-white': props.hasBorder,
    }"
    class="text-white px-6 py-2 rounded-md whitespace-nowrap"
  >
    {{ label }}
  </button>
</template>
