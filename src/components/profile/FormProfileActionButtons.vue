<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";

import { useProfileStore } from "@/stores/useProfileStore.ts";

const profileStore = useProfileStore();
</script>

<template>
  <div class="hidden sm:flex justify-end gap-6 w-4/6 mt-14">
    <button @click="profileStore.resetValues" class="text-xl text-gray-300">
      Cancel
    </button>
    <BaseButton label="Save Changes" />
  </div>
</template>
