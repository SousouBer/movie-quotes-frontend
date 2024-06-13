import { defineStore } from "pinia";
import { ref } from "vue";

import { getNotifications } from "@/services/notification";
import type { Notification } from "@/plugins/typescript/types";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[] | null>(null);

  function setNotifications(value: Notification[] | null): void {
    notifications.value = value;
  }

  function addNotification(value: Notification): void {
    notifications.value?.unshift(value);
  }

  async function fetchNotifications(): Promise<void> {
    try {
      const response = await getNotifications();
      const fetchedNotifications: Notification[] = response.data.data;

      setNotifications(fetchedNotifications);
    } catch (error: any) {
      console.error("Error fetching user:", error);
    }
  }

  return {
    notifications,
    setNotifications,
    addNotification,
    fetchNotifications,
  };
});
