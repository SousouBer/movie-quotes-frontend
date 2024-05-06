<script setup lang="ts">
import { ref } from 'vue'

import IconNotification from '@/components/icons/IconNotification.vue'
import IconDropdownLocale from '@/components/icons/IconDropdownLocale.vue'

// Will change this with the real data.
const isAuthenticated = ref<boolean>(false)
</script>

<template>
  <nav class="flex items-center justify-between bg-gray-800 px-16 py-8">
    <span class="uppercase text-base text-shade-of-beige font-medium">movie quotes</span>
    <div class="flex items-center gap-4">
      <IconNotification v-if="isAuthenticated" />
      <div class="flex items-center gap-2 relative w-14 mr-6">
        <select
          class="cursor-pointer appearance-none bg-transparent outline-none w-full text-white text-base"
          name="locales"
          id="set-locale"
        >
          <option class="bg-black border-none text-xs p-0 hover:bg-red-500" value="en">Eng</option>
          <option class="bg-black border-none text-xs" value="ka">Geo</option>
        </select>
        <IconDropdownLocale
          class="pointer-events-none absolute top-0 right-0 transform translate-y-2.5 -translate-x-1/2"
        />
      </div>
      <button class="text-white bg-vivid-red px-6 py-2 rounded-md">Sign up</button>
      <button class="text-white bg-transparent px-6 py-2 rounded-md border border-white">
        Sign up
      </button>
    </div>
  </nav>
</template>
