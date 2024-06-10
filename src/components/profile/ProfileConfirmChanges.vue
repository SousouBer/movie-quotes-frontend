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
  <div
    style="
      background: linear-gradient(
        -90deg,
        rgba(239, 239, 239, 0.1) -1.81%,
        rgba(239, 239, 239, 0.00514528) 102.5%,
        rgba(1, 1, 1, 0.00260417) 102.51%,
        rgba(239, 239, 239, 0.05) 102.52%
      );
    "
    class="z-50 relative text-center pt-[4.5rem] mx-10 rounded-[10px]"
  >
    <span class="text-base text-white">{{
      $t("profile.question_confirm_changes")
    }}</span>
    <div class="border-t border-gray-300 mt-12">
      <div class="flex justify-between py-4 px-4">
        <button @click="cancelFormSubmission" class="text-base text-gray-300">
          {{ $t("profile.cancel") }}
        </button>
        <BaseButton
          @click="handleSubmit"
          class="!px-2"
          :label="$t('profile.confirm')"
        />
      </div>
    </div>
    <Teleport to="body">
      <div
        class="absolute top-0 left-0 w-full h-full bg-[#181623] bg-opacity-70 z-40"
      ></div>
    </Teleport>
  </div>
</template>
