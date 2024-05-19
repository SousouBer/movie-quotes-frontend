<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
</script>

<template>
  <div
    style="
      background: linear-gradient(
        112.94deg,
        rgba(239, 239, 239, 0.3) -1.81%,
        rgba(239, 239, 239, 0.00514528) 102.5%,
        rgba(1, 1, 1, 0.00260417) 102.51%,
        rgba(239, 239, 239, 0.05) 102.52%
      );
    "
    class="text-center pt-[4.5rem] mx-10 rounded-[10px]"
  >
    <span class="text-base text-white">Are you sure to make changes ?</span>
    <div class="border-t border-gray-300 mt-12">
      <div class="flex justify-between py-4 px-4">
        <button class="text-base text-gray-300">Cancel</button>
        <BaseButton class="!px-2" label="Confirm" />
      </div>
    </div>
  </div>
</template>
