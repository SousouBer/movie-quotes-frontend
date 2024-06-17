<script setup lang="ts">
import { Field } from "vee-validate";
import { computed, ref } from "vue";

import IconSearch from "@/components/icons/IconSearch.vue";

import { useSearch } from "@/components/composables/useSearch";

const props = defineProps<{
  name: string;
  placeholder: string;
  focusedPlaceholder?: string;
  isMoviesSearch?: boolean;
}>();

const emit = defineEmits<{
  (e: "focus-changed", isFocused: boolean): void;
  (e: "search", query: string): void;
}>();

const isFocused = ref<boolean>(false);
const searchInput = ref<string>("");

const { debounce } = useSearch(searchInput, props.isMoviesSearch);

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
      v-model="searchInput"
      @input="debounce"
      :class="{ 'active-searchbar !w-full': isFocused }"
      class="bg-transparent outline-none text-base sm:text-xl text-light-gray w-32 transition-all duration-200"
      :name="props.name"
      type="text"
      :placeholder="dynamicPlaceholder"
    />
  </div>
</template>
