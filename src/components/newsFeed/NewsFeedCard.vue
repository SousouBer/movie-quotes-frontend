<script setup lang="ts">
import BaseNewsFeedComment from "@/components/base/newsFeed/BaseNewsFeedComment.vue";
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

import BaseNewsFeedCommentAdd from "@/components/base/newsFeed/BaseNewsFeedCommentAdd.vue";

import IconComment from "@/components/icons/IconComment.vue";
import IconLike from "@/components/icons/IconLike.vue";
</script>

<template>
  <div class="bg-dark-shade-of-blue sm:rounded-xl p-8">
    <BaseUserDetails class="!mt-0 mb-4 sm:mb-8" />
    <span class="text-white text-base sm:text-xl"
      >“Follow your dream.” movie- Billy Elliot. (2000)</span
    >
    <div
      class="w-full overflow-hidden h-52 sm:h-[31.25rem] rounded-[10px] mt-4 sm:mt-8"
    >
      <img
        class="w-full"
        src="/images/dummy-news-feed-img.svg"
        alt="News feed picture"
      />
    </div>
    <div class="flex gap-5 py-6 border-b border-[#EFEFEF4D]">
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">2</span>
        <IconComment class="cursor-pointer" />
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xl text-white">1</span>
        <IconLike class="cursor-pointer" />
      </div>
    </div>
    <div>
      <BaseNewsFeedComment
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu vitae mauris odio eget."
      />
      <BaseNewsFeedComment
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu vitae mauris odio eget."
      />

      <BaseNewsFeedComment
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu vitae mauris odio eget."
      />
    </div>
    <BaseNewsFeedCommentAdd class="w-full mt-8" />
  </div>
</template>
