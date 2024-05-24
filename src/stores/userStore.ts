import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";

import { user as userAuth } from "@/services/auth";

type User = {
  avatar: string;
  username: string;
  email: string;
  is_google_account?: string;
};

export const useUserStore = defineStore("userStore", () => {
  const user = ref<User | null>(null);

  const getUser = computed(() => user.value);

  function setUser(userID: User | null): void {
    user.value = userID;
  }

  async function fetchUser(): Promise<void> {
    try {
      const response = await userAuth();
      const fetchedUser = response.data.data;

      setUser(fetchedUser);
    } catch (error: any) {}
  }

  return {
    user,
    getUser,
    setUser,
    fetchUser,
  };
});
