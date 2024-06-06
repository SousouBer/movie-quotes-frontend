<script setup lang="ts">
import { Form as MediaForm } from "vee-validate";

import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

import IconModalCancel from "@/components/icons/IconModalCancel.vue";
import type {
  ValidationSchemaMovie,
  ValidationSchemaQuote,
} from "@/plugins/typescript/types";

const props = defineProps<{
  heading: string;
  handleSubmit: (
    values: any,
    actions: {
      resetForm: () => void;
      setErrors: (errors: Record<string, string>) => void;
    },
  ) => Promise<void>;
  schema: ValidationSchemaMovie | ValidationSchemaQuote;
}>();

import { useMovieStore } from "@/stores/movie";
import { useQuoteStore } from "@/stores/quote";
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";

const movieStore = useMovieStore();
const quoteStore = useQuoteStore();

const closeModals = (): void => {
  movieStore.setShowMovieModal(false);
  quoteStore.setShowQuoteModal(false);
  movieStore.setMovieEditData(null);
  movieStore.setMovieFormMode(null);
};

onMounted((): void => {
  document.body.classList.add("overflow-hidden");
});

onBeforeUnmount((): void => {
  document.body.classList.remove("overflow-hidden");
});
</script>

<template>
  <div
    @click.self="closeModals"
    class="bg-blurred-gradient overflow-y-scroll absolute top-0 left-0 w-full h-full flex items-start justify-center"
  >
    <div class="bg-dark-shade-of-blue w-full sm:w-1/2 py-8 rounded-xl sm:mt-32">
      <div
        class="flex items-center justify-between pt-2 pb-8 px-8 border-b border-[#EFEFEF33]"
      >
        <span
          class="flex-grow text-center text-white font-medium text-xl sm:text-2xl"
          >{{ props.heading }}</span
        >
        <IconModalCancel @click="closeModals" class="cursor-pointer ml-auto" />
      </div>

      <MediaForm
        @submit="handleSubmit"
        :validation-schema="schema"
        class="flex flex-col gap-6 px-8"
      >
        <BaseUserDetails class="mt-8 mb-2" />
        <slot />
      </MediaForm>
    </div>
  </div>
</template>
