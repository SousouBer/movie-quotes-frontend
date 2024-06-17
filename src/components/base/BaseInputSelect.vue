<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { setLocale } from "@vee-validate/i18n";
import { useI18n } from "vue-i18n";

import IconDropdownLocale from "@/components/icons/IconDropdownLocale.vue";
import { ref } from "vue";

const { locale } = useI18n({ useScope: "global" });
import Cookies from "js-cookie";

const showLocaleSelectionModal = ref<boolean>(false);

const toggleLocaleSelectionModal = (): void => {
  showLocaleSelectionModal.value = !showLocaleSelectionModal.value;
};

const currentLocale = computed((): string => locale.value);

const changeLocale = (localeValue: string) => {
  Cookies.set("locale", localeValue, {
    expires: 365,
    domain: import.meta.env.VITE_API_SESSION_DOMAIN,
    path: "/",
    secure: true,
    sameSite: "None",
  });

  locale.value = localeValue;
  setLocale(localeValue);

  window.location.reload();
};

watch(currentLocale, (newLocale: string): void => {
  setLocale(newLocale);

  document.body.style.fontFamily =
    newLocale === "ka" ? "Helvetica Geo" : "Helvetica Neue";
});

onMounted((): void => {
  const storedLocale = Cookies.get("locale");
  if (storedLocale) {
    locale.value = storedLocale;
    setLocale(storedLocale);
  }
});
</script>

<template>
  <div
    @click="toggleLocaleSelectionModal"
    class="relative flex items-center gap-2 cursor-pointer"
  >
    <span class="text-white text-sm sm:text-base">{{
      currentLocale === "en" ? "Eng" : "Geo"
    }}</span>
    <IconDropdownLocale class="pointer-events" />
    <div
      v-if="showLocaleSelectionModal"
      class="cursor-pointer absolute bottom-0 left-0transform translate-y-full flex flex-col bg-blueish-black rounded-[1px] py-1 px-2 z-50"
    >
      <span class="text-white text-sm sm:text-base" @click="changeLocale('en')"
        >Eng</span
      >
      <span class="text-white text-sm sm:text-base" @click="changeLocale('ka')"
        >Geo</span
      >
    </div>
  </div>
</template>
