import { ref, onMounted, onUnmounted, type Ref } from "vue";

export const useWindowWidth = (): Ref<number> => {
  const windowWidth = ref(window.innerWidth);

  const updateWindowWidth = (): void => {
    windowWidth.value = window.innerWidth;
  };

  onMounted((): void => {
    window.addEventListener("resize", updateWindowWidth);
  });

  onUnmounted((): void => {
    window.removeEventListener("resize", updateWindowWidth);
  });

  return windowWidth;
};
