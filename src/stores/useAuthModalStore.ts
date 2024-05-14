import { defineStore } from "pinia";
import { ref, computed } from "vue";

type State = "register" | "login" | "forgotPassword" | "resetPassword" | "";

export const useAuthModalStore = defineStore("authModal", () => {
  const modalType: State = ref("");

  const getModalType = computed<State>(() => modalType.value);

  function setModalType(changeModalType: State): void {
    modalType.value = changeModalType;
  }

  return {
    modalType,
    getModalType,
    setModalType,
  };
});
