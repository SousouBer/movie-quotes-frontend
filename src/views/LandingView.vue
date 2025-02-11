<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import TheHeader from "@/components/shared/TheHeader.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import LayoutsLandingMovie from "@/components/layouts/LayoutsLandingMovie.vue";
import TheFooter from "@/components/shared/TheFooter.vue";

import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";
import { useAuthModalStore } from "@/stores/useAuthModalStore";

import { googleAuthCallback, verifyEmail } from "@/services/auth";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const authHttpResponse = useAuthHttpResponseStore();
const authModalsStore = useAuthModalStore();

const userEmail = ref<string | null>(null);

const verifyEmailFunction = async (verificationUrl: string) => {
  try {
    await verifyEmail(verificationUrl);

    authHttpResponse.setAuthHttpResponse({
      status: "success",
      heading: t("httpResponseTexts.account_activated.thank_you"),
      description: t("httpResponseTexts.account_activated.account_activated"),
      buttonLabel: t("httpResponseTexts.account_activated.redirect_to_login"),
      redirectToModal: true,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        authHttpResponse.setAuthHttpResponse({
          status: "warning",
          heading: t("httpResponseTexts.email_already_verified.email_verified"),
          description: t(
            "httpResponseTexts.email_already_verified.email_verified_description",
          ),
          buttonLabel: t(
            "httpResponseTexts.email_already_verified.redirect_to_login",
          ),
          redirectToModal: true,
        });
      } else if (error.response?.status === 403) {
        authHttpResponse.setAuthHttpResponse({
          status: "warning",
          heading: t("httpResponseTexts.link_expired.link_expired"),
          description: t(
            "httpResponseTexts.link_expired.link_expired_description",
          ),
          buttonLabel: t("httpResponseTexts.link_expired.request_another_link"),
          requestNewLink: true,
        });
      }
    }
  }
};

const sendGoogleCallback = async (url: string) => {
  try {
    await googleAuthCallback(url);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        authHttpResponse.setAuthHttpResponse({
          status: "warning",
          heading: t("httpResponseTexts.user_exists.user_exists_heading"),
          description: t(
            "httpResponseTexts.user_exists.user_exists_description",
          ),

          buttonLabel: t(
            "httpResponseTexts.email_already_verified.redirect_to_login",
          ),
          redirectToModal: true,
        });
      }
    }
  }
};

onMounted(async () => {
  if (route.query.code) {
    const googleAuthUrl = route.fullPath.split("landing")[1];

    await sendGoogleCallback(googleAuthUrl);

    // Clear the query params after logging in.
    router.replace({ path: route.path });
  }

  if (route.query.verifyLink) {
    userEmail.value = route.query.email as string;
    const verificationUrl = route.fullPath.split("verifyLink=")[1];

    verifyEmailFunction(verificationUrl);
  }

  if ((route.query.token as string) && (route.query.email as string)) {
    authModalsStore.setModalType("resetPassword");
  }
});
</script>

<template>
  <TheHeader />
  <div
    class="bg-dark-shade-of-blue bg-shadow-gradient flex flex-col items-center py-28 sm:py-64"
  >
    <h1
      v-html="$t('general.landing_main_title')"
      class="font-montserrat text-2xl sm:text-6xl font-bold text-shade-of-beige h-5/6 text-center mb-6 sm:leading-normal"
    ></h1>
    <BaseButton
      class="!sm:text-xl"
      @click="authModalsStore.setModalType('register')"
      :label="$t('general.get_started')"
    />
  </div>
  <div>
    <LayoutsLandingMovie
      imageUrl="movie-image-interstelar.svg"
      :movieQuote="$t('general.title_interstellar')"
      :movieTitle="`${$t('general.interstellar')}, 2014`"
    />
    <LayoutsLandingMovie
      imageUrl="movie-image.svg"
      :movieQuote="$t('general.royal_tenenbaums_title')"
      :movieTitle="`${$t('general.royal_tenenbaums')}, 2001`"
    />
    <LayoutsLandingMovie
      imageUrl="movie-image-lotr.svg"
      :movieQuote="$t('general.lotr_title')"
      :movieTitle="`${$t('general.lotr')}, 2001`"
    />
    <TheFooter />
  </div>
</template>
