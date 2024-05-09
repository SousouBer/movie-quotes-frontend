<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";

import InputAuth from "@/components/ui/InputAuth.vue";
import ButtonBase from "@/components/ui/ButtonBase.vue";

const schema = {
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
  <div
    class="bg-blueish-black flex flex-col justify-center rounded-xl px-28 py-12 w-2/5"
  >
    <div class="flex flex-col items-center gap-2 mb-4">
      <span class="font-medium text-3xl text-white whitespace-nowrap"
        >Create an account</span
      >
      <span class="text-base text-shade-of-gray font-normal"
        >Start your journey!</span
      >
    </div>
    <VeeForm @submit="handleSubmit" :validation-schema="schema">
      <InputAuth
        label="Name"
        name="name"
        type="text"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <InputAuth
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />
      <InputAuth
        :isPassword="true"
        label="Password"
        name="password"
        type="password"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <InputAuth
        :isPassword="true"
        label="Confirm password"
        name="password_confirmation"
        type="password"
        placeholder="Confirm password"
      />
      <ButtonBase label="Get started" class="w-full my-6" />
    </VeeForm>
    <ButtonBase
      label="Sign up with Google"
      :hasBorder="true"
      :isGoogleButton="true"
      class="w-full mb-6"
    />
    <span class="text-base text-shade-of-gray text-center"
      >Already have an account? <a href="#" class="text-blue">Log in</a></span
    >
  </div>
</template>
