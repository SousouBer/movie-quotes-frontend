<script setup lang="ts">
import { useField } from "vee-validate";

import IconCamera from "@/components/icons/IconCamera.vue";
import { computed, ref, onMounted } from "vue";

import { useMovieStore } from "@/stores/movie";

const props = defineProps<{
  name: string;
}>();

const { value } = useField<File>(() => props.name as string);

const movieStore = useMovieStore();

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

const showPosterPreview = computed((): boolean => {
  if (movieStore.movieEditData?.poster) {
    return true;
  } else if (posterPreview.value) {
    return true;
  } else {
    return false;
  }
});

const onPosterChange = async (event: Event) => {
  const imagePreview = (event.currentTarget as HTMLInputElement).files;
  if (imagePreview?.length) {
    handleImageUpload(imagePreview[0]);
  }
};

const handleImageUpload = (image: File): void => {
  const reader = new FileReader();

  reader.onload = (e): void => {
    posterPreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(image);

  value.value = image;

  // Use this value here to toggle error message for the image field in the form.
  movieStore.movieImageIsUploaded = true;
};

const onImageDrop = (event: DragEvent): void => {
  if (event.dataTransfer?.files.length) {
    handleImageUpload(event.dataTransfer.files[0]);
  }
};

onMounted((): void => {
  isMobileWidth.value = window.innerWidth < 700;
});
</script>

<template>
  <div
    @dragover.prevent
    @drop.prevent="onImageDrop"
    class="relative flex items-center gap-2 border border:shade-of-gray rounded py-4 px-3"
  >
    <div
      v-if="showPosterPreview"
      :class="{ 'border border-dashed border-[#DDCCAA]': isMobileWidth }"
      class="w-1/2 h-36 overflow-hidden"
    >
      <img
        class="w-full"
        :src="posterPreview ? posterPreview : movieStore.movieEditData?.poster"
        alt="Poster preview"
      />
    </div>
    <div
      :class="{ 'flex-col': showPosterPreview }"
      class="flex items-center flex-1 gap-5"
    >
      <span
        v-if="showPosterPreview"
        @click="triggerFileInput"
        class="text-[#DDCCAA] text-xs sm:text-base font-bold"
        >Replace photo</span
      >
      <div class="flex items-center justify-center gap-2">
        <IconCamera />
        <span class="text-white text-lg">{{ dynamicHeading }}</span>
      </div>
      <label
        :for="props.name"
        @click="triggerFileInput"
        :class="{ 'ml-auto': !posterPreview }"
        class="sm:ml-2 cursor-pointer whitespace-nowrap bg-custom-purple transition-colors duration-300 hover:bg-purple-800 text-white rounded-[2px] p-2.5 text-lg"
      >
        Choose file
      </label>
      <input
        @change="onPosterChange"
        ref="posterInput"
        type="file"
        :name="props.name"
        class="hidden"
      />
    </div>
  </div>
</template>
