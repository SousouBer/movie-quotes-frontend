import { defineStore } from "pinia";
import { ref } from "vue";

import {
  fetchQuotes,
  editQuote,
  deleteQuote,
  fetchQuoteDetails,
  addLike,
} from "@/services/quote";
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

  const currentPage = ref<number>(1);
  const lastPage = ref<number | null>(null);

  function setCurrentPage(value: number): void {
    currentPage.value = value;
  }

  function setShowQuoteModal(value: boolean): void {
    showQuoteModal.value = value;
  }

  function setQuoteModalMode(value: FormMode): void {
    quoteModalMode.value = value;
  }

  function setQuotes(
    fetchedQuotes: Quote[],
    nextPageQuotes: boolean = false,
  ): void {
    if (nextPageQuotes) {
      quotes.value = [...(quotes.value as Quote[]), ...fetchedQuotes];
    } else {
      quotes.value = fetchedQuotes;
    }
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

  function setQuoteDetails(value: Quote | null): void {
    quoteDetails.value = value;
  }

  async function getQuotes(page: number = 1, query = {}): Promise<void> {
    try {
      const response = await fetchQuotes(page, query);

      const fetchedQuotes = response.data.data;

      const metaData = response.data.meta;

      setQuotes(fetchedQuotes, page > 1);
      lastPage.value = metaData.last_page;
    } catch (error: any) {
      console.log("An error occured when fetching Quotes: ", error);
    }
  }

  async function getEditQuoteData(id: number): Promise<void> {
    try {
      const response = await editQuote(id);

      const fetchedEditQuoteData = response.data.data;

      setShowQuoteModal(false);

      setEditQuoteData(fetchedEditQuoteData);
      setQuoteModalMode("edit");
      setShowQuoteModal(true);
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

  async function viewQuote(id: number): Promise<void> {
    try {
      const response = await fetchQuoteDetails(id);

      const quoteData = response.data.data;
      setQuoteDetails(quoteData);

      setQuoteModalMode("view");
      setShowQuoteModal(true);
    } catch (error: any) {
      console.log("An error occured: ", error);
    }
  }

  async function likeQuote(id: number): Promise<void> {
    try {
      const quoteId = {
        quote_id: id,
      };
      const response = await addLike(quoteId);

      const updatedQuote = response.data.data;

      const quoteIndex = quotes.value?.findIndex((quote) => quote.id === id);

      if (quoteDetails.value) {
        setQuoteDetails(updatedQuote);
      }

      if (movieStore.singleMovie) {
        movieStore.getSingleMovie(movieStore.singleMovie?.id as number);
      }

      if (quoteIndex !== -1) {
        quotes.value?.splice(quoteIndex as number, 1, updatedQuote);
      }
    } catch (error: any) {
      console.log("An error occured: ", error);
    }
  }

  return {
    quotes,
    showQuoteModal,
    setShowQuoteModal,
    currentPage,
    quoteDetails,
    quoteModalMode,
    lastPage,
    setQuoteModalMode,
    setQuotes,
    getQuotes,
    quoteSelectedMovie,
    setQuoteMovie,
    clearSelectedQuoteMovie,
    editQuoteData,
    setEditQuoteData,
    getEditQuoteData,
    setQuoteDetails,
    removeQuote,
    viewQuote,
    likeQuote,
    setCurrentPage,
  };
});
