<script setup lang="ts">
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

const props = defineProps<{
  authorAvatar: string;
  authorUsername: string;
  comment: string;
}>();
</script>

<template>
  <div>
    <BaseUserDetails
      :avatar="props.authorAvatar"
      :username="props.authorUsername"
      :isAuthenticatedUser="props.comment === ''"
      :isNewsFeedUser="true"
      class="mt-4 sm:mt-8"
    />
    <p
      class="text-white text-base sm:text-xl sm:ml-20 pb-8 border-b border-[#EFEFEF4D]"
    >
      {{ props.comment }}
    </p>
  </div>
</template>
