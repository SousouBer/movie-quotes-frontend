<script setup lang="ts">
// import ModalRegister from "@/components/modals/ModalRegister.vue";
import ModalLogin from "@/components/modals/ModalLogin.vue";
import LayoutsModalAuth from "@/components/layouts/LayoutsModalAuth.vue";
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <LayoutsModalAuth
      class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center"
    >
      <ModalRegister />
      <ModalLogin />
    </LayoutsModalAuth>
  </Teleport>
</template>
