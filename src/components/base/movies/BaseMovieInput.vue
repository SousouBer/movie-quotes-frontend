<script setup lang="ts">
import { useField } from "vee-validate";
import { onMounted } from "vue";
import { watch } from "vue";
import { ref } from "vue";
import { computed } from "vue";

type Locale = "en" | "ka";

const props = defineProps<{
  type: string;
  name: string;
  label: string;
  locale?: Locale;
  isTextarea?: boolean;
}>();

const { value, errorMessage, meta } = useField<string>(
  () => props.name as string,
);

const inputLanguage = computed((): string => {
  return props.locale === "ka" ? "ქარ" : props.locale === "en" ? "Eng" : "";
});

const inputIsFocused = ref<boolean>(false);

const handleFocus = (): void => {
  inputIsFocused.value = true;
};

const handleBlur = (): void => {
  inputIsFocused.value = false;
};

const labelClasses = computed((): string => {
  if (inputIsFocused.value || value.value) {
    return "text-base text-shade-of-gray";
  } else {
    return "text-white text-xl";
  }
});
</script>

<template>
  <div
    :class="{ 'items-center': !isTextarea }"
    class="relative flex gap-2 border border:shade-of-gray rounded-[4.8px] py-[9px] px-[16px]"
  >
    <label
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
    />
    <textarea
      v-else
      @focus="handleFocus"
      @blur="handleBlur"
      class="outline-none w-full bg-transparent text-white text-xl"
      v-model="value"
      :name="props.name"
    />
    <span
      class="text-shade-of-gray absolute top-6 right-0 transform -translate-y-1/2 -translate-x-1/2"
      >{{ inputLanguage }}</span
    >
  </div>
</template>
