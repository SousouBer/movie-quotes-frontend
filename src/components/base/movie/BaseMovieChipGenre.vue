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
    class="bg-shade-of-gray transition-colors duration-300 hover:bg-gray-600 flex gap-3 items-center justify-center rounded-[4px] py-1.5 px-3"
  >
    <span
      class="text-white text-sm sm:text-[18px] font-bold pointer-events-none"
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
