<script setup lang="ts">
import { Form as FormProfile } from "vee-validate";
import BaseInputProfile from "@/components/base/profile/BaseInputProfile.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import type { SchemaProfile } from "@/plugins/typescript/types";

import ModalProfileConfirmChanges from "@/components/profile/ModalProfileConfirmChanges.vue";
import FormProfileErrorsBackend from "@/components/profile/FormProfileErrorsBackend.vue";

import { useProfileStore } from "@/stores/useProfileStore";
import { useProfileFormStore } from "@/stores/profileFormStore";

const profileStore = useProfileStore();
const profileForm = useProfileFormStore();

const schema: SchemaProfile = {
  username: "minMax:3,15|lowercase",
  password: "minMax:8,15",
  password_confirmation: "confirmed:password",
};

const cancelEditting = (): void => {
  profileStore.setMobileField(null);
  profileForm.setFormSubmissionProcess(false);
  profileForm.resetFormValues();
  profileForm.setBackendErrors(null);
};

const displayConfirmationModal = (): void => {
  profileStore.setShowConfirmationModal(true);
};
</script>

<template>
  <FormProfile v-slot="{ errors }" :validation-schema="schema">
    <div
      v-if="!profileStore.showConfirmationModal"
      class="bg-gray-900 rounded-xl py-20 px-8 flex flex-col items-center justify-center"
    >
      <!-- Backend errors get displayed here. -->
      <FormProfileErrorsBackend class="sm:hidden" />
      <BaseInputProfile
        v-if="profileStore.getMobileField === 'username'"
        class="w-full"
        :isModalInput="true"
        type="text"
        name="username"
        :label="$t('profile.enter_new_username')"
        :placeholder="$t('profile.enter_new_username')"
      />
      <BaseInputProfile
        v-if="profileStore.getMobileField === 'password'"
        class="w-full mb-6"
        :isModalInput="true"
        :isPassword="true"
        type="password"
        name="password"
        :label="$t('profile.enter_new_password')"
        :placeholder="$t('profile.enter_new_password')"
      />
      <BaseInputProfile
        v-if="profileStore.getMobileField === 'password'"
        class="w-full"
        :isModalInput="true"
        :isPassword="true"
        type="password"
        name="password_confirmation"
        :label="$t('profile.password_confirmation')"
        :placeholder="$t('profile.password_confirmation')"
      />
    </div>
    <div
      v-if="!profileStore.showConfirmationModal"
      class="flex justify-between py-8 px-10"
    >
      <button @click="cancelEditting" class="text-base text-gray-300">
        {{ $t("profile.cancel") }}
      </button>
      <BaseButton
        :disabled="
          errors['username'] ||
          errors['password'] ||
          errors['password_confirmation']
        "
        type="button"
        @click="displayConfirmationModal"
        :label="$t('profile.edit')"
      />
    </div>

    <ModalProfileConfirmChanges v-if="profileStore.showConfirmationModal" />
  </FormProfile>
</template>
