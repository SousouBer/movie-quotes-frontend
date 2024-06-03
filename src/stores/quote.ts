import { defineStore } from "pinia";
import { ref } from "vue";

import { fetchQuotes } from "@/services/quote";

// I will export these types into types.ts file in another branch to prevent conflicts.
export type Quote = {
  id: number;
  quote: string;
  picture: string;
  movie: QuoteMovie;
  likes_count: string;
  comments_count: string;
  quote_author?: QuoteAuthor;
  comments?: Comment[];
};

export type QuoteAuthor = {
  id?: number;
  avatar: string | null;
  username: string;
};

export type QuoteMovie = {
  id: number;
  title: string;
  year: string;
};

export type Comment = {
  id: number;
  author: QuoteAuthor;
  comment: string;
};

// I will use these values to dynamically render either add , edit, or view modals for quotes.
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
  };
});
