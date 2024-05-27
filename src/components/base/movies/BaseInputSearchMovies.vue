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
      class="bg-transparent outline-none placeholder:text-xl text-light-gray"
      :name="props.name"
      type="text"
      :placeholder="props.placeholder"
    />
  </div>
</template>
