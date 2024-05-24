import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { updateProfile } from "@/services/profile";
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/useProfileStore";

import type { SchemaProfile } from "@/plugins/typescript/types";

export const useProfileFormStore = defineStore("profileForm", () => {
  const avatar = ref<FormData | null>(null);
  const username = ref<string>("");
  const password = ref<string>("");
  const password_confirmation = ref<string>("");

  const backendErrors = ref<any>(null);

  const formSubmissionProcess = ref<boolean>(false);

  function setFormSubmissionProcess(value: boolean) {
    formSubmissionProcess.value = value;
  }

  const userStore = useUserStore();
  const profileStore = useProfileStore();

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

      resetFormValues();

      profileStore.resetDesktopInputs();
      userStore.fetchUser();
    } catch (error) {
      console.log(error.response.data.errors);
    }
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
    avatar.value = null;
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
    formSubmissionProcess,
    setFormSubmissionProcess,
  };
});
