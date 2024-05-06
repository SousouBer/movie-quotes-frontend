<script setup lang="ts">
import { ref } from 'vue'

import IconNotification from '@/components/icons/IconNotification.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import InputSelect from '@/components/ui/InputSelect.vue'

// Will change this with the real data.
const isAuthenticated = ref<boolean>(false)
</script>

<template>
  <nav class="flex items-center justify-between bg-gray-800 px-16 py-8">
    <span class="uppercase text-base text-shade-of-beige font-medium">movie quotes</span>
    <div class="flex items-center gap-4">
      <IconNotification v-if="isAuthenticated" />
      <InputSelect />
      <BaseButton label="Sign up" />
      <BaseButton label="Log in" :hasBorder="true" />
    </div>
  </nav>
</template>
