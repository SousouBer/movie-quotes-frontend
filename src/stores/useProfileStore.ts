import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ProfileInputField } from "@/plugins/typescript/types";

export const useProfileStore = defineStore("profile", () => {
  const showConfirmationModal = ref<boolean>(false);

  const mobileField = ref<ProfileInputField>(null);

  const getMobileField = computed(() => mobileField.value);

  const showDesktopNewUsernameField = ref<boolean>(false);
  const showDesktopNewPasswordsField = ref<boolean>(false);

  function toggleDesktopFields(inputType: string): void {
    switch (inputType) {
      case "newUsername":
        showDesktopNewUsernameField.value = true;
        break;
      case "newPassword":
        showDesktopNewPasswordsField.value = true;
        break;
    }
  }

  function resetDesktopInputs(): void {
    showDesktopNewUsernameField.value = false;
    showDesktopNewPasswordsField.value = false;
  }

  const getShowConfirmationModal = computed(
    (): boolean => showConfirmationModal.value,
  );

  function setMobileField(value: ProfileInputField): void {
    mobileField.value = value;
  }

  function setShowConfirmationModal(value: boolean): void {
    showConfirmationModal.value = value;
  }

  return {
    mobileField,
    showDesktopNewUsernameField,
    showDesktopNewPasswordsField,
    showConfirmationModal,
    getMobileField,
    getShowConfirmationModal,
    setMobileField,
    setShowConfirmationModal,
    toggleDesktopFields,
    resetDesktopInputs,
  };
});
