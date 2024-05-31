<script setup lang="ts">
import { Form as FormProfile } from "vee-validate";

import BaseInputProfile from "@/components/base/profile/BaseInputProfile.vue";
import BaseButtonProfileEdit from "@/components/base/profile/BaseButtonProfileEdit.vue";
import ProfileErrorsBackend from "@/components/profile/ProfileErrorsBackend.vue";

import { useProfileStore } from "@/stores/useProfileStore";
import { useUserStore } from "@/stores/userStore";
import { useProfileFormStore } from "@/stores/profileFormStore";

import type { SchemaProfile } from "@/plugins/typescript/types";
import type { ProfileInputField } from "@/plugins/typescript/types";

const userStore = useUserStore();
const profileStore = useProfileStore();
const profileForm = useProfileFormStore();

const schema: SchemaProfile = {
  username: "minMax:3,15",
  password: "minMax:8,15",
  password_confirmation: "confirmed:password",
};

const toggleMobileFields = (field: ProfileInputField): void => {
  profileStore.setMobileField(field);
  profileForm.setFormSubmissionProcess(true);
};
</script>

<template>
  <FormProfile
    class="flex flex-col gap-14 px-8 sm:px-40 sm:pr-48 mt-16 sm:mt-0"
    :validation-schema="schema"
  >
    <ProfileErrorsBackend />
    <div
      class="relative flex items-center justify-center border-b border-gray-300 sm:border-0"
    >
      <BaseInputProfile
        :isDisabled="true"
        class="flex-1"
        type="text"
        name="current_username"
        :label="$t('profile.username')"
        :placeholder="userStore.getUser?.username ?? ''"
      />
      <BaseButtonProfileEdit
        class="sm:hidden"
        :isMobileButton="true"
        @click="toggleMobileFields('username')"
      />
      <BaseButtonProfileEdit
        class="hidden sm:inline"
        @click="profileStore.toggleDesktopFields('newUsername')"
      />
    </div>
    <BaseInputProfile
      v-if="profileStore.showDesktopNewUsernameField"
      class="hidden sm:block"
      type="text"
      name="username"
      :label="$t('profile.new_username')"
      :placeholder="$t('profile.enter_new_username')"
    />
    <BaseInputProfile
      :isDisabled="true"
      class="border-b border-gray-300 sm:border-none"
      type="email"
      name="email"
      :label="$t('profile.email')"
      :placeholder="userStore.getUser?.email ?? ''"
    />
    <div
      v-if="!userStore.getUser?.is_google_account"
      class="relative flex items-center justify-center border-b border-gray-300 sm:border-0"
    >
      <BaseInputProfile
        :isDisabled="true"
        class="flex-1"
        type="password"
        name="current_password"
        :label="$t('profile.password')"
        placeholder="••••••••••"
      />
      <BaseButtonProfileEdit
        class="sm:hidden"
        :isMobileButton="true"
        @click="toggleMobileFields('password')"
      />
      <BaseButtonProfileEdit
        class="hidden sm:inline"
        @click="profileStore.toggleDesktopFields('newPassword')"
      />
    </div>
    <BaseInputProfile
      v-if="
        profileStore.showDesktopNewPasswordsField &&
        !userStore.getUser?.is_google_account
      "
      class="hidden sm:block"
      type="password"
      name="password"
      :label="$t('profile.new_password')"
      :placeholder="$t('profile.new_password')"
      :isPassword="true"
    />
    <FormProfileValidations />
    <BaseInputProfile
      v-if="
        profileStore.showDesktopNewPasswordsField &&
        !userStore.getUser?.is_google_account
      "
      class="hidden sm:block"
      type="password"
      name="password_confirmation"
      :label="$t('profile.password_confirmation')"
      :placeholder="$t('profile.password_confirmation')"
      :isPassword="true"
    />
  </FormProfile>
</template>
