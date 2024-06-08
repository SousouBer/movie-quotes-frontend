<script setup lang="ts">
import IconGreenDot from "@/components/icons/IconGreenDot.vue";
import { computed } from "vue";

import { useProfileFormStore } from "@/stores/profileFormStore";

const profileFormStore = useProfileFormStore();

const eightCharactersValid = computed((): boolean => {
  return profileFormStore.password.length > 8;
});

const fifteenCharactersValid = computed((): boolean => {
  return (
    profileFormStore.password.length < 15 &&
    profileFormStore.password.toLocaleLowerCase() === profileFormStore.password
  );
});
</script>

<template>
  <div class="border border-[#CED4DA33] rounded-[4px] p-5 w-full">
    <span class="text-white text-base">Passwords should contain: </span>
    <div class="flex gap-2 flex-col">
      <div class="flex items-center gap-2 mt-5">
        <IconGreenDot :color="eightCharactersValid ? '#198754' : '#9C9A9A'" />
        <span
          class="text-sm text-[#9C9A9A]"
          :class="{ '!text-white': eightCharactersValid }"
          >8 or more characters
        </span>
      </div>
      <div class="flex items-center gap-2">
        <IconGreenDot :color="fifteenCharactersValid ? '#198754' : '#9C9A9A'" />
        <span
          class="text-sm text-[#9C9A9A]"
          :class="{ '!text-white': fifteenCharactersValid }"
          >15 lowercase character</span
        >
      </div>
    </div>
  </div>
</template>
