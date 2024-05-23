<script setup lang="ts">
import LayoutsModalAuth from "@/components/layouts/LayoutsModalAuth.vue";

import { user } from "@/services/auth";

import ModalRegister from "@/components/modals/ModalRegister.vue";
import ModalLogin from "@/components/modals/ModalLogin.vue";
import ModalForgotPassword from "@/components/modals/ModalForgotPassword.vue";
import ModalResetPassword from "@/components/modals/ModalResetPassword.vue";
import ModalHttpResponse from "@/components/modals/ModalHttpResponse.vue";

import { useAuthModalStore } from "@/stores/useAuthModalStore";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";
import { useUserStore } from "@/stores/userStore";

import { computed, type Component, watch, onMounted } from "vue";

const store = useAuthModalStore();
const authHttpResponse = useAuthHttpResponseStore();
const userStore = useUserStore();

const authModal = computed<Component | null>(() => {
  switch (store.modalType) {
    case "register":
      return ModalRegister;
    case "login":
      return ModalLogin;
    case "forgotPassword":
      return ModalForgotPassword;
    case "resetPassword":
      return ModalResetPassword;
    default:
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

watch(showOrHideModalLayout, (newValue: boolean, oldValue: boolean): void => {
  if (newValue !== oldValue) {
    if (newValue) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }
});

onMounted(async () => {
  await userStore.fetchUser();

  console.log("getuser", userStore.getUser?.avatar);
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
    </LayoutsModalAuth>
  </Teleport>
</template>
