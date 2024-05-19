<script setup lang="ts">
import { Form as FormProfile } from "vee-validate";
import BaseInputProfile from "@/components/base/profile/BaseInputProfile.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import ModalProfileConfirmChanges from "@/components/profile/ModalProfileConfirmChanges.vue";

import { useProfileStore } from "@/stores/useProfileStore.ts";

const profileStore = useProfileStore();
</script>

<template>
  <FormProfile>
    <div
      class="bg-gray-900 rounded-xl py-20 px-8 flex flex-col items-center justify-center"
    >
      <BaseInputProfile
        v-if="profileStore.getField === 'username'"
        class="w-full"
        :isModalInput="true"
        type="text"
        name="new_username"
        label="Enter new username"
        placeholder="Enter a new username"
      />
      <BaseInputProfile
        v-if="profileStore.getField === 'password'"
        class="w-full mb-6"
        :isModalInput="true"
        :isPassword="true"
        type="password"
        name="password"
        label="Enter new password"
        placeholder="Enter a new password"
      />
      <BaseInputProfile
        v-if="profileStore.getField === 'password'"
        class="w-full"
        :isModalInput="true"
        :isPassword="true"
        type="password"
        name="password_confirmation"
        label="Confirm password"
        placeholder="Confirm a new password"
      />
    </div>
    <div class="flex justify-between py-8 px-10">
      <button
        @click="profileStore.setField(null)"
        class="text-base text-gray-300"
      >
        Cancel
      </button>
      <BaseButton label="Edit" />
    </div>
    <!-- <ModalProfileConfirmChanges /> -->
  </FormProfile>
</template>
