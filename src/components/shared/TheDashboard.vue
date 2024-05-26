<script setup lang="ts">
import IconHouse from "@/components/icons/IconHouse.vue";
import IconMovie from "@/components/icons/IconMovie.vue";

import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<template>
  <aside class="bg-blueish-black px-16 py-8 w-96">
    <div class="flex items-center gap-5 cursor-pointer mb-10">
      <div class="w-14 h-14 rounded-full border border-red-600 overflow-hidden">
        <img
          class="bg-white w-full h-full"
          :src="userStore.getUser?.avatar"
          alt="User Avatar"
        />
      </div>
      <div class="flex flex-col justify-center">
        <span class="text-2xl text-white">{{
          userStore.getUser?.username
        }}</span>
        <span class="text-base text-gray-300">Edit your profile</span>
      </div>
    </div>
    <div class="flex flex-col justify-center gap-10 pl-2">
      <div class="text-white flex items-center gap-6 cursor-pointer">
        <IconHouse />
        <span class="pt-[0.5rem]">News Feed</span>
      </div>
      <div class="text-white flex items-center gap-6 cursor-pointer w-auto">
        <IconMovie />
        <span class="pt-[0.5rem]">List of Movies</span>
      </div>
    </div>
  </aside>
</template>
