import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { updateProfile } from "@/services/profile";
import { useUserStore } from "@/stores/userStore";
import { useProfileStore } from "@/stores/useProfileStore";

import type { ProfileInputField } from "@/plugins/typescript/types";

export const useProfileFormStore = defineStore("profileForm", () => {
  const avatar = ref<File | null>(null);
  const username = ref<string>("");
  const password = ref<string>("");
  const password_confirmation = ref<string>("");

  const disableSubmitButton = ref<boolean>(true);

  const backendErrors = ref<any>();

  const formSubmissionProcess = ref<boolean>(false);
  const showSuccessModal = ref<boolean>(false);

  function setFormSubmissionProcess(value: boolean) {
    formSubmissionProcess.value = value;
  }

  function setShowSuccessModal(value: boolean) {
    showSuccessModal.value = value;
  }

  function setDisableSubmitButton(value: boolean) {
    disableSubmitButton.value = value;
  }

  const userStore = useUserStore();
  const profileStore = useProfileStore();

  const getProfileFormValues = computed(() => {
    const formValues: Record<string, any> = {};

    if (avatar.value) {
      formValues.avatar = avatar.value;
    }
    if (username.value) {
      formValues.username = username.value as string;
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
    } catch (error: any) {
      resetFormValues();

      const fieldErrors = error.response.data.errors;
      const errorField = Object.keys(fieldErrors)[0] as ProfileInputField;

      setBackendErrors(fieldErrors);

      if (errorField !== "avatar") {
        profileStore.setMobileField(errorField);
        setFormSubmissionProcess(true);
      }

      setTimeout(() => {
        setBackendErrors(null);
      }, 3000);
    }
  }

  function changeFormValues(field: string, value: string | File): void {
    switch (field) {
      case "avatar":
        avatar.value = value as File;
        break;
      case "username":
        username.value = value as string;
        break;
      case "password":
        password.value = value as string;
        break;
      case "password_confirmation":
        password_confirmation.value = value as string;
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
    disableSubmitButton,
    setDisableSubmitButton,
  };
});
