<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{
  name: string;
  label: string;
  placeholder: string;
  type: string;
  isPassword?: boolean;
}>();

const { value, errorMessage } = useField(() => props.name as string);
</script>

<template>
  <div class="mb-4">
    <label :for="props.name" class="text-white text-base required">{{
      props.label
    }}</label>
    <input
      class="w-full outline-none rounded bg-gray-300 border focus:border-transparent-blue px-2 py-1.5 mt-1.5 placeholder:text-shade-of-gray placeholder:text-base"
      v-model="value"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
    />
    <span>{{ errorMessage }}</span>
  </div>
</template>
