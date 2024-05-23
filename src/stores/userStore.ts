import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";

import { user as userAuth } from "@/services/auth";

type User = {
  avatar: string;
  username: string;
  email: string;
  is_google_account?: string;
};

export const useUserStore = defineStore("userStoree", () => {
  const user = ref<User | null>(null);

  const getUser = computed(() => user.value);

  function setUser(userID: User) {
    user.value = userID;
  }

  async function fetchUser() {
    try {
      // console.log("triggered");
      const response = await userAuth();
      const fetchedUser = response.data.data;
      setUser(fetchedUser);
      console.log(response.data.data);
    } catch (error: any) {}
  }

  return {
    user,
    getUser,
    setUser,
    fetchUser,
  };
});
