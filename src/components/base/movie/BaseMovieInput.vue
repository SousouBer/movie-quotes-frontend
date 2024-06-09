<script setup lang="ts">
import { useField } from "vee-validate";
import { ref, computed, watch } from "vue";

import { useMovieStore } from "@/stores/movie";
import { useQuoteStore } from "@/stores/quote";

import type { MovieEdit, QuoteEdit } from "@/plugins/typescript/types";

const movieStore = useMovieStore();
const quoteStore = useQuoteStore();

type Locale = "Eng" | "ქარ" | "";

type Props = {
  type: string;
  name: string;
  label?: string;
  locale?: Locale;
  isTextarea?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  locale: "",
});

const { value, errorMessage } = useField<string>(() => props.name as string);

const inputIsFocused = ref<boolean>(false);

const handleFocus = (): void => {
  inputIsFocused.value = true;
};

const handleBlur = (): void => {
  inputIsFocused.value = false;
};

const labelClasses = computed((): string => {
  if (inputIsFocused.value || value.value) {
    return "text-base text-sm sm:text-base text-shade-of-gray";
  } else {
    return "text-white text-base sm:text-xl";
  }
});

watch(
  () => movieStore.movieEditData,
  (newMovieEditData: MovieEdit | any) => {
    if (newMovieEditData) {
      let fieldName = props.name;

      if (fieldName.includes(".")) {
        const propsName = fieldName.split(".")[0];
        const locale = fieldName.split(".")[1];

        value.value = newMovieEditData[propsName][locale];
      } else {
        value.value = newMovieEditData[props.name];
      }
    }
  },
  { immediate: true },
);

watch(
  () => quoteStore.editQuoteData,
  (newEditData: QuoteEdit | any) => {
    if (newEditData) {
      let fieldName = props.name;

      if (fieldName.includes(".")) {
        const propsName = fieldName.split(".")[0];
        const locale = fieldName.split(".")[1];

        value.value = newEditData[propsName][locale];
      } else {
        value.value = newEditData[props.name];
      }
    }
  },
  { immediate: true },
);

watch(
  () => quoteStore.quoteDetails,
  (quoteDetailsData: QuoteEdit | any) => {
    if (quoteDetailsData) {
      let fieldName = props.name;

      if (fieldName.includes(".")) {
        const propsName = fieldName.split(".")[0];
        const locale = fieldName.split(".")[1];

        value.value = quoteDetailsData[propsName][locale];
      } else {
        value.value = quoteDetailsData[props.name];
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <div
      :class="{
        'items-center': !isTextarea,
      }"
      class="relative flex gap-2 border border-shade-of-gray rounded-[4.8px] py-[9px] px-[16px] mb-2"
    >
      <label
        v-if="props.label"
        :for="props.name"
        class="pointer-events-none whitespace-nowrap transition-all duration-200"
        :class="labelClasses"
        >{{ inputIsFocused || value ? `${label}:` : label }}</label
      >
      <input
        v-if="!isTextarea"
        @focus="handleFocus"
        @blur="handleBlur"
        class="outline-none w-full bg-transparent text-white text-xl"
        v-model="value"
        :name="props.name"
        :type="props.type"
        :placeholder="props.placeholder"
      />
      <textarea
        v-else
        :disabled="isDisabled"
        @focus="handleFocus"
        @blur="handleBlur"
        class="outline-none w-full bg-transparent text-white text-xl resize-none"
        :class="{
          'placeholder:text-base sm:placeholder:text-2xl placeholder-shade-of-gray':
            props.placeholder,
        }"
        :placeholder="props.placeholder"
        v-model="value"
        :name="props.name"
      />
      <span class="text-shade-of-gray">{{ props.locale }}</span>
    </div>
    <span class="text-red-500">{{ errorMessage }}</span>
  </div>
</template>
