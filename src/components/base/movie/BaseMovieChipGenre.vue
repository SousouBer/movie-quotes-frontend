<script setup lang="ts">
import IconModalCancel from "@/components/icons/IconModalCancel.vue";

type Props = {
  name: string;
  showCancelButton?: boolean;
  chipRadius?: string;
  chipTitle?: string;
};

const props = withDefaults(defineProps<Props>(), {
  showCancelButton: true,
  chipRadius: "rounded-sm",
  chipTitle: "text-xs sm:text-[18px]",
});
</script>

<template>
  <div
    :class="chipRadius"
    class="bg-shade-of-gray transition-colors duration-300 hover:bg-gray-600 flex gap-3 items-center justify-center py-1 px-2 sm:py-1.5 sm:px-3"
  >
    <span
      :class="chipTitle"
      class="text-white pointer-events-none whitespace-nowrap"
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
