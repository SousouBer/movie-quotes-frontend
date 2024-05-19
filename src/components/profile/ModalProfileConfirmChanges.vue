<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
</script>

<template>
  <div class="text-center pt-[4.5rem] mx-10 rounded-[10px]">
    <span class="text-base text-white">Are you sure to make changes ?</span>
    <div class="border-t border-gray-300 mt-12">
      <div class="flex justify-between py-4 px-4">
        <button class="text-base text-gray-300">Cancel</button>
        <BaseButton class="!px-2" label="Confirm" />
      </div>
    </div>
  </div>
</template>
