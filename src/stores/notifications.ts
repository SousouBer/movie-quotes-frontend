import { defineStore } from "pinia";
import { ref } from "vue";

import {
  getNotifications,
  markNotificationAsRead,
} from "@/services/notification";
import type { Notification } from "@/plugins/typescript/types";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[] | null>(null);

  const showNotifications = ref<boolean>(false);

  function toggleNotifications(): void {
    showNotifications.value = !showNotifications.value;
  }

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

  async function readNotification(id: number): Promise<void> {
    try {
      await markNotificationAsRead(id);

      fetchNotifications();
    } catch (error: any) {
      console.error("Error fetching user:", error);
    }
  }

  return {
    notifications,
    showNotifications,
    setNotifications,
    addNotification,
    fetchNotifications,
    toggleNotifications,
    readNotification,
  };
});
