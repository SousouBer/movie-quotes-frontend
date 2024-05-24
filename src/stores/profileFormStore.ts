import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { updateProfile } from "@/services/profile";
import { useUserStore } from "@/stores/userStore";

import type { SchemaProfile } from "@/plugins/typescript/types";

export const useProfileFormStore = defineStore("profileForm", () => {
  const avatar = ref<FormData | null>(null);
  const username = ref<string>("");
  const password = ref<string>("");
  const password_confirmation = ref<string>("");

  const userStore = useUserStore();

  const getProfileFormValues = computed(() => {
    const formValues: Record<string, string> = {};

    if (avatar.value) {
      formValues.avatar = avatar.value;
    }
    if (username.value) {
      formValues.username = username.value;
    }
    if (password.value) {
      formValues.password = password.value;
    }
    if (password_confirmation.value) {
      formValues.password_confirmation = password_confirmation.value;
    }

    return formValues;
  });

  async function handleFormSubmit() {
    try {
      await updateProfile(getProfileFormValues.value);

      userStore.fetchUser();
    } catch (error) {}
  }

  function changeFormValues(field: string, value: string | File) {
    switch (field) {
      case "avatar":
        avatar.value = value;
        break;
      case "username":
        username.value = value;
        break;
      case "password":
        password.value = value;
        break;
      case "password_confirmation":
        password_confirmation.value = value;
        break;
    }
  }

  function resetFormValues() {
    username.value = "";
    password.value = "";
    password_confirmation.value = "";
  }

  return {
    avatar,
    username,
    password,
    password_confirmation,
    handleFormSubmit,
    changeFormValues,
    resetFormValues,
  };
});
