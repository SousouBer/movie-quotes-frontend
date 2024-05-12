<script setup lang="ts">
import LayoutsModalAuth from "@/components/layouts/LayoutsModalAuth.vue";
import ModalRegister from "@/components/modals/ModalRegister.vue";
import ModalLogin from "@/components/modals/ModalLogin.vue";
import ModalForgotPassword from "@/components/modals/ModalForgotPassword.vue";
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <LayoutsModalAuth
      class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center"
    >
      <!-- <ModalRegister /> -->
      <!-- <ModalLogin /> -->
      <ModalForgotPassword />
    </LayoutsModalAuth>
  </Teleport>
</template>
