<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, ref, type ComputedRef } from "vue";

import IconEyeOpened from "@/components/icons/IconEyeOpened.vue";
import IconEyeClosed from "@/components/icons/IconEyeClosed.vue";

import { useProfileFormStore } from "@/stores/profileFormStore";
import { watch } from "vue";

const formStore = useProfileFormStore();

const props = defineProps<{
  name: string;
  label: string;
  placeholder: string;
  type: string;
  isPassword?: boolean;
  isDisabled?: boolean;
  isModalInput?: boolean;
  vModel?: any;
}>();

const { value, errorMessage } = useField<string>(() => props.name as string);

let showPassword = ref<boolean>(false);

const toggleInputType = (): void => {
  showPassword.value = !showPassword.value;
};

const setInputType = computed<string>(() => {
  return props.isPassword
    ? showPassword.value
      ? "text"
      : "password"
    : props.type;
});

const dynamicClasses = computed((): string => {
  return props.isModalInput
    ? "text-black rounded-[4.8px] bg-gray-300 px-2.5 mt-1"
    : "text-white sm:text-black sm:rounded-[4.8px] sm:bg-gray-300 sm:px-2.5 sm:mt-1 bg-transparent";
});

const updateFormValues = (): void => {
  formStore.changeFormValues(props.name, value.value);

  formStore.setBackendErrors(null);
};

watch(
  errorMessage as ComputedRef<string | undefined>,
  (newErrorMessage: ComputedRef<string | undefined>) => {
    if (newErrorMessage) {
      formStore.setDisableSubmitButton(true);
    } else {
      formStore.setDisableSubmitButton(false);
    }
  },
);
</script>

<template>
  <div>
    <label :for="props.name" class="text-base text-white">{{
      props.label
    }}</label>
    <div class="relative">
      <input
        :disabled="props.isDisabled"
        :class="dynamicClasses"
        class="w-full outline-none text-lg border-gray-300 py-2 placeholder:text-shade-of-gray placeholder:text-base"
        v-model="value"
        :type="setInputType"
        :name="props.name"
        :placeholder="props.placeholder"
        @input="updateFormValues"
      />
      <div
        @click="toggleInputType"
        class="flex items-center justify-center gap-2 cursor-pointer absolute right-0 top-0 transform -translate-x-3 translate-y-[17.5px]"
      >
        <IconEyeOpened v-if="isPassword && !showPassword" />
        <IconEyeClosed v-if="isPassword && showPassword" />
      </div>
      <span class="text-vivid-red text-sm">{{ errorMessage }}</span>
    </div>
  </div>
</template>
