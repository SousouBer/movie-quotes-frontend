<script setup lang="ts">
import LayoutsModalAuth from "@/components/layouts/LayoutsModalAuth.vue";

import ModalRegister from "@/components/modals/ModalRegister.vue";
import ModalLogin from "@/components/modals/ModalLogin.vue";
import ModalForgotPassword from "@/components/modals/ModalForgotPassword.vue";
import ModalResetPassword from "@/components/modals/ModalResetPassword.vue";
import ModalHttpResponse from "@/components/modals/ModalHttpResponse.vue";
import QuoteFormAddQuote from "@/components/quote/QuoteFormAddQuote.vue";
import MovieFormAdd from "@/components/movie/MovieFormAdd.vue";
import MovieFormEdit from "@/components/movie/MovieFormEdit.vue";

import { useAuthModalStore } from "@/stores/useAuthModalStore";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";
import { useUserStore } from "@/stores/userStore";
import { useQuoteStore } from "@/stores/quote";
import { useMovieStore } from "./stores/movie";

import { computed, type Component, watch, onMounted } from "vue";

const store = useAuthModalStore();
const authHttpResponse = useAuthHttpResponseStore();
const userStore = useUserStore();
const quoteStore = useQuoteStore();
const movieStore = useMovieStore();

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
    <QuoteFormAddQuote v-if="quoteStore.showQuoteModal" />
    <div
      v-if="movieStore.showMovieModal"
      class="bg-blurred-gradient absolute top-0 left-0 w-full min-h-full flex sm:items-center justify-center"
    >
      <component :is="movieFormModal" />
    </div>
  </Teleport>
</template>
