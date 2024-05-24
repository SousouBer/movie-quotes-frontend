<script setup lang="ts">
import { Form as FormProfile } from "vee-validate";
import BaseInputProfile from "@/components/base/profile/BaseInputProfile.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import type { SchemaProfile } from "@/plugins/typescript/types";

import ModalProfileConfirmChanges from "@/components/profile/ModalProfileConfirmChanges.vue";

import { useProfileStore } from "@/stores/useProfileStore";
import { useProfileFormStore } from "@/stores/profileFormStore";

const profileStore = useProfileStore();
const profileForm = useProfileFormStore();

const schema: SchemaProfile = {
  username: "minMax:3,15",
  password: "minMax:8,15",
  password_confirmation: "confirmed:password",
};

const cancelEditting = (): void => {
  profileStore.setMobileField(null);
  profileForm.setFormSubmissionProcess(false);
};

const displayConfirmationModal = (): void => {
  profileStore.setShowConfirmationModal(true);
};
</script>

<template>
  <FormProfile :schema-validation="schema">
    <div
      v-if="!profileStore.showConfirmationModal"
      class="bg-gray-900 rounded-xl py-20 px-8 flex flex-col items-center justify-center"
    >
      <BaseInputProfile
        v-if="profileStore.getMobileField === 'username'"
        class="w-full"
        :isModalInput="true"
        type="text"
        name="username"
        label="Enter new username"
        placeholder="Enter a new username"
      />
      <BaseInputProfile
        v-if="profileStore.getMobileField === 'password'"
        class="w-full mb-6"
        :isModalInput="true"
        :isPassword="true"
        type="password"
        name="password"
        label="Enter new password"
        placeholder="Enter a new password"
      />
      <BaseInputProfile
        v-if="profileStore.getMobileField === 'password'"
        class="w-full"
        :isModalInput="true"
        :isPassword="true"
        type="password"
        name="password_confirmation"
        label="Confirm password"
        placeholder="Confirm a new password"
      />
    </div>
    <div
      v-if="!profileStore.showConfirmationModal"
      class="flex justify-between py-8 px-10"
    >
      <button @click="cancelEditting" class="text-base text-gray-300">
        Cancel
      </button>
      <BaseButton
        type="button"
        @click="displayConfirmationModal"
        label="Edit"
      />
    </div>

    <ModalProfileConfirmChanges v-if="profileStore.showConfirmationModal" />
  </FormProfile>
</template>
