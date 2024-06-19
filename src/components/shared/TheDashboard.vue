<script setup lang="ts">
import IconHouse from "@/components/icons/IconHouse.vue";
import IconMovie from "@/components/icons/IconMovie.vue";

import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";
import { useWindowWidth } from "../composables/useWindowWidth";

const windowWidth = useWindowWidth();

const router = useRouter();
const route = useRoute();

const isProfileRoute = computed((): boolean => route.name === "profile");
const isMoviesRoute = computed((): boolean => route.name === "movies");
const isNewsFeedRoute = computed((): boolean => route.name === "newsFeed");

const iconsDynamicWidth = computed((): string =>
  windowWidth.value < 700 ? "24" : "32",
);
const iconsDynamicHeight = computed((): string =>
  windowWidth.value < 700 ? "24" : "32",
);

const dashboardDynamicWidth = computed((): string =>
  (isNewsFeedRoute.value || isProfileRoute) && windowWidth.value > 700
    ? "w-[27%]"
    : "w-96",
);

const userStore = useUserStore();
</script>

<template>
  <aside :class="dashboardDynamicWidth" class="bg-grayish-blue px-14 py-8">
    <div
      @click="router.push({ name: 'profile' })"
      class="flex items-center gap-5 cursor-pointer mb-10"
    >
      <div
        :class="{ 'border border-red-600': isProfileRoute }"
        class="w-10 sm:w-14 h-10 sm:h-14 rounded-full overflow-hidden"
      >
        <img
          class="bg-white w-full h-full"
          :src="userStore.getUser?.avatar"
          alt="User Avatar"
        />
      </div>
      <div class="flex flex-col justify-center">
        <span class="text-xl sm:text-2xl text-white">{{
          userStore.getUser?.username
        }}</span>
        <span class="text-sm sm:text-base text-gray-300 whitespace-nowrap">{{
          $t("general.edit_your_profile")
        }}</span>
      </div>
    </div>
    <div class="flex flex-col justify-center gap-12 pl-2">
      <div
        @click="router.push({ name: 'newsFeed' })"
        class="text-white flex items-center gap-8 cursor-pointer"
      >
        <IconHouse
          :width="iconsDynamicWidth"
          :height="iconsDynamicHeight"
          :color="isNewsFeedRoute ? '#E31221' : 'white'"
        />
        <span class="text-xl sm:text-2xl pt-[0.5rem] whitespace-nowrap">{{
          $t("general.news_feed")
        }}</span>
      </div>
      <div
        @click="router.push({ name: 'movies' })"
        class="text-white flex items-center gap-8 cursor-pointer w-auto"
      >
        <IconMovie
          :width="iconsDynamicWidth"
          :height="iconsDynamicHeight"
          :color="isMoviesRoute ? '#E31221' : 'white'"
        />
        <span class="text-xl sm:text-2xl pt-[0.5rem] whitespace-nowrap">{{
          $t("general.list_of_movies")
        }}</span>
      </div>
    </div>
  </aside>
</template>
