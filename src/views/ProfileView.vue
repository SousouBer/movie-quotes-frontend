<script setup lang="ts">
import BaseProfileActionButtons from "@/components/base/profile/BaseProfileActionButtons.vue";
import ProfileFieldMobileEdit from "@/components/profile/ProfileFieldMobileEdit.vue";
import ProfileForm from "@/components/profile/ProfileForm.vue";
import BaseProfilePictureField from "@/components/base/profile/BaseProfilePictureField.vue";
import ProfileNotificationSuccess from "@/components/profile/ProfileNotificationSuccess.vue";

import { useUserStore } from "@/stores/userStore";
import { useProfileFormStore } from "@/stores/profileFormStore";

import { computed, ref, watch } from "vue";

const userStore = useUserStore();
const profileForm = useProfileFormStore();

const windowWidth = ref(window.innerWidth);

// Show buttons if any value is not empty.
const showActionButtons = computed(
  () =>
    profileForm.avatar !== null ||
    profileForm.username !== "" ||
    profileForm.password !== "",
);

const showForm = computed(() => {
  if (windowWidth.value > 700) {
    return true;
  } else {
    return !profileForm.formSubmissionProcess;
  }
});

watch(
  () => profileForm.showSuccessModal as boolean,
  (newValue: boolean) => {
    if (newValue) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  },
);
</script>

<template>
  <div class="flex">
    <section
      class="relative bg-dark-shade-of-blue sm:bg-grayish-blue flex-1 py-8 min-h-screen"
    >
      <ProfileFieldMobileEdit
        class="sm:hidden pt-8"
        v-if="profileForm.formSubmissionProcess"
      />
      <span class="text-2xl text-white pl-10 hidden sm:inline">{{
        $t("profile.my_profile")
      }}</span>
      <div
        v-if="showForm"
        class="bg-blueish-black sm:bg-dark-shade-of-blue mt-8 sm:mt-28 pb-28 w-full sm:h-auto sm:w-[65%] sm:pt-48 flex flex-col rounded-xl"
      >
        <BaseProfilePictureField
          class="hidden sm:flex absolute top-0 left-1/3 transform translate-y-1/3 -translate-x-1/2"
          :avatar="userStore.getUser?.avatar ?? ''"
        />
        <BaseProfilePictureField
          class="sm:hidden mt-8"
          :isMobileAvatar="true"
          :avatar="userStore.getUser?.avatar ?? ''"
        />
        <ProfileForm />
      </div>
      <BaseProfileActionButtons v-if="showActionButtons" />
    </section>
    <Teleport to="body">
      <ProfileNotificationSuccess
        v-if="profileForm.showSuccessModal"
        class="sm:hidden absolute top-0 left-0 h-full w-full"
      />
    </Teleport>
  </div>
</template>
