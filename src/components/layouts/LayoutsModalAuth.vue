<script setup lang="ts"></script>

<template>
  <div
    class="fixed shadow-gradient sm:before:hidden inset-0 overflow-y-scroll bg-blueish-black sm:bg-black sm:bg-opacity-75 backdrop-blur-sm w-screen"
  >
    <div
      class="bg-blueish-black flex flex-col sm:justify-center sm:rounded-xl px-8 sm:px-28 pt-20 sm:py-16 h-auto w-full sm:w-[31%] shadow-md"
    >
      <slot />
    </div>
  </div>
</template>
