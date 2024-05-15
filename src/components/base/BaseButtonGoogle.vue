<script setup lang="ts">
import IconGoogle from "@/components/icons/IconGoogle.vue";

const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <a
    href="http://127.0.0.1:8000/auth/google/redirect"
    class="text-white bg-transparent border border-white px-6 py-2 rounded-md whitespace-nowrap flex items-center justify-center gap-3 w-full mb-6"
  >
    <IconGoogle />
    {{ label }}
  </a>
</template>
