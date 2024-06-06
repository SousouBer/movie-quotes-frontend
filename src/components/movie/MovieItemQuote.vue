<script setup lang="ts">
import IconThreeDots from "@/components/icons/IconThreeDots.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconEyeOpened from "@/components/icons/IconEyeOpened.vue";
import IconLike from "@/components/icons/IconLike.vue";
import IconComment from "@/components/icons/IconComment.vue";

import { ref } from "vue";

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
</script>

<template>
  <div class="bg-dark-shade-of-blue rounded-[10px] sm:w-[60%] p-8 pb-4">
    <div
      class="relative flex flex-col sm:flex-row gap-10 items-center border-b border-[#EFEFEF33] pb-8"
    >
      <div class="h-36 w-full sm:w-56 rounded-sm overflow-hidden">
        <img class="h-full w-full" :src="props.picture" alt="Quote picture" />
      </div>
      <span class="text-2xl text-gray-300">{{ props.quote }} </span>
      <IconThreeDots
        @click.self="toggleActionsModal"
        class="absolute -bottom-8 sm:top-0 right-0 cursor-pointer"
      />
      <div
        @click="toggleActionsModal"
        v-if="showActionsModal"
        class="absolute bottom-0 right-0 sm:top-4 sm:-right-[14.5rem] flex flex-col justify-center gap-6 px-10 bg-custom-gray-900 rounded-[10px]"
      >
        <div class="flex items-center gap-4 cursor-pointer">
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
    <div class="flex items-end gap-8 mt-4">
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ props.commentsCount }}</span>
        <IconComment class="cursor-pointer" />
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ props.likesCount }}</span>
        <IconLike class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>
