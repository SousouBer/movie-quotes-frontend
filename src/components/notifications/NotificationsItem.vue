<script setup lang="ts">
import IconQuote from "@/components/icons/IconQuote.vue";
</script>

<template>
  <div
    class="flex items-center gap-4 w-full rounded-[4px] p-5 border border-[#6C757D]"
  >
    <div class="w-20 h-20 rounded-full border border-green-500">
      <img class="w-full h-full" src="http://google.com" alt="Author Avatar" />
    </div>
    <div class="flex items-center justify-between w-full">
      <div class="flex flex-col gap-3">
        <span class="text-white text-xl">Nino Tabagari</span>
        <div class="flex items-center gap-3">
          <IconQuote />
          <span class="text-gray-300 text-xl"
            >Commented to your movie quote</span
          >
        </div>
      </div>
      <div class="flex flex-col items-end gap-2">
        <span class="text-xl text-gray-300">5 min ago</span>
        <span class="text-xl text-[#198754]">Now</span>
      </div>
    </div>
  </div>
</template>
