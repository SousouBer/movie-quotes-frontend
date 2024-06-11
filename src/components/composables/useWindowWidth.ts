import { ref, onMounted, onUnmounted, type Ref } from "vue";

export const useWindowWidth = (): Ref<number> => {
  const windowWidth = ref(window.innerWidth);

  const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", updateWindowWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateWindowWidth);
  });

  return windowWidth;
};
