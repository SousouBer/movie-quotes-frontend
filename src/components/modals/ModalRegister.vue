<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import { useAuthModalStore } from "@/stores/useAuthModalStore";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";

import { register } from "@/services/auth";

import type { ValidationSchemaAuth } from "@/plugins/typescript/types";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseButtonGoogle from "@/components/base/BaseButtonGoogle.vue";

import axios from "axios";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const store = useAuthModalStore();
const authHttpResponse = useAuthHttpResponseStore();

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

    authHttpResponse.setAuthHttpResponse({
      status: "linkSent",
      heading: t("httpResponseTexts.registration_link_sent.thank_you"),
      description: t(
        "httpResponseTexts.registration_link_sent.verification_link_sent",
      ),
      buttonLabel: t("httpResponseTexts.registration_link_sent.go_to_my_email"),
    });

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
    :heading="$t('auth.register.create_account')"
    :description="$t('auth.register.start_your_journey')!"
  >
    <VeeForm @submit="handleSubmit" :validation-schema="schema">
      <BaseInputAuth
        :label="$t('auth.register.username')"
        name="username"
        type="text"
        :placeholder="$t('auth.register.username_validation_message')"
      />
      <BaseInputAuth
        :label="$t('auth.register.email')"
        name="email"
        type="email"
        :placeholder="$t('auth.register.enter_your_email')"
      />
      <BaseInputAuth
        :isPassword="true"
        :label="$t('auth.register.password')"
        name="password"
        type="password"
        :placeholder="$t('auth.register.password_validation_message')"
      />
      <BaseInputAuth
        :isPassword="true"
        :label="$t('auth.register.confirm_password')"
        name="password_confirmation"
        type="password"
        :placeholder="$t('auth.register.confirm_password')"
      />
      <BaseButton
        :label="$t('auth.register.get_started')"
        class="w-full my-6"
      />
    </VeeForm>
    <BaseButtonGoogle :label="$t('auth.register.button_signup_google')" />
    <span class="text-base text-shade-of-gray text-center"
      >{{ $t("auth.register.already_have_account_question") }}
      <button
        @click="store.setModalType('login')"
        class="text-blue-600 underline transition duration-200 hover:text-blue-700"
      >
        {{ $t("auth.register.button_login") }}
      </button></span
    >
  </LayoutsFormAuth>
</template>
