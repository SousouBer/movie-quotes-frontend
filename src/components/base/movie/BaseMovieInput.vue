<script setup lang="ts">
import { useField } from "vee-validate";
import { ref, computed } from "vue";

type Locale = "Eng" | "ქარ" | "";

type Props = {
  type: string;
  name: string;
  label?: string;
  locale?: Locale;
  isTextarea?: boolean;
  placeholder?: string;
};

const props = withDefaults(defineProps<Props>(), {
  locale: "",
});

const { value } = useField<string>(() => props.name as string);

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
</script>

<template>
  <div
    :class="{ 'items-center': !isTextarea }"
    class="relative flex gap-2 border border:shade-of-gray rounded-[4.8px] py-[9px] px-[16px]"
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
      @focus="handleFocus"
      @blur="handleBlur"
      class="outline-none w-full bg-transparent text-white text-xl"
      :class="{
        'placeholder:text-2xl placeholder-shade-of-gray': true,
      }"
      :placeholder="props.placeholder"
      v-model="value"
      :name="props.name"
    />
    <span class="text-shade-of-gray">{{ props.locale }}</span>
  </div>
</template>
