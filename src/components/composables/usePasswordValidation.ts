import { computed } from "vue";

import type { Ref } from "vue";

export function usePasswordValidation(
  password: Ref<string>,
  confirmation: Ref<string>,
) {
  const eightCharactersValid = computed(() => {
    return password.value.length >= 8 && confirmation.value.length >= 8;
  });

  const fifteenCharactersValid = computed(() => {
    return (
      password.value.length <= 15 &&
      password.value.toLowerCase() === password.value &&
      confirmation.value.length <= 15 &&
      confirmation.value.toLowerCase() === confirmation.value
    );
  });

  return {
    eightCharactersValid,
    fifteenCharactersValid,
  };
}
