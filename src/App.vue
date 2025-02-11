<script setup lang="ts">
import LayoutsModalAuth from "@/components/layouts/LayoutsModalAuth.vue";

import ModalRegister from "@/components/modals/ModalRegister.vue";
import ModalLogin from "@/components/modals/ModalLogin.vue";
import ModalForgotPassword from "@/components/modals/ModalForgotPassword.vue";
import ModalResetPassword from "@/components/modals/ModalResetPassword.vue";
import ModalHttpResponse from "@/components/modals/ModalHttpResponse.vue";
import QuoteFormAddQuote from "@/components/quote/QuoteFormAddQuote.vue";
import QuoteFormEditQuote from "@/components/quote/QuoteFormEditQuote.vue";
import MovieFormAdd from "@/components/movie/MovieFormAdd.vue";
import MovieFormEdit from "@/components/movie/MovieFormEdit.vue";
import QuoteFormViewQuoteVue from "./components/quote/QuoteFormViewQuote.vue";

import { useAuthModalStore } from "@/stores/useAuthModalStore";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";
import { useUserStore } from "@/stores/userStore";
import { useQuoteStore } from "@/stores/quote";
import { useMovieStore } from "@/stores/movie";
import { useNotificationStore } from "@/stores/notifications";

import { computed, type Component, watch, onMounted } from "vue";

import type { Notification } from "@/plugins/typescript/types";

const store = useAuthModalStore();
const authHttpResponse = useAuthHttpResponseStore();
const userStore = useUserStore();
const quoteStore = useQuoteStore();
const movieStore = useMovieStore();
const notificationStore = useNotificationStore();

const movieFormModal = computed<Component | null>(() => {
  switch (movieStore.movieFormMode) {
    case "add":
      return MovieFormAdd;
    case "edit":
      return MovieFormEdit;
    default:
      return null;
  }
});

const quoteFormModal = computed<Component | null>(() => {
  switch (quoteStore.quoteModalMode) {
    case "add":
      return QuoteFormAddQuote;
    case "edit":
      return QuoteFormEditQuote;
    case "view":
      return QuoteFormViewQuoteVue;
    default:
      return null;
  }
});

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

onMounted(async (): Promise<void> => {
  await userStore.fetchUser();
  await movieStore.getMovies();
  await movieStore.getGenres();

  window.Echo.channel(`notification.${userStore.user?.id}`).listen(
    "userNotification",
    (newNotification: { notification: Notification }) => {
      notificationStore.addNotification(newNotification.notification);
    },
  );
});
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <LayoutsModalAuth
      v-if="showOrHideModalLayout"
      @click.self="closeModal"
      class="flex items-start sm:items-center justify-center"
    >
      <ModalHttpResponse v-if="authHttpResponse.getAuthHttpResponse" />
      <component v-if="!authHttpResponse.getAuthHttpResponse" :is="authModal" />
    </LayoutsModalAuth>
    <component v-if="movieStore.showMovieModal" :is="movieFormModal" />
    <component v-if="quoteStore.showQuoteModal" :is="quoteFormModal" />
  </Teleport>
</template>
