import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const showField = ref<boolean>(false);
  const showConfirmationModal = ref<boolean>(false);

  const getShowField = computed((): boolean => showField.value);
  const getShowConfirmationModal = computed(
    (): boolean => showConfirmationModal.value,
  );

  function setShowField(value: boolean): void {
    showField.value = value;
  }

  function setShowConfirmationModal(value: boolean): void {
    showConfirmationModal.value = value;
  }

  return {
    showFIeld,
    showConfirmationModal,
    getShowField,
    getShowConfirmationModal,
    setShowField,
    setShowConfirmationModal,
  };
});
