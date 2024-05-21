<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import TheDashboard from "@/components/shared/TheDashboard.vue";
// import BaseInputProfile from "@/components/base/profile/BaseInputProfile.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import FormProfileActionButtons from "@/components/profile/FormProfileActionButtons.vue";
import ModalProfileFieldEdit from "@/components/profile/ModalProfileFieldEdit.vue";
import FormProfile from "@/components/profile/FormProfile.vue";
import FormProfilePictureField from "@/components/profile/FormProfilePictureField.vue";

// import { Form as FormProfile } from "vee-validate";
import { ref } from "vue";

import { useProfileStore } from "@/stores/useProfileStore.ts";

const profileStore = useProfileStore();

// Move this to types file in future branch.
type ValidationSchemaProfile = {
  username?: string;
  password?: string;
  password_confirmation?: string;
};
</script>

<template>
  <div>
    <TheHeader />
    <div class="flex">
      <TheDashboard class="hidden sm:block" />
      <section
        class="relative bg-dark-shade-of-blue sm:bg-blueish-black h-screen flex-1 py-8"
      >
        <ModalProfileFieldEdit
          class="sm:hidden pt-8"
          v-if="profileStore.getField"
        />
        <span class="text-2xl text-white pl-10 hidden sm:inline"
          >My profile</span
        >
        <div
          v-if="!profileStore.getField"
          class="bg-blueish-black sm:bg-dark-shade-of-blue mt-8 sm:mt-28 pb-28 w-full sm:h-auto sm:w-4/6 sm:pt-44 flex flex-col rounded-xl"
        >
          <FormProfilePictureField
            class="hidden sm:flex absolute top-0 left-1/3 transform translate-y-1/3 -translate-x-1/2"
            avatar="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/289e3a88-77b3-43d5-b8b0-7fce0c0cfa61/d83lria-7fb61469-45db-4325-9460-e5f0440cdf02.jpg/v1/fill/w_200,h_200,q_75,strp/the_legend_of_zelda__link_avatar_by_nightfall1007_d83lria-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjAwIiwicGF0aCI6IlwvZlwvMjg5ZTNhODgtNzdiMy00M2Q1LWI4YjAtN2ZjZTBjMGNmYTYxXC9kODNscmlhLTdmYjYxNDY5LTQ1ZGItNDMyNS05NDYwLWU1ZjA0NDBjZGYwMi5qcGciLCJ3aWR0aCI6Ijw9MjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.sFAJF6HlcSjGXHP-jiAn_a_JCE79xwR8RPcCY3xqjLo"
          />
          <FormProfilePictureField
            class="sm:hidden mt-8"
            avatar="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/289e3a88-77b3-43d5-b8b0-7fce0c0cfa61/d83lria-7fb61469-45db-4325-9460-e5f0440cdf02.jpg/v1/fill/w_200,h_200,q_75,strp/the_legend_of_zelda__link_avatar_by_nightfall1007_d83lria-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjAwIiwicGF0aCI6IlwvZlwvMjg5ZTNhODgtNzdiMy00M2Q1LWI4YjAtN2ZjZTBjMGNmYTYxXC9kODNscmlhLTdmYjYxNDY5LTQ1ZGItNDMyNS05NDYwLWU1ZjA0NDBjZGYwMi5qcGciLCJ3aWR0aCI6Ijw9MjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.sFAJF6HlcSjGXHP-jiAn_a_JCE79xwR8RPcCY3xqjLo"
          />
          <FormProfile />
        </div>
        <FormProfileActionButtons
          v-if="
            profileStore.showNewPasswordsField ||
            profileStore.showNewUsernameField
          "
        />
      </section>
    </div>
  </div>
</template>
