<script setup lang="ts">
import { Form as FormPicture, useField } from "vee-validate";

import { useProfileFormStore } from "@/stores/profileFormStore";
import { ref } from "vue";

const formStore = useProfileFormStore();

const props = defineProps<{
  avatar: string;
}>();

const avatarInputRef = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  if (avatarInputRef.value) {
    avatarInputRef.value.click();
  }
};

const onAvatarChange = async (event: Event) => {
  const avatarImage = (event.target as HTMLInputElement).files?.[0];

  formStore.changeFormValues("avatar", avatarImage as File);
};
</script>

<template>
  <FormPicture class="flex items-center flex-col gap-1">
    <div class="w-48 h-48 rounded-full border mb-2 overflow-hidden">
      <img :src="props.avatar" alt="Profile picture" class="w-full h-full" />
    </div>
    <input
      ref="avatarInputRef"
      type="file"
      name="avatar"
      @change="onAvatarChange"
      class="hidden"
    />
    <label
      @click="triggerFileInput"
      for="avatar"
      class="cursor-pointer text-xl text-white"
      >Upload new photo</label
    >
  </FormPicture>
</template>
