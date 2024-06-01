<script setup lang="ts">
import BaseUserDetails from "@/components/base/BaseUserDetails.vue";

const props = defineProps<{
  comment: string;
}>();
</script>

<template>
  <div>
    <BaseUserDetails class="mt-8" />
    <p class="text-white text-xl ml-20 pb-8 border-b border-[#EFEFEF4D]">
      {{ props.comment }}
    </p>
  </div>
</template>
