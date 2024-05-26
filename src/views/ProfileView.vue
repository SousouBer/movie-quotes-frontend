<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import TheDashboard from "@/components/shared/TheDashboard.vue";
import FormProfileActionButtons from "@/components/profile/FormProfileActionButtons.vue";
import ModalProfileFieldMobileEdit from "@/components/profile/ModalProfileFieldMobileEdit.vue";
import FormProfile from "@/components/profile/FormProfile.vue";
import FormProfilePictureField from "@/components/profile/FormProfilePictureField.vue";
import FormProfileNotificationSuccess from "@/components/profile/FormProfileNotificationSuccess.vue";

import { useProfileStore } from "@/stores/useProfileStore";
import { useUserStore } from "@/stores/userStore";
import { useProfileFormStore } from "@/stores/profileFormStore";

import { computed, ref, watch } from "vue";

const profileStore = useProfileStore();
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
  <div>
    <TheHeader />
    <div class="flex">
      <TheDashboard class="hidden sm:block" />
      <section
        class="relative bg-dark-shade-of-blue sm:bg-blueish-black flex-1 py-8 min-h-screen"
      >
        <ModalProfileFieldMobileEdit
          class="sm:hidden pt-8"
          v-if="profileForm.formSubmissionProcess"
        />
        <span class="text-2xl text-white pl-10 hidden sm:inline">{{
          $t("profile.my_profile")
        }}</span>
        <div
          v-if="showForm"
          class="bg-blueish-black sm:bg-dark-shade-of-blue mt-8 sm:mt-28 pb-28 w-full sm:h-auto sm:w-4/6 sm:pt-44 flex flex-col rounded-xl"
        >
          <FormProfilePictureField
            class="hidden sm:flex absolute top-0 left-1/3 transform translate-y-1/3 -translate-x-1/2"
            :avatar="userStore.getUser?.avatar ?? ''"
          />
          <FormProfilePictureField
            class="sm:hidden mt-8"
            :isMobileAvatar="true"
            :avatar="userStore.getUser?.avatar ?? ''"
          />
          <FormProfile />
        </div>
        <FormProfileActionButtons v-if="showActionButtons" />
      </section>
    </div>
    <Teleport to="body">
      <FormProfileNotificationSuccess
        v-if="profileForm.showSuccessModal"
        class="sm:hidden absolute top-0 left-0 h-full w-full"
      />
    </Teleport>
  </div>
</template>
