<script setup lang="ts">
type Props = {
  width: string;
  height: string;
  color: string;
};

const props = withDefaults(defineProps<Props>(), {
  width: "53",
  height: "2",
  color: "white",
});
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 53 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="-8.74228e-08"
      y1="1"
      x2="53"
      y2="0.999995"
      :stroke="props.color"
      stroke-width="2"
    />
  </svg>
</template>
