<script setup lang="ts"></script>

<template>
  <div
    class="fixed overflow-y-scroll bg-black bg-opacity-75 backdrop-blur-sm h-screen w-screen"
  >
    <div
      class="bg-blueish-black flex flex-col sm:justify-center sm:rounded-xl px-7 sm:px-28 pt-28 sm:py-16 w-full sm:h-auto sm:w-[31%]"
    >
      <slot />
    </div>
  </div>
</template>
