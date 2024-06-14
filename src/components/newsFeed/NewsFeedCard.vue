<script setup lang="ts">
import BaseNewsFeedComment from "@/components/base/newsFeed/BaseNewsFeedComment.vue";
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

import BaseNewsFeedCommentAdd from "@/components/base/newsFeed/BaseNewsFeedCommentAdd.vue";

import IconComment from "@/components/icons/IconComment.vue";
import IconLike from "@/components/icons/IconLike.vue";
import IconLiked from "@/components/icons/IconLiked.vue";

import type {
  QuoteAuthor,
  QuoteMovie,
  Comment,
} from "@/plugins/typescript/types";
import { computed, ref } from "vue";
import { useQuoteStore } from "@/stores/quote";
import { watch } from "vue";
import { nextTick } from "vue";

const props = defineProps<{
  quote_id: number;
  is_liked?: boolean;
  quote?: string;
  picture: string;
  quoteAuthor?: QuoteAuthor;
  movie: QuoteMovie;
  commentsCount: string;
  likesCount: string;
  comments?: Comment[];
  isQuoteViewCard?: boolean;
}>();

const quoteStore = useQuoteStore();

const iconDynamicHeightAndWidth = computed((): string => {
  return window.innerWidth < 700 ? "24" : "30";
});

const dynamicPosterHeight = computed((): string => {
  return props.isQuoteViewCard ? "h-52" : "h-[18.875rem]";
});

const likeOrUnlikeQuote = (): void => {
  quoteStore.likeQuote(props.quote_id);
};

const commentsContainer = ref<HTMLElement | null>(null);

watch(
  () => props.comments,
  async (newComments: Comment[] | undefined) => {
    if (newComments) {
      await nextTick();
      scrollToBottom();
    }
  },
);

const scrollToBottom = (): void => {
  if (commentsContainer.value) {
    commentsContainer.value.scrollTop = commentsContainer.value.scrollHeight;
  }
};
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
    <span v-if="props.quote" class="text-white text-base sm:text-xl"
      >{{ `${props.quote}. movie -` }}
      <span class="text-warm-gray">
        {{ props.movie.title }}
      </span>
      {{ props.movie.year }}
    </span>
    <div
      :class="{ '!mt-0': !props.quote, dynamicPosterHeight }"
      class="w-full overflow-hidden sm:h-[31.25rem] rounded-[10px] mt-4 sm:mt-8"
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
        <IconLiked
          v-if="props.is_liked"
          @click="likeOrUnlikeQuote"
          :width="iconDynamicHeightAndWidth"
          :height="iconDynamicHeightAndWidth"
          class="cursor-pointer"
        />
        <IconLike
          v-else
          @click="likeOrUnlikeQuote"
          :width="iconDynamicHeightAndWidth"
          :height="iconDynamicHeightAndWidth"
          class="cursor-pointer"
        />
      </div>
    </div>
    <div ref="commentsContainer" class="overflow-y-scroll max-h-[23rem]">
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
