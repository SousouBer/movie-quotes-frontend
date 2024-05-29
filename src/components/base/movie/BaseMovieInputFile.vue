<script setup lang="ts">
import { useField } from "vee-validate";

import IconCamera from "@/components/icons/IconCamera.vue";
import { computed, ref, onMounted } from "vue";

const props = defineProps<{
  name: string;
}>();

const { value, errorMessage, meta } = useField<string>(
  () => props.name as string,
);

const isMobileWidth = ref<boolean>(false);

const dynamicHeading = computed((): string => {
  return isMobileWidth.value
    ? "Upload image"
    : "Drag & drop your image here or";
});

const posterInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = (): void => {
  if (posterInput.value) {
    posterInput.value.click();
  }
};

const posterPreview = ref<string>("");

const onPosterChange = async (event: Event) => {
  const imagePreview = (event.currentTarget as HTMLInputElement).files?.[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    posterPreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(imagePreview as Blob);
};

onMounted((): void => {
  isMobileWidth.value = window.innerWidth < 700;
});
</script>

<template>
  <div
    class="relative flex items-center gap-2 border border:shade-of-gray rounded py-4 px-3"
  >
    <img
      v-if="posterPreview"
      class="w-1/2 h-36"
      :src="posterPreview"
      alt="Poster preview"
    />
    <div
      :class="{ 'flex-col': posterPreview }"
      class="flex items-center flex-1 gap-5"
    >
      <span
        v-if="posterPreview"
        @click="triggerFileInput"
        class="text-gray-400 text-xs sm:text-xl font-bold"
        >Replace photo</span
      >
      <div class="flex items-center justify-center gap-2">
        <IconCamera />
        <span class="text-white text-xl">{{ dynamicHeading }}</span>
      </div>
      <label
        :for="props.name"
        @click="triggerFileInput"
        class="ml-auto sm:ml-2 whitespace-nowrap bg-custom-purple transition-colors duration-300 hover:bg-purple-800 text-white rounded-[2px] p-2.5 text-lg"
      >
        Choose file
      </label>
      <input
        @change="onPosterChange"
        ref="posterInput"
        type="file"
        name="avatar"
        class="hidden"
      />
    </div>
  </div>
</template>
