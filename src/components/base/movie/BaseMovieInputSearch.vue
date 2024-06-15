<script setup lang="ts">
import { Field } from "vee-validate";
import { computed, ref } from "vue";

import IconSearch from "@/components/icons/IconSearch.vue";
import { useRouter, useRoute } from "vue-router";

import { useQuoteStore } from "@/stores/quote";

const props = defineProps<{
  name: string;
  placeholder: string;
  focusedPlaceholder?: string;
}>();

const emit = defineEmits<{
  (e: "focus-changed", isFocused: boolean): void;
  (e: "search", query: string): void;
}>();

const router = useRouter();
const route = useRoute();
const quoteStore = useQuoteStore();

const isFocused = ref<boolean>(false);
const searchInput = ref<string>("");
const debounceTimeout = ref<number | null>(null);

const handleFocus = (): void => {
  isFocused.value = true;
  emit("focus-changed", isFocused.value);
};

const handleBlur = (): void => {
  if (searchInput.value === "") {
    isFocused.value = false;
    emit("focus-changed", isFocused.value);
  }
};

const dynamicPlaceholder = computed((): string | undefined => {
  return isFocused.value ? props.focusedPlaceholder : props.placeholder;
});

const debounce = (): void => {
  const inputSymbol = searchInput.value.charAt(0);

  if (inputSymbol !== "@" && inputSymbol !== "#") return;

  clearTimeout(debounceTimeout.value as number);

  debounceTimeout.value = setTimeout((): void => {
    router
      .push({
        query: {
          "filter[search]": searchInput.value.trim(),
        },
      })
      .then(() => {
        quoteStore.getQuotes(1, route.query);
      });
  }, 500);
};
</script>

<template>
  <div
    :class="{ 'border-b border-gray-300': isFocused }"
    class="flex items-center gap-3 pb-3"
  >
    <IconSearch color="gray" />
    <Field
      @focus="handleFocus"
      @blur="handleBlur"
      @input="debounce"
      v-model="searchInput"
      :class="{ 'active-searchbar !w-full': isFocused }"
      class="bg-transparent outline-none text-base sm:text-xl text-light-gray w-32 transition-all duration-200"
      :name="props.name"
      type="text"
      :placeholder="dynamicPlaceholder"
    />
  </div>
</template>
