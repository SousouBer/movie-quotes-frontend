<script setup lang="ts">
import IconModalCancel from "@/components/icons/IconModalCancel.vue";

import { useAuthModalStore } from "@/stores/useAuthModalStore";
import { useAuthHttpResponseStore } from "@/stores/authHttpResponse";

const authStore = useAuthModalStore();
const httpResponseStore = useAuthHttpResponseStore();

const props = defineProps<{
  heading: string;
  description: string;
}>();

const closeAuthModal = (): void => {
  authStore.setModalType("");
  httpResponseStore.setAuthHttpResponse(null);
};
</script>

<template>
  <div class="relative flex flex-col justify-center pb-8 sm:pb-0">
    <IconModalCancel
      @click="closeAuthModal"
      class="cursor-pointer absolute top-0 right-0 transform sm:translate-x-10 sm:-translate-y-full -translate-y-8"
    />
    <div class="flex flex-col text-center items-center gap-2 mb-4">
      <span
        class="font-medium text-2xl sm:text-3xl text-white whitespace-nowrap"
        >{{ props.heading }}</span
      >
      <span class="text-base text-shade-of-gray font-normal">{{
        props.description
      }}</span>
    </div>
    <slot />
  </div>
</template>
