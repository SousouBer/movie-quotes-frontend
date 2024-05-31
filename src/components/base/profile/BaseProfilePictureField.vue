<script setup lang="ts">
import { Form as FormPicture } from "vee-validate";
import { ref, watch } from "vue";

import { useProfileFormStore } from "@/stores/profileFormStore";
import { useProfileStore } from "@/stores/useProfileStore";

const formStore = useProfileFormStore();
const profileStore = useProfileStore();

const props = defineProps<{
  avatar: string;
  isMobileAvatar?: boolean;
}>();

const avatarInputRef = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);

const triggerFileInput = (): void => {
  if (avatarInputRef.value) {
    avatarInputRef.value.click();
  }
};

const onAvatarChange = async (event: Event) => {
  const avatarImage = (event.currentTarget as HTMLInputElement).files?.[0];

  formStore.changeFormValues("avatar", avatarImage as File);

  if (!props.isMobileAvatar) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(avatarImage as Blob);
  } else {
    formStore.setFormSubmissionProcess(true);
    profileStore.setShowConfirmationModal(true);
  }
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
      >{{ $t("profile.upload_new_photo") }}</label
    >
  </FormPicture>
</template>
