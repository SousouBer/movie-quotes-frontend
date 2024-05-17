<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import TheDashboard from "@/components/shared/TheDashboard.vue";
import BaseInputProfile from "@/components/base/BaseInputProfile.vue";

import { Form as FormProfile } from "vee-validate";
</script>

<template>
  <div>
    <TheHeader />
    <div class="flex">
      <TheDashboard />
      <section class="relative bg-blueish-black h-screen flex-1 py-8">
        <span class="text-2xl text-white pl-10">My profile</span>
        <div class="bg-dark-shade-of-blue mt-28 w-4/6 pt-44">
          <div
            class="absolute top-0 left-1/3 transform translate-y-1/3 -translate-x-1/2 flex items-center flex-col"
          >
            <div class="w-48 h-48 rounded-full border border-red-500 mb-2">
              <img src="" alt="" />
            </div>
            <span class="text-xl text-white">Upload new photo</span>
          </div>
          <FormProfile class="px-40 flex flex-col gap-10">
            <BaseInputProfile
              type="text"
              name="username"
              label="Username"
              placeholder="Soso Beriashvili"
            />
            <BaseInputProfile
              type="email"
              name="email"
              label="Email"
              placeholder="sosoberiashvili@gmail.com"
            />
            <BaseInputProfile
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••••••"
              :isPassword="true"
            />
          </FormProfile>
        </div>
      </section>
    </div>
  </div>
</template>
