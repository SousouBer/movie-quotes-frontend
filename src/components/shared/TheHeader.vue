<script setup lang="ts">
import { useRouter } from "vue-router";

import { useAuthModalStore } from "@/stores/useAuthModalStore";
import { useUserStore } from "@/stores/userStore";

import IconNotification from "@/components/icons/IconNotification.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInputSelect from "@/components/base/BaseInputSelect.vue";

import { logout } from "@/services/auth";

const store = useAuthModalStore();
const userStore = useUserStore();
const router = useRouter();

const logUserOut = async (): Promise<void> => {
  await logout();

  userStore.setUser(null);
  router.push({ name: "landing" });
};
</script>

<template>
  <nav
    class="relative flex items-center justify-between bg-dark-shade-of-blue py-4 px-4 sm:px-16 sm:py-8"
  >
    <span
      class="uppercase text-base text-shade-of-beige font-medium whitespace-nowrap"
      >{{ $t("general.movie_quotes") }}</span
    >
    <div v-if="!userStore.getUser" class="flex items-center gap-4">
      <BaseInputSelect class="hidden sm:block" />
      <BaseButton
        @click="store.setModalType('register')"
        :label="$t('general.signup')"
      />
      <BaseButton
        @click="store.setModalType('login')"
        :label="$t('general.login')"
        :hasBorder="true"
      />
    </div>
    <div v-else class="flex items-center gap-6">
      <IconNotification />
      <BaseInputSelect class="hidden sm:block" />
      <BaseButton
        @click="logUserOut"
        :label="$t('general.logout')"
        :hasBorder="true"
      />
    </div>
  </nav>
</template>
