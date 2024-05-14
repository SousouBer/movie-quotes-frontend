<script setup lang="ts">
import LayoutsModalAuth from "@/components/layouts/LayoutsModalAuth.vue";

import ModalRegister from "@/components/modals/ModalRegister.vue";
import ModalLogin from "@/components/modals/ModalLogin.vue";
import ModalForgotPassword from "@/components/modals/ModalForgotPassword.vue";
import ModalResetPassword from "@/components/modals/ModalResetPassword.vue";
import ModalHttpResponse from "@/components/modals/ModalHttpResponse.vue";

import { useAuthModalStore } from "@/stores/useAuthModalStore.ts";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse.ts";

import { computed, type Component, watch } from "vue";

const store = useAuthModalStore();
const authHttpResponse = useAuthHttpResponseStore();

const authModal = computed<Component | null>(() => {
  if (store.modalType === "register") {
    return ModalRegister;
  } else if (store.modalType === "login") {
    return ModalLogin;
  } else if (store.modalType === "forgotPassword") {
    return ModalForgotPassword;
  } else if (store.modalType === "resetPassword") {
    return ModalResetPassword;
  } else {
    return null;
  }
});

const closeModal = (): void => {
  store.setModalType("");
  authHttpResponse.setAuthHttpResponse(null);
};

const showOrHideModalLayout = computed((): boolean => {
  return (
    store.getModalType !== "" || authHttpResponse.getAuthHttpResponse !== null
  );
});

watch(showOrHideModalLayout, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (newValue) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }
});
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <LayoutsModalAuth
      v-if="showOrHideModalLayout"
      @click.self="closeModal"
      class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center"
    >
      <ModalHttpResponse v-if="authHttpResponse.getAuthHttpResponse" />
      <component v-if="!authHttpResponse.getAuthHttpResponse" :is="authModal" />
      />
    </LayoutsModalAuth>
  </Teleport>
</template>
