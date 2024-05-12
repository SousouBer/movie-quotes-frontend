<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import type { ValidationSchemaAuth } from "@/plugins/typescript/types.ts";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import IconBackToLoginModal from "@/components/icons/IconBackToLoginModal.vue";

const schema: ValidationSchemaAuth = {
  password: "required|minMax:8,15|lowercase",
  password_confirmation: "required|confirmed:password",
};

const handleSubmit = (values: any) => {
  console.log(values);
};
</script>

<template>
  <LayoutsFormAuth
    heading="Create new password"
    description="Your new password must be different from 
previous used passwords."
  >
    <VeeForm @submit="handleSubmit" :validation-schema="schema">
      <BaseInputAuth
        :isPassword="true"
        label="Password"
        name="password"
        type="password"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <BaseInputAuth
        :isPassword="true"
        label="Confirm password"
        name="password_confirmation"
        type="password"
        placeholder="Confirm password"
      />
      <BaseButton label="Reset Password" class="w-full mt-6 mb-8" />
      <div class="flex items-center justify-center gap-3">
        <IconBackToLoginModal />
        <button class="text-gray-500">Back to login</button>
      </div>
    </VeeForm>
  </LayoutsFormAuth>
</template>
