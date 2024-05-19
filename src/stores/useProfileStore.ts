import { defineStore } from "pinia";
import { ref, computed } from "vue";

type Field = "username" | "password" | null;

export const useProfileStore = defineStore("profile", () => {
  const showConfirmationModal = ref<boolean>(false);

  const field = ref<Field | null>(null);

  const getField = computed((): Field => field.value);

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
  };
});
