<script setup lang="is">
import IconSuccess from "@/components/icons/IconSuccess.vue";
import IconCancel from "@/components/icons/IconCancel.vue";
</script>

<template>
  <div class="rounded bg-green-200">
    <div>
      <IconSuccess />
      <span class="text-base text-emerald-800"
        >Changes updated succsessfully</span
      >
    </div>
    <IconCancel />
  </div>
</template>
