import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchQuotes } from "@/services/quote";

type Quote = {
  id: number;
  quote: string;
  picture: string;
  likes_count: string;
  comments_count: string;
  quote_author?: string;
  comments?: Comment[];
};

type Comment = {
  id: number;
  comment: string;
};

type FormMode = "add" | "edit" | "view" | "";

export const useQuoteStore = defineStore("quoteStore", () => {
  const quotes = ref<Quote[] | null>([]);
  const quoteModalMode = ref<FormMode>("");

  const quoteDetails = ref<Quote | null>(null);

  const showQuoteModal = ref<boolean>(false);

  function setShowQuoteModal(value: boolean): void {
    showQuoteModal.value = value;
  }

  function setQuoteModalMode(value: FormMode) {
    quoteModalMode.value = value;
  }

  function setQuotes(fetchedQuotes: Quote[]): void {
    quotes.value = fetchedQuotes;
  }

  async function getQuotes() {
    try {
      const response = await fetchQuotes();

      const fetchedQuotes = response.data.data;

      setQuotes(fetchedQuotes);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    quotes,
    showQuoteModal,
    setShowQuoteModal,
    quoteDetails,
    quoteModalMode,
    setQuoteModalMode,
    setQuotes,
    getQuotes,
  };
});
