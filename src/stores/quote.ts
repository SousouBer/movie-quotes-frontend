import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchQuotes, editQuote, deleteQuote } from "@/services/quote";
import { useMovieStore } from "@/stores/movie";

import type { Quote, Movie } from "@/plugins/typescript/types";

// I will use these values to dynamically render either add , edit, or view modals for quotes.
type FormMode = "add" | "edit" | "view" | null;

export const useQuoteStore = defineStore("quoteStore", () => {
  const movieStore = useMovieStore();

  const quotes = ref<Quote[] | null>([]);
  const quoteModalMode = ref<FormMode>(null);

  const quoteDetails = ref<Quote | null>(null);

  const showQuoteModal = ref<boolean>(false);

  const quoteSelectedMovie = ref<Movie | null>(null);

  const editQuoteData = ref<Quote | null>(null);

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

  function setEditQuoteData(value: Quote | null): void {
    editQuoteData.value = value;
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

  async function getEditQuoteData(id: number): Promise<void> {
    try {
      const response = await editQuote(id);

      const fetchedEditQuoteData = response.data.data;

      setEditQuoteData(fetchedEditQuoteData);
    } catch (error: any) {
      console.log(error);
    }
  }

  async function removeQuote(id: number): Promise<void> {
    try {
      await deleteQuote(id);

      getQuotes();
      setEditQuoteData(null);
      setShowQuoteModal(false);
      movieStore.getSingleMovie(movieStore.singleMovie?.id as number);
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
    editQuoteData,
    setEditQuoteData,
    getEditQuoteData,
    removeQuote,
  };
});
