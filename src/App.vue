<script setup lang="ts">
import LayoutsModalAuth from "@/components/layouts/LayoutsModalAuth.vue";

import ModalRegister from "@/components/modals/ModalRegister.vue";
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <LayoutsModalAuth
      class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center"
    >
      <!-- Here will probably go auth modals! -->
      <ModalRegister />
      />
    </LayoutsModalAuth>
  </Teleport>
</template>
