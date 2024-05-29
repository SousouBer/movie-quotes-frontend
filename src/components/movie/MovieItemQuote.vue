<script setup lang="ts">
import IconThreeDots from "@/components/icons/IconThreeDots.vue";
</script>

<template>
  <div class="bg-dark-shade-of-blue rounded-[10px] w-[60%] p-8">
    <div
      class="relative flex gap-10 items-center border-b border-[#EFEFEF33] pb-8"
    >
      <div>
        <img src="/images/dummy-quote-img.svg" alt="Quote picture" />
      </div>
      <span class="text-2xl text-gray-300"
        >"Frankly, my dear, I don'tgive a damn."
      </span>
      <IconThreeDots class="absolute top-0 right-0 cursor-pointer" />
    </div>
  </div>
</template>
