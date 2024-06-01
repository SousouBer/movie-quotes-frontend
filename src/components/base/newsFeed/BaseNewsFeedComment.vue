<script setup lang="ts">
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

const props = defineProps<{
  comment: string;
}>();
</script>

<template>
  <div>
    <BaseUserDetails class="my-4 sm:mt-8" />
    <p
      class="text-white text-base sm:text-xl sm:ml-20 pb-8 border-b border-[#EFEFEF4D]"
    >
      {{ props.comment }}
    </p>
  </div>
</template>
