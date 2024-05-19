<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, ref } from "vue";

import IconEyeOpened from "@/components/icons/IconEyeOpened.vue";
import IconEyeClosed from "@/components/icons/IconEyeClosed.vue";

const props = defineProps<{
  name: string;
  label: string;
  placeholder: string;
  type: string;
  isPassword?: boolean;
  isDisabled?: boolean;
}>();

const { value, errorMessage, meta } = useField<string>(
  () => props.name as string,
);

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
</script>

<template>
  <div>
    <label :for="props.name" class="text-base text-white">{{
      props.label
    }}</label>
    <div class="relative">
      <input
        ref="inputRef"
        :disabled="props.isDisabled"
        class="w-full outline-none text-white sm:text-black text-lg sm:rounded-[4.8px] bg-transparent border-gray-300 sm:bg-gray-300 sm:px-2.5 py-2 sm:mt-1 placeholder:text-shade-of-gray placeholder:text-base"
        v-model="value"
        :type="setInputType"
        :name="props.name"
        :placeholder="props.placeholder"
      />
      <div
        @click="toggleInputType"
        class="flex items-center justify-center gap-2 cursor-pointer absolute right-0 top-0 transform -translate-x-3 translate-y-3.5"
      >
        <IconEyeOpened v-if="isPassword && !showPassword" />
        <IconEyeClosed v-if="isPassword && showPassword" />
      </div>
    </div>
  </div>
</template>
