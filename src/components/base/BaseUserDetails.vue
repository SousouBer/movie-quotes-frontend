<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";

const userStore = useUserStore();

type Props = {
  showUsername?: boolean;
  username?: string;
  avatar?: string;
  isAuthenticatedUser?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showUsername: true,
  isAuthenticatedUser: true,
});

const userAvatar = computed((): string | undefined => {
  return props.isAuthenticatedUser ? userStore.user?.avatar : props.avatar;
});

const userUsername = computed((): string | undefined => {
  return props.isAuthenticatedUser ? userStore.user?.username : props.username;
});
</script>

<template>
  <div class="flex items-center gap-3 sm:gap-5">
    <div class="w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden">
      <img class="h-full w-full" :src="userAvatar" alt="User Avatar" />
    </div>
    <span v-if="props.showUsername" class="text-white text-base sm:text-xl">{{
      userUsername
    }}</span>
  </div>
</template>
