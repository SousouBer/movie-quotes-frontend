<script setup lang="ts">
import IconNotification from "@/components/icons/IconNotification.vue";
import NotificationsItem from "@/components/notifications/NotificationsItem.vue";

import { useWindowWidth } from "@/components/composables/useWindowWidth";
import { computed } from "vue";

import { useNotificationStore } from "@/stores/notifications";
import { onMounted } from "vue";

import IconBlackTriangleVue from "@/components/icons/IconBlackTriangle.vue";
import { ref } from "vue";

import type { Notification } from "@/plugins/typescript/types";

const notificationStore = useNotificationStore();

const windowWidth = useWindowWidth();
const showNotifications = ref<boolean>(false);

const toggleNotifications = (): void => {
  showNotifications.value = !showNotifications.value;
};

const notificationDynamicWidth = computed((): string =>
  windowWidth.value < 700 ? "24" : "28",
);
const notificationDynamicHeight = computed((): string =>
  windowWidth.value < 700 ? "24" : "32",
);

const unreadNotificationsCount = computed((): string => {
  return notificationStore.notifications
    ?.filter((notification: Notification) => !notification.is_read)
    .length.toString() as string;
});

onMounted((): void => {
  notificationStore.fetchNotifications();
});
</script>

<template>
  <div class="relative">
    <IconNotification
      @click="toggleNotifications"
      :width="notificationDynamicWidth"
      :height="notificationDynamicHeight"
      class="cursor-pointer"
    />
    <IconBlackTriangleVue
      v-if="showNotifications"
      class="absolute left-1/2 bottom-0 transform translate-y-12 -translate-x-1/2 z-50"
    />
    <span
      class="pointer-events-none font-medium text-white w-6 h-6 rounded-full bg-[#E33812] flex items-center justify-center absolute top-0 right-0 transform -translate-y-1/3 translate-x-1/3"
    >
      {{ unreadNotificationsCount }}
    </span>
    <Teleport to="body">
      <div
        v-if="showNotifications"
        class="z-50 py-14 px-8 rounded-xl absolute top-0 right-0 translate-y-24 -translate-x-16 transform bg-black h-[50.75rem] w-[60rem]"
      >
        <div class="w-full flex items-center justify-between">
          <span class="text-3xl font-medium text-white pointer-events-none"
            >Notifications</span
          >
          <span
            class="text-xl text-white underline cursor-pointer transition-all duration-300 hover:no-underline"
            >Mark all as read</span
          >
        </div>
        <div
          class="pt-8 flex flex-col gap-4 h-full overflow-y-scroll no-scrollbar"
        >
          <NotificationsItem
            v-for="(notification, index) in notificationStore.notifications"
            :key="index"
            :id="notification.id"
            :quote_id="notification.quote_id"
            :author_avatar="notification.author_avatar"
            :author_username="notification.author_username"
            :comment_received="notification.comment_received as string"
            :like_received="notification.like_received as string"
            :is_read="notification.is_read"
            :time_created="notification.time_created"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
