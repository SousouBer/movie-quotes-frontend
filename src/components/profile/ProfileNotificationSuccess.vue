<script setup lang="ts">
import IconSuccess from "@/components/icons/IconSuccess.vue";
import IconCancel from "@/components/icons/IconCancel.vue";

import { useProfileFormStore } from "@/stores/profileFormStore";

const formStore = useProfileFormStore();
</script>

<template>
  <div
    @click.self="formStore.setShowSuccessModal(false)"
    class="bg-custom-gradient px-4 pt-28"
  >
    <div class="rounded bg-green-200 p-5 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <IconSuccess />
        <span class="text-base text-emerald-800">{{
          $t("generalTexts.message_successful_changes")
        }}</span>
      </div>
      <IconCancel @click="formStore.setShowSuccessModal(false)" />
    </div>
  </div>
</template>
