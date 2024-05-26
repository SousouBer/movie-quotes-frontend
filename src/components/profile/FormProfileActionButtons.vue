<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";

import { useProfileStore } from "@/stores/useProfileStore";
import { useProfileFormStore } from "@/stores/profileFormStore";

const profileStore = useProfileStore();
const profileForm = useProfileFormStore();

const resetValues = (): void => {
  profileStore.resetDesktopInputs();
  profileForm.resetFormValues();
};

const submitFormAndResetValues = (): void => {
  profileForm.handleFormSubmit();
  resetValues();

  profileForm.resetFormValues();
};
</script>

<template>
  <div class="hidden sm:flex justify-end gap-6 w-4/6 mt-14">
    <button @click="resetValues" class="text-xl text-gray-300">Cancel</button>
    <BaseButton @click="profileForm.handleFormSubmit" label="Save Changes" />
  </div>
</template>
