import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useQuoteStore } from "@/stores/quote";

export function useSearch(searchInput: Ref<string>) {
  const router = useRouter();
  const quoteStore = useQuoteStore();
  const debounceTimeout = ref<number | null>(null);

  const debounce = (): void => {
    const inputSymbol = searchInput.value.charAt(0);

    if (inputSymbol !== "@" && inputSymbol !== "#") return;

    clearTimeout(debounceTimeout.value as number);

    console.log(searchInput.value);
    debounceTimeout.value = setTimeout((): void => {
      router
        .push({
          query: {
            "filter[search]": searchInput.value.trim(),
          },
        })
        .then(() => {
          quoteStore.getQuotes(1, router.currentRoute.value.query);
        });
    }, 500);
  };

  return {
    debounce,
  };
}
