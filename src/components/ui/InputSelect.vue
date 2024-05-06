<script setup lang="ts">
import IconDropdownLocale from '@/components/icons/IconDropdownLocale.vue'
</script>

<template>
  <div class="flex items-center gap-2 relative w-14 mr-6">
    <select
      class="cursor-pointer appearance-none bg-transparent outline-none w-full text-white text-base"
      name="locales"
      id="set-locale"
    >
      <option class="bg-black border-none text-xs" value="en">Eng</option>
      <option class="bg-black border-none text-xs" value="ka">Geo</option>
    </select>
    <IconDropdownLocale
      class="pointer-events-none absolute top-0 right-0 transform translate-y-2.5 -translate-x-1/2"
    />
  </div>
</template>
