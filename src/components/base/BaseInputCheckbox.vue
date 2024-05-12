<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{
  label: string;
  name: string;
}>();

const { checked, handleChange } = useField(() => props.name, undefined, {
  type: "checkbox",
  checkedValue: true,
  uncheckedValue: false,
});
</script>

<template>
  <div class="flex items-center gap-1.5">
    <input
      class="w-4 h-4"
      type="checkbox"
      @change="handleChange"
      :checked="checked"
      :value="true"
    />
    <label :for="props.name" class="text-white text-base">{{ label }}</label>
  </div>
</template>
