<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import axios from "axios";
import { forgotPassword } from "@/services/auth";

import { useAuthModalStore } from "@/stores/useAuthModalStore";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";

import type { ValidationSchemaAuth } from "@/plugins/typescript/types";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import IconBackToLoginModal from "@/components/icons/IconBackToLoginModal.vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const schema: ValidationSchemaAuth = {
  email: "required|email",
};

const store = useAuthModalStore();
const authHttpResponse = useAuthHttpResponseStore();

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
    await forgotPassword(values);

    authHttpResponse.setAuthHttpResponse({
      status: "linkSent",
      heading: t("httpResponseTexts.forgot_password.check_your_email"),
      description: t("httpResponseTexts.forgot_password.link_sent_description"),
      buttonLabel: t("httpResponseTexts.forgot_password.go_to_my_email"),
      showConfirmLaterButton: true,
    });

    resetForm();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        setErrors(error.response?.data);
      } else {
        setErrors(error.response?.data.errors);
      }
    }
  }
};
</script>

<template>
  <LayoutsFormAuth
    :heading="$t('auth.forgot_password.forgot_password')"
    :description="$t('auth.forgot_password.forgot_password_description')"
  >
    <VeeForm @submit="handleSubmit" :validation-schema="schema">
      <BaseInputAuth
        :label="$t('auth.forgot_password.email')"
        name="email"
        type="email"
        :placeholder="$t('auth.forgot_password.enter_your_email')"
      />
      <BaseButton
        :label="$t('auth.forgot_password.button_send_instructions')"
        class="w-full mt-6 mb-8"
      />
      <div class="flex items-center justify-center gap-3">
        <IconBackToLoginModal />
        <button @click="store.setModalType('login')" class="text-gray-500">
          {{ $t("auth.forgot_password.button_back_login") }}
        </button>
      </div>
    </VeeForm>
  </LayoutsFormAuth>
</template>
