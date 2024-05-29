<script setup lang="ts">
import BaseMovieChipGenre from "@/components/base/movie/BaseMovieChipGenre.vue";
import BaseMovieButton from "@/components/base/movie/BaseMovieButton.vue";

import IconMovieAdd from "@/components/icons/IconMovieAdd.vue";
import IconVerticalLine from "@/components/icons/IconVerticalLine.vue";
import IconThreeDots from "@/components/icons/IconThreeDots.vue";
</script>

<template>
  <div class="px-4 sm:pr-16">
    <span class="font-medium text-2xl text-white hidden sm:inline"
      >Movie description</span
    >
    <div class="my-6 sm:mb-0 flex flex-col sm:flex-row gap-6 rounded-xl">
      <div class="h-[18.875rem] sm:h-[27.56rem] flex-1">
        <img
          class="h-full w-full"
          src="/images/dummy-poster.svg"
          alt="Movie Image"
        />
      </div>
      <div class="flex-1">
        <span class="font-medium text-2xl text-warm-gray"
          >COMMITMENT HASAN (1999)</span
        >
        <div class="flex flex-wrap gap-3 my-6">
          <BaseMovieChipGenre :showCancelButton="false" name="Adventure" />
          <BaseMovieChipGenre :showCancelButton="false" name="Science" />
          <BaseMovieChipGenre :showCancelButton="false" name="Horror" />
          <BaseMovieChipGenre :showCancelButton="false" name="Horror" />
        </div>
        <p class="text-gray-300 font-bold text-lg">
          Director: <span class="text-white font-medium">NICK CASSAVETES</span>
        </p>
        <p class="text-lg text-gray-300 mt-4 leading-[27px]">
          In a nursing home, resident Duke reads a romance story to an old woman
          who has senile dementia with memory loss. In the late 1930s, wealthy
          seventeen year-old Allie Hamilton is spending summer vacation in
          Seabrook. Local worker Noah Calhoun meets Allie at a carnival
        </p>
      </div>
    </div>
    <BaseMovieButton class="sm:hidden" label="Add Quote">
      <IconMovieAdd />
    </BaseMovieButton>
    <div
      class="border-t border-gray-700 sm:border-none mt-8 sm:mt-0 pt-8 sm:pt-0"
    >
      <span class="text-2xl text-white">Quotes (Total 7) </span>
      <div class="hidden sm:flex relative items-center gap-8 my-8">
        <span class="text-2xl text-white">All Quotes (Total 7) </span>
        <BaseMovieButton label="Add Quote">
          <IconMovieAdd />
        </BaseMovieButton>
        <IconVerticalLine
          class="absolute top-1/2 left-[11.5rem] transform -translate-y-1/2"
        />
      </div>
      <div>
        <div class="bg-dark-shade-of-blue rounded-[10px] w-[60%] p-8">
          <div
            class="relative flex gap-10 items-center border-b border-[#EFEFEF33] pb-8"
          >
            <div>
              <img src="/images/dummy-quote-img.svg" alt="Quote picture" />
            </div>
            <span class="text-2xl text-gray-300"
              >"Frankly, my dear, I don'tgive a damn."
            </span>
            <IconThreeDots class="absolute top-0 right-0 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
