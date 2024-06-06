<script setup lang="ts">
import { useField } from "vee-validate";

import IconCamera from "@/components/icons/IconCamera.vue";

import { ref } from "vue";

const { value } = useField<File>(() => "picture");

import { useQuoteStore } from "@/stores/quote";

const quoteStore = useQuoteStore();

const pictureInput = ref<HTMLInputElement | null>(null);

const picturePreview = ref<string>("");

const triggerFileInput = (): void => {
  if (pictureInput.value) {
    pictureInput.value.click();
  }
};

const onPosterChange = async (event: Event) => {
  const imagePreview = (event.currentTarget as HTMLInputElement).files;
  if (imagePreview?.length) {
    handleImageUpload(imagePreview[0]);
  }
};

const handleImageUpload = (image: File): void => {
  const reader = new FileReader();

  reader.onload = (e): void => {
    picturePreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(image);

  value.value = image;
};

const onImageDrop = (event: DragEvent): void => {
  if (event.dataTransfer?.files.length) {
    handleImageUpload(event.dataTransfer.files[0]);
  }
};
</script>

<template>
  <div @dragover.prevent @drop.prevent="onImageDrop" class="relative w-full">
    <div class="h-[18.75rem] sm:h-[31.875rem] rounded-[10px] overflow-hidden">
      <img
        class="w-full h-full"
        :src="
          picturePreview ? picturePreview : quoteStore.editQuoteData?.picture
        "
        alt="Quote Picture"
      />
    </div>
    <div
      @click="triggerFileInput"
      class="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-transparent-gray-gradient flex flex-col items-center justify-center gap-2 rounded-[10px] p-4"
    >
      <IconCamera />
      <span class="text-white text-base">Change Photo</span>
    </div>
    <input
      @change="onPosterChange"
      ref="pictureInput"
      class="hidden"
      type="file"
      name="picture"
    />
  </div>
</template>
