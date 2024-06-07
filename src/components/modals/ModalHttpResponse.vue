<script setup lang="ts">
import { computed, ref, onMounted, type Component } from "vue";
import axios from "axios";

import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";
import { useAuthModalStore } from "@/stores/useAuthModalStore";

import BaseButton from "@/components/base/BaseButton.vue";

import IconModalSuccess from "@/components/icons/IconModalSuccess.vue";
import IconModalLinkSent from "@/components/icons/IconModalEmailSent.vue";
import IconModalWarning from "@/components/icons/IconModalWarning.vue";

import { resendEmailVerificationLink } from "@/services/auth";

const { t } = useI18n();

const route = useRoute();

const userEmail = ref<string | null>(null);

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

const resendVerificationLink = async (email: string) => {
  try {
    await resendEmailVerificationLink(email);

    store.setAuthHttpResponse({
      status: "linkSent",
      heading: t("httpResponseTexts.registration_link_sent.thank_you"),
      description: t(
        "httpResponseTexts.registration_link_sent.verification_link_sent",
      ),
      buttonLabel: t("httpResponseTexts.registration_link_sent.go_to_my_email"),
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Will take care of this later.
      console.log("error");
    }
  }
};

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
    resendVerificationLink(userEmail.value as string);
  }
};

const closeModals = (): void => {
  authModalsStore.setModalType("");
  store.setAuthHttpResponse(null);
};

onMounted((): void => {
  userEmail.value = route.query.email as string;
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 sm:gap-8 text-center"
  >
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
      class="!w-full"
    />
    <a
      v-else
      href="https://www.gmail.com"
      class="bg-vivid-red text-white px-6 py-2 rounded-[4px] sm:rounded-md whitespace-nowrap flex items-center justify-center gap-2 sm:gap-3 w-[70%] sm:w-full"
      target="_blank"
    >
      {{ store.getAuthHttpResponse?.buttonLabel }}
    </a>
    <span
      @click="closeModals"
      v-if="store.getAuthHttpResponse?.showConfirmLaterButton"
      class="cursor-pointer text-shade-of-gray transition duration-200 hover:text-gray-400"
    >
      {{ $t("generalTexts.confirm_later_button") }}
    </span>
  </div>
</template>
