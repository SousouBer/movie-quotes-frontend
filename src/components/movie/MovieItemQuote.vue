<script setup lang="ts">
import IconThreeDots from "@/components/icons/IconThreeDots.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconEyeOpened from "@/components/icons/IconEyeOpened.vue";
import { ref } from "vue";

const props = defineProps<{
  quote: string;
  picture: string;
  likesCount: number;
  commentsCount: number;
}>();

const showActionsModal = ref<boolean>(false);

const toggleActionsModal = (): void => {
  showActionsModal.value = !showActionsModal.value;
};
</script>

<template>
  <div class="bg-dark-shade-of-blue rounded-[10px] sm:w-[60%] p-8">
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
        v-if="showActionsModal"
        class="absolute bottom-0 right-0 sm:top-4 sm:-right-[14.5rem] flex flex-col gap-6 p-6 border border-gray-300 w-64"
      >
        <div class="flex items-center gap-4">
          <IconEyeOpened height="20" width="20" />
          <span class="text-white whitespace-nowrap">View Quote</span>
        </div>
        <div class="flex items-center gap-4">
          <IconEdit />
          <span class="text-white">Edit</span>
        </div>
        <div class="flex items-center gap-4">
          <IconDelete />
          <span class="text-white">Delete</span>
        </div>
      </div>
    </div>
    <!-- Here will go comments and likes icons -->
  </div>
</template>
