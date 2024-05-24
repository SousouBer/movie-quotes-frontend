<script setup lang="ts">
import { Form as FormPicture, useField } from "vee-validate";

import { useProfileFormStore } from "@/stores/profileFormStore";
import { ref } from "vue";
import { watch } from "vue";

const formStore = useProfileFormStore();

const props = defineProps<{
  avatar: string;
}>();

const avatarInputRef = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);

const triggerFileInput = () => {
  if (avatarInputRef.value) {
    avatarInputRef.value.click();
  }
};

const onAvatarChange = async (event: Event) => {
  const avatarImage = (event.target as HTMLInputElement).files?.[0];

  formStore.changeFormValues("avatar", avatarImage as File);

  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string;
  };
  reader.readAsDataURL(avatarImage as Blob);
};

watch(
  () => formStore.avatar,
  (newVal) => {
    if (!newVal && avatarInputRef.value) {
      avatarInputRef.value.value = "";
      previewUrl.value = null;
    }
  },
);
</script>

<template>
  <FormPicture class="flex items-center flex-col gap-1">
    <div class="w-48 h-48 rounded-full border mb-2 overflow-hidden">
      <img
        :src="previewUrl ? previewUrl : props.avatar"
        alt="Profile picture"
        class="w-full h-full"
      />
    </div>
    <input
      @change="onAvatarChange"
      ref="avatarInputRef"
      type="file"
      name="avatar"
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
