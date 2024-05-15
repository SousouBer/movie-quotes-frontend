<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import { useAuthModalStore } from "@/stores/useAuthModalStore.ts";

import type { ValidationSchemaAuth } from "@/plugins/typescript/types.ts";

import LayoutsFormAuth from "@/components/layouts/LayoutsFormAuth.vue";
import BaseInputAuth from "@/components/base/BaseInputAuth.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import IconBackToLoginModal from "@/components/icons/IconBackToLoginModal.vue";

const store = useAuthModalStore();

const schema: ValidationSchemaAuth = {
  email: "required|email",
};

const handleSubmit = (values: any) => {
  console.log(values);
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
