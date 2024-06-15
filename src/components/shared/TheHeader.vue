<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

import { useAuthModalStore } from "@/stores/useAuthModalStore";
import { useUserStore } from "@/stores/userStore";

import BaseButton from "@/components/base/BaseButton.vue";
import BaseInputSelect from "@/components/base/BaseInputSelect.vue";
import TheDashboard from "@/components/shared/TheDashboard.vue";
import MotificationsModal from "@/components/notifications/NotificationsModal.vue";
import BaseQuoteInputSearchMobile from "@/components/base/quote/BaseQuoteInputSearchMobile.vue";

import IconBurgerMenu from "@/components/icons/IconBurgerMenu.vue";

import { logout } from "@/services/auth";
import { ref, computed, watch } from "vue";

import { useWindowWidth } from "@/components/composables/useWindowWidth";

const windowWidth = useWindowWidth();

const store = useAuthModalStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const logUserOut = async (): Promise<void> => {
  await logout();

  userStore.setUser(null);
  router.push({ name: "landing" });
};

// Use ref from the composable.

const burgerMenuIsShown = ref<boolean>(false);
const showMobileSearchInput = ref<boolean>(false);

const toggleMobileSearch = (): void => {
  showMobileSearchInput.value = !showMobileSearchInput.value;
};

const burgerModalPosition = computed((): string => {
  return !burgerMenuIsShown.value ? "-translate-x-full" : "";
});

const toggleBurgerModal = (): void => {
  burgerMenuIsShown.value = !burgerMenuIsShown.value;
};

const headerDynamicBackgroundColor = computed((): string => {
  return route.name === "landing"
    ? "bg-dark-shade-of-blue"
    : "bg-blueish-black ";
});

const isMobileVersion = computed((): boolean => windowWidth.value < 768);
const isLandingRoute = computed((): boolean => route.name === "landing");
const isNewsRoute = computed((): boolean => route.name === "newsFeed");

watch(burgerMenuIsShown, (newValue: boolean) => {
  if (newValue) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});
</script>

<template>
  <nav
    :class="[
      headerDynamicBackgroundColor,
      { '!px-4': isLandingRoute && isMobileVersion },
    ]"
    class="relative flex items-center justify-between p-8 sm:px-16 sm:py-6"
  >
    <span
      v-if="(isLandingRoute && isMobileVersion) || !isMobileVersion"
      class="sm:inline uppercase text-base leading-[24px] text-shade-of-beige font-medium"
      >Movie Quotes</span
    >
    <IconBurgerMenu
      v-if="!isLandingRoute && isMobileVersion"
      @click="toggleBurgerModal"
      class="sm:hidden"
    />
    <div
      @click="toggleBurgerModal"
      :class="burgerModalPosition"
      class="sm:hidden absolute top-0 left-0 transform transition duration-300 bg-transparent z-50 min-h-screen w-full flex items-start"
    >
      <div
        class="bg-dark-shade-of-blue h-[43.75rem] flex flex-col pb-8 rounded-r-xl pt-2"
      >
        <TheDashboard class="!bg-dark-shade-of-blue" />
        <BaseInputSelect @click.stop class="px-16 mt-2" />
        <BaseButton
          @click="logUserOut"
          class="mt-auto mx-8"
          :label="$t('general.logout')"
          :hasBorder="true"
        />
      </div>
    </div>
    <div
      v-if="!userStore.getUser && isLandingRoute"
      class="flex items-center gap-3 sm:gap-4"
    >
      <BaseInputSelect class="sm:mr-6" />
      <BaseButton
        @click="store.setModalType('register')"
        :label="$t('general.signup')"
        class="order-2 sm:order-1"
      />
      <BaseButton
        @click="store.setModalType('login')"
        :label="$t('general.login')"
        :hasBorder="true"
        class="order-1 sm:order-2"
      />
    </div>
    <div v-else class="flex items-center gap-5 sm:gap-9">
      <BaseQuoteInputSearchMobile v-if="isMobileVersion && isNewsRoute" />
      <MotificationsModal />
      <BaseInputSelect class="hidden sm:flex" />
      <BaseButton
        @click="logUserOut"
        class="hidden sm:flex"
        :label="$t('general.logout')"
        :hasBorder="true"
      />
    </div>
  </nav>
</template>
