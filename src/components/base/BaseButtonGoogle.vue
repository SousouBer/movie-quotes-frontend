<script setup lang="ts">
import { googleAuth } from "@/services/auth";
import IconGoogle from "@/components/icons/IconGoogle.vue";

const props = defineProps<{
  label: string;
}>();

const handleSubmit = async () => {
  try {
    const response = await googleAuth();
    const googleAuthRedirectUrl = response.data.redirectUrl;

    window.location.href = googleAuthRedirectUrl;
  } catch (error: any) {
    console.error("Error during Google authentication:", error);
  }
};
</script>

<template>
  <button
    @click="handleSubmit"
    class="text-white bg-transparent border border-white px-6 py-2 rounded-md whitespace-nowrap flex items-center justify-center gap-3 w-full mb-6"
  >
    <IconGoogle />
    {{ props.label }}
  </button>
</template>
