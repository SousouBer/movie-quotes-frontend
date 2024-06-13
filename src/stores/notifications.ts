import { defineStore } from "pinia";
import { ref } from "vue";

import { getNotifications } from "@/services/notification";

type Notification = {
  id: number;
  quote_id: number;
  author_avatar: string;
  like_received?: boolean;
  comment_received?: boolean;
  is_read?: boolean;
  time_created: string;
};

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[] | null>(null);

  function setNotifications(value: Notification[] | null): void {
    notifications.value = value;
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
    fetchNotifications,
  };
});
