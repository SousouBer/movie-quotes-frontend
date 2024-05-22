<script setup lang="ts">
import { googleAuth } from "@/services/auth";
import IconGoogle from "@/components/icons/IconGoogle.vue";

const props = defineProps<{
  label: string;
}>();

const handleSubmit = async () => {
  try {
    const googleAuthRedirectUrl = await googleAuth();

    window.location.href = googleAuthRedirectUrl.data;
  } catch (error: any) {}
};
</script>

<template>
  <button
    @click="handleSubmit"
    class="text-white bg-transparent border border-white px-6 py-2 rounded-md whitespace-nowrap flex items-center justify-center gap-3 w-full mb-6"
  >
    <IconGoogle />
    {{ label }}
  </button>
</template>
