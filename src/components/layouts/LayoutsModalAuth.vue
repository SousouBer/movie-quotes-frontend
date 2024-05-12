<script setup lang="ts"></script>

<template>
  <div
    class="absolute top-0 left-0 bg-black bg-opacity-75 backdrop-blur-sm h-screen w-screen"
  >
    <div
      class="bg-blueish-black flex flex-col justify-center rounded-xl px-28 py-12 w-2/5"
    >
      <slot />
    </div>
  </div>
</template>
