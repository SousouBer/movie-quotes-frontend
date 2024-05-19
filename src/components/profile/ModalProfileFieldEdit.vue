<script setup lang="ts">
import BaseInputProfile from "@/components/base/profile/BaseInputProfile.vue";
import BaseButton from "@/components/base/BaseButton.vue";
</script>

<template>
  <div>
    <div
      class="bg-gray-900 rounded-xl py-20 px-8 flex flex-col items-center justify-center"
    >
      <BaseInputProfile
        class="w-full"
        :isModalInput="true"
        type="text"
        name="new_username"
        label="Enter new username"
        placeholder="Enter a new username"
      />
    </div>
    <div class="flex justify-between py-8 px-10">
      <button class="text-xl text-gray-300">Cancel</button>
      <BaseButton label="Edit" />
    </div>
  </div>
</template>
