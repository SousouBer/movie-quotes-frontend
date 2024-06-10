<script setup lang="ts">
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

import { Form as CommentForm, useField } from "vee-validate";

const { value } = useField<string>(() => '"comment"' as string);
</script>

<template>
  <CommentForm class="flex items-center gap-4">
    <BaseUserDetails :isNewsFeedUser="true" :showUsername="false" />
    <input
      class="bg-grayish-purple w-full outline-none text-base sm:text-xl text-white rounded-[10px] px-4 sm:px-8 py-2 sm:py-3"
      type="text"
      placeholder="Write a comment"
      v-model="value"
    />
  </CommentForm>
</template>
