<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import { useAuthModalStore } from "@/stores/useAuthModalStore.ts";
import { register } from "@/services/auth.ts";

import type { ValidationSchemaAuth } from "@/plugins/typescript/types.ts";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import axios from "axios";

const store = useAuthModalStore();

const schema: ValidationSchemaAuth = {
  username: "required|minMax:3,15|lowercase",
  email: "required|email",
  password: "required|minMax:8,15|lowercase",
  password_confirmation: "required|confirmed:password",
};

const handleSubmit = async (
  values: ValidationSchemaAuth,
  {
    resetForm,
    setErrors,
  }: {
    resetForm: () => void;
    setErrors: (errors: Record<string, string>) => void;
  },
) => {
  try {
    await register(values);

    resetForm();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErrors(error.response?.data.errors);
    }
  }
};
</script>

<template>
  <LayoutsFormAuth
    heading="Create an account"
    description="Start your journey!"
  >
    <VeeForm @submit="handleSubmit" :validation-schema="schema">
      <BaseInputAuth
        label="Name"
        name="username"
        type="text"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <BaseInputAuth
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />
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
      <BaseButton label="Get started" class="w-full my-6" />
    </VeeForm>
    <BaseButton
      label="Sign up with Google"
      :hasBorder="true"
      :isGoogleButton="true"
      class="w-full mb-6"
    />
    <span class="text-base text-shade-of-gray text-center"
      >Already have an account?
      <button
        @click="store.setModalType('login')"
        class="text-blue-600 underline transition duration-200 hover:text-blue-700"
      >
        Log in
      </button></span
    >
  </LayoutsFormAuth>
</template>
