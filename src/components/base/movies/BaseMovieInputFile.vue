<script setup lang="ts">
import { useField } from "vee-validate";

import IconCamera from "@/components/icons/IconCamera.vue";

const props = defineProps<{
  name: string;
}>();

const { value, errorMessage, meta } = useField<string>(
  () => props.name as string,
);
</script>

<template>
  <div
    class="relative flex items-center gap-2 border border:shade-of-gray rounded py-4 px-3"
  >
    <IconCamera />
    <span class="text-white text-xl">Drag & drop your image here or</span>
    <button
      class="ml-2 bg-custom-purple transition-colors duration-300 hover:bg-purple-800 text-white rounded-[2px] p-2.5 text-lg"
    >
      Choose file
    </button>
  </div>
</template>
