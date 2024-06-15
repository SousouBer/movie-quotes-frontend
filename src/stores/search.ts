import { defineStore } from "pinia";
import { ref } from "vue";

import { useRouter, useRoute } from "vue-router";

import { useQuoteStore } from "@/stores/quote";

export const useSearchStore = defineStore("search", () => {
  const searchInput = ref<string>("");
  const debounceTimeout = ref<number | null>(null);

  function debounce(): void {
    const router = useRouter();
    const route = useRoute();
    const quoteStore = useQuoteStore();

    const inputSymbol = searchInput.value.charAt(0);

    if (inputSymbol !== "@" && inputSymbol !== "#") return;

    clearTimeout(debounceTimeout.value as number);

    debounceTimeout.value = setTimeout((): void => {
      router
        .push({
          query: {
            "filter[search]": searchInput.value.trim(),
          },
        })
        .then(() => {
          quoteStore.getQuotes(1, route.query);
        });
    }, 500);
  }

  return {
    searchInput,
    debounceTimeout,
    debounce,
  };
});
