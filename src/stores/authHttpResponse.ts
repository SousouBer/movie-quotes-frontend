import { defineStore } from "pinia";
import { ref, computed } from "vue";

type ModalStatus = "success" | "linkSent" | "warning";

type State = {
  status: ModalStatus;
  heading: string;
  description: string;
  buttonLabel: string;
  redirectToModal?: boolean;
  requestNewLink?: boolean;
  showConfirmLaterButton?: boolean;
};

export const useAuthHttpResponseStore = defineStore("authHttpResponse", () => {
  const authHttpResponse = ref<State | null>(null);

  const getAuthHttpResponse = computed<State | null>(
    () => authHttpResponse.value,
  );

  function setAuthHttpResponse(payload: State | null): void {
    authHttpResponse.value = payload;
  }

  return {
    authHttpResponse,
    getAuthHttpResponse,
    setAuthHttpResponse,
  };
});
