<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import { login } from "@/services/auth";

import { useAuthModalStore } from "@/stores/useAuthModalStore";

import type { ValidationSchemaAuth } from "@/plugins/typescript/types";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputCheckbox from "@/components/base/BaseInputCheckbox.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseButtonGoogle from "@/components/base/BaseButtonGoogle.vue";
import axios from "axios";

const store = useAuthModalStore();

const schema: ValidationSchemaAuth = {
  username_or_email: "required|minLength:3",
  password: "required",
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
    await login(values);

    resetForm();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErrors(error.response?.data);
    }
  }
};
</script>

<template>
  <LayoutsFormAuth
    :heading="$t('auth.login.login_to_your_account')"
    :description="$t('auth.login.type_your_details')"
  >
    <VeeForm @submit="handleSubmit" :validation-schema="schema">
      <BaseInputAuth
        :label="$t('auth.login.email_or_username')"
        name="username_or_email"
        type="text"
        :placeholder="$t('auth.login.type_email_or_username')"
      />
      <BaseInputAuth
        :isPassword="true"
        :label="$t('auth.login.password')"
        name="password"
        type="password"
        :placeholder="$t('auth.login.password_validation_message')"
      />
      <div class="flex items-center justify-between mt-3">
        <BaseInputCheckbox name="remember" :label="$t('auth.login.remember')" />
        <button
          @click="store.setModalType('forgotPassword')"
          class="text-blue-600 underline transition duration-200 hover:text-blue-700"
        >
          {{ $t("auth.login.forgot_password_question") }}
        </button>
      </div>
      <BaseButton :label="$t('auth.login.button_signin')" class="w-full my-4" />
    </VeeForm>
    <BaseButtonGoogle :label="$t('auth.login.button_signin_google')" />
    <span class="text-base text-shade-of-gray text-center">
      {{ $t("auth.login.do_not_have_account_question") }}
      <button
        @click="store.setModalType('register')"
        class="text-blue-600 underline transition duration-200 hover:text-blue-700"
      >
        {{ $t("auth.login.button_signup") }}
      </button></span
    >
  </LayoutsFormAuth>
</template>
