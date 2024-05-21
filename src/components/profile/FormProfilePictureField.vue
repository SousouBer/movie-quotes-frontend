<script setup lang="ts">
const props = defineProps<{
  avatar: string;
}>();
</script>

<template>
  <div class="flex items-center flex-col mt-8 gap-1">
    <div class="w-48 h-48 rounded-full border mb-2 overflow-hidden">
      <img :src="props.avatar" alt="Profile picture" />
    </div>
    <span class="text-xl text-white">Upload new photo</span>
  </div>
</template>
