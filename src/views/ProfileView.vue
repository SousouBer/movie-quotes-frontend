<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import TheDashboard from "@/components/shared/TheDashboard.vue";
import BaseInputProfile from "@/components/base/profile/BaseInputProfile.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseButtonProfileEdit from "@/components/base/profile/BaseButtonProfileEdit.vue";
import ModalProfileFieldEdit from "@/components/profile/ModalProfileFieldEdit.vue";

import { Form as FormProfile } from "vee-validate";
import { ref } from "vue";

import { useProfileStore } from "@/stores/useProfileStore.ts";

const profileStore = useProfileStore();

// Move this to types file in future branch.
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
          class="bg-blueish-black sm:bg-dark-shade-of-blue mt-8 sm:mt-28 pb-28 w-full sm:h-auto sm:w-4/6 sm:pt-44 flex flex-col"
        >
          <ModalProfileFieldEdit
            class="sm:hidden"
            v-if="profileStore.getField"
          />
          <div
            v-if="!profileStore.getField"
            class="sm:absolute sm:top-0 sm:left-1/3 sm:transform sm:translate-y-1/3 sm:-translate-x-1/2 flex items-center flex-col mt-8 gap-1"
          >
            <div class="w-48 h-48 rounded-full border border-red-500 mb-2">
              <img src="" alt="" />
            </div>
            <span class="text-xl text-white">Upload new photo</span>
          </div>
          <FormProfile
            v-if="!profileStore.getField"
            class="flex flex-col gap-14 px-8 sm:px-40 sm:pr-48 mt-16 sm:mt-0"
          >
            <div
              class="relative flex items-center justify-center border-b border-gray-300 sm:border-0"
            >
              <BaseInputProfile
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
                @click="focusInput('newUsername')"
              />
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
                class="flex-1"
                type="password"
                name="current_password"
                label="Password"
                placeholder="••••••••••"
                :isPassword="true"
              />
              <BaseButtonProfileEdit
                class="sm:hidden"
                :isMobileButton="true"
                @click="profileStore.setField('password')"
              />
              <BaseButtonProfileEdit
                class="hidden sm:inline"
                @click="focusInput('newPassword')"
              />
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
