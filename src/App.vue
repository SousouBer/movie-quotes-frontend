<script setup lang="ts">
import LayoutsModalAuth from "@/components/layouts/LayoutsModalAuth.vue";

import ModalRegister from "@/components/modals/ModalRegister.vue";
import ModalLogin from "@/components/modals/ModalLogin.vue";
import ModalForgotPassword from "@/components/modals/ModalForgotPassword.vue";
import ModalResetPassword from "@/components/modals/ModalResetPassword.vue";

import ModalHttpResponse from "@/components/modals/ModalHttpResponse.vue";

import { useAuthModalStore } from "@/stores/useAuthModalStore.ts";
import { computed, type Component } from "vue";

const store = useAuthModalStore();

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
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <LayoutsModalAuth
      class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center"
    >
      <!-- Here will probably go auth modals! -->
      <!-- <ModalHttpResponse /> -->
      <component :is="authModal" />
      />
    </LayoutsModalAuth>
  </Teleport>
</template>
