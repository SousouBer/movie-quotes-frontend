<script setup lang="ts">
import { computed, type Component } from "vue";

import BaseButton from "@/components/base/BaseButton.vue";

import IconModalSuccess from "@/components/icons/IconModalSuccess.vue";
import IconModalLinkSent from "@/components/icons/IconModalEmailSent.vue";
import IconModalWarning from "@/components/icons/IconModalWarning.vue";

type ModalStatus = "success" | "linkSent" | "warning";

const props = defineProps<{
  status: ModalStatus;
  heading: string;
  description: string;
  buttonLabel: string;
  showConfirmLaterButton?: boolean;
}>();

const statusComponent = computed<Component | null>(() => {
  if (props.status === "success") {
    return IconModalSuccess;
  } else if (props.status === "linkSent") {
    return IconModalLinkSent;
  } else if (props.status === "warning") {
    return IconModalWarning;
  } else {
    return null;
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8 text-center">
    <component :is="statusComponent" />
    <span class="text-white font-medium text-3xl">{{ heading }}</span>
    <p class="text-white text-base">
      {{ description }}
    </p>
    <BaseButton :label="buttonLabel" class="w-full" />
    <span
      v-if="showConfirmLaterButton"
      class="cursor-pointer text-shade-of-gray transition duration-200 hover:text-gray-400"
    >
      Skip, I'll confirm later
    </span>
  </div>
</template>
