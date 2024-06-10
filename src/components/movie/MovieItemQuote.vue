<script setup lang="ts">
import IconThreeDots from "@/components/icons/IconThreeDots.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconEyeOpened from "@/components/icons/IconEyeOpened.vue";
import IconLike from "@/components/icons/IconLike.vue";
import IconComment from "@/components/icons/IconComment.vue";

import { computed, ref } from "vue";

import { useQuoteStore } from "@/stores/quote";
import { useMovieStore } from "@/stores/movie";

const quoteStore = useQuoteStore();
const movieStore = useMovieStore();

const props = defineProps<{
  id: number;
  quote: string;
  picture: string;
  likesCount: string;
  commentsCount: string;
}>();

const showActionsModal = ref<boolean>(false);

const toggleActionsModal = (): void => {
  showActionsModal.value = !showActionsModal.value;
};

// Set current movie to selected movie for quote when editing.
const selectMovie = (): void => {
  const currentMovie = movieStore.singleMovie;

  if (currentMovie) {
    quoteStore.setQuoteMovie(currentMovie);
  }
};

const showEditQuoteModal = (): void => {
  selectMovie();
  quoteStore.getEditQuoteData(props.id);
  quoteStore.setShowQuoteModal(true);
  quoteStore.setQuoteModalMode("edit");
};

const iconsDynamicWidthAndHeight = computed((): string =>
  window.innerWidth < 700 ? "24" : "32",
);
</script>

<template>
  <div
    class="bg-dark-shade-of-blue sm:rounded-[10px] sm:w-[55%] p-8 pb-5 relative"
  >
    <div
      class="relative flex flex-col sm:flex-row gap-10 sm:items-center border-b border-[#EFEFEF33] pb-8"
    >
      <div class="h-36 w-full sm:w-56 rounded-sm overflow-hidden">
        <img class="h-full w-full" :src="props.picture" alt="Quote picture" />
      </div>
      <span class="text-2xl text-gray-300">{{ props.quote }} </span>
      <span
        @click.self="toggleActionsModal"
        class="flex items-center justify-center absolute transition -bottom-16 sm:top-0 right-0 transform -translate-y-1/3 translate-x-1/3 cursor-pointer w-10 h-10 rounded-full bg-transparent duration-200 hover:bg-gray-800"
      >
        <IconThreeDots class="pointer-events-none" />
      </span>
    </div>
    <div class="flex items-end gap-8 mt-4">
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ props.commentsCount }}</span>
        <IconComment
          :width="iconsDynamicWidthAndHeight"
          :height="iconsDynamicWidthAndHeight"
          class="cursor-pointer"
        />
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ props.likesCount }}</span>
        <IconLike
          :width="iconsDynamicWidthAndHeight"
          :height="iconsDynamicWidthAndHeight"
          class="cursor-pointer"
        />
      </div>
    </div>
    <div
      @click="toggleActionsModal"
      v-if="showActionsModal"
      class="absolute right-6 top-[8.5rem] sm:top-12 sm:-right-[12rem] flex flex-col justify-center gap-7 p-8 bg-custom-gray-900 rounded-[10px] w-[15.62rem]"
    >
      <div
        @click="quoteStore.viewQuote(props.id)"
        class="flex items-center gap-4 cursor-pointer"
      >
        <IconEyeOpened height="20" width="20" />
        <span class="text-white whitespace-nowrap">View Quote</span>
      </div>
      <div
        @click="showEditQuoteModal"
        class="flex items-center gap-4 cursor-pointer"
      >
        <IconEdit />
        <span class="text-white">Edit</span>
      </div>
      <div
        @click="quoteStore.removeQuote(props.id)"
        class="flex items-center gap-4 cursor-pointer"
      >
        <IconDelete />
        <span class="text-white">Delete</span>
      </div>
    </div>
  </div>
</template>
