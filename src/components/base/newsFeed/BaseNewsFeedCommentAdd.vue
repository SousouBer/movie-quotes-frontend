<script setup lang="ts">
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

import { Form as CommentForm, useField } from "vee-validate";
import { addComment } from "@/services/quote";
import type { CommentPayload } from "@/plugins/typescript/types";
import axios from "axios";
import { ref } from "vue";

const { value } = useField<string>(() => "comment");

const props = defineProps<{
  quote_id: number;
}>();

const submitCommentButton = ref<HTMLButtonElement | null>(null);

const handleSubmit = async (
  values: any,
  {
    resetForm,
  }: {
    resetForm: () => void;
  },
) => {
  try {
    const commentData: CommentPayload = {
      quote_id: props.quote_id,
      comment: value.value,
    };

    await addComment(commentData);

    resetForm();
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("An error occured: ", error);
    }
  }
};

const triggerSubmit = (event: KeyboardEvent) => {
  event.preventDefault();
  submitCommentButton.value?.click();
};
</script>

<template>
  <CommentForm @submit="handleSubmit" class="flex items-center gap-4">
    <BaseUserDetails :isNewsFeedUser="true" :showUsername="false" />
    {{ value }}
    <input
      name="comment"
      class="bg-grayish-purple w-full outline-none text-base sm:text-xl text-white rounded-[10px] px-4 sm:px-8 py-2 sm:py-3"
      type="text"
      placeholder="Write a comment"
      v-model="value"
      @keyup.enter="triggerSubmit"
    />
    <button ref="submitCommentButton" class="hidden">Submit Form</button>
  </CommentForm>
</template>
