<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import TheDashboard from "@/components/shared/TheDashboard.vue";
</script>

<template>
  <div>
    <TheHeader />
    <main class="flex">
      <TheDashboard class="hidden sm:block" />
      <section
        class="relative bg-dark-shade-of-blue sm:bg-blueish-black flex-1 py-8 min-h-screen"
      >
        <RouterView />
      </section>
    </main>
  </div>
</template>
