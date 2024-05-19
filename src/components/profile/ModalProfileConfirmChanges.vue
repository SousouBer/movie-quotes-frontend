<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
</script>

<template>
  <div
    style="
      background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.25) 100%);
    "
    class="text-center pt-16 mx-10"
  >
    <span class="text-base text-white">Are you sure to make changes ?</span>
    <div class="border-t border-gray-300 mt-14">
      <div class="flex justify-between py-4 px-6">
        <button class="text-base text-gray-300">Cancel</button>
        <BaseButton label="Edit" />
      </div>
    </div>
  </div>
</template>
