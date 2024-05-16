<script setup lang="ts">
import IconGoogle from "@/components/icons/IconGoogle.vue";

const props = defineProps<{
  label: string;
}>();

const googleAuthAPI = import.meta.env.VITE_API_GOOGLE_AUTH;
</script>

<template>
  <a
    :href="googleAuthAPI"
    class="text-white bg-transparent border border-white px-6 py-2 rounded-md whitespace-nowrap flex items-center justify-center gap-3 w-full mb-6"
  >
    <IconGoogle />
    {{ label }}
  </a>
</template>
