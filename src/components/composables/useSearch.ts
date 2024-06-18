import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useQuoteStore } from "@/stores/quote";
import { useMovieStore } from "@/stores/movie";

export function useSearch(searchInput: Ref<string>, isMoviesSearch = false) {
  const router = useRouter();
  const quoteStore = useQuoteStore();
  const movieStore = useMovieStore();

  const debounceTimeout = ref<any>(null);

  const debounce = (): void => {
    const inputSymbol = searchInput.value.charAt(0);

    if (inputSymbol !== "@" && inputSymbol !== "#" && !isMoviesSearch) return;

    clearTimeout(debounceTimeout.value as number);

    debounceTimeout.value = setTimeout((): void => {
      router
        .push({
          query: {
            "filter[search]": searchInput.value.trim(),
          },
        })
        .then(() => {
          if (!isMoviesSearch) {
            quoteStore.getQuotes(1, router.currentRoute.value.query);
          } else {
            movieStore.getMovies(router.currentRoute.value.query);
          }
        });
    }, 500);
  };

  return {
    debounce,
  };
}
