<script setup lang="ts">
import IconMovie from "@/components/icons/IconMovie.vue";
import IconDropdownLocale from "@/components/icons/IconDropdownLocale.vue";
</script>

<template>
  <div
    class="bg-black rounded-[4px] flex items-center gap-4 cursor-pointer py-7 px-8"
  >
    <IconMovie />
    <span class="text-white text-2xl">Choose Movie</span>
    <IconDropdownLocale class="ml-auto" width="24" height="24" />
  </div>
</template>
