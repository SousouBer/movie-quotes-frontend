<script setup lang="ts">
import { Field } from "vee-validate";

import IconSearch from "@/components/icons/IconSearch.vue";

const props = defineProps<{
  name: string;
  placeholder: string;
}>();
</script>

<template>
  <div class="flex items-center gap-3">
    <IconSearch color="gray" />
    <Field
      class="bg-transparent outline-none text-base sm:text-xl text-light-gray w-28"
      :name="props.name"
      type="text"
      :placeholder="props.placeholder"
    />
  </div>
</template>
