import { defineStore } from "pinia";
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

  function setUser(user: User): void {
    user.value = user;
  }

  async function fetchUser() {
    try {
      const response = await userAuth();
      const fetchedUser = fetchedUser.data.data;
      setUser(fetchedUser);
    } catch (error: any) {}
  }

  return { user, getUser, setUser, fetchUser };
});
