import { defineStore } from "pinia";
import { ref, computed } from "vue";

type State = "register" | "login" | "forgotPassword" | "resetPassword" | "";

export const useAuthModalStore = defineStore("authModal", () => {
  const modalType = ref<State>("");

  const getModalType = computed(() => modalType.value);

  function setModalType(changeModalType: State): void {
    modalType.value = changeModalType;
  }

  return {
    modalType,
    getModalType,
    setModalType,
  };
});
