<script setup lang="ts">
import BaseNewsFeedComment from "@/components/base/newsFeed/BaseNewsFeedComment.vue";
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

import BaseNewsFeedCommentAdd from "@/components/base/newsFeed/BaseNewsFeedCommentAdd.vue";

import IconComment from "@/components/icons/IconComment.vue";
import IconLike from "@/components/icons/IconLike.vue";

import type { QuoteMovie, Comment, QuoteAuthor } from "@/store/quote";

const props = defineProps<{
  quote: string;
  picture: string;
  quoteAuthor: QuoteAuthor;
  movie: QuoteMovie;
  commentsCount: string;
  likesCount: string;
  comments?: Comment[];
}>();
</script>

<template>
  <div class="bg-dark-shade-of-blue sm:rounded-xl p-8">
    <BaseUserDetails class="!mt-0 mb-4 sm:mb-8" />
    <span class="text-white text-base sm:text-xl">{{
      `${props.quote}. movie - ${props.movie.title}. (${props.movie.year})`
    }}</span>
    <div
      class="w-full overflow-hidden h-52 sm:h-[31.25rem] rounded-[10px] mt-4 sm:mt-8"
    >
      <img class="w-full" :src="props.picture" alt="News feed picture" />
    </div>
    <div class="flex gap-5 py-6 border-b border-[#EFEFEF4D]">
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ props.commentsCount }}</span>
        <IconComment class="cursor-pointer" />
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">{{ props.likesCount }}</span>
        <IconLike class="cursor-pointer" />
      </div>
    </div>
    <div>
      <BaseNewsFeedComment
        v-for="(comment, index) in props.comments"
        :key="index"
        :comment="comment.comment"
        :authorAvatar="comment.author.avatar"
        :authorUsername="comment.author.username"
      />
    </div>
    <BaseNewsFeedCommentAdd class="w-full mt-8" />
  </div>
</template>
