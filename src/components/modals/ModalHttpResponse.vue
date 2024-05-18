<script setup lang="ts">
import { computed, type Component } from "vue";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse.ts";
import { useAuthModalStore } from "@/stores/useAuthModalStore.ts";

import BaseButton from "@/components/base/BaseButton.vue";

import IconModalSuccess from "@/components/icons/IconModalSuccess.vue";
import IconModalLinkSent from "@/components/icons/IconModalEmailSent.vue";
import IconModalWarning from "@/components/icons/IconModalWarning.vue";

const store = useAuthHttpResponseStore();
const authModalsStore = useAuthModalStore();

const statusComponent = computed<Component | null>(() => {
  switch (store.getAuthHttpResponse?.status) {
    case "success":
      return IconModalSuccess;
    case "linkSent":
      return IconModalLinkSent;
    case "warning":
      return IconModalWarning;
    default:
      return null;
  }
});

const computedShowOrHideBaseButton = computed((): boolean | undefined => {
  return (
    store.authHttpResponse?.redirectToModal ||
    store.authHttpResponse?.requestNewLink
  );
});

const closeModalAndRedirect = (): void => {
  if (store.authHttpResponse?.redirectToModal) {
    authModalsStore.setModalType("login");
    store.setAuthHttpResponse(null);
  } else {
    console.log("reset link function goes here.");
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8 text-center">
    <component :is="statusComponent" />
    <span class="text-white font-medium text-3xl">{{
      store.getAuthHttpResponse?.heading
    }}</span>
    <p class="text-white text-base">
      {{ store.getAuthHttpResponse?.description }}
    </p>
    <BaseButton
      v-if="computedShowOrHideBaseButton"
      @click="closeModalAndRedirect"
      :label="store.getAuthHttpResponse?.buttonLabel"
      class="w-full"
    />
    <a
      v-else
      href="https://www.gmail.com"
      class="bg-vivid-red text-white px-6 py-2 rounded-md whitespace-nowrap flex items-center justify-center gap-3"
      target="_blank"
    >
      {{ store.getAuthHttpResponse?.buttonLabel }}
    </a>
    <span
      v-if="store.getAuthHttpResponse?.showConfirmLaterButton"
      class="cursor-pointer text-shade-of-gray transition duration-200 hover:text-gray-400"
    >
      Skip, I'll confirm later
    </span>
  </div>
</template>
