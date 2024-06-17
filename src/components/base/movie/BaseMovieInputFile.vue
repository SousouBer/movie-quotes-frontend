<script setup lang="ts">
import { useField } from "vee-validate";

import IconCamera from "@/components/icons/IconCamera.vue";
import { computed, ref, onMounted } from "vue";

import { useMovieStore } from "@/stores/movie";

import { useI18n } from "vue-i18n";

import { useWindowWidth } from "@/components/composables/useWindowWidth";

const { t } = useI18n();

const props = defineProps<{
  name: string;
  isQuoteEditField?: boolean;
}>();

const { value } = useField<File>(() => props.name as string);

const movieStore = useMovieStore();

const windowWidth = useWindowWidth();
const isMobileWidth = ref<boolean>(windowWidth.value < 700);

const dynamicHeading = computed((): string => {
  return isMobileWidth.value
    ? t("movie.movie_form_add.upload_image")
    : t("movie.movie_form_add.drag_and_drop");
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

const dynamicIconValues = computed(() =>
  windowWidth.value < 700 ? "24" : "32",
);
</script>

<template>
  <div
    @dragover.prevent
    @drop.prevent="onImageDrop"
    class="relative flex items-center gap-2 border border-shade-of-gray rounded p-5"
  >
    <div
      v-if="showPosterPreview"
      class="w-1/2 h-36 overflow-hidden border border-dashed border-[#DDCCAA]"
    >
      <img
        class="w-full"
        :src="posterPreview ? posterPreview : movieStore.movieEditData?.poster"
        alt="Poster preview"
      />
    </div>
    <div
      v-if="!isQuoteEditField"
      :class="{ 'flex-col': showPosterPreview }"
      class="flex items-center flex-1 gap-5"
    >
      <span
        v-if="showPosterPreview"
        @click="triggerFileInput"
        class="text-[#DDCCAA] text-xs sm:text-base font-bold"
      >
        {{ $t("movie.movie_form_add.replace_photo") }}
      </span>
      <div class="flex items-center justify-center gap-2">
        <IconCamera :width="dynamicIconValues" :height="dynamicIconValues" />
        <span class="text-white text-base sm:text-lg whitespace-nowrap">{{
          dynamicHeading
        }}</span>
      </div>
      <label
        :for="props.name"
        @click="triggerFileInput"
        :class="{ 'ml-auto': !posterPreview }"
        class="sm:ml-2 cursor-pointer whitespace-nowrap bg-custom-purple transition-colors duration-300 hover:bg-purple-800 text-white rounded-[2px] p-2.5 text-base sm:text-lg"
      >
        {{ $t("movie.movie_form_add.choose_file") }}
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
