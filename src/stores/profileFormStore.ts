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

  const backendErrors = ref<any>();

  const formSubmissionProcess = ref<boolean>(false);
  const showSuccessModal = ref<boolean>(false);

  function setFormSubmissionProcess(value: boolean) {
    formSubmissionProcess.value = value;
  }

  function setShowSuccessModal(value: boolean) {
    showSuccessModal.value = value;
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

  async function handleFormSubmit(): Promise<void> {
    try {
      await updateProfile(getProfileFormValues.value);

      resetFormValues();

      profileStore.resetDesktopInputs();
      setShowSuccessModal(true);

      userStore.fetchUser();
    } catch (error) {
      resetFormValues();

      const fieldErrors = error.response.data.errors;
      const errorField: string = Object.keys(fieldErrors)[0];

      setBackendErrors(fieldErrors);

      profileStore.setMobileField(errorField);
      setFormSubmissionProcess(true);
    }
  }

  function changeFormValues(field: string, value: string | File): void {
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

  function resetFormValues(): void {
    avatar.value = null;
    username.value = "";
    password.value = "";
    password_confirmation.value = "";
  }

  function setBackendErrors(errors: any): void {
    backendErrors.value = errors;
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
    showSuccessModal,
    setShowSuccessModal,
    backendErrors,
    setBackendErrors,
  };
});
