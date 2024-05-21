<script setup lang="ts">
import { Form as FormProfile } from "vee-validate";

import BaseInputProfile from "@/components/base/profile/BaseInputProfile.vue";
import BaseButtonProfileEdit from "@/components/base/profile/BaseButtonProfileEdit.vue";

import { ref } from "vue";

import { useProfileStore } from "@/stores/useProfileStore.ts";

const profileStore = useProfileStore();
</script>

<template>
  <FormProfile
    class="flex flex-col gap-14 px-8 sm:px-40 sm:pr-48 mt-16 sm:mt-0"
  >
    <div
      class="relative flex items-center justify-center border-b border-gray-300 sm:border-0"
    >
      <BaseInputProfile
        :isDisabled="true"
        class="flex-1"
        type="text"
        name="username"
        label="Username"
        placeholder="Soso Beriashvili"
      />
      <BaseButtonProfileEdit
        class="sm:hidden"
        :isMobileButton="true"
        @click="profileStore.setField('username')"
      />
      <BaseButtonProfileEdit
        class="hidden sm:inline"
        @click="profileStore.focusInput('newUsername')"
      />
    </div>
    <BaseInputProfile
      v-if="profileStore.showNewUsernameField"
      class="hidden sm:block"
      type="text"
      name="new_username"
      label="New username"
      placeholder="Enter a new username"
    />
    <BaseInputProfile
      :isDisabled="true"
      class="border-b border-gray-300"
      type="email"
      name="email"
      label="Email"
      placeholder="sosoberiashvili@gmail.com"
    />
    <div
      class="relative flex items-center justify-center border-b border-gray-300 sm:border-0"
    >
      <BaseInputProfile
        :isDisabled="true"
        class="flex-1"
        type="password"
        name="current_password"
        label="Password"
        placeholder="••••••••••"
      />
      <BaseButtonProfileEdit
        class="sm:hidden"
        :isMobileButton="true"
        @click="profileStore.setField('password')"
      />
      <BaseButtonProfileEdit
        class="hidden sm:inline"
        @click="profileStore.focusInput('newPassword')"
      />
    </div>
    <BaseInputProfile
      v-if="profileStore.showNewPasswordsField"
      class="hidden sm:block"
      type="password"
      name="password"
      label="Password"
      placeholder="New password"
      :isPassword="true"
    />
    <BaseInputProfile
      v-if="profileStore.showNewPasswordsField"
      class="hidden sm:block"
      type="password"
      name="password_confirmation"
      label="Confirm new password"
      placeholder="Confirm new password"
      :isPassword="true"
    />
  </FormProfile>
</template>
