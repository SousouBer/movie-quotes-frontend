<script setup lang="ts">
import IconModalCancel from "@/components/icons/IconModalCancel.vue";

const props = defineProps<{
  name: string;
}>();
</script>

<template>
  <div
    class="bg-shade-of-gray transition-colors duration-300 hover:bg-gray-600 flex gap-3 items-center justify-center rounded-sm p-0.5 px-2"
  >
    <span class="text-white text-sm">{{ props.name }}</span>
    <IconModalCancel class="cursor-pointer" width="6" height="6" />
  </div>
</template>
