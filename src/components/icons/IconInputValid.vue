<script setup lang="ts">
type Props = {
  width: string;
  height: string;
  color: string;
};

const props = withDefaults(defineProps<Props>(), {
  width: "18",
  height: "18",
  color: "#198754",
});
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.17405 15.1421L1.34905 10.1921C0.449053 7.85212 2.38405 7.04212 3.82405 8.39212L6.29905 11.5421L13.9491 2.99212C15.2991 1.57462 17.5491 2.38461 16.6491 4.56712L7.64905 14.9171C6.68155 16.0421 5.84905 15.8171 5.17405 15.1421Z"
      :fill="props.color"
    />
  </svg>
</template>
