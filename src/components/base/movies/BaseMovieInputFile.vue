<script setup lang="ts">
import { useField } from "vee-validate";

import IconCamera from "@/components/icons/IconCamera.vue";
import { computed } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";

const props = defineProps<{
  name: string;
}>();

const { value, errorMessage, meta } = useField<string>(
  () => props.name as string,
);

const isMobileWidth = ref<boolean>(false);

onMounted((): void => {
  isMobileWidth.value = window.innerWidth < 700;
});

const dynamicHeading = computed((): string => {
  return isMobileWidth.value
    ? "Upload image"
    : "Drag & drop your image here or";
});
</script>

<template>
  <div
    class="relative flex items-center gap-2 border border:shade-of-gray rounded py-4 px-3"
  >
    <IconCamera />
    <span class="text-white text-xl">{{ dynamicHeading }}</span>
    <button
      class="ml-auto sm:ml-2 whitespace-nowrap bg-custom-purple transition-colors duration-300 hover:bg-purple-800 text-white rounded-[2px] p-2.5 text-lg"
    >
      Choose file
    </button>
  </div>
</template>
