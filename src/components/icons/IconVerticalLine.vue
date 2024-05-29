<script setup lang="ts">
type Props = {
  width: string;
  height: string;
  color: string;
};

const props = withDefaults(defineProps<Props>(), {
  width: "1",
  height: "16",
  color: "#6C757D",
});
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 1 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="0.5"
      y1="2.85805e-08"
      x2="0.499999"
      y2="26"
      :stroke="props.color"
    />
  </svg>
</template>
