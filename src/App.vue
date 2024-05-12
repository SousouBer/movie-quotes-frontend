<script setup lang="ts">
import ModalRegister from "@/components/modals/ModalRegister.vue";
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <ModalRegister
      class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
    />
  </Teleport>
</template>
