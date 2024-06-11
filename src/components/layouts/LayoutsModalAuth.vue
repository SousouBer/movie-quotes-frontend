<script setup lang="ts">
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";
import { computed } from "vue";

import { useWindowWidth } from "@/components/composables/useWindowWidth";

const httpAuthStore = useAuthHttpResponseStore();

const isMobileVersion = useWindowWidth();

const dynamicModalStyles = computed((): string =>
  httpAuthStore.authHttpResponse
    ? "sm:px-24 sm:w-[28%] mx-8 sm:mx-0 pb-28 rounded-[10px]"
    : " sm:w-[31%] sm:px-28 ",
);

const httpResponseMobileGradient = computed((): string => {
  return httpAuthStore.authHttpResponse && isMobileVersion
    ? "bg-http-response-gratient"
    : "";
});
</script>

<template>
  <div
    @click.stop
    :class="{
      'pt-16': httpAuthStore.authHttpResponse && isMobileVersion,
    }"
    class="fixed shadow-gradient sm:before:hidden inset-0 overflow-y-scroll bg-blueish-black sm:bg-black sm:bg-opacity-75 backdrop-blur-sm w-screen"
  >
    <div
      :class="[dynamicModalStyles, httpResponseMobileGradient]"
      class="sm:bg-blueish-black bg-transparent flex flex-col sm:justify-center sm:rounded-xl px-8 pt-20 sm:py-16 h-auto w-full z-50"
    >
      <slot />
    </div>
  </div>
</template>
