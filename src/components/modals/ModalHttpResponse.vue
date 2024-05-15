<script setup lang="ts">
import { computed, type Component } from "vue";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse.ts";

import BaseButton from "@/components/base/BaseButton.vue";

import IconModalSuccess from "@/components/icons/IconModalSuccess.vue";
import IconModalLinkSent from "@/components/icons/IconModalEmailSent.vue";
import IconModalWarning from "@/components/icons/IconModalWarning.vue";

const store = useAuthHttpResponseStore();

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
      :label="store.getAuthHttpResponse?.buttonLabel"
      class="w-full"
    />
    <span
      v-if="store.getAuthHttpResponse?.showConfirmLaterButton"
      class="cursor-pointer text-shade-of-gray transition duration-200 hover:text-gray-400"
    >
      Skip, I'll confirm later
    </span>
  </div>
</template>
