<script setup lang="ts">
import { computed, watch } from "vue";
import { setLocale } from "@vee-validate/i18n";
import { useI18n } from "vue-i18n";

import IconDropdownLocale from "@/components/icons/IconDropdownLocale.vue";

const { locale } = useI18n({ useScope: "global" });

const currentLocale = computed((): string => locale.value);

watch(currentLocale, (newLocale: string): void => {
  setLocale(newLocale);
});
</script>

<template>
  <div class="flex items-center gap-2 relative w-14 mr-6">
    <select
      v-model="$i18n.locale"
      class="cursor-pointer appearance-none bg-transparent outline-none w-full text-white text-base capitalize"
    >
      <option
        class="bg-black border-none capitalize"
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
    <IconDropdownLocale
      class="pointer-events-none absolute top-0 right-0 transform translate-y-2.5 -translate-x-1/2"
    />
  </div>
</template>
