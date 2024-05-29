<script setup lang="ts">
import IconThreeDots from "@/components/icons/IconThreeDots.vue";
</script>

<template>
  <div class="bg-dark-shade-of-blue rounded-[10px] sm:w-[60%] p-8">
    <div
      class="relative flex flex-col sm:flex-row gap-10 items-center border-b border-[#EFEFEF33] pb-8"
    >
      <div>
        <img
          class="h-full w-full"
          src="/images/dummy-quote-img.svg"
          alt="Quote picture"
        />
      </div>
      <span class="text-2xl text-gray-300"
        >"Frankly, my dear, I don'tgive a damn."
      </span>
      <IconThreeDots
        class="absolute -bottom-8 sm:top-0 right-0 cursor-pointer"
      />
    </div>
    <!-- Here will go comments and likes icons -->
  </div>
</template>
