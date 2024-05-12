<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import IconBackToLoginModal from "@/components/icons/IconBackToLoginModal.vue";

type ValidationSchemaAuth = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  remember?: string;
};

const schema: ValidationSchemaAuth = {
  email: "required|email",
};

const handleSubmit = (values: any) => {
  console.log(values);
};
</script>

<template>
  <LayoutsFormAuth
    heading="Forgot Password?"
    description="Enter the email and we’ll send an email with
instructions to reset your password."
  >
    <VeeForm @submit="handleSubmit" :validation-schema="schema">
      <BaseInputAuth
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />
      <BaseButton label="Send Instructions" class="w-full mt-6 mb-8" />
      <div class="flex items-center justify-center gap-3">
        <IconBackToLoginModal />
        <button class="text-gray-500">Back to login</button>
      </div>
    </VeeForm>
  </LayoutsFormAuth>
</template>
