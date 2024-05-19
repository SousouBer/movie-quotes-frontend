<script setup lang="ts">
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import TheHeader from "@/components/shared/TheHeader.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import LayoutsLandingMovie from "@/components/layouts/LayoutsLandingMovie.vue";

import { useAuthHttpResponseStore } from "@/stores/authHttpResponse.ts";
import { useAuthModalStore } from "@/stores/useAuthModalStore.ts";

import { verifyEmail } from "@/services/auth";

const { t } = useI18n();
const route = useRoute();

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

onMounted((): void => {
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
  <div class="bg-dark-shade-of-blue flex flex-col items-center py-32">
    <h1
      v-html="$t('generalTexts.landing_main_title')"
      class="font-montserrat text-2xl sm:text-5xl font-bold text-shade-of-beige h-5/6 text-center mb-6 sm:mb-4 sm:leading-normal"
    ></h1>
    <BaseButton :label="$t('generalTexts.get_started')" />
  </div>
  <div>
    <LayoutsLandingMovie
      imageUrl="movie-image-interstelar.svg"
      movieQuote="You have to leave somethig 
behind to go forward"
      movieTitle="Interstellar, 2014"
    />
    <LayoutsLandingMovie
      imageUrl="movie-image.svg"
      movieQuote="I think we’re just gonna have to be secretly in love with each
            other and leave it that"
      movieTitle="The Royal Tenenbaums, 2001"
    />
    <LayoutsLandingMovie
      imageUrl="movie-image-lotr.svg"
      movieQuote="I see in your eyes the same
fear that would take the 
heart of me...."
      movieTitle="The Lord of the Rings, 2003"
    />
  </div>
</template>
