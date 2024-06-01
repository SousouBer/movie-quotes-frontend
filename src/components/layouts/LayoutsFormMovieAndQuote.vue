<script setup lang="ts">
import { Form as MediaForm } from "vee-validate";

import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

import IconModalCancel from "@/components/icons/IconModalCancel.vue";

const props = defineProps<{
  heading: string;
}>();

import { useMovieStore } from "@/stores/movie";
import { useQuoteStore } from "@/stores/quote";

const movieStore = useMovieStore();
const quoteStore = useQuoteStore();

const closeModals = (): void => {
  movieStore.setShowMovieAddModal(false);
  quoteStore.setShowQuoteModal(false);
};
</script>

<template>
  <div
    @click.self="closeModals"
    class="bg-blurred-gradient absolute top-0 left-0 w-full min-h-full flex items-start justify-center"
  >
    <div class="bg-dark-shade-of-blue w-full sm:w-1/2 py-8 rounded-xl mt-32">
      <div
        class="flex items-center justify-between pt-2 pb-8 px-8 border-b border-[#EFEFEF33]"
      >
        <span
          class="flex-grow text-center text-white font-medium text-xl sm:text-2xl"
          >{{ props.heading }}</span
        >
        <IconModalCancel @click="closeModals" class="cursor-pointer ml-auto" />
      </div>

      <MediaForm class="flex flex-col gap-6 px-8">
        <BaseUserDetails class="mt-8 mb-2" />
        <slot />
      </MediaForm>
    </div>
  </div>
</template>
