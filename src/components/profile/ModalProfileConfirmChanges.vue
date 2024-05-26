<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
import { useProfileFormStore } from "@/stores/profileFormStore";
import { useProfileStore } from "@/stores/useProfileStore";

const profileStore = useProfileStore();
const profileForm = useProfileFormStore();

const cancelFormSubmission = (): void => {
  profileForm.resetFormValues();
  profileStore.setMobileField(null);
  profileStore.setShowConfirmationModal(false);
  profileForm.setFormSubmissionProcess(false);
};

const handleSubmit = (): void => {
  profileForm.handleFormSubmit();
  profileStore.setShowConfirmationModal(false);
  profileStore.setMobileField(null);
  profileForm.setFormSubmissionProcess(false);
};
</script>

<template>
  <div class="text-center pt-[4.5rem] mx-10 rounded-[10px]">
    <span class="text-base text-white">Are you sure to make changes ?</span>
    <div class="border-t border-gray-300 mt-12">
      <div class="flex justify-between py-4 px-4">
        <button @click="cancelFormSubmission" class="text-base text-gray-300">
          Cancel
        </button>
        <BaseButton @click="handleSubmit" class="!px-2" label="Confirm" />
      </div>
    </div>
  </div>
</template>
