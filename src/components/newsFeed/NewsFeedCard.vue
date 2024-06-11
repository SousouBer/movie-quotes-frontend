<script setup lang="ts">
import BaseNewsFeedComment from "@/components/base/newsFeed/BaseNewsFeedComment.vue";
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

import BaseNewsFeedCommentAdd from "@/components/base/newsFeed/BaseNewsFeedCommentAdd.vue";

import IconComment from "@/components/icons/IconComment.vue";
import IconLike from "@/components/icons/IconLike.vue";

import type {
  QuoteAuthor,
  QuoteMovie,
  Comment,
} from "@/plugins/typescript/types";
import { computed } from "vue";

const props = defineProps<{
  quote_id: number;
  quote?: string;
  picture: string;
  quoteAuthor?: QuoteAuthor;
  movie: QuoteMovie;
  commentsCount: string;
  likesCount: string;
  comments?: Comment[];
}>();

const iconDynamicHeightAndWidth = computed(() => {
  return window.innerWidth < 700 ? "24" : "30";
});
</script>

<template>
  <div
    :class="{ '!p-0': !props.quote }"
    class="bg-dark-shade-of-blue sm:rounded-xl p-8"
  >
    <BaseUserDetails
      v-if="props.quoteAuthor"
      :username="quoteAuthor?.username"
      :avatar="quoteAuthor?.avatar as string"
      :isAuthenticatedUser="false"
      :isNewsFeedUser="true"
      class="!mt-0 !mb-4 !sm:mb-6"
    />
    <span v-if="props.quote" class="text-white text-base sm:text-xl">{{
      `${props.quote}. movie - ${props.movie.title}. (${props.movie.year})`
    }}</span>
    <div
      :class="{ '!mt-0': !props.quote }"
      class="w-full overflow-hidden h-52 sm:h-[31.25rem] rounded-[10px] mt-4 sm:mt-8"
    >
      <img class="w-full" :src="props.picture" alt="News feed picture" />
    </div>
    <div class="flex gap-7 py-6 border-b border-[#EFEFEF4D]">
      <div class="flex items-end gap-3">
        <span class="text-xl text-white">{{ props.commentsCount }}</span>
        <IconComment
          :width="iconDynamicHeightAndWidth"
          :height="iconDynamicHeightAndWidth"
          class="cursor-pointer"
        />
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ props.likesCount }}</span>
        <IconLike
          :width="iconDynamicHeightAndWidth"
          :height="iconDynamicHeightAndWidth"
          class="cursor-pointer"
        />
      </div>
    </div>
    <div>
      <BaseNewsFeedComment
        v-for="(comment, index) in props.comments"
        :key="index"
        :comment="comment.comment"
        :authorAvatar="comment.author.avatar as string"
        :authorUsername="comment.author.username"
      />
    </div>
    <BaseNewsFeedCommentAdd :quote_id="quote_id" class="w-full mt-4 sm:mt-8" />
  </div>
</template>
