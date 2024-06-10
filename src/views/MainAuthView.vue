<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import TheDashboard from "@/components/shared/TheDashboard.vue";
</script>

<template>
  <div>
    <TheHeader />
    <main class="flex">
      <TheDashboard class="hidden sm:block" />
      <section class="relative bg-grayish-blue flex-1 min-h-screen w-full">
        <RouterView />
      </section>
    </main>
  </div>
</template>
