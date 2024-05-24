<script setup lang="ts">
import IconSuccess from "@/components/icons/IconSuccess.vue";
import IconCancel from "@/components/icons/IconCancel.vue";
</script>

<template>
  <div class="bg-custom-gradient px-4 pt-28">
    <div class="rounded bg-green-200 p-5 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <IconSuccess />
        <span class="text-base text-emerald-800"
          >Changes updated succsessfully</span
        >
      </div>
      <IconCancel />
    </div>
  </div>
</template>
