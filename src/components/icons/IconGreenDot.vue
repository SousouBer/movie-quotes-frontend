<script setup lang="ts">
type Props = {
  width: string;
  height: string;
  color: string;
};

const props = withDefaults(defineProps<Props>(), {
  width: "4",
  height: "5",
  color: "#198754",
});
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 4 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="2" cy="2.5" r="2" :fill="props.color" />
  </svg>
</template>
