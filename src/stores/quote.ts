import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchQuotes } from "@/services/quote";

import type { Quote, Movie } from "@/plugins/typescript/types";

// I will use these values to dynamically render either add , edit, or view modals for quotes.
type FormMode = "add" | "edit" | "view" | "";

export const useQuoteStore = defineStore("quoteStore", () => {
  const quotes = ref<Quote[] | null>([]);
  const quoteModalMode = ref<FormMode>("");

  const quoteDetails = ref<Quote | null>(null);

  const showQuoteModal = ref<boolean>(false);

  const quoteSelectedMovie = ref<Movie | null>(null);

  function setShowQuoteModal(value: boolean): void {
    showQuoteModal.value = value;
  }

  function setQuoteModalMode(value: FormMode) {
    quoteModalMode.value = value;
  }

  function setQuotes(fetchedQuotes: Quote[]): void {
    quotes.value = fetchedQuotes;
  }

  function setQuoteMovie(movie: Movie): void {
    quoteSelectedMovie.value = movie;
  }

  function clearSelectedQuoteMovie(): void {
    quoteSelectedMovie.value = null;
  }

  async function getQuotes(): Promise<void> {
    try {
      const response = await fetchQuotes();

      const fetchedQuotes = response.data.data;

      setQuotes(fetchedQuotes);
    } catch (error: any) {
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
    quoteSelectedMovie,
    setQuoteMovie,
    clearSelectedQuoteMovie,
  };
});
