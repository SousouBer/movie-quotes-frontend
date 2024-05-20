<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import { useAuthModalStore } from "@/stores/useAuthModalStore";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";

import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { ValidationSchemaAuth } from "@/plugins/typescript/types";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import IconBackToLoginModal from "@/components/icons/IconBackToLoginModal.vue";

import { resetPassword } from "@/services/auth";
import axios from "axios";

const store = useAuthModalStore();
const authHttpResponse = useAuthHttpResponseStore();

const schema: ValidationSchemaAuth = {
  password: "required|minMax:8,15|lowercase",
  password_confirmation: "required|confirmed:password",
};

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const userEmail = ref<string | null>(null);
const passwordResetToken = ref<string | null>(null);

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
    await resetPassword(
      values,
      userEmail.value as string,
      passwordResetToken.value as string,
    );

    authHttpResponse.setAuthHttpResponse({
      status: "success",
      heading: t("httpResponseTexts.reset_password.success"),
      description: t(
        "httpResponseTexts.reset_password.password_reset_description",
      ),
      buttonLabel: t("httpResponseTexts.reset_password.redirect_to_login"),
      redirectToModal: true,
      showConfirmLaterButton: true,
    });

    resetForm();

    // Clear query params when the password gets sucessfully changed.
    router.replace({ path: route.path, query: {} });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErrors(error.response?.data.errors);
    }
  }
};

onMounted(() => {
  userEmail.value = route.query.email as string;
  passwordResetToken.value = route.query.token as string;
});
</script>

<template>
  <LayoutsFormAuth
    :heading="$t('auth.reset_password.create_new_password')"
    :description="$t('auth.reset_password.reset_password_description')"
  >
    <VeeForm @submit="handleSubmit" :validation-schema="schema">
      <BaseInputAuth
        :isPassword="true"
        :label="$t('auth.reset_password.password')"
        name="password"
        type="password"
        :placeholder="$t('auth.reset_password.password_validation_message')"
      />
      <BaseInputAuth
        :isPassword="true"
        :label="$t('auth.reset_password.confirm_password')"
        name="password_confirmation"
        type="password"
        :placeholder="$t('auth.reset_password.confirm_password')"
      />
      <BaseButton
        :label="$t('auth.reset_password.button_reset_password')"
        class="w-full mt-6 mb-8"
      />
      <div class="flex items-center justify-center gap-3">
        <IconBackToLoginModal />
        <button @click="store.setModalType('login')" class="text-gray-500">
          {{ $t("auth.reset_password.button_back_login") }}
        </button>
      </div>
    </VeeForm>
  </LayoutsFormAuth>
</template>
