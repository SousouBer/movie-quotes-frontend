<script setup lang="ts">
import { ref } from "vue";

import { useAuthModalStore } from "@/stores/useAuthModalStore.ts";

import IconNotification from "@/components/icons/IconNotification.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInputSelect from "@/components/base/BaseInputSelect.vue";

// Will change this with the real data.
const isAuthenticated = ref<boolean>(false);

const store = useAuthModalStore();
</script>

<template>
  <nav
    class="relative flex items-center justify-between bg-dark-shade-of-blue py-4 px-4 sm:px-16 sm:py-8"
  >
    <span
      class="uppercase text-base text-shade-of-beige font-medium whitespace-nowrap"
      >movie quotes</span
    >
    <div class="flex items-center gap-4">
      <IconNotification v-if="isAuthenticated" />
      <BaseInputSelect class="hidden sm:block" />
      <BaseButton @click="store.setModalType('register')" label="Sign up" />
      <BaseButton
        @click="store.setModalType('login')"
        label="Log in"
        :hasBorder="true"
      />
    </div>
  </nav>
</template>
