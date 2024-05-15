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
  password: "required|minMax:8,15|lowercase",
  password_confirmation: "required|confirmed:password",
};

const handleSubmit = (values: any) => {
  console.log(values);
};
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
