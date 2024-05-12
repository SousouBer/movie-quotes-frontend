<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";

type ValidationSchemaAuth = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

const schema: ValidationSchemaAuth = {
  name: "required|minMax:3,15|lowercase",
  email: "required|email",
  password: "required|minMax:8,15|lowercase",
  password_confirmation: "required|confirmed:password",
};

const handleSubmit = (values: any) => {
  console.log(values);
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
        name="name"
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
      >Already have an account? <a href="#" class="text-blue">Log in</a></span
    >
  </LayoutsFormAuth>
</template>
