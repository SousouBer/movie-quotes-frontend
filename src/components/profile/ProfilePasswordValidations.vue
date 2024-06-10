<script setup lang="ts">
import IconGreenDot from "@/components/icons/IconGreenDot.vue";
import { computed } from "vue";

import { useProfileFormStore } from "@/stores/profileFormStore";

import { usePasswordValidation } from "@/components/composables/usePasswordValidation";

const profileFormStore = useProfileFormStore();

const { eightCharactersValid, fifteenCharactersValid } = usePasswordValidation(
  computed(() => profileFormStore.password),
  computed(() => profileFormStore.password_confirmation),
);
</script>

<template>
  <div class="border border-[#CED4DA33] rounded-[4px] p-5 w-full">
    <span class="text-white text-base">{{
      $t("profile.passwords_should_contain")
    }}</span>
    <div class="flex gap-2 flex-col">
      <div class="flex items-center gap-2 mt-5">
        <IconGreenDot :color="eightCharactersValid ? '#198754' : '#9C9A9A'" />
        <span
          class="text-sm text-[#9C9A9A]"
          :class="{ '!text-white': eightCharactersValid }"
          >{{ $t("profile.eight_or_more_chars") }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <IconGreenDot :color="fifteenCharactersValid ? '#198754' : '#9C9A9A'" />
        <span
          class="text-sm text-[#9C9A9A]"
          :class="{ '!text-white': fifteenCharactersValid }"
        >
          {{ $t("profile.fifteen_or_less_chars") }}
        </span>
      </div>
    </div>
  </div>
</template>
