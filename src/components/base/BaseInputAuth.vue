<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, ref } from "vue";

import IconEyeOpened from "@/components/icons/IconEyeOpened.vue";
import IconEyeClosed from "@/components/icons/IconEyeClosed.vue";
import IconInputValid from "@/components/icons/IconInputValid.vue";
import IconInputInvalid from "@/components/icons/IconInputInvalid.vue";

const props = defineProps<{
  name: string;
  label: string;
  placeholder: string;
  type: string;
  isPassword?: boolean;
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
  <div class="mt-4">
    <label :for="props.name" class="text-white text-base required">{{
      props.label
    }}</label>
    <div class="relative">
      <input
        :class="{
          'border border-vivid-red': errorMessage,
          'border border-medium-dark-green': meta.valid,
        }"
        class="w-full outline-none focus:outline-4 focus:outline-offset-0 focus:outline-transparent-blue rounded bg-gray-300 px-3 py-1.5 mt-1.5 placeholder:text-shade-of-gray placeholder:text-base"
        v-model="value"
        :type="setInputType"
        :name="props.name"
        :placeholder="props.placeholder"
      />
      <div
        class="flex items-center justify-center gap-2 cursor-pointer absolute right-0 top-0 transform -translate-x-3 translate-y-3.5"
        @click="toggleInputType"
      >
        <IconInputValid v-if="meta.valid" class="cursor-default" />
        <IconInputInvalid v-if="errorMessage" class="cursor-default" />
        <IconEyeOpened v-if="isPassword && !showPassword" />
        <IconEyeClosed v-if="isPassword && showPassword" />
      </div>
      <span class="text-vivid-red text-sm">{{ errorMessage }}</span>
    </div>
  </div>
</template>
