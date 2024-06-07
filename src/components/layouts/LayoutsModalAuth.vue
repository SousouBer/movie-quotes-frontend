<script setup lang="ts"></script>

<template>
  <div
    class="absolute top-0 left-0 bg-black bg-opacity-75 backdrop-blur-sm h-screen w-screen"
  >
    <div
      class="bg-blueish-black flex flex-col sm:justify-center rounded-xl px-7 sm:px-28 pt-28 sm:py-16 w-full h-full sm:h-auto sm:w-[31%]"
    >
      <slot />
    </div>
  </div>
</template>
