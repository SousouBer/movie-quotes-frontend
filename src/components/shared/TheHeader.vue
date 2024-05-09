<script setup lang="ts">
import { ref } from "vue";

import IconNotification from "@/components/icons/IconNotification.vue";
import ButtonBase from "@/components/ui/ButtonBase.vue";
import InputSelect from "@/components/ui/InputSelect.vue";

// Will change this with the real data.
const isAuthenticated = ref<boolean>(false);
</script>

<template>
  <nav
    class="flex items-center justify-between bg-dark-shade-of-blue py-4 px-4 sm:px-16 sm:py-8"
  >
    <span
      class="uppercase text-base text-shade-of-beige font-medium whitespace-nowrap"
      >movie quotes</span
    >
    <div class="flex items-center gap-4">
      <IconNotification v-if="isAuthenticated" />
      <InputSelect class="hidden sm:block" />
      <ButtonBase label="Sign up" />
      <ButtonBase label="Log in" :hasBorder="true" />
    </div>
  </nav>
</template>
