<script setup lang="ts">
import IconNotification from "@/components/icons/IconNotification.vue";
import NotificationsItem from "@/components/notifications/NotificationsItem.vue";

import { useWindowWidth } from "@/components/composables/useWindowWidth";
import { computed } from "vue";

import { useNotificationStore } from "@/stores/notifications";
import { onMounted } from "vue";

import IconBlackTriangleVue from "@/components/icons/IconBlackTriangle.vue";

import type { Notification } from "@/plugins/typescript/types";
import { watch } from "vue";

const notificationStore = useNotificationStore();

const windowWidth = useWindowWidth();

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

const markAllNotificationsAsRead = (): void => {
  notificationStore.readAllNotifications();
  notificationStore.toggleNotifications();
};

watch(
  () => notificationStore.showNotifications,
  (newValue: boolean) => {
    if (newValue) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  },
);

onMounted((): void => {
  notificationStore.fetchNotifications();
});
</script>

<template>
  <div class="relative">
    <IconNotification
      @click="notificationStore.toggleNotifications"
      :width="notificationDynamicWidth"
      :height="notificationDynamicHeight"
      class="cursor-pointer"
    />
    <IconBlackTriangleVue
      v-if="notificationStore.showNotifications"
      class="absolute left-1/2 bottom-0 transform translate-y-[2.8rem] sm:translate-y-12 -translate-x-1/2 z-50"
    />
    <span
      v-if="unreadNotificationsCount !== '0'"
      class="pointer-events-none text-sm sm:text-base font-medium text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E33812] flex items-center justify-center absolute top-0 right-0 transform -translate-y-1/3 translate-x-1/3"
    >
      {{ unreadNotificationsCount }}
    </span>
    <Teleport to="body">
      <div
        v-if="notificationStore.showNotifications"
        class="z-50 py-8 sm:py-14 px-8 rounded-xl absolute top-[5.5rem] sm:top-0 right-0 sm:translate-y-24 sm:-translate-x-16 transform bg-black h-auto w-full sm:w-[60rem]"
      >
        <div class="w-full flex items-center justify-between">
          <span
            class="text-xl sm:text-3xl font-medium text-white pointer-events-none"
            >{{ $t("general.notifications") }}</span
          >
          <span
            @click="markAllNotificationsAsRead()"
            class="text-sm sm:text-xl text-white underline cursor-pointer transition-all duration-300 hover:no-underline"
            >{{ $t("general.mark_all_read") }}</span
          >
        </div>
        <div
          class="pt-8 flex flex-col gap-4 overflow-y-scroll gray-scrollbar h-[52.87rem] sm:h-[44rem]"
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
          <span
            v-if="!notificationStore.notifications"
            class="uppercase text-white text-base sm:text-2xl text-center mt-8"
            >{{ $t("general.no_notifications_yet") }}</span
          >
        </div>
      </div>
    </Teleport>
  </div>
</template>
