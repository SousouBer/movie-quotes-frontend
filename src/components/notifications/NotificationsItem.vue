<script setup lang="ts">
import IconQuote from "@/components/icons/IconQuote.vue";
import IconLiked from "@/components/icons/IconLiked.vue";

import { useDateFormatter } from "@/components/composables/useDateFormatter";

import { useQuoteStore } from "@/stores/quote";
import { useNotificationStore } from "@/stores/notifications";

const props = defineProps<{
  id: number;
  quote_id: number;
  author_avatar: string;
  author_username: string;
  comment_received?: string;
  like_received?: string;
  is_read?: boolean;
  time_created: string;
}>();

const quoteStore = useQuoteStore();
const notificationStore = useNotificationStore();

const viewQuoteAndMarkAsRead = (): void => {
  notificationStore.readNotification(props.id);
  quoteStore.viewQuote(props.quote_id);
  notificationStore.toggleNotifications();
};

const { timeAgo } = useDateFormatter(props.time_created);
</script>

<template>
  <div
    @click="viewQuoteAndMarkAsRead"
    class="flex items-start sm:items-center gap-4 w-full rounded-[4px] p-4 sm:p-[1.2rem] border border-[#6C757D] cursor-pointer transition-all duration-300 hover:bg-gray-900"
  >
    <div class="flex flex-col text-center flex-shrink-0 justify-between h-full">
      <div
        :class="{ 'border-2 border-[#198754]': !props.is_read }"
        class="max-w-16 max-h-16 sm:max-w-20 sm:max-h-20 rounded-full overflow-hidden mb-2 sm:mb-0 flex-shrink-0"
      >
        <img
          class="w-full h-full"
          :src="props.author_avatar"
          alt="Author Avatar"
        />
      </div>
      <span v-if="!is_read" class="sm:hidden text-base text-[#198754]">{{
        $t("general.new")
      }}</span>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex flex-col gap-2.5">
        <span class="text-white text-xl">{{ props.author_username }}</span>
        <div class="flex items-center gap-3">
          <IconQuote v-if="props.comment_received" />
          <IconLiked v-else />
          <span
            v-if="props.comment_received"
            class="text-[#CED4DA] text-base sm:text-xl"
            >{{ props.comment_received }}</span
          >
          <span v-else class="text-[#CED4DA] text-base sm:text-xl">{{
            props.like_received
          }}</span>
        </div>
        <span class="sm:hidden text-base text-[#D9D9D9]">{{ timeAgo }}</span>
      </div>
      <div class="hidden sm:flex flex-col items-end justify-start gap-2">
        <span class="text-xl text-[#D9D9D9]">{{ timeAgo }}</span>
        <span v-if="!is_read" class="text-xl text-[#198754]">{{
          $t("general.new")
        }}</span>
      </div>
    </div>
  </div>
</template>
