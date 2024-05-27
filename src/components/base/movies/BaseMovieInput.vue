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
  return inputIsFocused.value || value.value !== ""
    ? "text-base text-shade-of-gray"
    : "text-white text-xl";
});

const labelRef = ref<HTMLLabelElement | null>(null);

const inputPadding = computed(() => {
  if (labelRef.value) {
    const labelWidth = labelRef.value.offsetWidth;
    return `${labelWidth + 30}px`;
  }
});

onMounted(() => {
  console.log(inputIsFocused.value);
});
</script>

<template>
  <div class="relative">
    <label
      :class="labelClasses"
      class="pointer-events-none absolute top-1/2 left-0 transform translate-x-4 -translate-y-1/2"
      ref="labelRef"
      :for="props.name"
      >{{ inputIsFocused || value ? `${label}:` : label }}</label
    >
    <input
      @focus="handleFocus"
      @blur="handleBlur"
      class="outline-none movie-input w-full bg-transparent text-white text-xl border border:shade-of-gray rounded-[4.8px] py-[9px] px-[16px]"
      v-model="value"
      :style="{ 'padding-left': inputPadding }"
      :name="props.name"
      :type="props.type"
    />
    <span
      class="text-shade-of-gray absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2"
      >{{ inputLanguage }}</span
    >
  </div>
</template>
