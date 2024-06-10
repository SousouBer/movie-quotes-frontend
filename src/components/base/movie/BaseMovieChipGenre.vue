<script setup lang="ts">
import IconModalCancel from "@/components/icons/IconModalCancel.vue";

type Props = {
  name: string;
  showCancelButton?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showCancelButton: true,
});
</script>

<template>
  <div
    class="bg-shade-of-gray transition-colors duration-300 hover:bg-gray-600 flex gap-3 items-center justify-center rounded-sm py-1 px-2 sm:py-1.5 sm:px-3"
  >
    <span
      class="text-white text-xs sm:text-[18px] pointer-events-none whitespace-nowrap"
      >{{ props.name }}</span
    >
    <IconModalCancel
      v-if="showCancelButton"
      class="cursor-pointer"
      width="6"
      height="6"
    />
  </div>
</template>
