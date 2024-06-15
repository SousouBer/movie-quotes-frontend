<script setup lang="ts">
import { Field } from "vee-validate";

import IconSearch from "@/components/icons/IconSearch.vue";
import IconBack from "@/components/icons/IconBackToLoginModal.vue";
import { ref } from "vue";

import { useQuoteStore } from "@/stores/quote";
import { useSearch } from "@/components/composables/useSearch";

const quoteStore = useQuoteStore();

const searchInput = ref<string>("");

const { debounce } = useSearch(searchInput);
</script>

<template>
  <div>
    <IconSearch
      @click="quoteStore.toggleMobileSearch"
      color="white"
      width="24"
      height="24"
      class="cursor-pointer"
    />
    <div
      v-if="quoteStore.showMobileSearch"
      class="absolute top-0 left-0 h-[47.18rem] w-full bg-[#12101A] backdrop-blur-sm z-10"
    >
      <div
        class="w-full flex gap-6 border-b border-[#EFEFEF4D] items-center py-4 px-6"
      >
        <IconBack
          @click="quoteStore.toggleMobileSearch"
          class="z-50"
          width="16"
          height="14"
        />
        <Field
          @input="debounce"
          v-model="searchInput"
          class="z-50 outline-none text-base sm:text-xl text-white placeholder:text-white w-full bg-transparent"
          name="search"
          type="text"
          placeholder="Search"
        />
      </div>
      <div class="flex flex-col px-16 pt-8 gap-4 w-full">
        <span class="text-[#CED4DA]"
          >Enter <span class="text-white">@</span> to search movies</span
        >
        <span class="text-[#CED4DA]"
          >Enter <span class="text-white">#</span> to search quotes
        </span>
      </div>
    </div>
  </div>
</template>
