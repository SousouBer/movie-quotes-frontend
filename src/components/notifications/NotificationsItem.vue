<script setup lang="ts">
import IconQuote from "@/components/icons/IconQuote.vue";

import { useDateFormatter } from "@/components/composables/useDateFormatter";

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

const { timeAgo } = useDateFormatter(props.time_created);
</script>

<template>
  <div
    class="flex items-center gap-4 w-full rounded-[4px] p-5 border border-[#6C757D]"
  >
    <div class="w-20 h-20 rounded-full border-2 border-[#198754]">
      <img
        class="w-full h-full"
        :src="props.author_avatar"
        alt="Author Avatar"
      />
    </div>
    <div class="flex items-center justify-between w-full">
      <div class="flex flex-col gap-3">
        <span class="text-white text-xl">{{ props.author_username }}</span>
        <div class="flex items-center gap-3">
          <IconQuote />
          <span v-if="props.comment_received" class="text-[#CED4DA] text-xl">{{
            props.comment_received
          }}</span>
          <span v-else class="text-[#CED4DA] text-xl">{{
            props.like_received
          }}</span>
        </div>
      </div>
      <div class="flex flex-col items-end gap-2">
        <span class="text-xl text-[#D9D9D9]">{{ timeAgo }}</span>
        <span v-if="!is_read" class="text-xl text-[#198754]">Now</span>
      </div>
    </div>
  </div>
</template>
