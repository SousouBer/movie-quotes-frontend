<script setup lang="ts">
import { useProfileFormStore } from "@/stores/profileFormStore";

const profileForm = useProfileFormStore();
</script>

<template>
  <div
    v-if="profileForm.backendErrors"
    class="text-start w-full pb-2 flex flex-col gap-2"
  >
    <span
      v-for="backendError in profileForm.backendErrors"
      :key="backendError"
      class="text-vivid-red text-sm"
      >{{ backendError[0] }}</span
    >
  </div>
</template>
