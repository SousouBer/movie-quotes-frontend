<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import { useAuthModalStore } from "@/stores/useAuthModalStore.ts";

import type { ValidationSchemaAuth } from "@/plugins/typescript/types.ts";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputCheckbox from "@/components/base/BaseInputCheckbox.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const store = useAuthModalStore();

const schema: ValidationSchemaAuth = {
  email: "required|email",
  password: "required",
};

const handleSubmit = (values: any) => {
  console.log(values);
};
</script>

<template>
  <LayoutsFormAuth
    heading="Log in to your account"
    description="Welcome back! Please enter your details."
  >
    <VeeForm @submit="handleSubmit" :validation-schema="schema">
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
      <div class="flex items-center justify-between">
        <BaseInputCheckbox name="remember" label="Remember me" />
        <button
          @click="store.setModalType('forgotPassword')"
          class="text-blue-600 underline transition duration-200 hover:text-blue-700"
        >
          Forgot Password?
        </button>
      </div>
      <BaseButton label="Sign in" class="w-full my-4" />
    </VeeForm>
    <BaseButton
      label="Sign in with Google"
      :hasBorder="true"
      :isGoogleButton="true"
      class="w-full mb-6"
    />
    <span class="text-base text-shade-of-gray text-center"
      >Don't have an account?
      <button
        @click="store.setModalType('register')"
        class="text-blue-600 underline transition duration-200 hover:text-blue-700"
      >
        Sign up
      </button></span
    >
  </LayoutsFormAuth>
</template>
