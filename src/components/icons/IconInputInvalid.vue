<script setup lang="ts">
type Props = {
  width: string;
  height: string;
  color: string;
};

const props = withDefaults(defineProps<Props>(), {
  width: "20",
  height: "20",
  color: "#E31221",
});
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="20" fill="white" fill-opacity="0.01" />
    <g clip-path="url(#clip0_346_42614)">
      <rect
        width="18"
        height="18"
        transform="translate(1 1)"
        fill="white"
        fill-opacity="0.01"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 3.75C6.54822 3.75 3.75 6.54822 3.75 10C3.75 13.4518 6.54822 16.25 10 16.25C13.4518 16.25 16.25 13.4518 16.25 10C16.25 6.54822 13.4518 3.75 10 3.75ZM2.75 10C2.75 5.99594 5.99594 2.75 10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 14.0041 14.0041 17.25 10 17.25C5.99594 17.25 2.75 14.0041 2.75 10ZM9.33449 6.05883C9.42905 5.95752 9.56142 5.9 9.7 5.9H10.3C10.4386 5.9 10.571 5.95752 10.6655 6.05883C10.7601 6.16013 10.8083 6.29614 10.7988 6.4344L10.4988 10.7844C10.4807 11.0466 10.2628 11.25 10 11.25C9.73721 11.25 9.51927 11.0466 9.50118 10.7844L9.20118 6.4344C9.19165 6.29614 9.23992 6.16013 9.33449 6.05883ZM10.9 13.3C10.9 13.7971 10.4971 14.2 10 14.2C9.50294 14.2 9.1 13.7971 9.1 13.3C9.1 12.8029 9.50294 12.4 10 12.4C10.4971 12.4 10.9 12.8029 10.9 13.3Z"
        :fill="props.color"
      />
    </g>
    <defs>
      <clipPath id="clip0_346_42614">
        <rect width="18" height="18" fill="white" transform="translate(1 1)" />
      </clipPath>
    </defs>
  </svg>
</template>
