import { defineStore } from "pinia";
import { ref } from "vue";

type Quote = {
  id: string;
  quote: string;
};

type FormMode = "add" | "edit" | "view" | "";

export const useQuoteStore = defineStore("quoteStore", () => {
  const quotes = ref<Quote[] | null>([]);
  const quoteModalMode = ref<FormMode>("");

  const quoteDetails = ref<Movie | null>(null);

  const showQuoteModal = ref<boolean>(false);

  function setShowQuoteModal(value: boolean): void {
    showQuoteModal.value = value;
  }

  function setQuoteModalMode(value: FormMode) {
    quoteModalMode.value = value;
  }

  return {
    quotes,
    showQuoteModal,
    setShowQuoteModal,
    quoteDetails,
    quoteModalMode,
    setQuoteModalMode,
  };
});
