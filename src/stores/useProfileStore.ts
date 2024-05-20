import { defineStore } from "pinia";
import { ref, computed } from "vue";

type Field = "username" | "password" | null;

export const useProfileStore = defineStore("profile", () => {
  const showConfirmationModal = ref<boolean>(false);

  const field = ref<Field | null>(null);

  const getField = computed((): Field => field.value);

  const showNewUsernameField = ref<boolean>(false);
  const showNewPasswordsField = ref<boolean>(false);

  function focusInput(inputType: string): void {
    switch (inputType) {
      case "newUsername":
        showNewUsernameField.value = true;
        break;
      case "newPassword":
        showNewPasswordsField.value = true;
        break;
    }
  }

  function resetValues(): void {
    showNewUsernameField.value = false;
    showNewPasswordsField.value = false;
  }

  const getShowConfirmationModal = computed(
    (): boolean => showConfirmationModal.value,
  );

  function setField(value: Field): void {
    field.value = value;
  }

  function setShowConfirmationModal(value: boolean): void {
    showConfirmationModal.value = value;
  }

  return {
    showConfirmationModal,
    field,
    getShowConfirmationModal,
    getField,
    setShowConfirmationModal,
    setField,
    showNewUsernameField,
    showNewPasswordsField,
    resetValues,
    focusInput,
  };
});
