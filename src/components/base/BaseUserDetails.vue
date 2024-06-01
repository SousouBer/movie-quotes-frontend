<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";

type Props = {
  showUsername?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showUsername: true,
});
const userStore = useUserStore();
</script>

<template>
  <div class="flex items-center gap-3 sm:gap-5">
    <div class="w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden">
      <img
        class="h-full w-full"
        :src="userStore.user?.avatar"
        alt="User Avatar"
      />
    </div>
    <span v-if="props.showUsername" class="text-white text-base sm:text-xl">{{
      userStore.user?.username
    }}</span>
  </div>
</template>
