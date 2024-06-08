<script setup lang="ts">
import { useProfileFormStore } from "@/stores/profileFormStore";
import { useProfileStore } from "@/stores/useProfileStore";

import { computed } from "vue";

const profileStore = useProfileStore();
const profileForm = useProfileFormStore();

// Get backend errors from the store for whichever field's errors are currently present.
// const backendValidationErrors = computed(() => {
//   if (profileStore.mobileField) {
//     return profileForm.backendErrors?.[profileStore.mobileField];
//   }
//   return false;
// });
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
