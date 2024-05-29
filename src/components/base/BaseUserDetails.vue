<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<template>
  <div class="flex items-center gap-3 mt-8 mb-2">
    <div class="w-10 h-10 rounded-full border border-red-500">
      <img
        class="h-full w-full"
        :src="userStore.user?.avatar"
        alt="User Avatar"
      />
    </div>
    <span class="text-white text-xl">{{ userStore.user?.email }}</span>
  </div>
</template>
