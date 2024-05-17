<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import TheDashboard from "@/components/shared/TheDashboard.vue";
import BaseInputProfile from "@/components/base/profile/BaseInputProfile.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import { Form as FormProfile } from "vee-validate";
import { ref } from "vue";

type ValidationSchemaProfile = {
  username?: string;
  password?: string;
  password_confirmation?: string;
};

let showNewUsernameField = ref<boolean>(false);
let showNewPasswordsField = ref<boolean>(false);

const focusInput = (inputType: string): void => {
  switch (inputType) {
    case "newUsername":
      showNewUsernameField.value = true;
      break;
    case "newPassword":
      showNewPasswordsField.value = true;
      break;
  }
};

const resetValues = (): void => {
  showNewUsernameField.value = false;
  showNewPasswordsField.value = false;
};
</script>

<template>
  <div>
    <TheHeader />
    <div class="flex">
      <TheDashboard class="hidden sm:block" />
      <section
        class="relative bg-dark-shade-of-blue sm:bg-blueish-black h-screen flex-1 py-8"
      >
        <span class="text-2xl text-white pl-10 hidden sm:inline"
          >My profile</span
        >
        <div
          class="bg-blueish-black sm:bg-dark-shade-of-blue mt-8 sm:mt-28 pb-28 w-full h-full sm:h-auto sm:w-4/6 pt-8 sm:pt-44 flex flex-col"
        >
          <div
            class="sm:absolute sm:top-0 sm:left-1/3 sm:transform sm:translate-y-1/3 sm:-translate-x-1/2 flex items-center flex-col gap-1"
          >
            <div class="w-48 h-48 rounded-full border border-red-500 mb-2">
              <img src="" alt="" />
            </div>
            <span class="text-xl text-white">Upload new photo</span>
          </div>
          <FormProfile class="flex flex-col gap-14 px-4 sm:px-40 sm:pr-48">
            <div class="relative">
              <BaseInputProfile
                type="text"
                name="username"
                label="Username"
                placeholder="Soso Beriashvili"
              />
              <button
                @click="focusInput('newUsername')"
                type="button"
                class="hidden sm:inline absolute top-1/2 right-0 transform translate-x-14 text-xl text-gray-300"
              >
                Edit
              </button>
            </div>
            <BaseInputProfile
              v-if="showNewUsernameField"
              type="text"
              name="new_username"
              label="New username"
              placeholder="Enter a new username"
            />
            <BaseInputProfile
              :isDisabled="true"
              type="email"
              name="email"
              label="Email"
              placeholder="sosoberiashvili@gmail.com"
            />
            <div class="relative">
              <BaseInputProfile
                type="password"
                name="current_password"
                label="Password"
                placeholder="••••••••••••"
                :isPassword="true"
              />
              <button
                @click="focusInput('newPassword')"
                type="button"
                class="hidden sm:inline absolute top-1/2 right-0 transform translate-x-14 text-xl text-gray-300"
              >
                Edit
              </button>
            </div>
            <BaseInputProfile
              v-if="showNewPasswordsField"
              type="password"
              name="password"
              label="Password"
              placeholder="New password"
              :isPassword="true"
            />
            <BaseInputProfile
              v-if="showNewPasswordsField"
              type="password"
              name="password_confirmation"
              label="Confirm new password"
              placeholder="Confirm new password"
              :isPassword="true"
            />
          </FormProfile>
        </div>
        <div
          v-if="showNewPasswordsField || showNewUsernameField"
          class="hidden sm:flex justify-end gap-6 w-4/6 mt-14"
        >
          <button @click="resetValues" class="text-xl text-gray-300">
            Cancel
          </button>
          <BaseButton label="Save Changes" />
        </div>
      </section>
    </div>
  </div>
</template>
